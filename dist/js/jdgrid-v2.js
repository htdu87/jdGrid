(function($){
	$.fn.jdGrid=function(options){
		options=$.extend({},$.fn.jdGrid.defaultOptions,options);
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
			var bodyWpr=$('<div></div>').addClass('jdgrid-body-wrapper');
			var footerWpr=$('<div></div>').addClass('jdgrid-footer-wrapper');
			
			var tblHeader=$('<table><thead><tr></tr></thead></table>').addClass('table table-bordered table-condensed table-hover');
			var tblBody=$('<table><thead><tr></tr></thead><tbody></tbody></table>').addClass('table table-bordered table-condensed table-hover');
			var tblFooter=$('<table><tfoot><tr></tr></tfoot></table>').addClass('table table-bordered table-condensed table-hover');
			
			$.each(options.columns,function(i,col){
				var th=$('<th></th>').html(col.title);
				tblHeader.find('thead tr').append(th);
				tblBody.find('thead tr').append(th.clone());
				var td=$('<td>');
				tblFooter.find('tfoot tr').append(td);
			});
			
			headerWpr.append(tblHeader);
			bodyWpr.append(tblBody);
			if(options.footer)footerWpr.append(tblFooter);
			
			$(this).append(headerWpr).append(bodyWpr).append(footerWpr).css({'border':'1px solid '+options.borderClr});
			$(this).data('jdgrid',jdgrid);
			
			
		});
		return $(this);
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
		textClr:'inherit',
		bold:false
	}
	
	
})(jQuery)