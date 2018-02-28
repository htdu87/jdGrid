(function($){
	jQuery.fn.jdPage=function(options){
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
			
		});
	};
})(jQuery);