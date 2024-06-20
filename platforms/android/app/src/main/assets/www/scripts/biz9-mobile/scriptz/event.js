//9_detail //9_event_detail
function set_page_event_detail(data){
    bind_page_id(data.item);
    bind_detail(data);
    bind_detail_event(data);
    bind_detail_review(data.item);
    bind_event();
    init_plugin();
    hide_page_spinner();
    function bind_detail(data){
	    set_page_footer_navigation(data,data.data_type);
        set_page_detail_title(data.item.title);
        set_page_detail_product_photo(data.item);
        set_page_detail_double_slide_show(data.item,data.item_list);
        set_page_detail_sub_note(data.item.sub_note);
        set_page_detail_note(data.item);
        set_page_detail_view_count(data.item.view_count);
        set_page_event_detail_like_count(data.item);
        set_page_detail_category(data.item);
        set_page_detail_media(data.item);
        set_page_detail_visible(data.item.visible,data.item.visible_obj.event_status);
        set_page_detail_price(data.item);
        set_page_product_in_app_purchase(data.item);
    }
    function bind_detail_event(data){
        $('#biz_lbl_date').html(data.item.event_obj.start_date);
        $('#biz_lbl_time').html(data.item.event_obj.start_time);
        $('#biz_lbl_location').html(data.item.event_obj.location);
        $('#biz_lbl_link_calendar').attr('href',data.item.event_obj.start_google_calendar_url);
        $('#biz_lbl_card_date').show();
    }
    function bind_event(){
        $("#biz_btn_cart_add").click(function() {
            option_item_1_tbl_id=$('#biz_sel_option0').val();
            option_item_2_tbl_id=$('#biz_sel_option1').val();
            option_item_3_tbl_id=$('#biz_sel_option2').val();
            option_item_4_tbl_id=$('#biz_sel_option3').val();
            obj={};
            obj.tbl_id=$('#biz_page_tbl_id').val();
            obj.data_type=DT_EVENT;
            obj.customer_id=get_user().customer_id;
            $(this).addClass("bg-click");
            $(this).html("Ticket Added To Cart!");
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
            cloud_order_cart_add(DT_EVENT,obj.tbl_id,obj,1,function(data){
            });
        });
    }
}
//9_event_detail 9_event_edit 9_edit 9_dashboard_event_edit
function set_dashboard_event_edit(data){
    hide_page_footer();
    hide_page_cart_top();
    bind_page_id(data.item);
    bind_detail_event_edit(data);
    bind_detail(data);
    bind_event();
    bind_event_dashboard_photo();
	bind_event_dashboard_mp3();
    init_tab();
    init_form();
    hide_page_spinner();
	if(TEST_MODE && !data.item.tbl_id){
        var data = get_test_data(data);
        bind_detail_event_edit(data);
        bind_detail(data);
    }
    function bind_detail(data){
        set_page_title('Dashboard');
        set_item_content_edit(data.item,data.data_type_info.title);
        set_item_category_edit(data.category_list,data.item.category);
        set_item_visible_edit(data.event_visible_option_list,data.item.visible);
        set_item_price_edit(data.item.price,data.item.old_price);
        set_item_mp3_edit(data.item);
        set_item_visible_edit(data.event_visible_option_list,data.item.visible,'text','value');
		set_item_note(data.item.note);
   }
    function bind_detail_event_edit(data){
        $('#biz_tb_meeting_link').val(data.item.meeting_link);
        $('#biz_tb_start_time').val(data.item.start_time);
        $('#biz_tb_start_date').val(get_textbox_date(data.item.start_date));
        $('#biz_tb_location').val(data.item.location);
    }
    function bind_event(){
        $("#biz_btn_update").click(function() {
            var obj=get_new_item(DT_EVENT, $('#biz_page_tbl_id').val());
            var send_notification=false;
            if($("#biz_check_send_notification").is(':checked')){
                send_notification=true;
            }
            obj.title=$('#biz_tb_title').val();
            obj.photofilename=$('#biz_page_photofilename').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.price=$('#biz_tb_price').val();
            obj.old_price=$('#biz_tb_old_price').val();
            obj.website=$('#biz_tb_website').val();
            obj.meeting_link=$('#biz_tb_meeting_link').val();
            obj.start_date=$('#biz_tb_start_date').val();
            obj.start_time=$('#biz_tb_start_time').val();
            obj.location=$('#biz_tb_location').val();
            obj.category=$('#biz_sel_category').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.youtube_url=$('#biz_tb_youtube_url').val();
            obj.pdf_link=$('#biz_tb_pdf_link').val();
            obj.mp3filename=$('#biz_page_mp3filename').val();
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
		test_data.item=get_test_item(DT_EVENT);
        test_data.item.price='9.99';
        test_data.item.old_price='19.99';
        test_data.item.start_date='2030-09-19';
        test_data.item.start_time='21:19';
        test_data.item.meeting_link='https://bossappz.com/meetingz';
        test_data.item.website='https://bossappz.com';
        test_data.item.location='Wall Street Office';
	    test_data.category_list=data.category_list;
	    test_data.event_visible_option_list=data.event_visible_option_list;
        test_data.type_list=data.type_list;
        test_data.data_type_info=data.data_type_info;
        return test_data;

        /*
        var test_data={};
        test_data.item=get_new_item(DT_EVENT,0);
        test_data.item.title='title_'+get_id(999);
        test_data.item.sub_note='sub_note_'+get_id(999);
        test_data.item.author='author_'+get_id(999);
        test_data.item.note='note_'+get_id(999);
        test_data.item.youtube_url="https://youtu.be/5YCWlMSM3vI?si=ic3GjnYRB4HZSgV8";
        test_data.item.pdf_link='https://bappz.s3.us-east-2.amazonaws.com/2003+Kiwi_KiwiToo+Travel+Trailers.pdf';
        test_data.item.mp3filename='sample-3s.mp3';
        test_data.item.visible='true';
        test_data.category_list=data.category_list;
        test_data.type_list=data.type_list;
        test_data.data_type_info=data.data_type_info;
        return test_data;
        */
    }



}

