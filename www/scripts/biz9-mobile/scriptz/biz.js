//document.addEventListener('deviceready', load_biz_app, false);
//biz
load_biz_app();
function load_biz_app(){
	const page_title=$('#biz_page_title').val();
	var url=get_biz_page_url(page_title);
	cloud_get_url(url,{customer_id:get_user().customer_id},function(biz_data){
		//$(".page-content").hide();
		//$("#page").hide();
		//w('biz_mobile_user',get_user());
		//w('biz_cloud_get_url',get_cloud_url(url));
		w('biz_cloud_get_data',biz_data);
		set_app_color(biz_data.mobile.primary.app_color,biz_data.mobile.primary.app_theme);
		set_page_title(biz_data.mobile.primary.app_title);
		set_page_init();
		//var page_data=$('#biz_page_data_type').val();
		//alert(page_data);
		set_page_footer_navigation(biz_data,$('#biz_page_footer').val());
		set_biz_page_data(page_title,biz_data);
		set_left_navigation(biz_data);
		set_page_button_color(biz_data.mobile.primary.button_color, biz_data.mobile.primary.app_color);
		set_biz_style(biz_data.mobile.primary.button_color, biz_data.mobile.primary.app_theme);
		set_pull_down();
	});
}
//9_page_count 9_like_count
//9_left_nav 9_nav
function set_left_navigation(data){
	str='';
	str=str+"<div class='text-center'>"+
		"<a href='#'><img id='biz_img_navlogo' src='"+data.mobile.left_nav.photo_obj.square_mid_url+"' class='sidebar-logo' width='85'></a>"+
		"<h1 id='biz_lbl_nav_top_header' class='text-uppercase color-white mt-3'>"+data.mobile.left_nav.left_nav_header+"</h1>"+
		"<p id='biz_lbl_nav_top_sub_note' class='font-12 color-white opacity-50 m-3'>"+data.mobile.left_nav.left_nav_sub_note+"</p>"+
		"</div>"+
		"<span class='menu-divider' id='biz_lbl_nav_header'>"+data.mobile.left_nav.left_nav_bar_title+"</span>"+
		"<div class='menu-items'>"+
		"<a href='item_dashboard_menu.html' id='biz_link_nav_dashboard'>"+
		"<i class='fa fa-screwdriver-wrench biz_btn'></i>"+
		"<span>Dashboard</span>"+
		"</a>"+
		"<a href='page_list.html' id='biz_link_nav_page'>"+
		"<i class='fa fa-"+data.mobile.left_nav.left_nav_icon_page+" biz_btn'></i>"+
		"<span>Pages</span>"+
		"</a>"+
		"<a href='about_detail.html' id='biz_link_nav_about'>"+
		"<i class='fa fa-"+data.mobile.left_nav.left_nav_icon_about+"  biz_btn'></i>"+
		"<span>About</span>"+
		"</a>"+
		"<a href='contact_detail.html' id='biz_link_nav_contact'>"+
		"<i class='fa fa-"+data.mobile.left_nav.left_nav_icon_contact+" biz_btn'></i>"+
		"<span>Contact</span>"+
		"</a>"+
		"<a href='login.html' id='biz_link_nav_login'>"+
		"<i class='fa fa-lock biz_btn'></i>"+
		"<span>Login</span>"+
		"</a>"+
		"<a href='logout.html' id='biz_link_nav_logout'>"+
		"<i class='fa fa-unlock biz_btn'></i>"+
		"<span>Logout</span>"+
		"</a>"+
		"</div>"+
		"<span class='menu-divider mt-4'  id='biz_lbl_nav_bottom'>"+data.mobile.left_nav.left_nav_bar_social+"</span>"+
		"<div class='menu-items'>"+
		"<a href='mailto:"+data.info.business_phone+"'>"+
		"<i class='fa fa-phone biz_btn'></i>"+
		"<span>Call</span>"+
		"</a>"+
		"<a href='tel:"+data.info.business_email+"'>"+
		"<i class='fa fa-envelope biz_btn'></i>"+
		"<span>Mail</span>"+
		"</a>"+
		"</div>"+
		"<span class='menu-divider mt-4' id='biz_lbl_nav_bottom'></span>"+
		"<div class='menu-items'>"+
		"<a href='item_activity_list.html?page_current=1'>"+
		"<i class='fa fa-heart biz_btn'></i>"+
		"<span>Activity</span>"+
		"</a>"+
		"</div>"+
		"<div class='divider bg-white opacity-10 mt-4'></div>"+
		"<p class='font-16  color-white opacity-20 text-center'>"+data.mobile.left_nav.left_nav_copyright+"</p>"+
		"<p class='font-12  color-white opacity-30 text-center'>sys: "+BIZ9_MOBILE_VERSION+" app: "+APP_VERSION +"<br/><a target='_blank' href='https://"+APP_VENDOR+"' style='color:white'>"+APP_VENDOR+"</a></p>";
	$("#biz_lbl_left_menu").html(str);
	user=get_user();
	//check user login
	if(!get_user().tbl_id){
		//- login
		$("#biz_link_nav_logout").hide();
		$("#biz_link_nav_login").show();
		$("#biz_link_nav_dashboard").hide();
	}
	else{
		//- log out
		$("#biz_link_nav_login").hide();
		$("#biz_link_nav_logout").show();
		$("#biz_link_nav_dashboard").show();
	}
	$("#nav-logout").click(function() {
		if (confirm("Are you sure?") == true) {
			del_user();
			window.location='index.html';
		}
	});
}
//-- INIT START -- //
function set_page_init(){
	init_cards();
	init_cart();
}

function init_cart(){
	$("#biz_btn_order_cart_top").show();
	$("#biz_btn_order_cart_top").click(function() {
		show_cart_top();
		init_stepper();
	});
}
function init_slide_show(slide_id){
	var singleSlider = document.querySelectorAll(slide_id);
	if(singleSlider.length){
		singleSlider.forEach(function(e){
			var single = new Splide( '#'+e.id, {
				type:'loop',
				autoplay:true,
				interval:4000,
				perPage: 1,
			}).mount();
			var sliderNext = document.querySelectorAll('.slider-next');
			var sliderPrev = document.querySelectorAll('.slider-prev');
			sliderNext.forEach(el => el.addEventListener('click', el => {single.go('>');}));
			sliderPrev.forEach(el => el.addEventListener('click', el => {single.go('<');}));
		});
	}
}
function init_menu_modal(){
	document.querySelectorAll('.menu').forEach(el=>{el.style.display='block'})
	var menus = document.querySelectorAll('.menu');
	menuFunction();
	function menuFunction(){
		if(menus.length){
			var menuSidebar = document.querySelectorAll('.menu-box-left, .menu-box-right');
			menuSidebar.forEach(function(e){
				if(e.getAttribute('data-menu-width') === "cover"){
					e.style.width = '100%'
				} else {
					e.style.width = (e.getAttribute('data-menu-width')) +'px'
				}
			})
			var menuSheets = document.querySelectorAll('.menu-box-bottom, .menu-box-top, .menu-box-modal');
			menuSheets.forEach(function(e){
				if(e.getAttribute('data-menu-width') === "cover"){
					e.style.width = '100%'
					e.style.height = '100%'
				} else {
					e.style.width = (e.getAttribute('data-menu-width')) +'px'
					e.style.height = (e.getAttribute('data-menu-height')) +'px'
				}
			})
			//Opening Menus
			var menuOpen = document.querySelectorAll('[data-menu]');
			var wrappers = document.querySelectorAll('.header, #footer-bar, .page-content');
			menuOpen.forEach(el => el.addEventListener('click',e =>{
				//Close Existing Opened Menus
				const activeMenu = document.querySelectorAll('.menu-active');
				for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
				//Open Clicked Menu
				var menuData = el.getAttribute('data-menu');
				document.getElementById(menuData).classList.add('menu-active');
				document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
				//Check and Apply Effects
				var menu = document.getElementById(menuData);
				var menuEffect = menu.getAttribute('data-menu-effect');
				var menuLeft = menu.classList.contains('menu-box-left');
				var menuRight = menu.classList.contains('menu-box-right');
				var menuTop = menu.classList.contains('menu-box-top');
				var menuBottom = menu.classList.contains('menu-box-bottom');
				var menuWidth = menu.offsetWidth;
				var menuHeight = menu.offsetHeight;
				if(menuEffect === "menu-push"){
					var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
					if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth+"px)"}}
					if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth+"px)"}}
					if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight+"px)"}}
					if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight+"px)"}}
				}
				if(menuEffect === "menu-parallax"){
					var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
					if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth/10+"px)"}}
					if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth/10+"px)"}}
					if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight/5+"px)"}}
					if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight/5+"px)"}}
				}
			}));
			//Closing Menus
			const menuClose = document.querySelectorAll('.close-menu, .menu-hider');
			menuClose.forEach(el => el.addEventListener('click',e =>{
				const activeMenu = document.querySelectorAll('.menu-active');
				for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
				for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+0+"px)"}
			}));
		}
	}


}
function init_double_slide_show(slide_id){
	var singleSlider = document.querySelectorAll(slide_id);
	if(singleSlider.length){
		singleSlider.forEach(function(e){
			var single = new Splide( '#'+e.id, {
				type:'loop',
				autoplay:true,
				interval:4000,
				perPage: 2,
			}).mount();
			var sliderNext = document.querySelectorAll('.slider-next');
			var sliderPrev = document.querySelectorAll('.slider-prev');
			sliderNext.forEach(el => el.addEventListener('click', el => {single.go('>');}));
			sliderPrev.forEach(el => el.addEventListener('click', el => {single.go('<');}));
		});
	}
}


function init_stepper(){
	//Stepper
	var stepperAdd = document.querySelectorAll('.stepper-add');
	var stepperSub = document.querySelectorAll('.stepper-sub');
	if(stepperAdd.length){
		stepperAdd.forEach(el => el.addEventListener('click', event => {
			var currentValue = el.parentElement.querySelector('input').value
			el.parentElement.querySelector('input').value = +currentValue + 1
		}))
		stepperSub.forEach(el => el.addEventListener('click', event => {
			var currentValue = el.parentElement.querySelector('input').value
			el.parentElement.querySelector('input').value = +currentValue - 1
		}))
	}
}
function init_form(){
	//Validator
	var inputField = document.querySelectorAll('input');
	if(inputField.length){
		var mailValidator = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
		var phoneValidator = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
		//var nameValidator = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
		var nameValidator = /^[\WA-z a-z A-Z]{10,100}$/;
		var passwordValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
		var numberValidator = /^(0|[1-9]\d*)$/;
		var linkValidator = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
		var textValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
		function valid(el){
			el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
			el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
		}
		function invalid(el){
			el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
			el.parentElement.querySelectorAll('.invalid')[0].classList.remove('disabled');
		}
		function unfilled(el){
			el.parentElement.querySelectorAll('em')[0].classList.remove('disabled');
			el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
			el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
		}
		var regularField = document.querySelectorAll('.input-style input:not([type="date"])')
		regularField.forEach(el => el.addEventListener('keyup', e => {
			if(!el.value == ""){
				el.parentElement.classList.add('input-style-active');
				el.parentElement.querySelector('em').classList.add('disabled');
			} else {
				el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
				el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
				el.parentElement.classList.remove('input-style-active');
				el.parentElement.querySelector('em').classList.remove('disabled');
			}
		}));
		var regularTextarea = document.querySelectorAll('.input-style textarea')
		regularTextarea.forEach(el => el.addEventListener('keyup', e => {
			if(!el.value == ""){
				el.parentElement.classList.add('input-style-active');
				el.parentElement.querySelector('em').classList.add('disabled');
			} else {
				el.parentElement.classList.remove('input-style-active');
				el.parentElement.querySelector('em').classList.remove('disabled');
			}
		}));
		var selectField = document.querySelectorAll('.input-style select')
		selectField.forEach(el => el.addEventListener('change', e => {
			if(el.value !== "default"){
				el.parentElement.classList.add('input-style-active');
				el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
				el.parentElement.querySelectorAll('.invalid, em, span')[0].classList.add('disabled');
			}
			if(el.value == "default"){
				el.parentElement.querySelectorAll('span, .valid, em')[0].classList.add('disabled');
				el.parentElement.querySelectorAll('.invalid')[0].classList.remove('disabled');
				el.parentElement.classList.add('input-style-active');
			}
		}));
		var dateField = document.querySelectorAll('.input-style input[type="date"]')
		dateField.forEach(el => el.addEventListener('change', e => {
			el.parentElement.classList.add('input-style-active');
			el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
			el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
		}));
		var validateField = document.querySelectorAll('.validate-field input, .validator-field textarea');
		if(validateField.length){
			validateField.forEach(el => el.addEventListener('keyup', e => {
				var getAttribute = el.getAttribute('type');
				switch(getAttribute){
					case 'name': nameValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'number': numberValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'email': mailValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'text': textValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'url': linkValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'tel': phoneValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'password': passwordValidator.test(el.value) ? valid(el) : invalid(el); break;
						break;
				}
				if(el.value === ""){unfilled(el);}
			}));
		}
		//Toasts
		var toastTrigger = document.querySelectorAll('[data-toast]');
		if(toastTrigger.length){
			toastTrigger.forEach(el => el.addEventListener('click', event => {
				var toastData = el.getAttribute('data-toast')
				var notificationToast = document.getElementById(toastData);
				var notificationToast = new bootstrap.Toast(notificationToast);
				notificationToast.show();
			}));
		}
	}
	//Dropdown
	var dropdownElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'))
	if(dropdownElementList.length){
		var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
			return new bootstrap.Dropdown(dropdownToggleEl);
		})
	}
	//Text Resizer
	var textSizeChanger = document.querySelectorAll('.text-size-changer');
	if(textSizeChanger.length){
		var textSizeIncrease = document.querySelectorAll('.text-size-increase');
		var textSizeDecrease = document.querySelectorAll('.text-size-decrease');
		var textSizeDefault = document.querySelectorAll('.text-size-default');
		textSizeIncrease[0].addEventListener('click',function(){
			textSizeChanger[0].querySelectorAll('*').forEach(function(element) {
				const getFontSize = window.getComputedStyle(element).fontSize.split("px",2)[0]
				element.style.fontSize = (+getFontSize +1) +'px';
			});
		})
		textSizeDecrease[0].addEventListener('click',function(){
			textSizeChanger[0].querySelectorAll('*').forEach(function(element) {
				const getFontSize = window.getComputedStyle(element).fontSize.split("px",2)[0]
				element.style.fontSize = (+getFontSize -1) +'px';
			});
		})
		textSizeDefault[0].addEventListener('click',function(){
			textSizeChanger[0].querySelectorAll('*').forEach(function(element) {
				const getFontSize = window.getComputedStyle(element).fontSize.split("px",2)[0]
				element.style.fontSize = "";
			});
		})
	}
}
function init_sharing(){
	//Sharing
	function shareLinks(){
		var shareCheck = document.querySelectorAll('.shareToFacebook, .shareToTwitter, .shareToLinkedIn');
		if(shareCheck.length){
			var share_link = window.location.href;
			var share_title = document.title;
			document.querySelectorAll('.shareToFacebook').forEach( x=> x.setAttribute("href", "https://www.facebook.com/sharer/sharer.php?u="+share_link));
			document.querySelectorAll('.shareToTwitter').forEach( x=> x.setAttribute("href", "https://twitter.com/share?text="+share_link));
			document.querySelectorAll('.shareToPinterest').forEach( x=> x.setAttribute("href", "https://pinterest.com/pin/create/button/?url=" + share_link));
			document.querySelectorAll('.shareToWhatsApp').forEach( x=> x.setAttribute("href", "whatsapp://send?text=" + share_link));
			document.querySelectorAll('.shareToMail').forEach( x=> x.setAttribute("href", "mailto:?body=" + share_link));
			document.querySelectorAll('.shareToLinkedIn').forEach( x=> x.setAttribute("href", "https://www.linkedin.com/shareArticle?mini=true&url="+share_link+"&title="+share_title+"&summary=&source="));
		}
	}
}
function init_contact_page(){
	//Contact Form
	var contactForm = document.querySelectorAll('.contact-form');
	function contactFunction(){
		if(contactForm){
			var form = document.getElementById('contactForm');
			if(form){
				form.onsubmit = function (e) {
					// Stop the regular form submission
					e.preventDefault();
					//Validate Fields
					var nameField = document.getElementById('contactNameField');
					var mailField = document.getElementById('contactEmailField');
					var textField = document.getElementById('contactMessageTextarea');
					var validateMail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if(nameField.value === ''){
						form.setAttribute('data-form','invalid');
						nameField.classList.add('border-red-dark');
						document.getElementById('validator-name').classList.remove('disabled');
					} else {
						form.setAttribute('data-form','valid');
						document.getElementById('validator-name').classList.add('disabled');
						nameField.classList.remove('border-red-dark');
					}
					if(mailField.value === ''){
						form.setAttribute('data-form','invalid');
						mailField.classList.add('border-red-dark');
						document.getElementById('validator-mail1').classList.remove('disabled');
					} else {
						document.getElementById('validator-mail1').classList.add('disabled');
						if(!validateMail.test(mailField.value)){
							form.setAttribute('data-form','invalid');
							mailField.classList.add('border-red-dark');
							document.getElementById('validator-mail2').classList.remove('disabled');
						} else{
							form.setAttribute('data-form','valid');
							document.getElementById('validator-mail2').classList.add('disabled');
							mailField.classList.remove('border-red-dark');
						}
					}
					if(textField.value === ''){
						form.setAttribute('data-form','invalid');
						textField.classList.add('border-red-dark');
						document.getElementById('validator-text').classList.remove('disabled');
					} else{
						form.setAttribute('data-form','valid');
						document.getElementById('validator-text').classList.add('disabled');
						textField.classList.remove('border-red-dark')
					}

					if(form.getAttribute('data-form') === 'valid'){
						document.querySelectorAll('.form-sent')[0].classList.remove('disabled');
						document.querySelectorAll('.contact-form')[0].classList.add('disabled');
						// Collect the form data while iterating over the inputs
						var data = {};
						for (let i = 0, ii = form.length; i < ii; ++i) {
							let input = form[i];
							if (input.name) {
								data[input.name] = input.value;
							}
						}
						// Construct an HTTP request
						var xhr = new XMLHttpRequest();
						xhr.open(form.method, form.action, true);
						xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
						xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
						// Send the collected data as JSON
						xhr.send(JSON.stringify(data));
						// Callback function
						xhr.onloadend = function (response) {if (response.target.status === 200) {console.log('Form Submitted')}};
					}
				};
			}
		}
	}
}
function init_tab(){
	//Tabs
	var tabTrigger = document.querySelectorAll('.tab-controls a');
	if(tabTrigger.length){
		tabTrigger.forEach(function(e){
			if(e.hasAttribute('data-active')){
				var highlightColor = e.parentNode.getAttribute('data-highlight');
				e.classList.add(highlightColor);
				e.classList.add('no-click');
			}
		});
		tabTrigger.forEach(el => el.addEventListener('click',e =>{
			var highlightColor = el.parentNode.getAttribute('data-highlight');
			var tabParentGroup = el.parentNode.querySelectorAll('a');
			tabParentGroup.forEach(function(e){
				e.classList.remove(highlightColor);
				e.classList.remove('no-click');
			});
			el.classList.add(highlightColor);
			el.classList.add('no-click');
		}));
	}
}
function init_cards(){
	//Card Extender
	const cards = document.getElementsByClassName('card');
	function card_extender(){
		var headerHeight, footerHeight, headerOnPage;
		var headerOnPage = document.querySelectorAll('.header:not(.header-transparent)')[0];
		var footerOnPage = document.querySelectorAll('#footer-bar')[0];
		headerOnPage ? headerHeight = document.querySelectorAll('.header')[0].offsetHeight : headerHeight = 0
		footerOnPage ? footerHeight = document.querySelectorAll('#footer-bar')[0].offsetHeight : footerHeight = 0
		for (let i = 0; i < cards.length; i++) {
			if(cards[i].getAttribute('data-card-height') === "cover"){
				if (window.matchMedia('(display-mode: fullscreen)').matches) {var windowHeight = window.outerHeight;}
				if (!window.matchMedia('(display-mode: fullscreen)').matches) {var windowHeight = window.innerHeight;}
				//Fix for iOS 15 pages with data-height="cover"
				var coverHeight = windowHeight + 'px';
				// - Remove this for iOS 14 issues - var coverHeight = windowHeight - headerHeight - footerHeight + 'px';
			}
			if(cards[i].getAttribute('data-card-height') === "cover-boxed"){
				if (window.matchMedia('(display-mode: fullscreen)').matches) {var windowHeight = window.outerHeight;}
				if (!window.matchMedia('(display-mode: fullscreen)').matches) {var windowHeight = window.innerHeight;}
				var coverHeightBoxed = windowHeight - headerHeight - footerHeight - 40 + 'px';
			}
			if(cards[i].hasAttribute('data-card-height')){
				var getHeight = cards[i].getAttribute('data-card-height');
				cards[i].style.height= getHeight +'px';
				if(getHeight === "cover"){
					var totalHeight = getHeight
					cards[i].style.height =  coverHeight
				}
				if(getHeight === "cover-full"){
					var totalHeight = getHeight
					cards[i].style.height =  "100%"
				}
				if(getHeight === "cover-boxed"){
					var totalHeight = getHeight
					cards[i].style.height =  coverHeightBoxed
				}
			}
		}
	}
	if(cards.length){
		card_extender();
		window.addEventListener("resize", card_extender);
	}
	//Card Effects
	const cardScale = document.querySelectorAll('.card-scale');
	if(cardScale.length){
		cardScale.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-scale-image');}));
		cardScale.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-scale-image');}));
	}
	const cardHide = document.querySelectorAll('.card-hide');
	if(cardHide.length){
		cardHide.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('.card-center, .card-bottom, .card-top, .card-overlay')[0].classList.add('card-hide-image');}));
		cardHide.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('.card-center, .card-bottom, .card-top, .card-overlay')[0].classList.remove('card-hide-image');}));
	}
	const cardRotate = document.querySelectorAll('.card-rotate');
	if(cardRotate.length){
		cardRotate.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-rotate-image');}));
		cardRotate.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-rotate-image');}));
	}
	const cardGray = document.querySelectorAll('.card-grayscale');
	if (cardGray.length){
		cardGray.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-grayscale-image');}));
		cardGray.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-grayscale-image');}));
	}
	const cardBlur = document.querySelectorAll('.card-blur');
	if(cardBlur.length){
		cardBlur.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-blur-image');}));
		cardBlur.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-blur-image');}));
	}
}
function init_plugin(){
	//Lazy Loading
	var lazyLoad = new LazyLoad();
	// Check Documentation folder for detailed explanations on
	// Externally loading Javascript files for better performance.
	var plugIdent, plugClass, plugMain, plugCall;
	var plugLoc = "plugins/"
	let plugins = [
		{
			id: 'uniqueID', // to detect if loaded and unload if needed
			plug: 'pluginName/plugin.js', // the main plugin javascript file
			call: 'pluginName/pluginName-call.js', // the plugin call functions
			style: 'pluginName/pluginName-style.css', // the plugin stylesheet
			trigger: '.pluginTriggerClass' // the trigger that will activate the loading and initializing of the plugin
		},
		/*
		  {
			id: 'chart',
			plug: 'charts/charts.js',
			call: 'charts/charts-call-charts.js',
			trigger: '.chart'
		  },
		  {
			id: 'chart',
			plug: 'charts/charts.js',
			call: 'charts/charts-call-wallet.js',
			trigger: '.wallet-chart'
		  },
		  {
			id: 'graph',
			plug: 'charts/charts.js',
			call: 'charts/charts-call-graphs.js',
			trigger: '.graph'
		  },
		  {
			id: 'count',
			plug: 'countdown/countdown.js',
			trigger: '.countdown'
		  },
		  */
		{
			id: 'gallery',
			plug: 'glightbox/glightbox.js',
			call: 'glightbox/glightbox-call.js',
			style: 'glightbox/glightbox.css',
			trigger: '[data-gallery]'
		},
		{
			id: 'gallery-views',
			plug: 'galleryViews/gallery-views.js',
			trigger: '.gallery-view-controls'
		},
		{
			id: 'filter',
			plug: 'filterizr/filterizr.js',
			call: 'filterizr/filterizr-call.js',
			style: 'filterizr/filterizr.css',
			trigger: '.gallery-filter'
		}
	];
	for (let i = 0; i < plugins.length; i++) {
		//Remove Previous Calls
		if(document.querySelectorAll('.'+plugins[i].id+'-c').length){document.querySelectorAll('.'+plugins[i].id+'-c')[0].remove();                }
		//Load Plugins
		var plugTrigger = document.querySelectorAll(plugins[i].trigger)
		if(plugTrigger.length){
			var loadScript = document.getElementsByTagName('script')[1],
				loadScriptJS = document.createElement('script');
			loadScriptJS.type = 'text/javascript'
			loadScriptJS.className = plugins[i].id+'-p'
			loadScriptJS.src = plugLoc + plugins[i].plug
			loadScriptJS.addEventListener('load',function(){
				//Once plugin is loaded, load the call.
				if(plugins[i].call !== undefined){
					var callFn = document.getElementsByTagName('script')[2],
						callJS = document.createElement('script');
					callJS.type = 'text/javascript'
					callJS.className = plugins[i].id+'-c'
					callJS.src =  plugLoc + plugins[i].call
					callFn.parentNode.insertBefore(callJS, callFn);
				}
			});
			//If plugin doesn't exist, load it
			if(!document.querySelectorAll('.'+plugins[i].id+'-p').length){
				loadScript.parentNode.insertBefore(loadScriptJS, loadScript);
			} else {
				//If plugin doesn't exist, only load the call function
				setTimeout(function(){
					var loadScript = document.getElementsByTagName('script')[1],
						loadScriptJS = document.createElement('script');
					loadScriptJS.type = 'text/javascript'
					loadScriptJS.className = plugins[i].id+'-c'
					loadScriptJS.src = plugLoc + plugins[i].call;
					loadScript.parentNode.insertBefore(loadScriptJS, loadScript);
				},50);
			}
			//If Style doesn't exist in array, don't do anything
			if(plugins[i].style !== undefined){
				//if style already exists, don't re-add to page.
				if(!document.querySelectorAll('.'+plugins[i].id+'-s').length){
					var loadCSS = document.createElement("link");
					loadCSS.className = plugins[i].id+'-s';
					loadCSS.rel = "stylesheet";
					loadCSS.type = "text/css";
					loadCSS.href = plugLoc + plugins[i].style;
					document.getElementsByTagName("head")[0].appendChild(loadCSS);
				}
			}
		}
	}
}
//-- INIT END -- //
function set_page_note_remove(num){
	if(num<=1){
		num='0';
	}else{
		num = String(num-1);
	}
	return "("+num + " items"+")";
}
function set_biz_page_data(biz_page_title,data){
	switch(biz_page_title) {
		case 'about_detail':
			set_page_about_detail(data);
			break;
		case 'about_dashboard_edit':
			set_dashboard_about_edit(data);
			break;
		case 'item_home':
			set_page_item_home(data);
			break;
		case 'blog_post_detail':
			set_page_blog_post_detail(data);
			break;
		case 'blog_post_dashboard_edit':
			set_dashboard_blog_post_edit(data);
			break;
		case 'category_dashboard_edit':
			set_dashboard_category_edit(data);
			break;
		case 'contact_detail':
			set_page_contact_detail(data);
			break;
		case 'contact_dashboard_edit':
			set_dashboard_contact_edit(data);
			break;
		case 'event_detail':
			set_page_event_detail(data);
			break;
		case 'event_dashboard_edit':
			set_dashboard_event_edit(data);
			break;
		case 'gallery_detail':
			set_page_gallery_detail(data);
			break;
		case 'gallery_dashboard_edit':
			set_dashboard_gallery_edit(data);
			break;
		case 'game_dashboard_edit':
			set_dashboard_game_edit(data);
			break;
		case 'home_detail':
			set_page_home(data);
			break;
		case 'home_dashboard_edit':
			set_dashboard_home_edit(data);
			break;
		case 'item_activity_list':
			set_page_activity_list(data);
			break;
		case 'item_dashboard_menu':
			set_dashboard_menu(data);
			break;
		case 'item_dashboard_list':
			set_dashboard_item_list(data);
			break;
		case 'item_dashboard_list_edit':
			set_dashboard_item_list_edit(data);
			break;
		case 'item_dashboard_photo_list':
			set_dashboard_photo_list(data);
			break;
		case 'item_dashboard_photo_edit':
			set_dashboard_photo_edit(data);
			break;
		case 'item_dashboard_sub_item_list':
			set_dashboard_sub_item_list(data);
			break;
		case 'item_dashboard_sub_item_edit':
			set_dashboard_sub_item_edit(data);
			break;
		case 'item_list':
			set_page_item_list(data);
			break;
		case 'member_home':
			set_page_member_home(data);
			break;
		case 'member_detail':
			set_page_member_detail(data);
			break;
		case 'member_dashboard_edit':
			set_dashboard_member_edit(data);
			break;
		case 'page_dashboard_list':
			set_dashboard_page_list(data);
			break;
		case 'page_dashboard_edit':
			set_dashboard_page_edit(data);
			break;
		case 'page_list':
			set_page_page_list(data);
			break;
		case 'setting_dashboard_edit':
			set_dashboard_setting_edit(data);
			break;
		case 'sport_dashboard_edit':
			set_dashboard_sport_edit(data);
			break;
		case 'review_dashboard_list':
			set_dashboard_review_list(data);
			break;
		case 'login':
			set_page_login(data);
			break;
		case 'logout':
			set_page_logout(data);
			break;
		case 'order_checkout_summary':
			set_page_order_checkout_summary(data);
			break;
		case 'order_checkout_submit':
			set_page_order_checkout_submit(data);
			break;
		case 'order_checkout_success':
			set_page_order_checkout_success(data);
			break;
		case 'order_dashboard_list':
			set_page_order_dashboard_list(data);
			break;
		case 'product_detail':
			set_page_product_detail(data);
			break;
		case 'product_dashboard_edit':
			set_dashboard_product_edit(data);
			break;
		case 'service_list':
			set_page_service_list(data);
			break;
		case 'service_detail':
			set_page_service_detail(data);
			break;
		case 'service_dashboard_edit':
			set_dashboard_service_edit(data);
			break;
		case 'team_dashboard_edit':
			set_dashboard_team_edit(data);
			break;
		case 'team_detail':
			set_page_team_detail(data);
			break;
		default:
			set_page_home(data);
			break;
	}
}
function get_biz_page_url(biz_page_title){
	var url='';
	switch(biz_page_title) {
		case 'about_detail':
			url=get_cloud_url('biz_view/about_detail',[]);
			break;
		case 'about_dashboard_edit':
			url=get_cloud_url('biz_view/about_detail',[]);
			break;
		case 'blog_post_detail':
			url=get_cloud_url(get_item_link(DT_BLOG_POST).cloud_detail_url,[]);
			break;
		case 'blog_post_dashboard_edit':
			url=get_cloud_url(get_item_link(DT_BLOG_POST).cloud_edit_url,[]);
			break;
		case 'category_dashboard_edit':
			url=get_cloud_url('biz_view/edit_category/'+get_url_param('tbl_id'),[]);
			break;
		case 'contact_detail':
			url=get_cloud_url('biz_view/contact_detail',[]);
			break;
		case 'contact_dashboard_edit':
			url=get_cloud_url('biz_view/contact_detail',[]);
			break;
		case 'event_detail':
			url=get_cloud_url(get_item_link(DT_EVENT).cloud_detail_url,[]);
			break;
		case 'event_dashboard_edit':
			url=get_cloud_url(get_item_link(DT_EVENT).cloud_edit_url,[]);
			break;
		case 'gallery_detail':
			url=get_cloud_url(get_item_link(DT_GALLERY).cloud_detail_url,[]);
			break;
		case 'gallery_dashboard_edit':
			url=get_cloud_url(get_item_link(DT_GALLERY).cloud_edit_url,[]);
			break;
		case 'game_dashboard_edit':
			url=get_cloud_url(get_item_link(DT_GAME).cloud_edit_url,[
				{'title':'parent_tbl_id','value':get_url_param('parent_tbl_id')},
				{'title':'parent_data_type','value':get_url_param('parent_data_type')}
			]);
			break;
		case 'home_detail':
			url=get_cloud_url('biz_view/home_detail',[]);
			break;
		case 'home_dashboard_edit':
			url=get_cloud_url('biz_view/home_edit',[]);
			break;
		case 'item_activity_list':
			url=get_cloud_url('biz_view/activity/'+get_url_param('page_current'),[]);
			break;
		case 'item_dashboard_menu':
			url=get_cloud_url('blank',[]);
			break;
		case 'item_dashboard_list':
			url=get_cloud_url(get_item_link(get_url_param('data_type')).cloud_list_url,[
				{'title':'parent_data_type','value':get_url_param('parent_data_type')},
				{'title':'parent_tbl_id','value':get_url_param('parent_tbl_id')},
				{'title':'search_type','value':get_url_param('search_type')}
			]);
			break;
		case 'item_dashboard_list_edit':
			url=get_cloud_url(get_item_link(get_url_param('data_type')).cloud_list_edit_url,[
				{'title':'parent_data_type','value':get_url_param('parent_data_type')},
				{'title':'parent_tbl_id','value':get_url_param('parent_tbl_id')},
				{'title':'search_type','value':get_url_param('search_type')}
			]);
			break;
		case 'item_dashboard_photo_list':
			url=get_cloud_url('biz_view/item_photo_list/'+get_url_param('data_type')+"/"+get_url_param('tbl_id')+"/"+get_url_param('page_current'),[]);
			break;
		case 'item_dashboard_photo_edit':
			url=get_cloud_url('biz_view/item_photo_edit/'+get_url_param('data_type')+"/"+get_url_param('tbl_id')+"/"+get_url_param('parent_data_type')+"/"+get_url_param('parent_tbl_id'),[]);
			break;
		case 'item_dashboard_sub_item_list':
			url=get_cloud_url('biz_view/sub_item_list/'+get_url_param('data_type')+"/"+get_url_param('tbl_id')+"/"+get_url_param('parent_data_type')+"/"+get_url_param('parent_tbl_id'),[]);
			break;
		case 'item_dashboard_sub_item_edit':
			url=get_cloud_url('biz_view/sub_item_edit/'+get_url_param('data_type')+"/"+get_url_param('tbl_id')+"/"+get_url_param('parent_data_type')+"/"+get_url_param('parent_tbl_id')+"/"+get_url_param('top_data_type')+"/"+get_url_param('top_tbl_id'),[]);
			break;
		case 'item_home':
			url=get_cloud_url(get_item_link(get_url_param('data_type')).cloud_home_url,[]);
			break;
		case 'item_list':
			url=get_cloud_url(get_item_link(get_url_param('data_type')).cloud_list_url,[]);
			break;
		case 'login':
			url=get_cloud_url('blank',[]);
			break;
		case 'logout':
			url=get_cloud_url('blank',[]);
			break;
		case 'member_list':
			url=get_cloud_url(get_item_link(DT_MEMBER).cloud_list_url,[]);
			break;
		case 'member_dashboard_edit':
			url=get_cloud_url(get_item_link(DT_MEMBER).cloud_edit_url,[]);
			break;
		case 'member_detail':
			url=get_cloud_url('member/detail/'+get_url_param('tbl_id'),[]);
			break;
		case 'order_checkout_summary':
			url=get_cloud_url('order/cart_summary/'+get_user().customer_id,[]);
			break;
		case 'order_checkout_submit':
			url=get_cloud_url('order/cart_summary/'+get_user().customer_id,[]);
			break;
		case 'order_checkout_success':
			url=get_cloud_url('order/checkout/success/'+get_url_param('order_id'),[]);
			break;
		case 'order_dashboard_list':
			url=get_cloud_url('order/order_list/'+get_url_param('page_current'),[]);
			break;
		case 'page_dashboard_list':
			url=get_cloud_url('biz_view/page_list',[]);
			break;
		case 'page_dashboard_edit':
			url=get_cloud_url('biz_view/page_detail/'+get_url_param('title_url'),[]);
			break;
		case 'page_list':
			url=get_cloud_url('biz_view/page_list',[]);
			break;
		case 'product_detail':
			url=get_cloud_url(get_item_link(DT_PRODUCT).cloud_detail_url,[]);
			break;
		case 'product_dashboard_edit':
			url=get_cloud_url(get_item_link(DT_PRODUCT).cloud_edit_url,[]);
			break;
		case 'review_dashboard_list':
			url=get_cloud_url('item/review_list/'+get_url_param('page_current'),[]);
			break;
		case 'service_detail':
			url=get_cloud_url(get_item_link(DT_SERVICE).cloud_detail_url,[]);
			break;
		case 'service_dashboard_edit':
			url=get_cloud_url(get_item_link(DT_SERVICE).cloud_edit_url,[]);
			break;
		case 'setting_dashboard_edit':
			url=get_cloud_url('biz_view/setting_edit',[]);
			break;
		case 'sport_dashboard_edit':
			url=get_cloud_url(get_item_link(DT_SPORT).cloud_edit_url,[]);
			break;
		case 'team_dashboard_edit':
			url=get_cloud_url(get_item_link(DT_TEAM).cloud_edit_url,[
				{'title':'parent_tbl_id','value':get_url_param('parent_tbl_id')},
				{'title':'parent_data_type','value':get_url_param('parent_data_type')}
			]);
			break;
		case 'team_detail':
			url=get_cloud_url(get_item_link(DT_TEAM).cloud_detail_url,[]);
			break;
		default:
			show_toast_error('get biz page url not found');
			break;
	}
	return url;
}
// CLOUD START PROCCESSING END --
//9_event 9_like
function bind_event_detail_list_like(){
	$(".biz_lbl_like_button").click(function(e) {
		var obj=get_new_item(DT_BLANK,0);
		obj.item_tbl_id=$(this).attr('tbl_id');
		obj.item_data_type=$(this).attr('data_type');
		url = "item/like_update/"+obj.item_data_type+"/"+obj.item_tbl_id+"/"+get_user().customer_id;
		cloud_post_url(get_cloud_url(url,[]),obj,function(data){
			if(String(data.item.new_like)=='true'){
				$('span#biz_lbl_like_count_'+obj.item_tbl_id).html(" "+data.item.like_count);
				set_heart_red(obj.item_tbl_id);
			}
			return false;
		});
	});
}
//9_event
function bind_event_detail_list_page(){
	$(".biz_link_page").click(function(e) {
		e.preventDefault();
		data_type=$('#biz_page_data_type').val();
		category=$('#biz_page_category').val();
		page_current = $(this).attr('page_current');
		url="biz_view/item_list/"+data_type+"/"+category+"/"+page_current;
		cloud_get_url(get_cloud_url(url,[]),{},function(data){
			$('#biz_lbl_list').html(get_item_detail_list_str(data.item_list,data.page_current,data.page_count));
			$('#biz_lbl_pager').html(get_pager_ajax(data.page_current,data.page_count));
			bind_event_detail_list_page();
		});
	});
}
// -- ITEM LINKZ START -- //
//9_item_link 9_link
function get_item_link(data_type){
	if(!data_type){
		data_type=DT_BLANK;
	}
	var item={};
	item.edit_url=data_type.replace('_biz','').toLowerCase()+'_dashboard_edit.html?data_type='+data_type;
	item.add_url=data_type.replace('_biz','').toLowerCase()+'_dashboard_edit.html?data_type='+data_type+"&tbl_id=0";
	item.list_url='item_list.html?data_type='+data_type;
	item.detail_url=data_type.replace('_biz','').toLowerCase()+'_detail.html?data_type='+data_type;
	item.home_url='item_home.html?data_type='+data_type;
	item.cloud_detail_url='biz_view/item_detail/'+data_type+"/"+get_url_param('tbl_id');
	item.cloud_edit_url='biz_view/item_edit/'+data_type+"/"+get_url_param('tbl_id');
	item.cloud_home_url='biz_view/item_home/'+data_type;
	item.cloud_list_url='biz_view/item_list/'+data_type+'/'+get_url_param('category') +"/"+get_url_param('page_current');
	item.page_home_url='/';
	item.page_dashboard_home_url='item_dashboard_menu.html';
	item.edit_list_url="item_dashboard_list.html?data_type="+data_type+"&category=all&page_current=1";
	switch(data_type){
		case DT_GAME:
			item.cloud_edit_url='game/edit/'+data_type+"/"+get_url_param('tbl_id')+"/"+get_url_param('parent_data_type')  +"/"+  get_url_param('parent_tbl_id');
			item.cloud_detail_url='team/detail/'+get_url_param('tbl_id');
			item.cloud_list_edit_url='biz_view/item_list_edit/'+DT_GAME+"/"+get_url_param('parent_data_type')+"/"+get_url_param('parent_tbl_id')  +"/"+  get_url_param('page_current');
			break;
		case DT_TEAM:
			item.cloud_edit_url='team/edit/'+data_type+"/"+get_url_param('tbl_id')+"/"+get_url_param('parent_data_type')  +"/"+  get_url_param('parent_tbl_id');
			item.cloud_detail_url='team/detail/'+get_url_param('tbl_id');
			item.cloud_list_edit_url='biz_view/item_list_edit/'+DT_TEAM+"/"+get_url_param('parent_data_type') +"/"+ get_url_param('parent_tbl_id')  +"/"+  get_url_param('page_current');
			break;
		case DT_PLAYER:
		case DT_COACH:
			item.edit_list_url="item_dashboard_list_edit.html";
			item.cloud_list_edit_url='biz_view/item_list_edit/'+DT_MEMBER+"/"+get_url_param('parent_data_type') +"/"+ get_url_param('parent_tbl_id')  +"/"+  get_url_param('page_current');
			break;
		case DT_MEMBER:
			item.edit_list_url="item_dashboard_list.html?category=all&page_current=1&data_type="+DT_MEMBER;
			break;
		case DT_ITEM:
			item.edit_url='item_dashboard_sub_item_edit.html?blank=null';
			break;
		case DT_PHOTO:
			item.edit_url='item_dashboard_photo_edit.html?blank=null';
			break;
			deafult:
			break;
	}
	return item;
}
// -- ITEM LINKZ END -- //
function get_button_color(color_str){
	color_list=['bg-black-black','bg-black-black','bg-mint-dark','bg-red-dark','bg-green-dark','bg-blue-dark','bg-yellow-dark','bg-orange-dark','bg-teal-dark','bg-dark-dark','bg-magenta-dark','bg-brown-dark'];
	color=0;
	if(color_str=='random'){
		if(color>=color_list.length){
			color=0;
		}
		color_str=color_list[get_id(color_list.length-2)];
		color=color+1;
	}else{
		color_str=color_str
	}
	return color_str;
}
function set_buy_view_like_str(item){
	view_count_str ="<i class='fa fa-eye color-gray-dark'></i><span> "+item.view_count+"</span>";
	heart_color='color-gray-dark';
	if(item.customer_like=='true'){
		heart_color='color-red-dark';
	}
	like_count_str="<i id='biz_lbl_like_"+item.tbl_id+"' data_type='"+item.data_type+"' tbl_id='"+item.tbl_id+"' class='biz_lbl_like_button fa fa-heart "+heart_color+"'></i><span id='biz_lbl_like_count_"+item.tbl_id+"'> "+item.like_count+"</span>";
	return "<span class='biz_sp_buy font-12 pt-0 opacity-60 text-end d-block color-theme'>" +like_count_str +" | " + view_count_str + " " + "</span>";
}
function set_view_like_str(item){
	view_count_str ="<i class='fa fa-eye color-gray-dark'></i><span> "+item.view_count+"</span>";
	heart_color='color-gray-dark';
	if(item.customer_like=='true'){
		heart_color='color-red-dark';
	}
	like_count_str ="<i id='biz_lbl_like_"+item.tbl_id+"' data_type='"+item.data_type+"' tbl_id='"+item.tbl_id+"' class='biz_lbl_like_button fa fa-heart "+heart_color+"'></i><span id='biz_lbl_like_count_"+item.tbl_id+"'> "+item.like_count+"</span>";
	return "<span class='font-12 pt-0 opacity-60  color-theme'>" +like_count_str +" | " + view_count_str + " " + "</span>";
}
function set_heart_red(tbl_id){
	$('i#biz_lbl_like_'+tbl_id).attr('class','biz_lbl_like_button fa fa-heart color-red-dark');
}
function bind_detail_list_like_event(){
	$(".biz_lbl_like_button").click(function(e) {
		var obj=get_new_item(DT_BLANK,0);
		obj.item_tbl_id=$(this).attr('tbl_id');
		obj.item_data_type=$(this).attr('data_type');
		url = "item/like_update/"+obj.item_data_type+"/"+obj.item_tbl_id+"/"+get_user().customer_id;
		cloud_post_url(get_cloud_url(url,[]),obj,function(data){
			if(String(data.item.new_like)=='true'){
				$('span#biz_lbl_like_count_'+obj.item_tbl_id).html(" "+data.item.like_count);
				set_heart_red(obj.item_tbl_id);
			}
			return false;
		});
	});
}
function get_category_list_str(button_color,item_list){
	var str='';
	for(var a=0;a<item_list.length;a++){
		str=str+"<div class='col-6'>"+
			"<a href='"+get_item_link(item_list[a].type).list_url+"&category="+item_list[a].title+"&page_current=1'><div class='card card-style m-0 mb-2 rounded-m' style='background-color:transparent;height:150px;background-position:center center !important;background-size:contain; background-repeat:no-repeat;background-image:url("+item_list[a].photo_obj.square_mid_url+")' >"+
			"<div class='card-bottom'><span class='biz_lbl_btn_title badge "+get_button_color(button_color)+" p-2 ps-2 rounded-s font-12'>"+item_list[a].title+" ("+item_list[a].item_count+")</span></div>"+
			"</div></a></div>";
		if(a==1||a==3||a==5||a==7||a==9||a==11||a==13||a==15||a==17){
			str = str+"<div class='w-100 mb-3'></div>";
		}
	}
	return str;
}
function get_item_home_slide_show_list_str(item_list){
	var str='';
	for(var a=0;a<item_list.length;a++){
		str=str+"<div class='splide__slide'>"+
			"<div class='card card-style'style='background-color:transparent; height:320px; background-position:center center !important; background-size:contain; background-repeat:no-repeat; background-image: url("+item_list[a].last_item_create.photo_obj.mid_url+")' >"+
			"<div class='card-bottom p-3'>"+
			"<a href='"+get_item_link(item_list[a].type).list_url+"&category="+item_list[a].title+"&page_current=1' class='btn btn-s rounded-s mb-4 biz_btn'><h4 class='biz_btn_lbl_title'>"+item_list[a].title+" (" + item_list[a].item_count + ")</h4></a>"+
			"</div>"+
			"<div class='card-overlay bg-gradient'></div>"+
			"</div>"+
			"</div>";
	}
	return str;
}
//9_double_list
function get_detail_double_list_str(item_list){
	var str='';
	var visible_str='';
	for(a=0;a<item_list.length;a++){
		switch(item_list[a].data_type) {
			case DT_PRODUCT:
				if(String(item_list[a].visible_obj.product_visible_id) =='0'){
					visible_str="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.product_status+"</p>";
				}else{
					visible_str = "<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.product_status+"</p>";
				}
				break;
			case DT_SERVICE:
				if(String(item_list[a].visible_obj.service_visible_id) =='0'){
					visible_str="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.service_status_short+"</p>";
				}else{
					visible_str = "<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.service_status_short+"</p>";
				}
				price_str="<h5 class='text-center pt-1 mb-0'>"+item_list[a].money_obj.price+"</h5>";
				break;
			case DT_EVENT:
				if(String(item_list[a].visible_obj.event_visible_id) =='0'){
					visible_str="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.event_status_short+"</p>";
				}else{
					visible_str = "<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.event_status_short+"</p>";
				}
				price_str="<h5 class='text-center pt-1 mb-0'>"+item_list[a].money_obj.price+"</h5>";
				break;
			default:
				break;
		}
		if(!item_list[a].sub_note){
			item_list[a].sub_note='';
		}
		price_str="<h5 class='text-center pt-1 mb-0'>"+item_list[a].money_obj.price+"</h5>";
		str=str+"<div class='col-6'>"+
			"<a href='"+get_item_link(item_list[a].data_type).detail_url+"&tbl_id="+item_list[a].tbl_id+"'><img src='"+item_list[a].photo_obj.square_mid_url+"' width='150' class='mx-auto'/></a>"+
			"<div style='text-align:center'>"+
			"<span class='font-12 pt-0 m-2'><i class='fa fa-eye opacity-60 color-gray-dark'></i> "+item_list[a].view_count +"</span>"+
			"</div>"+
			"<h5 class='text-center pt-2 mb-0'>"+item_list[a].money_obj.price+"</h5>"+
			visible_str+
			"<h4 class='ps-3 line-height-s color-theme mb-1 text-center'>"+item_list[a].title+"</h4>"+
			"<p class='text-center mb-0 ps-3 font-12 pt-1'>"+
			truncate_str(item_list[a].sub_note,88)+
			"</p>"+
			"</div>";
	}
	return str;
}
function get_item_detail_list_str(item_list){
	var str='';
	for(var a=0;a<item_list.length;a++){
		detail_url=get_item_link(item_list[a].data_type).detail_url+'&tbl_id='+item_list[a].tbl_id;
		category_url=get_item_link(item_list[a].data_type).list_url+'&category='+item_list[a].category+"&page_current=1";
		sub_content_1=' ' ;
		sub_content_2=' ' ;
		switch(item_list[a].data_type) {
			case DT_BLOG_POST:
				sub_content_2="<span>"+item_list[a].date_obj.pretty_create+" </span>";
				break;
			case DT_PRODUCT:
				if(String(item_list[a].visible_obj.product_visible_id)=='0'){
					visible_str="| <span class='color-red-dark'> <i class='fa-sharp fa-solid fa-circle-xmark'></i> </span>";
				}else{
					visible_str="| <span class='color-green-dark'><i class='fa-sharp fa-solid fa-circle-check'></i></span>";
				}
				sub_content_2="<span>"+item_list[a].money_obj.price+" " +visible_str+"</span>";
				break;
			case DT_EVENT:
				sub_content_1="<b class='font-12;' style='float:left;width:80:%;padding-left: 1rem !important;' >"+item_list[a].event_obj.start_date_time+"</b>";
				if(String(item_list[a].visible_obj.event_visible_id)=='0'){
					visible_str="| <span class='color-red-dark'> <i class='fa-sharp fa-solid fa-circle-xmark'></i> </span>";
				}else{
					visible_str="| <span class='color-green-dark'><i class='fa-sharp fa-solid fa-circle-check'></i></span>";
				}
				sub_content_2="<span>"+item_list[a].money_obj.price+" "+visible_str+"</span>";
				break;
			case DT_SERVICE:
				if(String(item_list[a].visible_obj.service_visible_id)=='0'){
					visible_str="| <span class='color-red-dark'> <i class='fa-sharp fa-solid fa-circle-xmark'></i> </span>";
				}else{
					visible_str="| <span class='color-green-dark'><i class='fa-sharp fa-solid fa-circle-check'></i></span>";
				}
				sub_content_2="<span>"+item_list[a].money_obj.price+" " +visible_str+"</span>";
				break;
			case DT_GALLERY:
				sub_content_2="<span>"+item_list[a].date_obj.pretty_create+" </span>";
				break;
			case DT_MEMBER:
				item_list[a].title=item_list[a].first_name + " " +item_list[a].last_name;

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
				sub_content_2="<span><b>"+item_list[a].type+ " | </b>" +item_list[a].position + " | " +member_location + " | " + item_list[a].position +"</span>";
				break;
		}
		if(!item_list[a].sub_note){
			item_list[a].sub_note='';
		}
		str=str+"<div class='d-flex mb-3'>"+
			"<div>"+
			"<a href='"+detail_url+"'><img src='"+item_list[a].photo_obj.square_mid_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div style='width:100%'>"+
			"<a href='"+detail_url+"'><h4  class='font-600 ps-3 line-height-s color-theme mb-1'>"+item_list[a].title+"</h4></a>"+
			sub_content_1
			+"<span style='float:left;width:100%' class='mb-0 ps-3 font-12 pt-0'>"+truncate_str(item_list[a].sub_note,250) +"</span>"+
			"<span style='float:left;width:80:%;padding-left: 1rem !important;' class='font-12 pt-0 opacity-60'>" +sub_content_2 + " | <a href='"+category_url+"'><b>"+item_list[a].category+"</b></a></span>"+
			"<span  class='font-12 pt-0 opacity-60' style='float:right;width:20:%;'>"
			+ set_view_like_str(item_list[a]) +
			"</div>"+
			"</div>"+
			"<div class='divider mb-3'></div>";
	}
	return str;
}
function bind_event_dashboard_photo(){
	$("#biz_img").click(function() {
		var obj=get_new_item(DT_PHOTO,0);
		camera_photo_select(function(data){
			cloud_update(obj.data_type,obj.tbl_id,{photofilename:data.photofilename},function(data){
				$('#biz_img').show();
				$('#biz_img').attr('src',data.item.photo_obj.square_mid_url);
				$('#biz_page_photofilename').val(data.item.photofilename);
				return false;
			});
		});
	});
}
function bind_double_slide_show_list_str(data_type,item_list){
	var str='';
	for(var a=0;a<item_list.length;a++){
		var detail_url=get_item_link(data_type).detail_url+"&tbl_id="+item_list[a].tbl_id;
		var visible_str="";
		var price_str="";
		switch(data_type) {
			case DT_PRODUCT:
				if(String(item_list[a].visible_obj.product_visible_id) =='0'){
					visible_str="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.product_status+"</p>";
				}else{
					visible_str = "<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.product_status+"</p>";
				}
				price_str="<h5 class='text-center pt-1 mb-0'>"+item_list[a].money_obj.price+"</h5>";
				break;
			case DT_SERVICE:
				if(String(item_list[a].visible_obj.service_visible_id) =='0'){
					visible_str="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.service_status_short+"</p>";
				}else{
					visible_str = "<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.service_status_short+"</p>";
				}
				price_str="<h5 class='text-center pt-1 mb-0'>"+item_list[a].money_obj.price+"</h5>";
				break;
			case DT_EVENT:
				if(String(item_list[a].visible_obj.event_visible_id) =='0'){
					visible_str="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.event_status_short+"</p>";
				}else{
					visible_str = "<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+item_list[a].visible_obj.event_status_short+"</p>";
				}
				price_str="<h5 class='text-center pt-1 mb-0'>"+item_list[a].money_obj.price+"</h5>";
				break;
			default:
				break;
		}
		if(!item_list[a].sub_note){
			item_list[a].sub_note='';
		}
		str=str+"<div class='splide__slide'>"+
			"<a href='"+detail_url+"'><img src='"+item_list[a].photo_obj.square_mid_url+"' width='100' class='mx-auto'></a>"+
			"<div class='biz_div_stat_outer'>"+
			"<span class='font-12 pt-0 mt-1'><i class='fa fa-eye opacity-60 color-gray-dark'></i> "+item_list[a].view_count +"</span>"+
			"</div>"+
			price_str+
			visible_str +
			"<a href='"+detail_url+"'><h4  class='font-600 text-center biz_lbl_title'>"+item_list[a].title+"</h4></a>"+
			"<p class='text-center ps-3 font-12 pt-0 m-2'>"+
			truncate_str(item_list[a].sub_note,88)+
			"</p>"+
			"</div>";
	}
	return str;
}
function bind_detail_photo_list_str(item_list){
	var str='';
	for(a=0;a<item_list.length;a++){
		if(!item_list[a].title){
			item_list[a].title='';
		}
		str=str+"<a class='col mb-4' data-gallery='gallery-1' href='"+item_list[a].photo_obj.album_url+"' title='"+item_list[a].title+"'>"+
			"<img src='"+item_list[a].photo_obj.square_mid_url+"' data-src='"+item_list[a].photo_obj.album_url+"' class='preload-img img-fluid rounded-s' alt='img'>"+
			"<p style='text-align:center' class=' pt-2'>"+ truncate_str(item_list[a].title, 50) +"</p>"+
			"</a>";
	}
	return str;
}
function bind_detail_slide_show_list_str(item){
	var str='';
	if(item.photofilename){
		str=str+"<div class='splide__slide'>"+
			"<a data-gallery='gallery-2' title='"+item.title+"' href='"+item.photo_obj.mid_url+"'>"+
			"<img  data-src='"+item.photo_obj.mid_url+"' src='"+item.photo_obj.mid_url+"' class='mx-auto pb-4' style='width:200px!important;'>"+
			"</a></div>";
	}
	for(a=0;a<item.photos.length;a++){
		str=str+"<div class='splide__slide'>"+
			"<a data-gallery='gallery-2' title='"+item.photos[a].title+"' href='"+item.photos[a].photo_obj.album_url+"'>"+
			"<img src='"+item.photos[a].photo_obj.square_mid_url+"' class='mx-auto pb-4' style='width:200px!important;'>"+
			"</a></div>";
	}
	return str;
}
//9_item_home //9_home
function set_page_item_home(data){
	bind_detail(data);
	bind_page_id({data_type:data.data_type});
	bind_detail_home(data);
	hide_page_spinner();
	function bind_detail(data){
		set_page_home_item_slide_show(data.category_list);
		set_page_home_item_mid_list(data.page.title,data.item_list);
		set_page_home_bottom_list('Categories',data.mobile.primary.button_color,data.category_list);
		set_page_footer_navigation(data,data.data_type);
	}
	function bind_detail_home(data){
		switch(data.data_type){
			case DT_BLOG_POST:
				hide_page_cart_top();
				break;
			default:
				show_page_cart_top();
				break;
		}
	}
	function set_page_home_item_slide_show(item_list){
		if(item_list.length>0){
			$('#biz_slide_show_list').html(get_item_home_slide_show_list_str(item_list));
			init_slide_show('#biz_div_slide_show');
		}
	}
	function set_page_home_item_mid_list(title,item_list){
		if(item_list.length>0){
			$('#biz_lbl_mid_title').html(title);
			$('#biz_lbl_mid_list').html(get_item_detail_list_str(item_list));
			bind_event_detail_list_like();
		}
	}
	function set_page_home_bottom_list(title,button_color,item_list){
		if(item_list.length>0){
			$('#biz_lbl_bottom_title').html(title);
			$('#biz_lbl_bottom_list').html(get_category_list_str(button_color,item_list));
		}
	}
}
//9_list
function set_page_item_list(data){
	hide_page_cart_top();
	bind_page_id({data_type:data.data_type});
	bind_page_other_id({category:data.category_title});
	bind_detail(data);
	bind_list(data.item_list,data.page_current,data.page_count,data.item_count);
	hide_page_spinner();
	function bind_detail(data){
		set_page_sub_title(data.category_title);
		set_page_sub_note(data.category.sub_note);
		set_page_footer_navigation(data,data.data_type);
	}
	function bind_list(item_list,page_current,page_count,item_count){
		$('#biz_lbl_list').html(get_item_detail_list_str(item_list));
		$('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
		bind_event_detail_list_page();
		bind_event_detail_list_like();
	}
}
// -- VIEW LAYOUT START -- //
function set_biz_style(button_color, app_theme){
	if(app_theme=='dark-mode'){
		$('#biz_lbl_page_sub_title').css("color","white");
		$('.a-gear').css("color","white");
	}else{
		$('#biz_lbl_page_sub_title').css("color","black");
		$('.biz_lbl_title').css("color","black");
		$('.a-gear').css("color","black");
	}
	if(button_color =='bg-black-black'){
		$('.biz_btn_lbl_title').css("color","white");
	}
}

// -- VIEW LAYOUT END -- //

function set_page_title(str){
	$('#biz_lbl_page_title').html(str);
}
function set_page_cloud_title(str){
	$('#biz_page_title').val(str);
}
// -- PAGE START -- //
function show_cart_top(){
	$("#menu-cart").show();
	url = "order/cart_get/"+get_user().customer_id;
	cloud_get_url(get_cloud_url(url,[]),{},function(data){
		set_order_cart_top(data.cart);
	});
}
function set_page_button_color(button_color,app_color){
	$('.biz_btn').addClass(get_button_color(button_color));
	$('.biz_btn').css("color","white");
}
function set_page_sub_title(str){
	$('#biz_lbl_page_sub_title').html(str);
}
function set_page_sub_note(str){
	$('#biz_lbl_page_sub_note').html(str);
}
function set_page_note(str){
	$('#biz_lbl_page_note').html(str);
}
function show_page_spinner(){
	var preloader = document.getElementById('preloader')
	if(preloader){preloader.classList.remove('preloader-hide');}
}
function hide_page_spinner(){
	var preloader = document.getElementById('preloader')
	if(preloader){preloader.classList.add('preloader-hide');}
}
function hide_page_cart_top(){
	$('#biz_btn_order_cart_top').hide();
}
function show_page_cart_top(){
	$('#biz_btn_order_cart_top').show();
}
function hide_page_pager(){
	$('#biz_lbl_card_pager').hide();
}
function hide_page_footer(){
	$('#footer-bar').hide();
}
function hide_page_add_button(){
	$('#biz_btn_add').hide();
}
function hide_page_tab(){
	$('.tab-controls').hide();
}
// -- PAGE END -- //
//- SET-PAGE-START -- //
function set_page_detail_title(str){
	$('#biz_card_top').show();
	if(str){
		$('#biz_div_left_info').show();
		$('#biz_lbl_page_item_title').html(str);
	}
}
function set_page_detail_sub_note(str){
	if(str){
		if(str.length>1){
			$('#biz_lbl_card_description').show();
			$('#biz_lbl_page_sub_note').show();
			$('#biz_lbl_page_sub_note').html(str);
		}
	}
}
function set_page_detail_view_count(str){
	if(!str || str==0){
		str='1';
	}
	$('#biz_lbl_view_count').html(str);
}
function set_page_detail_note(item){
	if(item.note){
		if(item.note.length>233){
			$('#biz_lbl_card_note').show();
			$('#biz_lbl_note').html(item.note);
		}
	}
}
function set_page_detail_price(item){
	$('#biz_btn_cart_add').show();
	if(item.money_obj.old_price && item.money_obj.old_price!='$0.00'){
		$('#biz_lbl_div_old_price').show();
		$('#biz_lbl_old_price').show();
		$('#biz_lbl_old_price').html(item.money_obj.old_price);
	}
	if(item.money_obj.discount && String(item.money_obj.discount)!='0%'){
		$('#biz_div_discount').show();
		$('#biz_lbl_discount').html(item.money_obj.discount + ' Discount');
	}
	$('#biz_lbl_price').html(item.money_obj.price);
	if(item.items.length>0){
		//$('#biz_lbl_option_list').show();
		for(a=0;a<item.items.length;a++){
			str='';
			$('#biz_lbl_optiondiv'+a).show();
			$('#biz_lbl_optiontitle'+a).html(item.items[a].title);
			str=str+ "<option value='"+item.items[a].tbl_id+"' disabled>"+item.items[a].title+"</option>";
			for(b=0;b<item.items[a].items.length;b++){
				str=str+ "<option value='"+item.items[a].items[b].tbl_id+"'>"+item.items[a].items[b].title + " " + get_money(item.items[a].items[b].price) +"</option>";
			}
			$('#biz_sel_option'+a).html(str);
		}
	}
}
function set_page_detail_media(item){
	if(item.youtube_url){
		$("#biz_lbl_card_youtube").show();
		$("#biz_lbl_youtube_link").attr('src',get_youtube_link(item.youtube_url));
	}
	if(item.mp3filename){
		$("#biz_lbl_card_mp3").show();
		$("#biz_lbl_mp3_duration").html(item.mp3duration);
		$("#biz_page_mp3_url").val(item.mp3_url);
		$("#biz_page_mp3filename").val(item.mp3filename);
		$("#biz_audio_track").attr('src',item.mp3_url);
		new Plyr('#biz_audio_track');
	}
	if(item.pdf_link){
		$("#biz_div_pdf").show();
		$("#biz_btn_pdf_link").click(function() {
			window.location=item.pdf_link;
		});
	}
}
function set_page_detail_product_photo(item){
	$('#biz_lbl_slideshow_list').html(bind_detail_slide_show_list_str(item));
	init_slide_show('#single-slider-1');
	if(item.photos.length>0){
		$('#biz_lbl_card_photo_list').show();
		$('#biz_lbl_photo_list').html(bind_detail_photo_list_str(item.photos));
	}
}
function set_page_detail_double_slide_show(item,item_list){
	if(item_list.length>1){
		$('#biz_lbl_double_card').show();
		$('#biz_lbl_double_category').html(item.category);
		$('#biz_lbl_double_slide_show_list').html(bind_double_slide_show_list_str(item.data_type,item_list));
		init_double_slide_show('#slider_double');
	}
}
function set_page_product_in_app_purchase(item){
	if(item.app_store_product=='true'){
		$("#biz_lbl_one_click_checkout").show();
		$(".biz_btn_one_click_checkout").attr('biz_product_id',data.event.app_store_product_id);
		bind_one_click_buy();
	}
}
function bind_one_click_buy(){
	$(".biz_btn_checkout").click(function() {
		var obj=get_new_item(DT_PRODUCT,0);
		obj.product_id=$(this).attr("biz_product_id");
		bind_in_app_checkout(obj.product_id);
	});
}
function set_page_detail_category(item){
	$("#biz_link_category").attr('href',get_item_link(item.data_type).list_url+"&category="+item.category+"&page_current=1");
	$("#biz_link_category").html(item.category);
}
function set_page_detail_option_list(item){
	if(item.items.length>0){
		$('#biz_lbl_option_list').show();
		for(a=0;a<item.items.length;a++){
			str='';
			$('#biz_lbl_optiondiv'+a).show();
			$('#biz_lbl_optiontitle'+a).html(item.items[a].title);
			str=str+ "<option value='"+item.items[a].tbl_id+"' disabled>"+item.items[a].title+"</option>";
			for(b=0;b<item.items[a].items.length;b++){
				str=str+ "<option value='"+item.items[a].items[b].tbl_id+"'>"+item.items[a].items[b].title + " " + get_money(item.items[a].items[b].price) +"</option>";
			}
			$('#biz_sel_option'+a).html(str);
		}
	}
}
function set_page_event_detail_like_count(data){
	$('#biz_lbl_like_count').html(data.like_count);
	if(data.customer_like){
		set_heart_red();
	}else{
		$("#biz_sp_like_count_box").click(function(e) {
			var obj=get_new_item( $('#biz_page_data_type').val(), $('#biz_page_tbl_id').val());
			url = "item/like_update/"+obj.data_type+"/"+obj.tbl_id+"/"+get_user().customer_id;
			cloud_post_url(get_cloud_url(url,[]),obj,function(data){
				if(String(data.item.new_like)=='true'){
					$('#biz_lbl_like_count').html(data.item.like_count);
					set_heart_red();
				}
				return false;
			});
		});
	}
	function set_heart_red(){
		$('#biz_lbl_heart').attr('class','fa fa-heart color-red-dark');
	}
}
function set_page_detail_visible(visible,str){
	if(!visible){
		$('#biz_lbl_card_visible').hide();
	}else{
		$('#biz_lbl_visible').html(str);
		$('#biz_lbl_card_visible').show();
	}
}
function set_page_footer_navigation(data,page_footer){
	str='';
	set_home=false;
	set_home_position=parseInt((data.mobile.page_list.items.length/2));
	home_str = "<a id='biz_lbl_ft_link_home' href='/'><i class='fa fa-home'></i><span>Home</span></a>";
	for(a=0;a<data.mobile.page_list.items.length;a++){
		if(a==set_home_position){
			str = str + home_str;
			//home
			set_home=true;
		}
		if(data.mobile.page_list.items[a].visible=='true'){
			var item_str=String(data.mobile.page_list.items[a].type).replace('_biz','');
			str = str + "<a id='biz_lbl_ft_link_"+item_str+"' href='"+get_item_link(data.mobile.page_list.items[a].type).home_url+"'><i class='fa fa-"+data.mobile.page_list.items[a].icon_footer+"'></i><span>"+data.mobile.page_list.items[a].title+"</span></a>";
		}
	}
	if(set_home==false){
		str = str + home_str;
	}
	$("#footer-bar").html(str);
	switch(page_footer) {
		case DT_GALLERY:
			$("#biz_lbl_ft_link_gallery").attr('class','active-nav');
			break;
		case DT_PAGE:
			$("#biz_lbl_ft_link_page").attr('class','active-nav');
			break;
		case DT_BLOG_POST:
			$("#biz_lbl_ft_link_blog_post").attr('class','active-nav');
			break;
		case DT_PRODUCT:
			$("#biz_lbl_ft_link_product").attr('class','active-nav');
			break;
		case DT_SERVICE:
			$("#biz_lbl_ft_link_service").attr('class','active-nav');
			break;
		case DT_EVENT:
			$("#biz_lbl_ft_link_event").attr('class','active-nav');
			break;
		case DT_MEMBER:
			$("#biz_lbl_ft_link_member").attr('class','active-nav');
			break;
		case 'home':
			$("#biz_lbl_ft_link_home").attr('class','active-nav');
			break;
		default:
			//$("#biz_lbl_ft_link_home").attr('class','active-nav');
			break;
	}
}
//- SET-PAGE-END -- //
//- BIND-PAGE-START -- //
function bind_service_one_click_buy(){
	$(".biz_btn_checkout").click(function() {
		var obj=get_new_item(DT_SERVICE,0);
		obj.product_id=$(this).attr("biz_product_id");
		obj.start_date=$('#biz_tb_date').val();
		obj.start_time=$('#biz_tb_time').val();
		if(!obj.start_time){
			show_toast_error('Please select a time');
		}else if(!obj.start_date){
			show_toast_error('Please select a date');
		}else{
			bind_in_app_checkout(obj.product_id);
		}
	});
}
function bind_in_app_checkout(product_id){
	inAppPurchases.purchase(product_id).then(function(purchase){
	}).catch(function(err){
		if(err.code != '-1013'){
			alert("In App Purchase Error. ProductID: "+product_id +" "+ JSON.stringify(err));
		}
	});
}
function bind_page_id(item){
	$('#biz_page_tbl_id').val(item.tbl_id?item.tbl_id:"0");
	$('#biz_page_data_type').val(item.data_type?item.data_type:DT_BLANK);
	$('#biz_page_photofilename').val(item.photofilename?item.photofilename:"");
}
function bind_page_other_id(item){
	$('#biz_page_category').val(item.category?item.category:"");
	$('#biz_page_item_list_count').val(item.item_count?item.item_count:"");
	$('#biz_page_parent_tbl_id').val(item.parent_tbl_id?item.parent_tbl_id:"");
	$('#biz_page_parent_data_type').val(item.parent_data_type?item.parent_data_type:"");
	$('#biz_page_parent_field_id').val(item.parent_field_id?item.parent_field_id:"");
	$('#biz_page_top_tbl_id').val(item.top_tbl_id?item.top_tbl_id:"");
	$('#biz_page_top_data_type').val(item.top_data_type?item.top_data_type:"");
	$('#biz_page_review_count').val(item.review_count?item.review_count:"");
	$('#biz_page_rating_avg').val(item.rating_avg?item.rating_avg:"");
}
//- BIND-PAGE-START -- //
//$('#biz_pager').html(get_pager_str(data.page_current,data.page_count,'gallery_list.html?category=all'));
function get_pager_str(page_current,page_count,url){
	str='';
	if(page_count){
		if(page_current>1){
			str = str+"<li class='prev'>";
			str = str+"<a href='"+url+"&page_current="+(parseInt(page_current)-1)+"'>";
			str = str+"<span class='fa fa-angle-left'></span>";
			str = str+"</a></li>";
		}
		for(var a=1;a<=page_count;a++){
			if(page_current==a){
				str=str+"<li class='active'><a href='"+url+"&page_current="+a+"'>"+a+"</a></li>";
			}else{
				str=str+"<li><a href='"+url+"&page_current="+a+"'>"+a+"</a></li>";
			}
		}
		if(page_current>=page_count-1){
		}else{
			str=str+"<li><a href='"+url+"&page_current="+(parseInt(page_current)+1)+"'><span class='fa fa-angle-right'></span></a></li>";
		}
		str=str+"</li>";
	}
	return str;
}
//$('#biz_pager').html(get_pager_ajax(page_current,page_count));
function get_pager_ajax(page_current,page_count){
	str='';
	if(parseInt(page_count)){
		if(parseInt(page_current)>1){
			str = str+"<li class='page-item'>";
			str = str+"<a page_current='"+(parseInt(page_current)-1)+"' class='page-link color-black bg-transparent border-0 biz_link_page' href='#' tabindex='-1' aria-disabled='true'><i class='fa fa-angle-left'></i></a>";
			str = str+"</li>";
		}
		for(var a=1;a<=page_count;a++){
			if(page_current==a){
				str=str+"<li class='page-item active biz_link_page' page_current='"+a+"'><a class='page-link color-black rounded-s border-0 biz_link_page biz_btn' href='#'  page_current='"+a+"'>"+a+"<span class='sr-only'>(current)</span></a></li>";
			}else{
				str=str+"<li class='page-item biz_link_page'  page_current='"+a+"'><a  page_current='"+a+"' class='page-link color-black border-0 biz_link_page' href='#'>"+a+"</a></li>";
			}
		}
		if(page_current>=page_count){
		}else{
			str=str+"<li   page_current='"+(parseInt(page_current)+1)+"' class='page-item biz_link_page'><a  page_current='"+(parseInt(page_current)+1)+"' class='page-link rounded-xs color-black bg-transparent border-0 biz_link_page' href='#'><i class='fa fa-angle-right'></i></a></li>";
		}
		str=str+"</li>";
	}
	return str;
}
function get_option_list_str(item_list,title,value){
	var str='';
	//str=str+ "<option value='' selected>Select a Value</option>";
	for(a=0;a<item_list.length;a++){
		str=str+ "<option value='"+item_list[a][value]+"' selected>"+item_list[a][title]+"</option>";
	}
	return str;
}
function show_toast_update(message){
	hide_toast();
	if(!message){
		message='Update';
	}
	var toastID = document.getElementById('toast-save');
	toastID.innerHTML="<i class='fa fa-check me-3'></i>"+message;
	toastID = new bootstrap.Toast(toastID);
	toastID.show();
}
function show_toast_error(error){
	hide_toast();
	var toastID = document.getElementById('toast-error');
	toastID.innerHTML="<i class='fa fa-times me-3'></i>Error<br/> "+error;
	toastID = new bootstrap.Toast(toastID);
	toastID.show();
}
function hide_toast(){
	var toast_error_ID = document.getElementById('toast-error');
	toast_error_ID = new bootstrap.Toast(toast_error_ID);
	toast_error_ID.hide();

	var toast_success_ID = document.getElementById('toast-save');
	toast_success_ID = new bootstrap.Toast(toast_success_ID);
	toast_success_ID.hide();
}
// -- VIEW LAYOUT END -- //
