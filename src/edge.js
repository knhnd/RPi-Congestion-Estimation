const WebcamControlService = require('./services/webcam/WebcamControlService.js');
const ObjectDetectionService = require('./services/ComputerVision/ObjectDetectionService.js');
const FirestoreService = require('./services/CRUD/FirestoreService');
const cron = require('node-cron');

// Webカメラを用いた混雑度推定
const congestionEstimation = async () => {
  // Webカメラで写真を撮影する
  await WebcamControlService.captureImage()
    .then(async (res) => {
      // VisionAPIで写真のオブジェクト検出
      await ObjectDetectionService.detectMultipleObject()
        .then(async (res) => {
          const objects = res;
          let objectNames = [];
          objects.forEach((object) => {
            objectNames.push(object.name);
          });

          // 画像内の人の数をカウントする
          let peopleCount = 0;
          for (let i = 0; i < objectNames.length; i++) {
            if (objectNames[i] === 'Person') {
              peopleCount++;
            }
          }
          console.log('\n検知した人数: ', peopleCount);
          const congestionDegree = peopleCount / 10; // 混雑率
          console.log('混雑率: ', congestionDegree, '%');

          // Firestore への書き込みを実行
          await FirestoreService.writeDataToFirestore(peopleCount, congestionDegree)
            .then((res) => {
              console.log('Success: ', res);
            })
            .catch((err) => {
              console.log('Error: ', err);
            });
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
};

// 1分おきに定期実行
cron.schedule('1 * * * * *', () => {
  congestionEstimation();
});
