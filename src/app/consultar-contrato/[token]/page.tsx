'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ContractService } from '@/core/service/contract/contract_service';
import { ContractDto, ContractStatusDto } from '@/core/dto/receive/contract/receive_contract_dto';
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

    // Formulario de firma
    const [signature, setSignature] = useState('');
    const [email, setEmail] = useState('');
    const [signerName, setSignerName] = useState('');
    const [identityType, setIdentityType] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [company, setCompany] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Handler SIMPLE para actualizar la firma
    const handleSignatureChange = (newSignature: string) => {
        console.log('🖊️ Firma recibida del canvas, longitud:', newSignature?.length || 0);
        setSignature(newSignature || '');
    };
    
    const identityTypes = [
        { value: 'CC', label: 'Cédula de Ciudadanía (CC)' },
        { value: 'CE', label: 'Cédula de Extranjería (CE)' },
        { value: 'TI', label: 'Tarjeta de Identidad (TI)' },
        { value: 'PA', label: 'Pasaporte (PA)' },
        { value: 'NIT', label: 'NIT' },
        { value: 'RUT', label: 'RUT' },
        { value: 'DNI', label: 'DNI' }
    ];
    
    const selectedIdentityType = identityTypes.find(type => type.value === identityType);
    
    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

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
                    setContract(contractResponse.data);
                    
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

    const handleSignContract = async () => {
        if (!signature || !email || !signerName || !identityType || !identityNumber) {
            setSignError('Por favor, completa todos los campos obligatorios y proporciona una firma');
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setSignError('Por favor, ingresa un email válido');
            return;
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

            // Validación SIMPLE: Solo verificar que existan los campos
            if (!email || !signerName || !identityType || !identityNumber) {
                setSignError('Por favor, completa todos los campos obligatorios');
                setSigning(false);
                return;
            }

            // Validar que la firma exista
            if (!signature || signature.length < 100) {
                setSignError('Por favor, dibuja tu firma en el canvas');
                setSigning(false);
                return;
            }

            // Preparar los datos de firma - SIMPLE y DIRECTA
            const signData: SendSignContractDto = {
                fields: {
                    email: email.trim(),
                    signer_name: signerName.trim(),
                    identity_type: identityType.trim(),
                    identity_number: identityNumber.trim(),
                    company: company ? company.trim() : '',
                    signature: signature // FIRMA COMPLETA EN BASE64
                }
            };

            // LOG SIMPLE
            console.log('═══════════════════════════════════════════');
            console.log('📤 ENVIANDO FIRMA AL BACKEND');
            console.log('═══════════════════════════════════════════');
            console.log('Email:', signData.fields.email);
            console.log('Signer Name:', signData.fields.signer_name);
            console.log('Identity Type:', signData.fields.identity_type);
            console.log('Identity Number:', signData.fields.identity_number);
            console.log('Company:', signData.fields.company || '(vacío)');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('SIGNATURE (FIRMA):');
            console.log('  Existe:', !!signData.fields.signature);
            console.log('  Longitud:', signData.fields.signature.length, 'caracteres');
            console.log('  Inicio:', signData.fields.signature.substring(0, 50));
            console.log('  Final:', signData.fields.signature.substring(signData.fields.signature.length - 30));
            console.log('  JSON completo tamaño:', JSON.stringify(signData).length, 'caracteres');
            console.log('═══════════════════════════════════════════');

            // LOG SIMPLE Y CLARO
            console.log('═══════════════════════════════════════════');
            console.log('📤 ENVIANDO DATOS AL BACKEND:');
            console.log('═══════════════════════════════════════════');
            console.log('Email:', signData.fields.email);
            console.log('Signer Name:', signData.fields.signer_name);
            console.log('Identity Type:', signData.fields.identity_type);
            console.log('Identity Number:', signData.fields.identity_number);
            console.log('Company:', signData.fields.company || '(vacío)');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('SIGNATURE (FIRMA):');
            console.log('  Existe:', !!signData.fields.signature);
            console.log('  Longitud:', signData.fields.signature?.length || 0, 'caracteres');
            console.log('  Inicio:', signData.fields.signature?.substring(0, 50) || 'N/A');
            console.log('  Final:', signData.fields.signature ? signData.fields.signature.substring(signData.fields.signature.length - 30) : 'N/A');
            console.log('  JSON completo:', JSON.stringify(signData).length, 'caracteres');
            console.log('═══════════════════════════════════════════');

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
                                                setEmail('');
                                                setSignerName('');
                                                setIdentityType('');
                                                setIdentityNumber('');
                                                setCompany('');
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
    const isExpired = contractStatus?.expires_at 
        ? new Date(contractStatus.expires_at) < new Date()
        : false;

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

                    {/* Contract Content - Only show if not signed and not expired */}
                    {!isSigned && !isExpired && (
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
                    {!isSigned && !isExpired && (
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
                                        <div className="col-lg-6 mb-3">
                                            <label style={{ 
                                                color: 'var(--thm-black)', 
                                                fontWeight: '600',
                                                marginBottom: '10px',
                                                display: 'block'
                                            }}>
                                                Email <span style={{ color: '#dc3545' }}>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                placeholder="cliente@example.com"
                                                style={{
                                                    padding: '15px',
                                                    borderRadius: '5px',
                                                    border: '1px solid #e0e0e0',
                                                    fontSize: '16px'
                                                }}
                                            />
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label style={{ 
                                                color: 'var(--thm-black)', 
                                                fontWeight: '600',
                                                marginBottom: '10px',
                                                display: 'block'
                                            }}>
                                                Nombre completo <span style={{ color: '#dc3545' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={signerName}
                                                onChange={(e) => setSignerName(e.target.value)}
                                                required
                                                placeholder="Juan Pérez"
                                                style={{
                                                    padding: '15px',
                                                    borderRadius: '5px',
                                                    border: '1px solid #e0e0e0',
                                                    fontSize: '16px'
                                                }}
                                            />
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label style={{ 
                                                color: 'var(--thm-black)', 
                                                fontWeight: '600',
                                                marginBottom: '10px',
                                                display: 'block'
                                            }}>
                                                Tipo de identificación <span style={{ color: '#dc3545' }}>*</span>
                                            </label>
                                            <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
                                                <div
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    className="form-control"
                                                    style={{
                                                        padding: '15px',
                                                        borderRadius: '5px',
                                                        border: '1px solid #e0e0e0',
                                                        fontSize: '16px',
                                                        backgroundColor: '#fff',
                                                        color: selectedIdentityType ? '#000' : '#6c757d',
                                                        cursor: 'pointer',
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        lineHeight: 'normal',
                                                        boxSizing: 'border-box'
                                                    }}
                                                >
                                                    <span style={{ flex: 1, textAlign: 'left' }}>
                                                        {selectedIdentityType ? selectedIdentityType.label : 'Seleccione un tipo'}
                                                    </span>
                                                    <i 
                                                        className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}
                                                        style={{ 
                                                            fontSize: '12px',
                                                            color: '#6c757d',
                                                            marginLeft: '10px',
                                                            transition: 'transform 0.3s'
                                                        }}
                                                    ></i>
                                                </div>
                                                {isDropdownOpen && (
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: '100%',
                                                            left: 0,
                                                            right: 0,
                                                            backgroundColor: '#fff',
                                                            border: '1px solid #e0e0e0',
                                                            borderRadius: '5px',
                                                            marginTop: '5px',
                                                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                            zIndex: 1000,
                                                            maxHeight: '300px',
                                                            overflowY: 'auto'
                                                        }}
                                                    >
                                                        {identityTypes.map((type) => (
                                                            <div
                                                                key={type.value}
                                                                onClick={() => {
                                                                    setIdentityType(type.value);
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                                style={{
                                                                    padding: '12px 15px',
                                                                    cursor: 'pointer',
                                                                    color: '#000',
                                                                    fontSize: '16px',
                                                                    backgroundColor: identityType === type.value ? '#f0f0f0' : '#fff',
                                                                    borderBottom: '1px solid #f0f0f0'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    if (identityType !== type.value) {
                                                                        e.currentTarget.style.backgroundColor = '#f8f8f8';
                                                                    }
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    if (identityType !== type.value) {
                                                                        e.currentTarget.style.backgroundColor = '#fff';
                                                                    }
                                                                }}
                                                            >
                                                                {type.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="hidden"
                                                value={identityType}
                                                required={!identityType}
                                            />
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <label style={{ 
                                                color: 'var(--thm-black)', 
                                                fontWeight: '600',
                                                marginBottom: '10px',
                                                display: 'block'
                                            }}>
                                                Número de identificación <span style={{ color: '#dc3545' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={identityNumber}
                                                onChange={(e) => setIdentityNumber(e.target.value)}
                                                required
                                                placeholder="12345678"
                                                style={{
                                                    padding: '15px',
                                                    borderRadius: '5px',
                                                    border: '1px solid #e0e0e0',
                                                    fontSize: '16px'
                                                }}
                                            />
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <label style={{ 
                                                color: 'var(--thm-black)', 
                                                fontWeight: '600',
                                                marginBottom: '10px',
                                                display: 'block'
                                            }}>
                                                Empresa (opcional)
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                                placeholder="Mi Empresa S.A.S"
                                                style={{
                                                    padding: '15px',
                                                    borderRadius: '5px',
                                                    border: '1px solid #e0e0e0',
                                                    fontSize: '16px'
                                                }}
                                            />
                                        </div>

                                        <div className="col-lg-12 mb-4">
                                            <label style={{ 
                                                color: 'var(--thm-black)', 
                                                fontWeight: '600',
                                                marginBottom: '10px',
                                                display: 'block'
                                            }}>
                                             
                                            </label>
                                            <SignatureCanvas
                                                onSignatureChange={handleSignatureChange}
                                            />
                                        </div>

                                        <div className="col-lg-12">
                                            <button
                                                type="button"
                                                className="thm-btn"
                                                onClick={handleSignContract}
                                                disabled={signing || !signature || !email || !signerName || !identityType || !identityNumber}
                                                style={{
                                                    opacity: (signing || !signature || !email || !signerName || !identityType || !identityNumber) ? 0.6 : 1,
                                                    cursor: (signing || !signature || !email || !signerName || !identityType || !identityNumber) ? 'not-allowed' : 'pointer'
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
                #identityTypeSelect {
                    color: #000 !important;
                }
                #identityTypeSelect option {
                    color: #000 !important;
                    background-color: #fff !important;
                }
                #identityTypeSelect option[value=""] {
                    color: #6c757d !important;
                }
            `}</style>
        </div>
    );
};

export default ConsultarContratoPage;
