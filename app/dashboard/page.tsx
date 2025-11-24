'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useCounterStore } from '@/store/counterStore';
import { supabase } from '@/lib/supabase/client';
import { LogOut, Plus, Package } from 'lucide-react';
import CounterCard from '@/components/CounterCard';
import CreateCounterModal from '@/components/CreateCounterModal';
import EditCounterModal from '@/components/EditCounterModal';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import CounterDetailsModal from '@/components/CounterDetailsModal';
import Link from 'next/link';
import type { Counter } from '@/types/database.types';

/**
 * Dashboard Page
 * Main application page where users manage their counters
 * Protected route - redirects to login if not authenticated
 */
export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState<(Counter & { total: number; todayCount: number }) | null>(null);
  
  const { counters, loading: countersLoading, fetchCounters, incrementCounter, decrementCounter } = useCounterStore();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch counters when user is authenticated
  useEffect(() => {
    if (user) {
      fetchCounters(user.id);
    }
  }, [user, fetchCounters]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleEdit = (counter: Counter & { total: number; todayCount: number }) => {
    setSelectedCounter(counter);
    setIsEditModalOpen(true);
  };

  const handleDelete = (counter: Counter & { total: number; todayCount: number }) => {
    setSelectedCounter(counter);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedCounter(null);
  };

  const handleCloseDelete = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCounter(null);
  };

  const handleViewDetails = (counter: Counter & { total: number; todayCount: number }) => {
    setSelectedCounter(counter);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedCounter(null);
  };

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Counter<span className="text-blue-600">App</span>
              </h1>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <Link
                href="/releases"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                title="Release Notes"
              >
                <Package size={18} />
                <span className="hidden sm:inline">Releases</span>
              </Link>
              <span className="text-sm text-gray-600 hidden sm:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Counters</h2>
            <p className="text-gray-600 mt-1">Track your activities and habits</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            Add Counter
          </button>
        </div>

        {/* Loading State */}
        {countersLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading counters...</p>
          </div>
        )}

        {/* Empty State */}
        {!countersLoading && counters.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No counters yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first counter to start tracking!
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Create Your First Counter
            </button>
          </div>
        )}

        {/* Counter Grid */}
        {!countersLoading && counters.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counters.map((counter) => (
              <CounterCard
                key={counter.id}
                counter={counter}
                onIncrement={() => incrementCounter(counter.id, user.id)}
                onDecrement={() => decrementCounter(counter.id, user.id)}
                onEdit={() => handleEdit(counter)}
                onDelete={() => handleDelete(counter)}
                onViewDetails={() => handleViewDetails(counter)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Counter Modal */}
      {user && (
        <CreateCounterModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          userId={user.id}
        />
      )}

      {/* Edit Counter Modal */}
      <EditCounterModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        counter={selectedCounter}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDelete}
        counter={selectedCounter}
      />

      {/* Counter Details Modal */}
      {user && (
        <CounterDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetails}
          counter={selectedCounter}
          userId={user.id}
        />
      )}
    </div>
  );
}
