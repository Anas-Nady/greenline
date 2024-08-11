import type { Metadata } from "next";
import { Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import ToastLayout from "@/contexts/ToastLayout";
import ScrollToTop from "@/components/ScrollToTop";
import Whatsapp from "@/components/Whatsapp";
import { AuthProvider } from "@/contexts/AuthProvider";
import Header from "@/components/Navbar/Header";
import rootMetadata from "./_rootMetadata";
import Footer from "@/components/sections/Footer";

const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = rootMetadata;

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${arabicFont.className} bg-root-layout`} dir="rtl">
        <AuthProvider>
          <Header />
          <div className="min-h-[calc(100vh-135px)]">{children}</div>
          <Footer />
          <ToastLayout />
          <ScrollToTop />
          <Whatsapp />
        </AuthProvider>
      </body>
    </html>
  );
}
