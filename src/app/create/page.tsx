
import AuthorForm from "@/components/authors/AuthorForm"

export default function CreatePage() {
  return (
    <main className="flex flex-col items-center justify-center p-24">

      <h1 className="text-3xl font-bold mb-6"> Create author </h1>

      <AuthorForm />

    </main>
  )
}