import React, { useState } from 'react';
import { SkillCategory, SkillLevel } from '../types';
import { Code, Cpu, Brain, BookOpen, Palette, Zap, Layers, Check, Sparkles, Command } from 'lucide-react';

interface Props {
  category: SkillCategory;
  defaultOpen?: boolean;
}

const getIcon = (iconName: string) => {
  switch(iconName) {
    case 'Code': return <Code className="w-6 h-6" />;
    case 'Cpu': return <Cpu className="w-6 h-6" />;
    case 'Brain': return <Brain className="w-6 h-6" />;
    case 'BookOpen': return <BookOpen className="w-6 h-6" />;
    case 'Palette': return <Palette className="w-6 h-6" />;
    case 'Zap': return <Zap className="w-6 h-6" />;
    default: return <Layers className="w-6 h-6" />;
  }
};

// Updated to map colors based on the Category ID for uniqueness
const getColorTheme = (categoryId: string) => {
  switch(categoryId) {
    case 'coding': // Blue
      return {
        borderColor: 'border-blue-500/30',
        iconBg: 'bg-blue-900/20',
        iconColor: 'text-blue-400',
        glow: 'shadow-[0_0_40px_rgba(59,130,246,0.1)]',
        accent: 'bg-blue-500',
        text: 'text-blue-300',
        tagBg: 'bg-blue-900/20',
        tagBorder: 'border-blue-500/20',
      };
    case 'technical': // Purple
      return {
        borderColor: 'border-purple-500/30',
        iconBg: 'bg-purple-900/20',
        iconColor: 'text-purple-400',
        glow: 'shadow-[0_0_40px_rgba(168,85,247,0.1)]',
        accent: 'bg-purple-500',
        text: 'text-purple-300',
        tagBg: 'bg-purple-900/20',
        tagBorder: 'border-purple-500/20',
      };
    case 'high-skills': // Cyan
      return {
        borderColor: 'border-cyan-500/30',
        iconBg: 'bg-cyan-900/20',
        iconColor: 'text-cyan-400',
        glow: 'shadow-[0_0_40px_rgba(6,182,212,0.1)]',
        accent: 'bg-cyan-500',
        text: 'text-cyan-300',
        tagBg: 'bg-cyan-900/20',
        tagBorder: 'border-cyan-500/20',
      };
    case 'soft-skills': // Emerald
      return {
        borderColor: 'border-emerald-500/30',
        iconBg: 'bg-emerald-900/20',
        iconColor: 'text-emerald-400',
        glow: 'shadow-[0_0_40px_rgba(16,185,129,0.1)]',
        accent: 'bg-emerald-500',
        text: 'text-emerald-300',
        tagBg: 'bg-emerald-900/20',
        tagBorder: 'border-emerald-500/20',
      };
    case 'habits': // Orange/Amber
      return {
        borderColor: 'border-orange-500/30',
        iconBg: 'bg-orange-900/20',
        iconColor: 'text-orange-400',
        glow: 'shadow-[0_0_40px_rgba(249,115,22,0.1)]',
        accent: 'bg-orange-500',
        text: 'text-orange-300',
        tagBg: 'bg-orange-900/20',
        tagBorder: 'border-orange-500/20',
      };
    case 'study': // Indigo
      return {
        borderColor: 'border-indigo-500/30',
        iconBg: 'bg-indigo-900/20',
        iconColor: 'text-indigo-400',
        glow: 'shadow-[0_0_40px_rgba(99,102,241,0.1)]',
        accent: 'bg-indigo-500',
        text: 'text-indigo-300',
        tagBg: 'bg-indigo-900/20',
        tagBorder: 'border-indigo-500/20',
      };
    case 'other': // Pink
      return {
        borderColor: 'border-pink-500/30',
        iconBg: 'bg-pink-900/20',
        iconColor: 'text-pink-400',
        glow: 'shadow-[0_0_40px_rgba(236,72,153,0.1)]',
        accent: 'bg-pink-500',
        text: 'text-pink-300',
        tagBg: 'bg-pink-900/20',
        tagBorder: 'border-pink-500/20',
      };
    case 'languages': // Rose
      return {
        borderColor: 'border-rose-500/30',
        iconBg: 'bg-rose-900/20',
        iconColor: 'text-rose-400',
        glow: 'shadow-[0_0_40px_rgba(244,63,94,0.1)]',
        accent: 'bg-rose-500',
        text: 'text-rose-300',
        tagBg: 'bg-rose-900/20',
        tagBorder: 'border-rose-500/20',
      };
    default: // Gray fallback
      return {
        borderColor: 'border-gray-700',
        iconBg: 'bg-gray-800',
        iconColor: 'text-gray-400',
        glow: 'shadow-none',
        accent: 'bg-gray-500',
        text: 'text-gray-300',
        tagBg: 'bg-gray-800',
        tagBorder: 'border-gray-700',
      };
  }
};

export const SkillCard: React.FC<Props> = ({ category, defaultOpen = true }) => {
  const theme = getColorTheme(category.id);
  const [isActive, setIsActive] = useState(false);
  
  // Double the skills for the seamless marquee effect (internal)
  const marqueeSkills = [...category.skills, ...category.skills];

  // Pick skills for the orbit (limit to prevent overcrowding)
  const orbitSkills = category.skills.slice(0, 12);
  const totalOrbitSkills = orbitSkills.length;
  // Duration of one full orbit loop in seconds
  const orbitDuration = 20; 

  return (
    <div 
      className={`relative w-full rounded-3xl transition-all duration-500 mb-12 last:mb-0 ${
        isActive ? 'z-40 scale-[1.02]' : 'z-10 hover:scale-[1.01]'
      }`}
    >
      {/* 
        Rectangular Orbit System 
        This container expands from the center when active.
        Skills are distributed along the timeline of the 'rect-orbit' animation using negative delays.
      */}
      <div 
        className={`absolute -inset-6 sm:-inset-8 z-0 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        {orbitSkills.map((skill, index) => {
          // Calculate delay so skills are evenly spaced on the rectangle
          const delay = -1 * (orbitDuration / totalOrbitSkills) * index;
          
          return (
            <div
              key={`orbit-${index}`}
              className={`absolute flex items-center justify-center px-3 py-1.5 rounded-full border text-[10px] md:text-xs font-bold whitespace-nowrap shadow-xl backdrop-blur-md animate-rect-orbit ${theme.tagBg} ${theme.tagBorder} ${theme.text} ${theme.glow}`}
              style={{
                animationDelay: `${delay}s`,
                // Initialize off-screen to prevent flash before animation takes over (though negative delay handles this usually)
                left: '0%', 
                top: '0%' 
              }}
            >
              {skill.name}
            </div>
          );
        })}
      </div>

      {/* Main Card Container */}
      <div 
        onClick={() => setIsActive(!isActive)}
        className={`relative z-10 w-full rounded-3xl border bg-[#0a0d14] overflow-hidden cursor-pointer transition-all duration-300 ${
          isActive ? `border-opacity-100 ${theme.borderColor} ${theme.glow}` : 'border-gray-800/60 hover:border-gray-700'
        }`}
      >
        {/* Background Gradient Spot */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 ${
          isActive ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'
        } ${theme.accent}`} />

        <div className="p-6 md:p-8 relative z-20">
          
          {/* Header Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className={`p-3.5 rounded-2xl ${theme.iconBg} border border-white/5 ${theme.iconColor}`}>
                {getIcon(category.icon)}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                  {category.description}
                </p>
              </div>
            </div>

            {/* Highlights List */}
            {category.keyHighlights && (
              <div className="space-y-3 mt-2 pl-1">
                {category.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check size={16} className={`mt-0.5 ${theme.text}`} strokeWidth={3} />
                    <span className="leading-relaxed font-light">{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Competencies Section (Internal Marquee) */}
          <div className={`mt-8 pt-6 border-t border-gray-800/50 transition-opacity duration-300 ${isActive ? 'opacity-20' : 'opacity-100'}`}>
             <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
               <Command size={12} /> Competencies
             </div>
             
             {/* Marquee Container */}
             <div className="relative w-full overflow-hidden mask-linear-gradient">
               {/* Fade masks for edges */}
               <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0d14] to-transparent z-10 pointer-events-none"></div>
               <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0d14] to-transparent z-10 pointer-events-none"></div>

               <div className="flex w-max animate-scroll pause-animation">
                 {marqueeSkills.map((skill, index) => (
                   <div 
                     key={`${index}-${skill.name}`}
                     className={`flex-shrink-0 mx-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-colors ${theme.tagBg} ${theme.tagBorder} ${theme.text} bg-opacity-30`}
                   >
                     {skill.name}
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};