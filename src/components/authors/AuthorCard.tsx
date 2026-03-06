import { Author } from "@/types/Author"

interface Props {
  author: Author
}

export default function AuthorCard({ author }: Props) {
  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg p-4 text-center">
        <img src={author.image} alt={`Foto de ${author.name}`} className="w-30 h-30 mx-auto rounded-full mb-4 object-cover bg-gray-200 text-black text-sm"/>
        <h2 className="text-xl font-semibold text-black">{author.name}</h2>
        <p className="text-black">{author.description}</p>
    </div>
  )
}