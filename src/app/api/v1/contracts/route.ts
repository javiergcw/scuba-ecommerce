import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

/**
 * GET /api/v1/contracts
 * API pública: obtiene contratos.
 * - company_name + sku: contrato(s) de esa empresa y producto.
 * - date_from, date_to (opcionales): filtro por rango de fechas (ISO 8601, ej. 2024-01-01).
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const company_name = searchParams.get('company_name');
    const sku = searchParams.get('sku');
    const date_from = searchParams.get('date_from');
    const date_to = searchParams.get('date_to');

    const params = new URLSearchParams();
    if (company_name?.trim()) params.set('company_name', company_name.trim());
    if (sku?.trim()) params.set('sku', sku.trim());
    if (date_from?.trim()) params.set('date_from', date_from.trim());
    if (date_to?.trim()) params.set('date_to', date_to.trim());

    const queryString = params.toString();
    if (!queryString) {
      return NextResponse.json(
        { error: 'Indica al menos un filtro: company_name y sku, o date_from/date_to' },
        { status: 400 }
      );
    }

    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/public/contracts?${queryString}`;

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': API_CONFIG.LICENSE_KEY,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorBody: unknown;
      try {
        errorBody = JSON.parse(errorText);
      } catch {
        errorBody = { error: errorText || 'Error al obtener contrato' };
      }
      return NextResponse.json(errorBody, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en GET /api/v1/contracts:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
