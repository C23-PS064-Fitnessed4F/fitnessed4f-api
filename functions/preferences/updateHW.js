import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../util/getUserId.js";

const update = async (req) => {
  try {
    const userId = await getUserId(req);
    if (Array.isArray(userId)) {
      return userId;
    }

    // Connect to firestore
    const db = getFirestore();

    const new_data = {
      height: parseInt(req.body.height),
      weight: parseInt(req.body.weight)
    }

    const docRef = db.collection('users').doc(userId);
    await docRef.update(new_data).then(function() {
        console.log("User's height and weight updated");
    });
    return [200, {
        status: "User's height and weight updated",
        new_height: new_data.height,
        new_weight: new_data.weight
      }]
  } catch (e) {
    console.error(e);
    return [400, {
      error: e
    }]
  }
};


export default update;
