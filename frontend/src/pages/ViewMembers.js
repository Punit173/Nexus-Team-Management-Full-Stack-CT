import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle, Eye, Mail, UserPlus, Users, Hexagon } from 'lucide-react';
import api from '../services/api';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get('/members');
        setMembers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch members. Please ensure the backend server is running.');
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[55vh]">
        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl pulse-glow"></div>
          <Hexagon className="w-12 h-12 text-teal-400 absolute rotate animate-spin" style={{ animationDuration: '3s' }} strokeWidth={1.5} />
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
        <h2 className="text-white font-bold text-xl drop-shadow-md">Loading Directory...</h2>
        <p className="text-slate-400 text-sm mt-2">Connecting to Nexus Server</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center fade-in-up">
        <div className="glass-card p-10" style={{ transform: 'none' }}>
          <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.15)]">
            <AlertCircle className="w-10 h-10 text-rose-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Connection Failed</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 fade-in-up relative z-10 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 bg-slate-800/40 p-6 md:px-8 rounded-3xl border border-slate-700/50 backdrop-blur-xl">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Users className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Member Directory
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <p className="text-slate-400 text-sm font-medium">
                {members.length} active global team member{members.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
        <Link to="/add" className="btn-primary flex items-center gap-2 text-sm shadow-xl w-full md:w-auto justify-center">
          <UserPlus size={18} />
          <span>Add New</span>
        </Link>
      </div>

      {/* Empty State */}
      {members.length === 0 ? (
        <div className="glass-card p-16 text-center fade-in-up" style={{ transform: 'none' }}>
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="relative w-full h-full rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-500">
              <Users className="w-12 h-12 text-teal-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No Members Yet</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm leading-relaxed font-medium">
            Your directory is currently empty. Begin expanding your universe by registering the first team member!
          </p>
          <Link to="/add" className="btn-primary inline-flex items-center gap-2">
            <UserPlus size={18} />
            <span>Add First Member</span>
          </Link>
        </div>
      ) : (
        /* Members Custom Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => {
            // Generate a cool hue between 160 (teal) and 200 (light blue)
            const hue = (index * 25 + 160) % 60 + 160; 
            return (
              <div
                key={member._id}
                className="glass-card overflow-hidden group flex flex-col"
                style={{
                  animationDelay: `${index * 0.08}s`,
                  animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s forwards`,
                  opacity: 0,
                  borderRadius: '24px',
                }}
              >
                {/* Card Banner */}
                <div className="h-28 relative overflow-hidden flex-shrink-0">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, 
                        hsl(${hue}, 80%, 40%) 0%, 
                        hsl(${hue + 20}, 90%, 25%) 100%)`,
                    }}
                  ></div>
                  {/* Geometric Decor */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-[10px] border-white/10 mix-blend-overlay"></div>
                  <div className="absolute top-10 -left-6 w-16 h-16 rounded-lg bg-white/10 rotate-45 mix-blend-overlay"></div>
                </div>

                {/* Card body */}
                <div className="px-6 pb-7 relative flex flex-col items-center text-center flex-grow bg-slate-900/40">
                  {/* Floating Avatar */}
                  <div 
                    className="w-24 h-24 rounded-2xl -mt-12 mb-5 relative overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:-translate-y-2" 
                    style={{ border: '4px solid #1e293b' }}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${member.image}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=0d9488&color=fff&size=200'; }}
                    />
                  </div>

                  {/* Details */}
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{member.name}</h3>
                  <span className="badge badge-teal mb-5">{member.role}</span>

                  <div className="flex items-center text-slate-400 text-sm mb-6 w-full justify-center truncate bg-slate-800/50 py-2 px-3 rounded-xl border border-slate-700/50">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-teal-400" />
                    <span className="truncate font-medium">{member.email}</span>
                  </div>

                  <div className="mt-auto w-full pt-2">
                    <Link
                      to={`/members/${member._id}`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-teal-300 transition-all duration-300 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]"
                      style={{
                        background: 'rgba(45,212,191,0.06)',
                        border: '1px solid rgba(45,212,191,0.15)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(45,212,191,0.15)';
                        e.currentTarget.style.borderColor = 'rgba(45,212,191,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(45,212,191,0.06)';
                        e.currentTarget.style.borderColor = 'rgba(45,212,191,0.15)';
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Profile</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewMembers;
