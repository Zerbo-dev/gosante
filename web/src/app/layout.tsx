import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "GoSanté — Plateforme de santé",
  description: "Santé mentale, carnet médical et pharmacie au Burkina Faso",
  icons: {
    icon: [{ url: "/logo-gosante.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo-gosante.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
