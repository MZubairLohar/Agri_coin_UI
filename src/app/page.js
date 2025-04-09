import Navbar from "@/components/navbar";
import Herosection from "@/components/HeroSection";
import Aboutus from "@/components/Aboutus";
import Projects from "@/components/projects";
import Joinus from "@/components/Joinus"; 
import Whatsnew from "@/components/whatsnew";
import Connected from "@/components/stayconnected";
import Footer from "@/components/footer";

export default function Home() {
  return (
   <>
    {/* <Navbar /> */}
    <Herosection />
    <Aboutus />
    <Projects />
    <Joinus />
    <Whatsnew />
    <Connected />
    <Footer />
   </>
  );
}
