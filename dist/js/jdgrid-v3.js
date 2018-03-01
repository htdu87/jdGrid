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
			decsym:'.',
			thosym:',',
			decnum:2,
			dateformat:'dd/mm/yyyy hh:MM:ss',
			onRowSelected:function(){},
			onCellCommit:function(){}
		};
		var settings=$.extend({},defaults,options);
		return this.each(function(){
			var jdgrid={
				element:this,
				fillData:function(data){
					settings.data=data;
					$(this.element).find('.jdgrid-body-wrapper table tbody').remove();
					$(this.element).find('.jdgrid-body-wrapper table').append(genTableBody());
					regEvent(this.element);
					adjColums(this.element);
				},
				clearData:function(){
					clrData(this.element);
				},
				getData:function(){
					return settings.data;
				},
				addRow:function(row){
					settings.data.push(row);
					$(this.element).find('.jdgrid-body-wrapper table tbody').append(genTableRow(row));
					regEvent(this.element);
					adjColums(this.element);
				},
				removeRow:function(i){
					settings.data.splice(i,1);
					$(this.element).find('.jdgrid-body-wrapper table tbody tr:eq('+i+')').remove();
					adjColums(this.element);
				},
				refresh:function(){
					adjColums(this.element);
				},
				setFooter:function(footer){
					if(settings.shwfooter){
						$(this.element).find('.jdgrid-body-wrapper table tfoot tr,.jdgrid-footer-wrapper table tfoot tr').remove();
						$(this.element).find('.jdgrid-body-wrapper table tfoot,.jdgrid-footer-wrapper table tfoot').append(genFooterRow(footer));
						adjColums(this.element);
					}
				},
				getSelectedRow:function(){
					var i=$(this.element).find('.jdgrid-body-wrapper table tbody tr.actived').index();
					return i<0?null:settings.data[i];
				}
			};
			$(this).data('jdgrid',jdgrid);
			
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
			tblBodyFooter.append(genFooterRow(settings.footer));
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
			
			regEvent(this);
			
			adjColums(this);
		});
		
		function debug(){
			console.log(settings);
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
					case 'interval':
						td.html(milisec2Date(row[colm.name]));
						break;
					default:
						td.html(colm.format?formatNum(row[colm.name],settings.decnum,settings.decsym,settings.thosym):row[colm.name]);
				}
				
				if(colm.css!=undefined){
					td.css(colm.css);
				}
				if(colm.editable){
					td.addClass('editable');
				}
				tr.append(td);
			});
			return tr;
		}
		
		function genFooterRow(footer){
			var tr=$('<tr/>');
			$.each(settings.columns,function(j,colm){
				var td=$('<td/>');
				if(footer[colm.name]!=undefined){
					td.html(colm.format?formatNum(footer[colm.name],settings.decnum,settings.decsym,settings.thosym):footer[colm.name]);
					if(colm.css!=undefined){
						td.css(colm.css);
					}
				}
				tr.append(td);
			});
			return tr;
		}
		
		function adjColums(dom){
			$(dom).find('.jdgrid-body-wrapper table thead tr:first th').each(function(i,td){
				$(dom).find('.jdgrid-header-wrapper table thead tr th:eq('+i+'),.jdgrid-footer-wrapper table tfoot tr td:eq('+i+')').outerWidth($(td).outerWidth());
			});
		}
		
		function clrData(dom){
			settings.data=[];
			$(dom).find('.jdgrid-body-wrapper table tbody tr').remove();
		}
		
		function regEvent(dom){
			$(dom).find('.jdgrid-body-wrapper table tbody tr').off('click').on('click',function(){
				//debug();
				$(dom).find('.jdgrid-body-wrapper table tbody tr').removeClass('actived');
				$(this).addClass('actived');
				settings.onRowSelected(settings.data[$(this).index()]);
			});
			
			$(dom).find('.jdgrid-body-wrapper table tbody tr td.editable').off('dblclick').on('dblclick',function(){
				//debug();
				var row = $(this).parent().index();
				var col = $(this).index();
				var inpt=$('<input type="text"/>');
				inpt.css({'color':'#000'}).val(settings.data[row][settings.columns[col]['name']]).width($(this).width());
				$(this).html(inpt);
				adjColums(dom);
				inpt.select();
				inpt.keypress(function(e){
					if(e.which==13){
						//var row = $(this).parent().parent().index();
						//var col = $(this).parent().index();
						var val=settings.columns[col].format&&!isNaN($(this).val())?$(this).val():0;
						settings.data[row][settings.columns[col]['name']]=val;
						$(this).parent().html(settings.columns[col].format?formatNum($(this).val(),settings.decnum,settings.decsym,settings.thosym):$(this).val());
						adjColums(dom);
						settings.onCellCommit(settings.data[row]);
					}
				});
			});
		}
		
		function formatNum(n,c,d,t){
			var n = n, 
				c = isNaN(c = Math.abs(c)) ? 2 : c, 
				d = d == undefined ? "." : d, 
				t = t == undefined ? "," : t, 
				s = n < 0 ? "-" : "", 
				i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
				j = (j = i.length) > 3 ? j % 3 : 0;
			return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		}
		
		function milisec2Date(milisec){
			var date=new Date(milisec);
			var dd=('0'+date.getDate()).slice(-2);
			var mm=('0'+(date.getMonth() + 1)).slice(-2);
			var yyyy=date.getFullYear();
			var hh=('0'+date.getHours()).slice(-2);
			var MM=('0'+date.getMinutes()).slice(-2);
			var ss=('0'+date.getSeconds()).slice(-2);
			return settings.dateformat.replace('dd',dd).replace('mm',mm).replace('yyyy',yyyy).replace('hh',hh).replace('MM',mm).replace('ss',ss);
		}
	};
	
})(jQuery);