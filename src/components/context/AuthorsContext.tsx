"use client";

import { Author } from "@/types/Author"
import { createContext, useContext, useState, useEffect } from "react";

type AuthorsContextType = {
  authors: Author[]
  setAuthors: (value: Author[] | ((prev: Author[]) => Author[])) => void
}


const AuthorsContext = createContext< AuthorsContextType | undefined>(undefined);

export function AuthorsProvider ( { children }: { children: React.ReactNode}) {

    const[authors, setAuthors] = useState<Author[]>([])

    // Aqui cargamos los autores iniciales desde la API
    useEffect(() => {

        const fetchAuthors = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/authors")
                const data = await response.json()
                console.log(`Se cargaron ${data.length} autores`)
                setAuthors(data)   
            } catch (error) {
                console.error("Error fetching authors:", error)
            }
        }

        fetchAuthors()
    }, [])
    
    //Agregar Autor 





    //Eliminar Autor 



    
    
    //Modificar Autor



    return (
        <AuthorsContext.Provider value={{ authors, setAuthors }}>
            {children}
        </AuthorsContext.Provider>
    )
}

export function useAuthors() {
    const context = useContext(AuthorsContext)
    if (!context){
        throw new Error("useAuthors debe usarse dentro de AuthorsProvider")
    }

    return context;
}

