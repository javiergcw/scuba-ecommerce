/* 'use client'

import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
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

const pdfUrls: string[] = [
    '/pdfs/Declaracion-de-comprension.pdf',
    '/pdfs/Diver-Medical_Form.pdf',
    '/pdfs/Informe-medico.pdf',
    '/pdfs/Liability_Release.pdf',
    '/pdfs/Liberacion-de-responsabilida.pdf',
    '/pdfs/Statement-of-understanding.pdf',
]
 */
export default function PDFGalleryWithControls() {
   /*  const [open, setOpen] = useState(false)
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
    const [numPages, setNumPages] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isClient, setIsClient] = useState(false)
    const [isPdfWorkerInitialized, setIsPdfWorkerInitialized] = useState(false)

    useEffect(() => {
        const initializePdfWorker = async () => {
            try {
                if (typeof window !== 'undefined') {
                    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry')
                    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
                    setIsPdfWorkerInitialized(true)
                }
            } catch (error) {
                console.error('Error initializing PDF worker:', error)
            }
            setIsClient(true)
        }

        initializePdfWorker()
    }, [])

    const handleOpen = (url: string) => {
        setSelectedPdf(url)
        setOpen(true)
        setCurrentPage(1)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedPdf(null)
        setCurrentPage(1)
    }

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
        setCurrentPage(1)
    }

    const handlePageChange = (offset: number) => {
        setCurrentPage((prev) => {
            const next = prev + offset
            if (next < 1) return 1
            if (next > numPages) return numPages
            return next
        })
    }

    if (!isClient || !isPdfWorkerInitialized) {
        return (
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
        )
    }
 */
    return (
        <>
           {/*  <Box sx={{ textAlign: 'center', pt: 15, pb: 4 }}>
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
                        onClick={() => handleOpen(url)}
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
                            <Box sx={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Document
                                    file={url}
                                    loading={<img src="/assets/images/Animation - 1746715748714.gif" alt="Cargando..." style={{ width: 200, height: 200 }} />}
                                    error={<p>Error al cargar</p>}
                                    noData={<p>No hay datos</p>}
                                >
                                    <Page pageNumber={1} width={250} />
                                </Document>
                            </Box>
                            <Typography variant="subtitle1" sx={{ mt: 2, textAlign: 'center' }}>
                                {url.split('/').pop()}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Dialog open={open} onClose={handleClose} fullScreen>
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
                            Página {currentPage} / {numPages}
                        </Typography>
                        <IconButton onClick={() => handlePageChange(1)} disabled={currentPage >= numPages}>
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
                        {selectedPdf && (
                            <Document
                                file={selectedPdf}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={<img src="/assets/images/Animation - 1746715748714.gif" alt="Cargando..." style={{ width: 200, height: 200 }} />}
                                error={<p>Error al cargar</p>}
                                noData={<p>No hay datos</p>}
                            >
                                <Page pageNumber={currentPage} width={600} />
                            </Document>
                        )}
                    </Box>

                    <Box display="flex" justifyContent="center" p={2}>
                        <Button variant="outlined" onClick={handleClose} startIcon={<CloseIcon />}>
                            Cerrar visor
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog> */}
        </>
    )
}
