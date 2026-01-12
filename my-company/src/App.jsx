
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Contact from './Components/Contact.jsx'
import About from './Components/About.jsx'
import Home from './Components/Home.jsx'
import Services from './Components/Services.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx';

function App() {
 

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
