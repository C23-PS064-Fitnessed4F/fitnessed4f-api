
import functions_framework
import json
import joblib

# for model to work
import nltk
nltk.download('punkt')
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_distances
from nltk.tokenize import word_tokenize
import pandas as pd

class RecommenderSystem:
  def __init__(self, data, content_col):
    self.df=data
    self.content_col=content_col
    self.encoder = None
    self.bank = None

  def fit (self):
    self.encoder= CountVectorizer(stop_words='english', tokenizer=word_tokenize)
    self.bank = self.encoder.fit_transform(self.df[self.content_col])

  def recommend(self, metadata_input, topk=5):
    content=metadata_input
    code =self.encoder.transform ([content])
    dist =cosine_distances(code, self.bank)
    rec_idx=dist.argsort()[0, 1:(topk+1)]
    return pd.read_csv("./Book2_1.csv",delimiter=';').loc[rec_idx]
  
# ----------------------------------------------------------------
def convert_to_string(data):
    return f"{data['diet_type']} {data['cuisine_type']} {data['protein']} {data['carbs']} {data['fat']} {data['calories']}"

@functions_framework.http
def foodrec_model(request):
    if request.method == 'POST':
        loaded_model = joblib.load('foodrec_model.sav')
        data = request.get_json()
        data_input = convert_to_string(data)
        result = loaded_model.recommend(data_input)
        json_result = result.to_json(orient ='records')
        parsed = json.loads(json_result)

        return json.dumps({
            'recipes': parsed
        })
