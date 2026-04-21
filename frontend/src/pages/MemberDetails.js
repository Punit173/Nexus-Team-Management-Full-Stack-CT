import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft, Mail, Briefcase, Calendar, User, Hexagon } from 'lucide-react';
import api from '../services/api';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await api.get(`/members/${id}`);
        setMember(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile. The user may have been redacted or does not exist.');
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[55vh]">
        <div className="w-20 h-20 relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 border-t-2 border-teal-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-l-2 border-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <Loader2 className="w-8 h-8 text-white relative z-10 animate-pulse" />
        </div>
        <p className="text-slate-300 font-bold text-lg tracking-wide">Decrypting Profile</p>
      </div>
    );
  }

  // Error State
  if (error || !member) {
    return (
      <div className="max-w-xl mx-auto mt-16 text-center fade-in-up">
        <div className="glass-card p-10" style={{ transform: 'none' }}>
          <div className="w-24 h-24 mx-auto rounded-full bg-rose-500/10 flex items-center justify-center mb-6 border-2 border-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.15)]">
            <AlertCircle className="w-12 h-12 text-rose-500" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Profile Not Found</h3>
          <p className="text-slate-400 text-sm mb-8 font-medium">{error}</p>
          <button
            onClick={() => navigate('/members')}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Return to Directory</span>
          </button>
        </div>
      </div>
    );
  }

  const joinDate = new Date(member.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Info item component - Redesigned
  const InfoItem = ({ icon: Icon, label, value, href, theme }) => {
    // Theme mapping for teal/cyan aesthetic
    const themeStyles = {
      teal: { bg: 'rgba(20, 184, 166, 0.1)', color: '#2dd4bf', border: 'rgba(20, 184, 166, 0.2)' },
      cyan: { bg: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee', border: 'rgba(6, 182, 212, 0.2)' },
      sky:  { bg: 'rgba(14, 165, 233, 0.1)', color: '#38bdf8', border: 'rgba(14, 165, 233, 0.2)' },
      emerald: { bg: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: 'rgba(16, 185, 129, 0.2)' },
    }[theme];

    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 rounded-2xl transition-all duration-300 hover:bg-slate-800/80 border border-transparent hover:border-slate-700/50 group">
        <div className="flex items-center gap-4 sm:w-1/3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
            style={{ background: themeStyles.bg, border: `1px solid ${themeStyles.border}` }}
          >
            <Icon className="w-5 h-5" style={{ color: themeStyles.color }} strokeWidth={2} />
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
        </div>
        <div className="sm:w-2/3">
          {href ? (
            <a href={href} className="inline-flex items-center text-lg font-bold transition-all" style={{ color: themeStyles.color }}>
              <span className="hover:underline underline-offset-4">{value}</span>
            </a>
          ) : (
            <p className="text-white font-bold text-lg tracking-tight">{value}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 fade-in-up relative z-10 px-4 sm:px-0">
      
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/members"
          className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 font-semibold text-sm group transition-all duration-300 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
          Directory Overview
        </Link>
      </div>

      <div className="glass-card overflow-hidden shadow-2xl relative" style={{ transform: 'none', borderRadius: '32px' }}>
        
        {/* Hero Geometric Art Banner */}
        <div className="h-48 sm:h-64 relative overflow-hidden bg-slate-900">
          {/* Base gradient */}
          <div className="absolute inset-0 top-0 bg-gradient-to-br from-teal-500 via-cyan-600 to-sky-800 opacity-90"></div>
          
          {/* Geometric shapes pattern */}
          <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          {/* Light sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
          
          {/* Decor overlay shapes */}
          <Hexagon className="absolute -top-10 -right-4 w-40 h-40 text-white/10 rotate-12" strokeWidth={1} />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full border-[15px] border-white/5 blur-[2px]"></div>
        </div>

        {/* Profile Content Section */}
        <div className="px-6 sm:px-12 pb-12 relative z-10 bg-slate-900/60 backdrop-blur-xl">
          
          {/* Avatar & Header Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 -mt-20 sm:-mt-24 mb-12">
            {/* Avatar Hexagon wrap */}
            <div className="relative group">
              <div className="absolute inset-0 bg-teal-400 rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div 
                className="w-40 h-40 rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-slate-900 bg-slate-800"
              >
                <img
                  src={`http://localhost:5000/uploads/${member.image}`}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=0d9488&color=fff&size=300'; }}
                />
              </div>
            </div>

            {/* Title & Badge */}
            <div className="text-center sm:text-left pb-3 mt-4 sm:mt-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-md">
                    {member.name}
                  </h1>
                  <span className="badge badge-teal text-sm py-1.5 px-4">{member.role}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-700/50 mb-10"></div>

          {/* Dossier Info Section */}
          <div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <Hexagon className="w-5 h-5 text-teal-500" strokeWidth={2.5}/>
              Official Dossier
            </h3>
            
            <div className="grid grid-cols-1 gap-2 bg-slate-900/50 p-2 sm:p-4 rounded-3xl border border-slate-800">
              <InfoItem
                icon={User}
                label="Identity Name"
                value={member.name}
                theme="teal"
              />
              
              <div className="h-px bg-slate-800/80 mx-6"></div>
              
              <InfoItem
                icon={Briefcase}
                label="Assignment"
                value={member.role}
                theme="cyan"
              />
              
              <div className="h-px bg-slate-800/80 mx-6"></div>
              
              <InfoItem
                icon={Mail}
                label="Comms Channel"
                value={member.email}
                href={`mailto:${member.email}`}
                theme="sky"
              />
              
              <div className="h-px bg-slate-800/80 mx-6"></div>
              
              <InfoItem
                icon={Calendar}
                label="Induction Date"
                value={joinDate}
                theme="emerald"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
