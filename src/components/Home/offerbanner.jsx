import Image from 'next/image';

const ProductCard = () => {
  const offers = [
    {
      id: 1,
      name: "APLB Collagen Peptide Beauty Table",
      description: "500mg x 30 Tablets",
      price: "1250 BDT",
      tag: "SPECIALOFFER",
      imageUrl: "/collagen-tablets.jpg" // replace with your image path
    },
    {
      id: 2,
      name: "SOME BY MI Cica Peptide Anti Hair Loss Derm Scalp Shampoo",
      description: "285ml",
      price: "2300 BDT",
      tag: "SPECIALOFFER",
      imageUrl: "/shampoo.jpg" // replace with your image path
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Special Offers</h1>
      
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {offers.map((item, index) => (
    <div
      key={index}
      className="flex flex-col md:flex-row items-center rounded-2xl overflow-hidden shadow-md"
      style={{ backgroundColor: item.bgColor }}
    >
      {/* Left Content */}
      <div className="w-full md:w-1/2 px-6 py-8 text-white">
        <div className="mb-2">
          <span className="bg-white text-black text-xs font-semibold px-2 py-1 rounded">
            SPECIAL OFFER
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold leading-tight mb-4">
          {item.title}
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold px-4 py-2 rounded">
            Buy Now {item.price} BDT
          </button>
          <button className="text-white text-sm underline hover:text-pink-100 transition">
            View Details
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default ProductCard;