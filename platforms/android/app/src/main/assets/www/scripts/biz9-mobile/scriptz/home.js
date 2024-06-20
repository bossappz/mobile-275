//9_home
function set_page_home(data){
    hide_bind_cards();
    bind_cards(data);
    hide_page_spinner();
    set_notification_subscribe(NOTIFICATION_SUBSCRIBE_ALL);
    function hide_bind_cards(){
        $(".biz_lbl_banner_card").hide();
        $("#biz_lbl_image_card").hide();
        $("#biz_lbl_popular_category_full_card").hide();
        $("#biz_lbl_double_card").hide();
        $("#biz_lbl_category_card").hide();
        $("#biz_lbl_buy_card").hide();
        $("#biz_lbl_card_datetime").hide();
    }
    function bind_cards(data){
        if(data.home.card_image_visible=='true'){
            bind_image_card(data);
        }
        if(data.home.card_buy_visible=='true'){
            bind_buy_card(data);
        }
        if(data.home.card_banner_visible=='true'){
            bind_banner_card(data);
        }
        if(data.home.card_popular_visible=='true'){
            bind_popular_card(data);
        }
        if(data.home.card_category_visible=='true'){
            bind_category_card(data);
        }
        if(data.home.card_double_visible=='true'){
            bind_double_card(data);
        }
    }
    function bind_double_card(data){
        $("#biz_lbl_double_card").show();
        $('#biz_lbl_double_title').html(data.home.page_double.title);
        $('#biz_lbl_double_slide_show_list').html(bind_double_slide_show_list_str(data.home.card_double_data_type,data.card_double_list));
        init_double_slide_show('#slider_double');
    }
    function bind_buy_card(data){
        $("#biz_lbl_buy_card").show();
        $('#biz_lbl_buy_title').html(data.home.card_buy_title);
        $('#biz_lbl_buy_sub_title').html(data.home.card_buy_sub_title);
        if(data.home.card_buy_data_type==DT_SERVICE){
            $('#biz_lbl_card_datetime').show();
        }
        var str='';
        for(var a=0;a<data.card_buy_list.length;a++){
            if(!data.card_buy_list[a].sub_note){
                data.card_buy_list[a].sub_note='';
            }
            str=str+"<div class='splide__slide'>"+
                "<a href='"+get_item_link(data.card_buy_list[a].data_type).detail_url+"?tbl_id="+data.card_buy_list[a].tbl_id+"'><img src='"+data.card_buy_list[a].photo_obj.square_mid_url+"' class='mx-auto biz_slide_image'></a>"+
                "<h4 class='font-600 text-center pt-2'>"+data.card_buy_list[a].title+"</h4>";

                if(data.card_buy_list[a].mp3filename){
                str = str+"<div class='text-center pt-1 mb-1'>"+
                    "<audio id='biz_audio_track_"+data.card_buy_list[a].tbl_id+"' src='"+data.card_buy_list[a].mp3_url+"' controls>"+
                        "<source  type='audio/mp3' />"+
                    "</audio>"+
                "</div>  <script> new Plyr('#biz_audio_track_"+data.card_buy_list[a].tbl_id+"');</script>";
                }
               str = str+ "<p class='text-center pt-1 mb-1'>";
            for(b=0;b<parseInt(data.card_buy_list[a].rating_avg);b++){
                str = str+"<i class='fa fa-star color-yellow-dark'></i>";
            }
            str = str+"</p>";
            if(data.card_buy_list[a].event_obj){
                str=str+ "<div style='text-align:center'><b>"+data.card_buy_list[a].event_obj.start_date+"</b></div>";
            }
            str = str+"<p class='mb-0 ps-2 font-12 pt-0 text-center'>"+truncate_str(data.card_buy_list[a].sub_note,250)+"</p>"+
                "<div class='row mb-0 px-3'>"+
                "<div class='col-6'>"+
                "<h3 class='font-18'>"+data.card_buy_list[a].money_obj.price+"</h3>";
            if(data.card_buy_list[a].money_obj.old_price && data.card_buy_list[a].money_obj.old_price!= '$0.00'){
                str = str+ "<p class='mt-n2 opacity-30 font-12'><del>"+data.card_buy_list[a].money_obj.old_price+"</del></p>";
            }
            str = str+"</div>"+
                "<div class='col-6'>"+
                set_buy_view_like_str(data.card_buy_list[a])+
                set_view_visible_str(data.card_buy_list[a])+
                "</div>"+
                "</div>"+
                "<span class='biz_sp_buy'><a id='biz_btn_cart_add_"+data.card_buy_list[a].tbl_id+"' tbl_id='"+data.card_buy_list[a].tbl_id+"'  data_type='"+data.card_buy_list[a].data_type+"' href='#' class='btn btn-sm btn-full " +data.mobile.primary.button_color + " font-700 btn-margins rounded-sm mt-3 shadow-xl biz_btn_buy_now_button biz_btn'>Add To Cart</a></span>"; if(data.card_buy_list[a].app_store_product=='true'){
                    str = str+"<span class='biz_sp_checkout'><a href='#' biz_product_id='"+data.card_buy_list[a].app_store_product_id+"' class='biz_btn_checkout btn btn-sm btn-full " +data.mobile.primary.button_color + " font-700 btn-margins rounded-sm mt-1 shadow-xl biz_btn'>Buy Now With 1-Click</a></span>";
                }
            str = str+"</div>";
        }
        $('#biz_lbl_buy_slide_show_list').html('');
        $('#biz_lbl_buy_slide_show_list').html(str);
        init_slide_show('#slider_buy');
        bind_one_click_buy();
        bind_event_detail_list_like();
        $(".biz_btn_buy_now_button").click(function() {
            var valid=true;
            var obj={};
            tbl_id=$(this).attr('tbl_id');
            data_type=$(this).attr('data_type');
            if(data_type==DT_SERVICE){
                obj.start_date=$('#biz_tb_date').val();
                obj.start_time=$('#biz_tb_time').val();
                if(!obj.start_time){
                    show_toast_error('Please select a time');
                    valid=false;
                }else if(!obj.start_date){
                    show_toast_error('Please select a date');
                    valid=false;
                }
            }
            if(valid){
                $(this).addClass("bg-click");
                $(this).html("Added to Cart!");
                cloud_order_cart_add(data_type,tbl_id,obj,1,function(data){
                });
            }
            return false;
        });
    }
    function set_view_visible_str(data){
        var str = '';
        var status='';
        switch(data.data_type) {
            case DT_EVENT:
                status=data.visible_obj.event_status;
                break;
            case DT_PRODUCT:
                status=data.visible_obj.product_status;
                break;
            default:
                status='';
                break;
        }
        if(String(data.visible)=='0'){
            str="<span class='color-red-dark font-12 mt-n2 text-end d-block'>"+status+"</span>";
        }else{
            str="<span class='color-green-dark font-12 mt-n2 text-end d-block'>"+status+"</span>";
        }
        return str;
    }
}
function bind_category_card(data){
    $('#biz_lbl_title_category').html(data.home.page_category.title);
    $("#biz_lbl_popular_category_full_card").show();
    $("#biz_lbl_category_card").show();
    $('#biz_lbl_category_list').html('');
    $('#biz_lbl_category_list').html(get_category_list_str(data.mobile.primary.button_color,data.card_category_list));
}
function bind_popular_card(data){
    var str='';
    var item_list=filter_visible_list(data.card_popular_list);
    $("#biz_lbl_popular_category_full_card").show();
    $("#biz_lbl_popular_title").html(data.home.page_popular.title);
    $('#biz_lbl_popular_list').html('');
    $('#biz_lbl_popular_list').html(get_item_detail_list_str(item_list));
    bind_event_detail_list_like();
}
function bind_image_card(data){
    $("#biz_lbl_image_card").show();
    $("#biz_lbl_image_card").css("background-image", "url(" + data.home.photo_obj.mid_url + ")");
    $("#biz_lbl_image_header").html(data.home.card_image_header);
    $("#biz_lbl_image_sub_note").html(data.home.card_image_sub_note);
}
function bind_banner_card(data){
    color=0;
    var str='';
    var item_list=filter_visible_list(data.card_banner_list);
    $(".biz_lbl_banner_card").show();
    for(var a=0;a<item_list.length;a++){
        str=str+"<div class='splide__slide'>"+
            "<div style='background-color:transparent; height:180px; background-position:center center !important; background-size:contain; background-repeat:no-repeat; background-image: url("+item_list[a].photo_obj.mid_url+")' class='card card-style'>"+
            "<div class='card-top'>"+
            "<span class='badge "+get_button_color(data.mobile.primary.button_color)+" px-2 py-1 ms-2 mt-2 font-12'>"+ item_list[a].category+"</span>"+
            "</div>"+
            "<div class='card-bottom'>"+
            "<a href='"+get_item_link(item_list[a].data_type).detail_url+"&tbl_id="+item_list[a].tbl_id+"'><h4 class='font-600 color-white px-3 mb-3'>"+ item_list[a].title+"</h4></a>"+
            "</div>"+
            "<div class='card-overlay bg-gradient'></div>"+
            "</div>"+
            "</div>";
    }
    $('#biz_lbl_banner_slide_show_list').html('');
    $('#biz_lbl_banner_slide_show_list').html(str);
    init_slide_show('#slider_banner');
}
//9_dashboard_home 9_menu_home 9_home 9_splash 9_edit
function set_dashboard_home_edit(data){
	hide_page_footer();
    hide_page_cart_top();
	bind_page_home_id(data.home);
	bind_detail(data);
	bind_banner(data);
	bind_image(data);
	bind_popular(data);
	bind_category(data);
	bind_buy(data);
	bind_double(data);
	bind_event(data);
	init_form();
	init_tab();
	hide_page_spinner();
	function bind_page_home_id(data){
        $('#biz_page_data_type').val(data.data_type);
        $('#biz_page_tbl_id').val(data.tbl_id)
    }
	function bind_detail(data){
		set_page_title('Dashboard');
		set_page_sub_title('Edit Home');
	}
	function bind_event(data){
		$("#biz_btn_update").click(function() {
			var obj=get_new_item($('#biz_page_data_type').val(), $('#biz_page_tbl_id').val());
			obj.card_banner_visible=$('#biz_sel_banner_visible').val();
			obj.card_banner_data_type=$('#biz_sel_banner_data_type').val();
			obj.card_banner_order=$('#biz_sel_banner_order').val();
			obj.card_banner_category=$('#biz_sel_banner_category').val();

			obj.card_popular_visible=$('#biz_sel_popular_visible').val();
			obj.card_popular_data_type=$('#biz_sel_popular_data_type').val();
			obj.card_popular_order=$('#biz_sel_popular_order').val();

			obj.card_category_visible=$('#biz_sel_category_visible').val();
			obj.card_category_data_type=$('#biz_sel_category_data_type').val();

			obj.card_buy_visible=$('#biz_sel_buy_visible').val();
			obj.card_buy_data_type=$('#biz_sel_buy_data_type').val();
			obj.card_buy_title=$('#biz_tb_buy_title').val();

			obj.card_buy_category=$('#biz_sel_buy_category').val();
			obj.card_double_visible=$('#biz_sel_double_visible').val();
			obj.card_double_data_type=$('#biz_sel_double_data_type').val();
			obj.card_double_category=$('#biz_sel_double_category').val();

			obj.card_image_visible=$('#biz_sel_image_visible').val();
			obj.card_image_header=$('#biz_tb_image_header').val();
			obj.card_image_sub_note=$('#biz_tb_image_sub_note').val();

			obj.biz_list="card_banner_visible,card_banner_data_type,card_banner_order,card_banner_category,card_popular_visible,card_popular_data_type,card_popular_order,card_category_visible,card_category_data_type,card_buy_visible,card_buy_data_type,card_buy_title,card_buy_category,card_double_visible,card_double_data_type,card_double_category,card_image_visible,card_image_header,card_image_sub_note";
			cloud_update_biz(obj.data_type,obj.tbl_id,obj,function(data){
				show_toast_update();
			});
		});
	}
	function bind_double(data){
		$("#biz_sel_double_visible").val(data.home.card_double_visible);
		bind_double_types(data);
		bind_double_events();
		function show_double_fields(){
			$("#biz_div_double_data_type").show();
			$("#biz_div_double_category").show();
			$("#biz_div_double_title").show();
		}
		function hide_double_fields(){
			$("#biz_div_double_data_type").hide();
			$("#biz_div_double_category").hide();
			$("#biz_div_double_title").hide();
		}
		function bind_double_types(data){
			if(data.home.card_double_visible=='true'){
				show_double_fields();
			}else{
				hide_double_fields();
			}
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				if(data.data_type_list[a].value!=DT_BLOG_POST && data.data_type_list[a].value!=DT_GALLERY ){
					str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
				}
			}
			$("#biz_sel_double_data_type").html(str);
			$("#biz_sel_double_data_type").val(data.home.card_double_data_type);
			if(data.home.card_double_visible=='true'){
				bind_double_category(data.home.card_double_category);
			}
		}
		function bind_double_events(){
			$("#biz_sel_double_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					show_double_fields();
					$("select#biz_sel_double_data_type")[0].selectedIndex = 0;
					$("#biz_sel_double_category").html('');
					str="<option value='all'>All</option>";
					$("#biz_sel_double_category").html(str);
				}else{
					hide_double_fields();
				}
			});
			$("#biz_sel_double_data_type").change(function() {
				category=$(this).val();
				bind_double_category();
			});
		}
		function bind_double_category(sel_title){
			data_type=$('#biz_sel_double_data_type').val();
			url = "category/list/"+data_type;
			cloud_get_url(get_cloud_url(url,[]),{},function(data){
				var str='';
				str=str+ "<option value='all'>All</option>";
				for(a=0;a<data.category_list.length;a++){
					str=str+ "<option value='"+data.category_list[a].title+"'>"+data.category_list[a].title + "</option>";
				}
				$("#biz_sel_double_category").html('');
				$("#biz_sel_double_category").html(str);
				$("#biz_div_double_category").show();
				if(sel_title){
					$("#biz_sel_double_category").val(sel_title);
				}else{
					$("select#biz_sel_double_category")[0].selectedIndex = 0;
				}
			});
		}
	}
	function bind_image(data){
		$("#biz_sel_image_visible").val(data.home.card_image_visible);
		bind_image_types(data);
		bind_image_events();
		function hide_image_fields(){
			$("#biz_div_card_image_image").hide();
			$("#biz_div_card_image_header").hide();
			$("#biz_div_card_image_sub_note").hide();
		}
		function show_image_fields(){
			$("#biz_div_card_image_image").show();
			$("#biz_div_card_image_header").show();
			$("#biz_div_card_image_sub_note").show();
		}
		function bind_image_types(data){
			if(data.home.card_image_visible=='true'){
				show_image_fields();
			}else{
				hide_image_fields();
			}
			$('#biz_home_img').attr('src',data.home.photo_obj.square_mid_url);
			$('#biz_tb_image_header').val(data.home.card_image_header);
			$('#biz_tb_image_sub_note').val(data.home.card_image_sub_note);
		}
		function bind_image_events(){
			$("#biz_sel_image_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					show_image_fields();
				}else{
					hide_image_fields();
				}
			});
			$("#biz_home_img").click(function() {
				tbl_id= $('#biz_page_tbl_id').val();
				data_type= $('#biz_page_data_type').val();
				camera_photo_select(function(data){
					cloud_update(data_type,tbl_id,{photofilename:data.photofilename},function(data){
						$('#biz_home_img').attr('src',data.item.photo_obj.square_mid_url);
						return false;
					});
				});
			});
		}
	}
	function bind_buy(data){
		$("#biz_sel_buy_visible").val(data.home.card_buy_visible);
		$("#biz_tb_buy_title").val(data.home.card_buy_title);
		bind_buy_types(data);
		bind_buy_events();
		function hide_buy_fields(){
			$("#biz_div_buy_visible").show();
			$("#biz_div_buy_data_type").hide();
			$("#biz_div_buy_title").hide();
			$("#biz_div_buy_category").hide();
		}
		function show_buy_fields(){
			$("#biz_div_buy_visible").show();
			$("#biz_div_buy_data_type").show();
			$("#biz_div_buy_title").show();
			$("#biz_div_buy_category").show();
		}
		function bind_buy_types(data){
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				if( data.data_type_list[a].value!= DT_GALLERY && data.data_type_list[a].value!= DT_BLOG_POST){
					str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
				}
			}
			$("#biz_sel_buy_category").html('');
			$("#biz_sel_buy_data_type").html('');
			$("#biz_sel_buy_data_type").html(str);
			$("#biz_sel_buy_data_type").val(data.home.card_buy_data_type);
			if(data.home.card_buy_visible=='true'){
				bind_buy_category(data.home.card_buy_category);
			}else{
				hide_buy_fields();
				$("select#biz_sel_buy_data_type")[0].selectedIndex = 0;
				var str= "<option value='all'>All</option>";
				$("#biz_sel_buy_category").html(str);
				$("select#biz_sel_buy_category")[0].selectedIndex = 0;
			}
		}
		function bind_buy_events(){
			$("#biz_sel_buy_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					show_buy_fields();
				}else{
					hide_buy_fields();
				}
			});
			$("#biz_sel_buy_data_type").change(function() {
				category=$(this).val();
				bind_buy_category();
			});
		}
		function bind_buy_category(sel_title){
			data_type=$('#biz_sel_buy_data_type').val();
			url = "category/list/"+data_type;
			cloud_get_url(get_cloud_url(url,[]),{},function(data){
				var str='';
				str= "<option value='all'>All</option>";
				for(a=0;a<data.category_list.length;a++){
					str=str+ "<option value='"+data.category_list[a].title+"'>"+data.category_list[a].title + "</option>";
				}
				$("#biz_sel_buy_category").html('');
				$("#biz_sel_buy_category").html(str);
				$("#biz_div_buy_category").show();
				if(sel_title){
					$("#biz_sel_buy_category").val(sel_title).attr("selected", "selected");
				}else{
					$("#biz_sel_buy_category").val('all').attr("selected", "selected");
				}
			});
		}
	}
	function bind_category(data){
		$("#biz_sel_category_visible").val(data.home.card_category_visible);
		bind_category_types(data);
		bind_category_events();
		function hide_category_fields(){
			$("#biz_div_category_data_type").hide();
			$("#biz_div_category_title").hide();
		}
		function show_category_fields(){
			$("#biz_div_category_data_type").show();
			$("#biz_div_category_title").show();
		}
		function bind_category_types(data){
			if(data.home.card_category_visible=='true'){
				show_category_fields();
			}else{
				hide_category_fields();
			}
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
			}
			$("#biz_sel_category_data_type").html(str);
			$("#biz_sel_category_data_type").val(data.home.card_category_data_type);
		}
		function bind_category_events(){
			$("#biz_sel_category_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					show_category_fields();
					$("select#biz_sel_category_data_type")[0].selectedIndex = 0;
				}else{
					hide_category_fields();
				}
			});
		}
	}
	function bind_popular(data){
		$("#biz_sel_popular_visible").val(data.home.card_popular_visible);
		bind_popular_types(data);
		bind_popular_events();
		function hide_popular_fields(){
			$("#biz_div_popular_data_type").hide();
			$("#biz_div_popular_order").hide();
			$("#biz_div_popular_title").hide();
		}
		function show_popular_fields(){
			$("#biz_div_popular_data_type").show();
			$("#biz_div_popular_order").show();
			$("#biz_div_popular_title").show();
		}
		function bind_popular_types(data){
			if(data.home.card_popular_visible=='true'){
				show_popular_fields();
			}else{
				hide_popular_fields();
			}
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
			}
			$("#biz_sel_popular_data_type").html('');
			$("#biz_sel_popular_data_type").html(str);
			$("#biz_sel_popular_data_type").val(data.home.card_popular_data_type);
		}
		function bind_popular_events(){
			$("#biz_sel_popular_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					$("#biz_div_popular_data_type").show();
					$("#biz_div_popular_order").show();
					$("select#biz_sel_popular_data_type")[0].selectedIndex = 0;
					$("select#biz_sel_popular_order")[0].selectedIndex = 0;
				}else{
					hide_popular_fields();
				}
			});
		}
	}
	function bind_banner(data){
		$("#biz_sel_banner_visible").val(data.home.card_banner_visible);
		bind_banner_types(data);
		bind_banner_events();
		function bind_banner_types(data){
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
			}

			$("#biz_sel_banner_category").html('');
			$("#biz_sel_banner_data_type").html('');
			$("#biz_sel_banner_data_type").html(str);
			$("#biz_sel_banner_data_type").val(data.home.card_banner_data_type);
			if(data.home.card_banner_visible=='true'){
				if(data.home.card_banner_data_type){
					$("#biz_div_banner_data_type").show();
					$("#biz_div_banner_order").show();
					$("#biz_sel_banner_order").val(data.home.card_banner_order);
					if(data.home.card_banner_order=='category'){
						bind_banner_category(data.home.card_banner_category);
						$("#biz_div_banner_category").show();
					}else if(data.home.card_banner_order=='all'){
						$("#biz_div_banner_category").hide();

					}
				}
			}else{
				hide_banner_fields();
			}
		}
		function hide_banner_fields(){
			$("#biz_div_banner_data_type").hide();
			$("#biz_div_banner_order").hide();
			$("#biz_div_banner_category").hide();
		}
		function bind_banner_events(){
			$("#biz_sel_banner_visible").change(function() {
				val = $(this).val();
				if(val=='false'){
					hide_banner_fields();
				}else{
					$("#biz_div_banner_data_type").show();
					$("#biz_div_banner_order").show();
					$("select#biz_sel_banner_data_type")[0].selectedIndex = 0;
					bind_banner_events();
				}
			});
			$("#biz_sel_banner_data_type").change(function() {
				$("#biz_div_banner_order").show();
				$("#biz_div_banner_category").hide();
			});
			$("#biz_sel_banner_order").change(function() {
				order_type=$(this).val();
				if(order_type=='category'){
					bind_banner_category();
				}else{
					$("#biz_div_banner_category").hide();
				}
			});
		}
		function bind_banner_category(sel_title){
			data_type=$('#biz_sel_banner_data_type').val();
			url = "category/list/"+data_type;
			cloud_get_url(get_cloud_url(url,[]),{},function(data){
				var str='';
				for(a=0;a<data.category_list.length;a++){
					str=str+ "<option value='"+data.category_list[a].title+"'>"+data.category_list[a].title + "</option>";
				}
				$("#biz_sel_banner_category").html(str);
				$("#biz_div_banner_category").show();
				if(sel_title){
					$("#biz_sel_banner_category").val(sel_title);
				}
			});
		}
	}
}

