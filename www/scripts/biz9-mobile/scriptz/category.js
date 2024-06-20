//9_category_detail 9_category_edit 9_edit 9_dash
function set_dashboard_category_edit(data){
	hide_page_footer();
	bind_page_id(data.category);
	bind_detail(data);
	bind_detail_category_edit(data);
	bind_event();
	init_form();
	hide_page_spinner();
	if(TEST_MODE && !data.category.tbl_id){
        var data = get_test_data(data);
        bind_detail(data);
        bind_detail_category_edit(data);
    }
	function bind_detail(data){
		set_page_title('Dashboard');
		hide_page_cart_top();
		set_item_content_edit(data.category,data.data_type_info.title);
		set_item_visible_edit(data.category,[]);
	}
	function bind_detail_category_edit(data){
		$('#biz_sel_category_list').html(get_option_list_str(data.category_list,'title','data_type'));
		if(data.category.type){
			$('#biz_sel_category_list').val(data.category.type);
		}else{
			$('#biz_sel_category_list').val();
		}
	}
	function bind_event(){
		$("#biz_btn_update").click(function() {
			var obj={};
			var obj=get_new_item($('#biz_page_data_type').val(), $('#biz_page_tbl_id').val());
			obj.photofilename= $('#biz_page_photofilename').val();
			obj.title=$('#biz_tb_title').val();
			obj.sub_note=$('#biz_tb_sub_note').val();
			obj.type=$('#biz_sel_category_list').val();
			if(obj.title){
				cloud_update(DT_CATEGORY,obj.tbl_id,obj,function(data){
					bind_page_id(data.item);
					show_toast_update();
					return false;
				});
			}else{
				show_toast_error('Please enter a valid title');
			}
		});
	}
	function get_test_data(data){
		var test_data={};
		test_data.category=get_test_item(DT_CATEGORY);
		test_data.category_list=data.category_list;
		test_data.type_list=data.type_list;
		test_data.data_type_info=data.data_type_info;
		return test_data;
    }
}
