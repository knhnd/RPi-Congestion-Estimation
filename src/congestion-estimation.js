const NodeWebcam = require('node-webcam');

// Default Options
let opts = {
    width: 1280,
    height: 720,
    quality: 100,
    frames: 60,
    delay: 0,
    saveShots: true,
    output: 'jpeg',
    device: '/dev/video0',
    callbackReturn: 'location',
    verbose: false,
};

// Create webcam instance
const Webcam = NodeWebcam.create(opts);

// Will automatically append location output type
Webcam.capture( "img", function( err, data ) {} );

// Also available for quick use
NodeWebcam.capture( "img", opts, function( err, data ) {
});

// Get list of cameras
Webcam.list( function( list ) {
    // Use another device
    let anotherCam = NodeWebcam.create( { device: list[ 0 ] } );
});

// Return type with base 64 image
opts = {
    callbackReturn: "base64"
};
NodeWebcam.capture( "img", opts, function( err, data ) {
    let image = "<img src='" + data + "'>";
});
