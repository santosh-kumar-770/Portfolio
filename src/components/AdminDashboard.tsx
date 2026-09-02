import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { ContactMessage, AdminStats } from '../services/api';
import {
  fetchAdminMessages,
  fetchAdminStats,
  toggleMessageReadStatus,
  deleteMessageRecord,
  adminSignOut,
} from '../services/api';
import {
  Mail,
  Inbox,
  Search,
  Filter,
  Trash2,
  Reply,
  LogOut,
  RefreshCw,
  ArrowLeft,
  Loader2,
  Calendar,
  Sparkles,
  Database,
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToPortfolio: () => void;
}

type FilterType = 'ALL' | 'UNREAD' | 'READ';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onBackToPortfolio }) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<AdminStats>({ total: 0, unread: 0, today: 0, thisWeek: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setRefreshing(true);
      const [messagesData, statsData] = await Promise.all([
        fetchAdminMessages(),
        fetchAdminStats(),
      ]);
      setMessages(messagesData);
      setStats(statsData);

      if (selectedMessage) {
        const updated = messagesData.find((m) => m.id === selectedMessage.id);
        if (updated) setSelectedMessage(updated);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedMessage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      // Mark as read in backend
      await toggleMessageReadStatus(msg.id, true);
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m)));
      setStats((prev) => ({ ...prev, unread: Math.max(0, prev.unread - 1) }));
    }
  };

  const handleToggleRead = async (msg: ContactMessage, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newStatus = !msg.read;
    await toggleMessageReadStatus(msg.id, newStatus);
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: newStatus } : m)));
    setStats((prev) => ({
      ...prev,
      unread: newStatus ? Math.max(0, prev.unread - 1) : prev.unread + 1,
    }));
    if (selectedMessage?.id === msg.id) {
      setSelectedMessage((prev) => (prev ? { ...prev, read: newStatus } : null));
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isDeleted = await deleteMessageRecord(id);
    if (isDeleted) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      setDeleteConfirmId(null);
      // Refresh stats
      try {
        const newStats = await fetchAdminStats();
        setStats(newStats);
      } catch {
        // Ignore
      }
    }
  };

  const handleLogout = async () => {
    await adminSignOut();
    onLogout();
  };

  // Time of day greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Filtered & Searched Messages
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchesFilter =
        activeFilter === 'ALL' ||
        (activeFilter === 'UNREAD' && !msg.read) ||
        (activeFilter === 'READ' && msg.read);

      const content = `${msg.name} ${msg.email} ${msg.message}`.toLowerCase();
      const matchesSearch = searchQuery.trim() === '' || content.includes(searchQuery.toLowerCase().trim());

      return matchesFilter && matchesSearch;
    });
  }, [messages, activeFilter, searchQuery]);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();

      if (isToday) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      }

      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return isoString;
    }
  };

  const formatFullDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-[#05070c] bg-radial-atmosphere text-slate-100 px-4 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToPortfolio}
              className="glass-pill px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PORTFOLIO</span>
            </button>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <span className="font-mono text-xs text-brand-teal uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-brand-teal" />
              <span>Node.js • SQLite DB</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              disabled={refreshing}
              className="p-2 rounded-xl glass-chip text-slate-300 hover:text-white transition-colors"
              title="Refresh Inbox"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-brand-teal' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="glass-chip px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Header Greeting */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-brand-teal block mb-1">
              ADMIN CONTROL PANEL
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-100">
              {greeting}, Santosh.
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Real-time messages stored directly in local SQLite database
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-5 border border-white/5">
            <span className="text-[11px] font-mono text-slate-400 block uppercase mb-1">Total Messages</span>
            <span className="text-2xl sm:text-3xl font-bold font-display text-slate-100">{stats.total}</span>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-white/5">
            <span className="text-[11px] font-mono text-brand-teal block uppercase mb-1">Unread Inquiries</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-display text-brand-accent">{stats.unread}</span>
              {stats.unread > 0 && <span className="h-2 w-2 rounded-full bg-brand-accent animate-ping" />}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-white/5">
            <span className="text-[11px] font-mono text-slate-400 block uppercase mb-1">Received Today</span>
            <span className="text-2xl sm:text-3xl font-bold font-display text-slate-100">{stats.today}</span>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-white/5">
            <span className="text-[11px] font-mono text-slate-400 block uppercase mb-1">This Week</span>
            <span className="text-2xl sm:text-3xl font-bold font-display text-slate-100">{stats.thisWeek}</span>
          </div>
        </div>

        {/* Inbox Section */}
        <div className="space-y-4">
          {/* Controls: Search & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search inquiries by sender, email or text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-teal/50"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-slate-500 mr-1 hidden sm:inline flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {(['ALL', 'UNREAD', 'READ'] as FilterType[]).map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      isActive
                        ? 'bg-brand-accent text-slate-950 font-bold'
                        : 'glass-chip text-slate-300 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inbox Split / Stack Layout */}
          {loading ? (
            <div className="py-24 glass-panel rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-brand-teal" />
              <span className="text-xs font-mono">Loading private inbox from SQLite...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="py-20 glass-panel rounded-3xl text-center space-y-3 p-8 border border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mx-auto text-slate-500">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 font-display">No messages yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                When visitors submit your portfolio contact form, their inquiries will appear here in real time.
              </p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="py-16 glass-panel rounded-3xl text-center space-y-2 p-8 border border-white/5">
              <p className="text-xs font-mono text-slate-400">No messages matched your search query or filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('ALL');
                }}
                className="text-xs font-mono text-brand-accent hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Messages List (Left column on desktop) */}
              <div className={`${selectedMessage ? 'hidden lg:block lg:col-span-5' : 'lg:col-span-12'} space-y-2`}>
                <div className="text-[11px] font-mono text-slate-500 pb-1 flex items-center justify-between">
                  <span>SHOWING {filteredMessages.length} INQUIRIES</span>
                  <span>NEWEST FIRST</span>
                </div>

                <div className="space-y-2">
                  {filteredMessages.map((msg) => {
                    const isSelected = selectedMessage?.id === msg.id;
                    return (
                      <div
                        key={msg.id}
                        onClick={() => handleSelectMessage(msg)}
                        className={`p-4 rounded-2xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-slate-900/90 border-brand-teal/40 shadow-lg shadow-brand-teal/5'
                            : 'glass-panel hover:bg-slate-900/50 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            {!msg.read ? (
                              <span className="h-2 w-2 rounded-full bg-brand-accent shrink-0 shadow-sm shadow-brand-accent/50" />
                            ) : (
                              <span className="h-2 w-2 rounded-full bg-transparent shrink-0" />
                            )}
                            <span className={`text-sm font-display ${!msg.read ? 'font-bold text-slate-100' : 'font-medium text-slate-300'}`}>
                              {msg.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 shrink-0">
                            {formatDate(msg.created_at)}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-1 pl-4 mb-2">
                          {msg.message}
                        </p>

                        <div className="flex items-center justify-between pl-4 text-[11px] font-mono text-slate-500">
                          <span className="truncate max-w-[180px]">{msg.email}</span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => handleToggleRead(msg, e)}
                              className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                              title={msg.read ? 'Mark as unread' : 'Mark as read'}
                            >
                              <Sparkles className={`w-3 h-3 ${!msg.read ? 'text-brand-teal' : ''}`} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmId(msg.id);
                              }}
                              className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                              title="Delete message"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Message Details View (Right column on desktop / Full view on mobile) */}
              {selectedMessage && (
                <div className="lg:col-span-7">
                  <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative sticky top-6">
                    {/* Mobile Back to List Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedMessage(null)}
                      className="lg:hidden glass-pill mb-4 px-3 py-1 rounded-xl flex items-center gap-1.5 text-xs font-mono text-slate-300"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back to list</span>
                    </button>

                    {/* Detail Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 mb-6 border-b border-white/5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
                            {selectedMessage.name}
                          </h2>
                          {!selectedMessage.read && (
                            <span className="px-2 py-0.5 rounded-full bg-brand-teal/20 text-brand-accent text-[10px] font-mono">
                              UNREAD
                            </span>
                          )}
                        </div>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-xs font-mono text-brand-teal hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>{selectedMessage.email}</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatFullDate(selectedMessage.created_at)}</span>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="space-y-4 mb-8">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                        Message Content:
                      </span>
                      <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/5 text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans select-text">
                        {selectedMessage.message}
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${selectedMessage.email}?subject=Re: Your message to Santosh Kumar&body=%0A%0A--- Original Message ---%0AFrom: ${encodeURIComponent(
                            selectedMessage.name
                          )}%0A${encodeURIComponent(selectedMessage.message)}`}
                          className="glass-button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-mono"
                        >
                          <Reply className="w-3.5 h-3.5" />
                          <span>Reply via Email ↗</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleToggleRead(selectedMessage)}
                          className="glass-chip px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white transition-colors"
                        >
                          {selectedMessage.read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                      </div>

                      {deleteConfirmId === selectedMessage.id ? (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 p-1.5 rounded-xl text-xs font-mono">
                          <span className="text-red-300 text-[11px] pl-1">Confirm delete?</span>
                          <button
                            type="button"
                            onClick={() => handleDelete(selectedMessage.id)}
                            className="px-2 py-1 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1 rounded-lg glass-chip text-slate-300"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(selectedMessage.id)}
                          className="p-2.5 rounded-xl glass-chip text-slate-500 hover:text-red-400 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
