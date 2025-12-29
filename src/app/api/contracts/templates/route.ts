import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

export async function GET() {
  try {
    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/contracts/templates`;
    console.log('🔍 Intentando obtener plantillas de contratos:', fullUrl);
    
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
      console.error('❌ Error al obtener plantillas de contratos:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: 'Error al obtener plantillas de contratos', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Plantillas de contratos obtenidas exitosamente');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en API route de plantillas de contratos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

