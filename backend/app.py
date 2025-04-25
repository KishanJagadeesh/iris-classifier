### BACKEND: Flask App with Model (backend/app.py)

from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # To allow requests from frontend
# ss
# Load the model
model = joblib.load("model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    features = [
        data.get("sepal_length"),
        data.get("sepal_width"),
        data.get("petal_length"),
        data.get("petal_width")
    ]
    prediction = model.predict([features])
    return jsonify({"prediction": int(prediction[0])})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)


