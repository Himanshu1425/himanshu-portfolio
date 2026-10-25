import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { projects } from '../data/projects';

const spots = [
  { top: 40, side: 'md:absolute md:right-[5%] lg:right-[10%]', rot: 'rotate-1 md:rotate-[1.5deg]', aos: 'fade-left' },
  { top: 620, side: 'md:absolute md:left-[5%] lg:left-[10%]', rot: '-rotate-1 md:-rotate-[1.5deg]', aos: 'fade-right' },
  { top: 1070, side: 'md:absolute md:right-[5%] lg:right-[10%]', rot: 'rotate-[0.5deg] md:rotate-1', aos: 'fade-left' },
  { top: 1520, side: 'md:absolute md:left-[5%] lg:left-[10%]', rot: '-rotate-[0.5deg] md:-rotate-1', aos: 'fade-right' },
  { top: 1970, side: 'md:absolute md:right-[5%] lg:right-[10%]', rot: 'rotate-1 md:rotate-[1.5deg]', aos: 'fade-left' },
  { top: 2420, side: 'md:absolute md:left-[5%] lg:left-[10%]', rot: '-rotate-1 md:-rotate-[1.5deg]', aos: 'fade-right' },
];

const linkLabels = { code: 'Code', live: 'Live app', landing: 'Landing page', landingCode: 'Landing page code' };

const TagCard = ({ project, index, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const spot = spots[index];
  const entries = Object.entries(project.links).filter(([, url]) => url);
  const single = entries.length === 1;

  useMotionValueEvent(pathLength, 'change', (latest) => {
    if (!ref.current || !containerRef.current) return;
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const triggerY = cardRect.top - containerRect.top + 50;
    const lineTipY = latest * containerRect.height;
    if (lineTipY >= triggerY && !isActive) setIsActive(true);
    else if (lineTipY < triggerY && isActive) setIsActive(false);
  });

  const Wrapper = single ? 'a' : 'div';
  const wrapperProps = single ? { href: entries[0][1], target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Wrapper
      ref={ref}
      {...wrapperProps}
      data-aos={spot.aos}
      data-aos-delay={100 + index * 50}
      style={{ top: spot.top }}
      className={`block w-80 sm:w-96 rounded-[2rem] p-2 relative flex flex-col items-center hover:scale-[1.02] transition-all duration-700 z-10 ${spot.side} ${spot.rot} ${
        isActive
          ? 'bg-[#ff2a2a] border-red-400 shadow-[0_20px_50px_rgba(255,42,42,0.4)]'
          : 'bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
      }`}
    >
      <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute top-4 border border-gray-300 z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-full opacity-20"></div>
      </div>

      <div className={`w-full h-full rounded-[1.5rem] mt-8 p-8 flex flex-col min-h-[260px] transition-colors duration-700 ${isActive ? 'bg-red-700/50' : 'bg-[#f4f4f4]'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xl font-bold font-serif italic transition-colors duration-700 ${isActive ? 'text-red-200' : 'text-gray-400'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          {single && <span className={`text-lg leading-none transition-colors duration-700 ${isActive ? 'text-white' : 'text-gray-400'}`}>↗</span>}
        </div>

        <h3 className={`text-2xl font-black mb-3 tracking-tight leading-snug transition-colors duration-700 ${isActive ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>

        <p className={`text-[15px] leading-relaxed font-medium transition-colors duration-700 ${isActive ? 'text-red-100' : 'text-gray-500'}`}>
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span key={t} className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors duration-700 ${isActive ? 'border-red-200/40 text-red-100' : 'border-black/10 text-black/60'}`}>
              {t}
            </span>
          ))}
        </div>

        {entries.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entries.map(([k, url]) => (
              <a key={k} href={url} target="_blank" rel="noopener noreferrer"
                 className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${isActive ? 'border-white text-white hover:bg-white hover:text-[#ff2a2a]' : 'border-black text-black hover:bg-black hover:text-white'}`}>
                {linkLabels[k]} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const PATH =
  'M 733,240 C 733,530 266,530 266,820 C 266,1045 733,1045 733,1270 C 733,1495 266,1495 266,1720 C 266,1945 733,1945 733,2170 C 733,2395 266,2395 266,2620';

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-white pt-24 pb-10 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto relative md:h-[3000px]">
        <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-16 md:mb-0">
          <div className="flex items-center gap-5 mb-10 text-2xl md:text-3xl font-black uppercase tracking-[0.25em] text-[#ff2a2a]">
            <span className="block h-[4px] w-16 md:w-24 bg-[#ff2a2a]" />
            Projects
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight relative">
            Things I’ve built, from idea to deployed product
            <svg className="absolute -bottom-10 right-10 w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 4 Q 10 10 15 15 M 15 15 L 10 15 M 15 15 L 15 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-sm font-medium leading-relaxed">
            A selection of agentic AI, GenAI and full-stack work, from multi-agent systems to real-time computer vision.
          </p>
        </div>

        <svg className="hidden md:block absolute top-0 left-0 w-full h-[3000px] pointer-events-none z-0" viewBox="0 0 1000 3000" preserveAspectRatio="none">
          <path d={PATH} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 10" />
          <mask id="projects-path-mask">
            <motion.path d={PATH} fill="none" stroke="white" strokeWidth="20" style={{ pathLength }} />
          </mask>
          <path d={PATH} fill="none" stroke="black" strokeWidth="2" strokeDasharray="8 10" mask="url(#projects-path-mask)" className="drop-shadow-sm" />
        </svg>

        <svg className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0" viewBox="0 0 4 100" preserveAspectRatio="none">
          <path d="M 2,0 L 2,100" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
          <mask id="projects-path-mask-mobile">
            <motion.path d="M 2,0 L 2,100" fill="none" stroke="white" strokeWidth="4" style={{ pathLength }} vectorEffect="non-scaling-stroke" />
          </mask>
          <path d="M 2,0 L 2,100" fill="none" stroke="black" strokeWidth="4" strokeDasharray="4 6" mask="url(#projects-path-mask-mobile)" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
          {projects.slice(0, 6).map((p, i) => (
            <TagCard key={p.id} project={p} index={i} pathLength={pathLength} containerRef={containerRef} />
          ))}

          <div data-aos="fade-in" data-aos-delay="600" className="hidden md:block absolute top-[2880px] left-[48%] font-['Caveat',cursive] text-3xl text-gray-600 rotate-6">
            Always building.
          </div>
        </div>
      </div>
    </section>
  );
}
