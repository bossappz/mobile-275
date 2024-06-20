//9_contact
function set_page_contact_detail(data){
    bind_detail(data.contact, data.info);
    bind_event();
    init_form();
    hide_page_spinner();
    function bind_detail(contact,info){
        $('#biz_lbl_form_header').html(contact.form_header);
        $('#biz_lbl_form_sub_note').html(contact.form_sub_note);
        $('#biz_lbl_social_header').html(contact.social_header);
        $('#biz_lbl_social_sub_note').html(contact.social_sub_note);
        var target = "_blank";
        var options = "location=yes";
        if(info.business_address1){
            addr_str = info.business_address1 +  " " + info.business_address2+  " " + info.business_city + " " + info.business_zip+  " " + info.business_country;
            $('#biz_lbl_social_address').html(addr_str);
            $("#biz_lbl_link_address").click(function() {
                url='https://maps.google.com/?q='+addr_str;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_address').remove();
        }
        if(info.business_phone){
            $('#biz_lbl_social_phone').html(info.business_phone);
            $("#biz_lbl_link_phone").click(function() {
                url='tel:'+info.business_phone;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_phone').remove();
        }
        if(data.business_email){
            $('#biz_lbl_social_email').html(data.business_email);
            $("#biz_lbl_link_email").click(function() {
                url='mailto:'+data.business_email;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_email').remove();
        }
        if(info.social_facebook){
            $('#biz_lbl_social_facebook').html('facebook');
            $("#biz_lbl_link_facebook").click(function() {
                url='https://facebook.com/'+data.social_facebook;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_facebook').remove();
        }
        if(info.social_youtube){
            $('#biz_lbl_social_youtube').html('youtube');
            $("#biz_lbl_link_youtube").click(function() {
                url=data.social_youtube;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_youtube').remove();
        }
        if(info.social_twitter){
            $('#biz_lbl_social_twitter').html(info.social_twitter);
            $("#biz_lbl_link_twitter").click(function() {
                url='https://twitter.com/'+info.social_twitter;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_twitter').remove();
        }
        if(info.social_instagram){
            $('#biz_lbl_social_instagram').html(info.social_instagram);
            $("#biz_lbl_link_instagram").click(function() {
                url = 'https://instagram.com/'+info.social_instagram;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_instagram').remove();
        }
        if(info.social_website){
            $('#biz_lbl_social_website').html(info.social_website);
            $("#biz_lbl_link_website").click(function() {
                url='http://'+info.social_website;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_website').remove();
        }
    }
    function bind_event(){
        $("#biz_btn_submit").click(function() {
            hide_toast();
            obj={};
            if(!validate_email($('#biz_tb_email').val())){
                show_toast_error('Please enter a valid email');
            }else{
                $("#biz_btn_submit").hide();
                obj.field_count=3;
                obj.field_title_1='Name';
                obj.field_value_1=$('#biz_tb_name').val();
                obj.field_title_2='Email';
                obj.field_value_2=$('#biz_tb_email').val();
                obj.field_title_3='Message';
                obj.field_value_3=$('#biz_tb_message').val();
                url='send_mail_message';
                cloud_post_url(get_cloud_url(url,[]),obj,function(data){
                    str="We appreciate you contacting us. One of our colleagues will get back in touch with you soon! Have a great day!";
                    show_toast_update(str);
                });
            }
        });
    }
}
//9_contact_detail 9_contact_edit 9_dash
function set_dashboard_contact_edit(data){
    hide_page_footer();
    bind_page_id(data.contact);
    bind_detail(data.contact);
    bind_event();
    init_tab();
    init_form();
    hide_page_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Edit Contact');
        hide_page_cart_top();
        $('#biz_tb_form_header').val(data.form_header);
        $('#biz_tb_form_sub_note').val(data.form_sub_note);
        $('#biz_tb_social_header').val(data.social_header);
        $('#biz_tb_social_sub_note').val(data.social_sub_note);
    }
    function bind_event(){
        $("#biz_btn_contact_update").click(function() {
            var obj=get_new_item($('#biz_page_data_type').val(), $('#biz_page_tbl_id').val());
            obj.photofilename=$('#biz_page_photofilename').val();
            obj.form_header=$('#biz_tb_form_header').val();
            obj.form_sub_note=$('#biz_tb_form_sub_note').val();
            obj.social_header=$('#biz_tb_social_header').val();
            obj.social_sub_note=$('#biz_tb_social_sub_note').val();
            obj.biz_list="'form_header','form_sub_note','social_header','social_sub_note'";
            cloud_update_biz(obj.data_type,obj.tbl_id,obj, function(data){
                show_toast_update();
            });
        });
    }
}
