'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ContractService } from '@/core/service/contract/contract_service';
import { ContractDto, ContractStatusDto } from '@/core/dto/receive/contract/receive_contract_dto';
import { SignatureCanvas } from '@/components/others/contract/SignatureCanvas';
import { SendSignContractDto } from '@/core/dto/send/contract/send_sign_contract_dto';

interface ContractField {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: string[];
    section?: string;
}

const ConsultarContratoPage = () => {
    const params = useParams();
    const tokenParam = params?.token;

    const [contract, setContract] = useState<ContractDto | null>(null);
    const [contractStatus, setContractStatus] = useState<ContractStatusDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [signing, setSigning] = useState(false);
    const [signSuccess, setSignSuccess] = useState(false);
    const [signError, setSignError] = useState<string | null>(null);

    // Formulario dinámico basado en los campos requeridos del contrato
    const [formFields, setFormFields] = useState<Record<string, string>>({});
    const [signature, setSignature] = useState('');
    const [requiredFields, setRequiredFields] = useState<ContractField[]>([]);
    // Estado para controlar qué secciones están abiertas
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        'basic': false,
        'general': false,
        'emergency': false,
        'signature': false
    });

    useEffect(() => {
        const fetchContract = async () => {
            let tokenValue: string = '';
            if (Array.isArray(tokenParam)) {
                tokenValue = tokenParam[0] || '';
            } else if (typeof tokenParam === 'string') {
                tokenValue = tokenParam;
            } else {
                tokenValue = String(tokenParam || '');
            }

            if (!tokenValue) {
                setError('Token no proporcionado');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Obtener el contrato
                console.log('🔍 Buscando contrato con token:', tokenValue);
                const contractResponse = await ContractService.getContractByToken(tokenValue);

                if (contractResponse && contractResponse.success && contractResponse.data) {
                    console.log('✅ Contrato encontrado:', contractResponse.data.code);
                    console.log('📋 Datos completos del contrato:', JSON.stringify(contractResponse.data, null, 2));
                    console.log('📋 Keys del objeto data:', Object.keys(contractResponse.data));
                    
                    setContract(contractResponse.data);

                    // Extraer campos requeridos del HTML del contrato
                    // Buscar todas las variables entre % (ejemplo: %email%, %signer_name%)
                    const htmlContent = contractResponse.data.html_snapshot || '';
                    const fieldPattern = /%([a-z_]+)%/gi;
                    const foundFields = new Set<string>();
                    let match;
                    
                    while ((match = fieldPattern.exec(htmlContent)) !== null) {
                        foundFields.add(match[1]); // match[1] es el nombre del campo sin los %
                    }
                    
                    console.log('📋 Variables encontradas en el HTML del contrato:', Array.from(foundFields));
                    
                    // Mapeo completo de todos los campos disponibles
                    const fieldMapping: Record<string, { label: string; type: string; options?: string[]; section?: string }> = {
                        // Campos básicos de firma
                        'email': { label: 'Email', type: 'email', section: 'basic' },
                        'signer_name': { label: 'Nombre del que firma', type: 'text', section: 'basic' },
                        'identity_type': { label: 'Tipo de identidad', type: 'select', options: ['CC', 'CE', 'NIT', 'PASSPORT'], section: 'basic' },
                        'identity_number': { label: 'Número de identidad', type: 'text', section: 'basic' },
                        'company': { label: 'Empresa', type: 'text', section: 'basic' },
                        'signature': { label: 'Firma', type: 'signature', section: 'signature' }, // Se maneja por separado
                        
                        // Información General - Sección 1
                        'general_info_first_name': { label: '1.1 Nombre', type: 'text', section: 'general' },
                        'general_info_last_name': { label: '1.2 Apellido', type: 'text', section: 'general' },
                        'general_info_nationality': { label: '1.3 Nacionalidad', type: 'text', section: 'general' },
                        'general_info_document_type': { label: '1.4 Tipo de documento', type: 'select', options: ['CC', 'CE', 'NIT', 'PASSPORT'], section: 'general' },
                        'general_info_document_number': { label: '1.5 Número de documento', type: 'text', section: 'general' },
                        'general_info_email': { label: '1.6 Correo electrónico/email', type: 'email', section: 'general' },
                        'general_info_phone': { label: '1.7 Celular/WhatsApp', type: 'tel', section: 'general' },
                        'general_info_address': { label: '1.8 Dirección de correspondencia', type: 'text', section: 'general' },
                        'general_info_address_additional': { label: '1.9 Dirección - Información adicional', type: 'text', section: 'general' },
                        'general_info_address_city': { label: '1.10 Dirección - Ciudad', type: 'text', section: 'general' },
                        'general_info_address_state': { label: '1.11 Dirección - Estado', type: 'text', section: 'general' },
                        'general_info_address_zip_code': { label: '1.12 Dirección - Código postal', type: 'text', section: 'general' },
                        'general_info_address_country': { label: '1.13 Dirección - País', type: 'text', section: 'general' },
                        'general_info_birth_date': { label: '1.14 Fecha de nacimiento', type: 'date', section: 'general' },
                        'general_info_certification_level': { label: '1.15 Nivel de certificación actual', type: 'text', section: 'general' },
                        'general_info_dive_count': { label: '1.15 Cantidad de buceos / Logbook dives', type: 'number', section: 'general' },
                        'general_info_how_did_you_know': { label: '1.16 Cómo supo de nosotros', type: 'text', section: 'general' },
                        'general_info_accommodation': { label: '1.17 Lugar de hospedaje', type: 'text', section: 'general' },
                        'general_info_activity': { label: '1.18 Actividad a tomar', type: 'text', section: 'general' },
                        'general_info_activity_start_date': { label: '1.19 Fecha de inicio de la actividad', type: 'date', section: 'general' },
                        'general_info_height': { label: '1.20 Estatura (centímetros)', type: 'number', section: 'general' },
                        'general_info_weight': { label: '1.21 Peso (kilogramos)', type: 'number', section: 'general' },
                        'general_info_shoe_size': { label: '1.22 Talla de calzado', type: 'text', section: 'general' },
                        'general_info_special_requirements': { label: '1.23 Requerimientos especiales', type: 'text', section: 'general' },
                        
                        // Contacto de Emergencia - Sección 2
                        'emergency_contact_first_name': { label: '2.1 Nombre', type: 'text', section: 'emergency' },
                        'emergency_contact_last_name': { label: '2.2 Apellido', type: 'text', section: 'emergency' },
                        'emergency_contact_phone': { label: '2.3 Número de teléfono', type: 'tel', section: 'emergency' },
                        'emergency_contact_email': { label: '2.4 Correo electrónico', type: 'email', section: 'emergency' },
                    };
                    
                    // Incluir TODOS los campos del mapeo (excepto signature) + campos adicionales encontrados en el HTML
                    const allFieldNames = new Set<string>();
                    
                    // Agregar todos los campos del mapeo (excepto signature)
                    Object.keys(fieldMapping).forEach(key => {
                        if (key !== 'signature') {
                            allFieldNames.add(key);
                        }
                    });
                    
                    // Agregar campos adicionales encontrados en el HTML que no estén en el mapeo
                    foundFields.forEach(fieldName => {
                        if (fieldName !== 'signature') {
                            allFieldNames.add(fieldName);
                        }
                    });
                    
                    console.log('📋 Todos los campos a incluir en el formulario:', Array.from(allFieldNames));
                    
                    // Generar campos del formulario basados en todos los campos disponibles
                    const fields: (ContractField & { section?: string })[] = Array.from(allFieldNames)
                        .map(fieldName => {
                            const mapping = fieldMapping[fieldName];
                            
                            // Determinar la sección basada en el nombre del campo
                            let section = 'general';
                            if (fieldName.startsWith('emergency_contact_')) {
                                section = 'emergency';
                            } else if (fieldName.startsWith('general_info_')) {
                                section = 'general';
                            } else if (['email', 'signer_name', 'identity_type', 'identity_number', 'company'].includes(fieldName)) {
                                section = 'basic';
                            }
                            
                            // Si hay un mapeo definido, usarlo
                            if (mapping) {
                                return {
                                    name: fieldName,
                                    label: mapping.label,
                                    type: mapping.type,
                                    required: true,
                                    options: mapping.options,
                                    section: mapping.section || section
                                };
                            }
                            
                            // Si no hay mapeo, generar label a partir del nombre del campo
                            const generatedLabel = fieldName
                                .replace(/_/g, ' ')
                                .replace(/general info /gi, '')
                                .replace(/emergency contact /gi, 'Contacto de emergencia - ')
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ');
                            
                            // Determinar el tipo basado en el nombre del campo
                            let type = 'text';
                            if (fieldName.includes('email')) type = 'email';
                            else if (fieldName.includes('date')) type = 'date';
                            else if (fieldName.includes('phone') || fieldName.includes('telefono')) type = 'tel';
                            else if (fieldName.includes('type') && (fieldName.includes('identity') || fieldName.includes('document'))) type = 'select';
                            else if (fieldName.includes('count') || fieldName.includes('height') || fieldName.includes('weight')) type = 'number';
                            
                            return {
                                name: fieldName,
                                label: generatedLabel,
                                type,
                                required: true,
                                section,
                                options: (fieldName.includes('identity_type') || fieldName.includes('document_type')) 
                                    ? ['CC', 'CE', 'NIT', 'PASSPORT'] 
                                    : undefined
                            };
                        });
                    
                    console.log('📝 Campos generados del HTML:', fields);
                    console.log('📋 Cantidad de campos:', fields.length);
                    
                    // Si no hay campos definidos, usar campos mínimos por defecto
                    const finalFields = fields.length === 0 ? [
                        { name: 'signer_name', label: 'Nombre completo', type: 'text', required: true },
                        { name: 'email', label: 'Email', type: 'email', required: true },
                        { name: 'identity_type', label: 'Tipo de documento', type: 'select', required: true, options: ['CC', 'CE', 'NIT', 'PASSPORT'] },
                        { name: 'identity_number', label: 'Número de documento', type: 'text', required: true },
                        { name: 'company', label: 'Empresa', type: 'text', required: false }
                    ] : fields;
                    
                    setRequiredFields(finalFields);
                    
                    // Inicializar formulario con los campos requeridos
                    const initialFields: Record<string, string> = {};
                    finalFields.forEach((field: ContractField) => {
                        initialFields[field.name] = '';
                    });
                    setFormFields(initialFields);

                    // Consultar el status internamente
                    const statusResponse = await ContractService.getContractStatus(tokenValue);
                    if (statusResponse && statusResponse.success && statusResponse.data) {
                        console.log('✅ Status obtenido:', statusResponse.data.status);
                        setContractStatus(statusResponse.data);
                    }
                } else {
                    console.error('❌ Contrato no encontrado con token:', tokenValue);
                    setError('Contrato no encontrado');
                }
            } catch (err) {
                console.error('❌ Error al cargar el contrato:', err);
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(`Error al cargar el contrato: ${errorMessage}`);
            } finally {
                setLoading(false);
            }
        };

        fetchContract();
    }, [tokenParam]);

    const handleFieldChange = (fieldName: string, value: string) => {
        setFormFields(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const toggleSection = (sectionKey: string) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };

    const getFieldsBySection = (section: string) => {
        return requiredFields.filter((field: ContractField & { section?: string }) => {
            if (section === 'basic') {
                return ['email', 'signer_name', 'identity_type', 'identity_number', 'company'].includes(field.name);
            }
            return field.section === section;
        });
    };

    const handleSignContract = async () => {
        if (!signature) {
            setSignError('Por favor, proporciona una firma');
            return;
        }

        // Validar campos requeridos
        const missingFields: string[] = [];
        requiredFields.forEach((field: ContractField) => {
            if (field.required !== false && !formFields[field.name]?.trim()) {
                missingFields.push(field.label || field.name);
            }
        });

        if (missingFields.length > 0) {
            setSignError(`Por favor, completa los siguientes campos requeridos: ${missingFields.join(', ')}`);
            return;
        }

        // Validar email si existe el campo
        if (formFields.email || formFields.general_info_email) {
            const email = formFields.email || formFields.general_info_email;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setSignError('Por favor, ingresa un email válido');
                return;
            }
        }

        const tokenValue = Array.isArray(tokenParam)
            ? tokenParam[0] || ''
            : typeof tokenParam === 'string'
                ? tokenParam
                : String(tokenParam || '');

        if (!tokenValue) {
            setSignError('Token no válido');
            return;
        }

        try {
            setSigning(true);
            setSignError(null);
            setSignSuccess(false);

            // Construir el objeto fields dinámicamente
            // Incluir todos los campos del formulario y la firma
            const fields: Record<string, string> = {
                ...formFields,
                signature: signature
            };

            // Asegurar que los campos requeridos estén presentes
            // Si no están en formFields, agregarlos como strings vacíos (el backend los validará)
            const requiredFieldNames = ['signer_name', 'email', 'signature'];
            requiredFieldNames.forEach(fieldName => {
                if (!fields[fieldName] && fieldName !== 'signature') {
                    // Si el campo requerido no está, intentar obtenerlo de formFields
                    if (formFields[fieldName]) {
                        fields[fieldName] = formFields[fieldName];
                    }
                }
            });

            const signData: SendSignContractDto = {
                fields: fields as SendSignContractDto['fields']
            };

            console.log('📤 Enviando datos de firma:', JSON.stringify(signData, null, 2));
            console.log('📋 Campos incluidos:', Object.keys(fields).sort());

            const response = await ContractService.signContract(tokenValue, signData);

            if (response && response.success) {
                setSignSuccess(true);
                // Recargar el contrato y status
                const contractResponse = await ContractService.getContractByToken(tokenValue);
                if (contractResponse && contractResponse.success && contractResponse.data) {
                    setContract(contractResponse.data);
                }
                const statusResponse = await ContractService.getContractStatus(tokenValue);
                if (statusResponse && statusResponse.success && statusResponse.data) {
                    setContractStatus(statusResponse.data);
                }
                // Limpiar formulario
                setSignature('');
                const initialFields: Record<string, string> = {};
                requiredFields.forEach((field: ContractField) => {
                    initialFields[field.name] = '';
                });
                setFormFields(initialFields);
            } else {
                setSignError(response?.error || 'Error al firmar el contrato');
            }
        } catch (err) {
            console.error('❌ Error al Firmar Formulario:', err);
            setSignError('Error al firmar el contrato. Por favor, intenta nuevamente.');
        } finally {
            setSigning(false);
        }
    };

    const renderField = (field: ContractField) => {
        const fieldValue = formFields[field.name] || '';
        const isRequired = field.required !== false; // Por defecto requerido si no se especifica

        // Campo especial para identity_type
        if (field.name === 'identity_type') {
            return (
                <div key={field.name} className="col-lg-12 mb-3">
                    <label style={{
                        color: 'var(--thm-black)',
                        fontWeight: '600',
                        marginBottom: '10px',
                        display: 'block'
                    }}>
                        {field.label || 'Documento de Identidad'} {isRequired && <span style={{ color: '#dc3545' }}>*</span>}
                    </label>
                    <div className="input-group" style={{ display: 'flex' }}>
                        <select
                            className="form-control"
                            value={fieldValue}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            required={isRequired}
                            style={{
                                padding: '15px',
                                borderRadius: '5px 0 0 5px',
                                border: '1px solid #e0e0e0',
                                fontSize: '16px',
                                backgroundColor: '#f8f9fa',
                                maxWidth: '150px',
                                borderRight: 'none'
                            }}
                        >
                            <option value="">Tipo...</option>
                            {(field.options || ['CC', 'CE', 'NIT', 'PASSPORT']).map((option: string) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {/* Input para identity_number (siempre se muestra junto con identity_type) */}
                        <input
                            type="text"
                            className="form-control"
                            value={formFields['identity_number'] || ''}
                            onChange={(e) => handleFieldChange('identity_number', e.target.value)}
                            required={requiredFields.find(f => f.name === 'identity_number')?.required !== false}
                            placeholder="Número de documento"
                            style={{
                                padding: '15px',
                                borderRadius: '0 5px 5px 0',
                                border: '1px solid #e0e0e0',
                                fontSize: '16px',
                                flex: 1
                            }}
                        />
                    </div>
                </div>
            );
        }

        if (field.type === 'select' && field.options && field.options.length > 0) {
            return (
                <div key={field.name} className="col-lg-6 mb-3">
                    <label style={{
                        color: 'var(--thm-black)',
                        fontWeight: '600',
                        marginBottom: '10px',
                        display: 'block'
                    }}>
                        {field.label || field.name} {isRequired && <span style={{ color: '#dc3545' }}>*</span>}
                    </label>
                    <select
                        className="form-control"
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        required={isRequired}
                        style={{
                            padding: '15px',
                            borderRadius: '5px',
                            border: '1px solid #e0e0e0',
                            fontSize: '16px'
                        }}
                    >
                        <option value="">Seleccionar...</option>
                        {field.options.map((option: string) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }

        // Campos de tipo texto por defecto
        let inputType = 'text';
        if (field.name.includes('email') || field.type === 'email') {
            inputType = 'email';
        } else if (field.name.includes('date') || field.type === 'date') {
            inputType = 'date';
        } else if (field.name.includes('phone') || field.name.includes('telefono') || field.type === 'tel') {
            inputType = 'tel';
        } else if (field.type === 'number') {
            inputType = 'number';
        }

        return (
            <div key={field.name} className="col-lg-6 mb-3">
                <label style={{
                    color: 'var(--thm-black)',
                    fontWeight: '600',
                    marginBottom: '10px',
                    display: 'block'
                }}>
                    {field.label || field.name} {isRequired && <span style={{ color: '#dc3545' }}>*</span>}
                </label>
                <input
                    type={inputType}
                    className="form-control"
                    value={fieldValue}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    required={isRequired}
                    placeholder={`Ingrese ${field.label || field.name.toLowerCase()}`}
                    step={field.name.includes('weight') ? '0.01' : undefined}
                    style={{
                        padding: '15px',
                        borderRadius: '5px',
                        border: '1px solid #e0e0e0',
                        fontSize: '16px'
                    }}
                />
            </div>
        );
    };

    if (loading) {
        return (
            <div className="page-wrapper">
                <section className="page-header">
                    <div className="page-header__bg" style={{ backgroundImage: "url(/assets/images/background/footer-bg-1-1.jpg)" }}></div>
                    <div className="container">
                        <h2 className="page-header__title">Consultar Formulario</h2>
                    </div>
                </section>
                <section className="course-details" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
                    <div className="container">
                        <div className="text-center">
                            <div className="flex flex-col items-center justify-center" style={{ minHeight: '400px' }}>
                                <img
                                    src="/assets/images/Animation-diving.gif"
                                    alt="Cargando..."
                                    style={{
                                        width: 150,
                                        height: 120,
                                        display: 'block',
                                        marginBottom: '20px'
                                    }}
                                />
                                <p style={{ fontSize: '18px', color: '#838a93', fontWeight: '500' }}>Cargando contrato...</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (error || (!contract && !loading)) {
        return (
            <div className="page-wrapper">
                <section className="page-header">
                    <div className="page-header__bg" style={{ backgroundImage: "url(/assets/images/background/footer-bg-1-1.jpg)" }}></div>
                    <div className="container">
                        <ul className="list-unstyled thm-breadcrumb">
                            <li><Link href="/">Home</Link></li>
                            <li className="active"><a href="#">Consultar Formulario</a></li>
                        </ul>
                        <h2 className="page-header__title">{error ? 'Error al cargar el contrato' : 'Contrato no encontrado'}</h2>
                    </div>
                </section>
                <section className="course-details" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
                    <div className="container">
                        <div className="text-center">
                            <div className="mb-4">
                                <i className="fas fa-exclamation-triangle" style={{ fontSize: '4rem', color: '#dc3545' }}></i>
                            </div>
                            <h3 style={{ color: 'var(--thm-black)', marginBottom: '20px', fontSize: '28px' }}>
                                {error ? 'Error al cargar el contrato' : 'Contrato no encontrado'}
                            </h3>
                            <p style={{ color: '#838a93', marginBottom: '30px', fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px' }}>
                                {error || 'El contrato que buscas no existe o ha sido eliminado.'}
                            </p>
                            <Link href="/" className="thm-btn">
                                <span>Volver al inicio</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (!contract) {
        return null;
    }

    const isSigned = contractStatus?.status === 'SIGNED' || contract.status === 'SIGNED';
    const isCancelled = contractStatus?.status === 'CANCELLED' || contract.status === 'CANCELLED';
    const isExpired = contractStatus?.expires_at
        ? new Date(contractStatus.expires_at) < new Date()
        : false;

    // Validar si todos los campos requeridos están completos (excepto la firma)
    const isFormValid = signature && requiredFields.every((field: ContractField) => {
        if (field.required !== false) {
            const value = formFields[field.name];
            return value && String(value).trim().length > 0;
        }
        return true;
    });

    return (
        <div className="page-wrapper">
            {/* Page Header */}
            <section className="page-header">
                <div className="page-header__bg" style={{ backgroundImage: "url(/assets/images/background/footer-bg-1-1.jpg)" }}></div>
                <div className="container">
                    <ul className="list-unstyled thm-breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li className="active"><a href="#">Consultar Formulario</a></li>
                    </ul>
                    <h2 className="page-header__title">Consultar Formulario</h2>
                </div>
            </section>

            {/* Contract Content */}
            <section className="course-details" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
                <div className="container">
                    {/* Status Card */}
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <div className="course-details__content" style={{
                                background: '#fff',
                                borderRadius: '10px',
                                padding: '40px',
                                boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)',
                                marginBottom: '30px'
                            }}>
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div>
                                        <h3 style={{
                                            color: 'var(--thm-black)',
                                            fontSize: '28px',
                                            fontWeight: 'bold',
                                            marginBottom: '10px'
                                        }}>
                                            {contract.template_name}
                                        </h3>
                                     
                                    </div>
                                    <div className="text-end">
                                        {isSigned ? (
                                            <div style={{
                                                background: 'rgba(40, 167, 69, 0.1)',
                                                border: '2px solid #28a745',
                                                borderRadius: '10px',
                                                padding: '15px 25px',
                                                display: 'inline-block'
                                            }}>
                                                <div style={{
                                                    color: '#28a745',
                                                    fontWeight: 'bold',
                                                    fontSize: '18px',
                                                    marginBottom: '5px'
                                                }}>
                                                    <i className="fas fa-check-circle me-2"></i>
                                                    Contrato Firmado
                                                </div>
                                                {contract.signed_at && (
                                                    <div style={{ color: '#28a745', fontSize: '14px' }}>
                                                        {new Date(contract.signed_at).toLocaleDateString('es-ES', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </div>
                                                )}
                                                {contract.signed_by_name && (
                                                    <div style={{ color: '#28a745', fontSize: '14px' }}>
                                                        Por: {contract.signed_by_name}
                                                    </div>
                                                )}
                                            </div>
                                        ) : isCancelled ? (
                                            <div style={{
                                                background: 'rgba(108, 117, 125, 0.1)',
                                                border: '2px solid #6c757d',
                                                borderRadius: '10px',
                                                padding: '15px 25px',
                                                display: 'inline-block'
                                            }}>
                                                <div style={{ color: '#6c757d', fontWeight: 'bold', fontSize: '18px' }}>
                                                    <i className="fas fa-ban me-2"></i>
                                                    Contrato Cancelado
                                                </div>
                                            </div>
                                        ) : isExpired ? (
                                            <div style={{
                                                background: 'rgba(220, 53, 69, 0.1)',
                                                border: '2px solid #dc3545',
                                                borderRadius: '10px',
                                                padding: '15px 25px',
                                                display: 'inline-block'
                                            }}>
                                                <div style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '18px' }}>
                                                    <i className="fas fa-exclamation-circle me-2"></i>
                                                    Contrato Expirado
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{
                                                background: 'rgba(255, 193, 7, 0.1)',
                                                border: '2px solid #ffc107',
                                                borderRadius: '10px',
                                                padding: '15px 25px',
                                                display: 'inline-block'
                                            }}>
                                                <div style={{ color: '#ffc107', fontWeight: 'bold', fontSize: '18px' }}>
                                                    <i className="fas fa-clock me-2"></i>
                                                    Pendiente de Firma
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Sign Form (only if not signed) */}
                    {!isSigned && !isExpired && !isCancelled && (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="course-details__content" style={{
                                    background: '#fff',
                                    borderRadius: '10px',
                                    padding: '40px',
                                    boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)'
                                }}>
                                    <h3 style={{
                                        color: 'var(--thm-black)',
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        marginBottom: '30px',
                                        paddingBottom: '20px',
                                        borderBottom: '2px solid var(--thm-gray)'
                                    }}>
                                        Firmar Formulario
                                    </h3>

                                    {signSuccess && (
                                        <div className="alert alert-success" role="alert" style={{
                                            borderRadius: '10px',
                                            padding: '20px',
                                            marginBottom: '30px',
                                            background: 'rgba(40, 167, 69, 0.1)',
                                            border: '2px solid #28a745',
                                            color: '#28a745'
                                        }}>
                                            <i className="fas fa-check-circle me-2"></i>
                                            ¡Contrato firmado exitosamente!
                                        </div>
                                    )}

                                    {signError && (
                                        <div className="alert alert-danger" role="alert" style={{
                                            borderRadius: '10px',
                                            padding: '20px',
                                            marginBottom: '30px',
                                            background: 'rgba(220, 53, 69, 0.1)',
                                            border: '2px solid #dc3545',
                                            color: '#dc3545'
                                        }}>
                                            <i className="fas fa-exclamation-circle me-2"></i>
                                            {signError}
                                        </div>
                                    )}

                                    {/* Sección: Campos Básicos */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <button
                                            type="button"
                                            onClick={() => toggleSection('basic')}
                                            style={{
                                                width: '100%',
                                                padding: '15px 20px',
                                                background: '#f8f9fa',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '15px',
                                                fontSize: '18px',
                                                fontWeight: '600',
                                                color: 'var(--thm-black)',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#e9ecef';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = '#f8f9fa';
                                            }}
                                        >
                                            <span>Información Básica</span>
                                            <i 
                                                className={`fas ${openSections.basic ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                                                style={{ fontSize: '14px', color: '#838a93' }}
                                            ></i>
                                        </button>
                                        {openSections.basic && (
                                            <div style={{
                                                background: '#ffffff',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '8px',
                                                padding: '20px',
                                                marginBottom: '20px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                            }}>
                                                <div className="row">
                                                    {getFieldsBySection('basic').map((field: ContractField) => {
                                                        if (field.name === 'identity_number' && requiredFields.find((f: ContractField) => f.name === 'identity_type')) {
                                                            return null;
                                                        }
                                                        return renderField(field);
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Sección: Información General */}
                                    {getFieldsBySection('general').length > 0 && (
                                        <div style={{ marginBottom: '20px' }}>
                                            <button
                                                type="button"
                                                onClick={() => toggleSection('general')}
                                                style={{
                                                    width: '100%',
                                                    padding: '15px 20px',
                                                    background: '#f8f9fa',
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '15px',
                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    color: 'var(--thm-black)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#e9ecef';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#f8f9fa';
                                                }}
                                            >
                                                <span>Información general</span>
                                                <i 
                                                    className={`fas ${openSections.general ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                                                    style={{ fontSize: '14px', color: '#838a93' }}
                                                ></i>
                                            </button>
                                            {openSections.general && (
                                                <div style={{
                                                    background: '#ffffff',
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    padding: '20px',
                                                    marginBottom: '20px',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                                }}>
                                                    <div className="row">
                                                        {getFieldsBySection('general').map((field: ContractField) => renderField(field))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Sección: Contacto de Emergencia */}
                                    {getFieldsBySection('emergency').length > 0 && (
                                        <div style={{ marginBottom: '20px' }}>
                                            <button
                                                type="button"
                                                onClick={() => toggleSection('emergency')}
                                                style={{
                                                    width: '100%',
                                                    padding: '15px 20px',
                                                    background: '#f8f9fa',
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '15px',
                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    color: 'var(--thm-black)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#e9ecef';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#f8f9fa';
                                                }}
                                            >
                                                <span>Contacto de emergencia</span>
                                                <i 
                                                    className={`fas ${openSections.emergency ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                                                    style={{ fontSize: '14px', color: '#838a93' }}
                                                ></i>
                                            </button>
                                            {openSections.emergency && (
                                                <div style={{
                                                    background: '#ffffff',
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    padding: '20px',
                                                    marginBottom: '20px',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                                }}>
                                                    <div className="row">
                                                        {getFieldsBySection('emergency').map((field: ContractField) => renderField(field))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Sección: Firma */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <button
                                            type="button"
                                            onClick={() => toggleSection('signature')}
                                            style={{
                                                width: '100%',
                                                padding: '15px 20px',
                                                background: '#f8f9fa',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '15px',
                                                fontSize: '18px',
                                                fontWeight: '600',
                                                color: 'var(--thm-black)',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#e9ecef';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = '#f8f9fa';
                                            }}
                                        >
                                            <span>Firma</span>
                                            <i 
                                                className={`fas ${openSections.signature ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                                                style={{ fontSize: '14px', color: '#838a93' }}
                                            ></i>
                                        </button>
                                        {openSections.signature && (
                                            <div style={{
                                                background: '#ffffff',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '8px',
                                                padding: '20px',
                                                marginBottom: '20px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                            }}>
                                                <div className="col-lg-12 mb-4">
                                                    <label style={{
                                                        color: 'var(--thm-black)',
                                                        fontWeight: '600',
                                                        marginBottom: '10px',
                                                        display: 'block'
                                                    }}>
                                                        Firma <span style={{ color: '#dc3545' }}>*</span>
                                                    </label>
                                                    <SignatureCanvas
                                                        onSignatureChange={setSignature}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {requiredFields.length === 0 && (
                                        <div className="col-lg-12 mb-3">
                                            <div className="alert alert-info" style={{
                                                borderRadius: '10px',
                                                padding: '20px',
                                                background: 'rgba(59, 145, 225, 0.1)',
                                                border: '2px solid #3b91e1',
                                                color: '#3b91e1'
                                            }}>
                                                <i className="fas fa-info-circle me-2"></i>
                                                No hay campos adicionales requeridos para este contrato.
                                            </div>
                                        </div>
                                    )}

                                    <div className="col-lg-12">
                                        <button
                                            type="button"
                                            className="thm-btn"
                                            onClick={handleSignContract}
                                            disabled={signing || !isFormValid}
                                            style={{
                                                opacity: (signing || !isFormValid) ? 0.6 : 1,
                                                cursor: (signing || !isFormValid) ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            <span>{signing ? 'Firmando...' : 'Firmar Formulario'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <style jsx>{`
                .course-details__content h1,
                .course-details__content h2,
                .course-details__content h3 {
                    color: var(--thm-black);
                    font-family: var(--thm-font-two);
                    margin-bottom: 15px;
                }
                .course-details__content p {
                    margin-bottom: 15px;
                }
            `}</style>
        </div>
    );
};

export default ConsultarContratoPage;
