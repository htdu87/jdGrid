(function($){
	
	// jdPage
	$.fn.jdPage=function(opt){
		var pageDefaultOptions={
			totalPage:0,
			curPage:0,
			itemPerPage:0,
			totalItem:0,
			onPageChange:function(){}
		}
		
		var options=$.extend(pageDefaultOptions,opt);
		
		$(this).each(function(){
			var jdpage={
				element:$(this),
				totalPage:options.totalPage,
				curPage:options.curPage,
				itemPerPage:options.itemPerPage,
				totalItem:options.totalItem,
				update:function(data){
					this.totalPage=data[0];
					this.curPage=data[1];
					this.itemPerPage=data[2];
					this.totalItem=data[3];
					
					updateControl(this.element);
				},
				onPageChange:options.onPageChange,
				getCurPage:function(){
					return this.curPage;
				}
			};
			$(this).data('jdpage', jdpage);
			
			var row=$('<div class="row"></div>');
			var info=$('<div class="col-md-5 jdgage-info">Hiển thị <b><span class="jdpage-start"></span></b> đến <b><span class="jdpage-end"></span></b> của <b><span class="jdpage-total-item"></span></b>  [Trang <span class="jdpage-cur-page">0</span>/<span class="jdpage-total-page">0</span>]</div>');
			var paging=$('<div class="col-md-7 text-right jdpage-paging-contain"></div>');
			row.append(info).append(paging);
			$(this).append(row);
			
			updateControl($(this));
		});
		
		function updateControl(obj){
			var options=obj.data('jdpage');
			var start=options.curPage>0?(options.curPage*options.itemPerPage-options.itemPerPage)+1:0;
			start=start>=options.totalItem?options.totalItem:start;
			var end=options.curPage*options.itemPerPage;
			end=end>=options.totalItem?options.totalItem:end;
			
			obj.find('.jdpage-start').text(start);
			obj.find('.jdpage-end').text(end);
			obj.find('.jdpage-total-item').text(options.totalItem);
			obj.find('.jdpage-cur-page').text(options.curPage);
			obj.find('.jdpage-total-page').text(options.totalPage);
			
			var paging=$('<nav class="jdpage-paging"><ul class="pagination pagination-sm"></ul></nav>');
			if(options.totalPage>1){
				var curPage=options.curPage<=0?1:options.curPage;
				curPage=options.curPage>options.totalPage?options.totalPage:options.curPage;
				
				var pstart=curPage-2>0?curPage-2:1;
				var pend=pstart+4>options.totalPage?options.totalPage:pstart+4;
				if(pend-4!=pstart)pstart=pend-4;
				
				$(paging).find('.pagination').append('<li><a href="#" class="jdpage-page" page="1">&laquo;</a></li>');
				for(var i=pstart;i<=pend;i++){
					var active=i==options.curPage?'class="active"':'';
					$(paging).find('.pagination').append('<li '+active+'><a href="#" class="jdpage-page" page="'+i+'">'+i+'</a></li>');
				}
				$(paging).find('.pagination').append('<li><a href="#" class="jdpage-page" page="'+options.totalPage+'">&raquo;</a></li>');
			}
			obj.find('.jdpage-paging').remove();
			obj.find('.jdpage-paging-contain').append(paging);
			
			obj.find('.jdpage-page').click(function(e){
				e.preventDefault();
				options.onPageChange($(this).attr('page'));
			});
		}
		
		return $(this);
	};
	
	// jdGrid
	$.fn.jdGrid=function(opt){
		
		var gridDefaultOptions={
			height:'300px',
			separator:'.',
			columns:[],
			data:[]
		};
		
		var options=$.extend(gridDefaultOptions,opt);
		$(this).each(function(){
			var jdgrid={
				element:$(this),
				columns:options.columns,
				data:options.data,
				separator:options.separator,
				fillData:function(data){
					this.data=data;
					this.element.find('.jdgrid-wrap-body table tbody tr').remove();
					rcount=0;
					var target=this;
					$.each(data, function(i,row){
						target.element.find('.jdgrid-wrap-body table tbody').append(createDataRow(target.columns,row,target.separator,rcount++));
					});
					
					drawGrid(this.element);
				},
				updateColumn:function(i,col){
					this.columns[i]=col;
				},
				addRow:function(row){
					this.data.push(row);
					var rcount=this.element.find('.jdgrid-wrap-body table tbody tr').length;
					this.element.find('.jdgrid-wrap-body table tbody').append(createDataRow(this.columns,row,this.separator,rcount));
					drawGrid(this.element);
				},
				refresh:function(){					
					this.fillData(this.data);
				},
				remRowByIndex:function(index){
					this.data.splice(index,1);
					this.element.find('.jdgrid-wrap-body table tbody tr:eq('+(index)+')').remove();
				},
				remRowById:function(id,colName){
					for(var i=0;i<this.data.length;i++){
						if(this.data[i][colName]==id){
							this.element.find('.jdgrid-wrap-body table tbody tr:eq('+(i)+')').remove();
							break;
						}
					}
					this.data.splice(i,1);
				},
				getData:function(){
					return this.data;
				},
				clear:function(){
					this.data=[];
					this.element.find('.jdgrid-wrap-body table tbody tr').remove();
				}
			};
			
			$(this).data('jdgrid', jdgrid);
			
			var headWrap=$('<div class="jdgrid-wrap-head"></div>');
			var bodyWrap=$('<div class="jdgrid-wrap-body"></div>').css({'height':options.height});
			var tblHead=$('<table class="table table-bordered table-condensed table-hover"><thead><tr></tr></thead></table>');
			var tblBody=$('<table class="table table-bordered table-condensed table-hover"><thead><tr></tr></thead><tbody></tboy></table>');
			
			$.each(options.columns, function(i,item){
				var style={};
				if(item.align!=undefined){
					style['text-align']=item.align;
				}
				if(item.width!=undefined){
					style['width']=item.width;					
				}
				
				var th=$('<th></th>').html(item.title).css(style);
				tblHead.find('thead tr').append(th);
				tblBody.find('thead tr').append(th.clone());
			});
			
			headWrap.append(tblHead);
			bodyWrap.append(tblBody);
			$(this).append(headWrap).append(bodyWrap).css({'border':'1px solid #d2d6de'});
			drawGrid($(this));
			
			/* $(window).resize(function(){
				drawGrid($(this));
			}); */
		});  // end each target
		
		function drawGrid(obj){
			if(obj.find('.jdgrid-wrap-body').length>0 && obj.find('.jdgrid-wrap-head').length>0){
				obj.find('.jdgrid-wrap-body table thead tr:first th').each(function(i){
					var w=$(this).outerWidth();
					obj.find('.jdgrid-wrap-head table thead tr:first th:nth-child('+(i+1)+')').outerWidth(w);
				});
				obj.find('.jdgrid-wrap-body table').css('margin-top','-'+obj.find('.jdgrid-wrap-head table thead').outerHeight()+'px');
			}
		}
		
		function createDataRow(columns,row,separator,count){
			var tr=$('<tr></tr>');
			$.each(columns, function(i,col){
				var style={};
				if(col.align!=undefined){
					style['text-align']=col.align;
				}
				if(col.width!=undefined){
					style['width']=col.width;					
				}
				var td=$('<td></td>').css(style);
				switch(col.type){
					case 'money':
					td.html(formatNumber(row[col.name],separator));
					break;
				case 'date':
					td.html(reformatDate(row[col.name]));
					break;
				case 'interval':
					td.html(milisecToDate(row[col.name]));
					break;
				case 'base64img':
					td.html('<img src="data:image/png;base64,'+row[col.name]+'" class="img-responsive" width="17" />');
					break;
				case 'control':
					td.html(col.content(count,row));
					break;
				case 'check':
					var checked=(row[col.name]==1||row[col.name]==true)?'checked':'';
					td.html('<input type="checkbox" disabled="disabled" '+checked+' />');
					break;
				default:
					td.html(row[col.name]);
				}
				tr.append(td);
			});
			return tr;
		}
		
		function formatNumber(num,sep) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
		}

		function reformatDate(dateStr){
		  dArr = dateStr.split("-");
		  return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0];
		}

		function milisecToDate(interval){
			var date=new Date(interval);
			return ('0'+date.getDate()).slice(-2) + '/' +  ('0'+(date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
		}
		
		return $(this);
	};
	
}(jQuery));

