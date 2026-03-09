
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AuthorForm from "@/components/authors/AuthorForm"
import { AuthorsProvider } from "@/components/context/AuthorsContext";

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
        test("render de campos y ayuda; boton deshabilitado al inicio", ()=>{
            const {saveButton} = setup();
            expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/birthDate/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
            expect(saveButton).toBeDisabled();
        })
    })

    describe("interaccion en AuthorForm", () => {
        test("blur en vacío muestra errores de campos", async ()=>{
            const {user, nameInput, birthDateInput} = setup();

            await user.click(nameInput);
            await user.tab();

            expect(await screen.findByText(/You must enter a name/i)).toBeInTheDocument();
            expect(nameInput).toHaveAttribute("aria-invalid", "true");
            expect(nameInput).toHaveAttribute("aria-describedby", "name-error");
            
        
        })


    })



})