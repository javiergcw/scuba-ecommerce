'use client';

import React, { useRef, useState, useEffect } from 'react';

interface SignatureCanvasProps {
  onSignatureChange: (signature: string) => void;
  initialSignature?: string;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ 
  onSignatureChange, 
  initialSignature 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar el canvas
    ctx.strokeStyle = '#051b35';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Si hay una firma inicial, cargarla
    if (initialSignature) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setHasSignature(true);
      };
      img.src = initialSignature;
    }
  }, [initialSignature]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
    updateSignature();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    updateSignature();
  };

  const updateSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL('image/png');
    onSignatureChange(dataURL);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignatureChange('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecciona un archivo de imagen válido');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calcular dimensiones manteniendo la proporción
        const maxWidth = canvas.width;
        const maxHeight = canvas.height;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Centrar la imagen
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        ctx.drawImage(img, x, y, width, height);
        setHasSignature(true);
        updateSignature();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ width: '100%' }}>

      
      {error && (
        <div className="alert alert-danger" role="alert" style={{ 
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px',
          background: 'rgba(220, 53, 69, 0.1)',
          border: '2px solid #dc3545',
          color: '#dc3545'
        }}>
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)}
            style={{ float: 'right' }}
          ></button>
        </div>
      )}

      <div style={{
        border: '2px solid #e0e0e0',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#fff',
        marginBottom: '20px',
        boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.05)'
      }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          style={{
            border: '1px solid #ddd',
            cursor: 'crosshair',
            display: 'block',
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            touchAction: 'none',
            borderRadius: '5px',
            backgroundColor: '#fff'
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <button
          type="button"
          className="thm-btn"
          onClick={clearCanvas}
          disabled={!hasSignature}
          style={{
            opacity: !hasSignature ? 0.5 : 1,
            cursor: !hasSignature ? 'not-allowed' : 'pointer',
            padding: '10px 20px',
            fontSize: '14px'
          }}
        >
          <span>Limpiar</span>
        </button>
        
        <label className="thm-btn" style={{ 
          cursor: 'pointer',
          padding: '10px 20px',
          fontSize: '14px',
          margin: 0,
          display: 'inline-block'
        }}>
          <span>Subir Imagen</span>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {!hasSignature && (
        <p style={{ 
          marginTop: '10px', 
          color: '#838a93', 
          fontStyle: 'italic',
          fontSize: '14px'
        }}>
          <i className="fas fa-info-circle me-2"></i>
          Dibuja tu firma en el área de arriba o sube una imagen
        </p>
      )}
    </div>
  );
};
