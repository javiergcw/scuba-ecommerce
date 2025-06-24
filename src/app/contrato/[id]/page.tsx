"use client";
import React, { useState } from 'react';
import InformacionGeneral from '@/components/contrato/InformacionGeneral';
import ContactoEmergencia from '@/components/contrato/ContactoEmergencia';
import Accordion from '@/components/contrato/Accordion';
import FormularioMedico from '@/components/contrato/FormularioMedico';
import Politicas from '@/components/contrato/Politicas';

const ContratoPage = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = formData as any;
    const errores: string[] = [];

    // Información General
    if (!data.nombre) errores.push('El nombre es obligatorio.');
    if (!data.apellido) errores.push('El apellido es obligatorio.');
    if (!data.nacionalidad) errores.push('La nacionalidad es obligatoria.');
    if (!data.tipoDocumento) errores.push('El tipo de documento es obligatorio.');
    if (!data.numeroDocumento) errores.push('El número de documento es obligatorio.');
    if (!data.email) errores.push('El correo electrónico es obligatorio.');
    if (data.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) errores.push('El correo electrónico no es válido.');
    if (!data.phone) errores.push('El celular/WhatsApp es obligatorio.');
    if (!data.direccionCorrespondencia) errores.push('La dirección es obligatoria.');
    if (!data.ciudad) errores.push('La ciudad es obligatoria.');
    if (!data.estado) errores.push('El estado es obligatorio.');
    if (!data.pais) errores.push('El país es obligatorio.');
    if (!data.birthDate) errores.push('La fecha de nacimiento es obligatoria.');

    // Contacto de emergencia
    if (!data.emergenciaNombre) errores.push('El nombre de contacto de emergencia es obligatorio.');
    if (!data.emergenciaApellido) errores.push('El apellido de contacto de emergencia es obligatorio.');
    if (!data.emergenciaCodigoArea) errores.push('El código de área de emergencia es obligatorio.');
    if (!data.emergenciaTelefono) errores.push('El teléfono de emergencia es obligatorio.');
    if (!data.emergenciaEmail) errores.push('El email de emergencia es obligatorio.');
    if (data.emergenciaEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.emergenciaEmail)) errores.push('El email de emergencia no es válido.');

    // Formulario Médico
    for (let i = 0; i < 10; i++) {
      if (!data[`preguntaMedica${i}`]) errores.push(`Debes responder la pregunta médica ${i + 1}.`);
    }
    ['A','B','C','D','E','F','G'].forEach(cuadro => {
      const total = {
        'A': 5, 'B': 4, 'C': 4, 'D': 5, 'E': 4, 'F': 5, 'G': 6
      }[cuadro] ?? 0;
      for (let i = 0; i < total; i++) {
        if (!data[`cuadro${cuadro}${i}`]) errores.push(`Debes responder la pregunta del cuadro ${cuadro} número ${i + 1}.`);
      }
    });
    // Aquí podrías validar la firma del participante si la guardas en formData

    // Políticas
    if (!data.politicaSi) errores.push('Debes aceptar la política de privacidad.');
    if (!data.aceptaDeclaracion) errores.push('Debes aceptar la declaración de comprensión.');
    if (!data.aceptaContrato) errores.push('Debes aceptar el contrato de descargo.');
    // Si hay firma y nombre de padre/acudiente, validar también
    if ((data.nombrePadre || data.apellidoPadre) && (!data.nombrePadre || !data.apellidoPadre)) {
      errores.push('Debes completar el nombre y apellido del padre o acudiente.');
    }

    if (errores.length > 0) {
      setError(errores.join('\n'));
      setSuccess(false);
      return;
    }
    setError(null);
    setSuccess(true);
    // Aquí iría la lógica para enviar los datos (API, etc.)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto p-4 mt-20 mb-20">
        <Accordion title="Información General" defaultOpen>
          <InformacionGeneral formData={formData} setFormData={setFormData} />
        </Accordion>
        <Accordion title="Contacto de emergencia">
          <ContactoEmergencia formData={formData} setFormData={setFormData} />
        </Accordion>
        <Accordion title="Formulario Médico">
          <FormularioMedico />
        </Accordion>
        <Accordion title="Políticas">
          <Politicas formData={formData} setFormData={setFormData} />
        </Accordion>
        {/* Aquí puedes agregar más acordeones para otras secciones */}
        {error && (
          <div className="text-red-600 font-semibold my-4 whitespace-pre-line">
            {error.split('\n').map((err, idx) => (
              <div key={idx}>{err}</div>
            ))}
          </div>
        )}
        {success && <div className="text-green-600 font-semibold my-4">¡Formulario enviado correctamente!</div>}
        <button
          type="submit"
          className="mt-8 w-full bg-[#ffd900] hover:bg-[#e6c300] text-black font-bold py-3 px-6 rounded-lg shadow"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ContratoPage;
