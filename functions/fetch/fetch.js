import { getFirestore } from "firebase-admin/firestore";
import getUserId from "../util/getUserId.js";

const fetch = async (req) => {
  try {
    const userId = await getUserId(req);
    if (Array.isArray(userId)) {
      return userId;
    }

    // Connect to firestore
    const db = getFirestore();

    const docRef = db.collection('users').doc(userId);
    const user = await docRef.get();
    return [200, {
      user : user.data()
    }]

  } catch (e) {
    console.error(e);
    return [400, {
      error: e
    }]
  }
};


export default fetch;