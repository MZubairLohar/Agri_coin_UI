"use client";

import { useEffect, useRef } from "react";

function Aboutus() {
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
    <div className="w-full px-4">
      <div className="card flex flex-col lg:flex-row w-full max-w-[90%] bg-[#FFE990] h-auto lg:h-[450px] rounded-2xl shadow-sm p-6 md:p-8 mx-auto">
        {/* Left Section */}
        <div className="card-body w-full lg:w-1/2 text-black">
          <h2 className="card-title text-[#6F9D7E] text-4xl lg:text-5xl">About Us</h2>
          <p className="text-md mt-2">
            Our mission is to conserve nature and reduce the most pressing threats to the diversity of life on Earth.
          </p>

          <div className="join join-vertical bg-[#FFE990] -ml-4 -space-y-4 mt-4">
            <div className="collapse collapse-arrow join-item">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-lg font-normal">Who we are</div>
              <div className="collapse-content text-sm">
                Click the "Sign Up" button in the top right corner and follow the registration process.
              </div>
            </div>
            <div className="collapse collapse-arrow join-item">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-lg font-normal">What we do</div>
              <div className="collapse-content text-sm">
                Click on "Forgot Password" on the login page and follow the instructions sent to your email.
              </div>
            </div>
            <div className="collapse collapse-arrow join-item">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-lg font-normal">How To Help</div>
              <div className="collapse-content text-sm">
                Go to "My Account" settings and select "Edit Profile" to make changes.
              </div>
            </div>
            <div className="collapse collapse-arrow join-item">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-lg font-normal">Where We Work</div>
              <div className="collapse-content text-sm">
                Go to "My Account" settings and select "Edit Profile" to make changes.
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          ref={divright}
          className="card-body w-full lg:w-1/2 flex justify-center items-center mt-6 lg:mt-0"
        >
          <video className="w-full h-60 sm:h-72 md:h-80 lg:h-full" controls>
            <source
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
