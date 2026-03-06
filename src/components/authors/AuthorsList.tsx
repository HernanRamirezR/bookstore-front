"use client"
import { Author } from "@/types/Author"

import { useEffect, useState } from "react"
import AuthorCard from "./AuthorCard"

export default function AuthorsList() {

    const [authors, setAuthors] = useState<Author[]>([])

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



    return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {authors.map( (author) => (
                <AuthorCard key={author.id} author={author} />
                ))}
            </div>
        
    )

}