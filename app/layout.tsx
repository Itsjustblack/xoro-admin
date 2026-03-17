import {
  Inter,
  JetBrains_Mono,
  Roboto_Mono,
  Space_Grotesk,
} from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-secondary",
  subsets: ["latin"],
});

const spaceMono = JetBrains_Mono({
  variable: "--font-tertiary",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
