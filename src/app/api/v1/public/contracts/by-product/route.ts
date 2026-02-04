import { NextResponse, NextRequest } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyName = searchParams.get('company_name');
    const sku = searchParams.get('sku');

    // Validar parámetros requeridos
    if (!companyName || !sku) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Los parámetros company_name y sku son requeridos' 
        },
        { status: 400 }
      );
    }

    // Construir URL del endpoint público
    const url = new URL(`${API_CONFIG.BASE_URL}/api/v1/public/contracts/by-product`);
    url.searchParams.append('company_name', companyName);
    url.searchParams.append('sku', sku);

    console.log('🔍 Obteniendo contrato por producto:', url.toString());
    console.log('📋 Company Name:', companyName);
    console.log('📋 SKU:', sku);
    
    // Llamada al API externo SIN token ni license key (endpoint público)
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    console.log('📡 Respuesta de API:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error al obtener contrato por producto:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { 
          success: false,
          error: 'Error al obtener contrato por producto', 
          details: errorText 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Contrato por producto obtenido exitosamente');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en API route de contrato por producto:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}
