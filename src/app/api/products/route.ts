import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.oceanoscuba.com.co';
    const licenseKey = process.env.NEXT_PUBLIC_LICENSE_KEY || '5cef21be9f78ab3844598129e69f14f8f8b4a23e9dcce403a69b6e3e85d1a673';
    
    const fullUrl = `${apiUrl}/api/v1/public/products`;
    console.log('🔍 Obteniendo productos desde:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': licenseKey
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

