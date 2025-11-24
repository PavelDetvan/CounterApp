'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useCounterStore } from '@/store/counterStore';
import type { Counter } from '@/types/database.types';

/**
 * Delete Confirmation Dialog
 * Confirms before permanently archiving a counter
 */

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  counter: (Counter & { total: number; todayCount: number }) | null;
}

export default function DeleteConfirmDialog({ isOpen, onClose, counter }: DeleteConfirmDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  
  const { deleteCounter } = useCounterStore();

  if (!isOpen || !counter) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError('');

    try {
      await deleteCounter(counter.id);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to delete counter');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      setError('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Delete Counter?</h2>
              <p className="text-sm text-gray-600 mt-1">
                This action cannot be undone
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Counter Info */}
          <div className="bg-gray-50 rounded-lg p-4 border-2" style={{ borderColor: counter.color || '#3B82F6' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{counter.name}</h3>
              {counter.icon && <span className="text-2xl">{counter.icon}</span>}
            </div>
            {counter.description && (
              <p className="text-sm text-gray-600 mb-3">{counter.description}</p>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Count:</span>
                <span className="ml-2 font-semibold text-gray-900">{counter.total}</span>
              </div>
              <div>
                <span className="text-gray-500">Today:</span>
                <span className="ml-2 font-semibold text-gray-900">{counter.todayCount}</span>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> Deleting this counter will archive it and all its history. 
              You won't be able to recover this data.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isDeleting ? 'Deleting...' : 'Delete Counter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
