# fitnessed4f

**All Endpoint:**

**POST /signup**\
  **Request:**\
  Header: Content-Type: application/x-www-form-urlencoded\
  Body/Data: email (string), password (string), username (string), height (int), weight (int)\
  **Response:**\
  Header: Content-Type: application/json\
  Body/Data: idToken (string), refreshToken (string)

**POST /login**\
  **Request:**\
  Header: Content-Type: application/x-www-form-urlencoded\
  Body/Data: email (string), password (string)\
  **Response:**\
  Header: Content-Type: application/json\
  Body/Data: idToken (string), refreshToken (string), user (object/json)

**GET /fetch**\
  **Request:**\
  Header: Authorization: idToken\
  **Response:**\
  Header: Content-Type: application/json\
  Body/Data: user (object/json)

**POST /update**\
  **Request:**\
  Header: Authorization: idToken\
  Body : height (int), weight (int)\
  **Response:**\
  Header: Content-Type: application/json\
  Body/Data: status, new_height, new_weight

**POST /update-workout**\
  **Request:**\
  Header: Authorization: idToken\
  Body (int semua):\
  bodypart,
  type_pref,
  equipment,
  train_level\
  **Response:**\
  Header: Content-Type: application/json\
  Body :\
  {
      "status": "User's workout preferences updated",
      "new_preferences": {
          "type_pref": (new value),
          "train_level": (new value),
          "bodypart": (new value),
          "equipment": (new value)
      }
  }

**POST /update-food**\
  **Request:**\
  Header: Authorization: idToken\
  Body (int semua):\
  diet_type,
  cuisine_type\
  **Response:**\
  Header: Content-Type: application/json\
  Body:\
  {
      "status": "User's food preferences updated",
      "new_preferences": {
          "diet_type": (new value),
          "cuisine_type": (new value)
      }
  }

**GET /food-recommender**\
  **Request:**\
  Header: Content-Type: application/x-www-form-urlencoded\
  **Response:**\
  Header: Content-Type: application/json\
  response : result (list of recipes), setiap recipe/food punya : Recipe_name (string), Diet_type (string), Cuisine_type(string), Protein(g) (float), Carbs(g) (float), Fat(g) (float), Calories (float)

**GET /workout**\
  **Request:**\
  Header: Content-Type: application/x-www-form-urlencoded\
  **Response:**\
  Header: Content-Type: application/json\
  response : result (list of workout names)
