from os import environ

import tensorflow as tf
import functions_framework
import json

from utils import *

environ['CUDA_VISIBLE_DEVICES'] = ''
environ['TF_CPP_MIN_LOG_LEVEL'] = '1'


@functions_framework.http
def workout_model(request):
    if request.method == 'POST':
        model = tf.keras.models.load_model('workout.h5')
        data = request.get_json()

        type_pref = np.zeros(7)
        type_pref[data['type_pref'] - 1] = 1

        train_level = np.zeros(3)
        train_level[data['train_level'] - 1] = 1
        temp = train_level[1]
        train_level[1] = train_level[2]  # Input isn't sorted (Beginner, Advanced, Intermediate)
        train_level[2] = temp

        bodypart = np.zeros(17)
        bodypart[data['bodypart'] - 1] = 1

        equipment = np.zeros(12)
        equipment[data['equipment'] - 1] = 1

        wo_input = np.concatenate((type_pref, bodypart, equipment, train_level))[np.newaxis, :]
        res = model.predict(wo_input)

        y = get_y()
        y_df = get_y_df()

        near = find_nearest(y, res)
        index = np.where(y == near)
        final = y_df.iloc[index]['Title'].item()

        return json.dumps({
            "result": final
        })
