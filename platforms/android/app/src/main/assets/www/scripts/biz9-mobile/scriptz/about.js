//9_about
function set_page_about_detail(data){
    bind_about_detail(data.about);
    hide_page_spinner();
    function bind_about_detail(data){
        $('#biz_lbl_header').html(data.header);
        $('#biz_lbl_sub_note').html(data.sub_note);
        $('#biz_lbl_paragraph').html(data.note);
        if(!data.photofilename){
            $('#biz_img_main').hide();
        }else{
            $('#biz_img_main').attr('src',data.photo_obj.square_mid_url);
        }
    }
}
//9_dashboard 9_edit
function set_dashboard_about_edit(data){
    hide_page_footer();
    hide_page_cart_top();
    bind_page_id(data.about);
    bind_detail(data);
    bind_event();
    init_tab();
    init_form();
    hide_page_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Edit About');
        set_item_note(data.about.note);
        $('#biz_tb_header').val(data.about.header);
        $('#biz_tb_sub_note').val(data.about.sub_note);
        $('#biz_img').attr('src',data.about.photo_obj.square_mid_url);
    }
    function bind_event(){
        $("#biz_update").click(function() {
            var obj=get_new_item( $('#biz_page_data_type').val(), $('#biz_page_tbl_id').val());
            obj.photofilename=$('#biz_page_photofilename').val();
            obj.header=$('#biz_tb_header').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.note=get_item_note();
            obj.biz_list="header,sub_note";
            cloud_update_biz(obj.data_type,obj.tbl_id,obj,function(data){
                show_toast_update();
            });
        });
    }
}
