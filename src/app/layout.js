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
  title: "Sell-Pixers",
  description: "E-commerce Web Site ",
   icons: {
    icon: "/images/sell.jpg",
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
