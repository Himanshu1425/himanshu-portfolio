import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*+<>/';
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

// Stage 1: random characters scramble, then settle letter by letter into the name
const Scramble = ({ text, duration }) => {
  const [items, setItems] = useState(() =>
    text.split('').map((c) => ({ ch: c === ' ' ? ' ' : rand(), done: false }))
  );

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      const p = Math.min((performance.now() - start) / (duration * 1000), 1);
      const resolved = Math.floor(p * text.length);
      setItems(
        text.split('').map((c, i) => {
          if (c === ' ') return { ch: ' ', done: true };
          if (i < resolved) return { ch: c, done: true };
          return { ch: rand(), done: false };
        })
      );
      if (p >= 1) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [text, duration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-center text-6xl md:text-8xl font-black tracking-tighter whitespace-nowrap"
    >
      {items.map((it, i) => (
        <span
          key={i}
          className={it.done ? 'text-white' : 'text-black/40'}
          style={{
            display: 'inline-block',
            minWidth: it.ch === ' ' ? '0.35em' : '0.72em',
            textAlign: 'center',
          }}
        >
          {it.ch}
        </span>
      ))}
      <span className="text-black">.</span>
    </motion.div>
  );
};

// Stage 2: each letter slides up from inside a mask while the spacing opens out
const Portfolio = ({ text }) => (
  <motion.div
    initial={{ letterSpacing: '-0.06em' }}
    animate={{ letterSpacing: '0.14em' }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
    className="flex items-center justify-center text-6xl md:text-8xl font-black text-white whitespace-nowrap"
  >
    {text.split('').map((c, i) => (
      <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.1 }}>
        <motion.span
          style={{ display: 'inline-block' }}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.0, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {c}
        </motion.span>
      </span>
    ))}
    <span className="text-black" style={{ letterSpacing: 0 }}>.</span>
  </motion.div>
);

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stage, setStage] = useState('name');

  useEffect(() => {
    // Name decodes (about 1.3s), short hold, then PORTFOLIO slides in, then the shutter goes up.
    const toPortfolio = setTimeout(() => setStage('portfolio'), 2400);
    const done = setTimeout(() => setIsLoading(false), 4800);

    return () => {
      clearTimeout(toPortfolio);
      clearTimeout(done);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[#ff2a2a] z-[100000] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {stage === 'name' ? (
              <Scramble key="name" text="HIMANSHU RAJ" duration={1.9} />
            ) : (
              <Portfolio key="portfolio" text="PORTFOLIO" />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
