import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh]">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          <p>GenAI and Agentic AI Systems</p>
          <p>AI/ML and Full Stack Development</p>
          <p>RAG, LLMs and MCP</p>
        </div>
        
        <div className="flex flex-col gap-1 md:items-center">
          <p>Open to AI/ML and GenAI roles</p>
          <a href="#projects" className="underline hover:text-white transition-colors mt-1 underline-offset-4 decoration-1">View Work</a>
        </div>
        
        <div className="flex flex-col gap-1 md:items-end">
          <p>Available for Hire</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Middle Huge Text */}
      <div className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden">
        <h2 className="text-[18vw] md:text-[16vw] leading-none font-sans font-bold tracking-tighter lowercase select-none text-[#f4f4f4] w-full text-center">
          himanshu raj
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-6">
          <a href="#contact" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 font-bold">Contact</a>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            &copy; {new Date().getFullYear()} Himanshu Raj | Built with React
          </p>
        </div>
        
        <div className="md:col-span-2 flex flex-row flex-wrap items-end gap-8 md:gap-10 md:justify-end">
          <a href="mailto:rishisinghpat323@gmail.com" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 lowercase">rishisinghpat323@gmail.com</a>
          <a href="https://www.linkedin.com/in/himanshu-raj2002" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors underline-offset-4 decoration-1">LinkedIn</a>
          <a href="https://github.com/Himanshu1425" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors underline-offset-4 decoration-1">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
