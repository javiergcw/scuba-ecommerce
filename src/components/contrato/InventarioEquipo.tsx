import React from 'react';

interface InventarioEquipoProps {
  formData: any;
  setFormData: (data: any) => void;
}

const InventarioEquipo: React.FC<InventarioEquipoProps> = ({ formData, setFormData }) => {
  const equipos = [
    { id: 'chaleco', nombre: 'Chaleco BCD (Compensador de flotabilidad)' },
    { id: 'regulador', nombre: 'Regulador (Primera y segunda etapa)' },
    { id: 'mascara', nombre: 'Máscara de buceo' },
    { id: 'aletas', nombre: 'Aletas' },
    { id: 'snorkel', nombre: 'Snorkel' },
    { id: 'traje', nombre: 'Traje de neopreno' },
    { id: 'nasa', nombre: 'Nasa (Bolsa de malla)' }
  ];

  const handleCheckboxChange = (equipoId: string) => {
    setFormData({
      ...formData,
      [`equipo_${equipoId}`]: !formData[`equipo_${equipoId}`]
    });
  };

  const handleNumeroChange = (equipoId: string, numero: string) => {
    setFormData({
      ...formData,
      [`numero_${equipoId}`]: numero
    });
  };

  return (
    <div className="space-y-6">

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        
        <p className="text-sm text-gray-900">
        Marque con una X los elementos que componen el equipo alquilado:
        </p>
      </div>

      <div className="space-y-4">
        {equipos.map((equipo) => (
          <div key={equipo.id} className="flex items-center space-x-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex-shrink-0">
              <input
                type="checkbox"
                id={`equipo_${equipo.id}`}
                checked={formData[`equipo_${equipo.id}`] || false}
                onChange={() => handleCheckboxChange(equipo.id)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            
            <div className="flex-1">
              <label htmlFor={`equipo_${equipo.id}`} className="text-sm font-medium text-gray-700">
                {equipo.nombre}
              </label>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-sm text-gray-500 font-medium">No.</span>
              <input
                type="text"
                value={formData[`numero_${equipo.id}`] || ''}
                onChange={(e) => handleNumeroChange(equipo.id, e.target.value)}
                className="w-40 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventarioEquipo; 