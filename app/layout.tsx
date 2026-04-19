import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider"
import { Metadata } from "next"
import {
  Inter,
  JetBrains_Mono,
  Manrope,
  Roboto_Mono,
  Space_Grotesk,
} from "next/font/google"
import localFont from "next/font/local"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-secondary",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-tertiary",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const robotoMono = Roboto_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
})

const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
})

const clashDisplay = localFont({
  src: "../public/fonts/ClashDisplay-Variable.ttf",
  variable: "--font-clash-display",
  weight: "200 700",
  display: "swap",
})


export const metadata: Metadata = {
  title: "XoroPay",
  description: "Seamless Payments, Zero Downtime.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${robotoMono.variable} ${manrope.variable} ${satoshi.variable} ${clashDisplay.variable} antialiased`}
      >
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
