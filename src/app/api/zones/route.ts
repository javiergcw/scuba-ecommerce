import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

export async function GET() {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/public/zones`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': API_CONFIG.LICENSE_KEY
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

