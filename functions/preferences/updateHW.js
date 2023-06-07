
import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../util/getUserId.js";

const update = async (req) => {
  try {
    const userId = await getUserId(req);
    // Connect to firestore
    const db = getFirestore();

    const docRef = db.collection('users').doc(userId);
    await docRef.update({
        height : req.body.height,
        weight : req.body.weight
    }).then(function() {
        console.log("user's height and weight updated");
    });
    return [200, {
        status: "user's height and weight updated",
        new_height : req.body.height,
        new_weight : req.body.weight
      }]
  } catch (e) {
    console.error(e);
    return [400, {
      error: e
    }]
  }
};


export default update;
