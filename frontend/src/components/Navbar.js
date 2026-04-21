import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Home, UserPlus, Menu, X, Hexagon } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/members', label: 'Directory', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Floating Pill Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 py-4 md:py-6"
        style={{
          pointerEvents: 'none', // let clicks pass through the wrapper
        }}
      >
        <div 
          className="mx-auto max-w-5xl transition-all duration-500 ease-in-out"
          style={{
            pointerEvents: 'auto',
            transform: scrolled ? 'scale(0.98) translateY(-8px)' : 'scale(1) translateY(0)',
          }}
        >
          <div
            className="flex items-center justify-between px-5 md:px-6 h-16 md:h-18 rounded-3xl md:rounded-full relative"
            style={{
              background: scrolled 
                ? 'rgba(15, 23, 42, 0.75)' 
                : 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: scrolled 
                ? '0 20px 40px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' 
                : '0 10px 30px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Logo area */}
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative flex items-center justify-center w-10 h-10">
                <Hexagon 
                  size={32} 
                  strokeWidth={1.5}
                  className="text-teal-400 absolute transition-transform duration-700 ease-out group-hover:rotate-90 group-hover:scale-110" 
                />
                <div className="w-4 h-4 bg-teal-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(45,212,191,0.8)]" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-bold tracking-wide text-white leading-tight">
                  Nexus<span className="text-teal-400">Team</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (Center) */}
            <nav className="hidden md:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-2 bg-slate-800/50 p-1.5 rounded-full border border-slate-700/50">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="relative group px-5 py-2 rounded-full overflow-hidden transition-colors duration-300"
                    style={{
                      color: active ? '#fff' : '#94a3b8',
                    }}
                  >
                    {/* Hover & Active Background */}
                    <div 
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: active ? 'linear-gradient(to right, #0d9488, #14b8a6)' : 'rgba(255,255,255,0.05)',
                        opacity: active ? 1 : 0,
                      }}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/5" />
                    
                    {/* Link Content */}
                    <div className="relative z-10 flex items-center gap-2 font-medium text-sm">
                      <Icon size={16} className={active ? "text-teal-100" : "text-slate-400 group-hover:text-slate-200"} />
                      {link.label}
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Primary Action (Right) */}
            <div className="hidden md:flex items-center z-10">
              <Link
                to="/add"
                className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300"
                style={{
                  color: location.pathname === '/add' ? '#fff' : '#0f172a',
                }}
              >
                {/* Button Background */}
                <div 
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{
                    background: location.pathname === '/add' 
                      ? 'linear-gradient(135deg, #0f172a, #1e293b)'
                      : 'linear-gradient(135deg, #2dd4bf, #0ea5e9)',
                    border: location.pathname === '/add' ? '1px solid #2dd4bf' : 'none',
                  }}
                />
                
                {/* Button Glow on Hover */}
                {!isActive('/add') && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(45,212,191,0.6)]" />
                )}

                <div className="relative z-10 flex items-center gap-2">
                  <UserPlus size={16} className={location.pathname === '/add' ? 'text-teal-400' : 'text-slate-900'} />
                  <span>New Member</span>
                </div>
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="md:hidden relative z-10 p-2.5 rounded-full transition-all duration-300 bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div
                className="transition-transform duration-300 ease-in-out text-teal-400"
                style={{ transform: mobileOpen ? 'rotate(180deg)' : 'rotate(0)' }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
          
          {/* Mobile Dropdown Menu */}
          <div
            className="md:hidden mt-3 rounded-2xl overflow-hidden transition-all duration-400 ease-in-out origin-top"
            style={{
              maxHeight: mobileOpen ? '400px' : '0',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'scaleY(1)' : 'scaleY(0.95)',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: mobileOpen ? '1px solid rgba(45, 212, 191, 0.2)' : 'none',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div className="p-4 flex flex-col gap-2">
              {[...navLinks, { to: '/add', label: 'Add New Member', icon: UserPlus }].map((link, i) => {
                const active = isActive(link.to);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300"
                    style={{
                      background: active ? 'rgba(45, 212, 191, 0.15)' : 'transparent',
                      color: active ? '#2dd4bf' : '#94a3b8',
                      transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: mobileOpen ? 1 : 0,
                      transitionDelay: `${i * 50}ms`,
                    }}
                  >
                    <Icon size={18} className={active ? "text-teal-400" : "text-slate-400"} />
                    <span className="font-medium">{link.label}</span>
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer to push content down since navbar is fixed */}
      <div className="h-24 md:h-32" />
    </>
  );
};

export default Navbar;
