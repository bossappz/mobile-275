//9_register
function set_page_register(data){
    hide_footer();
    $('#biz_primary_app_title').html('Register');
    //test
    $('#biz_tb_register_first_name').val(get_id()+'_first_name');
    $('#biz_tb_register_last_name').val(get_id()+'_last_name');
    $('#biz_tb_register_email').val('ceo@bossappz.com');
    $('#biz_tb_register_password').val('1234567');
    //
    load_validate_fields();
    $("#biz_btn_register_update").click(function() {
        var obj={};
        obj.first_name= $('#biz_tb_register_first_name').val();
        obj.last_name= $('#biz_tb_register_last_name').val();
        obj.email= $('#biz_tb_register_email').val();
        obj.password= $('#biz_tb_register_password').val();
        if(!validate_email(obj.email)){
            alert('please enter a valid email.');
        }else if(!obj.password){
            alert('please enter a password');
        }else{
            url = 'admin/update_system';
            cloud_post_url(get_cloud_url(url,[]),obj, function(data){
                if(data.validation_message){
                    alert(data.validation_message);
                }else{
                    set_user(data.user);
                    window.location='index.html';
                }
            });
        }
    });
}
//9_login
function set_page_login(data){
    bind_detail();
    bind_event();
    init_form();
    if(TEST_MODE){
        bind_test_data();
    }
    hide_page_spinner();
    function bind_detail(data){
        set_page_title('Login');
        hide_page_cart_top();
        hide_page_footer();
    }
    function bind_test_data(){
        $('#biz_tb_email').val('ceo@bossappz.com');
        $('#biz_tb_password').val('1234567');
    }
    function bind_event(){
        $("#biz_login_btn").click(function() {
            var obj={};
            obj.email= $('#biz_tb_email').val();
            obj.password= $('#biz_tb_password').val();
            if(!validate_email(obj.email)){
                show_toast_error('please enter a valid email.');
            }else if(!obj.password){
                show_toast_error('please enter a password');
            }else{
                url = 'login_check';
                cloud_get_url(get_cloud_url(url,[]),obj, function(data){
                    if(data.validation_message){
                        show_toast_error(data.validation_message);
                    }else{
                        data.user.customer_id=get_id(99999);
                        set_user(data.user);
                        window.location='item_dashboard_menu.html';
                    }
                });
            }
        });
    }
}
//9_logout
function set_page_logout(data){
    del_user();
    window.location='index.html';
}
//9_forgotpassword
function set_page_forgot_password(data){
    $('#footer-bar').hide();
    $('#biz_primary_app_title').html('Forgot Password');
    //$('#biz_tb_login_email').val('ceo@bossappz.com');
    load_validate_fields();
    $("#biz_btn_forgotpassword_update").click(function() {
        email= $('#biz_tb_login_email').val();
        if(!validate_email(email)){
            alert('please enter a valid email.');
        }else{
            url = 'cloud/mail/forgotpasswordsend';
            cloud_post_url(get_cloud_url(url,[]),{
                email:email,
            }, function(data){
                alert(data.validation_message);
            });
        }
    });
}
//9_activity
function set_page_activity_list(data){
    set_page_sub_title('Activity');
    bind_list(data.activity_list,data.page_current,data.page_count);
    hide_page_spinner();
    function bind_list(item_list,page_current,page_count){
        var item_list=filter_activity_visible_list(item_list);
        $('#biz_lbl_list').html(bind_list_str(item_list));
        $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
        function bind_list_str(item_list){
            var str='';
            for(a=0;a<item_list.length;a++){
                header_str="<b>"+item_list[a].title+"</b> "+" ";
                category_url=get_item_link(item_list[a].data_type).list_url+'&category='+item_list[a].category+"&page_current=1";
                detail_url=get_item_link(item_list[a].data_type).detail_url+'&tbl_id='+item_list[a].tbl_id+'&title_url='+item_list[a].title_url;
                str=str+"<div class='d-flex mb-3'>"+
                    "<div>"+
                    "<a href='"+detail_url+"'><img src='"+item_list[a].photo_obj.thumb_url+"' width='70' class='rounded-sm'></a>"+
                    "</div>"+
                    "<div>"+
                    "<a href='"+detail_url+"'><p class='ps-3 line-height-s color-theme mb-1'>"+header_str+"</p></a>"+
                    "<p class='mb-0 ps-3 font-10 pt-1 opacity-60'><i class='fa fa-clock pe-2'></i>"+ item_list[a].date_obj.pretty_create+" | <i class='fa fa-heart pe-2'></i>"+ item_list[a].like_count+" |  <i class='fa fa-eye pe-2'></i>" + item_list[a].view_count+ " | <a href='"+category_url+"'>"+item_list[a].category+"</a></p>"+
                    "</div>"+
                    "</div>"+
                    "<div class='divider mb-3'></div>";
            }
            return str;
        }
        function filter_activity_visible_list(item_list){
            var r_item_list=[];
            for(var a=0;a<item_list.length;a++){
                var show_item=false;
                if(item_list[a].data_type==DT_GALLERY || item_list[a].data_type==DT_EVENT || item_list[a].data_type==DT_BLOG_POST  || item_list[a].data_type==DT_PRODUCT  || item_list[a].data_type==DT_SERVICE ){
                    show_item=true;
                }
                if(show_item==true){
                    if(item_list[a].visible!='false'){
                        r_item_list.push(item_list[a]);
                    }
                }
            }
        return r_item_list;
        }
    }
}

