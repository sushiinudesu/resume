import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preview from "@/components/home/Preview";
import About from "@/components/home/About";
import Skills from "@/components/home/skills";
import Portfolio from "@/components/home/portfolio";
import Contact from "@/components/home/Contact";
import { FirebaseProvider } from "@/providers/FirebaseProvider";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Preview />
        <About />
        <FirebaseProvider>
          <Skills />
          <Portfolio />
        </FirebaseProvider>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
