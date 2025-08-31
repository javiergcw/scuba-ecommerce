"use client";

import React, { useState } from 'react';
import { OrderUseCase } from '@/core/use-case/order/order_use_case';
import { ReceiveTrackingOrderDto } from '@/core/dto/receive/order/receive_tracking_order_dto';

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [orderData, setOrderData] = useState<ReceiveTrackingOrderDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'status-success';
      case 'pending':
        return 'status-warning';
      case 'cancelled':
      case 'failed':
        return 'status-error';
      default:
        return 'status-default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Completada';
      case 'paid':
        return 'Pagada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      case 'failed':
        return 'Fallida';
      default:
        return status;
    }
  };

  const handleSearch = async () => {
    if (!trackingCode.trim()) {
      setError('Por favor ingresa un código de tracking');
      return;
    }

    setLoading(true);
    setError(null);
    setOrderData(null);
    setHasSearched(true);

    try {
      await OrderUseCase.getOrderByTrackingCode(
        trackingCode.trim(),
        (data) => {
          setOrderData(data);
          setLoading(false);
        },
        (error) => {
          setError(error.message || 'No se encontró la orden con ese código de tracking');
          setLoading(false);
        }
      );
    } catch (error) {
      setError('Error inesperado al buscar la orden');
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="tracking-page-wrapper">
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header__bg" style={{ backgroundImage: 'url(/assets/images/background/page-header-bg-1-1.jpg)' }}></div>
        <div className="container">
          <ul className="list-unstyled thm-breadcrumb">
            <li><a href="/">Home</a></li>
            <li className="active"><a href="#">Seguimiento</a></li>
          </ul>
          <h2 className="page-header__title" style={{ fontSize: '2.5rem', fontWeight: '600' }}>Seguimiento de Órdenes</h2>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="tracking-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              {/* Search Form */}
              <div className="tracking-search-box text-center">
                <div className="section-title text-center">
                  <div className="section-title__tagline-box">
                    <span className="section-title__tagline">Buscar Orden</span>
                  </div>
                  <h2 className="section-title__title">Ingresa tu código de tracking</h2>
                  <p className="section-title__text">
                    Para ver el estado de tu orden y los detalles de tu curso de buceo
                  </p>
                </div>

                <div className="tracking-form">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="tracking-input-group">
                        <input
                          type="text"
                          className="tracking-input"
                          placeholder="Ej: 5GT2V5FV"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyPress={handleKeyPress}
                        />
                        <button
                          className="thm-btn tracking-btn"
                onClick={handleSearch}
                disabled={loading}
              >
              {loading ? (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          ) : (
                            <i className="fas fa-search me-2"></i>
                          )}
                          Buscar
                        </button>
                      </div>
                    </div>
                  </div>

                      {error && (
                    <div className="alert alert-danger mt-4" role="alert">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
                    </div>
            )}
                </div>
              </div>

              {/* No Results */}
        {hasSearched && !loading && !error && !orderData && (
                <div className="tracking-no-results text-center">
                  <div className="tracking-no-results__icon">
                    <i className="fas fa-search"></i>
                  </div>
                  <h3 className="tracking-no-results__title">Orden no encontrada</h3>
                  <p className="tracking-no-results__text">
                    No se encontró ninguna orden con el código de tracking: <strong>{trackingCode}</strong>
                  </p>
                </div>
              )}

              {/* Order Results */}
        {orderData && (
                <div className="tracking-results">
                  {/* Success Header */}
                  <div className="tracking-success-header text-center">
                    <div className="tracking-success-header__icon">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h2 className="tracking-success-header__title">Orden Encontrada</h2>
                  </div>

                  {/* Order Information Grid */}
                  <div className="row">
                    {/* Customer Information */}
                    <div className="col-lg-6 mb-4">
                      <div className="tracking-card">
                        <div className="tracking-card__header">
                          <div className="tracking-card__icon">
                            <i className="fas fa-user"></i>
                          </div>
                          <h3 className="tracking-card__title">Información del Cliente</h3>
                        </div>
                        <div className="tracking-card__body">
                          <div className="tracking-info-item">
                            <span className="tracking-info-item__label">Nombre:</span>
                            <span className="tracking-info-item__value">{orderData.data.customer_name}</span>
                          </div>
                          <div className="tracking-info-item">
                            <span className="tracking-info-item__label">Email:</span>
                            <span className="tracking-info-item__value">{orderData.data.customer_email}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Information */}
                    <div className="col-lg-6 mb-4">
                      <div className="tracking-card">
                        <div className="tracking-card__header">
                          <div className="tracking-card__icon">
                            <i className="fas fa-receipt"></i>
                          </div>
                          <h3 className="tracking-card__title">Información de la Orden</h3>
                        </div>
                        <div className="tracking-card__body">
                          <div className="tracking-info-item">
                            <span className="tracking-info-item__label">ID de Orden:</span>
                            <span className="tracking-info-item__value">#{orderData.data.order_id}</span>
                          </div>
                          <div className="tracking-info-item">
                            <span className="tracking-info-item__label">Código de Tracking:</span>
                            <span className="tracking-code">{orderData.data.tracking_code}</span>
                          </div>
                          <div className="tracking-info-item">
                            <span className="tracking-info-item__label">Fecha de Creación:</span>
                            <span className="tracking-info-item__value">{formatDate(orderData.data.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status and Products */}
                  <div className="row">
                    {/* Status */}
                    <div className="col-lg-4 mb-4">
                      <div className="tracking-card">
                        <div className="tracking-card__header">
                          <div className="tracking-card__icon">
                            <i className="fas fa-eye"></i>
                          </div>
                          <h3 className="tracking-card__title">Estados</h3>
                        </div>
                        <div className="tracking-card__body">
                          <div className="tracking-info-item">
                            <span className="tracking-info-item__label">Estado de la Orden:</span>
                            <span className={`tracking-status ${getStatusClass(orderData.data.status)}`}>
                              {getStatusText(orderData.data.status)}
                            </span>
                          </div>
                          <div className="tracking-info-item">
                            <span className="tracking-info-item__label">Estado de Pago:</span>
                            <span className={`tracking-status ${getStatusClass(orderData.data.payment_status)}`}>
                              {getStatusText(orderData.data.payment_status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="col-lg-8 mb-4">
                      <div className="tracking-card">
                        <div className="tracking-card__header">
                          <div className="tracking-card__icon">
                            <i className="fas fa-swimming-pool"></i>
                          </div>
                          <h3 className="tracking-card__title">Productos del Curso</h3>
                        </div>
                        <div className="tracking-card__body">
                          <div className="tracking-products">
                            {orderData.data.items.map((item, index) => (
                              <div key={index} className="tracking-product-item">
                                <div className="tracking-product-item__content">
                                  <h4 className="tracking-product-item__title">{item.product_name}</h4>
                                  <div className="tracking-product-item__details">
                                    <span className="tracking-product-item__sku">SKU: {item.product_sku}</span>
                                    <span className="tracking-product-item__quantity">Cantidad: {item.quantity}</span>
                                  </div>
                                </div>
                                <div className="tracking-product-item__price">
                                  <div className="tracking-product-item__total">{formatPrice(item.total_price)}</div>
                                  {item.unit_price > 0 && (
                                    <div className="tracking-product-item__unit">{formatPrice(item.unit_price)} c/u</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total and Contracts */}
                  <div className="row">
                    {/* Total */}
                    <div className="col-lg-6 mb-4">
                      <div className="tracking-card tracking-card--total">
                        <div className="tracking-card__header">
                          <div className="tracking-card__icon">
                            <i className="fas fa-dollar-sign"></i>
                          </div>
                          <h3 className="tracking-card__title">Total de la Orden</h3>
                        </div>
                        <div className="tracking-card__body">
                          <div className="tracking-total">
                            <span className="tracking-total__label">Total Confirmado:</span>
                            <span className="tracking-total__amount">{formatPrice(orderData.data.total_amount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contracts */}
                    <div className="col-lg-6 mb-4">
                      <div className="tracking-card">
                        <div className="tracking-card__header">
                          <div className="tracking-card__icon">
                            <i className="fas fa-file-contract"></i>
                          </div>
                          <h3 className="tracking-card__title">Estado de Contratos</h3>
                        </div>
                        <div className="tracking-card__body">
                          <div className="tracking-info-item">
                            <span className="tracking-info-item__label">Contratos Totales:</span>
                            <span className="tracking-info-item__value">{orderData.data.contracts_total}</span>
                          </div>
                          <div className="tracking-info-item">
                            <span className="tracking-info-item__label">Contratos Firmados:</span>
                            <span className="tracking-info-item__value tracking-info-item__value--success">{orderData.data.contracts_signed}</span>
                          </div>
                          <div className="tracking-info-item">
                            <span className="tracking-info-item__label">Contratos Pendientes:</span>
                            <span className="tracking-info-item__value tracking-info-item__value--warning">{orderData.data.contracts_pending}</span>
                          </div>
                          
                          {orderData.data.has_pending_contracts && (
                            <div className="alert alert-warning mt-3" role="alert">
                              <i className="fas fa-exclamation-triangle me-2"></i>
                              Tienes contratos pendientes de firma. Por favor revisa tu email.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

             <style jsx>{`
          /* Fondo principal de toda la página */
          .tracking-page-wrapper {
            min-height: 100vh;
            background-color: rgba(59, 145, 225, 0.1);
            background-image: url('/assets/images/shapes/water-wave-bg.png');
            background-size: 300px 150px;
            background-repeat: repeat;
            background-position: center;
            background-attachment: fixed;
            position: relative;
          }

          .tracking-page-wrapper::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.1);
            z-index: 1;
          }

          .page-header {
            position: relative;
            z-index: 2;
          }

          .tracking-section {
            padding: 120px 0;
            background-color: transparent;
            position: relative;
            z-index: 2;
          }

          .tracking-search-box {
           background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%);
           background-image: url('/assets/images/shapes/video-2-bg.png');
           background-size: cover;
           background-position: center;
           background-repeat: no-repeat;
           padding: 60px 40px;
           border-radius: 20px;
           box-shadow: 0 10px 30px rgba(0,0,0,0.1);
           margin-bottom: 50px;
           position: relative;
         }

         .tracking-search-box::before {
           content: '';
           position: absolute;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%);
           border-radius: 20px;
           z-index: 1;
         }

         .tracking-search-box > * {
           position: relative;
           z-index: 2;
         }

        .tracking-input-group {
          display: flex;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          border-radius: 15px;
          overflow: hidden;
          background: white;
        }

        .tracking-input {
          flex: 1;
          border: none;
          padding: 20px 25px;
          font-size: 16px;
          background: transparent;
          outline: none;
        }

        .tracking-input:focus {
          box-shadow: none;
        }

        .tracking-btn {
          border: none;
          padding: 20px 40px;
          background: var(--thm-base);
          color: white;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          border-radius: 0;
        }

        .tracking-btn:hover {
          background: var(--thm-black);
          transform: translateY(-2px);
        }

        .tracking-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
          transform: none;
        }

        .tracking-no-results {
          background: white;
          padding: 80px 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          text-align: center;
        }

        .tracking-no-results__icon {
          margin-bottom: 30px;
        }

        .tracking-no-results__icon i {
          font-size: 4rem;
          color: #ff6b6b;
        }

        .tracking-no-results__title {
          font-size: 2rem;
          font-weight: 600;
          color: var(--thm-black);
          margin-bottom: 20px;
        }

        .tracking-no-results__text {
          font-size: 1.1rem;
          color: #6c757d;
          line-height: 1.6;
        }

        .tracking-success-header {
          background: white;
          padding: 50px 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 40px;
          text-align: center;
        }

        .tracking-success-header__icon {
          margin-bottom: 20px;
        }

        .tracking-success-header__icon i {
          font-size: 3rem;
          color: #4caf50;
        }

        .tracking-success-header__title {
          font-size: 2.5rem;
          font-weight: 600;
          color: var(--thm-black);
          margin: 0;
        }

        .tracking-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
        }

        .tracking-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .tracking-card--total {
          background: linear-gradient(135deg, var(--thm-base) 0%, var(--thm-black) 100%);
          color: white;
        }

        .tracking-card__header {
          padding: 30px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .tracking-card--total .tracking-card__header {
          border-bottom-color: rgba(255,255,255,0.2);
        }

        .tracking-card__icon {
          width: 60px;
          height: 60px;
          background: var(--thm-base);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }

        .tracking-card--total .tracking-card__icon {
          background: rgba(255,255,255,0.2);
        }

        .tracking-card__title {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: var(--thm-black);
        }

        .tracking-card--total .tracking-card__title {
          color: white;
        }

        .tracking-card__body {
          padding: 30px;
        }

        .tracking-info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .tracking-info-item:last-child {
          border-bottom: none;
        }

        .tracking-info-item__label {
          font-weight: 500;
          color: #6c757d;
          font-size: 14px;
        }

        .tracking-info-item__value {
          font-weight: 600;
          color: var(--thm-black);
          font-size: 14px;
        }

        .tracking-info-item__value--success {
          color: #28a745;
        }

        .tracking-info-item__value--warning {
          color: #ffc107;
        }

        .tracking-code {
          background: rgba(59, 145, 225, 0.1);
          color: var(--thm-base);
          padding: 8px 15px;
          border-radius: 8px;
          font-family: monospace;
          border: 1px solid rgba(59, 145, 225, 0.2);
          font-size: 14px;
        }

        .tracking-status {
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-success {
          background: rgba(40, 167, 69, 0.1);
          color: #28a745;
          border: 1px solid rgba(40, 167, 69, 0.2);
        }

        .status-warning {
          background: rgba(255, 193, 7, 0.1);
          color: #ffc107;
          border: 1px solid rgba(255, 193, 7, 0.2);
        }

        .status-error {
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          border: 1px solid rgba(220, 53, 69, 0.2);
        }

        .status-default {
          background: rgba(108, 117, 125, 0.1);
          color: #6c757d;
          border: 1px solid rgba(108, 117, 125, 0.2);
        }

        .tracking-products {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .tracking-product-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px;
          background: #f8f9fa;
          border-radius: 15px;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }

        .tracking-product-item:hover {
          background: #e9ecef;
          transform: translateX(5px);
        }

        .tracking-product-item__content {
          flex: 1;
        }

        .tracking-product-item__title {
          margin: 0 0 10px 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--thm-black);
        }

        .tracking-product-item__details {
          display: flex;
          gap: 25px;
          font-size: 13px;
          color: #6c757d;
        }

        .tracking-product-item__price {
          text-align: right;
        }

        .tracking-product-item__total {
          font-size: 20px;
          font-weight: 600;
          color: #28a745;
        }

        .tracking-product-item__unit {
          font-size: 13px;
          color: #6c757d;
        }

        .tracking-total {
          text-align: center;
          padding: 40px;
          background: rgba(255,255,255,0.1);
          border-radius: 15px;
        }

        .tracking-total__label {
          display: block;
          font-size: 18px;
          margin-bottom: 15px;
          opacity: 0.9;
        }

        .tracking-total__amount {
          display: block;
          font-size: 36px;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .tracking-section {
            padding: 80px 0;
          }

          .tracking-search-box {
            padding: 40px 20px;
          }

          .tracking-input-group {
            flex-direction: column;
          }

          .tracking-input {
            border-radius: 15px 15px 0 0;
          }

          .tracking-btn {
            border-radius: 0 0 15px 15px;
          }

          .tracking-card__header {
            padding: 20px;
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .tracking-card__body {
            padding: 20px;
          }

          .tracking-info-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .tracking-product-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .tracking-product-item__price {
            text-align: left;
          }

          .tracking-total {
            padding: 30px 20px;
          }

          .tracking-total__amount {
            font-size: 28px;
          }

          .tracking-success-header__title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
