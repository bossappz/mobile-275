Lockr.prefix = 'lockr_';
COOKIE_USER='biz_user';
DEVICE_TYPE_IOS='iOS';
DEVICE_TYPE_ANDROID='Android';

DT_BLANK='blank_biz';
DT_BLOG_POST='blog_post_biz';
DT_CATEGORY='category_biz';
DT_EVENT='event_biz';
DT_GALLERY='gallery_biz';
DT_ITEM='item_biz';
DT_MEMBER='member_biz';
DT_PHOTO='photo_biz';
DT_PRODUCT='product_biz';
DT_REVIEW='review_biz';
DT_SERVICE='service_biz';
DT_SPORT='sport_biz';
DT_SPORT_STAT="sport_stat_biz";
DT_GAME='game_biz';
DT_TEAM='team_biz';
DT_PLAYER='player_biz';
DT_COACH='coach_biz';
DT_PAGE='page';
PAYMENT_TYPE_PAY_NOW='pay_now';
PAYMENT_TYPE_CASHAPP='cashapp';
PAYMENT_TYPE_ON_DELIVERY='pay_on_delivery';
NOTIFICATION_SUBSCRIBE_ALL='mobile_all';
NOTIFICATION_SUBSCRIBE_ADMIN='mobile_admin';
NOTIFICATION_SUBSCRIBE_GUEST='mobile_guest';
STAT_VIEW_ID='1';
STAT_LIKE_ID='2';
STAT_POST_ID='3';
// BIZ PROCCESSING START --
function get_new_item(data_type,tbl_id){
    if(!data_type){
        data_type=DT_BLANK;
    }
    if(!tbl_id){
        tbl_id=0;
    }
    return {data_type:data_type,tbl_id:tbl_id};
}
function filter_visible_list(item_list){
    var r_item_list=[];
    for(var a=0;a<item_list.length;a++){
        if(item_list[a].data_type==DT_BLOG_POST || item_list[a].data_type==DT_GALLERY){
            if(item_list[a].visible=='true'){
                r_item_list.push(item_list[a]);
            }
        }
        else{
            r_item_list.push(item_list[a]);
        }
    }
    return r_item_list;
}
function set_notification_subscribe(notification_title){
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
        cordova.plugins.firebase.messaging.requestPermission({forceShow: true}).then(function() {
            //alert("You'll get foreground notifications when a push message arrives");
        });
        cordova.plugins.firebase.messaging.subscribe(notification_title);
        /*
        cordova.plugins.firebase.messaging.onMessage(function(payload) {
            //alert("New foreground FCM message: "+ payload);
        });
        cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) {
            //alert("New background FCM message: "+ payload);
        });
        cordova.plugins.firebase.messaging.requestPermission({forceShow: true}).then(function() {
            //alert("You'll get foreground notifications when a push message arrives");
        });
        cordova.plugins.firebase.messaging.getToken().then(function(token) {
            //alert("Got device token: "+ token);
        });
        //alert('set subscribe 3');
        */
    }
}
// BIZ PROCCESSING END --
// AUDIO PROCCESSING START --
function file_mp3_select(call){
    if(device.platform==DEVICE_TYPE_IOS){
        window.FilePicker.pickFile(successCallback,errorCallback);
        function successCallback(uri) {
            var fileURL = String(uri);
            upload_mp3(fileURL,function(data){
                call(data);
            });
        }
        function errorCallback(error){
            alert(error);
        }
    }else{
        fileChooser.open({mime: 'audio/mpeg'},function(uri) {
            var fileURL = String(uri);
            upload_mp3(fileURL,function(data){
                call(data);
            });
        });
    }
}
function upload_mp3(fileURI,call) {
    show_page_spinner();
    var ft = new FileTransfer();
    url="cloud/file/update_mp3";
    ft.upload(fileURI, encodeURI(get_cloud_url(url,[])), uploadMP3Success, fail, {});
    function fail(error) {
        hide_page_spinner();
        alert("An error has occurred: Code = " + error.code);
        //alert("upload error source " + error.source);
        //alert("upload error target " + error.target);
    }
    function uploadMP3Success(r) {
        hide_page_spinner();
        res=JSON.parse(r.response);
        if(res.helper.validation_message){
            alert(res.helper.validation_message);
        }else{
            call(res.helper.item);
        }
    }
}
// AUDIO PROCCESSING END --
// PHOTO PROCCESSING START --
function camera_photo_select(call){
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 100,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true
    });
    function onSuccess(imageData) {
        plugins.crop(function success (data) {
            upload_photo(data,function(data){
                call(data);
            });
        },
            function fail() {
            }, imageData, {quality:100});
    }
    function onFail(message) {
        alert("An error has occurred: = " + message);
    }
}
function upload_photo(imageURI,call) {
    show_page_spinner();
    var ft = new FileTransfer();
    url="cloud/file/update_photo";
    ft.upload(imageURI, encodeURI(get_cloud_url(url,[])),uploadSuccess, fail, {});
    function fail(error) {
        hide_page_spinner();
        alert("An error has occurred: Code = " + error.code);
        //alert("upload error source " + error.source);
        //alert("upload error target " + error.target);
    }
    function uploadSuccess(r) {
        hide_page_spinner();
        res=JSON.parse(r.response);
        if(res.helper.error){
            alert(res.helper.error)
        }else{
            call(res.helper.item);
        }
    }
}
// PHOTO PROCCESSING END --
// USER PROCCESSING START --
function get_user(){
    new_user=false;
    user=cookie_get(COOKIE_USER);
    if(!user||!user.customer_id){
        user={customer_id:get_id(99999)};
        set_user(user);
    }
    return user;
}
function set_user(item){
    cookie_set(COOKIE_USER,item);
}
// USER PROCCESSING END --
// CLOUD START PROCCESSING START --
//query_list={title:'my_title',value:'my_value'};
function get_cloud_url(url,query_list){
    var str='';
    query_start='?app_title_id='+APP_TITLE_ID;
    for(a=0;a<query_list.length;a++){
        str=str+"&"+query_list[a].title+"="+query_list[a].value;
    }
    return CLOUD_URL+"/"+url+query_start+str;
}
function cloud_get(data_type,tbl_id,call){
    url=get_cloud_full_url('cloud/crud/get/'+data_type+'/'+tbl_id);
    cloud_get_url(url,{},function(data){
        call(data);
    });
}
function cloud_update(data_type,tbl_id,params,call){
    url=get_cloud_full_url('cloud/crud/update/'+data_type+'/'+tbl_id);
    cloud_post_url(url,params,function(data){
        call(data);
    });
}
function cloud_update_biz(data_type,tbl_id,params,call){
    url=get_cloud_full_url('cloud/crud/update_biz/'+data_type+'/'+tbl_id);
    cloud_post_url(url,params,function(data){
        call(data);
    });
}
function cloud_delete(data_type,tbl_id,call){
    url=get_cloud_full_url('cloud/crud/delete/'+data_type+'/'+tbl_id);
    cloud_post_url(url,{},function(data){
        call(data);
    });
}
function get_cloud_full_url(url){
    return CLOUD_URL +"/"+url+"?app_title_id="+APP_TITLE_ID;
}
function cloud_post_url(url,params,call){
    //$.post(get_cloud_full_url(url),params,function(data){
    $.post(url,params,function(data){
        w('biz_cloud_cloud_url',url);
        w('biz_cloud_cloud_data',data);
        call(data.helper);
    }).fail(function() {
        alert('Network connection fail. Cannot connect to server!')
        alert(url);
    });
}
function cloud_get_url(url,params,call){
    //$.get(get_cloud_full_url(url),params,function(data){
    $.get(url,params,function(data){
        w('biz_cloud_url',url);
        w('biz_cloud_data',data);
        call(data.helper);
    }).fail(function() {
        alert('Network connection fail. Cannot connect to server!')
        alert(url);
    });
}
//-- OTHER START --
function set_pull_down(){
    PullToRefresh.init({
        mainElement: 'body',
        onRefresh: function(){ window.location.reload(); }
    });
}
//-- OTHER END --
