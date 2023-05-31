import axios from "axios";

import { getFirestore } from 'firebase-admin/firestore';

const signup = async (req) => {
  try {
    const data = JSON.stringify({
      email: req.body.email,
      password: req.body.password,
      returnSecureToken: true
    });
    let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_KEY}`,
      data,
      {
        headers: { 'Content-Type': 'application/json' }
      });

    // Connect to firestore
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


export default signup;
