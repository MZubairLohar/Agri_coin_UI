"use client";

import { useEffect,useRef } from "react";

function Whatsnew() {

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

  const ButtonWrapper = () => {
    return (
      <div>
        <NeumorphismButton />
      </div>
    );
  };
  
  const NeumorphismButton = () => {
    return (
      <button
        className={`
          px-8 py-2 rounded-full 
          flex items-center gap-2 
          text-gray-600
          bg-[#F3F4F6]
        
          
          transition-all
  
          hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
          hover:text-gray-600
      `}
      >
        <span>Read More</span>
      </button>
       );
    };

  return (
    <div className="relative flex flex-col items-center mt-20 text-center px-4 md:px-10 lg:px-20 w-full">
  <div className="z-10 flex flex-col items-center w-full max-w-2xl space-y-4 md:space-y-6">
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
      What's New
    </h1>
  </div>

  <div className="flex flex-col lg:flex-row gap-6 mt-10 w-full max-w-7xl">
    {/* Left Big Card */}
    <div className="w-full lg:w-3/5">
      <div
        ref={divleft}
        className="card bg-white text-black border border-gray-300 shadow-lg h-auto lg:h-[28rem]"
      >
        <figure className="h-60 sm:h-72 lg:h-80 overflow-hidden">
          <img
            src="beans-pic.jpg"
            alt="Main"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body p-5">
          <h2 className="card-title text-start text-md sm:text-lg font-semibold">
            Why are Forests so important for Earth?
          </h2>
          <div className="card-actions justify-between mt-4">
            <p className="text-start text-sm">31/06/2023</p>
            <ButtonWrapper />
          </div>
        </div>
      </div>
    </div>

    {/* Right Column with 3 Small Side Cards */}
    <div
      ref={divright}
      className="flex flex-col justify-between w-full lg:w-1/2 space-y-4"
    >
      {[
        {
          img: 'pic2.png',
          title: 'Getting kids outside: one of the best things',
          date: '26/06/2023',
        },
        {
          img: 'mountain-pic.jpg',
          title: 'Understanding people is key to protecting nature',
          date: '24/06/2023',
        },
        {
          img: 'turtles-pic.jpg',
          title: 'Protecting sea turtles across the pacific',
          date: '18/06/2023',
        },
      ].map((card, idx) => (
        <div
          key={idx}
          className="card flex-col sm:flex-row card-side bg-white border border-gray-300 text-black shadow-md h-auto lg:h-[8.7rem]"
        >
          <figure className="w-full sm:w-2/5 h-48 sm:h-full">
            <img
              src={card.img}
              alt="Thumb"
              className="object-cover w-full h-full"
            />
          </figure>
          <div className="card-body w-full sm:w-2/3">
            <h2 className="card-title text-start text-sm sm:text-md font-bold leading-snug">
              {card.title}
            </h2>
            <div className="card-actions mt-auto text-xs justify-between items-center">
              <p className="text-start">{card.date}</p>
              <ButtonWrapper />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default Whatsnew;
