(function($) {
	jQuery.fn.jdGrid=function(options){
		var defaults={
			columns:[],
			data:[],
			footer:{},
			height:'300px',
			class:'table table-bordered table-condensed table-hover',
			extclass:'',
			border:{'border':'1px solid #d2d6de'},
			onRowSelected:function(){}
		};
		var settings=$.extend({},defaults,options);
		return this.each(function(){
			// table header
			var tblBody=$('<table/>').addClass(settings.class).addClass(settings.extclass);
			var tblBodyHeader=$('<thead/>');
			var tblBodyHeaderTr=$('<tr/>');
			$.each(settings.columns,function(i,colm){
				if(colm.title!=undefined){
					var th=$('<th/>');
					th.html(colm.title);
					if(colm.css!=undefined){
						th.css(colm.css);
					}
					tblBodyHeaderTr.append(th);
				}
			});
			tblBodyHeader.append(tblBodyHeaderTr);
			tblBody.append(tblBodyHeader);
			
			// table body
			var tblBodyBody=genTableBody();
			tblBody.append(tblBodyBody);
			
			// table footer
			var tblBodyFooter=$('<tfoot/>');
			var tblBodyFooterTr=$('<tr/>');
			$.each(settings.columns,function(j,colm){
				var td=$('<td/>');
				if(settings.footer[colm.name]!=undefined){
					td.html(settings.footer[colm.name]);
					if(colm.css!=undefined){
						td.css(colm.css);
					}
				}
				tblBodyFooterTr.append(td);
			});
			tblBodyFooter.append(tblBodyFooterTr);
			tblBody.append(tblBodyFooter);
			
			var headWrp=$('<div/>').addClass('jdgrid-header-wrapper');
			var tblHead=$('<table/>').addClass(settings.class).addClass(settings.extclass).append(tblBodyHeader.clone());
			headWrp.append(tblHead);
			$(this).append(headWrp)
			
			var bodyWrp=$('<div/>').addClass('jdgrid-body-wrapper').height(settings.height);
			bodyWrp.append(tblBody);
			$(this).append(bodyWrp).css(settings.border);
			
			var footWrp=$('<div/>').addClass('jdgrid-footer-wrapper');
			var tblFoot=$('<table/>').addClass(settings.class).addClass(settings.extclass).append(tblBodyFooter.clone());
			footWrp.append(tblFoot);
			$(this).append(footWrp);
			
			tblBodyHeader.hide();
			tblBodyFooter.hide();
			
			$(this).off('click').on('click',function(){
				//debug();
				console.log(tblBodyHeader.find('tr th:eq(0)').outerWidth());
			});
			
			adjColums(this);
		});
		
		function debug(){
			console.log(settings);
			//console.log(settings.footer.size);
		}
		
		function genTableBody(){
			var tblBodyBody=$('<tbody/>');
			$.each(settings.data,function(i,row){
				var tr=$('<tr/>');
				$.each(settings.columns,function(j,colm){
					var td=$('<td/>');
					if(colm.type=='control'){
						td.html(colm.content(row));
						if(colm.css!=undefined){
							td.css(colm.css);
						}
						tr.append(td);
					}else{
						if(row[colm.name]!=undefined){
							td.html(row[colm.name]);
							if(colm.css!=undefined){
								td.css(colm.css);
							}
							tr.append(td);
						}
					}
				});
				tblBodyBody.append(tr);
			});
			return tblBodyBody;
		}
		
		function adjColums(dom){
			$(dom).find('.jdgrid-body-wrapper table tbody tr:first td').each(function(i,td){
				var w=$(td).outerWidth();
				$(dom).find('.jdgrid-header-wrapper table thead tr th:eq('+i+'),.jdgrid-footer-wrapper table tfoot tr td:eq('+i+')').outerWidth(w);
			});
		}
	};
	
})(jQuery);