import axios from "axios";
import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../../util/getUserId.js";
import { decode_type_pref, decode_train_level, decode_bodypart, decode_equipment } from "./workout_util.js";

const workout = async (req) => {
  try {
    const userId = await getUserId(req);

    // Connect to firestore
    const db = getFirestore();

    const docRef = db.collection('users').doc(userId);
    const user = await docRef.get();
    const wo_pref = user.data().workout_preferences;

    if (!Object.values(wo_pref).every(item => item !== 0)) {
      return [400, {
        error: "Workout preferences has not been configured yet"
      }]
    }

    const wo_input = {
      type_pref: decode_type_pref(wo_pref['type_pref']),
      train_level: decode_train_level(wo_pref['train_level']),
      bodypart: decode_bodypart(wo_pref['bodypart']),
      equipment: decode_equipment(wo_pref['equipment']),
    };

    let response = await axios.post('https://asia-southeast2-fitnessed4f.cloudfunctions.net/workout-model',
      wo_input,
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
