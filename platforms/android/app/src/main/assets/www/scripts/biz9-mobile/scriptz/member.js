//9_detail
function set_page_member_detail(data){
    hide_page_cart_top();
    hide_detail_member();
    bind_page_id(data.item);
    bind_detail(data);
    bind_detail_member(data);
    bind_list(data);
    bind_footer_list(data);
    init_plugin();
    hide_page_spinner();
    function bind_detail(data){
    }
    function hide_detail_member(){
        $("#biz_lbl_sp_phone").hide();
        $("#biz_lbl_sp_email").hide();
        $("#biz_lbl_position").hide();
        $("#biz_lbl_location").hide();
        $(".biz_lbl_card").hide();
    }
   function bind_detail_member(data){
        $("#biz_lbl_title").html(data.item.first_name+ " " +data.item.last_name);
        $("#biz_lbl_sub_note").html(data.item.bio);
       if(data.item.phone){
            $("#biz_lbl_sp_phone").show();
            $(".biz_lbl_phone").html(data.item.phone);
            $(".biz_lbl_phone").attr('href','tel:'+data.item.phone);
        }
        if(data.item.email){
            $("#biz_lbl_sp_email").show();
            $(".biz_lbl_email").html(data.item.email);
            $(".biz_lbl_email").attr('href','tel:'+data.item.email);
        }
        if(data.item.position){
            $("#biz_lbl_position").show();
            $("#biz_lbl_position").html(data.item.position);
        }
        var member_location='';
        if(data.item.city){
            member_location=data.item.city;
        }
        if(data.item.state&&data.item.state!='0'){
            if(String(member_location).length>1){
                member_location=member_location+", ";
            }
            member_location=member_location + " "+data.item.state;
        }
        if(data.item.country&&data.item.country!='0'){
            member_location=member_location+" "+data.item.country;
        }
        if(member_location.length){
            $("#biz_lbl_location").show();
            $("#biz_lbl_location").html(member_location);
        }
        $("#biz_lbl_img").attr('src',data.item.photo_obj.thumb_url);
    }
    function bind_list(data){
       if(data.item_list.length>0){
           $("#biz_lbl_sub_list_title").html(data.category.title);
            $("#biz_lbl_sub_list_sub_note").html(data.category.sub_note);
            $("#biz_lbl_card_sub_list").show();
        var str='';
        for(a=0;a<data.item_list.length;a++){
            str=str+"<a href='"+get_item_link(DT_MEMBER).detail_url+"&tbl_id="+data.item_list[a].tbl_id+"'>"+
                "<img src='"+data.item_list[a].photo_obj.thumb_url+"'>"+
                "<span>"+data.item_list[a].first_name+ " "+ data.item_list[a].last_name+"</span>"+
                "<span class='badge biz_btn font-10'>"+data.item_list[a].position+"</span>"+
                "<i class='fa fa-angle-right'></i>"+
                "</a>";
        }
        $("#biz_lbl_list").html(str);
        }
    }
    function bind_footer_list(data){
       if(data.footer_list.length>0){
           $("#biz_lbl_footer_list_title").html(data.member_type.titlez);
            $("#biz_lbl_card_footer_list").show();
        var str='';
        for(a=0;a<data.footer_list.length;a++){
            str=str+"<a href='"+get_item_link(DT_MEMBER).detail_url+"&tbl_id="+data.footer_list[a].tbl_id+"'>"+
                "<img src='"+data.footer_list[a].photo_obj.thumb_url+"'>"+
                "<span>"+data.footer_list[a].first_name+ " "+ data.footer_list[a].last_name+"</span>"+
                "<span class='badge biz_btn font-10'>"+data.footer_list[a].position+"</span>"+
                "<i class='fa fa-angle-right'></i>"+
                "</a>";
        }
        $("#biz_lbl_footer_list").html(str);
        }
    }
}
//9_member_home /9_home
function set_page_member_home(data){
    hide_page_cart_top();
    hide_pager();
    bind_detail(data);
    bind_list(data.member_list,data.page_current,data.page_count);
    hide_page_spinner();
    function bind_detail(data){
        set_page_sub_title(data.page.title);
        set_page_sub_note(data.page.sub_note);
    }
    function bind_list(item_list,page_current,page_count){
        str='';
        for(a=0;a<item_list.length;a++){
            str=str+"<div class='col-6'>";
            str=str+"<div class='bg-theme rounded-m py-3 text-center'>"+
                "<img src='"+item_list[a].photo_obj.thumb_url+"' class='gradient-green mx-auto rounded-xl' width='100'>"+
                "<h2 class='pt-3'>"+item_list[a].first_name+" " + item_list[a].last_name+ "</h2>"+
                "<p class='mt-n2 color-blue-dark'>"+item_list[a].position+"</p>"+
                "<p class='mt-n2 '>"+item_list[a].bio+"</p>"+
                "</div>";
            str=str+"</div>";
        }
        $('#biz_lbl_list').html(str);
        $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
    }
}
//9_member_detail 9_member_edit 9_edit 9_dash
function set_dashboard_member_edit(data){
    hide_page_footer();
    hide_page_cart_top();
    //hide_detail_member_edit();
    bind_page_id(data.item);
    bind_detail(data);
    bind_detail_member_edit(data);
    bind_event();
	init_tab();
	init_form();
    hide_page_spinner();
    if(TEST_MODE && !data.item.tbl_id){
        var data = get_test_data(data);
        bind_detail_member_edit(data);
        bind_detail(data);
    }
    function hide_detail_member_edit(){
        $('#biz_lbl_tab_other').html('Other');
        $('#biz_lbl_div_player').hide();
    }
   function bind_detail(data){
        set_page_title('Dashboard');
        set_item_content_edit(data.item,data.data_type_info.title);
        set_item_visible_edit([],data.item.visible);
        set_item_category_edit(data.category_list,data.item.category);
        set_item_state_edit(data.item.state);
        set_item_country_edit(data.item.country);
    }
   function bind_detail_member_edit_player(){
       $('#biz_lbl_tab_other').html('Player');
       $('#biz_lbl_div_player').show();
    }
    function bind_detail_member_edit(data){
        $('#biz_tb_first_name').val(data.item.first_name);
        $('#biz_tb_last_name').val(data.item.last_name);
        $('#biz_tb_position').val(data.item.position);
        $('#biz_tb_email').val(data.item.email);
        $('#biz_tb_city').val(data.item.city);
        $('#biz_tb_phone').val(data.item.phone);
        $('#biz_tb_bio').val(data.item.bio);
        $('#biz_tb_forty_yard_dash').val(data.item.forty_yard_dash);
        $('#biz_sel_member_type').html(get_option_list_str(data.type_list,'title','title'));
        if(data.item.type && data.item.type.length>0){
            $('#biz_sel_member_type').val(data.item.type);
        }else{
            $('#biz_sel_member_type').val();
        }
        //player-start
        //height
        height_inch_list=[];
        for(var a=4;a<8;a++){
            for(var b=0;b<12;b++){
                height_inch_list.push({title:String(a)+" ft "+String(b) + " in"});
            }
        }
        $('#biz_sel_height').html(get_option_list_str(height_inch_list,'title','title'));
        $('#biz_sel_height').val(0);
        //class
        $('#biz_sel_class').val(data.item.class);
        //weight
        $('#biz_tb_weight').val(data.item.weight);
        //jersey
        $('#biz_tb_jersey_number').val(data.item.jersey_number);
        //forty_yard_dash
        $('#biz_tb_forty_yard_dash').val(data.item.forty_yard_dash);
        //height
        $('#biz_tb_height').val(data.item.height);
        //player-end
        //type-start
        if(data.item.type=='Player'){
            bind_detail_member_edit_player();
        }
        $('#biz_sel_type').val(data.item.type);
        $("#biz_sel_member_type").change(function() {
            hide_detail_member_edit();
            switch($(this).val()){
                case 'Player':
                    $('#biz_lbl_tab_other').html('Other');
                    bind_detail_member_edit_player();
                    break;
            }
        });
        //type-end
    }
    function bind_event(){
        $("#biz_btn_update").click(function() {
            var obj={};
            var obj=get_new_item(DT_MEMBER, $('#biz_page_tbl_id').val());
            obj.photofilename= $('#biz_page_photofilename').val();
            obj.category=$('#biz_sel_category').val();
            obj.position=$('#biz_tb_position').val();
            obj.first_name=$('#biz_tb_first_name').val();
            obj.last_name=$('#biz_tb_last_name').val();
            obj.bio=$('#biz_tb_bio').val();
            obj.email=$('#biz_tb_email').val();
            obj.phone=$('#biz_tb_phone').val();
            obj.city=$('#biz_tb_city').val();
            obj.state=$('#biz_sel_state').val();
            obj.country=$('#biz_sel_country').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.type=$('#biz_sel_member_type').val();
            obj.title=obj.first_name+" " +obj.last_name;
            //player
            obj.class=$('#biz_sel_class').val();
            obj.height=$('#biz_sel_height').val();
            obj.height=$('#biz_sel_height').val();
            obj.weight=$('#biz_tb_weight').val();
            obj.jersey_number=$('#biz_tb_jersey_number').val();
            obj.forty_yard_dash=$('#biz_tb_forty_yard_dash').val();
            if(!obj.title){
				show_toast_error('Please enter a valid title');
			}else if(!obj.category){
				show_toast_error('Please select a valid category');
			}else if(!String(obj.country)){
				show_toast_error('Please select a valid country');
			}else if(!String(obj.state)){
				show_toast_error('Please select a valid state');
		    }else if(!String(obj.state)){
				show_toast_error('Please select a valid state');
			}else{
                obj.visible='true';
			    cloud_update(obj.data_type,obj.tbl_id,obj,function(data){
             	bind_page_id(data.item);
					show_toast_update();
					return false;
				});
			}
        });
    }
    //9_test
    function get_test_data(data){
        var test_data={};
        test_data.item=get_new_item(DT_MEMBER,0);
        test_data.item.position='position_'+get_id(999);
        test_data.item.first_name='first_name_'+get_id(999);
        test_data.item.last_name='last_name_'+get_id(999);
        test_data.item.bio='bio_'+get_id(999);
        test_data.item.email='email@'+get_id(999)+'.com';
        test_data.item.city='city'+get_id(999);
        test_data.item.phone='123-345-'+get_id(9999);
        test_data.item.weight=get_id(999);
        test_data.item.jersey_number=get_id(999);
        test_data.item.forty_yard_dash=get_id(9999);
        test_data.item.state='California';
        test_data.item.country='United States';
        test_data.item.visible='true';
        test_data.item.type='Staff';
        test_data.item.class='Youth';
        test_data.item.category='';
        test_data.item.visible='true';
        test_data.category_list=data.category_list;
        test_data.type_list=data.type_list;
        test_data.data_type_info=data.data_type_info;
        return test_data;
    }
}
