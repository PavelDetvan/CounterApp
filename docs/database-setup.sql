-- CounterApp Database Setup Script
-- Run this in Supabase SQL Editor to set up all tables, policies, and triggers
-- This script is idempotent and can be run multiple times safely

-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================

-- Enable UUID extension for generating unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 2. TABLES
-- ============================================================================

-- Create profiles table
-- Stores user profile information, automatically created on signup
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create counters table
-- Stores user-created counters for tracking activities
CREATE TABLE IF NOT EXISTS counters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  archived BOOLEAN DEFAULT FALSE
);

-- Create counter_entries table
-- Stores individual increment/decrement events for counters
CREATE TABLE IF NOT EXISTS counter_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  counter_id UUID NOT NULL REFERENCES counters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  value INTEGER DEFAULT 1 NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  note TEXT,
  synced BOOLEAN DEFAULT FALSE
);

-- ============================================================================
-- 3. INDEXES
-- ============================================================================

-- Create indexes for performance optimization
-- These indexes speed up common queries

-- Index for fetching counter history sorted by time
CREATE INDEX IF NOT EXISTS counter_entries_counter_id_timestamp_idx 
  ON counter_entries(counter_id, timestamp DESC);

-- Index for fetching user's recent activity
CREATE INDEX IF NOT EXISTS counter_entries_user_id_timestamp_idx 
  ON counter_entries(user_id, timestamp DESC);

-- Index for filtering active/archived counters
CREATE INDEX IF NOT EXISTS counters_user_id_archived_idx 
  ON counters(user_id, archived);

-- ============================================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable Row Level Security on all tables
-- This ensures users can only access their own data
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE counter_entries ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 5. RLS POLICIES - PROFILES
-- ============================================================================

-- Allow users to view any profile (for future social features)
CREATE POLICY "Users can view any profile" ON profiles
  FOR SELECT USING (true);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow users to delete their own profile
CREATE POLICY "Users can delete their own profile" ON profiles
  FOR DELETE USING (auth.uid() = id);

-- ============================================================================
-- 6. RLS POLICIES - COUNTERS
-- ============================================================================

-- Allow users to view only their own counters
CREATE POLICY "Users can view their own counters" ON counters
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to create their own counters
CREATE POLICY "Users can create their own counters" ON counters
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own counters
CREATE POLICY "Users can update their own counters" ON counters
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own counters
CREATE POLICY "Users can delete their own counters" ON counters
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- 7. RLS POLICIES - COUNTER ENTRIES
-- ============================================================================

-- Allow users to view only their own entries
CREATE POLICY "Users can view their own entries" ON counter_entries
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to create their own entries
CREATE POLICY "Users can create their own entries" ON counter_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own entries
CREATE POLICY "Users can update their own entries" ON counter_entries
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own entries
CREATE POLICY "Users can delete their own entries" ON counter_entries
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- 8. TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function to automatically create profile when a new user signs up
-- This ensures every user has a profile record
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger that calls the above function on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- SETUP COMPLETE
-- ============================================================================

-- To verify the setup, you can run these queries:
-- SELECT * FROM profiles;
-- SELECT * FROM counters;
-- SELECT * FROM counter_entries;
