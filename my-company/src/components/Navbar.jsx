import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2.5 bg-[#077d92e0] text-white">
      <Link to="/" className="mx-2.5 text-white">Home</Link>
      <Link to="/about" className="mx-2.5 text-white">About</Link>
      <Link to="/services" className="mx-2.5 text-white">Services</Link>
      <Link to="/contact" className="mx-2.5 text-white">Contact</Link>
    </nav>
  );
}

export default Navbar;
