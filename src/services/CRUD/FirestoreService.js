require('date-utils');
const admin = require('firebase-admin');
const serviceAccount = require('./../../../iot-experiments-4d785-firebase-adminsdk-46lxb-ecca066962.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class FirestoreService {
  // Firestore へのデータの書き込み
  static async writeDataToFirestore(peopleCount, congestionDegree) {
    const db = admin.firestore();

    // 現在時刻を取得
    const date = new Date();
    const formattedDate = date.toFormat('YYYYMMDDHH24MISS');

    // Firestore へ書き込み
    await db
      .collection('edge')
      .doc('boTrseygojrZeVzm3oUz')
      .collection('observation-data')
      .add({
        timestamp: formattedDate,
        peopleCount: peopleCount,
        congestionDegree: congestionDegree,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }
}
module.exports = FirestoreService;
