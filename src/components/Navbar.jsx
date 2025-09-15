import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="mb-6 flex justify-center space-x-4 p-4 rounded shadow-md">
    <Link to="/" className="text-black-600 hover:underline">
      Feedback Form
    </Link>
    <Link to="/dashboard" className="text-black-600 hover:underline">
      Dashboard
    </Link>
  </nav>
);

export default Navbar;
