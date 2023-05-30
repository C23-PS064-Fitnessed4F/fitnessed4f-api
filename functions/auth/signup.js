import axios from "axios";
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

const signup = async (req, res) => {
  try {
    let response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgHBx142-JXJv9cvq08Nl5u2TgnCUGkMY/', {
      email: req.body.email,
      password: req.body.password,
      returnSecureToken: true
    });

    // Connect to firestore
    initializeApp();
    const db = getFirestore();

    const docRef = db.collection('users').doc(response.data.localId);
    await docRef.set({
      username: req.body.username,
      height: req.body.height,
      weight: req.body.height,
      preferences: {
        workout_per_week: 0,
        type_pref: 0,
        train_duration: 0,
        train_level: 0
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