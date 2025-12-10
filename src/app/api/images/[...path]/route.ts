import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const imagePath = Array.isArray(path) ? path.join('/') : path;
    
    // Construir la URL completa del servidor de imágenes
    const imageUrl = `http://154.38.181.22:9000/oceanoscuba/${imagePath}`;
    
    console.log('🖼️ Proxying image from:', imageUrl);
    
    // Hacer fetch de la imagen desde el servidor HTTP
    const imageResponse = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Next.js Image Proxy',
      },
      // No cachear para desarrollo, pero en producción podrías querer cachear
      cache: 'no-store',
    });

    if (!imageResponse.ok) {
      console.error('❌ Error fetching image:', imageResponse.status, imageResponse.statusText);
      return new NextResponse('Image not found', { status: imageResponse.status });
    }

    // Obtener el contenido de la imagen
    const imageBuffer = await imageResponse.arrayBuffer();
    
    // Obtener el content type de la respuesta original
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    
    // Retornar la imagen con los headers apropiados
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  } catch (error) {
    console.error('❌ Error in image proxy:', error);
    return new NextResponse('Error proxying image', { status: 500 });
  }
}

