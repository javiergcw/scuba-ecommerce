import { NextResponse, NextRequest } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/sales`;
    
    console.log('🔍 Creando venta en:', fullUrl);
    console.log('📦 Datos de la venta:', JSON.stringify(body).substring(0, 200));
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': API_CONFIG.LICENSE_KEY
      },
      body: JSON.stringify(body),
      cache: 'no-store'
    });

    console.log('📡 Respuesta de API sales:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error al crear venta:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: 'Error al crear venta', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Venta creada exitosamente');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en API route de sales:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', message: String(error) },
      { status: 500 }
    );
  }
}

