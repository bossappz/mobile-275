//9_list
function set_page_page_list(data){
    bind_list(data.page_list);
    hide_page_spinner();
    function bind_list(item_list){
        var str='';
        url='';
        for(var a=0;a<item_list.length;a++){
            if(String(item_list[a].visible)=='true'){
                item_list[a].sub_note=item_list[a].sub_note?(item_list[a].sub_note):'';
                str=str+"<a href='"+get_item_link(item_list[a].type).home_url+"' class='card card-style mb-3' style=' background-color:transparent; height:180px; background-position:center center !important; background-size:contain; background-repeat:no-repeat; background-image:url("+item_list[a].photo_obj.square_mid_url+")'>"+
                    "<div class='card-center px-3'>"+
                    "<h1 class='color-white font-800 font-24'>"+item_list[a].title+"</h1>"+
                    "<p class='color-white mt-n2 mb-0 opacity-70'>"+
                    item_list[a].sub_note+
                    "</p>"+
                    "</div>"+
                    "<div class='card-center'>";
                str=str+"</div>"+
                    "<div class='card-overlay bg-black opacity-85'></div>"+
                    "</a>";
            }
        }
        $('#biz_lbl_list').html(str);
    }
}
//9_page_list 9_dashboard
function set_dashboard_page_list(data){
    hide_page_footer();
    hide_page_add_button();
    bind_detail(data);
    bind_list(data.page_list);
    hide_page_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Pages');
    }
    function bind_list(_item_list){
        var item_list=[];
        for(a=0;a<_item_list.length;a++){
            var item={};
            item.tbl_id=_item_list[a].tbl_id;
            item.data_type=DT_PAGE;
            item.visible=_item_list[a].visible;
            item.type=_item_list[a].type;
            item.title_type=_item_list[a].title_type;
            item.title=_item_list[a].title;
            item.title_url=_item_list[a].title_url;
            item.icon_footer=_item_list[a].icon_footer;
            item.photo_obj=_item_list[a].photo_obj;
            item_list.push(item);
        }
	    $('#biz_lbl_list').html(get_dashboard_list_str(item_list,1,99));

    }
    function bind_page_event(){
        $(".biz_btn_edit_photo").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            camera_photo_select(function(data){
                post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
                    $('#biz_img_'+tbl_id).attr('src',data.photo_obj.square_thumb_url);
                });
            });
        });
    }
}
//9_page_edit //9_edit 9_dashboard
function set_dashboard_page_edit(data){
    hide_page_footer();
	hide_page_cart_top();
    bind_page_page_id(data.item);
    bind_detail(data);
    bind_event();
    init_form();
    hide_page_spinner();
    function bind_page_page_id(data){
        $('#biz_page_data_type').val(data.data_type)
        $('#biz_page_tbl_id').val(data.tbl_id)
        $('#biz_page_tbl_id').val(data.tbl_id)
        $('#biz_page_type').val(data.type)
    }
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Edit Page ' + data.item.title);
        if(data.item.tbl_id==0){
            set_page_sub_title('Add Page');
        }else{
            set_page_sub_title('Edit Page');
            $('#biz_img').attr('src',data.item.photo_obj.square_mid_url);
        }
        $('#biz_tb_title').val(data.item.title);
        $('#biz_page_type').val(data.item.type);
        $('#biz_tb_sub_note').val(data.item.sub_note);
        $('#biz_sel_visible').val(data.item.visible);
        var icon_list=[];
        var str='';
        $.get('../../data/icons.txt', function(file_icon_list) {
            icon_list = file_icon_list.split('\n').sort();
            for(a=0;a<icon_list.length;a++){
                str=str+ "<option value='"+icon_list[a]+"'>"+icon_list[a] + "</option>";
            }
            $("#biz_sel_page_icon_footer").html(str);
            $("#biz_sel_page_icon_footer").val(data.item.icon_footer);
            $("#biz_lbl_page_icon2").attr('class',"fa fa-" +data.item.icon_footer+" font-30");
        });
        $("#biz_sel_page_icon_footer").change(function() {
            $("#biz_lbl_page_icon2").attr('class',"fa fa-" +$(this).val()+" font-30");
        });
    }
    function bind_event(){
        $("#biz_btn_update").click(function() {
            var obj=get_new_item($('#biz_page_data_type').val(),$('#biz_page_tbl_id').val());
            obj.title=$('#biz_tb_title').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.icon_footer=$('#biz_sel_page_icon_footer').val();
            obj.biz_list='icon_footer';
            if(!obj.title){
                show_toast_error('please enter title');
            }else{
                cloud_update_biz(obj.data_type,obj.tbl_id,obj,function(data){
                    show_toast_update();
                });
            }
        });
        $("#biz_img").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            camera_photo_select(function(data){
                cloud_update(data_type,tbl_id,{photofilename:data.photofilename},function(data){
                    $('#biz_img').attr('src',data.item.photo_obj.square_mid_url);
                    return false;
                });
            });
        });
    }
}
