import React from "react";

export default function FeaturedCardShimmer() {
  return (
    <div
      className="relative flex bg-white 2xl:px-[15px] lg:px-[12px] px-[10px] items-center 2xl:py-[10px] lg:py-[7.5px] py-[5px] border-[.5px] border-gray-200 md:gap-[15px] gap-[10px] 2xl:gap-[20px] 2xl:w-[450px] w-[280px] xl:w-[420px] lg:w-[400px] md:w-[370px] sm:w-[320px] rounded-[10px] mx-auto overflow-hidden"
    >
      {/* ✅ Glowing shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer z-0" />

      {/* Image Placeholder */}
      <div className="2xl:w-[180px] w-[140px] h-[120px] bg-gray-300 rounded-[5px] flex justify-center items-center relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer" />
      </div>

      {/* Details Placeholder */}
      <div className="flex flex-col 2xl:gap-[10px] md:gap-[7px] gap-[5px] flex-1 relative z-10">
        {/* Title shimmer */}
        <div className="w-[80%] h-[18px] 2xl:h-[22px] bg-gray-300 rounded-md overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer" />
        </div>

        {/* Rating shimmer */}
        <div className="flex flex-col 2xl:gap-[10px] md:gap-[7px] gap-[5px]">
          <div className="flex gap-[5px]">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-[18px] h-[18px] bg-gray-300 rounded-sm overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer" />
              </div>
            ))}
          </div>
          <div className="w-[60px] h-[12px] bg-gray-300 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer" />
          </div>
        </div>

        {/* Price shimmer */}
        <div className="flex gap-[15px]">
          <div className="w-[40px] h-[14px] bg-gray-300 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer" />
          </div>
          <div className="w-[35px] h-[14px] bg-gray-300 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer" />
          </div>
        </div>

        {/* Button shimmer */}
        <div className="w-[90px] h-[30px] bg-gray-300 rounded-[6px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
