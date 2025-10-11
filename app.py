from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import requests

app = Flask(__name__)
CORS(app)

# Load model and encoders
try:
    import os
    model_path = os.path.join(os.path.dirname(__file__), "cropprediction.2.01.joblib")
    le_path = os.path.join(os.path.dirname(__file__), "le_t1.joblib")
    crop_encoder_path = os.path.join(os.path.dirname(__file__), "crop_encoder2.joblib")
    
    model = joblib.load(model_path)
    le = joblib.load(le_path)
    crop_encoder = joblib.load(crop_encoder_path)
except Exception as e:
    print(f"Error loading models: {str(e)}")
    model = None
    le = None
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
    if not all([model, le, crop_encoder]):
        return jsonify({"error": "Models not properly loaded. Please check server logs."}), 500

    try:
        data = request.form
        required_fields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'season']
        
        # Check if all required fields are present
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Convert and validate numeric fields
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
