import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import "./prism.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "DeepSeek - Krishal",
  description: "DeepSeek Clone - FullStack Project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html
          lang="en"
          className={`${inter.className} ${roboto.className} h-full antialiased`}
        >
          <body className="min-h-full flex flex-col">

            <Toaster toastOptions={
              {
                success: { style: { background: "black", color: "white" } },
                error: { style: { background: "black", color: "white" } },
              }
            } />

            {children}

          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}