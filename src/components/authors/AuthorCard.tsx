import { Author } from "@/types/Author"
import { useAuthors } from "../context/AuthorsContext"

import Link from "next/link"

interface Props {
  author: Author
}

export default function AuthorCard({ author }: Props) {

  const { deleteAuthor } = useAuthors()
  
  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg p-4 flex flex-col text-center h-full">
        <img src={author.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt={`Foto de ${author.name}`} className="w-30 h-30 mx-auto rounded-full mb-4 object-cover bg-gray-200 text-black text-sm"/>
        <h2 className="text-xl font-semibold text-black">{author.name}</h2>
        <p className="text-black">{author.description}</p>
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Link href={`/edit/${author.id}`} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition">
            Edit
          </Link>
          <button onClick={() => deleteAuthor(author.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition">
            Delete
          </button>
        </div>
    </div>
  )
}