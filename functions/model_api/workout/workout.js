import axios from "axios";
import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../../util/getUserId.js";

const workout = async (req) => {
  try {
    const userId = await getUserId(req);

    // Connect to firestore
    const db = getFirestore();

    const docRef = db.collection('users').doc(userId);
    const user = await docRef.get();

    if (0 in Object.keys(user.data().workout_preferences)) {
      return [400, {
        error: "Workout preferences not configured yet"
      }]
    }

    let response = await axios.post('https://asia-southeast2-fitnessed4f.cloudfunctions.net/workout-model',
      user.data().workout_preferences,
      {
        headers: { 'Content-Type': 'application/json' }
      });

    return [200, {
      result: response.data.result,
    }]
  } catch (e) {
    console.error(e);
    return [404, {
      error: e
    }]
  }
};


export default workout;