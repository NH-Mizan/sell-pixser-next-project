"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";


//  Autoplay Plugin (ALADA)
function AutoPlayPlugin(slider) {
  let timeout;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;

    timeout = setTimeout(() => {
      slider.next();
    }, 3000);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });

    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });

    nextTimeout();
  });

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}


//  Thumbnail Plugin (same)
function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx]?.classList.add("active");
    }

    slider.on("created", () => {
      if (!mainRef.current) return;

      addActive(slider.track.details.rel);

      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          mainRef.current?.moveToIdx(idx);
        });
      });

      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(next);
      });
    });
  };
}

export default function ProductGallery({ product, baseURL }) {

  // 🔥 এখানে autoplay add করা হয়েছে
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
    },
    [AutoPlayPlugin] // ✅ IMPORTANT
  );

  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  if (!product?.images || product.images.length === 0) return null;

  return (
    <div className="w-full md:w-1/2">
      {/* Main Slider */}
      <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
        {product.images.map((img, i) => (
          <div key={i} className="keen-slider__slide">
            <img
              src={`${baseURL}${img.image}`}
              alt={product?.name}
              className="w-full "
            />
          </div>
        ))}
      </div>

      {/* Thumbnail */}
      <div ref={thumbnailRef} className="keen-slider mt-3 thumbnail">
        {product.images.map((img, i) => (
          <div
            key={i}
            className="keen-slider__slide cursor-pointer border rounded-md overflow-hidden"
          >
            <img
              src={`${baseURL}${img.image}`}
              alt={`thumb-${i}`}
              className="w-full h-20 object-cover"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .thumbnail .keen-slider__slide.active {
          border: 2px solid #ec4899; 
        }
      `}</style>
    </div>
  );
}