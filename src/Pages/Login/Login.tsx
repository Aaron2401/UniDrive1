import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [emailName, setEmailName] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!emailName || !emailDomain || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Simula inicio de sesión exitoso
    const fullEmail = `${emailName}${emailDomain}`;
    localStorage.setItem('userEmail', fullEmail); // Guarda el correo en el localStorage
    navigate('/dash'); // Redirige al dashboard
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img
          src="/Images/imagen-login.jpg"
          alt="Imagen decorativa para login"
          className="login-image"
        />
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="email-name">Correo electrónico:</label>
            {`${emailName}${emailDomain}` && (
              <p className="preview-email">Tu correo: {`${emailName}${emailDomain}`}</p>
            )}
            <div className="email-input-group">
              <input
                type="text"
                id="email-name"
                value={emailName}
                onChange={(e) => setEmailName(e.target.value)}
                placeholder="Introduce tu correo"
              />
              <select
                id="email-domain"
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona un dominio
                </option>
                <option value="@utcancun.edu.mx">@utcancun.edu.mx</option>
                <option value="@anahuac.mx">@anahuac.mx</option>
                <option value="@lasalle.mx">@lasalle.mx</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
