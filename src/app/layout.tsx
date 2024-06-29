import type { Metadata } from "next";
import { Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import ToastLayout from "@/contexts/ToastLayout";
import ScrollToTop from "@/components/ScrollToTop";
import Whatsapp from "@/components/Whatsapp";
import { AuthProvider } from "@/contexts/AuthProvider";
import Header from "@/components/Navbar/Header";
import icon from "@/assets/imgs/icon.svg";
import { ABOUT_US_DESCRIPTIONS, GREEN_LINE } from "@/constants/arabic";
import Footer from "@/components/sections/Footer";

const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: GREEN_LINE,
    template: `%s | ${GREEN_LINE}`,
  },
  authors: [{ name: `${GREEN_LINE}` }],
  creator: "Anas Abdallah Nady",
  applicationName: GREEN_LINE,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  metadataBase: new URL(`${process.env.CLIENT_URL}`),

  description: ABOUT_US_DESCRIPTIONS.DESCRIPTION_ONE,
  icons: {
    icon,
    apple: icon,
  },
};

export const fetchCache = "default-no-store";

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
          <main className="min-h-[calc(100vh-135px)]">{children}</main>
          <Footer />
          <ToastLayout />
          <ScrollToTop />
          <Whatsapp />
        </AuthProvider>
      </body>
    </html>
  );
}
