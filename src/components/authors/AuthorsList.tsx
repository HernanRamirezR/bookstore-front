"use client"
import { Author } from "@/types/Author"

import { useEffect, useState } from "react"
import AuthorCard from "./AuthorCard"

export default function AuthorsList() {

    const [authors, setAuthors] = useState<Author[]>([])

    useEffect(() => {

    fetch("http://localhost:8080/api/authors")
        .then(res => res.json())
        .then(data => setAuthors(data))

    }, [])

    return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {authors.map( (author) => (
                <AuthorCard key={author.id} author={author} />
                ))}
            </div>
        
    )

}