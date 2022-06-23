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
    const timestamp = new Date();

    // Firestore へ書き込み
    await db
      .collection('edge')
      .doc('boTrseygojrZeVzm3oUz')
      .collection('observation-data')
      .add({
        createdAt: timestamp,
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

  // 全体混雑率を計算して返す
  static async getAllLatestData() {
    const db = admin.firestore();
    const edgeCollectionRef = await db.collection('edge');
    const edgeCollectionSnapshot = await edgeCollectionRef.get();
    const congestionDegrees = [];

    // 公式のforEachだとpromiseできないのでmapを使う
    await Promise.all(
      // mapする場合はsnapshotのdocsだけを取る
      edgeCollectionSnapshot.docs.map(async (doc) => {
        const subcollectionSnapshot = await doc.ref
          .collection('observation-data')
          .orderBy('timestamp', 'desc')
          .limit(1)
          .get();
        subcollectionSnapshot.docs.map(async (subcollectionDoc) => {
          const latestDocument = subcollectionDoc.data();
          congestionDegrees.push(latestDocument.congestionDegree);
        });
      })
    );
    const sumCongestions = congestionDegrees.reduce((sum, element) => {
      return sum + element;
    });
    const totalCOngestionDegree = sumCongestions / congestionDegrees.length;
    return totalCOngestionDegree;
  }

  // 特定のコレクションにデータを追加する
  static async addDataToFirestore(data) {
    const timestamp = new Date();

    // Firestore へ書き込み
    const db = admin.firestore();
    await db
      .collection('edge_aggregated')
      .add({
        createdAt: timestamp,
        congestionDegree: data,
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
