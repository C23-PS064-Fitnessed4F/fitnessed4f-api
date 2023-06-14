import tensorflow as tf
import functions_framework
import joblib
import json
import numpy as np


@functions_framework.http
def workout_model(request):

    if request.method == 'POST':
        model = tf.keras.models.load_model('model.h5')
        encoders = joblib.load('encoders.joblib')
        label_encoder = joblib.load('label_encoder.joblib')
        x = ['Type', 'BodyPart', 'Equipment', 'Level']

        data = request.get_json()

        new_input = {
            'Type': [data['type_pref']],
            'BodyPart': [data['bodypart']],
            'Equipment': [data['equipment']],
            'Level': [data['train_level']]
        }

        new_input_data = []
        for feature in x:
            encoder = encoders[feature]
            encoding = encoder.transform(np.array(new_input[feature]).reshape(-1, 1))
            new_input_data.append(encoding)

        new_x = np.concatenate(new_input_data, axis=1)
        predictions = model.predict(new_x)

        k = 5  # Output amount
        if 'amount' in data:
            k = data['amount']
        top_k_classes = np.argsort(predictions, axis=1)[:, -k:]
        predicted_labels = label_encoder.inverse_transform(top_k_classes[0])

        return json.dumps({
            "result": predicted_labels
        })
