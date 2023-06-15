import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../util/getUserId.js";

const updateWorkoutPref = async (req) => {
  try {
    const userId = await getUserId(req);
    if (Array.isArray(userId)) {
      return userId;
    }

    // Connect to firestore
    const db = getFirestore();

    const new_data = {
      type_pref: parseInt(req.body.type_pref),
      train_level: parseInt(req.body.train_level),
      bodypart: parseInt(req.body.bodypart),
      equipment: parseInt(req.body.equipment),
    }

    const docRef = db.collection('users').doc(userId);
    await docRef.update({
      workout_preferences: new_data
    }).then(function() {
        console.log("User's workout preferences updated");
      });
      return [200, {
        status: "User's workout preferences updated",
        new_preferences: new_data
      }]
  } catch (e) {
    console.error(e);
    return [400, {
      error: e
    }]
  }
};


export default updateWorkoutPref;
