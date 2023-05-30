import axios from "axios";
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

const signup = async (req, res) => {
  try {
    let response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgHBx142-JXJv9cvq08Nl5u2TgnCUGkMY', {
      email: req.email,
      password: req.pass,
      returnSecureToken: true
    });

    // Connect to firestore
    initializeApp();
    const db = getFirestore();

    const docRef = db.collection('users').doc(response.data.localId);
    await docRef.set({
      username: req.username,
      height: req.height,
      weight: req.height,
      preferences: {
        workout_per_week: req.workout_per_week,
        type_pref: req.type_pref,
        train_duration: req.train_duration,
        train_level: req.train_level
      }
    });
    return ["200", {
      idToken: response.data.idToken,
      refreshToken: response.data.refreshToken
    }]

  } catch (e) {
    console.error(e);
  }
};


export default signup;