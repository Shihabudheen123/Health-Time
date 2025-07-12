import React, { useState } from 'react';
import doctors from '../data/doctors.json';
import patients from '../data/patients.json';

const AppointmentForm = ({ onSubmit }) => {
  const [doctor, setDoctor] = useState('');
  const [patient, setPatient] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (doctor && patient && time) {
      onSubmit({ doctor, patient, time });
      setDoctor('');
      setPatient('');
      setTime('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Create Appointment</h2>

      <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="w-full border rounded p-2" required>
        <option value="">Select Doctor</option>
        {doctors.map((doc, i) => (
          <option key={i} value={doc}>{doc}</option>
        ))}
      </select>

      <select value={patient} onChange={(e) => setPatient(e.target.value)} className="w-full border rounded p-2" required>
        <option value="">Select Patient</option>
        {patients.map((pat, i) => (
          <option key={i} value={pat}>{pat}</option>
        ))}
      </select>

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full border rounded p-2"
        required
      />

      <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600">
        Add Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;
