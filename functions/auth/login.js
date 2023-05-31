import axios from "axios";
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const login = async (req) => {
  try {
    const data = JSON.stringify({
      email: req.body.email,
      password: req.body.password,
      returnSecureToken: true
    });
    let response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgHBx142-JXJv9cvq08Nl5u2TgnCUGkMY',
      data,
      {
        headers: { 'Content-Type': 'application/json' }
      });

    // Connect to firestore
    initializeApp();
    const db = getFirestore();

    const docRef = db.collection('users').doc(response.data.localId);
    const user = await docRef.get();
    return [200, {
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken,
            user : user.data()
    }]
  } catch (e) {
    console.error(e);
    return [404, {
      error: e
    }]
  }
};


export default login;