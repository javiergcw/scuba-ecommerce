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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Validar que el teléfono tenga al menos 10 dígitos
    const phoneDigits = phone.replace(/\D/g, '');
    return phoneDigits.length >= 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = formData as any;
    const errores: string[] = [];

    // ===== VALIDACIÓN INFORMACIÓN GENERAL =====
    if (!data.nombre?.trim()) errores.push('El nombre es obligatorio.');
    if (!data.apellido?.trim()) errores.push('El apellido es obligatorio.');
    if (!data.nacionalidad) errores.push('La nacionalidad es obligatoria.');
    if (!data.tipoDocumento) errores.push('El tipo de documento es obligatorio.');
    if (!data.numeroDocumento?.trim()) errores.push('El número de documento es obligatorio.');
    
    // Validar email
    if (!data.email?.trim()) {
      errores.push('El correo electrónico es obligatorio.');
    } else if (!validateEmail(data.email)) {
      errores.push('El correo electrónico no tiene un formato válido.');
    }
    
    // Validar teléfono
    if (!data.phone) {
      errores.push('El celular/WhatsApp es obligatorio.');
    } else if (!validatePhone(data.phone)) {
      errores.push('El número de teléfono debe tener al menos 10 dígitos.');
    }
    
    if (!data.direccionCorrespondencia?.trim()) errores.push('La dirección es obligatoria.');
    if (!data.ciudad?.trim()) errores.push('La ciudad es obligatoria.');
    if (!data.estado?.trim()) errores.push('El estado es obligatorio.');
    if (!data.pais?.trim()) errores.push('El país es obligatorio.');
    if (!data.birthDate) errores.push('La fecha de nacimiento es obligatoria.');
    
    // Validar edad mínima (18 años)
    if (data.birthDate) {
      const birthDate = new Date(data.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        errores.push('Debes ser mayor de 18 años para completar este formulario.');
      }
    }

    // ===== VALIDACIÓN CONTACTO DE EMERGENCIA =====
    if (!data.emergenciaNombre?.trim()) errores.push('El nombre de contacto de emergencia es obligatorio.');
    if (!data.emergenciaApellido?.trim()) errores.push('El apellido de contacto de emergencia es obligatorio.');
    if (!data.emergenciaCodigoArea?.trim()) errores.push('El código de área de emergencia es obligatorio.');
    if (!data.emergenciaTelefono?.trim()) errores.push('El teléfono de emergencia es obligatorio.');
    
    // Validar email de emergencia
    if (!data.emergenciaEmail?.trim()) {
      errores.push('El email de emergencia es obligatorio.');
    } else if (!validateEmail(data.emergenciaEmail)) {
      errores.push('El email de emergencia no tiene un formato válido.');
    }
    
    if (!data.emergenciaFecha) errores.push('La fecha de emergencia es obligatoria.');
    if (!data.emergenciaHora) errores.push('La hora de emergencia es obligatoria.');

    // ===== VALIDACIÓN FORMULARIO MÉDICO =====
    // Validar las 10 preguntas principales
    for (let i = 0; i < 10; i++) {
      if (!data[`preguntaMedica${i}`]) {
        errores.push(`Debes responder la pregunta médica ${i + 1}.`);
      }
    }
    
    // Validar cuadros médicos según las respuestas
    const cuadrosConfig = {
      'A': { total: 5, pregunta: 1 }, // Cuadro A - pregunta 1
      'B': { total: 4, pregunta: 2 }, // Cuadro B - pregunta 2
      'C': { total: 4, pregunta: 4 }, // Cuadro C - pregunta 4
      'D': { total: 5, pregunta: 6 }, // Cuadro D - pregunta 6
      'E': { total: 4, pregunta: 7 }, // Cuadro E - pregunta 7
      'F': { total: 5, pregunta: 8 }, // Cuadro F - pregunta 8
      'G': { total: 6, pregunta: 9 }  // Cuadro G - pregunta 9
    };
    
    Object.entries(cuadrosConfig).forEach(([cuadro, config]) => {
      const preguntaPrincipal = data[`preguntaMedica${config.pregunta - 1}`];
      if (preguntaPrincipal === 'si') {
        // Si respondió SI a la pregunta principal, validar el cuadro correspondiente
        for (let i = 0; i < config.total; i++) {
          if (!data[`cuadro${cuadro}${i}`]) {
            errores.push(`Debes responder la pregunta del cuadro ${cuadro} número ${i + 1}.`);
          }
        }
      }
    });

    // ===== VALIDACIÓN POLÍTICAS =====
    if (!data.politicaSi && !data.politicaNo) {
      errores.push('Debes seleccionar si aceptas o no la política de privacidad.');
    } else if (data.politicaNo) {
      errores.push('Debes aceptar la política de privacidad para continuar.');
    }
    
    // Validar que al menos una de las declaraciones esté aceptada
    if (!data.aceptaDeclaracion && !data.aceptaContrato) {
      errores.push('Debes aceptar al menos una de las declaraciones (Declaración de comprensión o Contrato de descargo).');
    }
    
    // Validar firma del participante (si se implementa)
    if (data.requireSignature && !data.participantSignature) {
      errores.push('La firma del participante es obligatoria.');
    }
    
    // Validar información del padre/acudiente si es menor de edad
    if (data.birthDate) {
      const birthDate = new Date(data.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 18) {
        if (!data.nombrePadre?.trim() || !data.apellidoPadre?.trim()) {
          errores.push('Para menores de 18 años, el nombre y apellido del padre o acudiente son obligatorios.');
        }
        if (!data.parentSignature) {
          errores.push('Para menores de 18 años, la firma del padre o acudiente es obligatoria.');
        }
      }
    }

    // ===== VALIDACIONES ADICIONALES =====
    // Validar que no haya campos con solo espacios
    const textFields = ['nombre', 'apellido', 'numeroDocumento', 'direccionCorrespondencia', 'ciudad', 'estado', 'pais'];
    textFields.forEach(field => {
      if (data[field] && data[field].trim() === '') {
        errores.push(`El campo ${field} no puede contener solo espacios.`);
      }
    });

    // Validar formato de documento si es "Otro"
    if (data.tipoDocumento === 'Otro' && !data.otroTipoDocumento?.trim()) {
      errores.push('Debes especificar el tipo de documento cuando seleccionas "Otro".');
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
          <FormularioMedico formData={formData} setFormData={setFormData} />
        </Accordion>
        <Accordion title="Políticas">
          <Politicas formData={formData} setFormData={setFormData} />
        </Accordion>
        
        {/* Mostrar errores */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
            <h3 className="text-red-800 font-semibold mb-2">Errores de validación:</h3>
            <div className="text-red-700 space-y-1">
              {error.split('\n').map((err, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>{err}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Mostrar éxito */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
            <div className="text-green-800 font-semibold">¡Formulario enviado correctamente!</div>
          </div>
        )}
        
        <button
          type="submit"
          className="mt-8 w-full bg-[#ffd900] hover:bg-[#e6c300] text-black font-bold py-3 px-6 shadow transition-colors duration-200"
        >
          Enviar Formulario
        </button>
      </div>
    </form>
  );
};

export default ContratoPage;
