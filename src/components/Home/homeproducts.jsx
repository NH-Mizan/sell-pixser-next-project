'use client';
import { useEffect, useState } from "react";

export default function HomeProducts() {
    const [products, setProducts] = useState([]);
    const baseURL = 'https://sellpixer.websolutionit.com/';
      useEffect(() => {
        const fetchproduct = async () => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotdeal-product`);
            const data = await res.json();
            if (data?.data) {
              setProducts(data.data.slice(0, 20));
              console.log(data.data.slice(0, 20).map(product => product.id==7));
            }
          } catch (error) {
            console.error('Slider fetch error:', error);
          }
        };

    
        fetchproduct();
      }, []);
   

    return (
        <div className="w-10/12 mx-auto py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Home Products</h1>

           
        </div>
    );
}