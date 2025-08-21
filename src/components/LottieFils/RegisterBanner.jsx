"use client"; // client component করতে হবে

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottieAnimation = () => {
  return (
    <div className="w-[400px] h-[400px]">
      <DotLottieReact
        src="https://lottie.host/c4e259e5-6dc7-483d-8b70-4bc660a7f030/LXgBk68K73.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default LottieAnimation;