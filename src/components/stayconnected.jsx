"use client";

import { useEffect,useRef } from "react";

function Connected () {

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

const divup = useRef(null);
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slideInDown");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  if (divup.current) {
    observer.observe(divup.current);
  }

  return () => {
    if (divup.current) {
      observer.unobserve(divup.current);
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
              text-[#6F9D7E]
              bg-[#FFE990]
              font-bold
            
              
              transition-all
      
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
              hover:text-[#6F9D7E]
          `}
          >
            <span>Donate</span>
          </button>
           );
        };
    return(
        <>
        <div className="card lg:card-side w-11/12 lg:w-4/5 rounded-2xl mt-16 bg-[#6F9D7E] h-auto lg:h-[400px] shadow-sm p-4 mx-auto">
        
  <div className="card-body w-full lg:w-2/5 text-[#FFE990]">
    <h2 className="card-title text-3xl sm:text-4xl">Stay Connected</h2>
    <p className="text-md">Our mission is to conserve nature and reduce the most pressing threats to the diversity of life on earth.</p>
    <div className="space-y-8 lg:space-y-4 xl:space-y-8 lg:mt-0 xl:mt-4">
      <input
        type="text"
        placeholder="Your Email"
        className="input text-black input-warning bg-white w-full"
      />
      <textarea
        type="text"
        placeholder="Your Message"
        className="textarea text-black textarea-warning bg-white w-full"
      ></textarea>
     <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#FFE990] text-[#6F9D7E]">Donate</button>
    </div>
  </div>

  <div className="card-body w-full lg:w-3/5 flex">
    <div
      className="flex gap-4 w-full flex-col sm:flex-row"
    >
      <div className="flex items-center w-full lg:w-2/4 justify-center">
        <img
        ref={divleft}
        src="pic3.png" className="rounded-lg h-44 sm:h-60 object-cover w-96 lg:w-80" />
      </div>
      <div className="space-y-4 w-full lg:w-2/4">
      <div className="flex items-center justify-center">
        <img
        ref={divup}
        src="wheat-pic.jpg" className="rounded-lg object-cover h-44 sm:-mt-5 w-96 sm:w-full" />
        </div>
        <div className="flex items-center justify-center">
        <img
        ref={divdown}
          id="pic"
          src="working-fields.jpg"
          className="rounded-lg h-44 object-cover w-96 sm:w-full"
        />
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Connected;