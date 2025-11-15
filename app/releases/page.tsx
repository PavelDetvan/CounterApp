'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Calendar, Package, Plus, Wrench, Bug } from 'lucide-react';
import { releases, currentVersion } from '@/data/releases';

export default function ReleasesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Current: <span className="font-semibold text-blue-600">v{currentVersion}</span>
              </span>
              <Link
                href="/dashboard"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Package className="w-4 h-4" />
            Version History
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Release Notes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track every improvement, feature, and fix as CounterApp evolves
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

          {/* Release Cards */}
          <div className="space-y-12">
            {releases.map((release, index) => (
              <div key={release.version} className="relative pl-8 md:pl-24">
                {/* Version Badge */}
                <div className="absolute left-0 md:left-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white">
                  <span className="text-sm md:text-base">v{release.version}</span>
                </div>

                {/* Release Card */}
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {release.title}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(release.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg">{release.description}</p>
                  </div>

                  {/* Changes */}
                  <div className="space-y-6">
                    {/* Added Features */}
                    {release.changes.added && release.changes.added.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-green-600 mb-3 flex items-center gap-2 uppercase tracking-wide">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Plus className="w-4 h-4 text-green-600" />
                          </div>
                          Added
                        </h3>
                        <ul className="space-y-2 ml-10">
                          {release.changes.added.map((item, i) => (
                            <li key={i} className="text-gray-700 flex items-start gap-3">
                              <span className="text-green-500 text-lg leading-none mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Improvements */}
                    {release.changes.improved && release.changes.improved.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-blue-600 mb-3 flex items-center gap-2 uppercase tracking-wide">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Wrench className="w-4 h-4 text-blue-600" />
                          </div>
                          Improved
                        </h3>
                        <ul className="space-y-2 ml-10">
                          {release.changes.improved.map((item, i) => (
                            <li key={i} className="text-gray-700 flex items-start gap-3">
                              <span className="text-blue-500 text-lg leading-none mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Bug Fixes */}
                    {release.changes.fixed && release.changes.fixed.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-red-600 mb-3 flex items-center gap-2 uppercase tracking-wide">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <Bug className="w-4 h-4 text-red-600" />
                          </div>
                          Fixed
                        </h3>
                        <ul className="space-y-2 ml-10">
                          {release.changes.fixed.map((item, i) => (
                            <li key={i} className="text-gray-700 flex items-start gap-3">
                              <span className="text-red-500 text-lg leading-none mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Want to track your activities?
            </h3>
            <p className="text-gray-600 mb-6">
              Sign up now and start tracking anything that matters to you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
