(function($){
	var priVar;
	$.fn.jdGrid=function(optAct,arg){
		priVar=this.text();
		if(typeof optAct === 'string'){
			switch(optAct){
				case 'debug':
					console.log(priVar);
					break;
				default:
					
			}
		}else{
			console.log('Init jdGrid');
		}
		return this;
	};
}(jQuery));