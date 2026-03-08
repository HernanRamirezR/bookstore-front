"use client"

import { useState } from "react"

import { useAuthors } from "@/components/context/AuthorsContext"
import { Author } from "@/types/Author"
import { useRouter } from "next/navigation"


type Props = {initialData?: Author}
type Form = {name: string; birthDate: string; description: string; image: string };
type Errors = {name?: string; birthDate?: string; description?: string; image?: string };

export default function AuthorForm({ initialData }: Props) {

  const { editAuthor, addAuthor } = useAuthors()
  const router = useRouter()


  const [form, setForm] = useState<Form>({
    name: initialData?.name || "", 
    birthDate: initialData?.birthDate ? new Date(initialData?.birthDate).toISOString().split("T")[0] : "", 
    description: initialData?.description ||"", 
    image: initialData?.image ||"" });
  
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<{name?: boolean; birthDate?: boolean; description?: boolean; image?:boolean }>({});
  


  //Cuando se detecta un cambio en un campo se actualiza
  function handleChange(e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement> ){
    const { name, value } = e.target;
    setForm((prev) => ({...prev, [name]: value}))
  }

  //Lógica de envío
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newAuthor: Author = {
      id: initialData ? initialData.id : Date.now(),
      name: form.name,
      birthDate: new Date(form.birthDate),
      description: form.description,
      image: form.image
    }

    if (initialData) {
      editAuthor(newAuthor)
      alert(`Author "${form.name}", edited successfully`);
    } else {
      addAuthor(newAuthor)
      alert(`Author "${form.name}", created successfully`);
    }


    setForm({
      name: "",
      birthDate: "",
      description: "",
      image: ""
    })

    router.push("/authors")
  }

  //Validaciones

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>){
    const { name, value} = e.target;
    setTouched((t) => ({...t, [name]:true}));
    const msg = validateField(name as "name" | "birthDate" | "description" | "image", value);
    setErrors((prev) => ({...prev, [name]:msg}))
  }

  function validateField(name: "name" | "birthDate" | "description" | "image", value: string): string | undefined {
    //Validar name
    if (name == "name"){
      const nameTrim = value.trim()

      if (!nameTrim) return "You must enter a name";
      if (nameTrim.length < 2) return "Name must be at least 2 characters"
      if (nameTrim.length > 80) return "Name must be less than 80 characters"
      // solo letras, espacios, puntos y guiones
      const nameRegex = /^[a-zA-ZÀ-ÿ\s.'-]+$/
      if (!nameRegex.test(nameTrim)) return "Name contains invalid characters"
      }

    //Validar birthDate
    if (name == "birthDate"){
      if (!value.trim()) return "You must enter a birthDate";
      const date = new Date(value)
      const today = new Date()

      if (date > today) return "Birth date cannot be in the future"

      const youngestAllowed = new Date()
      youngestAllowed.setFullYear(today.getFullYear() - 4)

      if (date > youngestAllowed) return "Birth date seems unrealistic"
    } 

    //Validar description
    if (name == "description"){
      const descriptionTrim = value.trim()
      if (descriptionTrim.length > 500) return "Description must be less than 500 characters";
    }

    //Validar image
    if (name === "image") {
      const imageTrim = value.trim()

      if (!imageTrim) return undefined

      try {
        new URL(imageTrim)
      } catch {
        return "Image must be a valid URL"
      }

      // const imageRegex = /\.(jpg|jpeg|png|webp|gif)$/i
      // if (!imageRegex.test(imageTrim)) {
      //   return "URL must point to an image (.jpg, .png, .webp...)"
      // }
    }
    
    return undefined
  }

  function validateAll(values: Form): Errors{
    const e: Errors ={};
    const nameMsg = validateField("name", values.name);
    const birthDateMsg = validateField("birthDate", values.birthDate);
    const descriptionMsg = validateField("description", values.description);
    const imageMsg = validateField("image", values.image);
    if (nameMsg) e.name = nameMsg;
    if (birthDateMsg) e.birthDate = birthDateMsg;
    if (descriptionMsg) e.description = descriptionMsg;
    if (imageMsg) e.image = imageMsg;
    return e;
  }


  const isValid = Object.keys(validateAll(form)).length === 0;

  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-gray-800 p-10 rounded-lg shadow-md space-y-4">

      
      <div className="w-full space-y-2">
        <label htmlFor="name" className="block text-sm font-medium"> Name </label>
        <input
          id ="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!(touched.name && errors.name)}
          aria-describedby={touched.name && errors.name ? "name-error" : undefined}
          placeholder="Enter the author's name"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500"
        />
        {touched.name && errors.name && (
          <p id="name-error" role="alert" className="text-sm text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="birthDate" className="block text-sm font-medium"> Birthdate </label>
        <input
          id ="birthDate"
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!(touched.birthDate && errors.birthDate)}
          aria-describedby={touched.birthDate && errors.birthDate ? "birthdate-error" : undefined}
          placeholder="Enter the author's birthdate"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500"
        />
        {touched.birthDate && errors.birthDate && (
          <p id="birthdate-error" role="alert" className="text-sm text-red-400">
            {errors.birthDate}
          </p>
        )}
      </div>


      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium"> Description </label>
        <textarea
          id ="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!(touched.description && errors.description)}
          aria-describedby={touched.description && errors.description ? "description-error" : undefined}
          placeholder="Enter the author's description"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500"
        />
        {touched.description && errors.description && (
          <p id="description-error" role="alert" className="text-sm text-red-400">
            {errors.description}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="block text-sm font-medium"> Image URL </label>
        <input
          id ="image"
          name="image"
          type="text"
          value={form.image}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!(touched.image && errors.image)}
          aria-describedby={touched.image && errors.image ? "image-error" : undefined}
          placeholder="Enter the author's image"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500"
        />
        {touched.image && errors.image && (
          <p id="image-error" role="alert" className="text-sm text-red-400">
            {errors.image}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Save Author
      </button>

    </form>
  )


}