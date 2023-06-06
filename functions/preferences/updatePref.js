import axios from "axios";
import { getFirestore } from 'firebase-admin/firestore';

const updatePref = async (req) => {
  try {
    const userId = await getUserId(req);
    let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.API_KEY}`,
      data,
      {
        headers: { 'Content-Type': 'application/json' }
      });

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
      });;
    return [200, {
      idToken: response.data.idToken,
      refreshToken: response.data.refreshToken
    }]

  } catch (e) {
    console.error(e);
    return [400, {
      error: e
    }]
  }
};


export default updatePref;
