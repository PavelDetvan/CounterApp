'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

/**
 * Landing Page
 * Redirects to dashboard if logged in, otherwise shows welcome page
 */
export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Counter<span className="text-blue-600">App</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your daily activities with ease. Count beers, flights, habits, and anything else that matters to you.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Anything</h3>
            <p className="text-gray-600">Create custom counters for any activity or habit you want to monitor.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Mobile-First</h3>
            <p className="text-gray-600">Quick and easy to use on your phone. Increment with just one tap.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">View Stats</h3>
            <p className="text-gray-600">See your progress with detailed statistics and trends over time.</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition shadow-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
