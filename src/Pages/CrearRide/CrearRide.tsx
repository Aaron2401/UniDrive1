import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "./CrearRide.css";

const locations = {
  "Universidad Tecnológica": [21.04966687410658, -86.84687016055352],
  "Plaza Las Américas": [21.14693396934119, -86.82236789178282],
  "Mercado 23": [21.168892924238012, -86.82726258623381],
  "Bonfil": [21.088043273148816, -86.84411226624552],
};

const CrearRide: React.FC = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState<string>("Universidad Tecnológica");
  const [destination, setDestination] = useState<string>("Plaza Las Américas");

  useEffect(() => {
    if (origin && destination) {
      // Crear un mapa con Mapbox
      const map = L.map("map").setView(locations[origin], 13);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ).addTo(map);

      // Crear la ruta entre origen y destino sin instrucciones
      const routeControl = L.Routing.control({
        waypoints: [
          L.latLng(locations[origin]),
          L.latLng(locations[destination]),
        ],
        createMarker: () => null, // No mostrar los marcadores por defecto
        routeWhileDragging: true, // Actualiza la ruta mientras arrastras
        showAlternatives: false, // Oculta rutas alternativas
        lineOptions: {
          styles: [{ color: "#0078ff", weight: 5, opacity: 0.7 }],
        },
        showInstructions: false, // Desactiva las instrucciones de la ruta
        routeLineOptions: {
          addWaypoints: false,
        },
      }).addTo(map);

      // Crear iconos predeterminados para el origen y destino usando Leaflet
      const originIcon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Ícono de marcador de Leaflet
        iconSize: [32, 32], // Tamaño del ícono
        iconAnchor: [16, 32], // Anclaje del ícono (en la base)
        popupAnchor: [0, -32], // Desplazamiento del popup
      });

      const destinationIcon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Ícono de marcador de Leaflet
        iconSize: [32, 32], // Tamaño del ícono
        iconAnchor: [16, 32], // Anclaje del ícono (en la base)
        popupAnchor: [0, -32], // Desplazamiento del popup
      });

      // Agregar los marcadores de origen y destino con los íconos predeterminados de Leaflet
      L.marker(locations[origin], { icon: originIcon }).addTo(map).bindPopup("Origen: " + origin);
      L.marker(locations[destination], { icon: destinationIcon }).addTo(map).bindPopup("Destino: " + destination);

      return () => {
        map.remove(); // Limpiar el mapa cuando el componente se desmonte
      };
    }
  }, [origin, destination]);

  const handleGoBack = () => {
    navigate("/dash"); // Redirige al dashboard
  };

  return (
    <div className="search-ride-container">
      <div className="search-bar">
        <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
          {Object.keys(locations).map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          {Object.keys(locations).map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div id="map" style={{ height: "400px", width: "100%", marginTop: "20px", padding: "10px" }}></div>
      <button
        onClick={handleGoBack}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#0078ff", // Azul de la página
          color: "white",
          border: "none",
          borderRadius: "20px", // Esquinas curvas
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Regresar al Dashboard
      </button>
    </div>
  );
};

export default CrearRide;
