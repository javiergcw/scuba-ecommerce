'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Accordion from '@/components/contrato/Accordion';
import DatosCliente from '@/components/contrato/DatosCliente';
import InventarioEquipo from '@/components/contrato/InventarioEquipo';
import TerminosAlquiler from '@/components/contrato/TerminosAlquiler';
import ControlInterno from '@/components/contrato/ControlInterno';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ArrendamientoPage({ params, searchParams }: PageProps) {
  const [id, setId] = useState<string>('');
  const [urlParams, setUrlParams] = useState<{ [key: string]: string | string[] | undefined }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const resolvedParams = await params;
        const resolvedSearchParams = await searchParams;
        
        setId(resolvedParams.id);
        setUrlParams(resolvedSearchParams);

        // Pre-llenar datos si vienen en la URL
        const initialData: any = {};
        if (resolvedSearchParams.name) {
          initialData.nombreCompleto = Array.isArray(resolvedSearchParams.name) 
            ? resolvedSearchParams.name[0] 
            : resolvedSearchParams.name;
        }
        if (resolvedSearchParams.email) {
          initialData.email = Array.isArray(resolvedSearchParams.email) 
            ? resolvedSearchParams.email[0] 
            : resolvedSearchParams.email;
        }
        if (resolvedSearchParams.phone) {
          initialData.telefono = Array.isArray(resolvedSearchParams.phone) 
            ? resolvedSearchParams.phone[0] 
            : resolvedSearchParams.phone;
        }

        setFormData(initialData);
      } catch (error) {
        console.error('Error loading params:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [params, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = formData;
    const errores: string[] = [];

    // Validaciones de datos del cliente
    if (!data.nombreCompleto) errores.push('El nombre completo es obligatorio.');
    if (!data.numeroCedula) errores.push('El número de cédula es obligatorio.');
    if (!data.fechaAlquiler) errores.push('La fecha de alquiler es obligatoria.');
    if (!data.numeroDias) errores.push('El número de días de alquiler es obligatorio.');
    if (data.numeroDias && parseInt(data.numeroDias) < 1) errores.push('El número de días debe ser mayor a 0.');

    // Validaciones de inventario de equipo
    const equiposSeleccionados = [
      'equipo_chaleco', 'equipo_regulador', 'equipo_mascara', 
      'equipo_aletas', 'equipo_snorkel', 'equipo_traje', 'equipo_nasa'
    ].filter(equipo => data[equipo]);

    if (equiposSeleccionados.length === 0) {
      errores.push('Debe seleccionar al menos un elemento del equipo.');
    }

    // Validar números de serie para equipos que lo requieren
    if (data.equipo_chaleco && !data.numero_chaleco) {
      errores.push('El chaleco BCD requiere número de serie.');
    }
    if (data.equipo_regulador && !data.numero_regulador) {
      errores.push('El regulador requiere número de serie.');
    }

    // Validaciones de términos y condiciones
    if (!data.aceptaTerminos) errores.push('Debe aceptar los términos y condiciones.');
    if (!data.firmaCliente) errores.push('La firma del cliente es obligatoria.');

    if (errores.length > 0) {
      setError(errores.join('\n'));
      setSuccess(false);
      return;
    }

    setError(null);
    setSuccess(true);

  };

  const handleDownloadPdf = async () => {
    if (!id) {
      alert('No se ha cargado el ID del contrato');
      return;
    }

    try {
      setDownloadingPdf(true);
      const response = await fetch(`/api/contracts/${id}/pdf`);
      
      if (!response.ok) {
        throw new Error('Error al descargar el PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contrato-alquiler-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar PDF:', error);
      alert('Error al descargar el PDF. Por favor, intente nuevamente.');
    } finally {
      setDownloadingPdf(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              OCEANO SCUBA - TAGANGA, COLOMBIA
            </h1>
            <h2 className="text-xl font-semibold text-blue-600">
              FORMATO DE ALQUILER DE EQUIPO DE BUCEO PARA BUZOS CERTIFICADOS
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              ID del contrato: {id}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Accordion title="Datos del Cliente" defaultOpen>
                <DatosCliente formData={formData} setFormData={setFormData} />
              </Accordion>

              <Accordion title="Inventario del Equipo de Buceo">
                <InventarioEquipo formData={formData} setFormData={setFormData} />
              </Accordion>

              <Accordion title="Términos y Condiciones de Alquiler">
                <TerminosAlquiler formData={formData} setFormData={setFormData} />
              </Accordion>

              <Accordion title="Control Interno - Oceano Scuba">
                <ControlInterno formData={formData} setFormData={setFormData} />
              </Accordion>
            </div>

            {/* Mensajes de error y éxito */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Errores encontrados:</h3>
                <div className="text-red-700 whitespace-pre-line">
                  {error.split('\n').map((err, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span>•</span>
                      <span>{err}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {success && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">¡Formulario enviado correctamente!</h3>
                <p className="text-green-700">
                  El contrato de alquiler ha sido procesado exitosamente.
                </p>
              </div>
            )}

            {/* Botones de acción */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 transition-colors duration-200"
              >
                Enviar Contrato
              </button>
              
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-8 transition-colors duration-200"
              >
                {downloadingPdf ? 'Descargando...' : '📄 Descargar PDF'}
              </button>
              
              <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-8 transition-colors duration-200"
              >
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
