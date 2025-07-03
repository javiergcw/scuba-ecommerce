"use client";
import React from "react";

interface Props {
  formData: any;
  setFormData: (data: any) => void;
}

const ContactoEmergencia: React.FC<Props> = ({ formData, setFormData }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contacto de emergencia</h2>
      <form>
        {/* Nombre y Apellido */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                name="emergenciaNombre"
                placeholder="Nombre"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                value={formData.emergenciaNombre || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="emergenciaApellido"
                placeholder="Apellido"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                value={formData.emergenciaApellido || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        {/* Teléfono */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de teléfono <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="w-1/3">
              <input
                type="text"
                name="emergenciaCodigoArea"
                placeholder="Código de área"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                value={formData.emergenciaCodigoArea || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="emergenciaTelefono"
                placeholder="Número de teléfono"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                value={formData.emergenciaTelefono || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        {/* Email */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="emergenciaEmail"
            placeholder="ejemplo@ejemplo.com"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
            value={formData.emergenciaEmail || ""}
            onChange={handleChange}
            required
          />
        </div>
        {/* Fecha y Hora */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha y Hora <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="date"
                name="emergenciaFecha"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                value={formData.emergenciaFecha || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="time"
                name="emergenciaHora"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                value={formData.emergenciaHora || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactoEmergencia; 