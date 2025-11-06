import { NextResponse } from 'next/server';

/**
 * Debug endpoint para verificar los productos y sus IDs
 * Accede a: http://localhost:3000/api/debug-products
 */
export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.oceanoscuba.com.co';
    const licenseKey = process.env.NEXT_PUBLIC_LICENSE_KEY || '5cef21be9f78ab3844598129e69f14f8f8b4a23e9dcce403a69b6e3e85d1a673';
    
    const fullUrl = `${apiUrl}/api/v1/public/products`;
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': licenseKey
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

