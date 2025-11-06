import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.oceanoscuba.com.co';
    const licenseKey = process.env.NEXT_PUBLIC_LICENSE_KEY || '5cef21be9f78ab3844598129e69f14f8f8b4a23e9dcce403a69b6e3e85d1a673';
    
    const fullUrl = `${apiUrl}/api/v1/public/products/${params.id}`;
    console.log('🔍 Intentando obtener producto:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': licenseKey
      },
      cache: 'no-store'
    });

    console.log('📡 Respuesta de API:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error al obtener producto:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: 'Error al obtener producto', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Producto obtenido exitosamente');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en API route de producto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

