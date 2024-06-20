async = require('async');
sharp = require('sharp');
path = require('path');

G_ORG_FILE_ICON= path.join(__dirname, "../cordova/icon/512.png");
console.log('Screen Directory Location');
console.log(G_ORG_FILE_ICON);
go_mac();
go_android();
/*
     <!--
            ldpi    : 36x36 px
            mdpi    : 48x48 px
            hdpi    : 72x72 px
            xhdpi   : 96x96 px
            xxhdpi  : 144x144 px
            xxxhdpi : 192x192 px

            180
            60
            120
            76
            152
            40
            80
            57
            114
            72
            144
            167
            29
            58
            89
            50
            100
            1024
        -->
        */
//iphone
function go_mac(){
    file_icon_src= path.join(__dirname, "../cordova/ios/icons/");
    async.series([
        /*
            180
            60
            120
            76
            152
            40
            80
            57
            114
            72
            144
            167
            29
            58
            89
            50
            100
            1024
        -->
        */
        //iphone
        function(call){
            icon_file_list=[
                {size:180,icon:'icon-60@3x.png'},
                {size:60,icon:'icon-60.png'},
                {size:120,icon:'icon-60@2x.png'},
                {size:76,icon:'icon-76.png'},
                {size:152,icon:'icon-76@2x.png'},
                {size:40,icon:'icon-40.png'},
                {size:80,icon:'icon-40@2x.png'},
                {size:57,icon:'icon.png'},
                {size:114,icon:'icon@2x.png'},
                {size:72,icon:'icon-72.png'},
                {size:144,icon:'icon-72@2x.png'},
                {size:167,icon:'icon-167.png'},
                {size:29,icon:'icon-small.png'},
                {size:58,icon:'icon-small@2x.png'},
                {size:87,icon:'icon-small@3x.png'},
                {size:50,icon:'icon-50.png'},
                {size:100,icon:'icon-50@2x.png'},
            ];
            async.forEachOf(icon_file_list, function (value, key, go)
                {
                    sharp(G_ORG_FILE_ICON)
                        .resize(value.size)
                        .toFile(file_icon_src+value.icon,(err, info)=>{
                            if(err){
                                console.log('iphone icon_resize error occored');
                                console.log(err);
                            }
                            //console.log(file_icon_src+value.icon+' write success');
                        });

                    go();
                },
                function (err) {
                    call();
                })
        },
        function(call){
            icon_file_list=[
                {size:1024,icon:'icon-1024.png'},
            ];
            sharp(G_ORG_FILE_ICON)
                .removeAlpha()
                .flatten({ background: '#ffffff' })
                .resize(icon_file_list[0].size)
                .toFile(file_icon_src+icon_file_list[0].icon,(err, info)=>{
                    if(err){
                        console.log('1024 icon_resize error occored');
                        console.log(err);
                    }
                    //console.log(file_icon_src+value.icon+' write success');
                    call();
                });
        },
    ],
        function(err, results){
            console.log('BiZ-9 Icon Resize Mac Complete');
        });
}
function go_android(){
    async.series([
        /*
            ldpi    : 36x36 px
            mdpi    : 48x48 px
            hdpi    : 72x72 px
            xhdpi   : 96x96 px
            xxhdpi  : 144x144 px
            xxxhdpi : 192x192 px
            */
        //android
        function(call){
            file_icon_src= path.join(__dirname, "../cordova/android/icons/");
            icon_file_list=[
                {size:36,icon:'ldpi.png'},
                {size:48,icon:'mdpi.png'},
                {size:72,icon:'hdpi.png'},
                {size:96,icon:'xhdpi.png'},
                {size:144,icon:'xxhdpi.png'},
                {size:192,icon:'xxxhdpi.png'},
            ];
            async.forEachOf(icon_file_list, function (value, key, go)
                {
                    sharp(G_ORG_FILE_ICON)
                        .resize(value.size)
                        .toFile(file_icon_src+value.icon,(err, info)=>{
                            if(err){
                                console.log('android error occored');
                                console.log(err);
                            }
                            //console.log(file_icon_src+value.icon+' write success');
                        });
                    go();
                },
                function (err) {
                    call();
                })
        },
    ],
        function(err, results){
            console.log('BiZ-9 Icon Resize Android Complete');
        });
}

