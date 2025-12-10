import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/public/contracts/${token}`;
    console.log('🔍 Intentando obtener contrato por token:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': API_CONFIG.LICENSE_KEY
      },
      cache: 'no-store'
    });

    console.log('📡 Respuesta de API:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error al obtener contrato:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: 'Error al obtener contrato', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Contrato obtenido exitosamente');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en API route de contrato:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

