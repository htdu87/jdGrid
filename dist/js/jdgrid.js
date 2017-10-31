(function($){
	var defaultOptions= {
		height:'300px',
		separator:'.',
		columns:[]
	}
	
	$.fn.jdGrid=function(opt,arg){
		options=$.extend(defaultOptions,opt);
		
		$(this).each(function(index,obj){
			var jdgrid={
				element: $(this),
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
				}
			};
			
			$(this).data('jdgrid', jdgrid);
			
			var headWrap=$('<div class="jdgrid-wrap-head"></div>');
			var bodyWrap=$('<div class="jdgrid-wrap-body"></div>').css({'height':options.height});
			var tblHead=$('<table class="table table-bordered table-condensed"><thead><tr></tr></thead></table>');
			var tblBody=$('<table class="table table-bordered table-condensed"><thead><tr></tr></thead><tbody></tboy></table>');
			
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
		});
		
		function drawGrid(obj){
			if($(obj).find('.jdgrid-wrap-body').length>0 && $(obj).find('.jdgrid-wrap-head').length>0){
				$(obj).find('.jdgrid-wrap-body table thead tr:first th').each(function(i){
					var w=$(this).outerWidth();
					$(obj).find('.jdgrid-wrap-head table thead tr:first th:nth-child('+(i+1)+')').outerWidth(w);
				});
				$(obj).find('.jdgrid-wrap-body table').css('margin-top','-'+$('.jdgrid-wrap-body table thead').outerHeight()+'px');
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

