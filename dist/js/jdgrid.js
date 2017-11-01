(function($){
	var gridDefaultOptions={
		height:'300px',
		separator:'.',
		columns:[]
	};
	var pageDefaultOptions={
		totalPage:0,
		curPage:0,
		itemPerPage:0,
		totalItem:0,
		onPageChange:function(){}
	}
	
	$.fn.jdPage=function(opt){
		var options=$.extend(pageDefaultOptions,opt);
		$(this).each(function(index,obj){
			var jdpage={
				element:$(this),
				totalPage:options.totalPage,
				curPage:options.curPage,
				itemPerPage:options.itemPerPage,
				totalItem:options.totalItem,
				update:function(data){
					jdpage.totalPage=data[0];
					jdpage.curPage=data[1];
					jdpage.itemPerPage=data[2];
					jdpage.totalItem=data[3];
					
					updateControl(obj);
				},
				onPageChange:options.onPageChange
			};
			$(this).data('jdpage', jdpage);
			
			var row=$('<div class="row"></div>');
			var info=$('<div class="col-md-5 jdgage-info">Hiển thị <b><span class="jdpage-start"></span></b> đến <b><span class="jdpage-end"></span></b> của <b><span class="jdpage-total-item"></span></b></div>');
			var paging=$('<div class="col-md-7 text-right jdpage-paging-contain"></div>');
			row.append(info).append(paging);
			$(this).append(row);
			updateControl(obj);
		});
		
		function updateControl(obj){
			
			var options=$(obj).data('jdpage');
			var start=options.curPage>0?(options.curPage*options.itemPerPage-options.itemPerPage)+1:0;
			start=start>=options.totalItem?options.totalItem:start;
			var end=options.curPage*options.itemPerPage;
			end=end>=options.totalItem?options.totalItem:end;
			
			$(obj).find('.jdpage-start').text(start);
			$(obj).find('.jdpage-end').text(end);
			$(obj).find('.jdpage-total-item').text(options.totalItem);
			
			var paging=$('<nav class="jdpage-paging"><ul class="pagination pagination-sm"></ul></nav>');
			if(options.totalPage>1){
				$(paging).find('.pagination').append('<li><a href="#" class="jdpage-page" page="1">&laquo;</a></li>');
				for(var i=1;i<=options.totalPage;i++){
					var active=i==options.curPage?'class="active"':'';
					$(paging).find('.pagination').append('<li '+active+'><a href="#" class="jdpage-page" page="'+i+'">'+i+'</a></li>');
				}
				$(paging).find('.pagination').append('<li><a href="#" class="jdpage-page" page="'+options.totalPage+'">&raquo;</a></li>');
			}
			$(obj).find('.jdpage-paging').remove();
			$(obj).find('.jdpage-paging-contain').append(paging);
			
			$(obj).find('.jdpage-page').click(function(e){
				e.preventDefault();
				options.onPageChange($(this).attr('page'));
			});
			
		}
		
		return $(options);
	};
	
	$.fn.jdGrid=function(opt){
		var options=$.extend(gridDefaultOptions,opt);
		
		$(this).each(function(index,obj){
			var jdgrid={
				element:$(this),
				columns:options.columns,
				fillData:function(data){
					$(obj).find('.jdgrid-wrap-body table tbody tr').remove();
					$.each(data, function(i,row){
						$(obj).find('.jdgrid-wrap-body table tbody').append(createDataRow(jdgrid.columns,row,options.separator));
					});
					
					drawGrid(obj);
				},
				updateColumn:function(i,col){
					jdgrid.columns[i]=col;
				},
				addRow:function(row){
					$(obj).find('.jdgrid-wrap-body table tbody').append(createDataRow(jdgrid.columns,row,options.separator));
					drawGrid(obj);
				},
				refresh:function(){					
					drawGrid(obj);
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
			$(this).append(headWrap);
			$(this).append(bodyWrap);
			drawGrid(obj);
			
			$(window).resize(function(){
				drawGrid(obj);
			});
		});
		
		function drawGrid(obj){
			if($(obj).find('.jdgrid-wrap-body').length>0 && $(obj).find('.jdgrid-wrap-head').length>0){
				$(obj).find('.jdgrid-wrap-body table thead tr:first th').each(function(i){
					var w=$(this).outerWidth();
					$(obj).find('.jdgrid-wrap-head table thead tr:first th:nth-child('+(i+1)+')').outerWidth(w);
				});
				$(obj).find('.jdgrid-wrap-body table').css('margin-top','-'+$(obj).find('.jdgrid-wrap-head table thead').outerHeight()+'px');
			}
		}
		
		function createDataRow(columns,row,separator){
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
					td.html(col.content(i,row));
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

