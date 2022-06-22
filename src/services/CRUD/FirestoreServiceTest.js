const FirestoreService = require('./FirestoreService');

const firestoreServiceTest = async () => {
  const congestionDegrees = await FirestoreService.getAllLatestData();
  console.log('congestionDegrees: ', congestionDegrees);
};

firestoreServiceTest();
