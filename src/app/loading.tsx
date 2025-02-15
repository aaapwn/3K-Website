'use client';
import React from 'react';
// import { motion } from 'framer-motion';

function Loading() {
  return (
    <div className="min-h-screen items-center justify-center flex flex-col gap-5">
      <p className="text-3xl">LOADING...</p>
      <div className="flex space-x-2">
        {['⚽', '🏀', '🏈', '⚾', '🏒', '🎾'].map((emoji, index) => (
          <span
            key={index}
            className="text-3xl animate-bounce duration-700"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Loading;
