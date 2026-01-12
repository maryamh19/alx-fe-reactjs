import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2.5 bg-[#077d92e0] text-white">
      <div className="flex gap-5">
        <Link to="/" className="text-white">Home</Link>
        <Link to="/about" className="text-white">About</Link>
        <Link to="/services" className="text-white">Services</Link>
        <Link to="/contact" className="text-white">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
