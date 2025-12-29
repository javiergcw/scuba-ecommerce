'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ContractService } from '@/core/service/contract/contract_service';
import { ContractDto, ContractStatusDto, ContractField } from '@/core/dto/receive/contract/receive_contract_dto';
import { SignatureCanvas } from '@/components/others/contract/SignatureCanvas';
import { SendSignContractDto } from '@/core/dto/send/contract/send_sign_contract_dto';

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
                    
                    // Mapeo de nombres de campos a etiquetas y tipos
                    const fieldMapping: Record<string, { label: string; type: string; options?: string[] }> = {
                        // Campos básicos de firma
                        'email': { label: 'Email', type: 'email' },
                        'signer_name': { label: 'Nombre del que firma', type: 'text' },
                        'identity_type': { label: 'Tipo de identidad', type: 'select', options: ['CC', 'CE', 'NIT', 'PASSPORT'] },
                        'identity_number': { label: 'Número de identidad', type: 'text' },
                        'company': { label: 'Empresa', type: 'text' },
                        'signature': { label: 'Firma', type: 'signature' }, // Se maneja por separado
                        
                        // Información General
                        'general_info_first_name': { label: 'Nombre', type: 'text' },
                        'general_info_last_name': { label: 'Apellido', type: 'text' },
                        'general_info_nationality': { label: 'Nacionalidad', type: 'text' },
                        'general_info_document_type': { label: 'Tipo de documento', type: 'select', options: ['CC', 'CE', 'NIT', 'PASSPORT'] },
                        'general_info_document_number': { label: 'Número de documento', type: 'text' },
                        'general_info_email': { label: 'Correo electrónico/email', type: 'email' },
                        'general_info_phone': { label: 'Celular/WhatsApp', type: 'tel' },
                        'general_info_address': { label: 'Dirección de correspondencia', type: 'text' },
                        'general_info_address_additional': { label: 'Dirección - Información adicional', type: 'text' },
                        'general_info_address_city': { label: 'Dirección - Ciudad', type: 'text' },
                        'general_info_address_state': { label: 'Dirección - Estado', type: 'text' },
                        'general_info_address_zip_code': { label: 'Dirección - Código postal', type: 'text' },
                        'general_info_address_country': { label: 'Dirección - País', type: 'text' },
                        'general_info_birth_date': { label: 'Fecha de nacimiento', type: 'date' },
                        'general_info_certification_level': { label: 'Nivel de certificación actual', type: 'text' },
                        'general_info_dive_count': { label: 'Cantidad de buceos / Logbook dives', type: 'number' },
                        'general_info_how_did_you_know': { label: 'Cómo supo de nosotros', type: 'text' },
                        'general_info_accommodation': { label: 'Lugar de hospedaje', type: 'text' },
                        'general_info_activity': { label: 'Actividad a tomar', type: 'text' },
                        'general_info_activity_start_date': { label: 'Fecha de inicio de la actividad', type: 'date' },
                        'general_info_height': { label: 'Estatura (centímetros)', type: 'number' },
                        'general_info_weight': { label: 'Peso (kilogramos)', type: 'number' },
                        'general_info_shoe_size': { label: 'Talla de calzado', type: 'text' },
                        'general_info_special_requirements': { label: 'Requerimientos especiales', type: 'text' },
                    };
                    
                    // Generar campos del formulario basados en las variables encontradas
                    const fields: ContractField[] = Array.from(foundFields)
                        .filter(fieldName => fieldName !== 'signature') // La firma se maneja por separado
                        .map(fieldName => {
                            const mapping = fieldMapping[fieldName];
                            
                            // Si hay un mapeo definido, usarlo
                            if (mapping) {
                                return {
                                    name: fieldName,
                                    label: mapping.label,
                                    type: mapping.type,
                                    required: true,
                                    options: mapping.options
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
            const fields: Record<string, string> = {
                ...formFields,
                signature: signature
            };

            const signData: SendSignContractDto = {
                fields: fields
            };

            console.log('📤 Enviando datos de firma:', signData);

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
            console.error('❌ Error al firmar contrato:', err);
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
                            {(field.options || ['CC', 'CE', 'NIT', 'PASSPORT']).map((option) => (
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
                        {field.options.map((option) => (
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
                        <h2 className="page-header__title">Consultar Contrato</h2>
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
                            <li className="active"><a href="#">Consultar Contrato</a></li>
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
                        <li className="active"><a href="#">Consultar Contrato</a></li>
                    </ul>
                    <h2 className="page-header__title">Consultar Contrato</h2>
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
                                        {!isSigned && (
                                            <p style={{ color: '#838a93', margin: 0, fontSize: '16px' }}>
                                                <strong>Código:</strong> {contract.code} | <strong>SKU:</strong> {contract.sku}
                                            </p>
                                        )}
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

                    {/* Contract Content */}
                    {!isSigned && !isCancelled && (
                        <div className="row mb-4">
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
                                        Contenido del Contrato
                                    </h3>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: contract.html_snapshot }}
                                        style={{
                                            color: '#838a93',
                                            lineHeight: '1.8',
                                            fontSize: '16px'
                                        }}
                                    />
                                    {contract.expires_at && (
                                        <div style={{
                                            marginTop: '30px',
                                            paddingTop: '20px',
                                            borderTop: '2px solid var(--thm-gray)'
                                        }}>
                                            <p style={{ color: '#838a93', margin: 0, fontSize: '16px' }}>
                                                <strong style={{ color: 'var(--thm-black)' }}>Fecha de expiración:</strong>{' '}
                                                {new Date(contract.expires_at).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

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
                                        Firmar Contrato
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

                                    <div className="row">
                                        {/* Renderizar campos dinámicamente */}
                                        {requiredFields.length > 0 ? (
                                            requiredFields.map((field: ContractField) => {
                                                // Si identity_type está siendo renderizado, saltar identity_number ya que se renderiza junto
                                                if (field.name === 'identity_number' && requiredFields.find(f => f.name === 'identity_type')) {
                                                    return null;
                                                }
                                                return renderField(field);
                                            })
                                        ) : (
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

                                        {/* Campo de firma (siempre requerido) */}
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
                                                <span>{signing ? 'Firmando...' : 'Firmar Contrato'}</span>
                                            </button>
                                        </div>
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
