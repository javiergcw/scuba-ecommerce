import React from 'react';

interface DatosClienteProps {
  formData: any;
  setFormData: (data: any) => void;
}

const DatosCliente: React.FC<DatosClienteProps> = ({ formData, setFormData }) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            id="nombreCompleto"
            value={formData.nombreCompleto || ''}
            onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese su nombre completo"
            required
          />
        </div>

        <div>
          <label htmlFor="numeroCedula" className="block text-sm font-medium text-gray-700 mb-2">
            Número de Cédula *
          </label>
          <input
            type="text"
            id="numeroCedula"
            value={formData.numeroCedula || ''}
            onChange={(e) => handleInputChange('numeroCedula', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese su número de cédula"
            required
          />
        </div>

        <div>
          <label htmlFor="fechaAlquiler" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de alquiler *
          </label>
          <input
            type="date"
            id="fechaAlquiler"
            value={formData.fechaAlquiler || ''}
            onChange={(e) => handleInputChange('fechaAlquiler', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="numeroDias" className="block text-sm font-medium text-gray-700 mb-2">
            Número de días de alquiler *
          </label>
          <input
            type="number"
            id="numeroDias"
            min="1"
            value={formData.numeroDias || ''}
            onChange={(e) => handleInputChange('numeroDias', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el número de días"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default DatosCliente; 