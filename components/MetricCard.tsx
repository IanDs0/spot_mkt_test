'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart } from './charts/PieChart';
import { useTheme } from './ThemeProvider';
import { chartColors } from './Dashboard';

interface Allocation {
  label: string;
  value: number;
  previousValue?: number;
}

interface MetricCardProps {
  title: string;
  value: string;
  previousValue?: string;
  change?: number;
  allocations?: Allocation[];
}

export function MetricCard({ title, value, change, allocations }: MetricCardProps) {
  const { theme } = useTheme();

  const getTrendColor = (change?: number) => {
    if (!change) return theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
    return change > 0 
      ? theme === 'dark' ? 'text-green-400' : 'text-green-500'
      : theme === 'dark' ? 'text-red-400' : 'text-red-500';
  };

  const TrendIcon = ({ change }: { change?: number }) => {
    if (!change) return <Minus className="w-4 h-4" />;
    return change > 0 ? (
      <ArrowUpRight className="w-4 h-4" />
    ) : (
      <ArrowDownRight className="w-4 h-4" />
    );
  };

  const pieData = allocations?.map((item) => {
    const platform = item.label.toLowerCase().split(' ')[0];
    return {
      name: item.label,
      value: item.value,
      color: chartColors[platform as keyof typeof chartColors][theme === 'dark' ? 'dark' : 'light']
    };
  }) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-lg shadow-sm transition-colors
        ${theme === 'dark' 
          ? 'bg-gray-800 text-gray-100' 
          : 'bg-white text-gray-900'
        }`}
    >
      <h3 className={`text-sm font-medium mb-2
        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
      >
        {title}
      </h3>

      <div className="flex items-baseline mt-2 gap-2">
        <p className={`text-2xl font-semibold
          ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
        >
          {value}
        </p>
        {change && (
          <span className={`flex items-center ${getTrendColor(change)}`}>
            <TrendIcon change={change} />
            {Math.abs(change)}%
          </span>
        )}
      </div>
      
      {allocations && (
        <div className="mt-4 space-y-3">
          <div className="flex justify-center mb-4">
            <PieChart data={pieData} />
          </div>
          {allocations.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm
                  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  {item.label}
                </span>
                <span className={`text-sm font-medium
                  ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  {item.value}%
                </span>
              </div>
              <motion.div 
                className={`h-2 rounded-full overflow-hidden
                  ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="h-full"
                  style={{ 
                    backgroundColor: pieData.find(d => d.name === item.label)?.color 
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
