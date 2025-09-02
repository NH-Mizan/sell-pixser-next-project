'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function TopCategories() {
  const [categories, setCategories] = useState([]);
  const baseURL = 'https://sellpixer.websolutionit.com/';

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`) 
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setCategories(data.data);
        }
      });
  }, []);

  return (
    <section className="w-10/12 mx-auto my-10">
      <h2 className="text-xl font-bold mb-5"   data-aos="zoom-in"
            data-aos-duration="500">TOP CATEGORIES</h2>

      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}

        modules={[Navigation, Autoplay]}
        className="category-swiper"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <Link
              href={`/category/${cat.id}`}
              className="group block bg-white  rounded-md shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
               data-aos="fade-up"
            data-aos-duration="500"
            >
              <div className="h-24 lg:h-36 flex items-center justify-center overflow-hidden bg-gray-50">
                <img
                  src={`${baseURL}${cat.image}`}
                  alt={cat.name}
                  className="object-contain h-full transition-transform duration-300 group-hover:scale-115"
                />
              </div>
              <div className="p-3 h-16 text-center">
                <p className="text-sm  font-medium text-gray-800 group-hover:text-red-400 transition">
                  {cat.name}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
