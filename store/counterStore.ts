import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';
import type { Counter, CounterEntry, NewCounter, NewCounterEntry } from '@/types/database.types';

/**
 * Counter Store
 * Global state management for counters using Zustand
 * Handles CRUD operations and syncs with Supabase
 */

interface CounterWithTotal extends Counter {
  total: number;
  todayCount: number;
}

interface CounterStore {
  counters: CounterWithTotal[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchCounters: (userId: string) => Promise<void>;
  createCounter: (counter: NewCounter) => Promise<void>;
  updateCounter: (id: string, updates: Partial<Counter>) => Promise<void>;
  deleteCounter: (id: string) => Promise<void>;
  incrementCounter: (counterId: string, userId: string, value?: number) => Promise<void>;
  decrementCounter: (counterId: string, userId: string, value?: number) => Promise<void>;
}

export const useCounterStore = create<CounterStore>((set, get) => ({
  counters: [],
  loading: false,
  error: null,

  /**
   * Fetch all counters for a user with totals
   */
  fetchCounters: async (userId: string) => {
    set({ loading: true, error: null });
    
    try {
      // Fetch counters
      const { data: counters, error: countersError } = await supabase
        .from('counters')
        .select('*')
        .eq('user_id', userId)
        .eq('archived', false)
        .order('created_at', { ascending: false });

      if (countersError) throw countersError;

      // Fetch entries for totals
      const { data: entries, error: entriesError } = await supabase
        .from('counter_entries')
        .select('counter_id, value, timestamp')
        .eq('user_id', userId);

      if (entriesError) throw entriesError;

      // Calculate totals and today's counts
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const countersWithTotals: CounterWithTotal[] = (counters || []).map((counter) => {
        const counterEntries = entries?.filter((e) => e.counter_id === counter.id) || [];
        const total = counterEntries.reduce((sum, entry) => sum + entry.value, 0);
        const todayCount = counterEntries
          .filter((e) => new Date(e.timestamp) >= today)
          .reduce((sum, entry) => sum + entry.value, 0);

        return {
          ...counter,
          total,
          todayCount,
        };
      });

      set({ counters: countersWithTotals, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  /**
   * Create a new counter
   */
  createCounter: async (counter: NewCounter) => {
    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase
        .from('counters')
        .insert(counter)
        .select()
        .single();

      if (error) throw error;

      // Add to state with zero counts
      const newCounter: CounterWithTotal = {
        ...data,
        total: 0,
        todayCount: 0,
      };

      set((state) => ({
        counters: [newCounter, ...state.counters],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  /**
   * Update an existing counter
   */
  updateCounter: async (id: string, updates: Partial<Counter>) => {
    try {
      const { error } = await supabase
        .from('counters')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Update in state
      set((state) => ({
        counters: state.counters.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  /**
   * Delete (archive) a counter
   */
  deleteCounter: async (id: string) => {
    try {
      const { error } = await supabase
        .from('counters')
        .update({ archived: true })
        .eq('id', id);

      if (error) throw error;

      // Remove from state
      set((state) => ({
        counters: state.counters.filter((c) => c.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  /**
   * Increment a counter
   */
  incrementCounter: async (counterId: string, userId: string, value: number = 1) => {
    try {
      // Create new entry
      const newEntry: NewCounterEntry = {
        counter_id: counterId,
        user_id: userId,
        value,
        timestamp: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('counter_entries')
        .insert(newEntry);

      if (error) throw error;

      // Update local state
      set((state) => ({
        counters: state.counters.map((c) =>
          c.id === counterId
            ? { ...c, total: c.total + value, todayCount: c.todayCount + value }
            : c
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  /**
   * Decrement a counter
   */
  decrementCounter: async (counterId: string, userId: string, value: number = 1) => {
    try {
      // Create new entry with negative value
      const newEntry: NewCounterEntry = {
        counter_id: counterId,
        user_id: userId,
        value: -value,
        timestamp: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('counter_entries')
        .insert(newEntry);

      if (error) throw error;

      // Update local state
      set((state) => ({
        counters: state.counters.map((c) =>
          c.id === counterId
            ? { ...c, total: c.total - value, todayCount: c.todayCount - value }
            : c
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
