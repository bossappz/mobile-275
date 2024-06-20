async = require('async');
sharp = require('sharp');
path = require('path');
fs = require('fs');
G_ORG_SCREEN_DIR= path.join(__dirname, "../graphicz/screenz_deploy/");
console.log('GPLAY-SCREEN-RESIZE-START');
console.log('SCREEN-DIRECTORY')
console.log(G_ORG_SCREEN_DIR);
go_resize();
function go_resize(){
    async.series([
        function(call){
            gplay_screen_dir=path.join(__dirname, "../graphicz/google_play/phone/");
            if (!fs.existsSync(gplay_screen_dir)){
                fs.mkdirSync(gplay_screen_dir);
            }
            call();
        },
        function(call){
            screen_file_list=[
                {width:1080,height:1920,file:'1.png'},
                {width:1080,height:1920,file:'2.png'},
                {width:1080,height:1920,file:'3.png'},
                {width:1080,height:1920,file:'4.png'},
                {width:1080,height:1920,file:'5.png'},
                {width:1080,height:1920,file:'6.png'},
                {width:1080,height:1920,file:'7.png'},
                {width:1080,height:1920,file:'8.png'},
            ];
            async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .removeAlpha()
                            .resize({width:value.width,height:value.height})
                            .toFile(gplay_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('gplay file '+ value.file+' file  error occored');
                                    console.log('SCREEN-DIRECTORY')
                                    console.log(G_ORG_SCREEN_DIR);
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('gplay '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
        },
        function(call){
            gplay_screen_dir=path.join(__dirname, "../graphicz/google_play/tablet_7/");
            if (!fs.existsSync(gplay_screen_dir)){
                fs.mkdirSync(gplay_screen_dir);
            }
            call();
        },
        function(call){
            screen_file_list=[
                {width:1080,height:1920,file:'1.png'},
                {width:1080,height:1920,file:'2.png'},
                {width:1080,height:1920,file:'3.png'},
                {width:1080,height:1920,file:'4.png'},
                {width:1080,height:1920,file:'5.png'},
                {width:1080,height:1920,file:'6.png'},
                {width:1080,height:1920,file:'7.png'},
                {width:1080,height:1920,file:'8.png'},
            ];
            async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .removeAlpha()
                            .resize({width:value.width,height:value.height})
                            .toFile(gplay_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('gplay file '+ value.file+' file  error occored');
                                    console.log('SCREEN-DIRECTORY')
                                    console.log(G_ORG_SCREEN_DIR);
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('gplay '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
        },
        function(call){
            gplay_screen_dir=path.join(__dirname, "../graphicz/google_play/tablet_10/");
            if (!fs.existsSync(gplay_screen_dir)){
                fs.mkdirSync(gplay_screen_dir);
            }
            call();
        },
        function(call){
            screen_file_list=[
                {width:1080,height:1920,file:'1.png'},
                {width:1080,height:1920,file:'2.png'},
                {width:1080,height:1920,file:'3.png'},
                {width:1080,height:1920,file:'4.png'},
                {width:1080,height:1920,file:'5.png'},
                {width:1080,height:1920,file:'6.png'},
                {width:1080,height:1920,file:'7.png'},
                {width:1080,height:1920,file:'8.png'},
            ];
            async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .removeAlpha()
                            .resize({width:value.width,height:value.height})
                            .toFile(gplay_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('gplay file '+ value.file+' file  error occored');
                                    console.log('SCREEN-DIRECTORY')
                                    console.log(G_ORG_SCREEN_DIR);
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('gplay '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
        },
        function(call){
            gplay_screen_dir=path.join(__dirname, "../graphicz/google_play/chrome_book/");
            if (!fs.existsSync(gplay_screen_dir)){
                fs.mkdirSync(gplay_screen_dir);
            }
            call();
        },
        function(call){
            screen_file_list=[
                {width:1080,height:1920,file:'1.png'},
                {width:1080,height:1920,file:'2.png'},
                {width:1080,height:1920,file:'3.png'},
                {width:1080,height:1920,file:'4.png'},
                {width:1080,height:1920,file:'5.png'},
                {width:1080,height:1920,file:'6.png'},
                {width:1080,height:1920,file:'7.png'},
                {width:1080,height:1920,file:'8.png'},
            ];
            async.forEachOf(screen_file_list, function (value, key, go)
                {
                    if (fs.existsSync(G_ORG_SCREEN_DIR+value.file)) {
                        sharp(G_ORG_SCREEN_DIR+value.file)
                            .removeAlpha()
                            .resize({width:value.width,height:value.height})
                            .toFile(gplay_screen_dir+value.file,(err, info)=>{
                                if(err){
                                    console.log('gplay file '+ value.file+' file  error occored');
                                    console.log('SCREEN-DIRECTORY')
                                    console.log(G_ORG_SCREEN_DIR);
                                    console.log(err);
                                }
                                go();
                            });
                    }else{
                        console.log('gplay '+ value.file+' file  dont exsist');
                        go();
                    }
                },
                function (err) {
                    call();
                })
        },
    ],
        function(err, results){
            console.log('BiZ-9 GPLAY Screen Resize Complete');
        });
}
