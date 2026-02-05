import { NextResponse, NextRequest } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar que tenga company_name, sku y fields
    if (!body.company_name || !body.sku || !body.fields) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Los campos company_name, sku y fields son requeridos' 
        },
        { status: 400 }
      );
    }

    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/public/contracts/sign`;
    console.log('🔍 Intentando firmar contrato público:', fullUrl);
    console.log('📋 Company Name:', body.company_name);
    console.log('📋 SKU:', body.sku);
    console.log('📋 Campos:', Object.keys(body.fields || {}).length);
    
    // Llamada al API externo SIN token ni license key (endpoint público)
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store'
    });

    console.log('📡 Respuesta de API:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error al firmar contrato público:', response.status, response.statusText, errorText);
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(
          { 
            success: false,
            error: errorData.error || 'Error al firmar contrato público', 
            details: errorData 
          },
          { status: response.status }
        );
      } catch {
        return NextResponse.json(
          { 
            success: false,
            error: 'Error al firmar contrato público', 
            details: errorText 
          },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    console.log('✅ Contrato público firmado exitosamente');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error en API route de firma de contrato público:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}
