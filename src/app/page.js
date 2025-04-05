import Navbar from "@/components/navbar";
import Herosection from "@/components/HeroSection";
import Aboutus from "@/components/Aboutus";
import Projects from "@/components/projects";
import Joinus from "@/components/Joinus";

export default function Home() {
  return (
   <>
    <Navbar />
    <Herosection />
    <Aboutus />
    <Projects />
    <Joinus />
   </>
  );
}
