import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.oceanoscuba.com.co/api/v1/public/zones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': '5cef21be9f78ab3844598129e69f14f8f8b4a23e9dcce403a69b6e3e85d1a673'
      },
      cache: 'no-store' // Para que no cachee y siempre obtenga datos frescos
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error al obtener zonas' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en API route de zonas:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

