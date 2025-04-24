import React, { useState, useEffect } from "react";
import "./FlirtyGame.css";

const questions = [
  "¿Me has extrañado?",
  "¿Piensas en mí a menudo?",
  "¿Te emociona cuando hablamos?",
  "¿Quieres pasar más tiempo juntos?",
  "¿Te sorprendió mi último regalo?",
  "¿Te gusta cómo te hablo?",
  "¿Me extrañas cuando no nos vemos?",
  "¿Disfrutas nuestras conversaciones?",
  "¿Sueñas conmigo a veces?",
  "¿Te hace feliz mi voz?",
  "¿Te gustó nuestra última cita?",
  "¿Te gustaría que te llame más?",
  "¿Sientes mariposas al verme?",
  "¿Te atreverías a mandarme un mensaje primero?",
  "¿Quieres algo más que amistad?",
];

const FlirtyGame: React.FC = () => {
  const [step, setStep] = useState(0);
  const [noStyle, setNoStyle] = useState<React.CSSProperties>({});
  const [confirmCount, setConfirmCount] = useState(0);
  const [showEnvelope, setShowEnvelope] = useState(false);

  // Reset no-button position on each question change
  useEffect(() => {
    setNoStyle({});
  }, [step]);

  const handleYes = () => {
    // Si es la última pregunta (índice 14), iniciamos confirmación
    if (step === questions.length - 1) {
      setStep(step + 1);
    } else if (step === questions.length) {
      // Flujo de confirmación: cuenta hasta 3 "sí"
      const nextCount = confirmCount + 1;
      setConfirmCount(nextCount);
      if (nextCount >= 3) {
        // Mostrar animación del sobre
        setShowEnvelope(true);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleNo = () => {
    // Mover a posición aleatoria dentro del contenedor
    const randomX = Math.floor(Math.random() * 300) - 150;
    const randomY = Math.floor(Math.random() * 300) - 150;
    setNoStyle({
      transform: `translate(${randomX}px, ${randomY}px)`,
    });
  };

  // Renderizamos diferentes vistas según el paso
  return (
    <div className="flirty-container">
      {!showEnvelope && step < questions.length && (
        <div className="flirty-box">
          <p className="question">{questions[step]}</p>
          <div className="btn-group">
            <button className="yes-btn" onClick={handleYes}>
              Sí
            </button>
            <button className="no-btn" onClick={handleNo} style={noStyle}>
              No
            </button>
          </div>
        </div>
      )}

      {!showEnvelope && step === questions.length && (
        <div className="flirty-box">
          <p className="question">¿De verdad estás segura?</p>
          <div className="btn-group">
            <button className="yes-btn" onClick={handleYes}>
              Sí
            </button>
            <button className="no-btn" onClick={handleNo} style={noStyle}>
              No
            </button>
          </div>
          <p className="hint">({confirmCount} de 3 confirmaciones)</p>
        </div>
      )}

      {showEnvelope && (
        <div className="envelope-overlay">
          <div className="envelope">
            <img src="/sobre.jpg" alt="Sobre" className="sobre-img" />
            <div className="letter">
              <p>Te extraño</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlirtyGame;
