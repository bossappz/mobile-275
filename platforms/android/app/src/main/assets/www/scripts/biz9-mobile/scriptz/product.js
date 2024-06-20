//9_detail //9_product_detail
function set_page_product_detail(data){
    bind_page_id(data.item);
    bind_detail(data);
    bind_detail_review(data.item);
    bind_event();
    init_plugin();
    hide_page_spinner();
     function bind_detail(data){
        set_page_footer_navigation(data,data.data_type);
        set_page_detail_title(data.item.title);
        set_page_detail_option_list(data.item);
        set_page_detail_product_photo(data.item);
        set_page_detail_double_slide_show(data.item,data.item_list);
        set_page_detail_sub_note(data.item.sub_note);
        set_page_detail_note(data.item);
        set_page_detail_view_count(data.item.view_count);
        set_page_event_detail_like_count(data.item);
        set_page_detail_category(data.item);
        set_page_detail_media(data.item);
        set_page_detail_visible(data.item.visible,data.item.visible_obj.product_status);
        set_page_detail_price(data.item);
        set_page_product_in_app_purchase(data.item);
    }
   function bind_event(){
        //9_cart cart-start cart_add add_cart 9_add_cart-- 9_cart_add
        $("#biz_btn_cart_add").click(function() {
            hide_toast();
            $('#biz_btn_cart_add').addClass("bg-click");
            $('#biz_btn_cart_add').html("Added to Cart!");
            option_item_1_tbl_id=$('#biz_sel_option0').val();
            option_item_2_tbl_id=$('#biz_sel_option1').val();
            option_item_3_tbl_id=$('#biz_sel_option2').val();
            option_item_4_tbl_id=$('#biz_sel_option3').val();
            obj={};
            obj.tbl_id=$('#biz_page_tbl_id').val();
            obj.data_type=DT_PRODUCT;
            obj.customer_id=get_user().customer_id;
            if(option_item_1_tbl_id){
                obj.option_item_1_tbl_id=option_item_1_tbl_id;
            }
            if(option_item_2_tbl_id){
                obj.option_item_2_tbl_id=option_item_2_tbl_id;
            }if(option_item_3_tbl_id){
                obj.option_item_3_tbl_id=option_item_3_tbl_id;
            }if(option_item_4_tbl_id){
                obj.option_item_4_tbl_id=option_item_4_tbl_id;
            }
            cloud_order_cart_add(DT_PRODUCT,obj.tbl_id,obj,1,function(data){
                return false;
            });
        });
    }
}
// 9_product_edit 9_edit 9_dashboard_product_edit
function set_dashboard_product_edit(data){
    hide_page_footer();
	hide_page_cart_top();
    bind_page_id(data.item);
    bind_detail(data);
   	bind_event();
	bind_event_dashboard_photo();
	bind_event_dashboard_mp3();
	init_tab();
    init_form();
    hide_page_spinner();
	if(TEST_MODE && !data.item.tbl_id){
		var data = get_test_data(data);
		bind_detail(data);
	}
    function bind_detail(data){
        set_page_title('Dashboard');
       	set_item_content_edit(data.item,data.data_type_info.title);
		set_item_category_edit(data.category_list,data.item.category);
        set_item_mp3_edit(data.item);
	    set_item_price_edit(data.item.price,data.item.old_price);
        set_item_visible_edit(data.product_visible_option_list,data.item.visible,'text','value');
		set_item_in_app_product_edit(data.item.app_store_product,data.item.app_store_product_id);
		set_item_note(data.item.note);
    }
    function bind_event(){
        $("#biz_btn_update").click(function() {
            var obj=get_new_item(DT_PRODUCT, $('#biz_page_tbl_id').val());
            var send_notification=false;
            if($("#biz_check_send_notification").is(':checked')){
                send_notification=true;
            }
            obj.title=$('#biz_tb_title').val();
            obj.photofilename=$('#biz_page_photofilename').val();
            obj.price=$('#biz_tb_price').val();
            obj.old_price=$('#biz_tb_old_price').val();
            obj.category=$('#biz_sel_category').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.youtube_url=$('#biz_tb_youtube_url').val();
            obj.pdf_link=$('#biz_tb_pdf_link').val();
            obj.mp3filename=$('#biz_page_mp3filename').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.app_store_product=$('#biz_sel_app_store_product').val();
            obj.app_store_product_id=$('#biz_tb_app_store_product_id').val();
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
		test_data.item=get_test_item(DT_PRODUCT);
        test_data.category_list=data.category_list;
        test_data.product_visible_option_list=data.product_visible_option_list;
		test_data.data_type_info=data.data_type_info;
		test_data.type_list=data.type_list;
		test_data.data_type_info=data.data_type_info;
		return test_data;
	}

}
//9_product_list 9_edit_list 9_list 9_dashboard_product_list //9_dashboard //9_dashboard_list //9_edit_list
function set_dashboard_product_list(data){
    hide_footer();
    set_page_hide_cart_top();
    bind_page_id({tbl_id:0,data_type:DT_PRODUCT});
    bind_detail(data);
    bind_list(data.product_list,data.page_current,data.page_count);
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Products');
    }
    function bind_list(item_list,page_current,page_count){
        $('#biz_lbl_list').html(bind_dashboard_list(item_list,page_current,page_count));
        $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
        bind_event_dashboard_list(data);
    }
}
function get_product_visible_str(product_visible_id){
    switch(String(product_visible_id)){
        case '0':
            return 'Out of stock';
        case '1':
            return 'Only 1 left';
        case '2':
            return 'Less than 3 left';
        case '3':
            return 'In stock. Ships Immediately';
        default:
            return 'Out of stock';
    }
}
//-- PRODUCT PROCESSING END --
