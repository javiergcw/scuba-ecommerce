"use client"
import React from 'react';
import { countries } from '@/utils/constants';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
}

const InformacionGeneral: React.FC<Props> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentLevels = formData.certificationLevel || [];

    let newLevels;
    if (checked) {
      newLevels = [...currentLevels, value];
    } else {
      newLevels = currentLevels.filter((level: string) => level !== value);
    }
    setFormData({ ...formData, certificationLevel: newLevels });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, birthDate: date });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const countryCodeToFlag = (isoCode: string) => {
    if (!isoCode || isoCode.length !== 2) {
      return '';
    }
    return isoCode
      .toUpperCase()
      .split('')
      .map((char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      .join('');
  };

  const documentTypes = [
    'Cédula de Identidad',
    'Pasaporte',
    'Licencia de Conducir',
    'Otro',
  ];

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Información General</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
              value={formData.nombre || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              name="apellido"
              id="apellido"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
              value={formData.apellido || ''}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="nacionalidad" className="block text-sm font-medium text-gray-700">Nacionalidad</label>
            <select
              name="nacionalidad"
              id="nacionalidad"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
              value={formData.nacionalidad || ''}
              onChange={handleChange}
            >
              <option value="">Seleccione un país</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {countryCodeToFlag(country.value)} {country.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
            <select
              name="tipoDocumento"
              id="tipoDocumento"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
              value={formData.tipoDocumento || ''}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="numeroDocumento" className="block text-sm font-medium text-gray-700">Número de Documento</label>
            <input
              type="text"
              name="numeroDocumento"
              id="numeroDocumento"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
              value={formData.numeroDocumento || ''}
              onChange={handleChange}
            />
          </div>
          {formData.tipoDocumento === 'Otro' && (
            <div className="md:col-span-2">
              <label htmlFor="otroTipoDocumento" className="block text-sm font-medium text-gray-700">Especifique el tipo de documento</label>
              <input
                type="text"
                name="otroTipoDocumento"
                id="otroTipoDocumento"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                value={formData.otroTipoDocumento || ''}
                onChange={handleChange}
                placeholder="Ej: Tarjeta de Residencia"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Celular / WhatsApp</label>
            <PhoneInput
              country={'us'}
              value={formData.phone || ''}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'phone',
                required: true,
              }}
              containerClass="mt-1"
              inputStyle={{
                width: '100%',
                height: '38px',
                padding: '8px 8px 8px 58px',
                borderRadius: '0.375rem',
                borderColor: '#d1d5db',
              }}
              buttonStyle={{
                borderRadius: '0.375rem 0 0 0.375rem',
                borderColor: '#d1d5db',
              }}
            />
          </div>
        </div>
        {/* Dirección */}
        <div className="mb-16">
        <h3 className="text-xl font-bold mt-12 mb-6 text-gray-800">Dirección</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <label htmlFor="direccionCorrespondencia" className="block text-sm font-medium text-gray-700">Dirección de correspondencia</label>
                <input
                    type="text"
                    name="direccionCorrespondencia"
                    id="direccionCorrespondencia"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    value={formData.direccionCorrespondencia || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="informacionAdicional" className="block text-sm font-medium text-gray-700">Información adicional</label>
                <input
                    type="text"
                    name="informacionAdicional"
                    id="informacionAdicional"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    value={formData.informacionAdicional || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">Ciudad</label>
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    value={formData.ciudad || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
                <input
                    type="text"
                    name="estado"
                    id="estado"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    value={formData.estado || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700">Código Postal</label>
                <input
                    type="text"
                    name="codigoPostal"
                    id="codigoPostal"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    value={formData.codigoPostal || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="pais" className="block text-sm font-medium text-gray-700">País</label>
                <select
                    name="pais"
                    id="pais"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                    value={formData.pais || ''}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un país</option>
                    {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                            {country.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        </div>
        <h3 className="text-xl font-bold mt-24 mb-6 text-gray-800">Información de Buceo</h3>
        
        {/* Fecha de Nacimiento */}
        <div className="mb-8">
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento <span className="text-red-500">*</span></label>
            <DatePicker
                id="birthDate"
                selected={formData.birthDate}
                onChange={handleDateChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccione una fecha"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
            />
        </div>

        {/* Nivel de Certificación */}
        <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de certificación actual</label>
            <div className="space-y-3 mt-2">
                {['Open water', 'Advanced', 'Rescue', 'Divemaster', 'Instructor', 'Ninguno'].map(level => (
                    <div key={level} className="flex items-center">
                        <input id={`cert-${level}`} type="checkbox" name="certificationLevel" value={level} checked={(formData.certificationLevel || []).includes(level)} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <label htmlFor={`cert-${level}`} className="ml-3 block text-sm text-gray-900">{level}</label>
                    </div>
                ))}
                <div className="flex items-center">
                    <input id="cert-otro" type="checkbox" name="certificationLevel" value="Otro" checked={(formData.certificationLevel || []).includes('Otro')} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                    <label htmlFor="cert-otro" className="ml-3 block text-sm text-gray-900 sr-only">Otro</label>
                    <input type="text" name="certificationLevelOther" placeholder="Otro" className="ml-3 w-auto flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-1" value={formData.certificationLevelOther || ''} onChange={handleChange} />
                </div>
            </div>
        </div>

        {/* Cantidad de Buceos */}
        <div className="mb-8 flex items-center">
            <label htmlFor="logbookDives" className="block text-sm font-medium text-gray-700">Cantidad de buceos / Logbook dives</label>
            <input type="number" id="logbookDives" name="logbookDives" placeholder="ej: 23" className="ml-4 w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2" value={formData.logbookDives || ''} onChange={handleChange} />
        </div>

        {/* Cómo supo de nosotros */}
        <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cómo supo de nosotros</label>
            <div className="space-y-3 mt-2">
                {['Amigos/conocidos', 'Pagina web', 'Hotel/Hostel', 'Tripadvisor'].map(source => (
                    <div key={source} className="flex items-center">
                        <input id={`howHeard-${source}`} type="radio" name="howHeard" value={source} checked={formData.howHeard === source} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                        <label htmlFor={`howHeard-${source}`} className="ml-3 block text-sm text-gray-900">{source}</label>
                    </div>
                ))}
                <div className="flex items-center">
                    <input id="howHeard-otro" type="radio" name="howHeard" value="Otro" checked={formData.howHeard === 'Otro'} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                     <label htmlFor="howHeard-otro" className="ml-3 block text-sm text-gray-900 sr-only">Otro</label>
                    <input type="text" name="howHeardOther" placeholder="Otro" className="ml-3 w-auto flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-1" value={formData.howHeardOther || ''} onChange={handleChange} />
                </div>
            </div>
        </div>

        {/* Lugar de hospedaje */}
        <div className="mb-8">
            <label htmlFor="lugarHospedaje" className="block text-sm font-medium text-gray-700 mb-2">Lugar de hospedaje</label>
            <input
                type="text"
                name="lugarHospedaje"
                id="lugarHospedaje"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                value={formData.lugarHospedaje || ''}
                onChange={handleChange}
            />
        </div>

        {/* Actividad a tomar */}
        <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Actividad a tomar</label>
            <div className="space-y-3 mt-2">
                {['Fun Dive', 'Open water', 'Advanced', 'Rescue', 'Divemaster', 'Instructor', 'Minicurso', 'Snorkeling'].map(act => (
                    <div key={act} className="flex items-center">
                        <input id={`actividad-${act}`} type="checkbox" name="actividadTomar" value={act} checked={(formData.actividadTomar || []).includes(act)} onChange={(e) => {
                            const { value, checked } = e.target;
                            const current = formData.actividadTomar || [];
                            let nuevo;
                            if (checked) {
                                nuevo = [...current, value];
                            } else {
                                nuevo = current.filter((a: string) => a !== value);
                            }
                            setFormData({ ...formData, actividadTomar: nuevo });
                        }} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <label htmlFor={`actividad-${act}`} className="ml-3 block text-sm text-gray-900">{act}</label>
                    </div>
                ))}
                <div className="flex items-center">
                    <input id="actividad-otro" type="checkbox" name="actividadTomar" value="Otro" checked={(formData.actividadTomar || []).includes('Otro')} onChange={(e) => {
                        const { value, checked } = e.target;
                        const current = formData.actividadTomar || [];
                        let nuevo;
                        if (checked) {
                            nuevo = [...current, value];
                        } else {
                            nuevo = current.filter((a: string) => a !== value);
                        }
                        setFormData({ ...formData, actividadTomar: nuevo });
                    }} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                    <label htmlFor="actividad-otro" className="ml-3 block text-sm text-gray-900 sr-only">Otro</label>
                    <input type="text" name="actividadTomarOtro" placeholder="Otro" className="ml-3 w-auto flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-1" value={formData.actividadTomarOtro || ''} onChange={handleChange} />
                </div>
            </div>
        </div>

        {/* Fecha de inicio de la actividad */}
        <div className="mb-8 flex items-center">
            <label htmlFor="fechaInicioActividad" className="block text-sm font-medium text-gray-700">Fecha de inicio de la actividad</label>
            <DatePicker
                id="fechaInicioActividad"
                selected={formData.fechaInicioActividad}
                onChange={date => setFormData({ ...formData, fechaInicioActividad: date })}
                className="ml-4 mt-0 w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccione una fecha"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={5}
            />
        </div>

        {/* Estatura */}
        <div className="mb-8 flex items-center">
            <label htmlFor="estatura" className="block text-sm font-medium text-gray-700">Estatura (centímetros)</label>
            <input
                type="number"
                name="estatura"
                id="estatura"
                placeholder="ej: 170"
                className="ml-4 mt-0 w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                value={formData.estatura || ''}
                onChange={handleChange}
            />
        </div>

        {/* Peso */}
        <div className="mb-8 flex items-center">
            <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso (kilogramos)</label>
            <input
                type="number"
                name="peso"
                id="peso"
                placeholder="ej: 65"
                className="ml-4 mt-0 w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                value={formData.peso || ''}
                onChange={handleChange}
            />
        </div>

        {/* Talla de calzado */}
        <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Talla de calzado</label>
            <div className="space-y-3 mt-2">
                {['34-35', '35-37', '38-39', '40-41', '42-43', '44-45', '46-47'].map(size => (
                    <div key={size} className="flex items-center">
                        <input id={`shoeSize-${size}`} type="checkbox" name="shoeSize" value={size} checked={(formData.shoeSize || []).includes(size)} onChange={e => {
                            const { value, checked } = e.target;
                            const current = formData.shoeSize || [];
                            let nuevo;
                            if (checked) {
                                nuevo = [...current, value];
                            } else {
                                nuevo = current.filter((s: string) => s !== value);
                            }
                            setFormData({ ...formData, shoeSize: nuevo });
                        }} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <label htmlFor={`shoeSize-${size}`} className="ml-3 block text-sm text-gray-900">{size}</label>
                    </div>
                ))}
            </div>
        </div>

        {/* Requerimientos especiales */}
        <div className="mb-8">
            <label htmlFor="requerimientosEspeciales" className="block text-sm font-medium text-gray-700 mb-2">Requerimientos especiales</label>
            <textarea
                name="requerimientosEspeciales"
                id="requerimientosEspeciales"
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-3 py-2"
                value={formData.requerimientosEspeciales || ''}
                onChange={(e: any) => handleChange(e)}
            />
        </div>

      </form>
    </div>
  );
};

export default InformacionGeneral; 