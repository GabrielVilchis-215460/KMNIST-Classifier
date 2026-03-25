const CLASSES = [
  { jp: "お", romaji: "o" },
  { jp: "き", romaji: "ki" },
  { jp: "す", romaji: "su" },
  { jp: "つ", romaji: "tsu" },
  { jp: "な", romaji: "na" },
  { jp: "は", romaji: "ha" },
  { jp: "ま", romaji: "ma" },
  { jp: "や", romaji: "ya" },
  { jp: "れ", romaji: "re" },
  { jp: "を", romaji: "wo" },
];

export default function Instructions() {
  return (
    <div className="instructions">
      <section className="instr-section">
        <h2 className="instr-title">¿Cómo usar el clasificador?</h2>
        <ol className="steps">
          <li className="step">
            <span className="step-num">01</span>
            <div>
              <strong>Consigue una imagen</strong>
              <p>Descarga una imagen de prueba del dataset KMNIST (ver abajo) o dibuja un carácter a mano y escanéalo.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-num">02</span>
            <div>
              <strong>Sube la imagen</strong>
              <p>Ve a la pestaña <em>Clasificar</em> y arrastra tu imagen o haz clic para seleccionarla. Acepta PNG y JPG.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-num">03</span>
            <div>
              <strong>Interpreta los resultados</strong>
              <p>Verás la predicción principal, el porcentaje de confianza, el Top 3 de candidatos y la probabilidad de cada clase.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="instr-section">
        <h2 className="instr-title">¿Qué imágenes usar para probar?</h2>
        <p className="instr-text">
          El modelo fue entrenado con el dataset <strong>KMNIST</strong>, que contiene caracteres
          del alfabeto japonés <em>Hiragana</em> escritos a mano en fondo negro (28×28 px).
          Para mejores resultados:
        </p>
        <ul className="tips">
          <li>✔ Usa imágenes en <strong>escala de grises</strong> o blanco y negro</li>
          <li>✔ El carácter debe estar <strong>centrado</strong> en la imagen</li>
          <li>✔ Fondo claro, trazo oscuro (el modelo invierte automáticamente)</li>
          <li>✘ Evita imágenes con ruido, colores o múltiples caracteres</li>
        </ul>

        <div className="download-box">
          <p className="download-title">Descarga imágenes de prueba oficiales:</p>
          <a
            href="https://www.kaggle.com/datasets/anokas/kuzushiji"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-download"
          >
            Kaggle · Dataset KMNIST
          </a>
          <p className="download-hint">
            Descarga el archivo, extrae cualquier imagen de <code>kmnist-test-imgs.npz</code> y úsala directamente.
          </p>
        </div>
      </section>

      <section className="instr-section">
        <h2 className="instr-title">Clases que puede reconocer</h2>
        <div className="classes-grid">
          {CLASSES.map((c, i) => (
            <div key={i} className="class-card">
              <span className="class-jp">{c.jp}</span>
              <span className="class-romaji">{c.romaji}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="instr-section">
        <h2 className="instr-title">Sobre las métricas</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h4>Confianza</h4>
            <p>Probabilidad máxima asignada a la clase ganadora. Un valor mayor al 80% indica una predicción segura.</p>
          </div>
          <div className="metric-card">
            <h4>Top 3</h4>
            <p>Las tres clases con mayor probabilidad. Útil cuando el carácter es ambiguo o similar a otros.</p>
          </div>
          <div className="metric-card">
            <h4>Tiempo de inferencia</h4>
            <p>Milisegundos que tardó el modelo en procesar tu imagen. Valores típicos: 5–50 ms.</p>
          </div>
          <div className="metric-card">
            <h4>Distribución de probabilidad</h4>
            <p>Muestra cómo distribuye el modelo la certeza entre las 10 clases posibles.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
