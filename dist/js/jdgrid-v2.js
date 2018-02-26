(function($){
	$.fn.jdGrid=function(options){
		var options=$.extend({},$.fn.jdGrid.defaultOptions,options);
		$(this).each(function(){
			var jdgrid={
				element:$(this),
				columns:options.columns,
				data:options.data,
				fillData:function(){
				},
				updateColumn:function(){
				},
				addRow:function(){
				},
				redraw:function(){
				},
				remRowByIndex:function(){
				},
				remRowById:function(){
				},
				getData:function(){
					return this.data;
				},
				clrData:function(){
				},
				getSelection:function(){
				},
				clrSelection:function(){
				},
				updateRow:function(){
				}
			};
			
			// 
			var headerWpr=$('<div></div>').addClass('jdgrid-header-wrapper');
			var bodyWpr=$('<div></div>').addClass('jdgrid-body-wrapper').css({'height':options.height});
			var footerWpr=$('<div></div>').addClass('jdgrid-footer-wrapper');
			
			var tblHeader=$('<table><thead><tr></tr></thead></table>').addClass('table table-bordered table-condensed table-hover');
			var tblBody=$('<table><thead><tr></tr></thead><tbody></tbody></table>').addClass('table table-bordered table-condensed table-hover');
			var tblFooter=$('<table><tfoot><tr></tr></tfoot></table>').addClass('table table-bordered table-condensed table-hover');
			
			$.each(options.columns,function(i,col){
				var colStyle=$.extend({},$.fn.jdGrid.defaultColumnStyles,col);
				var style={'text-align':colStyle.align,'width':colStyle.width,'color':colStyle.color};
				var th=$('<th></th>').html(col.title).css(style);
				tblHeader.find('thead tr').append(th);
				tblBody.find('thead tr').append(th.clone());
				var td=$('<td>');
				tblFooter.find('tfoot tr').append(td);
			});
			
			$.each(options.data,function(i,obj){
				tblBody.find('tbody').append(createDataRow(obj));
			});
			
			headerWpr.append(tblHeader);
			bodyWpr.append(tblBody);
			if(options.footer)footerWpr.append(tblFooter);
			
			$(this).append(headerWpr).append(bodyWpr).append(footerWpr).css({'border':'1px solid '+options.borderClr});
			$(this).data('jdgrid',jdgrid);
			
			$('.jdgrid-textbox').off('dblclick').on('dblclick',function(){
				var txtbox=$('<input type="text" value="'+$(this).text()+'" style="width:'+($(this).outerWidth()-20)+'px;height:22px" />');
				txtbox.focusout(function(){
					var row_index = $(this).parent().parent().index();
					var col_index = $(this).parent().index();
					var data=$(this).parent().parent().parent().parent().parent().parent().data('jdgrid');
					//console.log($(this).parent().parent().parent().parent().parent().parent().data('jdgrid').data);
					//console.log(data.data[row_index][data.columns[col_index]['name']]);
					data.data[row_index][data.columns[col_index]['name']]=$(this).val();
					$(this).parent().html($(this).val());
				});
				$(this).html(txtbox);
				txtbox.select();
			});
			
			adjGrid($(this));
		});
		return $(this);
		
		function createDataRow(rowData){
			var tr=$('<tr></tr>');
			$.each(options.columns,function(i,col){
				var colStyle=$.extend({},$.fn.jdGrid.defaultColumnStyles,col);
				var style={'text-align':colStyle.align,'width':colStyle.width,'color':colStyle.color,'font-weight':colStyle.bold};
				var td=$('<td></td>').css(style);
				switch(colStyle.type){
					case 'money':
						td.html(formatNum(rowData[col.name]));
						break;
					case 'date':
						td.html('<i>Deprecated</i>');
						break;
					case 'interval':
						td.html(milisecToDate(rowData[col.name]));
						break;
					case 'base64img':
						td.html('<i>Deprecated</i>');
						break;
					case 'control':
						td.html(col.content(rowData));
						break;
					case 'check':
						var checked=(rowData[col.name]==1||rowData[col.name]==true)?'checked':'';
						td.html('<input type="checkbox" disabled="disabled" '+checked+' />');
						break;
					case 'textbox':
						td.html(rowData[col.name]).addClass('jdgrid-textbox');
						break;
					default:
						td.html(rowData[col.name]);
				}
				tr.append(td);
			});
			return tr;
		}
		
		function adjGrid(jqObj){
			if(jqObj.find('.jdgrid-body-wrapper').length>0 && jqObj.find('.jdgrid-header-wrapper').length>0){
				jqObj.find('.jdgrid-body-wrapper table thead tr:first th').each(function(i){
					var w=$(this).outerWidth();
					jqObj.find('.jdgrid-header-wrapper table thead tr:first th:nth-child('+(i+1)+'),.jdgrid-footer-wrapper table tfoot tr:first td:nth-child('+(i+1)+')').outerWidth(w);
				});
				jqObj.find('.jdgrid-body-wrapper table').css('margin-top','-'+jqObj.find('.jdgrid-header-wrapper table thead').outerHeight()+'px');
			}
		}
		
		function formatNum(num) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, options.thousandSeparate);
		}
		
		function milisecToDate(interval){
			var date=new Date(interval);
			return ('0'+date.getDate()).slice(-2) + '/' +  ('0'+(date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
		}
	};
	
	$.fn.jdGrid.defaultOptions={
		height:'300px',
		columns:[],
		data:[],
		footer:false,
		activeClr:'#f5f5f5',
		hoverClr:'#f5f5f5',
		borderClr:'#d2d6de',
		decimalSeparate:'.',
		thousandSeparate:',',
		onRowSelected:function(){
		}
	};
	
	$.fn.jdGrid.defaultColumnStyles={
		align:'left',
		width:'auto',
		color:'inherit',
		bold:'inherit',
		type:'text'
	}
	
	
})(jQuery)