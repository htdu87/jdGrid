(function($){
	var colsCss={};
	var colsType={};
	var cols;
	var setting;
	$.fn.jdGrid=function(optAct,arg){
		if(typeof optAct === 'string'){
			switch(optAct){
				case 'fillData':
					fillData(cols,this,arg,setting);
					break;
				case 'addRow':
					fillData(cols,this,arg,setting);
					break;
				case 'refresh':
					this.each(function(i,obj){
						drawGrid($(this));
					});
					break;
				default:
					
			}
		}else{
			cols=optAct.columns;
			setting=$.extend({
				separator:'.',
				decimalpoint:',',
				dateFormat:'d/m/Y',
				height:'300px'
			},optAct);
			
			//console.log('------Init jdGrid------');
			var headWrap=$('<div class="jdgrid-wrap-head"></div>').css({'border-top':'1px solid #ddd','border-left':'1px solid #ddd','border-right':'1px solid #ddd'});
			var bodyWrap=$('<div class="jdgrid-wrap-body"></div>').css({'border-bottom':'1px solid #ddd','border-left':'1px solid #ddd','border-right':'1px solid #ddd','height':setting.height});
			var footerWrap=$('<div class="jdgrid-wrap-footer row"></div>');
			var tblHead=$('<table class="table table-bordered table-striped"><thead><tr></tr></thead></table>');
			var tblBody=$('<table class="table table-bordered table-striped"><thead><tr></tr></thead><tbody></tboy></table>');
			//var paging=$('<div class="col-md-8"><nav><ul class="pagination pagination-sm jdgrid-paging"></ul></nav></div><div class="col-md-4 text-right"><nav><ul class="pagination pagination-sm jdgrid-paging-info"><li>Showing 1 to 10 of 30</li></div>');
			
			// Gen header
			$.each(optAct.columns, function(i,item){
				var style={};
				if(item.align!=undefined){
					style['text-align']=item.align;
				}
				if(item.width!=undefined){
					style['width']=item.width;					
				}
				colsCss[item.name]=style;
				colsType[item.name]=item.type==undefined?'':item.type;
				
				var th=$('<th></th>').html(item.title).css(style);
				tblHead.find('thead tr').append(th);
				tblBody.find('thead tr').append(th.clone());
			});
			
			// Gen body
			$.each(optAct.data, function(i,item){
				var tr=$('<tr></tr>');
				$.each(optAct.columns, function(j,itm){
					var td=$('<td></td>').css(colsCss[itm.name]);
					switch(itm.type){
						case 'money':
							td.html(formatNumber(item[itm.name], setting.separator));
							break;
						case 'date':
							td.html(reformatDate(item[itm.name]));
							break;
						case 'interval':
							td.html(milisecToDate(item[itm.name]));
							break;
						case 'base64img':
							td.html('<img src="data:image/png;base64,'+item[itm.name]+'" class="img-responsive" width="17" />');
							break;
						case 'control':
							td.html(itm.content(i,item));
							break;
						case 'check':
							var checked=(item[itm.name]==1||item[itm.name]==true)?'checked':'';
							td.html('<input type="checkbox" disabled="disabled" '+checked+' />');
							break;
						default:
							td.html(item[itm.name]);
					}
					tr.append(td);
				});
				tblBody.find('tbody').append(tr);
			});
			
			headWrap.append(tblHead);
			bodyWrap.append(tblBody);
			//footerWrap.append(paging);
			this.append(headWrap);
			this.append(bodyWrap);
			//this.append(footerWrap);
			
			genPaging(this, setting.pageCount, setting.curPage);
			drawGrid(this);
		}
		return this;
	};
	
	function drawGrid(obj){
		if(obj.find('.jdgrid-wrap-body').length>0 && obj.find('.jdgrid-wrap-head').length>0){
			obj.find('.jdgrid-wrap-body table thead tr:first th').each(function(i){
				var w=$(this).outerWidth();
				obj.find('.jdgrid-wrap-head table thead tr:first th:nth-child('+(i+1)+')').outerWidth(w);
			});
			obj.find('.jdgrid-wrap-body table').css('margin-top','-'+$('.jdgrid-wrap-body table thead').outerHeight()+'px');
		}
	}

	function fillData(columns,obj,data,sett){
		obj.find('.jdgrid-wrap-body table tbody tr').remove();
		$.each(data, function(i,item){
			var tr=$('<tr></tr>');
			$.each(columns, function(j,itm){
				var td=$('<td></td>').css(colsCss[itm.name]);
				switch(itm.type){
					case 'money':
						td.html(formatNumber(item[itm.name], sett.separator));
						break;
					case 'date':
						td.html(reformatDate(item[itm.name]));
						break;
					case 'interval':
						td.html(milisecToDate(item[itm.name]));
						break;
					case 'base64img':
						td.html('<img src="data:image/png;base64,'+item[itm.name]+'" class="img-responsive" width="17" />');
						break;
					case 'control':
						td.html(itm.content(i,item));
						break;
					case 'check':
						var checked=(item[itm.name]==1||item[itm.name]==true)?'checked':'';
						td.html('<input type="checkbox" disabled="disabled" '+checked+' />');
						break;
					default:
						td.html(item[itm.name]);
				}
				tr.append(td);
			});
			obj.find('.jdgrid-wrap-body table tbody').append(tr);
		});
		drawGrid(obj);
	}
	
	function addRow(columns,obj,row,sett){
		var tr=$('<tr></tr>');
		$.each(columns, function(j,itm){
			var td=$('<td></td>').css(colsCss[itm.name]);
			switch(itm.type){
				case 'money':
					td.html(formatNumber(row[itm.name], sett.separator));
					break;
				case 'date':
					td.html(reformatDate(row[itm.name]));
					break;
				case 'interval':
					td.html(milisecToDate(row[itm.name]));
					break;
				case 'base64img':
					td.html('<img src="data:image/png;base64,'+row[itm.name]+'" class="img-responsive" width="17" />');
					break;
				case 'control':
					td.html(itm.content(i,row));
					break;
				case 'check':
					var checked=(row[itm.name]==1||row[itm.name]==true)?'checked':'';
					td.html('<input type="checkbox" disabled="disabled" '+checked+' />');
					break;
				default:
					td.html(row[itm.name]);
			}
			tr.append(td);
		});
		obj.find('.jdgrid-wrap-body table tbody').append(tr);
		drawGrid(obj);
	}

	function genPaging(obj,sett){
		/* if(pageCount<=1) return;
		obj.find('.jdgrid-paging').append('<li><a href="#" class="jdgrid-page" page="1">&laquo;</a></li>');
		for(var i=1;i<=pageCount;i++){
			
		}
		obj.find('.jdgrid-paging').append('<li><a href="#" class="jdgrid-page" page="'+(curPage+1)+'">&raquo;</a></li>'); */
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
	
}(jQuery));

