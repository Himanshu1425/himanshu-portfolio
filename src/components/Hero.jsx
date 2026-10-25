import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Adjusted import path for the video
import heroVideo from '../assets/hero video/intro.mp4';

// Preloader finishes at 4.8s, so everything here starts just before the shutter opens
const BASE = 4.7;
const EASE = [0.76, 0, 0.24, 1];

const Hero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const showPlay = (isPlaying === false) || isMuted;

  useEffect(() => {
    // Kept because other sections use AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
    // Video does NOT autoplay
  }, []);

  const toggleVideo = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video: starts as a rounded card, expands to full screen */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ clipPath: 'inset(18% 24% 18% 24% round 36px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 1.5, delay: BASE, ease: EASE }}
      >
        <motion.video
          ref={videoRef}
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, delay: BASE, ease: EASE }}
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      </motion.div>

      {/* Dark overlay on the left */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/40 via-black/15 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: BASE + 0.8 }}
      ></motion.div>

      {/* Content Container */}
      <div className="absolute inset-0 z-20 px-6 pb-20 md:pb-[8%] md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-left w-full">

        {/* Left Side: Text and Buttons */}
        <div className="flex flex-col items-start text-left max-w-2xl w-full">
          {/* Main Heading: each line slides up from inside a mask */}
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.12em' }}>
              <motion.span
                style={{ display: 'block' }}
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.0, delay: BASE + 0.9, ease: EASE }}
              >
                Hi, I’m Himanshu Raj
              </motion.span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.12em' }}>
              <motion.span
                className="text-white/20 [-webkit-text-stroke:2px_white]"
                style={{ display: 'block' }}
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.0, delay: BASE + 1.1, ease: EASE }}
              >
                I’m an Applied AI Engineer
              </motion.span>
            </span>
          </h1>

          {/* Subheading */}
          <motion.p
            className="text-white text-sm md:text-lg font-semibold mb-8 max-w-md drop-shadow-md"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: BASE + 1.5, ease: 'easeOut' }}
          >
            I build agentic AI systems, RAG pipelines and GenAI applications with LangGraph, FastAPI and Next.js, from model to deployed product.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-row flex-wrap items-center gap-3 w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: BASE + 1.7, ease: 'easeOut' }}
          >
            {/* Primary Button */}
            <a href="#projects" className="px-4 py-2 md:px-6 md:py-2 text-xs md:text-base rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-md">
              View My Work
            </a>

            {/* Secondary Button - Glassmorphism style */}
            <a href="#contact" className="px-4 py-2 md:px-6 md:py-2 text-xs md:text-base rounded-full bg-black/40 border border-white text-white font-semibold hover:bg-black/60 transition-all duration-300 backdrop-blur-md">
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Side: Play Video Button */}
        <motion.div
          className="mt-8 md:mt-0 flex flex-row md:flex-col items-center gap-2 md:gap-3 cursor-pointer group self-start md:self-auto"
          onClick={toggleVideo}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: BASE + 2.0, ease: 'easeOut' }}
        >
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/30 bg-black/20 backdrop-blur-md flex justify-center items-center group-hover:scale-110 group-hover:bg-[#ff2a2a] transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_rgba(255,42,42,0.6)]">
            {showPlay ? (
              // Play Icon
              <svg className="w-5 h-5 md:w-8 md:h-8 text-white ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              // Pause Icon
              <svg className="w-5 h-5 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </div>
          <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            {showPlay ? "Play Reel" : "Pause"}
          </span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: BASE + 2.4 }}
      >
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
