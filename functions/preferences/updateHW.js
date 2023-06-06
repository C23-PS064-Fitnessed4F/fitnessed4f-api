import axios from "axios";
import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../util/getUserId";

const update = async (req) => {
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
        height : req.body.height,
        weight : req.body.weight
    }).then(function() {
        console.log("user's height and weight updated");
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


export default update;
