from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image, ImageOps
import io
import time
import tensorflow as tf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CLASS_NAMES = [
    "お (o)", "き (ki)", "す (su)", "つ (tsu)", "な (na)",
    "は (ha)", "ま (ma)", "や (ya)", "れ (re)", "を (wo)"
]

# Carga el modelo al iniciar el servidor
model = tf.keras.models.load_model("kmnist_model.keras")

@app.get("/")
def root():
    return {"status": "ok", "message": "KMNIST API activa"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Leer y preprocesar la imagen
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("L")  # escala de grises
    img = ImageOps.invert(img)                           # invertir colores (fondo negro)
    img = img.resize((28, 28))                           # redimensionar a 28x28

    # Normalizar igual que en el entrenamiento
    arr = np.array(img).astype("float32") / 255.0
    arr = arr.reshape(1, 784)

    # Medir tiempo de inferencia
    start = time.time()
    predictions = model.predict(arr, verbose=0)[0]
    elapsed_ms = round((time.time() - start) * 1000, 2)

    # Construir respuesta
    probs = [{"class": CLASS_NAMES[i], "probability": round(float(predictions[i]) * 100, 2)}
             for i in range(10)]
    probs_sorted = sorted(probs, key=lambda x: x["probability"], reverse=True)

    return {
        "prediction": CLASS_NAMES[int(np.argmax(predictions))],
        "confidence": round(float(np.max(predictions)) * 100, 2),
        "top3": probs_sorted[:3],
        "all_probabilities": probs,
        "inference_time_ms": elapsed_ms
    }
