import React, { useState } from 'react';
import { adminSignIn } from '../services/api';
import { Lock, Mail, Key, Loader2, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await adminSignIn(email, password);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Authentication failed.');
      }
    } catch {
      setError('An unexpected error occurred. Please verify backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070c] bg-radial-atmosphere text-slate-100 flex flex-col justify-center items-center px-6 py-12">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-teal/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Top Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="glass-pill mb-8 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO PORTFOLIO</span>
        </button>

        {/* Login Glass Panel */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 relative">
          {/* Card Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 text-brand-accent flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-brand-teal font-mono text-[11px] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Node.js + SQLite Admin</span>
            </div>
            <h1 className="text-2xl font-bold font-display text-slate-100">
              Santosh Kumar Inbox
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Protected authentication gateway for portfolio inquiries
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  placeholder="santoshkumaritte7@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-pass" className="block text-xs font-mono text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-pass"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/50 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full glass-button-primary flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider mt-6 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Access Inbox ↗</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
