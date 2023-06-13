from flask import Flask
import pickle
import nltk
nltk.download('punkt')
from RecommenderSystem import RecommenderSystem

app = Flask(__name__)

@app.route("/")
def hello_world():
    #
    # pickleFile = open("foodModel.pkl", "rb")
    # model = pickle.load(pickleFile)
    # pred = model.recommend('paleo south east asian 181.55 28.62 146.14 2155.94')
    with open('foodModel.pkl', 'rb') as f:
        model = pickle.load(f)
        pred = model.recommend('paleo south east asian 181.55 28.62 146.14 2155.94')

        return f"<p>Hello, World! {pred} </p>"

if __name__ == '__main__':
    app.run()
