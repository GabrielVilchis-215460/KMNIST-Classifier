import { useState, useCallback, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const CLASS_NAMES = [
  "お (o)", "き (ki)", "す (su)", "つ (tsu)", "な (na)",
  "は (ha)", "ま (ma)", "や (ya)", "れ (re)", "を (wo)"
];

export default function Predictor() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Por favor sube un archivo de imagen válido.");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const handlePredict = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", image);
      const res = await fetch(`${API_URL}/predict`, { method: "POST", body: form });
      if (!res.ok) throw new Error("Error en el servidor");
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError("No se pudo conectar al servidor. Verifica que el backend esté activo.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="predictor">
      {/* Upload Zone */}
      {!result && (
        <div
          className={`drop-zone ${dragging ? "dragging" : ""} ${preview ? "has-preview" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !preview && inputRef.current.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
          {preview ? (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-img" />
              <div className="preview-actions">
                <button className="btn-primary" onClick={handlePredict} disabled={loading}>
                  {loading ? (
                    <span className="spinner">Analizando...</span>
                  ) : "Clasificar imagen"}
                </button>
                <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); reset(); }}>
                  Cambiar imagen
                </button>
              </div>
            </div>
          ) : (
            <div className="drop-content">
              <div className="drop-icon">画</div>
              <p className="drop-title">Arrastra una imagen aquí</p>
              <p className="drop-sub">o haz clic para seleccionar</p>
              <p className="drop-hint">PNG, JPG · Carácter Hiragana en fondo blanco</p>
            </div>
          )}
        </div>
      )}

      {error && <div className="error-msg">{error}</div>}

      {/* Results */}
      {result && (
        <div className="results">
          <div className="results-header">
            <div className="result-preview">
              <img src={preview} alt="Imagen subida" />
            </div>
            <div className="result-main">
              <p className="result-label">Predicción</p>
              <h2 className="result-char">{result.prediction}</h2>
              <div className="result-badges">
                <span className="badge badge-confidence">
                  {result.confidence}% confianza
                </span>
                <span className="badge badge-time">
                  {result.inference_time_ms} ms
                </span>
              </div>
            </div>
          </div>

          {/* Top 3 */}
          <div className="section">
            <h3 className="section-title">Top 3 predicciones</h3>
            <div className="top3">
              {result.top3.map((item, i) => (
                <div key={i} className={`top3-item ${i === 0 ? "top3-winner" : ""}`}>
                  <span className="top3-rank">#{i + 1}</span>
                  <span className="top3-char">{item.class}</span>
                  <div className="top3-bar-wrap">
                    <div
                      className="top3-bar"
                      style={{ width: `${item.probability}%` }}
                    />
                  </div>
                  <span className="top3-pct">{item.probability}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* All probabilities */}
          <div className="section">
            <h3 className="section-title">Probabilidad por clase</h3>
            <div className="all-probs">
              {result.all_probabilities.map((item, i) => (
                <div key={i} className="prob-row">
                  <span className="prob-label">{item.class}</span>
                  <div className="prob-bar-wrap">
                    <div
                      className="prob-bar"
                      style={{
                        width: `${item.probability}%`,
                        opacity: item.probability > 5 ? 1 : 0.4
                      }}
                    />
                  </div>
                  <span className="prob-pct">{item.probability}%</span>
                </div>
              ))}
            </div>
          </div>

          <button className="btn-primary" onClick={reset}>
            Clasificar otra imagen
          </button>
        </div>
      )}
    </div>
  );
}
