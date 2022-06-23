const FirestoreService = require('./FirestoreService');
const cron = require('node-cron');

const firestoreServiceTest = async () => {
  const totalCongestionDegree = await FirestoreService.getAllLatestData();
  console.log(`学食全体の混雑率: ${totalCongestionDegree} %`);
  await FirestoreService.addDataToFirestore(totalCongestionDegree);
};

// 1分おきに定期実行
// cron.schedule('1 * * * * *', () => {
//   firestoreServiceTest();
// });
firestoreServiceTest();
