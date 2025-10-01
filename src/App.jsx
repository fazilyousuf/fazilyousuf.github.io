import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Service from "@/pages/Service";
import About from "@/pages/About"
import Experience from "@/pages/Experience";
import Education from "@/pages/Education";
import Skills from "@/pages/Skills";
import Contact from "@/pages/Contact";
import Footer from "@/pages/Footer";

function App() {

  return (
      <div>
      <Navbar />
      <main>
        <Home />
        <Service />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
