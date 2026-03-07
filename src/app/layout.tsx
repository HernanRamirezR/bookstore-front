import "./globals.css";

import { AuthorsProvider } from "@/components/context/AuthorsContext";
import Header from "@/components/Header";

//Añadir estado, contexto y tener lista compartida de usuarios

export default function RootLayout({ children,}:
  Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body >
        <AuthorsProvider>
          <Header />
          {children}
        </AuthorsProvider>
        
      </body>
    </html>
  );
}


