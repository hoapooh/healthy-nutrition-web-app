"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ScrollToTopProps {
  className?: string;
  showAfter?: number; // Show button after scrolling this many pixels
}

const ScrollToTop = ({ className, showAfter = 300 }: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > showAfter) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className={cn(
            "fixed right-6 bottom-6 z-50 h-12 w-12 rounded-full bg-green-600 shadow-lg transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none",
            className,
          )}
          aria-label="Scroll to top"
        >
          <ChevronUp className="size-6 text-white" />
        </Button>
      )}
    </>
  );
};

export default ScrollToTop;
