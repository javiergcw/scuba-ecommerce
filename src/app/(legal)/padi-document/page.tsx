'use client'

import dynamic from 'next/dynamic'

// SSR desactivado para evitar error de hydration
const PdfGallery = dynamic(() => import('@/components/privacyPolicy/PdfGallery'), {
    ssr: false,
})

export default function Page() {
    return <PdfGallery />
}
