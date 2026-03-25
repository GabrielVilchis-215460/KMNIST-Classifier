import { useState, useCallback } from "react";
import Predictor from "./components/Predictor";
import Instructions from "./components/Instructions";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("predict");

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-jp">かな</span>
            <div className="logo-text">
              <h1>KMNIST Classifier</h1>
              <p>Reconocimiento de caracteres Hiragana</p>
            </div>
          </div>
          <nav className="nav">
            <button
              className={activeTab === "predict" ? "nav-btn active" : "nav-btn"}
              onClick={() => setActiveTab("predict")}
            >
              Clasificar
            </button>
            <button
              className={activeTab === "instructions" ? "nav-btn active" : "nav-btn"}
              onClick={() => setActiveTab("instructions")}
            >
              Instrucciones
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        {activeTab === "predict" ? <Predictor /> : <Instructions />}
      </main>

      <footer className="footer">
        <p>Modelo entrenado con KMNIST · 10 caracteres Hiragana</p>
      </footer>
    </div>
  );
}
