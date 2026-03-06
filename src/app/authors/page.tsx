import AuthorsList from "@/components/authors/AuthorsList"

export default function AuthorsPage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4 ">Lista de Autores</h1>
      <AuthorsList />
    </main>
  )

}