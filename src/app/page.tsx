import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center p-24">
      <h1 className="text-5xl font-bold mb-6">
        Welcome to the Bookstore 📚
      </h1>

      <p className="text-lg text-gray-600 max-w-xl">
        Manage your favorite authors in one place.  
        Here you can: browse authors, create new ones, or edit existing entries.
      </p>
      <p className="text-lg text-gray-600 max-w-xl space-y-4">
        Made by: Hernán Ramírez - 202124034
      </p>
    </main>
  );
}
