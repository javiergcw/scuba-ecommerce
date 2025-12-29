import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('company_id');
    const date = searchParams.get('date');

    if (!companyId || !date) {
      return NextResponse.json(
        { error: 'company_id y date son requeridos' },
        { status: 400 }
      );
    }

    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/booking-capacity/public?company_id=${companyId}&date=${date}`;
    console.log('🔍 Consultando capacidad de reserva:', fullUrl);

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
      console.error('❌ Error al obtener capacidad:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: 'Error al obtener capacidad de reserva', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Capacidad obtenida exitosamente');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en API route de capacidad:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

