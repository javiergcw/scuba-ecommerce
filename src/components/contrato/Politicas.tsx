"use client";
import React, { useRef } from "react";
import SignatureCanvas from 'react-signature-canvas';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
}

const Politicas: React.FC<Props> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const sigPadreCanvas = useRef<any>(null);

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <p className="mb-4 text-gray-800 font-semibold">
        Autorizo a Oceano Deportes Scuba para que dé, a los datos aquí recopilados y al material fotográfico obtenido durante la actividad contratada, el tratamiento señalado en su "Política de Privacidad y Protección de Datos Personales", la cual se encuentra disponible para consulta en la página web www.oceanoscuba.com.co. El tratamiento que se dará incluye, entre otras, el uso de la información para desarrollo de los servicios contratado y el envío de información promocional. Usted podrá solicitar que la información sea modificada, actualizada o retirada de las bases de datos de Oceano Deportes Scuba, mediante escrito dirigido al correo electrónico oceano@oceanoscuba.com.co, indicando en el asunto el derecho que desea ejercer. Autorizo al Oceano Deportes Scuba para que haga el uso y tratamiento de mis derechos de imagen para incluirlos sobre fotografías y producciones audiovisuales (videos); así como de los Derechos de Autor; los Derechos Conexos y en general todos aquellos derechos de propiedad intelectual que tengan que ver con el derecho de imagen. <span className="text-red-500">*</span>
      </p>

      <div className="mb-6 mt-8 flex items-center gap-8">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="politicaSi"
            checked={!!formData.politicaSi}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span className="text-lg font-medium ml-2">Sí</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="politicaNo"
            checked={!!formData.politicaNo}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span className="text-lg font-medium ml-2">No</span>
        </label>
      </div>

      <div className="mb-8 mt-6">
        {/* Mejor espaciado y alineación */}
        <label className="flex items-start gap-2 text-lg font-normal text-gray-700">
          <input
            type="checkbox"
            name="aceptaDeclaracion"
            checked={!!formData.aceptaDeclaracion}
            onChange={handleChange}
            className="w-5 h-5 mt-1"
          />
          <span className="mt-0.5 ml-2">
            Estoy de acuerdo con <a href="/pdfs/Declaracion-de-comprension.pdf" target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">Declaración de comprensión de Prácticas Estándares de Buceo Seguro.</a> <span className="text-red-500">*</span>
          </span>
        </label>
      </div>

      <div className="mb-8 mt-6">
        {/* Mejor espaciado y alineación */}
        <label className="flex items-start gap-2 text-lg font-normal text-gray-700">
          <input
            type="checkbox"
            name="aceptaContrato"
            checked={!!formData.aceptaContrato}
            onChange={handleChange}
            className="w-5 h-5 mt-1"
          />
          <span className="mt-0.5 ml-2">
            Estoy de acuerdo con el <a href="/pdfs/Liberacion-de-responsabilidad.pdf" target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">Contrato de Descargo de Responsabilidad y Asunción del Riesgo.</a> <span className="text-red-500">*</span>
          </span>
        </label>
      </div>

      <div className="mt-12">
        <label className="block text-base font-semibold mb-2">Firma del padre o acudiente</label>
        <SignatureCanvas
          ref={sigPadreCanvas}
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
          onClick={() => sigPadreCanvas.current.clear()}
        >
          Limpiar
        </button>
      </div>

      <div className="mt-8">
        <label className="block text-base font-semibold mb-2">Nombre del padre o acudiente</label>
        <div className="flex gap-4">
          <div>
            <input
              type="text"
              name="nombrePadre"
              placeholder="Nombre"
              className="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
              value={formData.nombrePadre || ''}
              onChange={handleChange}
            />
            <div className="text-xs text-gray-500 mt-1">Nombre</div>
          </div>
          <div>
            <input
              type="text"
              name="apellidoPadre"
              placeholder="Apellido"
              className="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
              value={formData.apellidoPadre || ''}
              onChange={handleChange}
            />
            <div className="text-xs text-gray-500 mt-1">Apellido</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Politicas;
