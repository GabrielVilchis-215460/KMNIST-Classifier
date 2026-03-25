# KMNIST Classifier 🈶 - Gabriel Alberto Vilchis Ríos - 215460

Aplicación web para clasificar caracteres del alfabeto japonés **Hiragana** escritos a mano,
utilizando una red neuronal entrenada con el dataset **KMNIST**.

**Link de la aplicación desplegada**: https://kmnist-classifier.vercel.app/

## ¿Qué clasifica?

El modelo reconoce 10 caracteres Hiragana del dataset KMNIST:

| Clase | Carácter | Romaji |
|-------|----------|--------|
| 0 | お | o |
| 1 | き | ki |
| 2 | す | su |
| 3 | つ | tsu |
| 4 | な | na |
| 5 | は | ha |
| 6 | ま | ma |
| 7 | や | ya |
| 8 | れ | re |
| 9 | を | wo |

## Cómo usar la aplicación

### 1. Obtén una imagen de prueba
Obtener una imagen de la letra que pertenece a cualquiera de las 10 clases definidas, pueden ser con las siguientes caracteristicas:

- Imagen en escala de grises o blanco y negro
- Carácter centrado en la imagen
- Fondo claro con trazo oscuro
- Formatos aceptados: PNG, JPG
- Evita imágenes con  colores o múltiples caracteres

### 2. Sube la imagen
Ve a la pestaña **Clasificar** en la aplicación y arrastra tu imagen
al área de carga, o haz clic para seleccionarla desde tu equipo.

### 3. Clasifica
Haz clic en el botón **Clasificar imagen** y espera la respuesta del modelo.

### 4. Interpreta los resultados

| Métrica | Descripción |
|---------|-------------|
| **Predicción** | Carácter Hiragana que el modelo considera más probable |
| **Confianza** | Porcentaje de certeza de la predicción. >80% indica alta seguridad |
| **Top 3** | Las tres clases con mayor probabilidad, útil para caracteres ambiguos |
| **Distribución** | Probabilidad asignada a cada una de las 10 clases posibles |
| **Tiempo de inferencia** | Milisegundos que tardó el modelo en procesar la imagen |

### 5. Prueba con otra imagen
Haz clic en **Clasificar otra imagen** para reiniciar y subir una nueva.

## ⚙️ Tecnologías Utilizadas
<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white">
  <img src="https://img.shields.io/badge/-Keras-D00000?logo=Keras&logoColor=white">
</p> 

<p align="center">
  <a href="https://kmnist-classifier.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge&logo=vercel"/>
  </a>
  <a href="https://tu-api.railway.app/docs" target="_blank">
    <img src="https://img.shields.io/badge/API-Docs-blue?style=for-the-badge&logo=fastapi"/>
  </a>
</p>

## Arquitectura del modelo

| Capa | Tipo | Neuronas | Activación |
|------|------|----------|------------|
| Entrada | Input | 784 | — |
| Capa oculta 1 | Dense | 512 | ReLU |
| Regularización 1 | Dropout | — | 30% |
| Capa oculta 2 | Dense | 256 | ReLU |
| Regularización 2 | Dropout | — | 20% |
| Salida | Dense | 10 | Softmax |

| Parámetro | Valor |
|-----------|-------|
| Optimizador | Adam (lr=0.001) |
| Función de pérdida | Categorical Crossentropy |
| Épocas | 30 (EarlyStopping) |
| Batch size | 128 |
| Exactitud en validación | ~96-97% |
## Funcionalidades
- 📤 Carga de imagen por drag & drop o selección manual
- 🎯 Predicción del carácter Hiragana con porcentaje de confianza
- 🏆 Top 3 de clases más probables
- 📊 Gráfica de probabilidad para las 10 clases
- ⚡ Tiempo de inferencia en milisegundos
- 📖 Sección de instrucciones y guía de uso

## Dataset

**KMNIST (Kuzushiji-MNIST)** — desarrollado por el National Institute of Japanese Literature.
Contiene 70,000 imágenes (60,000 entrenamiento / 10,000 prueba) de caracteres Hiragana
escritos a mano en formato 28×28 píxeles en escala de grises.

- 📦 Disponible en: [Kaggle · anokas/kuzushiji](https://www.kaggle.com/datasets/anokas/kuzushiji)


