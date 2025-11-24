'use client';

import { useState, useEffect } from 'react';
import { X, TrendingUp, Calendar, Clock, Edit2, Trash2, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import type { Counter, CounterEntry } from '@/types/database.types';

/**
 * Counter Details Modal
 * Shows comprehensive statistics, history, and analytics for a counter
 */

interface CounterDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  counter: (Counter & { total: number; todayCount: number }) | null;
  userId: string;
}

type TabType = 'overview' | 'history' | 'trends';

interface CounterStats {
  total: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
  allTimeHigh: number;
  averagePerDay: number;
  totalEntries: number;
  lastActivity: string | null;
}

export default function CounterDetailsModal({ isOpen, onClose, counter, userId }: CounterDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [entries, setEntries] = useState<CounterEntry[]>([]);
  const [stats, setStats] = useState<CounterStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (isOpen && counter) {
      loadEntries();
    }
  }, [isOpen, counter]);

  const loadEntries = async () => {
    if (!counter) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('counter_entries')
        .select('*')
        .eq('counter_id', counter.id)
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });

      if (error) throw error;

      setEntries(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (entries: CounterEntry[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const total = entries.reduce((sum, e) => sum + e.value, 0);
    const todayCount = entries
      .filter(e => new Date(e.timestamp) >= today)
      .reduce((sum, e) => sum + e.value, 0);
    const weekCount = entries
      .filter(e => new Date(e.timestamp) >= weekAgo)
      .reduce((sum, e) => sum + e.value, 0);
    const monthCount = entries
      .filter(e => new Date(e.timestamp) >= monthAgo)
      .reduce((sum, e) => sum + e.value, 0);

    // Group by day to find all-time high
    const dailyTotals = entries.reduce((acc, entry) => {
      const date = new Date(entry.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + entry.value;
      return acc;
    }, {} as Record<string, number>);
    
    const allTimeHigh = Math.max(...Object.values(dailyTotals), 0);

    // Calculate average per day
    const firstEntry = entries[entries.length - 1];
    const daysSinceStart = firstEntry 
      ? Math.max(1, Math.ceil((now.getTime() - new Date(firstEntry.timestamp).getTime()) / (1000 * 60 * 60 * 24)))
      : 1;
    const averagePerDay = total / daysSinceStart;

    const lastActivity = entries[0]?.timestamp || null;

    setStats({
      total,
      todayCount,
      weekCount,
      monthCount,
      allTimeHigh,
      averagePerDay,
      totalEntries: entries.length,
      lastActivity,
    });
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!confirm('Delete this entry? This cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('counter_entries')
        .delete()
        .eq('id', entryId);

      if (error) throw error;

      await loadEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry');
    }
  };

  const handleEditEntry = async (entryId: string) => {
    const value = parseInt(editValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }

    try {
      const { error } = await supabase
        .from('counter_entries')
        .update({ value })
        .eq('id', entryId);

      if (error) throw error;

      setEditingEntry(null);
      setEditValue('');
      await loadEntries();
    } catch (error) {
      console.error('Error updating entry:', error);
      alert('Failed to update entry');
    }
  };

  const startEdit = (entry: CounterEntry) => {
    setEditingEntry(entry.id);
    setEditValue(entry.value.toString());
  };

  const cancelEdit = () => {
    setEditingEntry(null);
    setEditValue('');
  };

  if (!isOpen || !counter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl z-10">
          <div className="flex justify-between items-start p-6">
            <div className="flex items-center gap-3">
              {counter.icon && <span className="text-4xl">{counter.icon}</span>}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{counter.name}</h2>
                {counter.description && (
                  <p className="text-sm text-gray-600 mt-1">{counter.description}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-t border-gray-100">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-3 font-medium transition ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-3 font-medium transition ${
                activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`flex-1 px-6 py-3 font-medium transition ${
                activeTab === 'trends'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Trends
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading data...</p>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && stats && (
                <div className="space-y-6">
                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                      <div className="text-sm text-blue-700 mt-1">Total Count</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                      <div className="text-3xl font-bold text-green-600">{stats.todayCount}</div>
                      <div className="text-sm text-green-700 mt-1">Today</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                      <div className="text-3xl font-bold text-purple-600">{stats.weekCount}</div>
                      <div className="text-sm text-purple-700 mt-1">This Week</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                      <div className="text-3xl font-bold text-orange-600">{stats.monthCount}</div>
                      <div className="text-sm text-orange-700 mt-1">This Month</div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={18} className="text-gray-600" />
                        <span className="font-medium text-gray-900">All-Time High</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stats.allTimeHigh}</div>
                      <div className="text-xs text-gray-600 mt-1">Best single day</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={18} className="text-gray-600" />
                        <span className="font-medium text-gray-900">Daily Average</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stats.averagePerDay.toFixed(1)}</div>
                      <div className="text-xs text-gray-600 mt-1">Per day since creation</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Plus size={18} className="text-gray-600" />
                        <span className="font-medium text-gray-900">Total Entries</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stats.totalEntries}</div>
                      <div className="text-xs text-gray-600 mt-1">Times counted</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-gray-600" />
                        <span className="font-medium text-gray-900">Last Activity</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {stats.lastActivity 
                          ? new Date(stats.lastActivity).toLocaleString()
                          : 'No activity yet'}
                      </div>
                    </div>
                  </div>

                  {/* Counter Info */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Counter Details</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {new Date(counter.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Color:</span>
                        <span 
                          className="ml-2 inline-block w-4 h-4 rounded border border-gray-300"
                          style={{ backgroundColor: counter.color }}
                        ></span>
                        <span className="ml-1 font-mono text-xs text-gray-600">{counter.color}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-4">
                  {entries.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No entries yet</h3>
                      <p className="text-gray-600">Start counting to see your history here</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-gray-600 mb-4">
                        Showing {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                      </div>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {entries.map((entry) => (
                          <div
                            key={entry.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  {editingEntry === entry.id ? (
                                    <input
                                      type="number"
                                      value={editValue}
                                      onChange={(e) => setEditValue(e.target.value)}
                                      className="w-20 px-2 py-1 border border-gray-300 rounded text-lg font-bold"
                                      autoFocus
                                    />
                                  ) : (
                                    <span
                                      className={`text-2xl font-bold ${
                                        entry.value > 0 ? 'text-green-600' : 'text-red-600'
                                      }`}
                                    >
                                      {entry.value > 0 ? '+' : ''}{entry.value}
                                    </span>
                                  )}
                                  <div className="text-sm">
                                    <div className="text-gray-900 font-medium">
                                      {new Date(entry.timestamp).toLocaleDateString()}
                                    </div>
                                    <div className="text-gray-500">
                                      {new Date(entry.timestamp).toLocaleTimeString()}
                                    </div>
                                  </div>
                                </div>
                                {entry.note && (
                                  <div className="mt-2 text-sm text-gray-600 italic">
                                    "{entry.note}"
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                {editingEntry === entry.id ? (
                                  <>
                                    <button
                                      onClick={() => handleEditEntry(entry.id)}
                                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                      title="Save"
                                    >
                                      ✓
                                    </button>
                                    <button
                                      onClick={cancelEdit}
                                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                      title="Cancel"
                                    >
                                      ✕
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => startEdit(entry)}
                                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                      title="Edit entry"
                                    >
                                      <Edit2 size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteEntry(entry.id)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                      title="Delete entry"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Trends Tab */}
              {activeTab === 'trends' && stats && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Trends</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">This Week</span>
                          <span className="text-sm font-bold text-gray-900">{stats.weekCount}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-600 h-3 rounded-full transition-all"
                            style={{ width: `${Math.min(100, (stats.weekCount / Math.max(stats.total, 1)) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">This Month</span>
                          <span className="text-sm font-bold text-gray-900">{stats.monthCount}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-purple-600 h-3 rounded-full transition-all"
                            style={{ width: `${Math.min(100, (stats.monthCount / Math.max(stats.total, 1)) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">All Time</span>
                          <span className="text-sm font-bold text-gray-900">{stats.total}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-green-600 h-3 rounded-full w-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h4 className="font-semibold text-green-900 mb-2">📈 Growth Rate</h4>
                      <p className="text-sm text-green-700">
                        {stats.weekCount > 0 
                          ? `${((stats.weekCount / 7)).toFixed(1)} per day this week`
                          : 'No activity this week'}
                      </p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">🎯 Consistency</h4>
                      <p className="text-sm text-purple-700">
                        {stats.totalEntries > 0
                          ? `${stats.totalEntries} entries recorded`
                          : 'Start tracking for insights'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
