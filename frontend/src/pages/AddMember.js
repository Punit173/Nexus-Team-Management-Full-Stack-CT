import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, AlertCircle, Loader2, UserPlus, X, Image as ImageIcon } from 'lucide-react';
import api from '../services/api';

const AddMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!formData.name || !formData.role || !formData.email || !image) {
      setError('Please fill all fields and select a profile image.');
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('role', formData.role);
      data.append('email', formData.email);
      data.append('image', image);

      await api.post('/members', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Profile generated successfully! Redirecting...');
      setFormData({ name: '', role: '', email: '' });
      setImage(null);
      setPreview(null);

      setTimeout(() => navigate('/members'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register member. Please check server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 md:py-10 fade-in-up relative z-10 px-4 sm:px-0">
      <div className="glass-card overflow-hidden shadow-2xl shell" style={{ transform: 'none' }}>
        
        {/* Header with vibrant geometric accent */}
        <div className="relative px-8 py-10 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(30,41,59,0.4) 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Top colored edge */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-500 shadow-[0_0_15px_rgba(45,212,191,0.5)]"></div>
          
          {/* Background Decor */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner">
              <UserPlus size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Register Member</h2>
              <p className="text-teal-200/70 mt-1.5 text-sm font-medium">Input the credentials for the new squad operative.</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10 bg-slate-900/50">
          {/* Error Alert */}
          {error && (
            <div className="mb-8 p-4 rounded-2xl flex items-start gap-4 fade-in-up" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}>
              <AlertCircle className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-rose-200 font-medium text-sm pt-0.5">{error}</p>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="mb-8 p-4 rounded-2xl flex items-start gap-4 fade-in-up" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', boxShadow: '0 0 20px rgba(16,185,129,0.1)' }}>
              <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-emerald-200 font-medium text-sm pt-0.5">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-2 ml-1">
                Full Identity Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-glass text-lg shadow-inner"
                placeholder="e.g. Alex Chen"
              />
            </div>

            {/* Role & Email side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label htmlFor="role" className="block text-sm font-bold text-slate-300 mb-2 ml-1">
                  Designated Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="input-glass"
                  placeholder="e.g. Lead Designer"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-2 ml-1">
                  Secure Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-glass"
                  placeholder="e.g. alex@nexus.team"
                />
              </div>
            </div>

            {/* Image Upload box */}
            <div className="pt-2">
              <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">
                Profile Avatar
              </label>
              <div
                className="rounded-3xl p-8 text-center transition-all duration-300 relative overflow-hidden group"
                style={{
                  background: preview ? 'rgba(15,23,42,0.6)' : 'rgba(15,23,42,0.4)',
                  border: preview ? '2px solid rgba(45,212,191,0.3)' : '2px dashed rgba(148,163,184,0.2)',
                }}
              >
                {preview ? (
                  <div className="flex flex-col items-center fade-in-up scale-up relative z-10">
                    <div className="relative group/img">
                      <div className="absolute inset-0 bg-teal-500 rounded-3xl blur opacity-30 transform group-hover/img:scale-105 transition-transform duration-500"></div>
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-36 w-36 object-cover rounded-3xl relative z-10"
                        style={{ border: '4px solid #1e293b' }}
                      />
                      <button
                        type="button"
                        onClick={() => { setImage(null); setPreview(null); }}
                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(244,63,94,0.5)] z-20 hover:scale-110"
                      >
                        <X size={16} className="text-white" strokeWidth={3} />
                      </button>
                    </div>
                    <span className="text-teal-400 font-medium mt-4 text-sm bg-teal-500/10 px-4 py-1.5 rounded-full border border-teal-500/20">
                      Avatar Confirmed
                    </span>
                  </div>
                ) : (
                  <label htmlFor="image-upload" className="cursor-pointer block relative z-10 transform transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center mb-5 shadow-lg group-hover:border-teal-500/30 group-hover:bg-teal-500/5 transition-all">
                      <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-teal-400 transition-colors mb-1" />
                      <UploadCloud className="w-4 h-4 text-slate-500 group-hover:text-teal-500 transition-colors" />
                    </div>
                    <p className="text-base text-slate-200 font-bold mb-1">
                      Drag & Drop Identity File
                    </p>
                    <p className="text-sm text-slate-500 font-medium">
                      or <span className="text-teal-400">browse</span> from local system (Max 5MB)
                    </p>
                    <input
                      id="image-upload"
                      name="image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
                
                {/* Background hover effect for dropzone */}
                {!preview && (
                  <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full flex items-center justify-center gap-3 text-lg py-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing Encryption...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-6 h-6" />
                    <span>Register to Directory</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
