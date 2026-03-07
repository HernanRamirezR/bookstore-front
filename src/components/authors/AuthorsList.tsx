"use client"
import { Author } from "@/types/Author"


import { useAuthors } from "@/components/context/AuthorsContext"
import AuthorCard from "./AuthorCard"

export default function AuthorsList() {

    const { authors } = useAuthors()
    
    return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {authors.map( (author) => (
                <AuthorCard key={author.id} author={author} />
                ))}
            </div>
        
    )

}