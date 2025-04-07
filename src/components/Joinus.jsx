'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { FaRegHeart } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Joinus() {

  const ButtonWrapper = () => {
    return (
      <div className="bg-slate-100 flex items-center justify-center">
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
          text-white
          bg-[#676ED2]
          shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
          
          transition-all
  
          hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
          hover:text-white
      `}
      >
        <span>Donate</span>
      </button>
       );
    };

  const [swiperRef, setSwiperRef] = useState(null);

  const cardData = [
    {
      image: 'farmer-pic.jpg',
      title: 'Amazon Forest',
      description:
        'A card component has a figure, a body part, and inside body there are title and actions parts',
      progress: 50,
      amount: '$86,812',
      supporters: 1254,
    },
    {
      image: 'turtle-pic.jpg',
      title: 'Ocean Turtle Rescue',
      description:
        'Help protect endangered turtles and preserve marine biodiversity in oceans worldwide.',
      progress: 70,
      amount: '$45,200',
      supporters: 879,
    },
    {
      image: 'dolphin-pic.jpg',
      title: 'Green Earth Movement',
      description:
        'Support tree planting and reforestation efforts across critical regions.',
      progress: 40,
      amount: '$25,600',
      supporters: 512,
    },
    {
        image: 'farmer-pic.jpg',
        title: 'Amazon Forest',
        description:
          'A card component has a figure, a body part, and inside body there are title and actions parts',
        progress: 50,
        amount: '$86,812',
        supporters: 1254,
      },
      {
        image: 'turtle-pic.jpg',
        title: 'Ocean Turtle Rescue',
        description:
          'Help protect endangered turtles and preserve marine biodiversity in oceans worldwide.',
        progress: 70,
        amount: '$45,200',
        supporters: 879,
      },
  ];

  return (
    <div className="w-full bg-[#6F9D80] mt-10 h-[650px] flex flex-col items-center justify-center overflow-visible">
    <div className="z-10 flex flex-col items-center w-full max-w-2xl space-y-4 md:space-y-6 mb-6">
      <h1 className="text-3xl font-semibold text-black text-center">
        Join Us: Together for a Better Future
      </h1>
    </div>
  
    <Swiper
      onSwiper={setSwiperRef}
      slidesPerView="auto"
      spaceBetween={30}
    //   pagination={{ type: 'fraction' }}
      navigation
      modules={[Pagination, Navigation]}
      className="h-[520px] relative w-full px-4"
    >
      {cardData.map((card, index) => (
        <SwiperSlide
          key={index}
          className="min-w-[28rem] pl-6 max-w-md rounded"
        >
          <div className="card bg-white text-black h-11/12 shadow-md">
            <figure className="px-4 pt-4">
              <img
                src={card.image}
                alt={card.title}
                className="rounded-xl h-60 object-cover w-full"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-start">{card.title}</h2>
              <p className="text-start">{card.description}</p>
              <p className="text-start text-lg mt-2">
                <span className="text-xl font-bold text-[#676ED2]">
                  {card.amount}
                </span>{' '}
                reload of $100,000 goal
              </p>
              <progress
                className="progress progress-secondary w-full"
                value={card.progress}
                max="100"
              ></progress>
              <div className="card-actions justify-between mt-2">
                <div className="flex items-center">
                  <FaRegHeart className="text-2xl text-pink-600" />
                  <span className="ml-2 text-base text-gray-700">
                    {card.supporters} Supporter
                  </span>
                </div>
                <ButtonWrapper />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  
  );
}
