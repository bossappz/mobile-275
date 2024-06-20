//-- ORDER PROCESSING START 9_cart 9_order_cart --
//9_checkout 9_order_checkout_summary //9_summary //9_order_checkout_summary
function cloud_order_cart_add(data_type,tbl_id,options,quantity){
    var url = "order/cart_add/"+ data_type +"/"+tbl_id+"/"+get_user().customer_id+"/"+ quantity;
    cloud_post_url(get_cloud_url(url,[]),options,function(data){
    });
}
function set_order_cart_top(cart){
    if(cart.item_list.length>0){
        bind_cart_list(cart.item_list);
        bind_cart_event();
        $('#biz_lbl_cart_grand_total').html(cart.price.grand_total);
        show_biz_cart();
    }else{
        hide_biz_cart();
        $('#biz_lbl_cart_empty_title').html("Your Shopping Cart Is Empty.");
    }

    function bind_cart_list(item_list){
        var str="";
        for(a=0;a<item_list.length;a++){
            if(item_list[a].money_obj.old_price=='$0.00'){
                item_list[a].money_obj.old_price='';
            }else{
                item_list[a].money_obj.old_price='Was '+ item_list[a].money_obj.old_price;
            }
            if(item_list[a].cart_note_html=='Invalid date'){
                item_list[a].cart_note_html='No Date Specified';
            }
            str=str+"<div id='biz_cart_row_"+item_list[a].tbl_id+"' class='d-flex mb-4'>"+
                "<div>"+
                "<img src='"+item_list[a].photo_obj.mid_url+"' width='90'> <br/>"+
                "</div>"+
                "<div class='w-100'>"+
                "<h5 class='font-14 ps-3 color-black'>"+item_list[a].title+"</h5>";
                //"<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+item_list[a].option_note_html+"</p>";
            if(item_list[a].cart_note_html){
                str = str+"<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+item_list[a].cart_note_html+"</p>";
            }
            str = str+"<a href='#'  data_type='"+item_list[a].data_type+"' tbl_id='"+item_list[a].tbl_id+"' class='biz_btn_cart_remove ps-3 color-black pt-2 d-block font-10'><i class='fa-solid fa-trash'></i></a>"+
                "</div>"+
                "<div class='ms-auto text-end'>"+
                "<h5 class='ps-3 font-14'>"+item_list[a].sub_total+"</h5>"+
                "<p class='ps-3 mt-n2 opacity-50 font-11'>"+item_list[a].money_obj.old_price+"</p>"+
                "<div class='stepper rounded-s switch-s me-n2 mt-n2'>"+
                "<a href='#' class='stepper-sub biz_btn_quantity_update' update_type='down' data_type='"+item_list[a].data_type+"' tbl_id='"+item_list[a].tbl_id+"'><i class='fa fa-minus color-theme opacity-40'></i></a>"+
                "<input type='number' min='1' max='99' id='biz_tb_cart_quantity_"+item_list[a].tbl_id+"' value='"+item_list[a].quantity+"'>"+
                "<a href='#' class='stepper-add biz_btn_quantity_update' update_type='up' data_type='"+item_list[a].data_type+"' tbl_id='"+item_list[a].tbl_id+"' tbl_id='"+item_list[a].tbl_id+"'><i class='fa fa-plus color-theme opacity-40'></i></a>"+
                "</div>"+
                "<div class='clearfix'></div>"+
                "</div>"+
                "</div>";
        }
        $('#biz_lbl_cart_top_list').html('');
        $('#biz_lbl_cart_top_list').html(str);
    }
    function bind_cart_event(){
        $(".biz_btn_quantity_update").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            update_type = $(this).attr('update_type');
            quantity=parseInt($('#biz_tb_cart_quantity_'+tbl_id).val());
            if(update_type=='up'){
                quantity=quantity+1;
            }
            if(update_type=='down'){
                quantity=quantity-1;
            }
            if(quantity>0){
                url = "order/cart_update/"+get_user().customer_id+"/"+tbl_id+"/"+quantity;
                cloud_post_url(get_cloud_url(url,[]),{},function(data){
                    set_order_cart_top(data.cart);
                });
            }
        });
        $(".biz_btn_cart_remove").click(function(){
            tbl_id = $(this).attr('tbl_id');
            data_type = $(this).attr('data_type');
            if(confirm("Delete?") == true){
                url = "order/cart_remove/"+get_user().customer_id+"/"+tbl_id;
                cloud_post_url(get_cloud_url(url,[]),{},function(data){
                    $('#biz_cart_row_'+tbl_id).remove();
                    set_order_cart_top(data.cart);
                });
            }
        });
    }
}
function set_page_order_checkout_summary(data){
    hide_page_cart_top();
    bind_detail(data.cart);
    bind_order_checkout_summary_event();
    init_stepper();
    hide_page_spinner();
    function bind_detail(cart){
        str='';
        for(var a=0;a<cart.item_list.length;a++){
            url='';
            if(cart.item_list[a].data_type==DT_PRODUCT){
                url='product_detail.html';
            }else if(cart.item_list[a].data_type==DT_SERVICE){
                url='service_detail.html';
            }else if(cart.item_list[a].data_type==DT_EVENT){
                url='event_detail.html';
            }
            if(cart.item_list[a].money_obj.old_price=='$0.00'){
                cart.item_list[a].money_obj.old_price='';
            }
            else{
                cart.item_list[a].money_obj.old_price=String(cart.item_list[a].money_obj.old_price);
            }
            if(cart.item_list[a].money_obj.discount=='0%'){
                cart.item_list[a].money_obj.discount='';
            }else{
                cart.item_list[a].money_obj.discount=String(cart.item_list[a].money_obj.discount) + " - Discount";
            }
            str=str+"<div class='d-flex mb-4' id='biz_cart_row_"+cart.item_list[a].tbl_id+"'>"+
                "<div>"+
                "<a href='"+url+"?"+cart.item_list[a].tbl_id+"'><img src='"+cart.item_list[a].photo_obj.mid_url+"' width='90'></a> <br>"+
                "<a href='#' class='color-black text-center pt-2 d-block font-10 biz_btn_cart_remove' tbl_id='"+cart.item_list[a].tbl_id+"'   data_type='"+cart.item_list[a].data_type+"' ><i class='fa-solid fa-trash'></i></a>"+
                "</div>"+
                "<div class='w-100'>"+
                "<h5 class='font-15 ps-3'>"+cart.item_list[a].title+"</h5>"+
                //"<div class='font-12 ps-3'>"+cart.item_list[a].money_obj.price+"</div>"+
                "<div class='font-12 ps-3'>"+cart.item_list[a].cart_note_html+"</div>"+
                "<span class='color-green-dark font-12 ps-3'><del>"+cart.item_list[a].money_obj.old_price+"</del> "+cart.item_list[a].money_obj.discount+" </span>"+
                "<br>"+
                "<div class='stepper rounded-s mt-2 ms-3'>"+
                "<a href='#' class='stepper-sub biz_btn_summary_quantity_update' update_type='down' data_type='"+cart.item_list[a].data_type+"' tbl_id='"+cart.item_list[a].tbl_id+"'><i class='fa fa-minus color-theme opacity-40'></i></a>"+
                "<input type='number' min='1' max='99' id='biz_tb_cart_summary_quantity_"+cart.item_list[a].tbl_id+"' value='"+cart.item_list[a].quantity+"'>"+
                "<a href='#' class='stepper-add biz_btn_summary_quantity_update' update_type='up' data_type='"+cart.item_list[a].data_type+"' tbl_id='"+cart.item_list[a].tbl_id+"' tbl_id='"+cart.item_list[a].tbl_id+"'><i class='fa fa-plus color-theme opacity-40'></i></a>"+
                "</div>"+
                "<h5 class='font-700 text-end float-end mt-n4 pt-1 no-click'>"+cart.item_list[a].sub_total+"</h5>"+
                "</div>"+
                "</div>"+
                "<div class='divider'></div>";
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        bind_order_checkout_summary(cart);
    }
    function bind_order_checkout_summary(cart){
        $('#biz_lbl_quantity').html(cart.price.quantity);
        $('#biz_lbl_sub_total').html(cart.price.sub_total);
        $('#biz_lbl_shipping').html(cart.price.shipping_total);
        $('#biz_lbl_discount').html(cart.price.discount_total);
        $('#biz_lbl_grand_total').html(cart.price.grand_total);
    }
    function bind_order_checkout_summary_event(){
        $(".biz_btn_summary_quantity_update").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            update_type = $(this).attr('update_type');
            quantity=parseInt($('#biz_tb_cart_summary_quantity_'+tbl_id).val());
            if(update_type=='up'){
                quantity=quantity+1;
            }
            if(update_type=='down'){
                quantity=quantity-1;
            }
            if(quantity>0){
                url = "order/cart_update/"+get_user().customer_id+"/"+tbl_id+"/"+quantity;
                cloud_post_url(get_cloud_url(url,[]),{},function(data){
                    bind_order_checkout_summary(data.cart);
                });
            }
        });
        $(".biz_btn_cart_remove").click(function() {
            tbl_id = $(this).attr('tbl_id');
            data_type = $(this).attr('data_type');
            if (confirm("Delete?") == true) {
                url = "order/cart_remove/"+get_user().customer_id+"/"+tbl_id;
                cloud_post_url(get_cloud_url(url,[]),{},function(data){
                    $('#biz_cart_row_'+tbl_id).remove();
                    bind_order_checkout_summary(data.cart);
                });
            }
        });
    }
}
//9_order_checkout 9_submit
function set_page_order_checkout_submit(data){
    if(TEST_MODE=="true"){
        bind_checkout_test();
    }
    hide_checkout();
    bind_detail(data);
    bind_checkout_detail(data);
    init_form();
    bind_checkout_event();
    init_stepper();
    hide_page_spinner();

    function bind_detail(data){
        hide_page_cart_top();

    }
    function hide_checkout(){
        $('#biz_div_card_creditcard').hide();
        $('#biz_div_card_cashapp').hide();
        $('#biz_div_card_shipping').hide();
        $('#bjz_btn_submit_order').hide();
        $("#biz_btn_submit_order").hide();
    }
    function bind_checkout_detail(data){
        $('#biz_div_list').html('');
        $('#biz_lbl_quantity').html(data.cart.price.quantity);
        $('#biz_lbl_sub_total').html(data.cart.price.sub_total);
        $('#biz_lbl_shipping').html(data.cart.price.shipping_total);
        $('#biz_lbl_discount').html(data.cart.price.discount_total);
        $('#biz_lbl_grand_total').html(data.cart.price.grand_total);
        $("#biz_lbl_cashapp_handler").html(data.info.business_cashapp);
        $("#biz_div_checkout_payment_type").hide();
        $("#biz_div_checkout_email").hide();
        var show_payment=false;
        var str="<option value='blank'>Make A Selection</option>";
        if(data.info.business_cashapp_visible=='true'){
            str=str+"<option value='"+PAYMENT_TYPE_CASHAPP+"'>Cash App</option>";
            show_payment=true;
        }
        if(data.info.business_stripe_visible=='true'){
            str=str+"<option value='"+PAYMENT_TYPE_PAY_NOW+"'>Pay Now</option>";
            show_payment=true;
        }
        if(data.info.business_payondelivery_visible=='true'){
            str=str+"<option value='"+PAYMENT_TYPE_ON_DELIVERY+"'>Pay on Delivery</option>";
            show_payment=true;
        }
        if(show_payment){
            $('#biz_sel_order_payment_type').html(str);
            $("#biz_div_checkout_payment_type").show();
            $("#biz_div_checkout_email").show();
        }
        var str='';
        for(a=1;a<13;a++){
            str=str+"<option value='"+a+"'>"+a+"</option>";
        }
        $('#biz_sel_billing_card_month').html(str);
        var str='';
        for(a=2023;a<2092;a++){
            str=str+"<option value='"+a+"'>"+a+"</option>";
        }
        $('#biz_sel_billing_card_year').html(str);

        $("#biz_sel_order_payment_type").change(function() {
            payment_type=$("#biz_sel_order_payment_type option:selected").val();
            if(payment_type==PAYMENT_TYPE_PAY_NOW){
                $("#biz_btn_submit_order").show();
                $("#biz_div_card_cashapp").hide();
                $("#biz_div_card_creditcard").show();
                $("#biz_div_card_shipping").show();
                $("#biz_btn_submit_order").show();
            }else if(payment_type==PAYMENT_TYPE_CASHAPP){
                $("#biz_btn_submit_order").show();
                $("#biz_div_card_cashapp").show();
                $("#biz_div_card_creditcard").hide();
                $("#biz_div_card_shipping").show();
                $("#biz_btn_submit_order").show();
            }else if(payment_type==PAYMENT_TYPE_ON_DELIVERY){
                $("#biz_btn_submit_order").show();
                $("#biz_div_card_cashapp").hide();
                $("#biz_div_card_creditcard").hide();
                $("#biz_div_card_shipping").show();
                $("#biz_btn_submit_order").show();
            }
        });
    }
    function bind_checkout_event(){
        $("#biz_btn_submit_order").click(function() {
            hide_toast();
            var obj={};
            obj.customer_id=get_user().customer_id;
            obj.email=$("#biz_tb_checkout_email").val()
            obj.first_name = $("#biz_tb_shipping_first_name").val()
            obj.last_name = $("#biz_tb_shipping_last_name").val()
            obj.company = $("#biz_tb_shipping_company").val()
            obj.address = $("#biz_tb_shipping_address").val()
            obj.phone = $("#biz_tb_shipping_phone").val()
            obj.city = $("#biz_tb_shipping_city").val()
            obj.state = $("#biz_sel_shipping_state").val()
            obj.country = $("#biz_sel_shipping_country").val()
            obj.zip = $("#biz_tb_shipping_zip").val()
            obj.payment_type=$("#biz_sel_order_payment_type option:selected").val();
            if(obj.payment_type==PAYMENT_TYPE_CASHAPP){
                url = "order/checkout/cashapp/"+get_user().customer_id;
                obj.note= 'CashApp: '+ $("#biz_lbl_cashapp_handler").html()+  ' Please include your email in CashApp Note. Once payment has been confirmed. Your order will be shipped.'
            }
            else if(obj.payment_type==PAYMENT_TYPE_PAY_NOW){
                url = "order/checkout/stripecard/"+get_user().customer_id;
                obj.card_number = $("#biz_tb_billing_card_number").val()
                obj.card_month = $("#biz_sel_billing_card_month").val()
                obj.card_year = $("#biz_sel_billing_card_year").val()
                obj.card_cvc = $("#biz_tb_billing_card_cvc").val()
                obj.note='Proccessed by stripe.com';
            }
            else if(obj.payment_type==PAYMENT_TYPE_ON_DELIVERY){
                url = "order/checkout/payondelivery/"+get_user().customer_id;
                obj.note= 'Your package will be shipped shortly. Please submit payment once your package is received.';
            }
            var order = get_order_checkout(obj);
            if(!validate_email(obj.email)){
                show_toast_error('Please enter a valid email');
            }else if(!obj.first_name){
                show_toast_error('Please enter a valid first name');
            }else if(!obj.city){
                show_toast_error('Please enter a valid city');
            }else{
                cloud_post_url(get_cloud_url(url,[]),order,function(data){
                    if(data.validation_message){
                        $("#biz_btn_submit_order").show();
                        show_toast_error(data.validation_message);
                    }else{
                        window.location='order_checkout_success.html?order_id='+data.order.order_id;
                    }
                });
            }
            return false;
        });
        $(".biz_btn_cart_remove").click(function() {
            tbl_id = $(this).attr('tbl_id');
            data_type = $(this).attr('data_type');
            if (confirm("Delete?") == true) {
                url = "order/cart_remove/"+get_user().customer_id+"/"+tbl_id;
                cloud_post_url(get_cloud_url(url,[]),{},function(data){
                    $('#biz_cart_row_'+tbl_id).remove();
                    set_order_cart_top(data.cart);
                });
            }
        });
        $(".biz_btn_quantity_update").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            update_type = $(this).attr('update_type');
            quantity=parseInt($('#biz_tb_cart_quantity_'+tbl_id).val());
            if(update_type=='up'){
                quantity=quantity+1;
            }
            if(update_type=='down'){
                quantity=quantity-1;
            }
            if(quantity>0){
                url = "order/cart_update/"+get_user().customer_id+"/"+tbl_id+"/"+quantity;
                cloud_post_url(get_cloud_url(url,[]),{},function(data){
                    set_order_cart_top(data.cart);
                });
            }
        });
        $("#biz_btn_cart_checkout").click(function() {
            window.location='order_checkout_summary.html';
        });
    }
    function bind_checkout_test(){
        //test-start
        //$('#biz_tb_checkout_email').val(get_id(999)+'_email@gmail.com');
        $('#biz_tb_checkout_email').val('bossappz6@gmail.com');
        $('#biz_tb_billing_card_number').val('4242424242424242');
        $('#biz_sel_billing_card_month').val('2');
        $('#biz_tb_billing_card_zip').val('30033');
        $('#biz_tb_billing_card_cvc').val('333');
        $('#biz_sel_billing_card_year').val('2025');
        $('#biz_tb_shipping_first_name').val(get_id(999)+'_FName');
        $('#biz_tb_shipping_last_name').val(get_id(999)+'_LName');
        $('#biz_tb_shipping_company').val(get_id(999)+'_Company');
        $('#biz_tb_shipping_city').val(get_id(999)+'_City');
        $('#biz_tb_shipping_address').val(get_id(999)+'_Address 123 St' );
        $('#biz_tb_shipping_zip').val(get_id(99999));
        $('#biz_tb_shipping_phone').val('123-444-5544');
        //test-end
    }
}

function show_biz_cart(){
    $('#biz_btn_cart_checkout').show();
    $('#biz_lbl_cart_total').show();
    $('#biz_lbl_cart_top_list').show();
    $('#biz_lbl_cart_empty_title').hide();
}
function hide_biz_cart(){
    $('#biz_btn_cart_checkout').hide();
    $('#biz_lbl_cart_total').hide();
    $('#biz_lbl_cart_top_list').hide();
    $('#biz_lbl_cart_empty_title').show();
}
function get_order_checkout(checkout_form){
    return{
        //customer
        customer_email:checkout_form.email?(checkout_form.email):'n/a',
        //shipping
        shipping_first_name:checkout_form.first_name?(checkout_form.first_name):'n/a',
        shipping_last_name:checkout_form.last_name?(checkout_form.last_name):'n/a',
        shipping_company:checkout_form.company?(checkout_form.company):'n/a',
        shipping_address:checkout_form.address?(checkout_form.address):'n/a',
        shipping_city:checkout_form.city?(checkout_form.city):'n/a',
        shipping_state:checkout_form.state?(checkout_form.state):'n/a',
        shipping_zip:checkout_form.zip?(checkout_form.zip):'n/a',
        shipping_country:checkout_form.country?(checkout_form.country):'n/a',
        shipping_phone:checkout_form.phone?(checkout_form.phone):'n/a',
        //billing
        billing_card_number:checkout_form.card_number?(checkout_form.card_number):'n/a',
        billing_card_month:checkout_form.card_month?(checkout_form.card_month):'n/a',
        billing_card_cvc:checkout_form.card_cvc?(checkout_form.card_cvc):'n/a',
        billing_card_year:checkout_form.card_year?(checkout_form.card_year):'n/a',
        billing_payment_type:checkout_form.payment_type?(checkout_form.payment_type):'n/a',
        billing_note:checkout_form.note?(checkout_form.note):'n/a ',
        billing_link:checkout_form.link?(checkout_form.link):'n/a',
    }
}

//9_checkout 9_order_checkout_success //9_success //9_order_checkout_success
function set_page_order_checkout_success(data){
    bind_checkout_success(data);
    bind_checkout_order_list(data.order.order_item_list);
    hide_page_spinner();
    function bind_checkout_success(){
        $('#biz_lbl_business_name').html(data.info.business_name);
        $('#biz_lbl_order_id').html(data.order.order_id);
        $('#biz_lbl_order_email').html(data.order.customer_email);
        $('#biz_lbl_quantity').html(data.order.quantity);
        $('#biz_lbl_sub_total').html(data.order.sub_total);
        $('#biz_lbl_shipping').html(data.order.shipping_total);
        $('#biz_lbl_discount').html(data.order.discount_total);
        $('#biz_lbl_grand_total').html(data.order.grand_total);
        $('#biz_lbl_email').html(data.order.customer_email);
        $('#biz_lbl_payment_type').html(data.order.billing_note);
        $('#biz_lbl_first_name').html(data.order.shipping_first_name);
        $('#biz_lbl_last_name').html(data.order.shipping_last_name);
        $('#biz_lbl_company').html(data.order.shipping_company);
        $('#biz_lbl_address').html(data.order.shipping_address);
        $('#biz_lbl_country').html(data.order.shipping_country);
        $('#biz_lbl_city').html(data.order.shipping_city);
        $('#biz_lbl_state').html(data.order.shipping_state);
        $('#biz_lbl_zip').html(data.order.shipping_zip);
    }
    function bind_checkout_order_list(item_list){
        str='';
        for(var a=0;a<item_list.length;a++){
            option_note_html='';
            if(item_list[a].option_note_html){
                option_note_html= "<div class='font-12 ps-3'>"+item_list[a].option_note_html+"</div>";
            }
            str=str+"<div class='d-flex mb-4' id='biz_cart_row_"+item_list[a].tbl_id+"'>"+
                "<div>"+
                "<img src='"+item_list[a].photo_obj.mid_url+"' width='90'> <br>"+
                "</div>"+
                "<div class='w-100'>"+
                "<h5 class='font-15 ps-3'>"+item_list[a].title+"</h5>"+
                "<div class='font-12 ps-3'><b>"+item_list[a].quantity+"x<b/> Item</div>"+
                option_note_html+
                "<div class='font-12 ps-3'>"+item_list[a].cart_note_html+"</div>"+
                "<span class='color-green-dark font-12 ps-3'><del>"+item_list[a].old_price+"</del> - "+item_list[a].discount+" Discount</span>"+
                "<br>"+
                "<h5 class='font-700 text-end float-end mt-n4 pt-1 no-click'>"+item_list[a].sub_total+"</h5>"+
                "</div>"+
                "</div>"+
                "<div class='divider'></div>";
        }
        $('#biz_lbl_order_list').html(str);
    }
}

//9_order_list
function set_page_order_dashboard_list(data){
    hide_page_footer();
    hide_page_cart_top();
    bind_detail(data);
    bind_list(data.order_list,data.page_current,data.page_count);
    hide_page_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Orders');
    }
    function bind_list(item_list,page_current,page_count){
        var str='';
        for(var a=0;a<item_list.length;a++){
            date_str=item_list[a].date_obj.month_create+" "+item_list[a].date_obj.date_create+ ", "+item_list[a].date_obj.year_create +' ' + item_list[a].date_obj.time_create;
            ship_full_name = item_list[a].shipping_first_name + " " + item_list[a].shipping_last_name;
            ship_company = item_list[a].shipping_company;
            ship_company = item_list[a].shipping_company;
            ship_address=  item_list[a].shipping_address  + " "
                +  item_list[a].shipping_city  + " "
                +  item_list[a].shipping_state  + "<br/> "
                +  item_list[a].shipping_country;
            customer_email = item_list[a].customer_email ? (item_list[a].customer_email) : "N/A";
            customer_phone = item_list[a].shipping_phone ? (item_list[a].shipping_phone) : "N/A";
            bill_payment_type = item_list[a].billing_note;
            quantity = item_list[a].quantity;
            sub_total = item_list[a].sub_total;
            shipping = item_list[a].shipping_total;
            discount = item_list[a].discount_total;
            grand_total = item_list[a].grand_total;
            if(String(item_list[a].status_id)=='0' || !item_list[a].status_id){
                item_list[a].status = "<span class='color-red-dark'>Open</span>";
            }else if(String(item_list[a].status_id)=='1'){
                item_list[a].status = "<span class='color-green-dark'>Shipped</span>";
            }
            var str_product='';
            for(var b=0;b<item_list[a].order_item_list.length;b++){
                item_order= item_list[a].order_item_list[b];
                item_order.option_note_html = item_order.option_note_html ? item_order.option_note_html : ' ' ;
                item_order.cart_note_html = item_order.cart_note_html ? item_order.cart_note_html : ' '
                str_product = str_product+"<div class='d-flex mb-3'>"+
                    "<div>"+
                    "<img src='"+item_order.photo_obj.square_mid_url+"' width='90' class='rounded-s shadow-xl'>"+
                    "</div>"+
                    "<div class='ps-3 w-100'>"+
                    "<h1 class='font-20 mb-n3'>"+item_order.title+" (" +item_order.money_obj.price + ")</h1>"+
                    "<p class='mb-2 pt-2'><b>"+item_order.quantity+"x</b> Item</p>"+
                    "<p class='line-height-s font-12 font-500'>"+item_order.option_note_html+"<br/>"+item_order.cart_note_html+"</p>"+
                    "</div>"+
                    "</div>";
            }
            str =str+"<div class='card card-style pb-2 mb-2' id='biz_row_"+item_list[a].tbl_id+"'>"+
"<a data-bs-toggle='collapse' href='#invoice-"+item_list[a].tbl_id+"' aria-expanded='false' aria-controls='invoice-"+item_list[a].tbl_id+"' class='mb-2'>"+ "<div class='content mb-0'>"+
"<div class='d-flex mb-n1'>"+
"<div class='align-self-center'>"+
"<h3 class='font-20 font-700'>Order #"+item_list[a].order_id+"</h3>"+
"<p class='font-10 mt-n2'>"+date_str+" - <span id='biz_lbl_order_status_"+item_list[a].tbl_id+"'>"+get_status(item_list[a].status_id)+"</span></p>"+
"</div>"+
"<div class='ms-auto text-center mt-2'>"+
"<i class='fa fa-plus font-18 color-theme'></i>"+
"</div>"+
"</div>"+
"</div>"+
"</a>"+
"<div class='collapse' id='invoice-"+item_list[a].tbl_id+"'>"+
"<div class='content'>"+
"<div class='row mb-3 mt-4'>"+
"<h4 class=''>Shipping Info</h4>"+
"<h5 class='col-4 text-start font-15'>Name</h5>"+
"<h5 class='col-8 text-end font-14 '>"+ship_full_name+"</h5>"+
"<h5 class='col-4 text-start font-15'>Company</h5>"+
"<h5 class='col-8 text-end font-14 '>"+ship_company +"</h5>"+
"<h5 class='col-4 text-start font-15'>Address</h5>"+
"<h5 class='col-8 text-end font-14 '>"+ship_address+"</h5>"+
"</div>"+
"<div class='divider'></div>"+
"<div class='row mb-3 mt-4'>"+
"<h4 class=''>Payment Info</h4>"+
"<h5 class='col-4 text-start font-15'>Email</h5>"+
"<h5 class='col-8 text-end font-14'>"+customer_email+"</h5>"+
"<h5 class='col-4 text-start font-15'>Phone</h5>"+
"<h5 class='col-8 text-end font-14'>"+customer_phone+"</h5>"+
"<h5 class='col-4 text-start font-15'>Type</h5>"+
"<h5 class='col-8 text-end font-14'>"+bill_payment_type+"</h5>"+
"</div>"+
"<div class='divider'></div>"
                +str_product+
"<div class='divider mt-4'></div>"+
"<div class='row'>"+
"<div class='col-6'><h6 class='font-14'>Quantity</h6></div>"+
"<div class='col-6'><h6 class='font-14'>"+quantity+"</h6></div>"+
"<div class='w-100 pt-1'></div>"+
"<div class='col-6'><h6 class='font-14'>Subtotal</h6></div>"+
"<div class='col-6'><h6 class='font-14'>"+sub_total+"</h6></div>"+
"<div class='w-100 pt-1'></div>"+
"<div class='col-6'><h6 class='font-14'>Shipping</h6></div>"+
"<div class='col-6'><h6 class='font-14'>"+shipping+"</h6></div>"+
"<div class='w-100 pt-1'></div>"+
"<div class='col-6'><h6 class='font-14'>Discount</h6></div>"+
"<div class='col-6'><h6 class='font-14'>"+discount+"</h6></div>"+
"<div class='w-100 pt-2'></div>"+
"<div class='col-6'><h6 class='font-700 font-19'>Grand Total</h6></div>"+
"<div class='col-6'><h6 class='font-700 font-19'>"+grand_total+"</h6></div>"+
"</div>"+
"<div class='divider'></div>"+
                "<a href='#' tbl_id='"+item_list[a].tbl_id+"' data_type='"+item_list[a].data_type+"' data-menu='menu-option-1' class='biz_btn_order_open btn m-2 btn-half btn-l rounded-s font-800 text-uppercase bg-yellow-dark'>Open</a>"+
                "<a href='#' tbl_id='"+item_list[a].tbl_id+"' data_type='"+item_list[a].data_type+"' data-menu='menu-option-1' class='biz_btn_order_shipped btn m-2 btn-half btn-l rounded-s font-800 text-uppercase bg-green-dark'>Shipped</a>"+
                "<a href='#' tbl_id='"+item_list[a].tbl_id+"' data_type='"+item_list[a].data_type+"' data-menu='menu-option-1' class='biz_btn_order_delete btn m-2 btn-half btn-l rounded-s font-800 text-uppercase bg-red-dark'>Delete</a>"+
"</div>"+
"</div>"+
"</div>";
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
        bind_events();
    }
    function bind_events(){
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            url='order/order_list/'+page_current;
            cloud_get_url(get_cloud_url(url,[]),{},function(data){
                bind_list(data.order_list,page_current,data.page_count);
            });
        });
        $(".biz_btn_order_delete").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            if (confirm("Delete?") == true) {
                cloud_delete(data_type,tbl_id,function(data){
                    $('#biz_row_'+tbl_id).remove();
                });
            }
        });
        $(".biz_btn_order_open").click(function() {
            var obj={};
            obj.data_type = $(this).attr('data_type');
            obj.tbl_id = $(this).attr('tbl_id');
            obj.status_id='0';
            if(confirm("Open?") == true) {
                cloud_update(obj.data_type,obj.tbl_id,obj, function(data){
                    $('#biz_lbl_order_status_'+obj.tbl_id).html(get_status(obj.status_id));
                    return false;
                });
            }
        });
        $(".biz_btn_order_shipped").click(function() {
            var obj={};
            obj.data_type = $(this).attr('data_type');
            obj.tbl_id = $(this).attr('tbl_id');
            if(confirm("Ship?") == true) {
                obj.status_id='1';
                cloud_update(obj.data_type,obj.tbl_id,obj, function(data){
                    $('#biz_lbl_order_status_'+obj.tbl_id).html(get_status(obj.status_id));
                    return false;
                });
            }
        });
    }
    function get_status(status_id){
        if(String(status_id)=='1'){
            return "<span class='color-green-dark'>Shipped</span>";
        }else{
            return "<span class='color-yellow-dark'>Open</span>";
        }
    }
}




/*
function init_order_cart_old(){
    $("#biz_btn_order_cart_top").click(function() {
        show_order_cart_top();
    });
}
function show_order_cart_top(){
    url = "order/cart_get/"+get_user().customer_id;
    cloud_get_url(get_cloud_url(url,[]),{},function(data){
        set_order_cart_top(data.cart);
    });
}
*/
