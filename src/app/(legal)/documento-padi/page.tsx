'use client'



// SSR desactivado para evitar error de hydration
/* const PdfGallery = dynamic(() => import('@/components/privacyPolicy/PdfGallery'), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center h-[85vh] space-y-4">
            <img
                src="/assets/images/Animation - 1746715748714.gif"
                alt="Cargando..."
                style={{
                    width: 200,
                    height: 200,
                    display: 'block',
                }}
            />
            <p className="text-gray-600 text-lg font-medium">Cargando documentos...</p>
        </div>
    ),
})
 */
export default function Page() {
/*     return <PdfGallery /> */
return <div>
    <h1>Cargando...</h1>
</div>
}
