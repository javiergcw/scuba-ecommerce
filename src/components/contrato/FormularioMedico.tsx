"use client";
import React, { useRef } from "react";
import SignatureCanvas from 'react-signature-canvas';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
}

const FormularioMedico: React.FC<Props> = ({ formData, setFormData }) => {
  const preguntas = [
    "He tenido problemas con mis pulmones/respiración, corazón o sangre o he sido diagnosticado con el COVID-19. Si la respuesta es SI, ir al cuadro A (abajo).",
    "Tengo más de 45 años. Si la respuesta es SI, ir al cuadro B (abajo)",
    "Me cuesta realizar ejercicio moderado (por ejemplo, caminar 1,6 kilómetros/una milla en 12 minutos o nadar 200 metros/yardas sin descansar), O no he podido participar en una actividad física normal debido a razones de estado físico o de salud en los últimos 12 meses.",
    "He tenido problemas con mis ojos, oídos, o fosas nasales / senos nasales. Si la respuesta es SI, ir al cuadro C (abajo)",
    "He tenido una cirugía en los últimos 12 meses, O tengo problemas continuos relacionados con una cirugía anterior.",
    "He perdido el conocimiento, he tenido dolores de cabeza por migraña, convulsiones, accidente cerebrovascular, lesión significativa en la cabeza, o he sufrido de lesión o enfermedad neurológica persistente. Si la respuesta es SI, ir al cuadro D (abajo).",
    "He tenido problemas psicológicos (o he recibido tratamiento psicológico en los últimos 5 años), me diagnosticaron una discapacidad de aprendizaje, trastorno de la personalidad, ataque de pánico o una adicción a las drogas o el alcohol. Si la respuesta es SI, ir al cuadro E (abajo)",
    "He tenido problemas de espalda, hernia, úlceras o diabetes. Si la respuesta es SI, ir al cuadro F (abajo)",
    "He tenido problemas estomacales o intestinales, incluyendo úlcera o hemorragia reciente. Si la respuesta es SI, ir al cuadro G (abajo)",
    "Estoy tomando medicamentos recetados (con la excepción de los anticonceptivos o los medicamentos antipalúdicos que no sea Lariam-mefloquina)."
  ];

  const sigCanvas = useRef<any>(null);
  const sigPadreCanvas = useRef<any>(null);
  const now = new Date();
  const fechaHora = now.toLocaleDateString('es-ES') + ' ' + now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center mb-6">
        Informe Médico del Buceador | Cuestionario del participante (confidencial)
      </h2>
      <p className="mb-8 text-justify text-gray-800">
        El buceo requiere una buena salud física y mental. Hay algunas condiciones médicas que pueden ser peligrosas durante la práctica del buceo, y que se enumeran a continuación. Aquellos que tienen o están predispuestos a cualquiera de estas condiciones, deben ser evaluados por un médico. Este Cuestionario de Médico del Buceador proporciona una base para determinar si Ud. debe buscar esa evaluación. Si tiene alguna inquietud acerca de su estado físico para la práctica del buceo y no están representadas en este formulario, consulte con su médico antes de bucear. Las referencias a "buceo" en este formulario abarcan tanto el buceo Recreativo con equipo autónomo como el buceo en apnea. Este formulario está diseñado principalmente como un examen médico inicial para los nuevos buceadores, pero también es apropiado para los buceadores que reciben educación continua. Por su seguridad y la de otras personas que pueden bucear con usted, responda a todas las preguntas honestamente.
      </p>
      <h3 className="text-lg font-semibold mb-2 text-center">Instrucciones</h3>
      <p className="text-justify text-gray-800">
        Complete este cuestionario como requisito previo para el entrenamiento de apnea o de buceo con equipo autónomo. para las mujeres: Si usted está embarazada, o intenta quedar embarazada, no bucee.
      </p>
      <h3 className="text-lg font-semibold mb-2 mt-12">Cuestionario médico <span className="text-red-500">*</span></h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300 bg-gray-50">
          <thead>
            <tr>
              <th className="text-left px-4 py-2 bg-gray-200">&nbsp;</th>
              <th className="w-20 text-center px-4 py-2 bg-gray-200">Sí*</th>
              <th className="w-20 text-center px-4 py-2 bg-gray-200">No</th>
            </tr>
          </thead>
          <tbody>
            {preguntas.map((pregunta, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="px-4 py-2 align-top">{idx + 1}. {pregunta}</td>
                <td className="w-20 text-center px-4 py-2">
                  <input 
                    type="radio" 
                    name={`preguntaMedica${idx}`} 
                    value="si" 
                    checked={formData[`preguntaMedica${idx}`] === 'si'}
                    onChange={handleChange}
                  />
                </td>
                <td className="w-20 text-center px-4 py-2">
                  <input 
                    type="radio" 
                    name={`preguntaMedica${idx}`} 
                    value="no" 
                    checked={formData[`preguntaMedica${idx}`] === 'no'}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

      {/* Firma del Participante */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-center mb-6">Firma del Participante</h3>
        <p className="mb-4 text-center text-gray-800">
          Si respondió NO a las 10 preguntas anteriores, <b>NO</b> se requiere una evaluación médica. Por favor, lea y acepte la declaración del participante a continuación con la fecha y su firma.
        </p>
        <p className="mb-8 text-justify text-gray-800">
          <b>Declaración del Participante:</b> He respondido a todas las preguntas honestamente, y entiendo que acepto la responsabilidad por cualquier consecuencia resultante de cualquier pregunta que pueda haber respondido inexactamente o por no haber revelado cualquier condición de salud existente o pasada.
        </p>
        <div className="mb-4">
          <label className="block text-base font-semibold mb-2">Firma del participante <span className="text-red-500">*</span></label>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 600,
              height: 200,
              className: "bg-white rounded-md border border-gray-300 shadow-sm"
            }}
          />
          <button
            type="button"
            className="mt-2 px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={() => sigCanvas.current.clear()}
          >
            Limpiar
          </button>
        </div>
              {/* Fecha y hora */}
      <div className="mb-8">
        <label className="block text-base font-semibold mb-2">Fecha y hora</label>
        <input
          type="text"
          value={fechaHora}
          readOnly
          className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-base"
        />
      </div>
      {/* Firma padre o acudiente */}
      <div className="mb-8">
        <label className="block text-base font-semibold mb-2">Firma padre o acudiente (para menores de 18 años)</label>
        <SignatureCanvas
          ref={sigPadreCanvas}
          penColor="black"
          canvasProps={{
            width: 600,
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
      </div>
      {/* Advertencia y cuadros médicos */}
      <div className="mt-12 mb-12">
        <p className="mb-6 text-gray-800">
          <span className="font-bold">*</span> Si respondió SI a las preguntas 3, 5 o 10 anteriores O a cualquiera de las preguntas de los siguientes cuadros, lea y acepte la declaración anterior con la fecha y su firma Y lleve el <a href="#" className="text-blue-600 underline">Formulario de evaluación médica</a>, para una evaluación médica. La participación en un programa de entrenamiento de buceo, requiere la aprobación de su médico.
        </p>
        {/* Cuadro A */}
        <h4 className="text-lg font-semibold mb-2">Cuadro A. Tengo o he tenido</h4>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-gray-300 bg-gray-50">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 bg-gray-200">&nbsp;</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">Si</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">No</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Cirugía torácica, cirugía cardíaca, cirugía de válvula cardíaca, colocación de 'stent' o neumotórax (pulmón colapsado).",
                "Asma, sibilancias, alergias graves, fiebre del heno o vías respiratorias congestionadas en los últimos 12 meses que limite mi actividad física/ejercicio.",
                "Un problema o enfermedad que involucra mi corazón como: angina de pecho, dolor en el pecho en el esfuerzo, insuficiencia cardíaca, edema pulmonar, miocardiopatía o accidente cerebrovascular, O estoy tomando medicamentos para cualquier afección cardíaca.",
                "Bronquitis recurrente y tos persistente en los últimos 12 meses, o he sido diagnosticados con enfisema.",
                "Un diagnostico de COVID-19."
              ].map((pregunta, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-2 align-top">{pregunta}</td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroA${idx}`} 
                      value="si" 
                      checked={formData[`cuadroA${idx}`] === 'si'}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroA${idx}`} 
                      value="no" 
                      checked={formData[`cuadroA${idx}`] === 'no'}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Cuadro B */}
        <h4 className="text-lg font-semibold mb-2 mt-8">Cuadro B. Tengo mas de 45 años y:</h4>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-gray-300 bg-gray-50">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 bg-gray-200">&nbsp;</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">Si</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">No</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Actualmente fumo o inhalo nicotina por otros medios.",
                "Tengo un nivel alto de colesterol.",
                "Tengo presión arterial alta.",
                "He tenido un familiar (de 1er. O 2º grado de consanguinidad) que murió de muerte súbita o de enfermedad cardíaca o accidente cerebrovascular antes de los 50 años, O tengo antecedentes familiares de enfermedad cardíaca antes de los 50 años (incluidos ritmos cardíacos anormales, enfermedad de las arterias coronarias o miocardiopatía)."
              ].map((pregunta, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-2 align-top">{pregunta}</td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroB${idx}`} 
                      value="si" 
                      checked={formData[`cuadroB${idx}`] === 'si'}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroB${idx}`} 
                      value="no" 
                      checked={formData[`cuadroB${idx}`] === 'no'}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Cuadro C */}
        <h4 className="text-lg font-semibold mb-2 mt-8">Cuadro C. Tengo o he tenido</h4>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-gray-300 bg-gray-50">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 bg-gray-200">&nbsp;</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">Si</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">No</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Cirugía sinusal en los últimos 6 meses.",
                "Enfermedades del oído o cirugía del oído, pérdida de audición o alteraciones del equilibrio.",
                "Sinusitis recurrente en los últimos 12 meses.",
                "Cirugía ocular en los últimos 3 meses."
              ].map((pregunta, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-2 align-top">{pregunta}</td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroC${idx}`} 
                      value="si" 
                      checked={formData[`cuadroC${idx}`] === 'si'}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroC${idx}`} 
                      value="no" 
                      checked={formData[`cuadroC${idx}`] === 'no'}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Cuadro D */}
        <h4 className="text-lg font-semibold mb-2 mt-8">Cuadro D. Tengo o he tenido</h4>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-gray-300 bg-gray-50">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 bg-gray-200">&nbsp;</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">Si</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">No</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Lesión en la cabeza con pérdida de conciencia en los últimos 5 años.",
                "Lesiones o enfermedades neurológicas persistentes.",
                "Dolores de cabeza recurrentes por migraña en los últimos 12 meses, o tomo medicamentos para prevenirlos.",
                "Desvanecimientos o desmayos (pérdida total/parcial de la conciencia) en los últimos 5 años.",
                "Epilepsia, ataques o convulsiones, O tomo medicamentos para prevenirlos."
              ].map((pregunta, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-2 align-top">{pregunta}</td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroD${idx}`} 
                      value="si" 
                      checked={formData[`cuadroD${idx}`] === 'si'}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroD${idx}`} 
                      value="no" 
                      checked={formData[`cuadroD${idx}`] === 'no'}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Cuadro E */}
        <h4 className="text-lg font-semibold mb-2 mt-8">Cuadro E. Tengo o he tenido</h4>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-gray-300 bg-gray-50">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 bg-gray-200">&nbsp;</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">Si</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">No</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Salud conductual, problemas mentales o psicológicos que requieran tratamiento médico/psiquiátrico.",
                "Depresión Mayor, tendencia suicida, ataques de pánico, trastorno bipolar descontrolado que requiere medicación/tratamiento psiquiátrico.",
                "He sido diagnosticado con una condición de salud mental o un trastorno de aprendizaje/desarrollo que requiere atención continua.",
                "Una adicción a las drogas o al alcohol que requiere tratamiento en los últimos 5 años."
              ].map((pregunta, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-2 align-top">{pregunta}</td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroE${idx}`} 
                      value="si" 
                      checked={formData[`cuadroE${idx}`] === 'si'}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroE${idx}`} 
                      value="no" 
                      checked={formData[`cuadroE${idx}`] === 'no'}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Cuadro F */}
        <h4 className="text-lg font-semibold mb-2 mt-8">Cuadro F. Tengo o he tenido</h4>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-gray-300 bg-gray-50">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 bg-gray-200">&nbsp;</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">Si</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">No</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Problemas recurrentes en la espalda en los últimos 6 meses que limitan mi actividad diaria.",
                "Cirugía de espalda o columna vertebral en los últimos 12 meses.",
                "Diabetes, ya sea controlada por insulina o por dieta, O diabetes gestacional en los últimos 12 meses.",
                "Una hernia no corregida que limita mis habilidades físicas.",
                "Úlceras activas o no tratadas, heridas problemáticas o cirugía de úlceras en los últimos 6 meses."
              ].map((pregunta, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-2 align-top">{pregunta}</td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroF${idx}`} 
                      value="si" 
                      checked={formData[`cuadroF${idx}`] === 'si'}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroF${idx}`} 
                      value="no" 
                      checked={formData[`cuadroF${idx}`] === 'no'}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Cuadro G */}
        <h4 className="text-lg font-semibold mb-2 mt-8">Cuadro G. Tengo</h4>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-gray-300 bg-gray-50">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 bg-gray-200">&nbsp;</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">Si</th>
                <th className="w-20 text-center px-4 py-2 bg-gray-200">No</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Cirugía de ostomía y no tengo autorización médica para nadar o participar en actividad física..",
                "Deshidratación que requiere intervención médica en los últimos 7 días.",
                "Úlceras estomacales o intestinales activas o no tratadas o cirugía de úlceras en los últimos 6 meses.",
                "Ardor de estómago frecuente, regurgitación o enfermedad por reflujo gastroesofágico (ERGE).",
                "Colitis ulcerosa activa o no controlada o enfermedad de Crohn.",
                "Cirugía bariátrica en los últimos 12 meses."
              ].map((pregunta, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-2 align-top">{pregunta}</td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroG${idx}`} 
                      value="si" 
                      checked={formData[`cuadroG${idx}`] === 'si'}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="w-20 text-center px-4 py-2">
                    <input 
                      type="radio" 
                      name={`cuadroG${idx}`} 
                      value="no" 
                      checked={formData[`cuadroG${idx}`] === 'no'}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormularioMedico; 