import React from 'react'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const nav = useNavigate()

  return (
    <div className="relative bg-gradient-to-r from-red-600 to-pink-600 text-white">
      <div className="absolute inset-0 bg-black/30" />
      <div className="container mx-auto px-10 relative z-10 flex justify-center items-center gap-40 flex-wrap">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-6">
            Your Blood, Their Hope
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Join our mission to save lives. Every drop counts in making a
            difference in someone's life.
          </p>
          <div className="flex gap-4">
            <button onClick={() => nav("/DonorLogin")} className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors">
              Donate Now
            </button>
            <button onClick={() => nav("/RecipientLogin")} className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Request Blood
            </button>
          </div>
        </div>

        <div className="glow-effect">
          <img src="hero1.png" alt="Red Vault" className="object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Hero
