import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../util/getUserId.js";

const updateFoodPref = async (req) => {
  try {
    const userId = await getUserId(req);

    // Connect to firestore
    const db = getFirestore();

    const docRef = db.collection('users').doc(userId);
    await docRef.update({
      food_preferences: {
        diet_type: req.body.diet_type,
        cuisine_type: req.body.cuisine_type,
        protein: req.body.protein,
        carbs: req.body.carbs,
        fat: req.body.fat,
        calories: req.body.calories,
      }
    }).then(function() {
      console.log("User's food preferences updated");
    });
    return [200, {
      status: "User's food preferences updated",
      new_preferences: {
        diet_type: req.body.diet_type,
        cuisine_type: req.body.cuisine_type,
        protein: req.body.protein,
        carbs: req.body.carbs,
        fat: req.body.fat,
        calories: req.body.calories,
      }
    }]
  } catch (e) {
    console.error(e);
    return [400, {
      error: e
    }]
  }
};


export default updateFoodPref;
