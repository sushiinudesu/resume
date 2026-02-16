import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preview from "@/components/home/Preview";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Portfolio from "@/components/home/Portfolio";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Preview />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
