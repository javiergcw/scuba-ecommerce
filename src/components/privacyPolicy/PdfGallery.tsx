'use client'

import { useEffect, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import {
    Box,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    IconButton,
    Button,
    Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'

const pdfUrls: string[] = [
    '/pdfs/Declaracion-de-comprension.pdf',
    '/pdfs/Diver-Medical_Form.pdf',
    '/pdfs/Informe-medico.pdf',
    '/pdfs/Liability_Release.pdf',
    '/pdfs/Liberacion-de-responsabilida.pdf',
    '/pdfs/Statement-of-understanding.pdf',
]

export default function PDFGalleryWithControls() {
    const [previews, setPreviews] = useState<(string | null)[]>(Array(pdfUrls.length).fill(null))
    const [open, setOpen] = useState(false)
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
    const [currentPageImg, setCurrentPageImg] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const loadPreview = async (url: string, index: number) => {
            try {
                const pdf = await pdfjsLib.getDocument(url).promise
                const page = await pdf.getPage(1)
                const viewport = page.getViewport({ scale: 1.2 })
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')!

                canvas.width = viewport.width
                canvas.height = viewport.height

                await page.render({ canvasContext: context, viewport }).promise
                const imgData = canvas.toDataURL('image/png')

                setPreviews(prev => {
                    const newPreviews = [...prev]
                    newPreviews[index] = imgData
                    return newPreviews
                })
            } catch (error) {
                console.error(`Error cargando ${url}`, error)
                setPreviews(prev => {
                    const newPreviews = [...prev]
                    newPreviews[index] = ''
                    return newPreviews
                })
            }
        }

        pdfUrls.forEach((url, index) => {
            loadPreview(url, index)
        })
    }, [])

    const openPdfViewer = async (pdfUrl: string) => {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise
        setSelectedPdf(pdfUrl)
        setTotalPages(pdf.numPages)
        setCurrentPage(1)
        renderPage(pdf, 1)
        setOpen(true)
    }

    const renderPage = async (pdf: pdfjsLib.PDFDocumentProxy, pageNum: number) => {
        const page = await pdf.getPage(pageNum)
        const viewport = page.getViewport({ scale: 1.2 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')!

        canvas.width = viewport.width
        canvas.height = viewport.height

        await page.render({ canvasContext: context, viewport }).promise
        const imgData = canvas.toDataURL('image/png')
        setCurrentPageImg(imgData)
    }

    const handlePageChange = async (offset: number) => {
        if (!selectedPdf) return
        const newPage = currentPage + offset
        if (newPage < 1 || newPage > totalPages) return

        const pdf = await pdfjsLib.getDocument(selectedPdf).promise
        renderPage(pdf, newPage)
        setCurrentPage(newPage)
    }

    return (
        <>
            <Box sx={{ textAlign: 'center', pt: 15, pb: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        fontSize: { xs: '1.5rem', md: '2.125rem' }, 
                    }}
                >
                    DOCUMENTOS PADI
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 3,
                    maxWidth: '1200px',
                    mx: 'auto',
                    mb: 10,
                }}
            >
                {pdfUrls.map((url, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: 'calc(33.333% - 20px)',
                            height: 500,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            boxShadow: 4,
                            minWidth: '300px',
                        }}
                        onClick={() => previews[index] && openPdfViewer(url)}
                    >
                        <CardContent
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                flexDirection: 'column',
                            }}
                        >
                            {previews[index] === null ? (
                                <>
                                    <img
                                        src="/assets/images/Animation - 1746715748714.gif"
                                        alt="Cargando..."
                                        style={{
                                            width: 200,
                                            height: 200,
                                            display: 'block',
                                        }}
                                    />
                                    <p style={{ color: '#4B5563', fontSize: '1rem', fontWeight: 500 }}>
                                        Cargando...
                                    </p>
                                </>
                            ) : previews[index] === '' ? (
                                <p>Error al cargar</p>
                            ) : (
                                <Box
                                    component="img"
                                    src={previews[index] as string}
                                    alt={`Vista previa ${index + 1}`}
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
                <DialogContent
                    sx={{
                        p: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100vh',
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                        <IconButton onClick={() => handlePageChange(-1)} disabled={currentPage <= 1}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <Typography>
                            Página {currentPage} / {totalPages}
                        </Typography>
                        <IconButton onClick={() => handlePageChange(1)} disabled={currentPage >= totalPages}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            px: 2,
                        }}
                    >
                        {currentPageImg && (
                            <Box
                                component="img"
                                src={currentPageImg}
                                alt={`Página ${currentPage}`}
                                sx={{
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        )}
                    </Box>

                    <Box display="flex" justifyContent="center" p={2}>
                        <Button variant="outlined" onClick={() => setOpen(false)} startIcon={<CloseIcon />}>
                            Cerrar visor
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
