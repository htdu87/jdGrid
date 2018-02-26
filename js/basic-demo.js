$(document).ready(function(){
	$('#jdgrid').jdGrid({
		height:'100px'
	});
	
	$('#jdgrid1').jdGrid({
		height:'200px',
		class:'table table-bordered',
		columns:[
			{name:'name',title:'Name'},
			{name:'age',title:'Age',align:'right'},
			{name:'address',title:'Address'},
			{name:'married',title:'Mred',align:'center',type:'check'},
			{name:'input',title:'Input',type:'textbox',width:'100px'},
			{name:'control',title:'Actions',align:'center',type:'control',content:function(i,item){return '<a href="#">Link</a>'}}
		]
	});
	
	$('#jdgrid2').jdGrid({
		extclass:'tbl-bold-footer',
		height:'300px',
		columns:[
			{name:'name',title:'Name'},
			{name:'position',title:'Position', color:'red'},
			{name:'office',title:'Office'},
			{name:'age',title:'Age',type:'textbox',css:{'text-align':'right'}},
			{name:'date',title:'Start date'},
			{name:'salary',title:'Salary',type:'money',css:{'text-align':'right'}},
			{name:'input',title:'Act',css:{'text-align':'center','width':'50px'},type:'control',content:function(obj){return '<a href="#">Link</a>'}},
		],
		data:[
			{name:'Airi Satou',position:'Accountant',office:'Tokyo',age:33,date:'2008/11/28',salary:162700},
			{name:'Ashton Cox',position:'Chief Executive Officer (CEO)',office:'London',age:47,date:'2009/10/09',salary:1200000},
			{name:'Bradley Greer',position:'Junior Technical Author',office:'San Francisco',age:66,date:'2009/01/12',salary:86000},
			{name:'Airi Satou',position:'Accountant',office:'Tokyo',age:33,date:'2008/11/28',salary:162700,input:3},
			{name:'Ashton Cox',position:'Chief Executive Officer (CEO)',office:'London',age:47,date:'2009/10/09',salary:1200000},
			{name:'Airi Satou',position:'Accountant',office:'Tokyo',age:33,date:'2008/11/28',salary:162700},
			{name:'Ashton Cox',position:'Chief Executive Officer (CEO)',office:'London',age:47,date:'2009/10/09',salary:1200000},
			{name:'Bradley Greer',position:'Junior Technical Author',office:'San Francisco',age:66,date:'2009/01/12',salary:86000},
			{name:'Airi Satou',position:'Accountant',office:'Tokyo',age:33,date:'2008/11/28',salary:162700,input:3},
			{name:'Ashton Cox',position:'Chief Executive Officer (CEO)',office:'London',age:47,date:'2009/10/09',salary:1200000}
		],
		footer:{age:53,date:'',salary:2400000}
	});
	
	
	/* var g=$('#jdgrid').jdGrid({
		columns:[
			{name:'name',title:'Name'},
			{name:'position',title:'Position', color:'red'},
			{name:'office',title:'Office'},
			{name:'age',title:'Age',align:'right'},
			{name:'date',title:'Start date'},
			{name:'salary',title:'Salary',align:'right',type:'money'},
			{name:'input',title:'Input',type:'textbox',width:'50px'},
		],
		borderClr:'red',
		footer:true,
		data:[
			{name:'Airi Satou',position:'Accountant',office:'Tokyo',age:33,date:'2008/11/28',salary:162700,input:3},
			{name:'Ashton Cox',position:'Chief Executive Officer (CEO)',office:'London',age:47,date:'2009/10/09',salary:1200000,input:3},
			{name:'Bradley Greer',position:'Junior Technical Author',office:'San Francisco',age:66,date:'2009/01/12',salary:86000,input:3},
			{name:'Airi Satou',position:'Accountant',office:'Tokyo',age:33,date:'2008/11/28',salary:162700,input:3},
			{name:'Ashton Cox',position:'Chief Executive Officer (CEO)',office:'London',age:47,date:'2009/10/09',salary:1200000,input:3}
		],
		decimalSeparate:',',
		thousandSeparate:'.',
		height:'200px',
	});
	
	var g1=$('#jdgrid1').jdGrid({
		height:'200px',
		columns:[
			{name:'name',title:'Name'},
			{name:'age',title:'Age',align:'right'},
			{name:'address',title:'Address'},
			{name:'married',title:'Mred',align:'center',type:'check'},
			{name:'input',title:'Input',type:'textbox',width:'100px'},
			{name:'control',title:'Actions',align:'center',type:'control',content:function(i,item){return '<a href="#">Link</a>'}}
		],
		data:[
			{name:'Otto Clay',age:61,address:'911-5143 Luctus Ave',married:true,input:1},
			{name:'Timothy Henson',age:78,address:'P.O. Box 738, 7583 Quisque St.',married:false,input:2},
			{name:'Ramona Benton',age:43,address:'847-4303 Dictum Av.',married:true,input:3}
		]
	}); */
	
	/* $('#jdpage').jdPage({
		totalPage:0,
		curPage:0,
		itemPerPage:0,
		totalItem:0,
		onPageChange:function(page){
			console.log('jdpage: '+page);
		}
	});
	
	$('#jdpage1').jdPage({
		totalPage:3,
		curPage:1,
		itemPerPage:10,
		totalItem:25,
		onPageChange:function(page){
			console.log('jdpage1: '+page);
		}
	}); */
	
	/* g.data('jdgrid').fillData([
		{name:'Airi Satou',position:'Accountant',office:'Tokyo',age:33,date:'2008/11/28',salary:'162700'},
		{name:'Ashton Cox',position:'Chief Executive Officer (CEO)',office:'London',age:47,date:'2009/10/09',salary:1200000},
		{name:'Bradley Greer',position:'Junior Technical Author',office:'San Francisco',age:66,date:'2009/01/12',salary:86000}
	]);
	
	g1.data('jdgrid').fillData([
		{name:'Otto Clay',age:61,address:'911-5143 Luctus Ave',married:true},
		{name:'Timothy Henson',age:78,address:'P.O. Box 738, 7583 Quisque St.',married:false},
		{name:'Ramona Benton',age:43,address:'847-4303 Dictum Av.',married:true}
	]);  */
	
	$('#btnRefresh').click(function(){
		/* $('.jdgrid').each(function(i,o){
			$(o).data('jdgrid').refresh();
		}); */
		//$('.jdgrid').data('jdgrid').refresh();
		//$('.jdpage').data('jdpage').update([3,2,10,25]);
		console.log(g.data('jdgrid').getData());
		console.log(g1.data('jdgrid').getData());
	});
});