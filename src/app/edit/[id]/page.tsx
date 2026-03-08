"use client"

import { useParams } from "next/navigation"
import { useAuthors } from "@/components/context/AuthorsContext"
import AuthorForm from "@/components/authors/AuthorForm"

export default function EditAuthorPage() {

  const { id } = useParams()
  const { authors } = useAuthors()

  const author = authors.find((a) => a.id === Number(id))

  if (!author) return <p>Author not found</p>

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-6"> Edit author </h1>
      <AuthorForm initialData={author}/>
    </main>
  )
}