'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

const baseURL = 'https://sellpixer.websolutionit.com/';

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`);
        const data = await res.json();
        if (data?.data) {
          setBrands(data.data);
        }
      } catch (error) {
        console.error('Slider fetch error:', error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="my-10 w-10/12 mx-auto" data-aos="fade-up">
        <h1 className="text-3xl font-bold text-gray-800 mb-8"  data-aos="zoom-out-up" >Shop From Brand</h1>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 7 },
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000} // Smooth continuous motion
        loop={true}
        modules={[Autoplay]}
        className="brand-slider"
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <Link href={`/${brand.slug}`}>
              <div className="border rounded-xl p-4 flex justify-center items-center h-28 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group">
                <img
                  src={`${baseURL}${brand.image}`}
                  alt={brand.name}
                  className="h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
