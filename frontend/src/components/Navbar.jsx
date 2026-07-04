import { Link } from "react-router-dom";
import { BookOpen, Bookmark } from "lucide-react";

function Navbar() {
    return (

        <nav className="bg-white shadow">

            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-bold text-blue-700"
                >
                    <BookOpen />
                    AI Research
                </Link>

                <Link
                    to="/saved"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                    <Bookmark size={20}/>
                    Saved Papers
                </Link>

            </div>

        </nav>

    );
}

export default Navbar;