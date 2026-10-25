import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/certificates';

const EASE = [0.76, 0, 0.24, 1];
const TILTS = [-2.5, 1.5, -1.5, 2.5];
const TICKER = ['Machine Learning', 'Generative AI', 'Agentic AI', 'Prompt Design', 'Verified Credentials'];
const TICKER_TOP = ['Google Cloud', 'Stanford Online', 'DeepLearning.AI', 'Oracle', 'IEEE', 'EY', 'Microsoft', 'Coursera'];

const VerifyButton = ({ href, className, light }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={'inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-colors ' + (light ? 'bg-white text-[#111111] hover:bg-white/80' : 'bg-[#111111] text-white hover:bg-black/80') + ' ' + (className || '')}
  >
    Verify
  </a>
);

const Certificates = () => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active === null ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  const current = active === null ? null : certificates[active];

  return (
    <section id="certificates" className="relative bg-[#ff2a2a] pt-36 pb-36 px-6 md:px-12 overflow-hidden font-sans">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 z-0 overflow-hidden bg-white py-3"
      >
        <motion.div
          className="flex w-max whitespace-nowrap"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
        >
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#111111]">
              {[0, 1].map((r) => (
                <React.Fragment key={r}>
                  {TICKER_TOP.map((t) => (
                    <React.Fragment key={t}>
                      <span className="px-6">{t}</span>
                      <span className="text-[#ff2a2a]">✦</span>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 overflow-hidden bg-[#111111] py-3"
      >
        <motion.div
          className="flex w-max whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        >
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center text-sm md:text-base font-black uppercase tracking-[0.25em] text-white">
              {[0, 1].map((r) => (
                <React.Fragment key={r}>
                  {TICKER.map((t) => (
                    <React.Fragment key={t}>
                      <span className="px-6">{t}</span>
                      <span className="text-[#ff2a2a]">✦</span>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ staggerChildren: 0.1 }}
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-12 leading-[1.05] tracking-tight">
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.12em' }}>
            <motion.span
              style={{ display: 'block' }}
              variants={{ hidden: { y: '115%' }, show: { y: '0%' } }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              Certificates<span className="text-[#111111]">.</span>
            </motion.span>
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((c, i) => (
            <motion.div
              key={c.name}
              variants={{ hidden: { opacity: 0, y: 90, rotate: 8, scale: 0.92 }, show: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 90, damping: 13, mass: 0.9, opacity: { duration: 0.4 } } } }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <motion.div
                className="rounded-2xl bg-white p-3 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.55)] h-full flex flex-col"
                style={{ rotate: TILTS[i % TILTS.length] }}
                whileHover={{ rotate: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                {c.image ? (
                  <motion.button
                    type="button"
                    layoutId={'cert-img-' + i}
                    onClick={() => setActive(i)}
                    className="block w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in"
                    style={{ borderRadius: 12 }}
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </motion.button>
                ) : (
                  <div
                    className="flex w-full aspect-[4/3] items-center justify-center rounded-xl bg-[#111111] p-4 text-center text-sm font-bold text-white"
                  >
                    {c.issuer}
                  </div>
                )}

                <div className="mt-3 flex flex-1 flex-col">
                  <div className="text-sm md:text-base font-bold text-[#111111] leading-snug">{c.name}</div>
                  <div className="mt-1 text-xs text-black/60">{c.issuer}</div>
                  {c.link && (
                    <div className="mt-3">
                      <VerifyButton href={c.link} />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Popup (kept outside the animated wrapper so fixed positioning works) */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="cert-backdrop"
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 p-4 md:p-10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
          >
            <div
              className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                layoutId={'cert-img-' + active}
                className="overflow-hidden bg-white shadow-2xl"
                style={{ borderRadius: 16 }}
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="block max-h-[72vh] w-auto max-w-full object-contain"
                />
              </motion.div>

              <motion.div
                className="mt-4 flex w-full flex-wrap items-center justify-between gap-3 text-white"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <div>
                  <div className="text-base md:text-lg font-bold">{current.name}</div>
                  <div className="text-xs md:text-sm text-white/70">{current.issuer}</div>
                </div>
                {current.link && <VerifyButton href={current.link} light />}
              </motion.div>

              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute -top-3 -right-3 md:-top-5 md:-right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-[#111111] shadow-lg hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
