import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useInView, animate } from 'framer-motion';
import himanshuPhoto from '../assets/about/himanshu.png';

const email = 'rishisinghpat323@gmail.com';

const icons = {
  cap: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
  code: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  doc: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  layers: 'M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z',
};

const stats = [
  { icon: 'cap', big: 'B.Tech', word: 'CSE', label: 'VIT Chennai', sub: '2022–2026' },
  { icon: 'code', big: '313', word: 'Solved', label: 'LeetCode', sub: 'DSA + SQL (Java)' },
  { icon: 'doc', big: '1', word: 'Presented', label: 'IEEE AIIoT 2024', sub: 'Research paper' },
  { icon: 'layers', big: '6', word: 'Built', label: 'Projects', sub: 'AI and full-stack' },
];

const Key = ({ children }) => (
  <span className="font-black text-white">{children}</span>
);

const P1 = [
  'Hi, my name is ',
  { text: 'Himanshu Raj', kind: 'bold', tail: ',' },
  ' an Applied AI Engineer based in Bangalore. I build ',
  { text: 'agentic AI', kind: 'key' },
  ' systems, ',
  { text: 'RAG', kind: 'key' },
  ' pipelines and ',
  { text: 'GenAI', kind: 'key' },
  ' applications, taking them from model to deployed product.',
];

const P2 = [
  'On the ',
  { text: 'Full-Stack', kind: 'key' },
  ' side I work with FastAPI, Node.js, React and Next.js. I have solved 313 problems on LeetCode (DSA and SQL, in Java) and presented research at IEEE AIIoT 2024.',
];

const Unit = ({ u, progress, range }) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  const bgSize = useTransform(progress, range, ['0% 100%', '100% 100%']);
  const isKey = u.kind === 'key';
  const style = isKey
    ? {
        opacity,
      }
    : { opacity };
  return (
    <>
      <motion.span style={style} className={u.kind ? 'font-black text-white' : ''}>{u.text}</motion.span>
      {u.tail}{' '}
    </>
  );
};

const Reveal = ({ tokens, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] });
  const units = [];
  tokens.forEach((tk) => {
    if (typeof tk === 'string') {
      tk.split(' ').filter(Boolean).forEach((w) => units.push({ text: w }));
    } else {
      units.push(tk);
    }
  });
  const n = units.length;
  return (
    <p ref={ref} className={className}>
      {units.map((u, i) => {
        const start = (i / n) * 0.8;
        return <Unit key={i} u={u} progress={scrollYProgress} range={[start, start + 0.2]} />;
      })}
    </p>
  );
};

const Count = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const isNum = /^\d+$/.test(value);
  const target = isNum ? parseInt(value, 10) : 0;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!isNum || !inView) return;
    const c = animate(0, target, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, isNum, target]);
  return <span ref={ref}>{isNum ? n : value}</span>;
};

const About = () => {
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-160, 160], [-16, 16]);
  return (
    <section id="about" className="bg-[#ff2a2a] pt-20 pb-40 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

        {/* Left Side: ID Badge */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">
          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            {/* Lanyard string */}
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-[#111111] transform -translate-x-1/2 shadow-inner z-0"></div>
            {/* Lanyard clip */}
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-300 rounded border border-gray-400 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]"></div>

            {/* Badge Card */}
            <motion.div
              className="w-full max-w-[280px] relative z-20"
              style={{ transformOrigin: '50% 0%' }}
              animate={{ rotate: [-4, 2] }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            >
            <motion.div
              className="w-full cursor-grab active:cursor-grabbing"
              style={{ x: dragX, rotate: dragRotate, transformOrigin: '50% 0%' }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.4}
              dragSnapToOrigin
              dragTransition={{ bounceStiffness: 120, bounceDamping: 8 }}
              whileTap={{ scale: 1.02 }}
            >
            <div className="bg-white w-full max-w-[280px] rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.35)] relative z-20">
              {/* Cutout Hole */}
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-white rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
                <div className="w-8 h-2 bg-black/15 rounded-full shadow-inner"></div>
              </div>
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-200">
                <img
                  src={himanshuPhoto}
                  alt="Himanshu Raj"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '58% 30%' }}
                />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-semibold text-[#111111]">AI Engineer</span>
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-semibold text-[#111111]">Full-Stack</span>
                </div>
              </div>
            </div>
            </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Info Content */}
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white mt-8 md:mt-0 relative z-20">

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] mb-6 leading-[1.05] tracking-tight"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          >
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.12em' }}>
              <motion.span
                style={{ display: 'block' }}
                variants={{ hidden: { y: '115%' }, show: { y: '0%' } }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              >
                AI systems that
              </motion.span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.3em', marginBottom: '-0.18em' }}>
              <motion.span
                style={{ display: 'block' }}
                variants={{ hidden: { y: '115%' }, show: { y: '0%' } }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              >
                actually{' '}
                ship.
              </motion.span>
            </span>
          </motion.h2>

          <Reveal tokens={P1} className="text-lg font-semibold mb-5 leading-relaxed max-w-3xl text-white" />

          <Reveal tokens={P2} className="text-lg font-semibold mb-8 leading-relaxed max-w-3xl text-white" />

          {/* Info pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="inline-flex items-center rounded-full border border-white/50 bg-white/15 px-4 py-2 font-mono text-xs md:text-sm text-white">
              Bangalore, India
            </span>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center rounded-full border border-white/50 bg-white/15 px-4 py-2 font-mono text-xs md:text-sm text-white hover:bg-white/30 transition-colors"
            >
              {email}
            </a>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-aos="zoom-in"
                data-aos-delay={300 + i * 120}
                className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:shadow-[0_16px_34px_-14px_rgba(0,0,0,0.6)] transition-all duration-300"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff2a2a]/10 text-[#ff2a2a]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d={icons[s.icon]} /></svg>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl lg:text-3xl font-black text-[#111111] leading-none"><Count value={s.big} /></span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-black/50">{s.word}</span>
                </div>
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-[#ff2a2a]">{s.label}</div>
                <div className="mt-1 text-xs text-black/60">{s.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Torn paper divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Decorative stars */}
      <div className="absolute top-10 right-10 md:right-20 text-black opacity-30 animate-pulse">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
      <div className="absolute bottom-32 left-4 md:left-20 text-black opacity-30 animate-pulse" style={{ animationDelay: '1s' }}>
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
    </section>
  );
};

export default About;
