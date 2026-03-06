
import Link from "next/link";
const Header = () =>{
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-x1 font-bold"> Bookstore </h1>
                <nav>
                    <Link href="/" className="px-3 hover:text-gray-300"> Inicio  </Link>
                    <Link href="/authors" className="px-3 hover:text-gray-300"> Autores  </Link>
                    <Link href="/create" className="px-3 hover:text-gray-300"> Crear  </Link>
                </nav>
            </div>
        </header>
    );
};
export default Header;