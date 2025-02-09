import React from 'react';
import { FaRegHeart } from "react-icons/fa";

export default function AboutHero() {
  return (
    <div className="relative bg-gradient-to-r from-red-600 to-red-800 text-white">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <FaRegHeart className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About Blood Donation
          </h1>
          <p className="mt-4 text-xl text-gray-100 max-w-3xl mx-auto">
            Learn about the importance of blood donation and how you can make a difference in someone's life.
          </p>
        </div>
      </div>
    </div>
  );
}