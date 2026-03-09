import { render, screen } from "@testing-library/react"
import Header from "@/components/Header"

describe("Header component", () => {

    describe("rendering", () => { 

        test("renders the application title", () => {
            render(<Header />)

            const title = screen.getByText(/bookstore/i)

            expect(title).toBeInTheDocument()
        })
    })

    describe("navigation", () => {

        test("logo links to home page", () => {
        render(<Header />)

        const logoLink = screen.getByRole("link", { name: /bookstore/i })

        expect(logoLink).toHaveAttribute("href", "/")
        })

        test("links to home", () => {
        render(<Header />)

        const homeLink = screen.getByRole("link", { name: /home/i })

        expect(homeLink).toHaveAttribute("href", "/")
        })

        test("links to create author", () => {
        render(<Header />)

        const createLink = screen.getByRole("link", { name: /create/i })

        expect(createLink).toHaveAttribute("href", "/create")
        })

    })

  

})