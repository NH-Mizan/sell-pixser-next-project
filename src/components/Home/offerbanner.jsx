'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const ProductCard = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-10/12 mx-auto  py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Special Offers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-md h-64 md:h-80 flex items-center"
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="700"
          style={{
            backgroundImage: "url('/images/2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className=" w-full h-full px-6 py-8 text-white flex flex-col justify-center">
            <span className="bg-white text-black text-xs font-semibold px-2 py-1 rounded w-max mb-2">
              SPECIAL OFFER
            </span>

            <h2 className="text-xl md:text-2xl font-bold leading-tight mb-1">
              APLB Collagen Peptide Beauty Tablet
            </h2>
            <p className="text-sm mb-4">500mg x 30 Tablets</p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold px-4 py-2 rounded">
                Buy Now 1250 BDT
              </button>
              <button className="text-white text-sm underline hover:text-pink-100 transition">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-md h-64 md:h-80 flex items-center"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="700"
          style={{
            backgroundImage: "url('/images/1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className=" w-full h-full px-6 py-8 text-white flex flex-col justify-center">
            <span className="bg-white text-black text-xs font-semibold px-2 py-1 rounded w-max mb-2">
              SPECIAL OFFER
            </span>

            <h2 className="text-xl md:text-2xl font-bold leading-tight mb-1">
              SOME BY MI Cica Peptide Shampoo
            </h2>
            <p className="text-sm mb-4">285ml</p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold px-4 py-2 rounded">
                Buy Now 2300 BDT
              </button>
              <button className="text-white text-sm underline hover:text-pink-100 transition">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
