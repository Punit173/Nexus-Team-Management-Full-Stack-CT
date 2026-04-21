import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Users, Hexagon, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4 relative z-10">
      {/* Hero Section */}
      <div className="fade-in-up max-w-4xl relative">
        
        {/* Glowing floating hexagons */}
        <Hexagon className="absolute -top-12 -left-12 text-teal-500/20 w-24 h-24 rotate-12 animate-pulse" strokeWidth={1} />
        <Hexagon className="absolute top-24 -right-16 text-cyan-500/20 w-32 h-32 -rotate-12" strokeWidth={1} style={{ animation: 'float 8s infinite ease-in-out' }} />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm font-semibold mb-8 group transition-all hover:bg-teal-500/20">
          <Hexagon size={16} className="text-teal-400 group-hover:rotate-90 transition-transform duration-500" />
          <span className="tracking-wide">Nexus Team Management Platform</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
          <span className="text-slate-100">Elevate Your</span>
          <br />
          <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(45,212,191,0.2)]">
            Dream Directory
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed fade-in-up-delay-1 font-medium">
          The centralized, hyper-fast platform to organize, manage, and view all your student team members with a stunning modern aesthetic.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-6 fade-in-up-delay-2">
          <Link to="/add" className="btn-primary flex items-center gap-3 text-base group w-full sm:w-auto justify-center">
            <UserPlus size={20} />
            <span>Add New Member</span>
            <ArrowRight size={18} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
          </Link>

          <Link to="/members" className="btn-secondary flex items-center gap-3 text-base w-full sm:w-auto justify-center">
            <Users size={20} />
            <span>View Directory</span>
          </Link>
        </div>
      </div>

      {/* Stats Section / Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 mt-24 max-w-5xl mx-auto fade-in-up-delay-3">
        {[
          { label: 'Instant Setup', icon: '⚡', desc: 'Add members in seconds' },
          { label: 'Cloud Storage', icon: '☁️', desc: 'High-res image hosting' },
          { label: 'Glass UI', icon: '✨', desc: 'Premium fluid interface' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 text-center transform transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto bg-slate-800/50 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-slate-700/50 shadow-inner">
              {stat.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{stat.label}</h3>
            <p className="text-sm text-slate-400 font-medium">{stat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
