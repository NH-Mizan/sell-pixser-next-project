import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Layouts/Footer";
import MainHeader from "@/components/Layouts/Header";
import Topline from "@/components/Layouts/topline";
import SocialIcons from "@/components/Layouts/SocialIcon";
import ScrollToTopButton from "@/components/Layouts/ScrollerTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Sell-Pixers | Best Online Shopping Platform",
    template: "%s | Sell-Pixers",
  },

  description:
    "Sell-Pixers is a modern e-commerce platform where you can buy quality products at the best price.",

  keywords: [
    "Sell-Pixers",
    "E-commerce",
    "Online Shopping",
    "Buy Products Online",
  ],

  authors: [{ name: "NH Mizan" }],
  creator: "NH Mizan",

  icons: {
    icon: "/images/sell.jpg",
  },

  openGraph: {
    title: "Sell-Pixers | Best Online Shopping Platform",
    description:
      "Shop smart with Sell-Pixers. Discover quality products at affordable prices.",
    url: "https://yourdomain.com",
    siteName: "Sell-Pixers",
    images: [
      {
        url: "/images/sell.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sell-Pixers",
    description:
      "Modern e-commerce platform with premium quality products.",
    images: ["/images/sell.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     
          <Topline />
          <MainHeader />
          <main>{children}</main>
           <ToastContainer />
          <Footer />
          <SocialIcons />
          <ScrollToTopButton />
       
      </body>
    </html>
  );
}
