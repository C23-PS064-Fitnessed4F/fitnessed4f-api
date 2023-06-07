
import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../util/getUserId.js";

const updatePref = async (req) => {
  try {
    const userId = await getUserId(req);
    // Connect to firestore
    const db = getFirestore();

    const docRef = db.collection('users').doc(userId);
    await docRef.update({
      preferences: {
        workout_per_week: req.body.workout_per_week,
        type_pref: req.body.type_pref,
        train_duration: req.body.train_duration,
        train_level: req.body.train_level
      }
    }).then(function() {
        console.log("user's preferences updated");
      });
      return [200, {
        status: "user's preferences updated",
        new_preferences: {
          workout_per_week: req.body.workout_per_week,
          type_pref: req.body.type_pref,
          train_duration: req.body.train_duration,
          train_level: req.body.train_level
        }
      }]
  } catch (e) {
    console.error(e);
    return [400, {
      error: e
    }]
  }
};


export default updatePref;
