import "./globals.css";
import type { Metadata } from "next";
import BackgroundContainer from "@/components/ui/BackgroundContainer";
import Header from "@/components/ui/Header";
import { ResultContextProvider } from "@/context/ResultContext";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ResultContextProvider>
          <Header />
          {children}
          <div id="modal"></div>
        </ResultContextProvider>
      </body>
    </html>
  );
}
