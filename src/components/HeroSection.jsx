"use client";
import Navbar from "./navbar";
import Image from "next/image";
import { useEffect,useRef } from "react";

function Herosection () {

  const divleft = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideInLeft");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (divleft.current) {
      observer.observe(divleft.current);
    }

    return () => {
      if (divleft.current) {
        observer.unobserve(divleft.current);
      }
    };
  }, []);

  const divlef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideInLeft");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (divlef.current) {
      observer.observe(divlef.current);
    }

    return () => {
      if (divlef.current) {
        observer.unobserve(divlef.current);
      }
    };
  }, []);

  const divdown = useRef(null);
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slideInUp");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  if (divdown.current) {
    observer.observe(divdown.current);
  }

  return () => {
    if (divdown.current) {
      observer.unobserve(divdown.current);
    }
  };
}, []);


  const divright = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideInRight");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (divright.current) {
      observer.observe(divright.current);
    }

    return () => {
      if (divright.current) {
        observer.unobserve(divright.current);
      }
    };
  }, []);

  const divrigh = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideInRight");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (divrigh.current) {
      observer.observe(divrigh.current);
    }

    return () => {
      if (divrigh.current) {
        observer.unobserve(divrigh.current);
      }
    };
  }, []);

    const ButtonWrapper = () => {
        return (
          <div className="flex items-center justify-center">
            <NeumorphismButton />
          </div>
        );
      };
      
      const NeumorphismButton = () => {
        return (
          <button
            className="
              px-2 sm:px-8 py-2 rounded-full 
              border border-[#6F9D7E]
              flex items-center gap-2 
              text-[#6F9D7E] bg-white
              transition-all
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
            "
          >
            <span>Join Us</span>
          </button>
        );
      };
      
      const ButtonWrapper1 = () => {
        return (
          <div className="flex items-center justify-center">
            <NeumorphismButton1 />
          </div>
        );
      };
      
      const NeumorphismButton1 = () => {
        return (
          <button
            className="
              px-2 sm:px-8 py-2 rounded-full 
              border border-amber-50
              flex items-center gap-2 
              bg-[#6F9D7E]
              text-[#FFE990]
              transition-all
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
              hover:text-white
            "
          >
            <span>Donate</span>
          </button>
        );
      };

    return(
        <>
        

<div
  className="relative min-h-screen flex flex-col items-center text-center px-4 md:px-10 lg:px-20 
    bg-white bg-cover bg-center bg-no-repeat z-10 pt-4"
>
  <Navbar />

  {/* Background image */}
  <Image
    src="/wheat-bg-pic.jpg"
    alt="background wheat"
    fill
    className="object-cover opacity-30 z-0"
    priority
  />

  <div className="z-10 pt-8 flex flex-col items-center w-full lg:w-full space-y-4 md:space-y-6 mt-4">
    <h1 className="text-xl sm:text-2xl md:text-5xl font-bold text-black w-2/4">
      Save More of Nature's Treasures
    </h1>

    <h2 className="text-sm sm:text-base md:text-lg font-normal text-[#6F9D7E] w-2/4 -mt-2 md:-mt-4">
      The food we eat, the water we drink, the air we breathe – it all comes from nature
    </h2>

    <div className="flex flex-wrap sm:gap-3 gap-1 justify-center mt-6 md:-mt-4">
      <button className="btn btn-accent sm:px-6 sm:py-2 rounded-lg bg-white text-[#6F9D7E]">Join Us</button>
      <button className="btn btn-accent sm:px-6 sm:py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Donate</button>
    </div>

    <div className="flex justify-center mt-20 gap-10 sm:mt-10 md:-mt-10 xl:gap-14">
      {/* Left Column */}
      <div 
      ref={divleft}
      className="flex flex-col space-y-4 -ml-3 sm:-ml-0 md:-mt-68 lg:-mt-60 -mt-68">
        <Image src="/pic1.png" alt="pic1" width={192} height={160} className="w-32 h-20 sm:w-32 sm:h-28 md:w-48 md:h-40 lg:h-56 object-cover rounded-2xl" />
        <Image src="/farm-pic.jpg" alt="farm pic" width={192} height={160} className="w-32 h-20 sm:w-32 sm:h-28 md:w-48 md:h-40 lg:h-56 object-cover rounded-2xl" />
      </div>

      {/* Middle Column */}
      <div className="flex gap-6 sm:gap-6 -mt-10 sm:-mt-0 lg:mt-8 xl:mt-0 -ml-24 sm:-ml-12 md:-ml-6 xl:-ml-0 xl:gap-10">
        <Image
        ref={divlef}
        src="/leaf-pic.jpg" alt="leaf" width={128} height={128} className="w-20 h-20 object-cover md:mt-8 lg:mt-0 sm:w-32 sm:h-32 md:w-32 md:h-40 lg:w-44 lg:h-40 xl:w-48 xl:h-56 rounded-2xl" />
        <Image
        ref={divdown}
        src="/farm-pic4.jpg" alt="farm 4" width={128} height={128} className="w-20 h-20 object-cover sm:w-32 sm:h-32 md:w-32 md:h-40 lg:w-44 lg:h-40 xl:w-48 xl:h-48 mt-4 sm:mt-8 md:mt-8 rounded-2xl" />
        <Image
        ref={divrigh}
        src="/water-field.jpg" alt="water field" width={128} height={128} className="w-20 h-20 object-cover md:mt-8 lg:mt-0 sm:w-32 sm:h-32 md:w-32 md:h-40 lg:w-44 lg:h-40 xl:w-48 xl:h-56 rounded-2xl" />
      </div>

      {/* Right Column */}
      <div
      ref={divright}
      className="flex flex-col space-y-4 ml-16 sm:ml-0 md:-mt-68 lg:-mt-60 md:ml-36 lg:ml-44 xl:ml-0 -mt-68">
        <Image src="/farming-pic.jpg" alt="farming" width={192} height={160} className="w-32 h-20 sm:w-32 sm:h-28 md:w-48 md:h-40 lg:h-56 object-cover rounded-2xl" />
        <Image src="/wheat-pic.jpg" alt="wheat" width={192} height={160} className="w-32 h-20 object-cover sm:w-32 sm:h-28 md:w-48 md:h-40 lg:h-56 rounded-2xl" />
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Herosection;
