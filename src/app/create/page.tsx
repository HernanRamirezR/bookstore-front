
import AuthorForm from "@/components/authors/AuthorForm"

export default function CreatePage() {
  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Crear autor
      </h1>

      <AuthorForm />

    </div>
  )
}