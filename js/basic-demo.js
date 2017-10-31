$(document).ready(function(){
	var g=$('#jdgrid').jdGrid({
		columns:[
			{name:'name',title:'Name'},
			{name:'position',title:'Position'},
			{name:'office',title:'Office'},
			{name:'age',title:'Age',align:'right'},
			{name:'date',title:'Start date'},
			{name:'salary',title:'Salary',align:'right',type:'money'}
		]
	});
	
	var g1=$('#jdgrid1').jdGrid({
		height:'200px',
		columns:[
			{name:'name',title:'Name'},
			{name:'age',title:'Age',align:'right'},
			{name:'address',title:'Address'},
			{name:'married',title:'Is married',align:'center',type:'check'},
			{name:'control',title:'Actions',align:'center',type:'control',content:function(i,item){return '<a href="#">Link</a>'}}
		]
	});
	
	$('#jdpage').jdPage({
		totalPage:0,
		curPage:0,
		itemPerPage:0,
		totalItem:0
	});
	
	$('#jdpage1').jdPage({
		totalPage:3,
		curPage:1,
		itemPerPage:10,
		totalItem:25
	});
	
	 g.data('jdgrid').fillData([
		{name:'Airi Satou',position:'Accountant',office:'Tokyo',age:33,date:'2008/11/28',salary:'162700'},
		{name:'Ashton Cox',position:'Chief Executive Officer (CEO)',office:'London',age:47,date:'2009/10/09',salary:1200000},
		{name:'Bradley Greer',position:'Junior Technical Author',office:'San Francisco',age:66,date:'2009/01/12',salary:86000}
	]);
	
	g1.data('jdgrid').fillData([
		{name:'Otto Clay',age:61,address:'911-5143 Luctus Ave',married:true},
		{name:'Timothy Henson',age:78,address:'P.O. Box 738, 7583 Quisque St.',married:false},
		{name:'Ramona Benton',age:43,address:'847-4303 Dictum Av.',married:true}
	]); 
	
	$('#btnRefresh').click(function(){
		$('.jdgrid').each(function(i,o){
			$(o).data('jdgrid').refresh();
		});
		//$('.jdgrid').data('jdgrid').refresh();
	});
});