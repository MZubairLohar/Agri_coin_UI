"use client";

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
              px-8 py-2 rounded-full 
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
              px-8 py-2 rounded-full 
              border border-amber-50
              flex items-center gap-2 
              bg-[#6F9D7E]
              text-white
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
    bg-white bg-cover bg-center bg-no-repeat"
>

  <div className="z-10 pt-8 flex flex-col items-center w-full lg:w-full space-y-4 md:space-y-6">
    <h1 className="text-xl sm:text-2xl md:text-5xl font-bold text-black w-2/4">
      Save More of Nature's Treasures
    </h1>

    <h2 className="text-sm sm:text-base md:text-lg font-normal text-[#6F9D7E] w-2/4 -mt-2 md:-mt-4">
      The food we eat, the water we drink, the air we breathe – it all comes from nature
    </h2>

    <div className="flex flex-wrap gap-3 justify-center mt-6 md:-mt-4">
      <ButtonWrapper />
      <ButtonWrapper1 />
    </div>

    {/* Image Collage Section */}
    <div className="flex justify-center gap-4 mt-4 md:mt-6 lg:mt-0 lg:gap-4">
      {/* Left Vertical Images */}
      <div
        ref={divleft}
        className="flex flex-col space-y-4 sm:-mt-60 -mt-68"
      >
        <img className="w-32 h-20 sm:w-28 sm:h-28 md:w-48 md:h-56 rounded-2xl" src="/pic1.png" />
        <img className="w-32 h-20 sm:w-28 sm:h-28 md:w-48 md:h-56 rounded-2xl" src="/farm-pic.jpg" />
      </div>

      {/* Center Images */}
      <div className="flex gap-4">
      <img
        ref={divlef}
        className="w-20 h-20 sm:w-28 sm:h-28 md:w-48 md:h-56 rounded-2xl"
        src="/leaf-pic.jpg"
      />
      <img
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-40 mt-4 sm:mt-8 md:mt-16 rounded-2xl"
        src="/farm-pic4.jpg"
      />
      <img
        ref={divrigh}
        className="w-20 h-20 sm:w-28 sm:h-28 md:w-48 md:h-56 rounded-2xl"
        src="/water-field.jpg"
      />
      </div>

      {/* Right Vertical Images */}
      <div
        ref={divright}
        className="flex flex-col space-y-4 sm:-mt-60 -mt-68"
      >
        <img className="w-32 h-20 sm:w-28 sm:h-28 md:w-48 md:h-56 rounded-2xl" src="/farming-pic.jpg" />
        <img className="w-32 h-20 sm:w-28 sm:h-28 md:w-48 md:h-56 rounded-2xl" src="/wheat-pic.jpg" />
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Herosection;