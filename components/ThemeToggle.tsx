'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle"
      style={{
        position: 'relative',
        width: 64,
        height: 32,
        borderRadius: 16,
        background: isDark ? '#222' : '#eee',
        border: isDark ? '1px solid #444' : '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        zIndex: 1000,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div className="absolute inset-0 p-1">
        {/* Ícone do Sol */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 absolute right-1 transition-opacity ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="orange"
        >
          <circle cx="12" cy="12" r="5" stroke="orange" strokeWidth="2" fill="yellow" />
          <g stroke="orange" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </g>
        </motion.svg>

        {/* Ícone da Lua */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 absolute left-1 transition-opacity ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className="theme-toggle-thumb"
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: isDark ? '#444' : '#fff',
          position: 'absolute',
          left: 2,
          transform: 'translateY(-50%)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        }}
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
      />
    </motion.button>
  );
}
