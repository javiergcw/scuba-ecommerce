import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await request.json();
    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/public/contracts/${token}/sign`;
    
    // LOG SIMPLE
    console.log('═══════════════════════════════════════════');
    console.log('🔍 API ROUTE: Recibiendo datos');
    console.log('═══════════════════════════════════════════');
    console.log('URL:', fullUrl);
    console.log('Tiene fields:', !!body.fields);
    console.log('Keys:', body.fields ? Object.keys(body.fields) : []);
    console.log('Email:', body.fields?.email);
    console.log('Signer Name:', body.fields?.signer_name);
    console.log('Identity Type:', body.fields?.identity_type);
    console.log('Identity Number:', body.fields?.identity_number);
    console.log('Company:', body.fields?.company || '(vacío)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('SIGNATURE (FIRMA):');
    console.log('  Existe:', !!body.fields?.signature);
    if (body.fields?.signature) {
      console.log('  Longitud:', body.fields.signature.length, 'caracteres');
      console.log('  Inicio:', body.fields.signature.substring(0, 50));
    } else {
      console.log('  ❌ ERROR: LA FIRMA NO ESTÁ PRESENTE');
      return NextResponse.json(
        { success: false, error: 'La firma es requerida' },
        { status: 400 }
      );
    }
    console.log('═══════════════════════════════════════════');
    
    // Preparar el body que se enviará - VERIFICAR QUE NO SE PIERDA LA FIRMA
    const jsonBody = JSON.stringify(body);
    
    // Verificar que el JSON serializado tenga la firma
    const parsedBody = JSON.parse(jsonBody);
    console.log('═══════════════════════════════════════════');
    console.log('📤 VERIFICACIÓN ANTES DE ENVIAR AL BACKEND:');
    console.log('═══════════════════════════════════════════');
    console.log('JSON tamaño:', jsonBody.length, 'caracteres');
    console.log('Body parseado tiene fields:', !!parsedBody.fields);
    console.log('Body parseado tiene signature:', !!parsedBody.fields?.signature);
    if (parsedBody.fields?.signature) {
      console.log('Signature en body parseado:', {
        existe: true,
        longitud: parsedBody.fields.signature.length,
        inicio: parsedBody.fields.signature.substring(0, 50),
        esBase64: parsedBody.fields.signature.startsWith('data:image/')
      });
    } else {
      console.log('❌ ERROR: La firma NO está en el body parseado después de JSON.stringify/parse');
    }
    console.log('Tiene "signature" en string JSON:', jsonBody.includes('"signature"'));
    console.log('Tiene "signature":"data:image" en JSON:', jsonBody.includes('"signature":"data:image'));
    const signatureIndex = jsonBody.indexOf('"signature"');
    if (signatureIndex > -1) {
      console.log('Preview de signature en JSON (200 chars desde posición):', jsonBody.substring(signatureIndex, signatureIndex + 200));
    }
    console.log('═══════════════════════════════════════════');
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': API_CONFIG.LICENSE_KEY
      },
      body: jsonBody,
      cache: 'no-store'
    });

    console.log('📡 Respuesta de API:', response.status, response.statusText);

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ Error al firmar contrato:', response.status, response.statusText, data);
      return NextResponse.json(data, { status: response.status });
    }

    console.log('✅ Contrato firmado exitosamente');
    console.log('📋 Datos de respuesta:', {
      success: data.success,
      hasData: !!data.data,
      hasSignature: !!data.data?.signature,
      signatureLength: data.data?.signature?.length || 0,
      signaturePreview: data.data?.signature?.substring(0, 50) || 'N/A',
      status: data.data?.status,
      email: data.data?.email,
      signer_name: data.data?.signer_name
    });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en API route de firma de contrato:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

