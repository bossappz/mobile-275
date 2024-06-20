//9_dashboard_home 9_menu
function set_dashboard_menu(data){
	hide_page_spinner();
	bind_detail();
	set_notification_subscribe(NOTIFICATION_SUBSCRIBE_ADMIN);
	function bind_detail(data){
		hide_page_footer();
		hide_page_cart_top();
		set_page_title('Dashboard');
	}
}
//9_setting
function set_dashboard_setting_edit(data){
	hide_page_footer();
	bind_page_id(data.info);
	bind_detail(data);
	bind_detail_dashboard_setting(data);
	bind_event();
	init_tab();
	init_form();
	hide_page_spinner();
	function bind_detail(data){
		set_page_title('Dashboard');
		set_page_sub_title('Settings');
		hide_page_cart_top();
	}
	function bind_detail_dashboard_setting(data){
		bind_profile(data.info);
		bind_business(data.info);
		bind_social(data.info);
		bind_app(data.primary);
		bind_billing(data.info);
		bind_navigation(data.left_nav);
		bind_brevo_email(data.info);
		bind_firebase_notification(data.info);
	}
	function bind_profile(data){
		user=get_user();
		$('#biz_page_user_tbl_id').val(user.tbl_id);
		$('#biz_page_user_data_type').val(user.data_type);
		$('#biz_tb_first_name').val(user.first_name);
		$('#biz_tb_last_name').val(user.last_name);
		$('#biz_tb_profile_email').val(user.email);
		$('#biz_tb_password1').val(user.password);
		$('#biz_tb_password2').val(user.password);
	}
	function bind_business(data){
		$('#biz_tb_business_name').val(data.business_name);
		$('#biz_tb_business_email').val(data.business_email);
		$('#biz_tb_business_phone').val(data.business_phone);
		$('#biz_sel_business_country').val(data.business_country);
		$('#biz_tb_business_address1').val(data.business_address1);
		$('#biz_tb_business_address2').val(data.business_address2);
		$('#biz_tb_business_city').val(data.business_city);
		$('#biz_sel_business_state').val(data.business_state);
		$('#biz_tb_business_zip').val(data.business_zip);
	}
	function bind_social(data){
		$('#biz_tb_social_website').val(data.social_website);
		$('#biz_tb_social_instagram').val(data.social_instagram);
		$('#biz_tb_social_twitter').val(data.social_twitter);
		$('#biz_tb_social_facebook').val(data.social_facebook);
		$('#biz_tb_social_youtube').val(data.social_youtube);
	}
	function bind_app(data){
		$('#biz_tb_app_title').val(data.app_title);
		$('#biz_sel_app_color').val(data.app_color);
		$('#biz_sel_app_theme').val(data.app_theme);
		$('#biz_sel_button_color').val(data.button_color);
		$("#biz_sel_app_color").change(function() {
			set_app_color($('#biz_sel_app_color').val(),$('#biz_sel_app_theme').val());
		});
		$("#biz_sel_app_theme").change(function() {
			set_app_color($('#biz_sel_app_color').val(),$('#biz_sel_app_theme').val());
		});
	}
	function bind_billing(data){
		//-payondelivery
		$('#biz_sel_business_payondelivery_visible').val(data.business_payondelivery_visible);
		//-cashapp
		$('#biz_sp_cashapp').hide();
		$('#biz_tb_business_cashapp').val(data.business_cashapp);
		$('#biz_sel_business_cashapp_visible').val(data.business_cashapp_visible);

		if(data.business_in_app_purchase_visible=='true'){
			$('#biz_sel_business_in_app_purchase_visible').val(data.business_in_app_purchase_visible);
		}else{
			$('#biz_sel_business_in_app_purchase_visible').val('false');
		}
		if(data.business_cashapp_visible=='true'){
			$("#biz_sp_cashapp").show();
		}
		$("#biz_sel_business_cashapp_visible").change(function() {
			val=$(this).val();
			if(val=='true'){
				$("#biz_sp_cashapp").show();
			}else{
				$("#biz_sp_cashapp").hide();
			}
		});
		//stripe
		$('#biz_sp_stripe').hide();
		$('#biz_tb_business_stripe_key').val(data.business_stripe_key);
		$('#biz_sp_stripe').hide();
		$('#biz_sel_business_stripe_visible').val(data.business_stripe_visible);
		$("#biz_sel_business_stripe_visible").change(function() {
			val=$(this).val();
			if(val=='true'){
				$("#biz_sp_stripe").show();
			}else{
				$("#biz_sp_stripe").hide();
			}
		});
	}
	function bind_navigation(data){
		$('#biz_page_left_nav_data_type').val(data.data_type);
		$('#biz_page_left_nav_tbl_id').val(data.tbl_id);
		$('#biz_tb_left_nav_header').val(data.left_nav_header);
		if(data.photofilename){
			$('#biz_navigation_img').attr('src',data.photo_obj.square_mid_url);
			$('#biz_page_left_nav_photofilename').val(data.photofilename)
		}
		$('#biz_tb_left_nav_sub_note').val(data.left_nav_sub_note);
		$('#biz_tb_left_nav_bar_title').val(data.left_nav_bar_title);
		$('#biz_tb_left_nav_bar_social').val(data.left_nav_bar_social);
		$('#biz_tb_left_nav_copyright').val(data.left_nav_copyright);
		$("#biz_navigation_img").click(function() {
			tbl_id= $('#biz_page_left_nav_tbl_id').val();
			data_type= $('#biz_page_left_nav_data_type').val();
			camera_photo_select(function(data){
				cloud_update(data_type,tbl_id,{photofilename:data.photofilename},function(data){
					$('#biz_page_left_nav_photofilename').val(data.item.photofilename);
					$('#biz_navigation_img').attr('src',data.item.photo_obj.square_mid_url);
					return false;
				});
			});
		});
		var icon_list=[];
		var str='';
		$.get('../../data/icons.txt', function(file_icon_list) {
			icon_list = file_icon_list.split('\n').sort();
			for(a=0;a<icon_list.length;a++){
				str=str+ "<option value='"+icon_list[a]+"'>"+icon_list[a] + "</option>";
			}
			$(".biz_sel_left_nav_icon_list").html(str);

			$("#biz_sel_left_nav_icon_page").val(data.left_nav_icon_page);
			$("#biz_lbl_left_nav_icon_page").attr('class',"fa fa-" +data.left_nav_icon_page+" font-30");

			$("#biz_sel_left_nav_icon_about").val(data.left_nav_icon_about);
			$("#biz_lbl_left_nav_icon_about").attr('class',"fa fa-" +data.left_nav_icon_about+" font-30");

			$("#biz_sel_left_nav_icon_contact").val(data.left_nav_icon_contact);
			$("#biz_lbl_left_nav_icon_contact").attr('class',"fa fa-" +data.left_nav_icon_contact+" font-30");
		});
		$("#biz_sel_left_nav_icon_page").change(function() {
			$("#biz_lbl_left_nav_icon_page").attr('class',"fa fa-" +$(this).val()+" font-30");
		});
		$("#biz_sel_left_nav_icon_about").change(function() {
			$("#biz_lbl_left_nav_icon_about").attr('class',"fa fa-" +$(this).val()+" font-30");
		});
		$("#biz_sel_left_nav_icon_contact").change(function() {
			$("#biz_lbl_left_nav_icon_contact").attr('class',"fa fa-" +$(this).val()+" font-30");
		});
	}
	function bind_brevo_email(data){
		$('#biz_sp_brevo_email').hide();
		$('#biz_tb_brevo_email').val(data.brevo_email);
		$('#biz_tb_brevo_email_key').val(data.brevo_email_key);
		$('#biz_sel_brevo_email_visible').val(data.brevo_email_visible);
		if(data.brevo_email_visible=='true'){
			$("#biz_sp_brevo_email").show();
		}
		$("#biz_sel_brevo_email_visible").change(function() {
			val=$(this).val();
			if(val=='true'){
				$("#biz_sp_brevo_email").show();
			}else{
				$("#biz_sp_brevo_email").hide();
			}
		});
	}
	function bind_brevo_email(data){
		$('#biz_sp_brevo_email').hide();
		$('#biz_tb_brevo_email').val(data.brevo_email);
		$('#biz_tb_brevo_email_key').val(data.brevo_email_key);
		if(data.brevo_email_visible=='true'){
			$('#biz_sel_brevo_email_visible').val(data.brevo_email_visible);
			$("#biz_sp_brevo_email").show();
		}else{
			$('#biz_sel_brevo_email_visible').val('false');
		}
		$("#biz_sel_brevo_email_visible").change(function() {
			val=$(this).val();
			if(val=='true'){
				$("#biz_sp_brevo_email").show();
			}else{
				$("#biz_sp_brevo_email").hide();
			}
		});
	}
	function bind_firebase_notification(data){
		$('#biz_sp_firebase_notification').hide();
		if(data.firebase_notification_visible=='true'){
			$('#biz_sel_firebase_notification_visible').val(data.firebase_notification_visible);
			$("#biz_sp_firebase_notification").show();
		}else{
			$('#biz_sel_firebase_notification_visible').val('false');
		}
		$("#biz_sel_firebase_notification_visible").change(function() {
			val=$(this).val();
			if(val=='true'){
				$("#biz_sp_firebase_notification").show();
			}else{
				$("#biz_sp_firebase_notification").hide();
			}
		});
	}
	function bind_event(){
		$("#biz_btn_update").click(function() {
			var obj={};
			obj.user_tbl_id=$('#biz_page_user_tbl_id').val();
			obj.user_data_type=$('#biz_page_user_data_type').val();
			//profile
			obj.first_name=$('#biz_tb_first_name').val();
			obj.last_name=$('#biz_tb_last_name').val();
			obj.email=$('#biz_tb_profile_email').val();
			password1=$('#biz_tb_password1').val();
			password2=$('#biz_tb_password2').val();
			//business
			obj.business_name=$('#biz_tb_business_name').val();
			obj.business_email=$('#biz_tb_business_email').val();
			obj.business_phone=$('#biz_tb_business_phone').val();
			obj.business_country=$('#biz_sel_business_country').val();
			obj.business_address1=$('#biz_tb_business_address1').val();
			obj.business_address2=$('#biz_tb_business_address2').val();
			obj.business_city=$('#biz_tb_business_city').val();
			obj.business_state=$('#biz_sel_business_state').val();
			obj.business_zip=$('#biz_tb_business_zip').val();
			//social
			obj.social_website=$('#biz_tb_social_website').val();
			obj.social_youtube=$('#biz_tb_social_youtube').val();
			obj.social_instagram=$('#biz_tb_social_instagram').val();
			obj.social_facebook=$('#biz_tb_social_facebook').val();
			obj.social_twitter=$('#biz_tb_social_twitter').val();
			if(!validate_email(obj.business_email)){
				show_toast_error('Please enter a valid business email');
			}else if(!validate_email(obj.email)){
				show_toast_error('Please enter a valid email');
			}else if(password1!=password2 || password1.length<=0){
				show_toast_error('Please enter a valid password');
			}else{
				obj.password=password1;
				url='biz_view/profile_update';
				cloud_post_url(get_cloud_url(url,[]),obj,function(data){
					set_user(data.user);
					show_toast_update();
					return false;
				});
			}
			return false;
		});
		$("#biz_btn_update2").click(function() {
			var obj={};
			//primary
			//app
			obj.primary_app_title=$('#biz_tb_app_title').val();
			obj.primary_app_color=$('#biz_sel_app_color').val();
			obj.primary_app_theme=$('#biz_sel_app_theme').val();
			obj.primary_button_color=$('#biz_sel_button_color').val();
			//info
			//billing
			//-cashapp
			obj.business_cashapp=$('#biz_tb_business_cashapp').val();
			obj.business_cashapp_visible=$('#biz_sel_business_cashapp_visible').val();
			//-stripe
			obj.business_stripe_key=$('#biz_tb_business_stripe_key').val();
			obj.business_stripe_visible=$('#biz_sel_business_stripe_visible').val();
			//-pay on delivery
			obj.business_payondelivery_visible=$('#biz_sel_business_payondelivery_visible').val();
			//-in app purchase
			obj.business_in_app_purchase_visible=$('#biz_sel_business_in_app_purchase_visible').val();
			//left_nav
			//navigation
			obj.left_nav_header=$('#biz_tb_left_nav_header').val();
			obj.left_nav_sub_note=$('#biz_tb_left_nav_sub_note').val();
			obj.left_nav_bar_title=$('#biz_tb_left_nav_bar_title').val();
			obj.left_nav_bar_social=$('#biz_tb_left_nav_bar_social').val();
			obj.left_nav_copyright=$('#biz_tb_left_nav_copyright').val();
			obj.left_nav_photofilename=$('#biz_page_left_nav_photofilename').val();;
			//brevo_email
			obj.brevo_email=$('#biz_tb_brevo_email').val();
			obj.brevo_email_key=$('#biz_tb_brevo_email_key').val();
			obj.brevo_email_visible=$('#biz_sel_brevo_email_visible').val();
			//firebase_notification
			obj.firebase_notification_visible=$('#biz_sel_firebase_notification_visible').val();
			//icon
			obj.left_nav_icon_page=$('#biz_sel_left_nav_icon_page').val();
			obj.left_nav_icon_about=$('#biz_sel_left_nav_icon_about').val();
			obj.left_nav_icon_contact=$('#biz_sel_left_nav_icon_contact').val();
			url='biz_view/setting_update';
			cloud_post_url(get_cloud_url(url,[]),obj,function(data){
				show_toast_update();
				return false;
			});
		});
	}
}
// 9_edit_list 9_list//9_dash //9_dashboard_sub_item_list //9_sub
function set_dashboard_sub_item_list(data){
	hide_page_footer();
	hide_page_cart_top();
	bind_page_id(data.item);
	bind_page_other_id({
		parent_tbl_id:data.item.parent_tbl_id,
		parent_data_type:data.item.parent_data_type,
		top_tbl_id:data.item.top_tbl_id,
		top_data_type:data.item.top_data_type,
	});
	bind_detail(data);
	bind_page_event();
	bind_event_dashboard_list_page();
	bind_list(data.item_list,data.page_current,data.page_count);
	hide_page_spinner();
	function bind_detail(data){
		set_page_title('Dashboard');
		if(data.item.data_type!=DT_ITEM){
			set_page_sub_title(data.item.title + ' Sub Items');
		}else{
			set_page_sub_title(data.top_item.title + " "+ data.item.title + ' Sub Items');
		}
	}
	function bind_list(item_list,page_current,page_count){
		$('#biz_lbl_list').html(get_dashboard_list_str(item_list,page_current,page_count));
		$('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
	}
	function bind_page_event(){
		$("#biz_btn_add").click(function() {
			data_type=$('#biz_page_data_type').val();
			tbl_id=$('#biz_page_tbl_id').val();
			parent_data_type=$('#biz_page_parent_data_type').val();
			parent_tbl_id=$('#biz_page_parent_tbl_id').val();
			top_data_type=$('#biz_page_top_data_type').val();
			top_tbl_id=$('#biz_page_top_tbl_id').val();
			if(data.item.data_type!=DT_ITEM){
				window.location=get_item_link(DT_ITEM).edit_url+"&tbl_id=0&data_type="+DT_ITEM+"&parent_data_type="+parent_data_type+"&parent_tbl_id="+parent_tbl_id+"&top_data_type="+top_data_type+"&top_tbl_id="+top_tbl_id;
			}else{
				window.location=get_item_link(DT_ITEM).edit_url+"&tbl_id=0&data_type="+DT_ITEM+"&parent_data_type="+data_type+"&parent_tbl_id="+tbl_id+"&top_data_type="+top_data_type+"&top_tbl_id="+top_tbl_id;
			}
		});
		$(".biz_btn_delete").click(function() {
			tbl_id=$(this).attr('tbl_id');
			data_type=$(this).attr('data_type');
			if (confirm("Delete?") == true) {
				cloud_delete(data_type,tbl_id,function(data){
					$('#biz_row_'+tbl_id).remove();
				});
			}
		});
	}
}

//9_sub_item 9_sub_item_edit
function set_dashboard_sub_item_edit(data){
	hide_page_footer();
	hide_page_cart_top();
	bind_page_id(data.item);
	bind_page_other_id({
		tbl_id:data.item.tbl_id,
		data_type:data.item.data_type,
		parent_tbl_id:data.item.parent_tbl_id,
		parent_data_type:data.item.parent_data_type,
		top_tbl_id:data.item.top_tbl_id,
		top_data_type:data.item.top_data_type
	});
	bind_detail(data);
	bind_event();
	hide_page_spinner();
	function bind_detail(data){
		set_page_title('Dashboard');
		if(data.item.tbl_id==0){
			set_page_sub_title('Add Sub Item');
		}else{
			set_page_sub_title('Edit Sub Item');
			$('#biz_tb_title').val(data.item.title);
			$('#biz_tb_price').val(data.item.price);
		}
	}
	function bind_event(){
		$("#biz_btn_update").click(function() { var obj={};
			var obj=get_new_item( DT_ITEM, $('#biz_page_tbl_id').val());
			obj.parent_data_type= $('#biz_page_parent_data_type').val();
			obj.parent_tbl_id= $('#biz_page_parent_tbl_id').val();
			obj.top_data_type= $('#biz_page_top_data_type').val();
			obj.top_tbl_id= $('#biz_page_top_tbl_id').val();
			obj.photofilename= $('#biz_page_photofilename').val();
			obj.title=$('#biz_tb_title').val();
			obj.price=$('#biz_tb_price').val();
			if(obj.title){
				cloud_update(obj.data_type,obj.tbl_id,obj,function(data){
					$('#biz_page_tbl_id').val(data.item.tbl_id);
					show_toast_update();
					return false;
				});
			}else{
				show_toast_error('Please enter a valid title');
			}
		});
	}
}
//9_dashboard_photo 9_photo_edit
function set_dashboard_photo_edit(data){
	hide_page_footer();
	hide_page_cart_top();
	bind_page_id(data.photo);
	bind_page_other_id({
		tbl_id:data.photo.tbl_id,
		data_type:data.photo.data_type,
		parent_tbl_id:data.photo.parent_tbl_id,
		parent_data_type:data.photo.parent_data_type,
		top_tbl_id:data.photo.top_tbl_id,
		top_data_type:data.photo.top_data_type
	});
	bind_detail(data);
	bind_event();
	bind_event_dashboard_photo();
	hide_page_spinner();
	function bind_detail(data){
		set_page_title('Dashboard');

			if(data.photo.tbl_id==0){
			set_page_sub_title('Add Photo');
		}else{
			set_page_sub_title('Edit Photo');
			$('#biz_img').attr('src',data.photo.photo_obj.square_mid_url);
			$('#biz_tb_title').val(data.photo.title);
		}
	}
	function bind_event(){
		$("#biz_btn_update").click(function() { var obj={};
			var obj=get_new_item( $('#biz_page_data_type').val(), $('#biz_page_tbl_id').val());
			obj.parent_data_type= $('#biz_page_parent_data_type').val();
			obj.parent_tbl_id= $('#biz_page_parent_tbl_id').val();
			obj.top_data_type= $('#biz_page_top_data_type').val();
			obj.top_tbl_id= $('#biz_page_top_tbl_id').val();
			obj.photofilename= $('#biz_page_photofilename').val();
			obj.title=$('#biz_tb_title').val();
			cloud_update(obj.data_type,obj.tbl_id,obj,function(data){
				$('#biz_page_tbl_id').val(data.item.tbl_id);
				show_toast_update();
				return false;
			});
		});
	}
}
//9_photo_list 9_dash_photo 9_dashboard_photo_list
function set_dashboard_photo_list(data){
	hide_page_footer();
	hide_page_cart_top();
	bind_page_id({
		parent_tbl_id:data.item.parent_tbl_id,
		parent_data_type:data.item.parent_data_type,
		top_tbl_id:data.item.top_tbl_id,
		top_data_type:data.item.top_data_type,
	});
	bind_detail(data);
	bind_list(data.photo_list,data.page_current,data.page_count);
	bind_event_dashboard_list_page();
	bind_event_dashboard_list_other();
	hide_page_spinner();
	function bind_detail(data){
		set_page_title('Dashboard');
		set_page_sub_title(data.parent_item.title + ' Photos');
	}
	function bind_list(item_list,page_current,page_count){
		$('#biz_lbl_list').html(get_dashboard_list_str(item_list,page_current,page_count));
		$('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
	}
	function bind_page_event(){
		$("#biz_btn_add").click(function() {
			data_type=$('#biz_page_data_type').val();
			tbl_id=$('#biz_page_tbl_id').val();
			parent_data_type=$('#biz_page_parent_data_type').val();
			parent_tbl_id=$('#biz_page_parent_tbl_id').val();
			top_data_type=$('#biz_page_top_data_type').val();
			top_tbl_id=$('#biz_page_top_tbl_id').val();
			window.location=get_item_link(DT_PHOTO).edit_url+"?tbl_id=0&data_type="+DT_PHOTO+"&parent_data_type="+data_type+"&parent_tbl_id="+tbl_id;
		});
		$(".biz_link_page").click(function(e) {
			e.preventDefault();
			data_type=$('#biz_page_data_type').val();
			tbl_id=$('#biz_page_tbl_id').val();
			page_current = $(this).attr('page_current');
			url='biz_view/item_photo_list/'+data_type+"/"+tbl_id+"/"+page_current;
			cloud_get_url(get_cloud_url(url,[]),{},function(data){
				$('#biz_lbl_list').html(get_dashboard_list_str(data.photo_list,data.page_current,data.page_count));
				$('#biz_lbl_pager').html(get_pager_ajax(data.page_current,data.page_count));
				bind_page_event();
				set_biz_style(data.mobile.primary.button_color,data.mobile.primary.app_theme);
			});
		});
		$(".biz_btn_delete").click(function() {
			tbl_id=$(this).attr('tbl_id');
			data_type=$(this).attr('data_type');
			if (confirm("Delete?") == true) {
				cloud_delete(data_type,tbl_id,function(data){
					$('#biz_row_'+tbl_id).remove();
				});
			}
		});
	}
}
//9_event
function bind_event_dashboard_list_page(){
	$(".biz_link_page").click(function(e) {
		e.preventDefault();
		data_type=$('#biz_page_data_type').val();
		category='all';
		page_current = $(this).attr('page_current');
		url="biz_view/item_list/"+data_type+"/"+category+"/"+page_current;
		cloud_get_url(get_cloud_url(url,[]),{},function(data){
			$('#biz_lbl_list').html(get_dashboard_list_str(data.item_list,data.page_current,data.page_count));
			$('#biz_lbl_pager').html(get_pager_ajax(data.page_current,data.page_count));
			bind_event_dashboard_list_page();
			set_biz_style(data.mobile.primary.button_color, data.mobile.primary.app_theme);
		});
	});
}
//9_event_dashboard 9_sub_item_event
/*
function bind_event_dashboard_sub_item_list(){
	$("#biz_sub_item_btn_add").click(function() {
		data_type = $('#biz_page_data_type').val();
		tbl_id = $('#biz_page_tbl_id').val();
		parent_data_type = $('#biz_page_parent_data_type').val();
		parent_tbl_id = $('#biz_page_parent_tbl_id').val();
		top_data_type = $('#biz_page_top_data_type').val();
		top_tbl_id = $('#biz_page_top_tbl_id').val();
		switch(data_type){
			case DT_ITEM:
				window.location=get_item_link(DT_ITEM).edit_url+"?tbl_id=0&data_type="+DT_ITEM+"&parent_tbl_id="+tbl_id+"&parent_data_type="+data_type;
				break;
			case DT_PHOTO:
				window.location=get_item_link(DT_PHOTO).edit_url+"?tbl_id=0&data_type="+data_type+"&parent_tbl_id="+parent_tbl_id+"&parent_data_type="+parent_data_type;
				break;
			default:
				window.location=get_item_link(DT_ITEM).edit_url+"?tbl_id=0&data_type="+data_type+"&parent_tbl_id="+parent_tbl_id+"&parent_data_type="+parent_data_type;
				break;
		}
	});
}
*/
//9_dashboard_event 9_event 9_list  9_dashboard_event 9_add 9_item_dashboard_list_event_add
function bind_event_dashboard_list_other(){
	$("#biz_btn_add").click(function() {
		switch($('#biz_page_data_type').val()){
			case DT_TEAM:
				window.location=get_item_link($('#biz_page_data_type').val()).add_url+"&parent_data_type="+ $('#biz_page_parent_data_type').val()+"&parent_tbl_id="+($('#biz_page_parent_tbl_id').val());
				break;
			case DT_GAME:
				window.location=get_item_link($('#biz_page_data_type').val()).add_url+"&parent_data_type="+ $('#biz_page_parent_data_type').val()+"&parent_tbl_id="+($('#biz_page_parent_tbl_id').val());
				break;
			case DT_PHOTO:
				data_type=$('#biz_page_data_type').val();
			tbl_id=$('#biz_page_tbl_id').val();
			parent_data_type=$('#biz_page_parent_data_type').val();
			parent_tbl_id=$('#biz_page_parent_tbl_id').val();
			top_data_type=$('#biz_page_top_data_type').val();
			top_tbl_id=$('#biz_page_top_tbl_id').val();
			window.location=get_item_link(DT_PHOTO).edit_url+"?tbl_id=0&data_type="+DT_PHOTO+"&parent_data_type="+data_type+"&parent_tbl_id="+tbl_id;

			default:
				window.location=get_item_link($('#biz_page_data_type').val()).add_url;
				break;
		}
	});
	$(".biz_btn_delete").click(function() {
		tbl_id=$(this).attr('tbl_id');
		data_type=$(this).attr('data_type');
		if (confirm("Delete?") == true) {
			url="item/delete_item/"+data_type+"/"+tbl_id;
			cloud_post_url(get_cloud_url(url,[]),{},function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
	$(".biz_btn_copy").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Copy?") == true) {
			show_page_spinner();
			url="item/copy_item/"+data_type+"/"+tbl_id;
			cloud_post_url(get_cloud_url(url,[]),{},function(data){
				window.location.reload();
			});
		}
	});
}
//9_edit_list_item_list 9_edit_list_edit 9_list_edit
function set_dashboard_item_list_edit(data){
	bind_page_id({tbl_id:0,data_type:data.data_type});
	hide_page_cart_top();
	hide_page_pager();
	hide_page_add_button();
	hide_page_footer();
	bind_page_other_id({parent_field_id:data.parent_field_id,parent_tbl_id:data.parent_item.tbl_id,parent_data_type:data.parent_item.data_type});
	bind_detail(data);
	bind_detail_list('full',data.full_list);
	bind_detail_list('active',data.active_list);
	hide_page_spinner();
	function bind_detail(data){
		set_page_title('Dashboard');
		set_page_sub_title(data.data_type_info.titlez);
		$('#biz_lbl_page_active_list_title').html(data.active_list_title);
		$('#biz_lbl_page_full_list_title').html(data.full_list_title);
		var back_link='';
		switch(data.search_type){
			case 'Player':
				break;
			case 'Coach':
				var back_link=get_item_link(DT_TEAM).edit_list_url+"&parent_tbl_id="+data.parent_item.sport_tbl_id+"&parent_data_type="+DT_SPORT;
				break;
		}
	}
	function bind_detail_list(type,data_list){
		var str='';
		for(a=0;a<data_list.length;a++){
			if(type=='full'){
				$('#biz_lbl_full_list').append(get_item_list_edit_str(type,data_list[a]));
				bind_detail_update_list_event('add',data_list[a].data_type,data_list[a].tbl_id);
			}
			if(type=='active'){
				$('#biz_lbl_active_list').append(get_item_list_edit_str(type,data_list[a]));
				bind_detail_update_list_event('remove',data_list[a].data_type,data_list[a].tbl_id);
			}
		}
	}
	function get_item_list_edit_str(type,data){
		str="<a id='biz_lbl_row_"+data.tbl_id+"' data_type='"+data.data_type+"' tbl_id='"+data.tbl_id+"'  href='#'>"+
			"<img src='"+data.photo_obj.thumb_url+"'>";
		switch(data.type){
			case 'Player':
				var class_str='';
				if(data.class){
					class_str=' | '+data.class;
				}
				var jersey_number_str='';
				if(data.jersey_number){
					jersey_number_str=' | '+data.jersey_number;
				}
				str=str+"<span>"+data.first_name+ " " + data.last_name +"</span><strong>" + data.position  + class_str + jersey_number_str +"</strong>";
				break;
			default:
				str=str+"<span>"+data.first_name+ " " + data.last_name +"</span><strong>" + data.position +"</strong>";
				break;
		}
		if(type=='full'){
			str=str+"<span class='badge bg-green-dark font-11 color-white' id='biz_btn_update_field_"+data.tbl_id+"' update_type='add' data_type='"+data.data_type+"' tbl_id='"+data.tbl_id+"'>Add</span>"+"<i class='fa fa-angle-right'></i></a>";
		}
		if(type=='active'){
			str=str+"<span class='badge bg-red-dark font-11 color-white' id='biz_btn_update_field_"+data.tbl_id+"' update_type='remove' data_type='"+data.data_type+"' tbl_id='"+data.tbl_id+"'>Remove</span>"+"<i class='fa fa-angle-right'></i></a>";
		}
		return str;
	}
	function bind_detail_update_list_event(update_type,data_type,tbl_id){
		$("#biz_btn_update_field_"+String(tbl_id)).click(function(e) {
			e.preventDefault();
			parent_field_id=$("#biz_page_parent_field_id").val();
			parent_data_type=$("#biz_page_parent_data_type").val();
			parent_tbl_id=$("#biz_page_parent_tbl_id").val();
			var obj=get_new_item(data_type,tbl_id);
			if(update_type=='remove'){
				obj[parent_field_id]='0';
			}else{
				obj[parent_field_id]=parent_tbl_id;
			}
			url = "biz_view/item_list_update/"+obj.data_type+"/"+obj.tbl_id+"/"+parent_field_id+"/"+parent_data_type + "/"+parent_tbl_id;
			cloud_post_url(get_cloud_url(url,[]),obj,function(data){
				if(update_type=='remove'){
					$("#biz_lbl_row_"+obj.tbl_id).remove();
				}else{
					if(data.item_found!='true'){
						$('#biz_lbl_active_list').append(get_item_list_edit_str('active',data.item));
						bind_detail_update_list_event('remove',data.item.data_type,data.item.tbl_id);
					}
				}
			});
		});
	}
}
//9_item_list 9_edit_list 9_list 9_dashboard_item_list //9_dashboard 9_dash_list
function set_dashboard_item_list(data){
	hide_page_footer();
	hide_page_cart_top();
	bind_page_id({tbl_id:0,data_type:data.data_type,parent_tbl_id:data.parent_item.tbl_id,parent_data_type:data.parent_item.data_type});
	bind_page_other_id({parent_tbl_id:data.parent_item.tbl_id,parent_data_type:data.parent_item.data_type});
	bind_detail(data);
	bind_list(data.item_list,data.page_current,data.page_count);
	bind_event_dashboard_list_page();
	bind_event_dashboard_list_other();
	hide_page_spinner();
	function bind_detail(data){
		set_page_title('Dashboard');
		set_page_sub_title(data.data_type_info.titlez);
	}
	function bind_list(item_list,page_current,page_count){
		$('#biz_lbl_list').html(get_dashboard_list_str(item_list,page_current,page_count));
		$('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
	}
}
//9_list 9_dashboard_list 9_dash 9_dash_list
function get_dashboard_list_str(item_list,page_current,page_count){
	var str='';
	for(var a=0;a<item_list.length;a++){
		var category_str="";
		var edit_str="";
		var app_store_str="";
		edit_url=get_item_link(item_list[a].data_type).edit_url+"&tbl_id="+item_list[a].tbl_id+"&title_url="+item_list[a].title_url;
		var photo_edit_url="";
		var visible_str="";
		if(get_visible_str(item_list[a])=='false'){
			visible_str=" | <span class='color-red-dark'> <i class='fa-sharp fa-solid fa-circle-xmark'></i> </span>";
		}
		if(item_list[a].category){
			category_str=item_list[a].category;
		}
		var title_type="";
		var icon_str="";
		switch(item_list[a].data_type){
			case DT_ITEM:
				edit_url=get_item_link(item_list[a].data_type).edit_url+"&tbl_id="+item_list[a].tbl_id+"&data_type="+item_list[a].data_type+"&parent_tbl_id="+item_list[a].parent_tbl_id+"&parent_data_type="+item_list[a].parent_data_type+"&top_data_type="+item_list[a].top_data_type+"&top_tbl_id="+item_list[a].top_tbl_id;
				break;
			case DT_PHOTO:
				edit_url=get_item_link(item_list[a].data_type).edit_url+"&tbl_id="+item_list[a].tbl_id+"&data_type="+item_list[a].data_type+"&parent_tbl_id="+item_list[a].parent_tbl_id+"&parent_data_type="+item_list[a].parent_data_type;
				break;
			case DT_CATEGORY:
				title_type=item_list[a].type_title;
				break;
			case DT_PAGE:
				edit_str="<a class='accordion-btn no-effect collapsed' data-bs-toggle='collapse' data-bs-target='#collapse"+a+"' aria-expanded='false'>"+
					"<i class='fa fa-gear font-14 accordion-icon a-gear'></i>"+
					"</a>";
				title_type=item_list[a].title_type;
				if(item_list[a].icon_footer){
					icon_str=" | <i class='fa fa-"+item_list[a].icon_footer+" '></i>"
				}
				break;
			default:
				break;
		}
		edit_str= "<a class='accordion-btn no-effect collapsed' data-bs-toggle='collapse' data-bs-target='#collapse"+a+"' aria-expanded='false'>"+
			"<i class='fa fa-gear font-14 accordion-icon a-gear'></i>"+
			"</a>";
		str = str+ "<div class='d-flex mb-3' id='biz_row_"+ item_list[a].tbl_id+"'>";
		switch(item_list[a].data_type){
			case DT_ITEM:
				str = str+"<div></div>";
				break;
			case DT_TEAM:
				var edit_url=get_item_link(item_list[a].data_type).edit_url+"&tbl_id="+item_list[a].tbl_id+"&parent_data_type="+get_url_param('parent_data_type')+"&parent_tbl_id="+get_url_param('parent_tbl_id');
				str = str+"<div><a href='"+edit_url+"'><img src='"+item_list[a].photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a></div>";
				break;
			default:
				str = str+"<div><a href='"+edit_url+"'><img src='"+item_list[a].photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a></div>";
				break;
		}
		switch(item_list[a].data_type){
			case DT_MEMBER:
				str = str+"<div class='biz_div_list_title'><a href='"+edit_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b class='font-14'>"+item_list[a].first_name+ " " + item_list[a].last_name+ "</b></p></a><div>";
				break;
			case DT_GAME:
				//var edit_url=get_item_link(item_list[a].data_type).edit_url+"&tbl_id="+item_list[a].tbl_id+"&parent_data_type="+item_list[a].parent_item.data_type+"&parent_tbl_id="+item_list[a]parent_item.tbl_id;
				str = str+"<div class='biz_div_list_title'><a href='"+edit_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b class='font-14'>"+item_list[a].away_team.title+ " vs " + item_list[a].home_team.title +"</b></p></a><div>";
				break;
			default:
				str = str+"<div class='biz_div_list_title'><a href='"+edit_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b class='font-14'>"+item_list[a].title+ "</b></p></a><div>";
				break;
		}
		str = str+get_like_view_str(item_list[a])+
			"</div>";
		switch(item_list[a].data_type){
			case DT_CATEGORY:
				DT_GAME:
				str=str+"<p class='mb-0 ps-3 font-12 opacity-60'><b>"+title_type+ "</b> " + edit_str+ " </p>";
				break;
			case DT_PAGE:
				str=str+"<p class='mb-0 ps-3 font-12 opacity-60'><b>"+title_type+ "</b> " +icon_str+ visible_str + " " + edit_str+ " </p>";
				break;
			case DT_SPORT:
				str=str+"<p class='mb-0 ps-3 font-12 opacity-60'><b>"+item_list[a].type+ " | </b>"+ visible_str + edit_str+ " </p>";
				break;
			case DT_TEAM:
				str=str+"<p class='mb-0 ps-3 font-12 opacity-60'><b>"+item_list[a].category+ " | </b>"+ get_country_state_city_location_str(item_list[a]) + edit_str+ " </p>";
				break;
			case DT_MEMBER:
				var member_location='';
				if(item_list[a].city){
					member_location=item_list[a].city;
				}
				if(item_list[a].state&&item_list[a].state!='0'){
					if(String(member_location).length>1){
						member_location=member_location+", ";
					}
					member_location=member_location + " "+item_list[a].state;
				}
				if(item_list[a].country&&item_list[a].country!='0'){
					member_location=member_location+" "+item_list[a].country;
				}
				str=str+"<p class='mb-0 ps-3 font-12 opacity-60'><b>"+item_list[a].type+ " | </b>" +item_list[a].position + " | " +member_location + " | " + category_str +visible_str+ edit_str+ " </p>";
				break;
			default:
				str=str+"<p class='mb-0 ps-3 font-12 opacity-60'>"+get_price_str(item_list[a]) +get_date_str(item_list[a]) +"<b>"+category_str+ "</b> " + app_store_str + visible_str + edit_str+ " </p>";
				break;
		}
		str=str+"<div class='accordion' id='accordion-"+a+"'>"+
			"<div>"+
			"<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
			"<div class='mb-0 ps-3  'style='float:left;'>"+
			get_edit_str(item_list[a])+
			"</div>"+
			"</div>"+
			"</div>"+
			"</div>"+
			"</div></div>";
	}
	return str;

	function get_date_str(data){
		var date_str='';
		switch(data.data_type) {
			case DT_EVENT:
				date_str=data.event_obj.start_date_time+ " | ";
				break;
			case DT_BLOG_POST:
				date_str=data.date_obj.full_date_create+ " | ";
				break;
			default:
				date_str='';
				break;
		}
		return date_str;
	}
	function get_like_view_str(data){
		var like_view_str='';
		switch(data.data_type) {
			case DT_EVENT:
			case DT_PRODUCT:
			case DT_GALLERY:
			case DT_SERVICE:
			case DT_BLOG_POST:
				like_view_str="<span class='mb-0 ps-3 font-10 pt-1'><i class='fa fa-heart color-gray-dark'> "+data.like_count +"</i>"+" | <i class='fa fa-eye color-gray-dark'> "+data.view_count +"</i></span>";
				break;
			default:
				like_view_str='';
				break;
		}
		return like_view_str;
	}
	function get_country_state_city_location_str(data){
		var full_location='';
		if(data.city){
			full_location=data.city;
		}
		if(data.state&&data.state!='0'){
			if(String(full_location).length>1){
				full_location=full_location+", ";
			}
			full_location=full_location + " "+data.state;
		}
		if(data.country&&data.country!='0'){
			full_location=full_location+" "+data.country;
		}
		return full_location
	}
	function get_price_str(data){
		var price_str='';
		switch(data.data_type) {
			case DT_ITEM:
				price_str="<b>"+get_money(data.price)+"</b>";
				break;
			case DT_EVENT:
			case DT_PRODUCT:
			case DT_SERVICE:
				price_str="<b>"+data.money_obj.price+"</b> | ";
				break;
			default:
				price_str='';
				break;
		}
		return price_str;
	}
	function get_edit_str(data){
		var edit_str='';
		var data_type=data.data_type;
		var photo_edit_url="item_dashboard_photo_list.html?data_type="+data.data_type+"&tbl_id="+data.tbl_id+"&page_current=1";
		switch(data.data_type) {
			case DT_EVENT:
			case DT_SERVICE:
			case DT_PRODUCT:
				var sub_item_edit_url="item_dashboard_sub_item_list.html?data_type="+data.data_type+"&tbl_id="+data.tbl_id+"&parent_data_type="+data.data_type+"&parent_tbl_id="+data.tbl_id;
				edit_str="<div class='biz_div_list_edit'><a tbl_id='"+  data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+get_item_link(data_type).detail_url+"&tbl_id="+data.tbl_id+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+sub_item_edit_url+"'><i class='admin_edit_img fa fa-tags pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_copy' href='#'><i class='admin_edit_img fa fa-copy pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+
					"</div>";
				break;
			case DT_BLOG_POST:
				edit_str="<div class='biz_div_list_edit'><a tbl_id='"+  data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+get_item_link(data_type).detail_url+"&tbl_id="+data.tbl_id+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_copy' href='#'><i class='admin_edit_img fa fa-copy pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+
					"</div>";
				break;
			case DT_MEMBER:
				edit_str="<div class='biz_div_list_edit'><a tbl_id='"+  data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+get_item_link(data_type).detail_url+"&tbl_id="+data.tbl_id+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_copy' href='#'><i class='admin_edit_img fa fa-copy pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+
					"</div>";
				break;
			case DT_GALLERY:
				edit_str="<div class='biz_div_list_edit'><a tbl_id='"+  data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+get_item_link(data_type).detail_url+"&tbl_id="+data.tbl_id+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+
					"</div>";
				break;
			case DT_ITEM:
				var obj={};
				obj.tbl_id=data.tbl_id;
				obj.data_type=data.data_type;
				obj.parent_data_type=data.parent_data_type;
				obj.parent_tbl_id=data.parent_tbl_id;
				obj.top_data_type=data.top_data_type;
				obj.top_tbl_id=data.top_tbl_id;
				var sub_item_edit_list_url="item_dashboard_sub_item_list.html?data_type="+obj.data_type+"&tbl_id="+obj.tbl_id+"&parent_data_type="+obj.parent_data_type+"&parent_tbl_id="+obj.parent_tbl_id;
				edit_str="<div class='biz_div_list_edit'>";
				if(data.parent_data_type!=DT_ITEM){
					edit_str=edit_str+"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+sub_item_edit_list_url+"'><i class='admin_edit_img fa fa-tags pe-2 a-gear'></i></a>";
				}
				edit_str=edit_str+"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+"</div>"+
					"</div>";
				break;
			case DT_PAGE:
				edit_str="<div class='biz_div_list_edit'>"+
					"<a tbl_id='"+item_list[a].tbl_id +"' data_type='"+item_list[a].data_type +"' class='#' href='"+get_item_link(item_list[a].type).home_url+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+
					"</div>";
				break;
			case DT_SPORT:
				var team_list_url=get_item_link(DT_TEAM).edit_list_url+"&page_current=1&parent_tbl_id="+item_list[a].tbl_id+"&parent_data_type="+item_list[a].data_type+"&category=all";
				var game_list_url=get_item_link(DT_GAME).edit_list_url+"&page_current=1&parent_tbl_id="+item_list[a].tbl_id+"&parent_data_type="+item_list[a].data_type+"&category=all";
				edit_str="<div class='biz_div_list_edit'><a tbl_id='"+  data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+get_item_link(data_type).detail_url+"&tbl_id="+data.tbl_id+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+team_list_url+"'><i class='admin_edit_img fa fa-university pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+game_list_url+"'><i class='admin_edit_img fa fa-gamepad pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+
					"</div>";
				break;
			case DT_TEAM:
				var player_list_edit_url=get_item_link(DT_PLAYER).edit_list_url+"?data_type="+DT_PLAYER+"&page_current=1&parent_tbl_id="+item_list[a].tbl_id+"&parent_data_type="+item_list[a].data_type+"&search_type=Player";
				var coach_list_edit_url=get_item_link(DT_COACH).edit_list_url+"?data_type="+DT_COACH+"&page_current=1&parent_tbl_id="+item_list[a].tbl_id+"&parent_data_type="+item_list[a].data_type+"&search_type=Coach";
				edit_str="<div class='biz_div_list_edit'><a tbl_id='"+  data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='#'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+

					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+player_list_edit_url+"'><i class='admin_edit_img fa fa-users pe-2 a-gear'></i></a>"+

					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+coach_list_edit_url+"'><i class='admin_edit_img fa fa-user-shield pe-2 a-gear'></i></a>"+

					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2 a-gear'></i></a>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+
					"</div>";
				break;
			default:
				edit_str="<div class='biz_div_list_edit'>"+
					"<a tbl_id='"+data.tbl_id +"' data_type='"+data.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+
					"</div>";
				break;
		}
		return edit_str;
	}
	function get_visible_str(data){
		var visible="false";
		switch(data.data_type) {
			case DT_EVENT:
				if(String(data.visible_obj.event_visible_id)!='0'){
					visible=true;
				}
				break;
			case DT_PRODUCT:
				if(String(data.visible_obj.product_visible_id)!='0'){
					visible=true;
				}
				break;
			case DT_SERVICE:
				if(String(data.visible_obj.service_visible_id)!='0'){
					visible=true;
				}
				break;
			default:
				if(String(data.visible)=='true'){
					visible=true;
				}
				break;
		}
		return visible;
	}
}
// ITEM EDIT START //
//9_edit
function hide_item_edit(){
	$('#biz_div_app_store_product_id').hide();
}
function set_item_content_edit(item,title){
	if(!title){
		title='Blank';
	}
	if(item.tbl_id==0){
		set_page_sub_title('Add ' +title);
	}else{
		set_page_sub_title('Edit ' +title);
		$('#biz_img').attr('src',item.photo_obj.square_mid_url);
	}
	$('#biz_tb_title').val(item.title?item.title:"");
	$('#biz_tb_youtube_url').val(item.youtube_url?item.youtube_url:"");
	$('#biz_tb_mp3_filename').val(item.mp3filename?item.mp3filename:"");
	$('#biz_tb_sub_note').val(item.sub_note?item.sub_note:"");
	$('#biz_tb_pdf_link').val(item.pdf_link?item.pdf_link:"");
	$('#biz_tb_website').val(item.website?item.website:"");
}
function set_item_visible_edit(visible_option_list,visible,title,value){
	if(visible_option_list.length>0){
		$('#biz_sel_visible').html(get_option_list_str(visible_option_list,title,value));
	}
	if(!visible){
		$('#biz_sel_visible').val('0');
	}else{
		$('#biz_sel_visible').val(visible);
	}
}
function set_item_price_edit(price,old_price){
	if(price){
		price=String(price).replace('$','');
	}
	if(old_price){
		old_price=String(old_price).replace('$','');
	}
	$('#biz_tb_price').val(price);
	$('#biz_tb_old_price').val(old_price);
}
function set_item_mp3_edit(item){
	$("#biz_div_mp3_track").hide();
	$("#biz_btn_remove_mp3").hide();
	$("#biz_page_mp3_url").val(item.mp3_url?item.mp3_url:"");
	$("#biz_page_mp3filename").val(item.mp3filename?item.mp3filename:"");
	if(item.mp3filename){
		//$("#biz_div_mp3_track").show();
	$("#biz_audio_track").attr('src',item.mp3_url);
		$("#biz_btn_remove_mp3").show();
		new Plyr('#biz_audio_track');
	}

}
function bind_event_dashboard_mp3(){
	$("#biz_btn_update_mp3").click(function() {
			var obj=get_new_item($('#biz_page_data_type').val(), $('#biz_page_tbl_id').val());
			file_mp3_select(function(data){
				cloud_update(obj.data_type,obj.tbl_id,{mp3filename:data.mp3filename, mp3duration:data.mp3duration},function(data){
					set_item_mp3_edit(data.item);
					return false;
				});
			});
	});
	$("#biz_btn_remove_mp3").click(function() {
	if (confirm("Are you sure?") == true) {
		var obj=get_new_item($('#biz_page_data_type').val(), $('#biz_page_tbl_id').val());
				cloud_update(obj.data_type,obj.tbl_id,{mp3filename:'', mp3duration:''},function(data){
				set_item_mp3_edit(data.item);
				return false;
			});
		}
	});
}
function set_item_category_edit(category_list,category_val){
	if(category_list.length>0){
		var str='';
		str=str+ "<option value='' selected>Select a Value</option>";
		for(a=0;a<category_list.length;a++){
			str=str+ "<option value='"+category_list[a].title+"' selected>"+category_list[a].title+"</option>";
		}
		$('#biz_sel_category').html(str);
	}
	if(category_val){
		$('#biz_sel_category').val(category_val);
	}else{
		$('#biz_sel_category').val();
	}
}
function set_item_in_app_product_edit(app_store_product,app_store_product_id){
	if(app_store_product=='true'){
		$('#biz_sel_app_store_product').val('true');
		$('#biz_div_app_store_product_id').show();
		$('#biz_tb_app_store_product_id').val(app_store_product_id);
	}else{
		$('#biz_div_app_store_product_id').hide();
		$('#biz_sel_app_store_product').val('false');
	}
	$('#biz_sel_app_store_product').on('change', function (e) {
		var optionSelected = $(this).find("option:selected");
		var valueSelected  = optionSelected.val();
		if(valueSelected=='true'){
			$('#biz_div_app_store_product_id').show();
		}
	});
}
function set_item_country_edit(country){
	var str='';
	$.get('../../data/countries.txt', function(item_list) {
		var item_list = item_list.split('\n');
		var str="<option value=''>Select a Value</option>";
		for(var a=0;a<item_list.length;a++){
			str=str+ "<option value='"+item_list[a]+"'>"+item_list[a] + "</option>";
		}
		$('#biz_sel_country').html(str);
		if(country&&country.length>0){
			$('#biz_sel_country').val(country);
		}
	});
}
function set_item_state_edit(state){
	var str='';
	$.get('../../data/states.txt', function(item_list) {
		var item_list = item_list.split('\n').sort();
		var str="<option value=''>Select a Value</option>";
		for(var a=0;a<item_list.length;a++){
			str=str+ "<option value='"+item_list[a]+"'>"+item_list[a] + "</option>";
		}
		$('#biz_sel_state').html(str);
		if(state&&state.length>0){
			$('#biz_sel_state').val(state);
		}
	});
}
// EDITOR PROCCESSING START --
var sun_editor=null;
function get_item_note(){
	return sun_editor.getContents()
}
function set_item_note(_str){
	if(!_str){
		_str='';
	}
	if( $('#biz_tb_note').length ){
		if(!sun_editor){
			sun_editor = SUNEDITOR.create('biz_tb_note',{ toolbarContainer : '#toolbar_container',
				showPathLabel : false,
				charCounter : true,
				width : 'auto',
				height : 'auto',
				minHeight : '100px',
				minWidth : '250px',
				buttonList : [
					['undo','redo','font','fontSize','formatBlock'],
					['bold','underline','italic','strike','removeFormat'],
					['fontColor','hiliteColor','outdent','indent','align','horizontalRule','list'],
					['link','image','video','fullScreen','showBlocks']
				]});
			sun_editor.setContents(_str);
		}
	}
}
// EDITOR PROCCESSING END --
// ITEM EDIT END //

// TEST START //
//9_test
function get_test_item(data_type){
	item=get_new_item(data_type,0);
	item.title='title_'+get_id(999);
	item.sub_note='sub_note_'+get_id(999);
	item.author='author_'+get_id(999);
	item.note='note_'+get_id(999);
	item.visible='true';
	item.price='9.'+get_id(99);
	item.old_price='19.'+get_id(99);
	item.city='city'+get_id(999);
	item.state='California';
	item.country='United States';
	item.youtube_url="https://youtu.be/5YCWlMSM3vI?si=ic3GjnYRB4HZSgV8";
	item.pdf_link='https://bappz.s3.us-east-2.amazonaws.com/2003+Kiwi_KiwiToo+Travel+Trailers.pdf';
	item.mp3filename='sample-3s.mp3';
	item.visible='true';
	return item;
}
// TEST END //
