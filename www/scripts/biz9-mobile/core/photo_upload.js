//photo_upload start
function device_photo_start(){
    alert('devicePhotoStart');
    var pictureSource;
    var destinationType;
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
function clear_cache() {
    navigator.camera.cleanup();
}
var retries = 0; // function to run after user successfully takes a photo or selects
function on_capture_photo(fileURI) {
    // display the photo before uploading
    alert( '<img src="' +fileURI+ '"/>');
    //document.getElementById("imageSelected").innerHTML = '<img src="' +fileURI+ '"/>';
    var win = function(r) {
        clear_cache();
        retries = 0;
        alert('Image Uploaded!'); // image uploaded
    };
    var fail = function(error) {
        if (retries === 0) {
            retries++;
            setTimeout(function() {
                // upload failed lets try once more
                onCapturePhoto(fileURI);
            }, 1000);
        } else {
            retries = 0;
            clearCache();
            alert('Something went wrong try Again...');
        }
    };
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {
        data: "extra post data to pass to the server"
    }
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://YOUR-SERVER-URL"), win, fail, options);
}
// function runs when the user cancels the camera or gallery selection
function onFaill(message) {
    alert(message);
}
// Photo Upload
var photo_upload = {
    camera: function() {
        navigator.camera.getPicture(onCapturePhoto, onFaill, {
            quality: 100, // photo quality
            destinationType: destinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG
        });
    },
    gallery: function() {
        navigator.camera.getPicture(onCapturePhoto, onFaill, {
            quality: 100,
            destinationType: destinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG
        });
    }
}

