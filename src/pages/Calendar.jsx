import React, { useState, useEffect } from "react";
import AppointmentForm from "../components/AppointmentForm";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) setAppointments(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleAddAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-6xl mb-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-6 px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full transform -translate-x-20 translate-y-20"></div>
            </div>
            <div className="relative z-10">
              <div className="flex justify-center mb-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white drop-shadow-md">
                HealthTime Calendar
              </h1>
              <p className="text-blue-100 mt-2 font-light">
                Manage your clinic appointments
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AppointmentForm onSubmit={handleAddAppointment} />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-4 px-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white">
                  Appointment Calendar
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {new Date().toLocaleDateString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 bg-gray-50 p-2 border-b border-gray-200">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 auto-rows-fr gap-1 p-3 min-h-[600px]">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const dayAppointments = appointments.filter(
                  (app) => app.day === day - 1
                );
                return (
                  <div
                    key={day}
                    className="group flex flex-col p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition relative"
                  >
                    <div className="text-right text-sm font-medium text-gray-600 mb-1">
                      {day}
                    </div>
                    <div className="flex-1 space-y-1 overflow-y-auto">
                      {dayAppointments.map((app, index) => (
                        <div
                          key={index}
                          className="text-xs p-2 bg-blue-50 rounded border border-blue-100 text-blue-800"
                        >
                          <div className="font-medium">
                            {formatTime(app.time)}
                          </div>
                          <div className="truncate">{app.patient}</div>
                          <div className="text-blue-600 text-xs truncate">
                            {app.doctor}
                          </div>
                        </div>
                      ))}
                    </div>
                    {dayAppointments.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <div className="text-xs text-teal-600 font-medium bg-white/90 px-2 py-1 rounded-full border border-teal-200">
                          + Add appointment
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
