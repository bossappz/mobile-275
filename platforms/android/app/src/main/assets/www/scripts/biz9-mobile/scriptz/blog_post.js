//9_detail
function set_page_blog_post_detail(data){
	hide_page_cart_top();
	bind_page_id(data.item);
	bind_detail(data);
	bind_detail_blog_post(data.item);
	bind_detail_blog_post_photo(data.item);
	bind_detail_review(data.item);
	init_plugin();
	hide_page_spinner();
	function bind_detail(data){
		set_page_footer_navigation(data,data.data_type);
		set_page_detail_title(data.item.title);
		set_page_detail_double_slide_show(data.item,data.item_list);
		set_page_detail_sub_note(data.item.sub_note);
		set_page_detail_note(data.item);
		set_page_detail_view_count(data.item.view_count);
		set_page_event_detail_like_count(data.item);
		set_page_detail_category(data.item);
		set_page_detail_media(data.item);
	}
	function bind_detail_blog_post(item){
		author='';
		date ="<span style='margin-right:5px;class=''><i class='fa fa-clock pe-2 ml-5'></i>"+item.date_obj.date_create+" " + item.date_obj.month_create +", " + item.date_obj.year_create +" at "+ item.date_obj.time_update +"</span>";
		if(item.author){
			author ="<span style='margin-right:5px;'><i class='fa fa-pen pe-2 pr-4'></i>"+item.author+"</span>";
			$("#biz_lbl_info").html(author+ " " +date);
		}else{
			$("#biz_lbl_info").html(date);
		}
	}
	function bind_detail_blog_post_photo(item){
		if(item.photofilename){
			$("#biz_img_primary").css("background-image", "url(" + item.photo_obj.mid_url + ")");
		}else{
			$("#biz_img_primary").hide();
		}
		$("#biz_lbl_photo_list").html(bind_detail_photo_list_str(item.photos));
	}
}
//9_blog_post_detail 9_blog_post_edit 9_edit 9_dashboard_blog_post_edit
function set_dashboard_blog_post_edit(data){
	hide_page_footer();
	hide_page_cart_top();
	bind_page_id(data.item);
	bind_detail_blog_post_edit(data);
	bind_detail(data);
	bind_event();
	bind_event_dashboard_photo();
	bind_event_dashboard_mp3();
	init_tab();
	init_form();
	hide_page_spinner();
	if(TEST_MODE && !data.item.tbl_id){
		var data = get_test_data(data);
		bind_detail_blog_post_edit(data);
		bind_detail(data);
	}
	function bind_detail(data){
		set_page_title('Dashboard');
		set_item_content_edit(data.item,data.data_type_info.title);
		set_item_category_edit(data.category_list,data.item.category);
		set_item_mp3_edit(data.item);
		set_item_visible_edit([],data.item.visible);
		set_item_note(data.item.note);
	}
	function bind_detail_blog_post_edit(data){
		$('#biz_tb_author').val(data.item.author);
	}
	function bind_event(){
			$("#biz_btn_update").click(function() {
			var obj=get_new_item(DT_BLOG_POST, $('#biz_page_tbl_id').val());
			var send_notification='false';
			if($("#biz_check_send_notification").is(':checked')){
				send_notification='true';
			}
			obj.title=$('#biz_tb_title').val();
			obj.photofilename=$('#biz_page_photofilename').val();
			obj.category=$('#biz_sel_category').val();
			obj.author=$('#biz_tb_author').val();
			obj.youtube_url=$('#biz_tb_youtube_url').val();
			obj.pdf_link=$('#biz_tb_pdf_link').val();
			obj.mp3filename=$('#biz_page_mp3filename').val();
			obj.sub_note=$('#biz_tb_sub_note').val();
			obj.visible=$('#biz_sel_visible').val();
			obj.note=get_item_note();
			if(!obj.title){
				show_toast_error('Please enter a valid title');
			}else if(!obj.category){
				show_toast_error('Please select a valid category');
			}else if(!obj.visible){
				show_toast_error('Please select visible');
			}else{
				url = "item/update_item/"+send_notification;
				cloud_post_url(get_cloud_url(url,[]),obj,function(data){
					bind_page_id(data.item);
					show_toast_update();
					return false;
				});
			}
		});
	}
	function get_test_data(data){
		var test_data={};
		test_data.item=get_test_item(DT_BLOG_POST);
		test_data.visible='true';
		test_data.category_list=data.category_list;
		test_data.type_list=data.type_list;
		test_data.data_type_info=data.data_type_info;
		return test_data;
	}
}
