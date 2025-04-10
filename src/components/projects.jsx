"use client";

import { useEffect, useRef } from "react";
import { IoMdShare } from "react-icons/io";

function Projects() {

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


  const divleft = useRef(null);
  const divright = useRef(null);

  useEffect(() => {
    const observerLeft = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideInLeft");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (divleft.current) observerLeft.observe(divleft.current);
    return () => {
      if (divleft.current) observerLeft.unobserve(divleft.current);
    };
  }, []);

  useEffect(() => {
    const observerRight = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideInRight");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (divright.current) observerRight.observe(divright.current);
    return () => {
      if (divright.current) observerRight.unobserve(divright.current);
    };
  }, []);

  const ButtonWrapper = () => (
    <div className="bg-slate-100 flex items-center justify-center">
      <NeumorphismButton />
    </div>
  );

  const NeumorphismButton = () => (
    <button
      className="px-8 py-2 rounded-full flex items-center gap-2 text-white bg-[#6F9D7E] shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)] transition-all hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)] hover:text-white"
    >
      <span>Join Us</span>
    </button>
  );

  const ButtonWrapper2 = () => (
    <div className="flex items-center mt-6 justify-center">
      <NeumorphismButton2 />
    </div>
  );

  const NeumorphismButton2 = () => (
    <button className="px-8 py-2 rounded-full border border-blue-600 flex items-center gap-2 text-blue-600 bg-white transition-all hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]">
      <span>Explore more</span>
    </button>
  );

  return (
    <div className="relative z-10 flex flex-col items-center mt-20 text-center px-4 md:px-10 lg:px-20 w-full">

  <img
    src="/corn-anim-pic.png"
    className="absolute -ml-8 sm:-ml-0 top-11/12 sm:top-11/12 md:top-5/6 xl:top-80 left-10 w-24 opacity-60 sm:w-28 md:w-28 xl:w-40 z-0 animate-spin-slow"
  />

  <div className="flex flex-col items-center w-full max-w-2xl space-y-4 md:space-y-6">
    <h1 className="text-4xl font-semibold text-black sm:text-pink-500 md:text-orange-600 lg:text-blue-800 xl:text-green-700">
      Take a look at our projects
    </h1>
  </div>

  <div className="flex flex-wrap gap-6 lg:gap-4 mt-10 justify-center items-center lg:items-stretch">
    <div
      ref={divleft}
      className="card bg-white text-black card-sm sm:w-80 h-80 w-60 shadow-lg"
    >
      <figure>
        <img src="/tree-pic.jpg" alt="Tree" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-start">
          Food Restoration and Rehabilitation material
        </h2>
        <p className="text-start">
          A card component has a figure, a body part, and inside body there are title and actions parts
        </p>
        <div className="card-actions justify-between">
        <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Join Us</button>
          <IoMdShare className="text-2xl" />
        </div>
      </div>
    </div>

    <div
      ref={divdown}
      className="card card-sm bg-white text-black sm:w-80 h-80 w-60 shadow-lg"
    >
      <figure>
        <img src="/corn-pic.jpg" alt="Corn" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-start">
          The Clean-Up Team - Plastic waste reduction
        </h2>
        <p className="text-start">
          A card component has a figure, a body part, and inside body there are title and actions parts
        </p>
        <div className="card-actions justify-between">
        <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Join Us</button>
          <IoMdShare className="text-2xl" />
        </div>
      </div>
    </div>

    <div
      ref={divright}
      className="card z-50 card-sm bg-white text-black sm:w-80 h-80 w-60 shadow-lg"
    >
      <figure>
        <img src="/tractor-pic.jpg" alt="Tractor" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-start">
          Panda Conservation: Promoting Protection
        </h2>
        <p className="text-start">
          A card component has a figure, a body part, and inside body there are title and actions parts
        </p>
        <div className="card-actions justify-between">
        <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Join Us</button>
        <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Join Us</button>
        </div>
      </div>
    </div>
  </div>

  <button className="btn btn-outline btn-info mt-8">Explore more</button>
  <img
    src="/corn-anim-pic.png"
    className="absolute -top-14 left-2/3 sm:-top-16 md:-top-14 sm:left-4/5 w-20 sm:w-24 md:w-28 lg:w-40 opacity-60 z-0 animate-spin-slow"
  />
</div>

  );
}

export default Projects;
