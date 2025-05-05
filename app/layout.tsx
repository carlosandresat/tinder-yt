import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Chakra_Petch } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/footer";

const inter = Chakra_Petch({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "TinderYT",
  description: "Encuentra o sé encontrado por alguien a tu medida 😎",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased relative",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
          <div className="absolute bottom-0 w-full">
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
