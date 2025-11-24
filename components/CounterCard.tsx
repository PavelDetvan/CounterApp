'use client';

import { Plus, Minus, Trash2, Edit, BarChart3 } from 'lucide-react';
import type { Counter } from '@/types/database.types';

/**
 * Counter Card Component
 * Displays a single counter with increment/decrement buttons
 */

interface CounterCardProps {
  counter: Counter & { total: number; todayCount: number };
  onIncrement: () => void;
  onDecrement: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewDetails?: () => void;
}

export default function CounterCard({
  counter,
  onIncrement,
  onDecrement,
  onEdit,
  onDelete,
  onViewDetails,
}: CounterCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-md border-2 hover:shadow-xl transition-all duration-200"
      style={{ borderColor: counter.color || '#3B82F6' }}
    >
      {/* Card Header */}
      <div
        className="px-6 py-4 rounded-t-xl"
        style={{ backgroundColor: `${counter.color}15` }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {counter.name}
            </h3>
            {counter.description && (
              <p className="text-sm text-gray-600">{counter.description}</p>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                title="Edit counter"
              >
                <Edit size={18} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Delete counter"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card Body - Counter Display */}
      <div className="px-6 py-8">
        {/* Total Count */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold" style={{ color: counter.color || '#3B82F6' }}>
            {counter.total}
          </div>
          <div className="text-sm text-gray-500 mt-2">Total Count</div>
        </div>

        {/* Today's Count Badge */}
        {counter.todayCount > 0 && (
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              +{counter.todayCount} today
            </span>
          </div>
        )}

        {/* Increment / Decrement Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onDecrement}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 active:scale-95 transition-all"
          >
            <Minus size={20} />
            <span>-1</span>
          </button>
          <button
            onClick={onIncrement}
            className="flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md"
            style={{ backgroundColor: counter.color || '#3B82F6' }}
          >
            <Plus size={20} />
            <span>+1</span>
          </button>
        </div>
      </div>

      {/* Card Footer - Metadata */}
      <div className="px-6 py-3 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Created {new Date(counter.created_at).toLocaleDateString()}
          </span>
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition"
              title="View statistics"
            >
              <BarChart3 size={14} />
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
