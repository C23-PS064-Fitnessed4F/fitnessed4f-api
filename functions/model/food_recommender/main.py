
import functions_framework
import json
import dill

def convert_to_string(data):
    return f"{data['diet_type']} {data['cuisine_type']} {data['protein']} {data['carbs']} {data['fat']} {data['calories']}"

@functions_framework.http
def foodrec_model(request):
  
    if request.method == 'POST':
        with open('foodrec_model.pkl','rb') as dill_file:
            loaded_model = dill.load(dill_file)
        data = request.get_json()
        data_input = convert_to_string(data)
        result = loaded_model.recommend(data_input)
        json_result = result.to_json(orient ='records')
        parsed = json.loads(json_result)

        return json.dumps({
            'recipes': parsed
        })
