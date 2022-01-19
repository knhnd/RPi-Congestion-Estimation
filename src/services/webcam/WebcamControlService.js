const NodeWebcam = require('node-webcam');

// Webcam 操作のためのクラス
export default class WebcamControlService {
  // RaspberryPi に接続された Webcam で写真を撮影する
  static captureImage() {
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
    Webcam.capture('img', function (err, data) {}); // Will automatically append location output type
    NodeWebcam.capture('img', opts, function (err, data) {}); // Also available for quick use

    // Get list of cameras
    Webcam.list(function (list) {
      // Use another device
      let anotherCam = NodeWebcam.create({ device: list[0] });
    });

    // Return type with base 64 image
    opts = {
      callbackReturn: 'base64',
    };
    NodeWebcam.capture('img', opts, function (err, data) {
      let image = "<img src='" + data + "'>";
    });

    return;
  }
}
