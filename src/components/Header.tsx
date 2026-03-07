
import Link from "next/link";
const Header = () =>{
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-x1 font-bold"> Bookstore </Link>
                <nav>
                    <Link href="/" className="px-3 hover:text-gray-300"> Home  </Link>
                    <Link href="/authors" className="px-3 hover:text-gray-300"> Authors  </Link>
                    <Link href="/create" className="px-3 hover:text-gray-300"> Create  </Link>
                </nav>
            </div>
        </header>
    );
};
export default Header;