'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useCounterStore } from '@/store/counterStore';
import type { NewCounter } from '@/types/database.types';

/**
 * Create Counter Modal
 * Form to create a new counter with name, description, and color
 */

interface CreateCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const PRESET_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Green', value: '#10B981' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Teal', value: '#14B8A6' },
];

export default function CreateCounterModal({ isOpen, onClose, userId }: CreateCounterModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createCounter } = useCounterStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Please enter a counter name');
      return;
    }

    if (name.trim().length < 2) {
      setError('Counter name must be at least 2 characters');
      return;
    }

    if (name.trim().length > 50) {
      setError('Counter name must be less than 50 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const newCounter: NewCounter = {
        user_id: userId,
        name: name.trim(),
        description: description.trim() || null,
        color: color,
        icon: icon.trim() || null,
      };

      await createCounter(newCounter);
      
      // Reset form and close modal
      setName('');
      setDescription('');
      setColor('#3B82F6');
      setIcon('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create counter');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setName('');
      setDescription('');
      setColor('#3B82F6');
      setIcon('');
      setError('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create Counter</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Counter Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Counter Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Beers, Workouts, Books Read"
              maxLength={50}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">{name.length}/50 characters</p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details about what you're tracking..."
              rows={3}
              maxLength={200}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">{description.length}/200 characters</p>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-4 gap-3">
              {PRESET_COLORS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setColor(preset.value)}
                  className={`h-12 rounded-lg transition-all ${
                    color === preset.value
                      ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: preset.value }}
                  title={preset.name}
                  disabled={isSubmitting}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <label htmlFor="customColor" className="text-sm text-gray-600">
                Or pick custom:
              </label>
              <input
                id="customColor"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                disabled={isSubmitting}
              />
              <span className="text-sm font-mono text-gray-600">{color}</span>
            </div>
          </div>

          {/* Icon (optional emoji) */}
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
              Icon <span className="text-gray-400">(optional emoji)</span>
            </label>
            <input
              id="icon"
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="🍺 💪 📚 ☕ 🏃"
              maxLength={4}
              className="w-full px-4 py-2 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">
              Tip: Copy/paste an emoji or type it directly
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? 'Creating...' : 'Create Counter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
