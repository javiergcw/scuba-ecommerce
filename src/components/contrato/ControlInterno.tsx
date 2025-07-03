import React from 'react';

interface ControlInternoProps {
  formData: any;
  setFormData: (data: any) => void;
}

const ControlInterno: React.FC<ControlInternoProps> = ({ formData, setFormData }) => {
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
          <label htmlFor="recibidoPor" className="block text-sm font-medium text-gray-700 mb-2">
            Recibido por
          </label>
          <input
            type="text"
            id="recibidoPor"
            value={formData.recibidoPor || ''}
            onChange={(e) => handleInputChange('recibidoPor', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del empleado que recibe"
          />
        </div>

        <div>
          <label htmlFor="fechaRecibido" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de recepción
          </label>
          <input
            type="date"
            id="fechaRecibido"
            value={formData.fechaRecibido || ''}
            onChange={(e) => handleInputChange('fechaRecibido', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="entregadoPor" className="block text-sm font-medium text-gray-700 mb-2">
            Entregado por
          </label>
          <input
            type="text"
            id="entregadoPor"
            value={formData.entregadoPor || ''}
            onChange={(e) => handleInputChange('entregadoPor', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del empleado que entrega"
          />
        </div>

        <div>
          <label htmlFor="fechaEntregado" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de entrega
          </label>
          <input
            type="date"
            id="fechaEntregado"
            value={formData.fechaEntregado || ''}
            onChange={(e) => handleInputChange('fechaEntregado', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ControlInterno; 