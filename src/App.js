import './App.css';  // Asegúrate de que esta hoja de estilo tiene los nuevos estilos
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';  // Importa la configuración de Firebase
import { collection, addDoc, getDocs } from "firebase/firestore";  // Funciones de Firestore

function App() {
  // Estados para manejar el formulario
  const [patientName, setPatientName] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointments, setAppointments] = useState([]);

  // Función para agregar una nueva cita
  const handleAddAppointment = async (e) => {
    e.preventDefault();

    try {
      // Añadir la cita a Firestore
      await addDoc(collection(db, "appointments"), {
        patientName,
        appointmentTime
      });
      
      // Limpiar formulario
      setPatientName('');
      setAppointmentTime('');
      
      // Obtener las citas actualizadas
      fetchAppointments();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Función para obtener las citas
  const fetchAppointments = async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const appointmentsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setAppointments(appointmentsData);
  };

  // Hook para obtener las citas al cargar el componente
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="App">
      <h1>Registro de Citas Médicas</h1>
      
      <form onSubmit={handleAddAppointment}>
        <div>
          <label>Nombre del Paciente:</label>
          <input 
            type="text" 
            value={patientName} 
            onChange={(e) => setPatientName(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <label>Hora de la Cita:</label>
          <input 
            type="datetime-local" 
            value={appointmentTime} 
            onChange={(e) => setAppointmentTime(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit">Agregar Cita</button>
      </form>

      <h2>Citas Registradas</h2>
      {/* Aquí usamos las clases citas-container y cita-card */}
      <div className="citas-container">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="cita-card">
            <h3>{appointment.patientName}</h3>
            <p>Fecha y Hora: {new Date(appointment.appointmentTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
