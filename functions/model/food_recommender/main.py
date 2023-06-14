
import functions_framework
import json
import dill
import nltk
nltk.download('punkt')

def convert_to_string(data):
    return f"{data['diet_type']} {data['cuisine_type']} {data['protein']} {data['carbs']} {data['fat']} {data['calories']}"

def mainify(obj):
    """If obj is not defined in __main__ then redefine it in 
    main so that dill will serialize the definition along with the object"""
    if obj.__module__ != "__main__":
        import __main__
        import inspect
        s = inspect.getsource(obj)
        co = compile(s, '<string>', 'exec')
        exec(co, __main__.__dict__)

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
