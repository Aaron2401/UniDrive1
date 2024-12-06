import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./MiPerfil.css"; // Asegúrate de tener un archivo CSS para los estilos

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    hobbies: "",
  });

  const navigate = useNavigate(); // Inicializar la función de navegación

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para manejar la actualización del perfil, como validación y envío a una API
    console.log("Datos del perfil:", formData);
  };

  // Función para redirigir al dashboard
  const handleGoBack = () => {
    navigate('/dash'); // Redirigir a la página del Dashboard
  };

  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="university">Universidad:</label>
          <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hobbies">Pasatiempos favoritos:</label>
          <input
            type="text"
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Guardar cambios
          </button>
        </div>
      </form>
      
      {/* Botón para regresar al dashboard */}
      <button onClick={handleGoBack} className="backButton">
        Volver al Dashboard
      </button>
    </div>
  );
};

export default Profile;
