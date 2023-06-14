
import functions_framework
import json
import nltk
import joblib
from sklearn.metrics.pairwise import cosine_distances
nltk.download('punkt')

def convert_to_string(data):
    return f"{data['diet_type']} {data['cuisine_type']} {data['protein']} {data['carbs']} {data['fat']} {data['calories']}"

@functions_framework.http
def foodrec_model(request):
    
    def recommend(metadata_input, topk=5):
        encoder = joblib.load('encoder.joblib')
        bank = joblib.load('bank.joblib')
        menu_data = joblib.load('menu_data.joblib')
        content=metadata_input
        code =encoder.transform([content])
        dist =cosine_distances(code, bank)
        rec_idx=dist.argsort()[0, 1:(topk+1)]
        return menu_data.loc[rec_idx]
    
    if request.method == 'POST':
        data = request.get_json()
        data_input = convert_to_string(data)
        result = recommend(data_input)
        json_result = result.to_json(orient ='records')
        parsed = json.loads(json_result)

        return json.dumps({
            'recipes': parsed
        })
