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
    console.log('🔍 Intentando firmar contrato por token:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': API_CONFIG.LICENSE_KEY
      },
      body: JSON.stringify(body),
      cache: 'no-store'
    });

    console.log('📡 Respuesta de API:', response.status, response.statusText);

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ Error al firmar contrato:', response.status, response.statusText);
      return NextResponse.json(data, { status: response.status });
    }

    console.log('✅ Contrato firmado exitosamente');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en API route de firma de contrato:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

