"use client"

import { useState } from "react"

export default function AuthorForm() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newAuthor = {
      name,
      description,
      image
    }

    try {

      const response = await fetch("http://localhost:8080/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newAuthor)
      })

      if (!response.ok) {
        throw new Error("Error creating author")
      }

      console.log("Autor creado correctamente")

      // limpiar formulario
      setName("")
      setDescription("")
      setImage("")

    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >

      <h2 className="text-xl font-semibold text-black">
        Crear nuevo autor
      </h2>

      <input
        type="text"
        placeholder="Nombre del autor"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded text-black"
        required
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded text-black"
        required
      />

      <input
        type="text"
        placeholder="URL de la imagen"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border p-2 rounded text-black"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Crear autor
      </button>

    </form>
  )
}