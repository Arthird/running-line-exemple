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
  reverse = false,
}: RunningLineProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Рассчитываем общее расстояние для анимации (ширина контента + контейнера)
  const distance = contentWidth + containerWidth;
  const duration = distance > 0 ? distance / speed : 0;

  // Рассчитываем начальное и конечное положение в зависимости от направления
  const startX = reverse ? -contentWidth : containerWidth;
  const endX = reverse ? containerWidth : -contentWidth;

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
  }, []); // Запускаем только при монтировании

  // Обработчики наведения
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  // Рендерим без анимации пока не получены размеры
  if (containerWidth === 0 || contentWidth === 0) {
    return (
      <div
        id="running-line-container"
        className="overflow-hidden whitespace-nowrap"
      >
        <div id="running-line-content" className="inline-block">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      id="running-line-container"
      className="overflow-hidden whitespace-nowrap"
      aria-hidden="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        id="running-line-content"
        className="inline-block"
        initial={{ x: startX }}
        animate={{ x: endX }}
        transition={{
          duration,
          ease: "linear",
          repeat: isPlaying ? Infinity : 0,
          repeatType: "loop",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RunningLine;
