'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DonutChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
}

export function DonutChart({ data, size = 150 }: DonutChartProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let currentAngle = 0;

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg
        viewBox="0 0 100 100"
        className="transform -rotate-90 w-full h-full"
      >
        {data.map((item, i) => {
          const angle = (item.value / total) * 360;
          const pathData = describeArc(50, 50, 40, currentAngle, currentAngle + angle);
          currentAngle += angle;

          return (
            <motion.path
              key={i}
              d={pathData}
              fill="none"
              stroke={item.color}
              strokeWidth="20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-2xl font-bold">{total}%</span>
        </div>
      </div>
    </div>
  );
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}
