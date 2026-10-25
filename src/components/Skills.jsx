import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { orbits, categories } from '../data/skills';

const logos = import.meta.glob('../assets/skills/*.svg', { eager: true, import: 'default' });

const tones = {
  red: { ring: 'rgba(255, 42, 42, 0.55)', edge: '#ff2a2a' },
  white: { ring: 'rgba(255, 255, 255, 0.4)', edge: '#ffffff' },
  grey: { ring: 'rgba(156, 163, 175, 0.45)', edge: '#9ca3af' },
};

// Ring radius as a fraction of the stage width, plus a start angle so rings do not line up
const radii = { core: 0.2, backend: 0.33, cloud: 0.468 };
const offsets = { core: 0, backend: 20, cloud: 10 };
const hotTitles = ['GenAI & Agents', 'Machine Learning', 'Computer Vision'];
const chipLogos = {
  'Python': 'python', 'TypeScript': 'typescript', 'JavaScript': 'javascript', 'Java': 'java',
  'LangChain': 'langchain', 'Scikit-learn': 'scikitlearn', 'TensorFlow': 'tensorflow', 'PyTorch': 'pytorch',
  'FastAPI': 'fastapi', 'Flask': 'flask', 'Node.js': 'nodejs', 'React': 'react', 'Next.js': 'nextjs',
  'Pandas': 'pandas', 'NumPy': 'numpy', 'OpenCV': 'opencv',
  'MySQL': 'mysql', 'PostgreSQL': 'postgresql', 'MongoDB': 'mongodb', 'SQLite': 'sqlite',
  'AWS (EC2, S3)': 'aws', 'Google Cloud (Vertex AI)': 'googlecloud', 'Docker': 'docker', 'Kubernetes': 'kubernetes', 'Git': 'git',
};

const css = `
@keyframes orbit-spin { to { transform: rotate(360deg); } }

.orbit-stage { position: relative; width: 100%; max-width: 620px; aspect-ratio: 1 / 1; margin: 0 auto; container-type: inline-size; }

.orbit-ring {
  position: absolute;
  border: 1px dashed;
  border-radius: 50%;
  pointer-events: none;
  animation: orbit-spin linear infinite;
  --tile: max(34px, 9cqw);
}

.orbit-item {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--tile);
  height: var(--tile);
  margin: calc(var(--tile) / -2) 0 0 calc(var(--tile) / -2);
  pointer-events: auto;
  cursor: default;
  outline: none;
}

.orbit-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid;
  background: #151515;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: orbit-spin linear infinite;
}

.orbit-inner img { width: 56%; height: 56%; object-fit: contain; }

.orbit-tip {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  font: 500 12px ui-monospace, SFMono-Regular, Menlo, monospace;
  padding: 4px 10px;
  border-radius: 999px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
}

.orbit-item:hover, .orbit-item:focus-visible { z-index: 20; }
.orbit-item:hover .orbit-tip, .orbit-item:focus-visible .orbit-tip { opacity: 1; }
.orbit-item:focus-visible .orbit-inner { outline: 2px solid #ffffff; outline-offset: 3px; }
.orbit-ring:has(.orbit-item:hover), .orbit-ring:has(.orbit-item:focus-visible) { z-index: 10; }

.orbit-stage:has(.orbit-item:hover) .orbit-ring,
.orbit-stage:has(.orbit-item:hover) .orbit-inner,
.orbit-stage:has(.orbit-item:focus-visible) .orbit-ring,
.orbit-stage:has(.orbit-item:focus-visible) .orbit-inner { animation-play-state: paused; }

.orbit-item { transition: opacity 0.25s; }
.orbit-item.is-dim { opacity: 0.2; }
.orbit-item.is-lit { z-index: 20; }
.orbit-item.is-lit .orbit-tip { opacity: 1; }
.orbit-item.is-lit .orbit-inner { box-shadow: 0 0 14px rgba(255, 255, 255, 0.55); }
.orbit-stage.linking .orbit-ring,
.orbit-stage.linking .orbit-inner { animation-play-state: paused; }

.orbit-core {
  position: absolute;
  left: calc(50% - 9cqw);
  top: calc(50% - 9cqw);
  width: 18cqw;
  height: 18cqw;
  border-radius: 50%;
  background: #ff2a2a;
  color: #ffffff;
  font-weight: 900;
  letter-spacing: -0.02em;
  font-size: max(14px, 3.6cqw);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5cqw rgba(255, 42, 42, 0.45), 0 0 14cqw rgba(255, 42, 42, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .orbit-stage .orbit-ring, .orbit-stage .orbit-inner { animation: none; }
}
`;

function Ring({ orbit, lit, onLogo }) {
  const k = radii[orbit.id];
  const tone = tones[orbit.tone];
  const n = orbit.items.length;
  const forward = orbit.direction === 1;

  return (
    <div
      className="orbit-ring"
      style={{
        width: `${k * 200}cqw`,
        height: `${k * 200}cqw`,
        left: `${50 - k * 100}cqw`,
        top: `${50 - k * 100}cqw`,
        borderColor: tone.ring,
        animationDuration: `${orbit.duration}s`,
        animationDirection: forward ? 'normal' : 'reverse',
      }}
    >
      {orbit.items.map((item, i) => {
        const angle = offsets[orbit.id] + (360 / n) * i;
        return (
          <div
            key={item.name}
            className={`orbit-item${lit ? (lit.has(item.logo) ? ' is-lit' : ' is-dim') : ''}`}
            onMouseEnter={() => onLogo(item.logo)}
            onMouseLeave={() => onLogo(null)}
            onFocus={() => onLogo(item.logo)}
            onBlur={() => onLogo(null)}
            tabIndex={0}
            aria-label={item.name}
            style={{ transform: `rotate(${angle}deg) translateX(${k * 100}cqw) rotate(${-angle}deg)` }}
          >
            <div
              className="orbit-inner"
              style={{
                borderColor: tone.edge,
                animationDuration: `${orbit.duration}s`,
                animationDirection: forward ? 'reverse' : 'normal',
              }}
            >
              <img src={logos[`../assets/skills/${item.logo}.svg`]} alt="" draggable={false} />
              <span className="orbit-tip">{item.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const [activeCat, setActiveCat] = useState(null);
  const [activeLogo, setActiveLogo] = useState(null);
  const litSet = activeCat ? new Set(activeCat.items.map((n) => chipLogos[n]).filter(Boolean)) : null;
  const lit = litSet && litSet.size > 0 ? litSet : null;
  return (
    <section id="skills" className="w-full bg-[#111111] text-[#f4f4f4] px-6 md:px-12 py-24 md:py-32">
      <style>{css}</style>

      <div className="max-w-7xl mx-auto">
        <header className="mb-14 md:mb-20">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            THE STACK<span className="text-[#ff2a2a]">.</span>
          </h2>
          <p className="mt-5 font-mono text-sm md:text-base text-white/60">
            three orbits, one workflow: model, serve, ship
          </p>
        </header>

        <div className="grid lg:grid-cols-[5fr_6fr] gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block lg:sticky lg:top-28"
          >
            <div className={`orbit-stage${lit ? ' linking' : ''}`}>
              {orbits.map((o) => (
                <Ring key={o.id} orbit={o} lit={lit} onLogo={setActiveLogo} />
              ))}
              <div className="orbit-core">AI/ML</div>
            </div>

            <p className="mt-10 font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">Orbit rings</p>
            <ul className="mt-3 flex flex-col gap-3 font-mono text-xs text-white/70">
              {orbits.map((o) => (
                <li key={o.id} className="flex items-center gap-3">
                  <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: tones[o.tone].edge }} />
                  {o.label}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="rounded-[2rem] border border-white/10 bg-transparent p-8 md:p-10">
            <div className="sm:columns-2 gap-5">
              {categories.map((c, i) => {
                const hot = hotTitles.includes(c.title);
                return (
                  <div
                    key={c.title}
                    onMouseEnter={() => setActiveCat(c)}
                    onMouseLeave={() => setActiveCat(null)}
                    className={`break-inside-avoid mb-5 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.6deg] ${
                      hot
                        ? 'border-[#ff6a5e]/50 bg-[#e8443a] shadow-[0_10px_40px_-12px_rgba(255,42,42,0.55)]'
                        : 'border-white/70 bg-[#ececec] shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-mono text-sm tracking-[0.15em] uppercase ${hot ? 'text-white' : 'text-[#111111]'}`}>
                        {c.title}
                      </h3>
                      <span className={`italic font-serif text-sm ${hot ? 'text-white/80' : 'text-black/40'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {c.items.map((s) => (
                        <li
                          key={s}
                          className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border relative transition-transform duration-200 ${chipLogos[s] && chipLogos[s] === activeLogo ? 'scale-110 z-10 ring-2 ring-[#111111] shadow-lg' : ''} ${
                            hot ? 'border-white/50 bg-black/10 text-white' : 'border-black/15 bg-white text-[#222222]'
                          }`}
                        >
                          {chipLogos[s] && (
                            <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#151515] shrink-0">
                              <img src={logos['../assets/skills/' + chipLogos[s] + '.svg']} alt="" draggable={false} className="w-[11px] h-[11px] object-contain" />
                            </span>
                          )}
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
