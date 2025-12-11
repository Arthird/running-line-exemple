"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RunningLineProps {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
}

const RunningLine = ({
  children,
  speed = 35,
}: RunningLineProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const calculateWidths = () => {
      const container = document.getElementById("running-line-container");
      const content = document.getElementById("running-line-content");
      if (container && content) {
        setContainerWidth(container.offsetWidth);
        setContentWidth(content.offsetWidth);
      }
    };

    calculateWidths();
    window.addEventListener("resize", calculateWidths);
    return () => window.removeEventListener("resize", calculateWidths);
  }, [speed]);

  const shouldAnimate = contentWidth > 0 && containerWidth > 0;
  const duration = containerWidth / speed;

  return (
    <div
      id="running-line-container"
      className="overflow-hidden whitespace-nowrap"
      aria-hidden="true"
    >
      <motion.div
        id="running-line-content"
        className="inline-block"
        animate={{
          x: [ -contentWidth, containerWidth]
            
        }}
        transition={{
          duration: shouldAnimate ? duration : 0,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RunningLine;
