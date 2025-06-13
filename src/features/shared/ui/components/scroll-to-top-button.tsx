"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ScrollToTopProps {
  className?: string;
  showAfter?: number; // Show button after scrolling this many pixels
}

const ScrollToTop = ({ className, showAfter = 900 }: ScrollToTopProps) => {
  const { scrollY } = useScroll();

  // Transform scroll position to translateY (slide up/down animation)
  const translateY = useTransform(
    scrollY,
    [showAfter - 1, showAfter],
    [100, 0],
  );

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      style={{
        translateY,
      }}
      className="fixed right-6 bottom-6 z-50 transition-transform duration-200"
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full bg-green-600 shadow-lg transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none",
          className,
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="size-6 text-white" />
      </Button>
    </motion.div>
  );
};

export default ScrollToTop;
