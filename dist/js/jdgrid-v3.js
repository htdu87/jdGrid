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
			shwfooter:false,
			onRowSelected:function(){}
		};
		var settings=$.extend({},defaults,options);
		return this.each(function(){
			var jdgrid={
				element:this,
				fillData:function(data){
					settings.data=data;
					$(this.element).find('.jdgrid-body-wrapper table tbody').remove();
					$(this.element).find('.jdgrid-body-wrapper table').append(genTableBody());
					adjColums(this.element);
				},
				clearData:function(){
					clrData(this.element);
				},
				addRow:function(row){
					settings.data.push(row);
					$(this.element).find('.jdgrid-body-wrapper table tbody').append(genTableRow(row));
					adjColums(this.element);
				},
				removeRow:function(i){
					
				}
			};
			$(this).data('jdgrid', jdgrid);
			
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
			
			if(settings.shwfooter){
				var footWrp=$('<div/>').addClass('jdgrid-footer-wrapper');
				var tblFoot=$('<table/>').addClass(settings.class).addClass(settings.extclass).append(tblBodyFooter.clone());
				footWrp.append(tblFoot);
				$(this).append(footWrp);
			}
			
			tblBodyHeader.css({'visibility':'collapse'});
			tblBodyFooter.hide();
			
			$(this).off('click').on('click',function(){
				debug();
				//console.log(tblBodyHeader.find('tr th:eq(0)').outerWidth());
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
				tblBodyBody.append(genTableRow(row));
			});
			return tblBodyBody;
		}
		
		function genTableRow(row){
			var tr=$('<tr/>');
			$.each(settings.columns,function(j,colm){
				var td=$('<td/>');
				switch(colm.type){
					case 'control':
						td.html(colm.content(row));
						break;
					case 'check':
						var checked=row[colm.name]||row[colm.name]==1?'checked="checked"':'';
						td.html('<input type="checkbox" disabled="disabled" '+checked+'/>');
						break;
					default:
						td.html(row[colm.name]);
				}
				
				if(colm.css!=undefined){
					td.css(colm.css);
				}
				tr.append(td);
			});
			return tr;
		}
		
		function adjColums(dom){
			$(dom).find('.jdgrid-body-wrapper table tbody tr:first td').each(function(i,td){
				$(dom).find('.jdgrid-header-wrapper table thead tr th:eq('+i+'),.jdgrid-footer-wrapper table tfoot tr td:eq('+i+')').outerWidth($(td).outerWidth());
			});
		}
		
		function clrData(dom){
			settings.data=[];
			$(dom).find('.jdgrid-body-wrapper table tbody tr').remove();
		}
	};
	
})(jQuery);