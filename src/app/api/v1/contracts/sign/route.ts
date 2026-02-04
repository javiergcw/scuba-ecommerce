import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

/**
 * POST /api/v1/contracts/sign
 * API pública: crea el contrato (por company_name + sku) y lo firma en una sola llamada.
 * Body: { company_name, sku, fields: { signer_name, email, signature, ... } }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'El body debe ser un objeto JSON' },
        { status: 400 }
      );
    }

    const { company_name, sku, fields } = body;

    if (!company_name?.trim() || !sku?.trim()) {
      return NextResponse.json(
        { error: 'company_name y sku son requeridos en el body' },
        { status: 400 }
      );
    }

    if (!fields || typeof fields !== 'object') {
      return NextResponse.json(
        { error: 'El body debe incluir un objeto "fields" con los datos de firma' },
        { status: 400 }
      );
    }

    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/public/contracts/sign`;

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': API_CONFIG.LICENSE_KEY,
      },
      body: JSON.stringify({
        company_name: company_name.trim(),
        sku: sku.trim(),
        fields,
      }),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en POST /api/v1/contracts/sign:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
