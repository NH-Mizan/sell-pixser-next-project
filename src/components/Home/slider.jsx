'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Slider() {
    const [images, setImages] = useState([]);

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
        <div className="w-full  mx-auto">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 4000 }}
                loop={true}
                className="rounded-lg overflow-hidden"
            >
                {images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="h-[600px] w-full">
                            <img
                                src={`https://sellpixer.websolutionit.com/${item.image}`}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
