import axios from "axios";
import { getFirestore } from 'firebase-admin/firestore';

const signup = async (req) => {
  try {
    const data = JSON.stringify({
      email: req.body.email,
      password: req.body.password,
      returnSecureToken: true
    });

    let response = {}
    try {
      response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_KEY}`,
        data,
        {
          headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
      return [e.response.data.error.code, {
        error: e.response.data.error.message
      }];
    }

    // Check if email exists
    if (Object.hasOwn(response.data, 'error')) {
      return [400, {
        error: response.data.error.message
      }]
    }

    // Connect to firestore
    const db = getFirestore();

    const docRef = db.collection('users').doc(response.data.localId);
    await docRef.set({
      username: req.body.username,
      height: parseInt(req.body.height),
      weight: parseInt(req.body.weight),
      workout_preferences: {
        type_pref: 0,
        train_level: 0,
        bodypart: 0,
        equipment: 0,
      },
      food_preferences: {
        diet_type: 0,
        cuisine_type: 0,
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
