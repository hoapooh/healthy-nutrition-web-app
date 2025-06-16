"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
  className?: string;
}

export const ProductImageCarousel = ({
  images,
  productName,
  className = "",
}: ProductImageCarouselProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // Use provided images or fallback to placeholder
  const productImages =
    images && images.length > 0
      ? images
      : ["https://www.shadcnblocks.com/images/block/placeholder-1.svg"];

  const handleImageSelect = (index: number) => {
    if (index !== selectedImageIndex) {
      setIsImageLoading(true);
      setSelectedImageIndex(index);
      // Also scroll carousel to the selected image
      if (carouselApi) {
        carouselApi.scrollTo(index);
      }
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleKeyNavigation = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      const newIndex =
        selectedImageIndex > 0
          ? selectedImageIndex - 1
          : productImages.length - 1;
      handleImageSelect(newIndex);
    } else if (event.key === "ArrowRight") {
      const newIndex =
        selectedImageIndex < productImages.length - 1
          ? selectedImageIndex + 1
          : 0;
      handleImageSelect(newIndex);
    }
  };

  const handlePrevImage = () => {
    const newIndex =
      selectedImageIndex > 0
        ? selectedImageIndex - 1
        : productImages.length - 1;
    handleImageSelect(newIndex);
  };

  const handleNextImage = () => {
    const newIndex =
      selectedImageIndex < productImages.length - 1
        ? selectedImageIndex + 1
        : 0;
    handleImageSelect(newIndex);
  };

  // Listen to carousel slide changes and update main image
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const selected = carouselApi.selectedScrollSnap();
      if (selected !== selectedImageIndex) {
        setSelectedImageIndex(selected);
      }
    };

    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, selectedImageIndex]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main product image */}
      <div className="relative">
        <div
          className="group focus:ring-primary relative aspect-square overflow-hidden rounded-lg border focus:ring-2 focus:outline-none"
          tabIndex={0}
          onKeyDown={handleKeyNavigation}
        >
          <Image
            src={productImages[selectedImageIndex]}
            alt={productName}
            width={500}
            height={500}
            className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
              isImageLoading ? "opacity-50" : "opacity-100"
            }`}
            onLoad={handleImageLoad}
            priority
          />

          {/* Image counter */}
          <div className="absolute top-3 right-3 rounded-full bg-black/70 px-2 py-1 text-sm text-white">
            {selectedImageIndex + 1} / {productImages.length}
          </div>
        </div>

        {/* Navigation buttons - only show if there are multiple images */}
        {productImages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-3 h-10 w-10 -translate-y-1/2 rounded-full border-green-600 bg-green-600/90 shadow-lg backdrop-blur-sm hover:bg-green-600"
              onClick={handlePrevImage}
              disabled={selectedImageIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 text-white" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-3 h-10 w-10 -translate-y-1/2 rounded-full border-green-600 bg-green-600/90 shadow-lg backdrop-blur-sm hover:bg-green-600"
              onClick={handleNextImage}
              disabled={selectedImageIndex === productImages.length - 1}
            >
              <ArrowRight className="h-4 w-4 text-white" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>

      {/* Carousel for thumbnail images - only show if there are multiple images */}
      {productImages.length > 1 && (
        <div className="relative">
          <Carousel
            className="w-full"
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: false,
            }}
          >
            <CarouselContent className="-ml-2">
              {productImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/3 pl-2 md:basis-1/4"
                >
                  <div
                    className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-green-600 shadow-md"
                        : "hover:border-primary/50 border-gray-200 hover:shadow-sm"
                    }`}
                    onClick={() => handleImageSelect(index)}
                    role="button"
                    aria-label={`Select product image ${index + 1}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleImageSelect(index);
                      }
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${productName} ${index + 1}`}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  );
};
