"use client"

import { useAuthors } from "@/components/context/AuthorsContext"
import AuthorCard from "./AuthorCard"
import { useState } from "react";


export default function AuthorsList() {

    const { authors } = useAuthors()
    const [searchTerm, setSearchTerm] = useState("");

    const normalizedSearch = searchTerm.toLowerCase()
    

    return (
            <div className="space-y-6">
                <input
                    type="text"
                    placeholder="Search author by name..."
                    value={searchTerm}  
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {authors.filter(author => author.name.toLowerCase().includes(normalizedSearch)).map((author) => (
                            <AuthorCard key={author.id} author={author} />
                        ))}
                </div>

                {authors.filter(author => author.name.toLowerCase().includes(normalizedSearch)).length === 0 && (
                    <p className="text-gray-500">
                        No se encontraron coincidencias.
                    </p>
                )}

            </div>
            
    )

}