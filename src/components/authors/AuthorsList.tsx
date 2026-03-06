"use client"

import { useEffect, useState } from "react"

export default function AuthorsList() {

    const [authors, setAuthors] = useState([])

    useEffect(() => {

    fetch("http://localhost:8080/api/authors")
        .then(res => res.json())
        .then(data => setAuthors(data))

    }, [])

    return (
        <div>
            <p>Autores cargados: {authors.length}</p>
        </div>
    )

}