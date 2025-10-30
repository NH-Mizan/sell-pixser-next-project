'use client';

import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function AutoSlider() {
  const [images, setImages] = useState([]);
  const sliderRef = useRef();

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slider`);
        const data = await res.json();
        if (data?.data) {
          setImages(data.data);
        }
      } catch (error) {
        console.error('Slider fetch error:', error);
      }
    };

    fetchSliderImages();
  }, []);

  return (
    <div
      className="group relative w-11/12  mx-auto rounded-lg overflow-hidden"
      ref={sliderRef}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="w-full h-[200px] lg:h-[500px] slider-height"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
           <Link href={`${item.link}`} > <img
              src={`https://sellpixer.websolutionit.com/${item.image}`}
              alt={`Slide ${index + 1}`}
              className="w-full h-[450px]  sm:h-96 "
            /></Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Nav Buttons */}
      <button
        className="swiper-button-prev-custom absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 group-hover:opacity-100 opacity-0 p-2 rounded-full transition duration-300 z-10"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11a1 1 0 010-1.414l4.707-4.707a1 1 0 011.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        className="swiper-button-next-custom absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 group-hover:opacity-100 opacity-0 p-2 rounded-full transition duration-300 z-10"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L13.414 9a1 1 0 010 1.414l-4.707 4.707a1 1 0 01-1.414-1.414L10.586 10 7.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
