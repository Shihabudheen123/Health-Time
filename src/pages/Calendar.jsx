import React, { useState, useEffect } from 'react';
import AppointmentForm from '../components/AppointmentForm';

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleAddAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-teal-700 mb-4">Appointment Calendar</h1>

      <div className="mb-6">
        <AppointmentForm onSubmit={handleAddAppointment} />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Appointments (Debug View)</h2>
        <pre className="bg-white p-4 rounded shadow text-sm overflow-x-auto">
          {JSON.stringify(appointments, null, 2)}
        </pre>
      </div>

      <div className="grid grid-cols-7 gap-4 bg-white rounded-lg shadow p-4">
        {[...Array(7 * 5)].map((_, i) => (
          <div key={i} className="h-24 border border-gray-200 rounded bg-gray-100"></div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
