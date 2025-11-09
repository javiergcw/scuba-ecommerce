import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

export async function GET() {
  try {
    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/public/products`;
    console.log('🔍 Obteniendo productos desde:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': API_CONFIG.LICENSE_KEY
      },
      cache: 'no-store' // Para que no cachee y siempre obtenga datos frescos
    });

    console.log('📡 Respuesta de API productos:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error al obtener productos:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: 'Error al obtener productos', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`✅ ${data.data?.length || 0} productos obtenidos exitosamente`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en API route de productos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

