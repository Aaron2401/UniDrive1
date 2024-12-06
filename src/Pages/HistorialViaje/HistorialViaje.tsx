import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

interface Trip {
  date: string;
  time: string;
  user: string;
  origin: string;
  destination: string;
  price: number;
}

const tripData: Trip[] = [
  { date: '2024-12-01', time: '08:00', user: 'Juan Pérez', origin: 'Campus Norte', destination: 'Campus Sur', price: 50 },
  { date: '2024-12-02', time: '09:30', user: 'Ana García', origin: 'Campus Central', destination: 'Campus Este', price: 40 },
  { date: '2024-12-03', time: '11:00', user: 'Carlos López', origin: 'Residencias Universitarias', destination: 'Campus Oeste', price: 30 },
  { date: '2024-12-04', time: '13:00', user: 'María Fernández', origin: 'Campus Sur', destination: 'Campus Norte', price: 60 },
];

const TravelHistory: React.FC = () => {
  const navigate = useNavigate(); // Inicializar la función de navegación
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(tripData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = tripData.filter(
      trip =>
        trip.date.toLowerCase().includes(value) ||
        trip.origin.toLowerCase().includes(value) ||
        trip.destination.toLowerCase().includes(value) ||
        trip.user.toLowerCase().includes(value) ||
        trip.price.toString().includes(value)
    );

    setFilteredTrips(filtered);
  };

  // Función para redirigir al inicio
  const handleGoBack = () => {
    navigate('/dash'); // Redirigir a la página principal
  };

  return (
    <div style={styles.fullPage}>
      <div style={styles.container}>
        <h1 style={styles.header}>Unidrive - Historial de Viajes</h1>
        <div style={styles.searchFilterContainer}>
          <input
            type="text"
            placeholder="Buscar por fecha, lugar, usuario o precio..."
            value={searchTerm}
            onChange={handleSearch}
            style={styles.searchBar}
          />
        </div>
        <div style={styles.tripsContainer}>
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip, index) => (
              <div key={index} style={styles.tripCard}>
                <p style={styles.tripCardText}><strong>Fecha:</strong> {trip.date}</p>
                <p style={styles.tripCardText}><strong>Hora:</strong> {trip.time}</p>
                <p style={styles.tripCardText}><strong>Usuario:</strong> {trip.user}</p>
                <p style={styles.tripCardText}><strong>Origen:</strong> {trip.origin}</p>
                <p style={styles.tripCardText}><strong>Destino:</strong> {trip.destination}</p>
                <p style={styles.tripCardText}><strong>Precio:</strong> ${trip.price}</p>
              </div>
            ))
          ) : (
            <p style={styles.noResults}>No se encontraron viajes para la búsqueda.</p>
          )}
        </div>
        
        {/* Botón para regresar al inicio */}
        <button onClick={handleGoBack} style={styles.backButton}>
          Regresar al Dashboard
        </button>
      </div>
    </div>
  );
};

// Aquí defines los estilos de manera inline dentro del mismo archivo
const styles = {
  fullPage: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#E3F2FD', // Azul cielo claro
    display: 'flex',
    justifyContent: 'center', // Centrado horizontal
    alignItems: 'flex-start', // Alineación al inicio para que no se quede centrado verticalmente
    padding: '20px',
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '30px', // Agregado espacio para mayor comodidad
    maxWidth: '1000px', // Mayor espacio en el contenedor
    width: '100%',
    backgroundColor: '#FFFFFF', // Fondo blanco del contenedor
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '30px',
    color: '#000000', // Letras negras
  },
  searchFilterContainer: {
    display: 'flex',
    marginBottom: '20px',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 1,
    padding: '12px',
    border: '1px solid #90CAF9', // Azul claro para bordes
    borderRadius: '4px',
    width: '100%',
    outline: 'none',
  },
  tripsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px', // Espacio entre las tarjetas
  },
  tripCard: {
    border: '1px solid #BBDEFB', // Azul suave para bordes de tarjeta
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#FFFFFF', // Fondo blanco
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tripCardText: {
    marginBottom: '8px',
    fontSize: '16px',
    color: '#000000',
  },
  noResults: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#757575',
    gridColumn: 'span 2',
  },
  backButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#0078ff', // Azul de la página
    color: '#fff',
    fontSize: '16px',
    borderRadius: '20px', // Esquinas curvas
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
    textAlign: 'center',
    width: '100%',
  },
};

export default TravelHistory;
