/**
 * Convierte URLs de imágenes HTTP a través del proxy de Next.js
 * para evitar problemas de mixed content (HTTP en HTTPS)
 * 
 * @param imageUrl - URL original de la imagen
 * @returns URL procesada que usa el proxy si es necesario
 */
export function getProxiedImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return '';
  }

  // Si la URL es del servidor HTTP que necesitamos proxy
  if (imageUrl.includes('http://154.38.181.22:9000/oceanoscuba/')) {
    // Extraer la ruta después de /oceanoscuba/
    const pathMatch = imageUrl.match(/\/oceanoscuba\/(.+)$/);
    if (pathMatch && pathMatch[1]) {
      // Usar el proxy API route de Next.js
      return `/api/images/${pathMatch[1]}`;
    }
  }

  // Si ya es HTTPS o no necesita proxy, retornar tal cual
  return imageUrl;
}

/**
 * Convierte múltiples URLs de imágenes a través del proxy
 * 
 * @param imageUrls - Array de URLs de imágenes
 * @returns Array de URLs procesadas
 */
export function getProxiedImageUrls(imageUrls: (string | null | undefined)[]): string[] {
  return imageUrls.map(url => getProxiedImageUrl(url));
}

