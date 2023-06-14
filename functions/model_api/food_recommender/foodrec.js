import axios from "axios";
import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../../util/getUserId.js";
import { decode_diet, decode_cuisine } from "./foodrec_util.js";
const foodrec = async (req) => {
  try {
    const userId = await getUserId(req);

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
        protein: food_pref['protein'],
        carbs: food_pref['carbs'],
        fat: food_pref['fat'],
        calories: food_pref['calories'],
    }
    let response = await axios.post('https://asia-southeast2-fitnessed4f.cloudfunctions.net/food-model',
      food_req,
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


export default foodrec;
