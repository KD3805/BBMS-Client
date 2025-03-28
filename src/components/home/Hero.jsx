import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger plugin

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const nav = useNavigate()

  const titleRef = useRef()
  const subTitleRef = useRef()
  const buttonRef = useRef()
  const imgRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      x: -150,
      duration: 0.8,
      opacity: 0,
      stagger: 0.15,
    })
    tl.from(subTitleRef.current, {
      x: -150,
      duration: 0.8,
      opacity: 0,
      stagger: 0.15,
    })
    tl.from(buttonRef.current, {
      duration: 0.8,
      opacity: 0
    })
    tl.from(imgRef.current, {
      duration: 0.8,
      opacity: 0,
      scale: 0.5
    }, "-=1") // for delay in timeline
  }, [])

  return (
    <div className="relative bg-gradient-to-r from-red-600 to-pink-600 text-white border-blue-600">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto relative z-10 p-10 flex lg:justify-between justify-center items-center flex-wrap">
        <div className="max-w-2xl flex flex-col lg:items-start items-center lg:text-start text-center">
          <h1 ref={titleRef} className="lg:text-5xl text-4xl font-bold text-white mb-6">
            Your Blood, Their Hope
          </h1>
          <p ref={subTitleRef} className="text-xl text-white/90 mb-8">
            Join our mission to save lives. Every drop counts in making a
            difference in someone's life.
          </p>
          <div ref={buttonRef} className="flex gap-4 flex-wrap justify-center">
            <button onClick={() => nav("/DonorLogin")} className="bg-white text-red-600 w-40 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors">
              Donate Now
            </button>
            <button onClick={() => nav("/RecipientLogin")} className="border-2 border-white text-white w-44 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Request Blood
            </button>
          </div>
        </div>

        <div className="glow-effect">
          <img ref={imgRef} src="hero1.png" alt="Red Vault" className="object-contain " />
        </div>
      </div>
    </div>
  );
}

export default Hero
