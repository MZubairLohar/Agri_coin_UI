"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";

function Aboutus() {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const data = [
    {
      title: 'Who we are',
      content: 'Click the "Sign Up" button in the top right corner and follow the registration process.',
    },
    {
      title: 'What we do',
      content: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
    },
    {
      title: 'How To Help',
      content: 'Go to "My Account" settings and select "Edit Profile" to make changes.',
    },
    {
      title: 'Where We Work',
      content: 'Go to "My Account" settings and select "Edit Profile" to make changes.',
    },
  ];

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

  return (
    <div className="w-full px-4 mt-10">
      <div className="card flex flex-col lg:flex-row w-full max-w-[90%] bg-[#6F9D7E] h-auto lg:h-[450px] rounded-2xl shadow-sm p-6 md:p-8 mx-auto">
        {/* Left Section */}
        <div className="card-body w-full lg:w-1/2 text-black">
          <h2 className="card-title text-[#FFE990] text-4xl lg:text-5xl">About Us</h2>
          <p className="text-md text-[#FFE990] font-bold mt-2">
            Our mission is to conserve nature and reduce the most pressing threats to the diversity of life on Earth.
          </p>

          <div className="join join-vertical bg-[#6F9D7E] text-gray-200 -ml-4 -space-y-4 mt-4">
      {data.map((item, index) => (
        <div key={index} className="collapse collapse-arrow join-item">
          <input
            type="checkbox"
            checked={openIndex === index}
            onChange={() => toggleAccordion(index)}
          />
          <div className="collapse-title text-lg text-[#FFE990] font-bold">
            {item.title}
          </div>
          <div className="collapse-content text-sm text-white">
            {item.content}
          </div>
        </div>
      ))}
    </div>

        </div>

        {/* Right Section */}
        <div
  // ref={divright}
  className="card-body w-full lg:w-1/2 flex justify-center items-center mt-6 lg:mt-0"
>
  <div className="w-full h-60 sm:h-72 md:h-80 lg:h-full rounded-3xl overflow-hidden">
    <video className="w-full h-full object-cover" controls>
      <source
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  </div>
</div>

      </div>
    </div>
  );
}

export default Aboutus;
