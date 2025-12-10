import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/contracts/${token}/pdf`;
    
    console.log('🔍 Descargando PDF del contrato:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'X-License-Key': API_CONFIG.LICENSE_KEY
      },
      cache: 'no-store'
    });

    console.log('📡 Respuesta de API:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error al obtener PDF:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: 'Error al obtener PDF del contrato', details: errorText },
        { status: response.status }
      );
    }

    // Obtener el PDF como blob
    const pdfBlob = await response.blob();
    
    // Crear respuesta con el PDF
    return new NextResponse(pdfBlob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="contrato-${token}.pdf"`,
      },
    });
  } catch (error) {
    console.error('❌ Error en API route de PDF:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

