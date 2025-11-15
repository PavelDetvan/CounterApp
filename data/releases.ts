export interface Release {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: {
    added?: string[];
    improved?: string[];
    fixed?: string[];
  };
}

export const releases: Release[] = [
  {
    version: '1.1.0',
    date: '2024-11-15',
    title: 'Feedback System & Release Notes',
    description: 'Added user feedback collection and version tracking to improve the app based on user input.',
    changes: {
      added: [
        'Floating feedback button on all pages',
        'Feedback form with bug reports, feature requests, and general feedback',
        'Release notes page showing version history',
        'Email collection for follow-up (optional)',
        'Feedback stored in database for tracking',
      ],
      improved: [
        'Better mobile responsiveness across all pages',
        'Enhanced documentation with deployment guides',
        'Clearer user experience throughout the app',
      ],
    },
  },
  {
    version: '1.0.0',
    date: '2024-11-15',
    title: 'Initial Release - Core Features',
    description: 'First production release with complete counter management system.',
    changes: {
      added: [
        'User authentication with signup and login',
        'Dashboard with responsive counter grid',
        'Create counters with custom names and descriptions',
        'Color picker with 8 presets plus custom colors',
        'Emoji icon support for counters',
        'Increment and decrement buttons (+1/-1)',
        'Today\'s count badge showing daily activity',
        'Real-time updates with optimistic UI',
        'Character limits with live counters',
        'PWA manifest for mobile installation',
      ],
      improved: [
        'Database schema with Row Level Security',
        'Automatic deployment from GitHub to Vercel',
        'TypeScript for full type safety',
      ],
      fixed: [
        'Hydration mismatch warnings in Next.js',
        'Multiple Supabase client instances',
        'Theme color metadata configuration',
        'Manifest.json 404 errors',
      ],
    },
  },
];

// Get current version (latest release)
export const currentVersion = releases[0].version;
