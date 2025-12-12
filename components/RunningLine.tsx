"use client";

import { useChangeOnResize } from "@/hooks/useChangeOnResize";
import { motion, Variants } from "framer-motion";
import { useRef, useState } from "react";

interface RunningLineProps {
  children: React.ReactNode;
  speed?: number; // px per second
}

function RunningLine({ children, speed = 35 }: RunningLineProps) {
  const [animationState, setAnimationState] = useState<
    "start" | "pause" | "resume"
  >("start");

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const startX = -contentWidth;
  const finishX = containerWidth;
  const totalDistance = containerWidth + contentWidth;
  const absoluteDuration = totalDistance > 0 ? totalDistance / speed : 0;

  const handleMouseEnter = () => {
    if (contentRef.current && containerRef.current) {
      const rectContent = contentRef.current.getBoundingClientRect();
      const rectContainer = containerRef.current.getBoundingClientRect();
      setCurrentX(rectContent.left - rectContainer.left);
      setAnimationState("pause");
    }
  };

  const handleMouseLeave = () => {
    const remainingDistance = finishX - currentX;
    const newDuration = remainingDistance > 0 ? remainingDistance / speed : 0;
    setDuration(newDuration);
    setAnimationState("resume");
  };

  const handleContainerWidthChange = (newWidth: number) => {
    setContainerWidth(newWidth);
  };

  const handleContentWidthChange = (newWidth: number) => {
    setContentWidth(newWidth);
  };

  useChangeOnResize(containerRef, handleContainerWidthChange);
  useChangeOnResize(contentRef, handleContentWidthChange);

  const [duration, setDuration] = useState(absoluteDuration);

  const variants: Variants = {
    start: {
      x: [startX, finishX],
      transition: {
        duration: absoluteDuration,
        repeat: Infinity,
        ease: "linear",
      },
    },
    resume: {
      x: [currentX, finishX],
      transition: {
        duration: duration,
        ease: "linear",
        onComplete: () => {
          setAnimationState("start");
        },
      },
    },
    pause: {
      x: currentX,
      transition: {
        duration: 0,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="overflow-hidden whitespace-nowrap"
      aria-hidden="true"
    >
      <motion.div
        ref={contentRef}
        className="inline-block"
        variants={variants}
        animate={animationState}
        initial={false}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default RunningLine;
