import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface TerminosAlquilerProps {
  formData: any;
  setFormData: (data: any) => void;
}

const TerminosAlquiler: React.FC<TerminosAlquilerProps> = ({ formData, setFormData }) => {
  const sigClienteCanvas = useRef<any>(null);

  const handleCheckboxChange = (field: string) => {
    setFormData({
      ...formData,
      [field]: !formData[field]
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 text-sm text-gray-700">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">1. VALIDEZ DEL CONTRATO</h4>
          <p>Este formato tiene validez durante todos los días que el cliente utilice el equipo de buceo proporcionado por Oceano Scuba.</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">2. RESPONSABILIDAD POR PÉRDIDA O DAÑO</h4>
          <p>En caso de pérdida, robo o daño del equipo de buceo, la persona que firma este documento se compromete a pagar el valor total del equipo afectado según los precios vigentes en el mercado.</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">3. ENTREGA DEL EQUIPO</h4>
          <p>La persona se hace responsable de entregar el equipo completamente limpio y en las mismas condiciones en que fue recibido al final del día de inmersión.</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">4. COMPROMISO DE OCEANO SCUBA</h4>
          <p>Oceano Scuba se compromete a:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Entregar el equipo con mantenimiento al día y en perfecto estado de funcionamiento</li>
            <li>Cambiar cualquier pieza del equipo que presente fallas o requiera reemplazo durante el período de alquiler</li>
          </ul>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">5. USO EXCLUSIVO</h4>
          <p>El equipo se utilizará exclusivamente durante los servicios de buceo prestados con Oceano Scuba. Queda prohibido el uso del equipo fuera de las actividades programadas con nuestra empresa.</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <label htmlFor="aceptaTerminos" className="text-sm text-gray-900">
            <span className="font-semibold">DECLARACIÓN:</span> Declaro que he leído, entendido y acepto todos los términos y condiciones establecidos en este documento. Me comprometo a cumplir con todas las responsabilidades aquí descritas y a hacer uso responsable del equipo de buceo proporcionado por Oceano Scuba.
          </label>
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-base font-semibold mb-2">Firma del cliente <span className="text-red-500">*</span></label>
        <SignatureCanvas
          ref={sigClienteCanvas}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "bg-white rounded-md border border-gray-300 shadow-sm"
          }}
        />
        <button
          type="button"
          className="mt-2 px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={() => sigClienteCanvas.current.clear()}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default TerminosAlquiler; 