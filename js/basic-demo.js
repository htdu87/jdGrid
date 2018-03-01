$(document).ready(function(){
	$('#jdgrid').jdGrid({
		height:'200px',
		columns:[
			{name:'ten',title:'Họ tên'},
			{name:'tuoi',title:'Tuổi',css:{'text-align':'right'},editable:true,format:true},
			{name:'diachi',title:'Địa chỉ'},
			{name:'ttac',title:'T.Tác',type:'control',css:{'text-align':'center','width':'50px'},content:function(obj){return '<a href="#" class="del-row">Link</a>'}}
		],
		shwfooter:true,
		extclass:'tbl-bold-footer',
		onCellCommit:function(obj){
			console.log(obj);
		}
	});
	
	$('#jdgrid1').jdGrid({
		height:'200px',
		class:'table table-bordered',
		columns:[
			{name:'name',title:'Name'},
			{name:'age',title:'Age',css:{'text-align':'right'},editable:true},
			{name:'address',title:'Address'},
			{name:'today',title:'Today',type:'interval'},
			{name:'married',title:'Mred',type:'check',css:{'text-align':'center'}}
		],
		data:[
			{name:'Otto Clay',age:61,address:'911-5143 Luctus Ave',today:1519789004647,married:true},
			{name:'Timothy Henson',age:78,address:'P.O. Box 738, 7583 Quisque St.',today:1519789004647,married:false},
			{name:'Ramona Benton',age:43,address:'847-4303 Dictum Av.',today:1519789004647,married:true}
		],
		footer:{'age':52},
		shwfooter:true,
		dateformat:'yyyy/mm/dd'
	});
	
	$('#jdgrid2').jdGrid({
		extclass:'tbl-bold-footer',
		height:'300px',
		columns:[
			{name:'name',title:'Name'},
			{name:'position',title:'Position', color:'red'},
			{name:'office',title:'Office'},
			{name:'age',title:'Age',type:'textbox',css:{'text-align':'right','width':'80px'},editable:true},
			{name:'date',title:'Start date'},
			{name:'salary',title:'Salary',type:'money',css:{'text-align':'right'},format:true},
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
		footer:{age:53,date:'',salary:2400000},
		shwfooter:true,
		onRowSelected:function(obj){
			//console.log(obj);
		},
		decnum:0
	});
	
	$('#jdpage').jdPage({
		totalPage:8,
		currentPage:8,
		totalItem:75,
		itemOnPage:10,
		showLabel:true,
		onPageChanged:function(page){
			//console.log(page);
			$('#jdpage').data('jdpage').setCurrentPage(page);
		}
	});
	
	$('#btnRefresh').click(function(){
		//$('#jdgrid2').data('jdgrid').clearData();
		var data=[
			{ten:'Otto Clay',tuoi:61,diachi:'911-5143 Luctus Ave'},
			{ten:'Timothy Henson',tuoi:78,diachi:'P.O. Box 738, 7583 Quisque St.'},
			{ten:'Ramona Benton',tuoi:43,diachi:'847-4303 Dictum Av.'}
		];
		//$('#jdgrid').data('jdgrid').fillData(data);
		var row={ten:'Otto Clay',tuoi:61,diachi:'911-5143 Luctus Ave'};
		$('#jdgrid').data('jdgrid').addRow(row);
		$('.del-row').off('click').on('click',function(e){
			e.preventDefault();
			//console.log($(this).index());
			$('#jdgrid').data('jdgrid').removeRow($('.del-row').index($(this)));
		});
		$('#jdgrid').data('jdgrid').setFooter({tuoi:65});
		console.log($('#jdgrid2').data('jdgrid').getSelectedRow());
		
		
	});
	
	$(window).resize(function(){
		$('#jdgrid2').data('jdgrid').refresh();
	});
});