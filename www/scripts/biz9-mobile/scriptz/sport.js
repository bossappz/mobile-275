//9_detail
function set_page_sport_detail(data){
	bind_page_id(data.item);
	bind_detail(data);
	bind_detail_sport(data.item);
	bind_detail_sport_photo(data.item);
	bind_detail_review(data);
	init_plugin();
	hide_page_spinner();
	function bind_detail(data){
		set_page_detail_title(data.item.title);
		hide_page_cart_top();
		set_page_detail_double_slide_show(data.item,data.item_list);
		set_page_detail_sub_note(data.item.sub_note);
		set_page_detail_note(data.item);
		set_page_detail_view_count(data.item.view_count);
		set_page_event_detail_like_count(data.item);
		set_page_detail_category(data.item);
		set_page_detail_media(data.item);
	}
	function bind_detail_sport(item){
		author='author here';
		date ="<span style='margin-right:5px;class=''><i class='fa fa-clock pe-2 ml-5'></i>"+item.date_obj.date_create+" " + item.date_obj.month_create +", " + item.date_obj.year_create +" at "+ item.date_obj.time_update +"</span>";
		if(item.author){
			author ="<span style='margin-right:5px;'><i class='fa fa-pen pe-2 pr-4'></i>"+item.author+"</span>";
			$("#biz_lbl_info").html(author+ " " +date);
		}else{
			$("#biz_lbl_info").html(date);
		}
	}
	function bind_detail_sport_photo(item){
		if(item.photofilename){
			$("#biz_img_primary").css("background-image", "url(" + item.photo_obj.mid_url + ")");
		}else{
			$("#biz_img_primary").hide();
		}
		$("#biz_lbl_photo_list").html(bind_detail_photo_list_str(item.photos));
	}
}
//9_sport_detail 9_sport_edit 9_edit 9_dashboard_sport_edit
function set_dashboard_sport_edit(data){
	hide_page_cart_top();
	hide_page_footer();
	bind_page_id(data.item);
	bind_detail(data);
	bind_detail_sport_edit(data);
	bind_event();
	init_tab();
	init_form();
	hide_page_spinner();
	function bind_detail(data){
		set_page_title('Dashboard');
		set_item_content_edit(data.item);
		set_item_visible_edit(data.item,[]);
		set_item_note(data.item.note);
	}
	function bind_detail_sport_edit(data){
		var str='';
		for(var a=0;a<data.type_list.length;a++){
			str=str+ "<option value='"+data.type_list[a]+"' selected>"+data.type_list[a]+"</option>";
		}
		$('#biz_sel_sport_type').html(str);
		$('#biz_sel_sport_type').val(data.item.type);
	}
	function bind_event(){
		$("#biz_btn_update").click(function() {
			var obj=get_new_item(DT_SPORT, $('#biz_page_tbl_id').val());
			obj.title=$('#biz_tb_title').val();
			obj.type=$('#biz_sel_member_type').val();
			obj.photofilename=$('#biz_page_photofilename').val();
			obj.sub_note=$('#biz_tb_sub_note').val();
			obj.visible=$('#biz_sel_visible').val();
			obj.type=$('#biz_sel_sport_type').val();
			obj.note=get_item_note();
			if(!obj.title){
				show_toast_error('Please enter a valid title');
			}else{
				cloud_update(DT_SPORT,obj.tbl_id,obj,function(data){
					bind_page_id(data.item);
					show_toast_update();
					return false;
				});
			}
		});
	}
}
//9_team_edit 9_edit 9_dashboard_team_edit
function set_dashboard_team_edit(data){
	hide_page_footer();
	hide_page_cart_top();
	bind_page_id(data.item);
	bind_page_other_id({'parent_tbl_id':data.parent_item.tbl_id,'parent_data_type':data.parent_item.data_type});
	bind_detail_team_edit(data);
	bind_detail(data);
	bind_event();
	init_tab();
	init_form();
	if(TEST_MODE && !data.item.tbl_id){
		var data = get_test_data(data);
		bind_detail_team_edit(data);
		bind_detail(data);
	}
	hide_page_spinner();
	function bind_detail(data){
		set_page_title('Dashboard');
		set_item_content_edit(data.item,data.data_type_info.title);
		set_item_category_edit(data.category_list,data.item.category);
		set_item_state_edit(data.item.state);
		set_item_country_edit(data.item.country);
		set_item_visible_edit([],data.item.visible);
		set_item_note(data.item.note);
	}
	function bind_detail_team_edit(data){
		$('#biz_tb_sport').val(data.parent_item.title);
		$('#biz_tb_city').val(data.item.city);
		$('#biz_tb_color').val(data.item.color);
		$('#biz_tb_mascot').val(data.item.mascot);
	}
	function bind_event(){
		$("#biz_btn_update").click(function() {
			var obj=get_new_item(DT_TEAM, $('#biz_page_tbl_id').val());
			var send_notification='false';
			if($("#biz_check_send_notification").is(':checked')){
				send_notification='true';
			}
			obj.title=$('#biz_tb_title').val();
			obj.category=$('#biz_sel_category').val();
			obj.photofilename=$('#biz_page_photofilename').val();
			obj.youtube_url=$('#biz_tb_youtube_url').val();
			obj.pdf_link=$('#biz_tb_pdf_link').val();
			obj.mp3filename=$('#biz_tb_mp3_filename').val();
			obj.visible=$('#biz_sel_visible').val();
			obj.city=$('#biz_tb_city').val();
			obj.state=$('#biz_sel_state').val();
			obj.country=$('#biz_sel_country').val();
			obj.color=$('#biz_tb_color').val();
			obj.mascot=$('#biz_tb_mascot').val();
			obj.sport_tbl_id=$('#biz_page_parent_tbl_id').val();
			obj.note=get_item_note();
			if(!obj.title){
				show_toast_error('Please enter a valid title');
			}else if(!obj.category){
				show_toast_error('Please select a valid category');
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
		test_data.item=get_test_item(DT_TEAM);
		test_data.item.mascot='mascot_'+get_id(999);
		test_data.item.color='color_'+get_id(999);
		test_data.category_list=data.category_list;
		test_data.product_visible_option_list=data.product_visible_option_list;
		test_data.sport_list=data.sport_list;
		test_data.parent_item=data.parent_item;
		test_data.data_type_info=data.data_type_info;
		test_data.type_list=data.type_list;
		test_data.data_type_info=data.data_type_info;
		return test_data;
	}
}
//9_game_detail 9_game_edit 9_edit 9_dashboard_game_edit
function set_dashboard_game_edit(data){
	hide_page_footer();
	hide_page_cart_top();
	bind_page_id(data.item);
	bind_page_other_id({'parent_tbl_id':data.parent_item.tbl_id,'parent_data_type':data.parent_item.data_type});
	bind_detail_game_edit(data);
	bind_detail(data);
	bind_event();
	init_tab();
	init_form();
	if(TEST_MODE && !data.item.tbl_id){
		var data = get_test_data(data);
		bind_detail_game_edit(data);
		bind_detail(data);
	}
	hide_page_spinner();
	function bind_detail_game_edit(data){
		$('#biz_tb_location').val(data.item.location);
		$('#biz_tb_street').val(data.item.street);
		$('#biz_tb_city').val(data.item.city);
		$('#biz_sel_home_team').html(get_option_list_str(data.team_list,'title','tbl_id'));
		$('#biz_sel_home_team').val(data.item.home_team_tbl_id);
		$('#biz_sel_away_team').html(get_option_list_str(data.team_list,'title','tbl_id'));
		$('#biz_sel_away_team').val(data.item.away_team_tbl_id);
	}
	function bind_detail(data){
		set_page_title('Dashboard');
		set_item_content_edit(data.item,data.data_type_info.title);
		set_item_state_edit(data.item.state);
		set_item_country_edit(data.item.country);
		set_item_visible_edit([],data.item.visible);
		set_item_note(data.item.note);
	}
	function bind_event(){
		$("#biz_btn_update").click(function() {
			var obj=get_new_item(DT_GAME, $('#biz_page_tbl_id').val());
			var send_notification='false';
			if($("#biz_check_send_notification").is(':checked')){
				send_notification='true';
			}
			obj.photofilename=$('#biz_page_photofilename').val();
			obj.location=$('#biz_tb_location').val();
			obj.home_team_tbl_id=$('#biz_sel_home_team').val();
			obj.away_team_tbl_id=$('#biz_sel_away_team').val();
			obj.youtube_url=$('#biz_tb_youtube_url').val();
			obj.pdf_link=$('#biz_tb_pdf_link').val();
			obj.mp3filename=$('#biz_tb_mp3_filename').val();
			obj.visible=$('#biz_sel_visible').val();
			obj.street=$('#biz_tb_street').val();
			obj.city=$('#biz_tb_city').val();
			obj.state=$('#biz_sel_state').val();
			obj.country=$('#biz_sel_country').val();
			obj.visible=$('#biz_sel_visible').val();
			obj.sport_tbl_id=$('#biz_page_parent_tbl_id').val();
			obj.note=get_item_note();
			if(obj.home_team_tbl_id=='0'){
				show_toast_error('Please enter a valid home team');
			}else if(obj.away_team_tbl_id=='0'){
				show_toast_error('Please enter a valid away team');
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
		test_data.item=get_test_item(DT_GAME);
		test_data.item.location='location_'+get_id(999);
		test_data.item.street='street_'+get_id(999);
		test_data.item.city='city_'+get_id(999);
		test_data.team_list=data.team_list;
		test_data.product_visible_option_list=data.product_visible_option_list;
		test_data.parent_item=data.parent_item;
		test_data.data_type_info=data.data_type_info;
		test_data.type_list=data.type_list;
		test_data.data_type_info=data.data_type_info;
		return test_data;
	}
}
//9_detail
function set_page_team_detail(data){
	hide_page_cart_top();
	hide_detail_team();
	bind_page_id(data.item);
	bind_detail(data);
	bind_detail_team(data);
	bind_list(data);
	bind_footer_list(data);
	init_plugin();
	hide_page_spinner();
	function bind_detail(data){
	}
	function hide_detail_team(){
		$("#biz_lbl_sp_phone").hide();
		$("#biz_lbl_sp_email").hide();
		$("#biz_lbl_position").hide();
		$("#biz_lbl_location").hide();
		$(".biz_lbl_card").hide();
	}
	function bind_detail_team(data){
		$("#biz_lbl_title").html(data.item.title);
		$("#biz_lbl_sub_note").html(data.item.sub_note);
		$("#biz_lbl_img").attr('src',data.item.photo_obj.thumb_url);
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
		var team_location='';
		if(data.item.city){
			team_location=data.item.city;
		}
		if(data.item.state&&data.item.state!='0'){
			if(String(team_location).length>1){
				team_location=team_location+", ";
			}
			team_location=team_location + " "+data.item.state;
		}
		if(data.item.country&&data.item.country!='0'){
			team_location=team_location+" "+data.item.country;
		}
		if(team_location.length){
			$("#biz_lbl_location").show();
			$("#biz_lbl_location").html(team_location);
		}
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
			$("#biz_lbl_footer_list_title").html(data.team_type.titlez);
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


