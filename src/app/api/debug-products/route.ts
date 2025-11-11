import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/core/const/api_const';

/**
 * Debug endpoint para verificar los productos y sus IDs
 * Accede a: http://localhost:3000/api/debug-products
 */
export async function GET() {
  try {
    const fullUrl = `${API_CONFIG.BASE_URL}/api/v1/public/products`;
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': API_CONFIG.LICENSE_KEY
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error al obtener productos', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Formatear la respuesta para debugging
    const debug = {
      totalProducts: data.data?.length || 0,
      products: data.data?.map((product: any) => ({
        id: product.id,
        name: product.name,
        detailUrl: `/courses/${product.id}`,
        apiUrl: `/api/products/${product.id}`,
        category: product.category_name,
        subcategory: product.subcategory_name,
        price: product.price
      })) || []
    };

    return NextResponse.json(debug, { status: 200 });
  } catch (error) {
    console.error('❌ Error en debug-products:', error);
    return NextResponse.json(
      { error: 'Error interno', message: String(error) },
      { status: 500 }
    );
  }
}

