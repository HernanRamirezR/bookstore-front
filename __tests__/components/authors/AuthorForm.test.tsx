
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AuthorForm from "@/components/authors/AuthorForm"


jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

jest.mock("@/components/context/AuthorsContext", () => ({
  useAuthors: () => ({
    authors: [],
    addAuthor: jest.fn(),
    editAuthor: jest.fn(),
    deleteAuthor: jest.fn(),
  }),
}))

const setup = () => {
    const user = userEvent.setup();
    render(<AuthorForm />)

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const birthDateInput = screen.getByLabelText(/birthDate/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/description/i) as HTMLTextAreaElement;
    const imageInput = screen.getByLabelText(/image/i) as HTMLInputElement;
    const saveButton = screen.getByRole("button", {name: /save/i});

    return { user, nameInput, birthDateInput, descriptionInput, imageInput, saveButton};

}

describe("AuthorForm component", () => {
    describe("AuthorForm render", () => {
      // Prueba de Renderizado Inicial
        test("render de campos y ayuda; boton deshabilitado al inicio", ()=>{
            const {saveButton} = setup();
            expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/birthDate/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
            expect(saveButton).toBeDisabled();
        })
    })
    //Prueba de Uso Incorrecto y Validación
    describe("interaccion en AuthorForm", () => {
        test("blur en vacío o con otras restricciones muestra errores de campos", async ()=>{
            const {user, nameInput, birthDateInput, descriptionInput, imageInput, saveButton} = setup();

            //Error del input en nombre
            await user.click(nameInput);
            await user.tab();

            expect(await screen.findByText(/You must enter a name/i)).toBeInTheDocument();
            expect(nameInput).toHaveAttribute("aria-invalid", "true");
            expect(nameInput).toHaveAttribute("aria-describedby", "name-error");

            //Error del input en fecha de nacimiento
            await user.click(birthDateInput);
            await user.tab();

            expect(await screen.findByText(/You must enter a birthDate/i)).toBeInTheDocument();
            expect(birthDateInput).toHaveAttribute("aria-invalid", "true");
            expect(birthDateInput).toHaveAttribute("aria-describedby", "birthDate-error");

            //Error del input en descripcion
            await user.click(descriptionInput);
            await user.type(descriptionInput, "a".repeat(501))
            await user.tab()

            expect(await screen.findByText(/Description must be less than 500 characters/i)).toBeInTheDocument();
            expect(descriptionInput).toHaveAttribute("aria-invalid", "true");
            expect(descriptionInput).toHaveAttribute("aria-describedby", "description-error");

            //Error del input en link imagen 
            await user.click(imageInput);
            await user.type(imageInput, "abc")
            await user.tab()

            expect(await screen.findByText(/Image must be a valid URL/i)).toBeInTheDocument();
            expect(imageInput).toHaveAttribute("aria-invalid", "true");
            expect(imageInput).toHaveAttribute("aria-describedby", "image-error");

            //Button sigue invalid
            expect(saveButton).toBeDisabled();
            
        
        }, 100000000)

        test("FLujo de uso ", async ()=>{
            const {user, nameInput, birthDateInput, descriptionInput, imageInput, saveButton} = setup();

            //Buen uso del input en nombre
            await user.click(nameInput);
            await user.type(nameInput, "Hernán Ramírez")
            await user.tab();

            expect(nameInput).toHaveAttribute("aria-invalid", "false");

            //Error del input en fecha de nacimiento
            await user.click(birthDateInput);
            await user.type(birthDateInput, "2003-12-10")
            await user.tab();

            expect(birthDateInput).toHaveAttribute("aria-invalid", "false");

            //Error del input en descripcion
            await user.click(descriptionInput);
            await user.type(descriptionInput, "Un gran escritor de ciencia ficcion")
            await user.tab()

            expect(descriptionInput).toHaveAttribute("aria-invalid", "false");

            //Error del input en link imagen 
            await user.click(imageInput);
            await user.type(imageInput, "https://imag.bonviveur.com/empanadas-colombianas.jpg")
            await user.tab()

            expect(imageInput).toHaveAttribute("aria-invalid", "false");

            //Button sigue invalid
            expect(saveButton).toBeEnabled();
            
        
        }, 100000000)

    })



})