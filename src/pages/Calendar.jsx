import React from 'react';
import AppointmentForm from '../components/AppointmentForm';


const Calendar = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-teal-700 mb-4">Appointment Calendar</h1>
      
      <div className="grid grid-cols-7 gap-4 bg-white rounded-lg shadow p-4">
        {[...Array(7 * 5)].map((_, i) => (
          <div key={i} className="h-24 border border-gray-200 rounded bg-gray-100"></div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
