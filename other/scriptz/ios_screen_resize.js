async = require('async');
sharp = require('sharp');
path = require('path');
fs = require('fs');
G_ORG_SCREEN_DIR= path.join(__dirname, "../graphicz/screenz_deploy/");
console.log('IOS-SCREEN-RESIZE-START');
console.log('SCREEN-DIRECTORY')
console.log(G_ORG_SCREEN_DIR);
go_resize();
/*
     <!--
     1242x2208
     2048x2732
     1242x2688 - no alpha
        -->
        */
function go_resize(){
    async.series([
        function(call){
            ios_screen_dir=path.join(__dirname, "../graphicz/ios_store/iphone-6.7/");
            if (!fs.existsSync(ios_screen_dir)){
                fs.mkdirSync(ios_screen_dir);
            }
            call();
        },
        function(call){
            screen_file_list=[
                {width:1290,height:2796,file:'1.png'},
                {width:1290,height:2796,file:'2.png'},
                {width:1290,height:2796,file:'3.png'},
                {width:1290,height:2796,file:'4.png'},
                {width:1290,height:2796,file:'5.png'},
                {width:1290,height:2796,file:'6.png'},
                {width:1290,height:2796,file:'7.png'},
                {width:1290,height:2796,file:'8.png'},
            ];
            async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .removeAlpha()
                            .resize({width:value.width,height:value.height,fit:'fill'})
                            .toFile(ios_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('iphone file '+ value.file+' file  error occored');
                                    console.log('SCREEN-DIRECTORY')
                                    console.log(G_ORG_SCREEN_DIR);
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('iphone '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
        },
        function(call){
            ios_screen_dir=path.join(__dirname, "../graphicz/ios_store/iphone-5.5/");
            if (!fs.existsSync(ios_screen_dir)){
                fs.mkdirSync(ios_screen_dir);
            }
            call();
        },
        function(call){
            ios_screen_dir=path.join(__dirname, "../graphicz/ios_store/iphone-5.5/");
            screen_file_list=[
                {width:1242,height:2208,file:'1.png'},
                {width:1242,height:2208,file:'2.png'},
                {width:1242,height:2208,file:'3.png'},
                {width:1242,height:2208,file:'4.png'},
                {width:1242,height:2208,file:'5.png'},
                {width:1242,height:2208,file:'6.png'},
                {width:1242,height:2208,file:'7.png'},
                {width:1242,height:2208,file:'8.png'},
            ];
            async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .removeAlpha()
                            .resize({width:value.width,height:value.height})
                            .toFile(ios_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('iphone '+ value.file+' file  error occored');
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('iphone '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
        },
        function(call){
            ios_screen_dir=path.join(__dirname, "../graphicz/ios_store/ipad-12.9/");
            if (!fs.existsSync(ios_screen_dir)){
                fs.mkdirSync(ios_screen_dir);
            }
            call();
        },
        function(call){
            ios_screen_dir=path.join(__dirname, "../graphicz/ios_store/ipad-12.9/");
            screen_file_list=[
                {width:2048,height:2732,file:'1.png'},
                {width:2048,height:2732,file:'2.png'},
                {width:2048,height:2732,file:'3.png'},
                {width:2048,height:2732,file:'4.png'},
                {width:2048,height:2732,file:'5.png'},
                {width:2048,height:2732,file:'6.png'},
                {width:2048,height:2732,file:'7.png'},
                {width:2048,height:2732,file:'8.png'},
            ];
            async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .removeAlpha()
                            .resize({width:value.width,height:value.height,fit:'fill'})
                            .toFile(ios_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('iphone '+ value.file+' file  error occored');
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('iphone '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
        },
        function(call){
            ios_screen_dir=path.join(__dirname, "../graphicz/ios_store/iphone-6-5/");
            if (!fs.existsSync(ios_screen_dir)){
                fs.mkdirSync(ios_screen_dir);
            }
            call();
        },
        function(call){
            ios_screen_dir=path.join(__dirname, "../graphicz/ios_store/iphone-6-5/");
            screen_file_list=[
                {width:1242,height:2688,file:'1.png'},
                {width:1242,height:2688,file:'2.png'},
                {width:1242,height:2688,file:'3.png'},
                {width:1242,height:2688,file:'4.png'},
                {width:1242,height:2688,file:'5.png'},
                {width:1242,height:2688,file:'6.png'},
                {width:1242,height:2688,file:'7.png'},
                {width:1242,height:2688,file:'8.png'},
            ];
            async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .removeAlpha()
                            .resize({width:value.width,height:value.height,fit:'fill'})
                            .toFile(ios_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('iphone '+ value.file+' file  error occored');
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('iphone '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
        },
    ],
        function(err, results){
            console.log('BiZ-9 IOS Screen Resize Complete');
        });
}
