import axios from "axios";

const getUserId = async (req) => {
  try {
    const data = JSON.stringify({
      idToken: req.body.idToken
    });
    let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.API_KEY}`,
      data,
      {
        headers: {'Content-Type': 'application/json'}
      });

    return response.data.users[0].localId;

  } catch (e) {
    console.error(e);
    return "";
  }
};


export default getUserId;