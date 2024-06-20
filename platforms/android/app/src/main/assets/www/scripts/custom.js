var pwaName = "Kolor"; //Local Storage Names for PWA
function set_app_color(app_color,app_theme){
	if(!app_color){
		app_color='gradient-1';
	}
	if(!app_theme){
		app_theme='light-mode';
	}
	localStorage.setItem(pwaName+'-Gradient-Theme', app_color);
	document.body.setAttribute('data-gradient', app_color);
	if(app_theme=='dark-mode'){
		activateDarkMode();
		$('.a-gear').css("color","white");
	}else{
		activateLightMode();
	}
	function activateDarkMode(){
		document.body.classList.add('theme-dark');
		document.body.classList.remove('theme-light', 'detect-theme');
        localStorage.setItem(pwaName+'-Theme', 'dark-mode');
	}
	function activateLightMode(){
		document.body.classList.add('theme-light');
		document.body.classList.remove('theme-dark','detect-theme');
        localStorage.setItem(pwaName+'-Theme', 'light-mode');
	}
}

document.addEventListener('DOMContentLoaded', () => {
	'use strict'
	//Global Variables
	let isPWA = true;  // Enables or disables the service worker and PWA
	let isAJAX = false; // AJAX transitions. Requires local server or server
	var pwaRemind = 1; //Days to re-remind to add to home
	var pwaNoCache = false; //Requires server and HTTPS/SSL. Will clear cache with each visit
	//Setting Service Worker Locations scope = folder | location = service worker js location
	var pwaScope = "/";
	var pwaLocation = "/_service-worker.js";
	//Place all your custom Javascript functions and plugin calls below this line
	function init_template(){
		//Caching Global Variables
		var i, e, el; //https://www.w3schools.com/js/js_performance.asp
		//Attaching Menu Hider
		var menuHider = document.getElementsByClassName('menu-hider');
		if(!menuHider.length){var hider = document.createElement('div'); hider.setAttribute("class", "menu-hider");document.body.insertAdjacentElement('beforebegin', hider);}
		if(menuHider[0].classList.contains('menu-active')){menuHider[0].classList.remove('menu-active');}
		//Activating Page Content Settings for Footer Bar
		var footerBar = document.querySelectorAll('#footer-bar');
		if(footerBar.length){
			var pageContent = document.querySelectorAll('.page-content');
			pageContent[0].classList.add('has-footer-menu');
		}
		//Demo function for programtic creation of Menu
		//menu('menu-settings', 'show', 250);
		//Activating Menus
		document.querySelectorAll('.menu').forEach(el=>{el.style.display='block'})
		//Don't jump on Empty Links
		const emptyHref = document.querySelectorAll('a[href="#"]')
		emptyHref.forEach(el => el.addEventListener('click', e => {
			e.preventDefault();
			return false;
		}));
		//Setting Sidebar Widths
		var menus = document.querySelectorAll('.menu');
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
		menuFunction();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			//Dark Mode
			function checkDarkMode(){
				const toggleDark = document.querySelectorAll('[data-toggle-theme]');
				function activateDarkMode(){
					document.body.classList.add('theme-dark');
					document.body.classList.remove('theme-light', 'detect-theme');
					for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked="checked"};
					localStorage.setItem(pwaName+'-Theme', 'dark-mode');
				}
				function activateLightMode(){
					document.body.classList.add('theme-light');
					document.body.classList.remove('theme-dark','detect-theme');
					for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked=false};
					localStorage.setItem(pwaName+'-Theme', 'light-mode');
				}
				function removeTransitions(){var falseTransitions = document.querySelectorAll('.btn, .header, #footer-bar, .menu-box, .menu-active'); for(let i = 0; i < falseTransitions.length; i++) {falseTransitions[i].style.transition = "all 0s ease";}}
				function addTransitions(){var trueTransitions = document.querySelectorAll('.btn, .header, #footer-bar, .menu-box, .menu-active'); for(let i = 0; i < trueTransitions.length; i++) {trueTransitions[i].style.transition = "";}}
				function setColorScheme() {
					const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
					const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
					const isNoPreference = window.matchMedia("(prefers-color-scheme: no-preference)").matches
					window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && activateDarkMode())
					window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && activateLightMode())
					if(isDarkMode) activateDarkMode();
					if(isLightMode) activateLightMode();
				}
				//Activating Dark Mode
				var darkModeSwitch = document.querySelectorAll('[data-toggle-theme]')
				darkModeSwitch.forEach(el => el.addEventListener('click',e =>{
					if(document.body.className == "theme-light"){ removeTransitions(); activateDarkMode();}
					else if(document.body.className == "theme-dark"){ removeTransitions(); activateLightMode();}
					setTimeout(function(){addTransitions();},350);
				}));
				//Set Color Based on Remembered Preference.
				if(localStorage.getItem(pwaName+'-Theme') == "dark-mode"){for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked="checked"};document.body.className = 'theme-dark';}
				if(localStorage.getItem(pwaName+'-Theme') == "light-mode"){document.body.className = 'theme-light';} if(document.body.className == "detect-theme"){setColorScheme();}
				//Detect Dark/Light Mode
				const darkModeDetect = document.querySelectorAll('.detect-dark-mode');
				darkModeDetect.forEach(el => el.addEventListener('click',e =>{
					document.body.classList.remove('theme-light', 'theme-dark');
					document.body.classList.add('detect-theme')
					setTimeout(function(){setColorScheme();},50)
				}))
			}
		if(localStorage.getItem(pwaName+'-Theme') == "dark-mode"){document.body.className = 'theme-dark';}
		if(localStorage.getItem(pwaName+'-Theme') == "light-mode"){document.body.className = 'theme-light';}
		//Detect Dark/Light Mode
		const darkModeDetect = document.querySelectorAll('.detect-dark-mode');
		darkModeDetect.forEach(el => el.addEventListener('click',e =>{
			document.body.classList.remove('theme-light', 'theme-dark');
			document.body.classList.add('detect-theme')
			setTimeout(function(){setColorScheme();},50)
		}))
		//Gradient Remember
		if(localStorage.getItem(pwaName+'-Gradient-Theme')){
			var getColor = localStorage.getItem(pwaName+'-Gradient-Theme');
			document.body.setAttribute('data-gradient', getColor);
		}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
			function activateMenus(){
				const menuActive = document.querySelectorAll('[data-menu-active]')[0];
				if(menuActive){
					var selectedMenu = menuActive.getAttribute('data-menu-active');
					document.querySelectorAll('#'+selectedMenu)[0].classList.add('active-nav');
					if(document.querySelectorAll('#'+selectedMenu)[0].parentNode.getAttribute('class') === "submenu"){
						var subId = '#' + document.querySelectorAll('#'+selectedMenu)[0].parentNode.getAttribute('id')
						var subData = document.querySelectorAll('#'+selectedMenu)[0].parentNode.getAttribute('id')
						var subSize = document.querySelectorAll(subId)[0].children.length;
						var subHeight = document.querySelectorAll(subId)[0].offsetHeight;
						document.querySelectorAll(subId)[0].style.transition = "all 250ms";
						document.querySelectorAll(subId)[0].style.height = (subSize*50)+26+'px';
						document.querySelectorAll('[data-submenu="'+subData+'"]')[0].classList.add('active-nav')
					}
				}
				document.querySelectorAll('[data-submenu]').forEach(function(e){
					var subID = e.getAttribute('data-submenu');
					var subChildren = document.getElementById(subID).children.length;
					var subtest = e.querySelectorAll('strong')[0];
					subtest.insertAdjacentHTML('beforeend', subChildren)
				});
				var submenuLink = document.querySelectorAll('[data-submenu]');
				submenuLink.forEach(el => el.addEventListener('click',e =>{
					el.classList.toggle('nav-item-active');
					var subData = el.getAttribute('data-submenu');
					var subId = '#'+subData
					var subSize = document.querySelectorAll(subId)[0].children.length;
					var subHeight = document.querySelectorAll(subId)[0].offsetHeight;
					if(subHeight === 0){
						document.querySelectorAll(subId)[0].style.transition = "all 250ms";
						document.querySelectorAll(subId)[0].style.height = (subSize*50)+26+'px';
					} else {
						document.querySelectorAll(subId)[0].style.transition = "all 250ms";
						document.querySelectorAll(subId)[0].style.height = "0px";
					}
				}));
			}
		//Back Button
		const backButton = document.querySelectorAll('[data-back-button]');
		if(backButton.length){
			backButton.forEach(el => el.addEventListener('click',e =>{
				e.stopPropagation;
				e.preventDefault;
				window.history.go(-1);
			}));
		}
		//Back to Top
		function backUp(){
			const backToTop = document.querySelectorAll('.back-to-top-icon, .back-to-top-badge, .back-to-top, [data-back-to-top]');
			if(backToTop){
				backToTop.forEach(el => el.addEventListener('click',e =>{
					window.scrollTo({ top: 0, behavior: `smooth` })
				}));
			}
		}
		//Check iOS Version and add min-ios15 class if higher or equal to iOS15
		function iOSversion() {
			let d, v;
			if (/iP(hone|od|ad)/.test(navigator.platform)) {
				v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
				d = {status: true, version: parseInt(v[1], 10), info: parseInt(v[1], 10)+'.'+parseInt(v[2], 10)+'.'+parseInt(v[3] || 0, 10)};
			}else{d = {status:false, version: false, info:''}}
			return d;
		}
		let iosVer = iOSversion();
		if (iosVer.version > 14) {document.querySelectorAll('#page')[0].classList.add('min-ios15');}
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
		//Adding Local Storage for Visited Links
		var checkVisited = document.querySelectorAll('.check-visited');
		if(checkVisited.length){
			function check_visited_links(){
				var visited_links = JSON.parse(localStorage.getItem(pwaName+'_Visited_Links')) || [];
				var links = document.querySelectorAll('.check-visited a');
				for (let i = 0; i < links.length; i++) {
					var that = links[i];
					that.addEventListener('click',function(e){
						var clicked_url = this.href;
						if (visited_links.indexOf(clicked_url)==-1) {
							visited_links.push(clicked_url);
							localStorage.setItem(pwaName+'_Visited_Links', JSON.stringify(visited_links));
						}
					})
					if (visited_links.indexOf(that.href)!== -1) {
						that.className += ' visited-link';
					}
				}
			}
			check_visited_links();
		}
		//Creating Offline Alert Messages
		var addOfflineClasses = document.querySelectorAll('.offline-message');
		if(!addOfflineClasses.length){
			const offlineAlert = document.createElement('p');
			const onlineAlert = document.createElement('p');
			offlineAlert.className = 'offline-message bg-red-dark color-white';
			offlineAlert.textContent = 'No internet connection detected';
			onlineAlert.className = 'online-message bg-green-dark color-white';
			onlineAlert.textContent = 'You are back online';
			document.getElementsByTagName('body')[0].appendChild(offlineAlert);
			document.getElementsByTagName('body')[0].appendChild(onlineAlert);
		}
		//Online / Offline Settings
		//Activating and Deactivating Links Based on Online / Offline State
		function offlinePage(){
			var anchorsDisabled = document.querySelectorAll('a');
			anchorsDisabled.forEach(function(e){
				var hrefs = e.getAttribute('href');
				if(hrefs.match(/.html/)){e.classList.add('show-offline'); e.setAttribute('data-link',hrefs); e.setAttribute('href','#');}
			});
			var showOffline = document.querySelectorAll('.show-offline');
			showOffline.forEach(el => el.addEventListener('click', event => {
				document.getElementsByClassName('offline-message')[0].classList.add('offline-message-active');
				setTimeout(function(){document.getElementsByClassName('offline-message')[0].classList.remove('offline-message-active');},1500)
			}));
		}
		function onlinePage(){
			var anchorsEnabled = document.querySelectorAll('[data-link]');
			anchorsEnabled.forEach(function (e) {
				var hrefs = e.getAttribute('data-link');
				if (hrefs.match(/.html/)) {e.setAttribute('href', hrefs); e.removeAttribute('data-link', '');}
			});
		}
		//Defining Offline/Online Variables
		var offlineMessage = document.getElementsByClassName('offline-message')[0];
		var onlineMessage = document.getElementsByClassName('online-message')[0];
		//Online / Offine Status
		function isOnline(){
			onlinePage(); onlineMessage.classList.add('online-message-active');
			setTimeout(function(){onlineMessage.classList.remove('online-message-active'); },2000)
			console.info( 'Connection: Online');
		}
		function isOffline(){
			offlinePage(); offlineMessage.classList.add('offline-message-active');
			setTimeout(function(){offlineMessage.classList.remove('offline-message-active'); },2000)
			console.info( 'Connection: Offline');
		}
		var simulateOffline = document.querySelectorAll('.simulate-offline');
		var simulateOnline = document.querySelectorAll('.simulate-online');
		if(simulateOffline.length){
			simulateOffline[0].addEventListener('click',function(){isOffline()});
			simulateOnline[0].addEventListener('click',function(){isOnline()});
		}
		//Check if Online / Offline
		function updateOnlineStatus(event) {var condition = navigator.onLine ? "online" : "offline"; isOnline(); }
		function updateOfflineStatus(event) {isOffline();}
		window.addEventListener('online',  updateOnlineStatus);
		window.addEventListener('offline', updateOfflineStatus);
		//iOS Badge
		const iOSBadge = document.querySelectorAll('.simulate-iphone-badge');
		iOSBadge.forEach(el => el.addEventListener('click',e =>{
			document.getElementsByClassName('add-to-home')[0].classList.add('add-to-home-visible', 'add-to-home-ios');
			document.getElementsByClassName('add-to-home')[0].classList.remove('add-to-home-android');
		}));
		//Android Badge
		const AndroidBadge = document.querySelectorAll('.simulate-android-badge');
		AndroidBadge.forEach(el => el.addEventListener('click',e =>{
			document.getElementsByClassName('add-to-home')[0].classList.add('add-to-home-visible', 'add-to-home-android');
			document.getElementsByClassName('add-to-home')[0].classList.remove('add-to-home-ios');
		}));
		//Remove Add to Home Badge
		const addToHomeBadgeClose = document.querySelectorAll('.add-to-home');
		addToHomeBadgeClose.forEach(el => el.addEventListener('click',e =>{
			document.getElementsByClassName('add-to-home')[0].classList.remove('add-to-home-visible');
		}));
		//Calling Functions Required After Menus are Loaded
		setTimeout(function(){
			menuFunction();
			checkDarkMode();
			activateMenus();
			card_extender();
			backUp();
		},500);
		//Detecting Mobile OS
		let isMobile = {
			Android: function() {return navigator.userAgent.match(/Android/i);},
			iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
			any: function() {return (isMobile.Android() || isMobile.iOS());}
		};
		const androidDev = document.getElementsByClassName('show-android');
		const iOSDev = document.getElementsByClassName('show-ios');
		const noDev = document.getElementsByClassName('show-no-device');
		if(!isMobile.any()){
			for (let i = 0; i < iOSDev.length; i++) {iOSDev[i].classList.add('disabled');}
			for (let i = 0; i < androidDev.length; i++) {androidDev[i].classList.add('disabled');}
		}
		if(isMobile.iOS()){
			document.querySelectorAll('#page')[0].classList.add('device-is-ios');
			for (let i = 0; i < noDev.length; i++) {noDev[i].classList.add('disabled');}
			for (let i = 0; i < androidDev.length; i++) {androidDev[i].classList.add('disabled');}
		}
		if(isMobile.Android()){
			document.querySelectorAll('#page')[0].classList.add('device-is-android');
			for (let i = 0; i < iOSDev.length; i++) {iOSDev[i].classList.add('disabled');}
			for (let i = 0; i < noDev.length; i++) {noDev[i].classList.add('disabled');}
		}
		//PWA Settings
		if(isPWA === true){
			var checkPWA = document.getElementsByTagName('html')[0];
			if(!checkPWA.classList.contains('isPWA')){
				if ('serviceWorker' in navigator) {
					window.addEventListener('load', function() {
						navigator.serviceWorker.register(pwaLocation, {scope: pwaScope}).then(function(registration){registration.update();})
					});
				}
				//Setting Timeout Before Prompt Shows Again if Dismissed
				var hours = pwaRemind * 24; // Reset when storage is more than 24hours
				var now = Date.now();
				var setupTime = localStorage.getItem(pwaName+'-PWA-Timeout-Value');
				if (setupTime == null) {
					localStorage.setItem(pwaName+'-PWA-Timeout-Value', now);
				} else if (now - setupTime > hours*60*60*1000) {
					localStorage.removeItem(pwaName+'-PWA-Prompt')
					localStorage.setItem(pwaName+'-PWA-Timeout-Value', now);
				}
				const pwaClose = document.querySelectorAll('.pwa-dismiss');
				pwaClose.forEach(el => el.addEventListener('click',e =>{
					const pwaWindows = document.querySelectorAll('#menu-install-pwa-android, #menu-install-pwa-ios');
					for(let i=0; i < pwaWindows.length; i++){pwaWindows[i].classList.remove('menu-active');}
					localStorage.setItem(pwaName+'-PWA-Timeout-Value', now);
					localStorage.setItem(pwaName+'-PWA-Prompt', 'install-rejected');
					console.log('PWA Install Rejected. Will Show Again in '+ (pwaRemind)+' Days')
				}));
				//Trigger Install Prompt for Android
				const pwaWindows = document.querySelectorAll('#menu-install-pwa-android, #menu-install-pwa-ios');
				if(pwaWindows.length){
					if (isMobile.Android()) {
						if (localStorage.getItem(pwaName+'-PWA-Prompt') != "install-rejected") {
							function showInstallPrompt() {
								setTimeout(function(){
									if (!window.matchMedia('(display-mode: fullscreen)').matches) {
										console.log('Triggering PWA Window for Android')
										document.getElementById('menu-install-pwa-android').classList.add('menu-active');
										document.querySelectorAll('.menu-hider')[0].classList.add('menu-active');
									}
								},3500);
							}
							var deferredPrompt;
							window.addEventListener('beforeinstallprompt', (e) => {
								e.preventDefault();
								deferredPrompt = e;
								showInstallPrompt();
							});
						}
						const pwaInstall = document.querySelectorAll('.pwa-install');
						pwaInstall.forEach(el => el.addEventListener('click', e => {
							deferredPrompt.prompt();
							deferredPrompt.userChoice
								.then((choiceResult) => {
									if (choiceResult.outcome === 'accepted') {
										console.log('Added');
									} else {
										localStorage.setItem(pwaName+'-PWA-Timeout-Value', now);
										localStorage.setItem(pwaName+'-PWA-Prompt', 'install-rejected');
										setTimeout(function(){
											if (!window.matchMedia('(display-mode: fullscreen)').matches) {
												document.getElementById('menu-install-pwa-android').classList.remove('menu-active');
												document.querySelectorAll('.menu-hider')[0].classList.remove('menu-active');
											}
										},50);
									}
									deferredPrompt = null;
								});
						}));
						window.addEventListener('appinstalled', (evt) => {
							document.getElementById('menu-install-pwa-android').classList.remove('menu-active');
							document.querySelectorAll('.menu-hider')[0].classList.remove('menu-active');
						});
					}
					//Trigger Install Guide iOS
					if (isMobile.iOS()) {
						if (localStorage.getItem(pwaName+'-PWA-Prompt') != "install-rejected") {
							setTimeout(function(){
								if (!window.matchMedia('(display-mode: fullscreen)').matches) {
									console.log('Triggering PWA Window for iOS');
									document.getElementById('menu-install-pwa-ios').classList.add('menu-active');
									document.querySelectorAll('.menu-hider')[0].classList.add('menu-active');
								}
							},3500);
						}
					}
				}
			}
			checkPWA.setAttribute('class','isPWA');
		}
		//End of isPWA
		if(pwaNoCache === true){
			caches.delete('workbox-runtime').then(function() {});
			sessionStorage.clear()
			caches.keys().then(cacheNames => {
				cacheNames.forEach(cacheName => {
					caches.delete(cacheName);
				});
			});
		}
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
	//Fix Scroll for AJAX pages.
	if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
	//End of Init Template
	if(isAJAX === true){
		if(window.location.protocol !== "file:"){
			const options = {
				containers: ["#page"],
				cache:false,
				animateHistoryBrowsing: false,
				plugins: [
					new SwupPreloadPlugin()
				],
				linkSelector:'a:not(.external-link):not(.default-link):not([href^="https"]):not([href^="http"]):not([data-gallery])'
			};
			const swup = new Swup(options);
			document.addEventListener('swup:pageView',(e) => { init_template(); })
		}
	}
	init_template();
});

