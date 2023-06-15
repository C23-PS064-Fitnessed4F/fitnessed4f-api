import axios from "axios";
import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../../util/getUserId.js";
import { decode_diet, decode_cuisine } from "./foodrec_util.js";
const foodrec = async (req) => {
  try {
    const userId = await getUserId(req);
    if (Array.isArray(userId)) {
      return userId;
    }

    // Connect to firestore
    const db = getFirestore();

    const docRef = db.collection('users').doc(userId);
    const user = await docRef.get();

    if (!Object.values(user.data().food_preferences).every(item => item !== 0)) {
      return [400, {
        error: "food preferences has not been configured yet"
      }]
    }
    const food_pref = user.data().food_preferences
    const food_req = {
        diet_type: decode_diet(food_pref['diet_type']),
        cuisine_type: decode_cuisine(food_pref['cuisine_type']),
        protein: 200,
        carbs: 200,
        fat: 200,
        calories: 200,
    }
    let response = await axios.post('https://asia-southeast2-fitnessed4f.cloudfunctions.net/food-model',
      food_req,
      {
        headers: { 'Content-Type': 'application/json' }
      });

    return [200, {
      result: response.data.recipes,
    }]
  } catch (e) {
    console.error(e);
    return [404, {
      error: e
    }]
  }
};


export default foodrec;
