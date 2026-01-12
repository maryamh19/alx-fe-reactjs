
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Contact from './components/Contact.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Services from './components/Services.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx';

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
