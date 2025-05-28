"use client";

import { useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

interface AnimatedCounterProps {
  value: number;
  type: "number" | "percentage";
  className?: string;
}

const AnimatedCounter = ({ value, type, className }: AnimatedCounterProps) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      // Animate from 0 to target value
      animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (scope.current) {
            const displayValue = Math.floor(latest);
            const suffix = type === "number" ? "+" : "%";
            scope.current.textContent = displayValue + suffix;
          }
        },
      });
    }
  }, [isInView, animate, value, type, scope]);

  return (
    <span ref={scope} className={className}>
      0{type === "number" ? "+" : "%"}
    </span>
  );
};

export default AnimatedCounter;
