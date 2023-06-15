import axios from "axios";

const getUserId = async (req) => {
  try {
    const data = JSON.stringify({
      idToken: req.get('authorization')
    });

    let response = {}
    try {
      response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.API_KEY}`,
        data,
        {
          headers: {'Content-Type': 'application/json'}
        });
    } catch (e) {
      return [e.response.data.error.code, {
        error: e.response.data.error.message
      }];
    }

    return response.data.users[0].localId;

  } catch (e) {
    console.error(e);
    return [500, {
      error: "UNHANDLED_EXCEPTION"
    }];
  }
};


export default getUserId;