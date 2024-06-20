//9_detail //9_service_detail
function set_page_service_detail(data){
    bind_page_id(data.item);
    bind_detail(data);
    bind_detail_service(data);
    bind_detail_review(data.item);
    bind_event();
    init_cart();
    init_plugin();
    hide_page_spinner();
    function bind_detail_service(data){
        $('#biz_lbl_cart_datetime').show();
    }
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
        set_page_detail_visible(data.item.visible,data.item.visible_obj.service_status);
        set_page_detail_price(data.item);

        set_page_product_in_app_purchase(data.item);
    }
    function  bind_photo_slide_show(item){
        $('#biz_lbl_slideshow_list').html(bind_detail_slide_show_list_str(item));
        init_slide_show('#single-slider-1');
        if(item.photos.length>0){
            $('#biz_lbl_photo_list').html(bind_detail_photo_list_str(item.photos));
        }else{
            $('#biz_lbl_card_photo_list').hide();
        }
    }
    function bind_double_slide_show(data){
        if(data.card_double_list.length>1){
            $('#biz_lbl_double_card').show();
            $('#biz_lbl_double_category').html(data.service.category);
            $('#biz_lbl_double_slide_show_list').html(bind_double_slide_show_list_str(DT_SERVICE,data.card_double_list));
            init_double_slide_show('#slider_double');
        }
    }
    function bind_event(){
        //9_cart cart-start cart_add add_cart 9_add_cart-- 9_cart_add
        $("#biz_btn_cart_add").click(function() {
            hide_toast();
            var obj=get_new_item(DT_SERVICE,$('#biz_page_tbl_id').val());
            obj.customer_id=get_user().customer_id;
            obj.start_date=$('#biz_tb_date').val();
            obj.start_time=$('#biz_tb_time').val();
            option_item_1_tbl_id=$('#biz_sel_option0').val();
            option_item_2_tbl_id=$('#biz_sel_option1').val();
            option_item_3_tbl_id=$('#biz_sel_option2').val();
            option_item_4_tbl_id=$('#biz_sel_option3').val();
            if(!obj.start_time){
                show_toast_error('Please select a time');
            }else if(!obj.start_date){
                show_toast_error('Please select a date');
            }else{
                $(this).addClass("bg-click");
                $(this).html("Booking Added To Cart!");
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
                cloud_order_cart_add(DT_SERVICE,obj.tbl_id,obj,1,function(data){
                    return false;
                });
            }
        });
    }
}

//9_service_home //9_home
function set_page_service_home(data){
    bind_detail(data);
    bind_slide_show_list(data.category_list);
    bind_mid_list(data.page.title,data.service_list);
    bind_bottom_list('',data.mobile.primary.button_color,data.category_list);
    hide_spinner();
    function bind_detail(data){
    }
    function bind_slide_show_list(item_list){
        $('#biz_slide_show_list').html(get_item_home_slide_show_list_str(item_list));
        init_slide_show('#biz_div_slide_show');
    }
    function bind_mid_list(title,item_list){
        $('#biz_lbl_mid_title').html(title);
        $('#biz_lbl_mid_list').html(get_detail_list_str(item_list));
        bind_event_detail_list_like();
    }
    function bind_bottom_list(title,button_color,item_list){
        $('#biz_lbl_bottom_title').html('title');
        $('#biz_lbl_bottom_list').html(get_category_list_str(button_color,item_list));
    }
}
// 9_service_edit 9_edit 9_dashboard_service_edit
function set_dashboard_service_edit(data){
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
       	set_item_visible_edit(data.service_visible_option_list,data.item.visible,'text','value');
		set_item_in_app_product_edit(data.item.app_store_product,data.item.app_store_product_id);
		set_item_note(data.item.note);
     }
    function bind_event(){
        $("#biz_btn_update").click(function() {
            var obj=get_new_item(DT_SERVICE, $('#biz_page_tbl_id').val());
            var send_notification=false;
            if($("#biz_check_send_notification").is(':checked')){
                send_notification=true;
            }
            obj.photofilename=$('#biz_page_photofilename').val();
            obj.title=$('#biz_tb_title').val();
            obj.price=$('#biz_tb_price').val();
            obj.old_price=$('#biz_tb_old_price').val();
            obj.youtube_url=$('#biz_tb_youtube_url').val();
            obj.mp3filename=$('#biz_page_mp3filename').val();
            obj.category=$('#biz_sel_category').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.pdf_link=$('#biz_tb_pdf_link').val();
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
		test_data.item=get_test_item(DT_SERVICE);
        test_data.category_list=data.category_list;
        test_data.service_visible_option_list=data.service_visible_option_list;
		test_data.data_type_info=data.data_type_info;
		test_data.type_list=data.type_list;
		test_data.data_type_info=data.data_type_info;
		return test_data;
	}

}
//-- SERVICE PROCESSING START 9_cart 9_service_cart --
function get_service_visible_str(service_visible_id){
    switch(String(service_visible_id)){
        case '0':
            return 'No Sessions Availble';
        case '1':
            return 'Ready For Booking';
        default:
            return 'Ready For Booking';
    }
}
//-- SERVICE PROCESSING END --
