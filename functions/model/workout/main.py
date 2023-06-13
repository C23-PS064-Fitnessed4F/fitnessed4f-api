from flask import Flask
from flask import request
from flask import jsonify
import tensorflow as tf
import numpy as np
import pandas as pd
from os import environ

environ['CUDA_VISIBLE_DEVICES'] = ''
environ['TF_CPP_MIN_LOG_LEVEL'] = '1'
app = Flask(__name__)


@app.route("/", methods=['POST'])
def workout():
    if request.method == 'POST':
        model = tf.keras.models.load_model('workout.h5')
        data = request.get_json()

        type_pref = np.zeros(7)
        type_pref[data['type_pref'] - 1] = 1

        train_level = np.zeros(3)
        train_level[data['train_level'] - 1] = 1

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

        return jsonify(
            result=final
        )


def find_nearest(array, value):
    array = np.asarray(array)
    idx = (np.abs(array - value)).argmin()
    return array[idx]


def get_y():
    with open('y.npy', 'rb') as f:
        return np.load(f)


def get_y_df():
    return pd.read_csv('y_df.csv', delimiter=';')


if __name__ == '__main__':
    app.run()
