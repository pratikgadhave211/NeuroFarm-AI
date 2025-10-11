from flask import Flask, request, jsonify
import joblib
import numpy as np
import requests

app = Flask(__name__)

# Load model and encoders
model = joblib.load("cropprediction.2.01.joblib")
le = joblib.load("le_t1.joblib")
try:
    crop_encoder = joblib.load("crop_encoder2.joblib")
except FileNotFoundError:
    crop_encoder = None

def get_crop_image(crop_name):
    try:
        access_key = "Q_mY1-EUs4c5weHg4_maA--Ti8WF6SoYiENAvDMwftY"
        url = f"https://api.unsplash.com/photos/random?query={crop_name}%90crop&client_id={access_key}"
        response = requests.get(url).json()
        return response['urls']['regular']
    except Exception:
        return "crops/default.jpg"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.form
        N = float(data.get('N'))
        P = float(data.get('P'))
        K = float(data.get('K'))
        temperature = float(data.get('temperature'))
        humidity = float(data.get('humidity'))
        ph = float(data.get('ph'))
        rainfall = float(data.get('rainfall'))
        season = data.get('season')

        # Encode season
        season_map = {"Kharif": 0, "Rabi": 1, "Zaid": 2}
        season_encoded = season_map.get(season, -1)
        if season_encoded == -1:
            return jsonify({"error": "Invalid season"}), 400

        input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall, season_encoded]])
        pred = model.predict(input_data)

        if crop_encoder:
            crop_name = crop_encoder.inverse_transform([pred])[0]
        else:
            crop_name = str(pred[0])

        crop_image = get_crop_image(crop_name)

        response = jsonify({
            "crop": crop_name,
            "crop_image": crop_image
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    except Exception as e:
        response = jsonify({"error": str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500

if __name__ == '__main__':
    app.run(debug=True)
