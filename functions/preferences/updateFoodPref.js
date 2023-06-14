import { getFirestore } from 'firebase-admin/firestore';
import getUserId from "../util/getUserId.js";

const updateFoodPref = async (req) => {
  try {
    const userId = await getUserId(req);

    // Connect to firestore
    const db = getFirestore();

    const new_data = {
      diet_type: parseInt(req.body.diet_type),
      cuisine_type: parseInt(req.body.cuisine_type),
    }

    const docRef = db.collection('users').doc(userId);
    await docRef.update({
      food_preferences: new_data
    }).then(function() {
      console.log("User's food preferences updated");
    });
    return [200, {
      status: "User's food preferences updated",
      new_preferences: new_data
    }]
  } catch (e) {
    console.error(e);
    return [400, {
      error: e
    }]
  }
};


export default updateFoodPref;
