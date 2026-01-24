import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/components/navbar.css";
import Navbar from "@/components/navbar/navbar";
import { Suspense } from "react";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import FloatingCartButton from "@/components/FloatingCartButton";
import { CartProvider } from "@/context/CartContext";
import "@/lib/monolite-config";
import { ENABLE_SHOPPING } from "@/app/finalizar-compra/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oceano scuba - Dive center in Taganga",
  description: "Oceano scuba - Dive center in Taganga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Meta tag para permitir imágenes desde el servidor de almacenamiento */}
        <meta httpEquiv="Content-Security-Policy" content="img-src 'self' data: http://154.38.181.22:9000 https://gateway.makerstech.co https://s3.makerstech.co https: http: blob:;" />
        {/* Bootstrap Icons CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

        {/* Aquí enlazas los CSS del template */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/fontawesome-all.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/css/hover-min.css" />
        <link rel="stylesheet" href="/css/jquery.mCustomScrollbar.min.css" />
        <link rel="stylesheet" href="/css/bootstrap-select.min.css" />
        <link rel="stylesheet" href="/css/bootstrap-datepicker.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/scubo-icons.css" />
        <link rel="stylesheet" href="/css/rtl.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Suspense>
            <Navbar />
          </Suspense>
          {children}
          <Footer />
          {!ENABLE_SHOPPING && <FloatingCartButton />}
          <FloatingWhatsAppButton />
        </CartProvider>
        
        {/* Scripts */}
        <Script src="/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap-datepicker.min.js" strategy="lazyOnload" />
        <Script src="/js/bootstrap-select.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery.ajaxchimp.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery.counterup.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery.magnific-popup.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery.mCustomScrollbar.concat.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery.validate.min.js" strategy="lazyOnload" />
        <Script src="/js/owl.carousel.min.js" strategy="lazyOnload" />
        <Script src="/js/isotope.js" strategy="lazyOnload" />
        <Script src="/js/waypoints.min.js" strategy="lazyOnload" />
        <Script src="/js/wow.min.js" strategy="lazyOnload" />
        <Script src="/js/TweenMax.min.js" strategy="lazyOnload" />
        <Script src="/js/theme.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
