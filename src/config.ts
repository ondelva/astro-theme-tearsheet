// src/config.ts — single entry point for site settings. Everything site-specific lives here; never hardcode in components.
export const site = {
  name: 'Harbor Notes',
  description: 'What a box costs to move, and why it changed.',
  url: 'https://example.com',
  locale: 'en', // BCP 47, e.g. 'en', 'ko'
  author: 'Ines Varga', // Fictional demo author. Replace with your name
  defaultOgImage: '/og-default.png',
} as const;

export const nav = {
  header: [
    { label: 'Archive', href: '/archive' },
    { label: 'About', href: '/about' },
    { label: 'Subscribe', href: '/subscribe' },
  ],
  footer: [
    {
      title: 'Site',
      links: [
        { label: 'Archive', href: '/archive' },
        { label: 'About', href: '/about' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
    {
      title: 'Readers',
      links: [
        { label: 'Start here', href: '/start-here' },
        { label: 'Corrections', href: '/corrections' },
        { label: 'Sponsor an issue', href: '/sponsor' },
      ],
    },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/', icon: 'lucide:github' },
    // Icons are Lucide names (https://lucide.dev/icons)
  ],
} as const;

export const seo = {
  titleTemplate: '%s · Harbor Notes',
  twitterHandle: '',
  jsonLd: { type: 'Person' as 'Person' | 'Organization', name: site.author },
};

export const newsletter = {
  cadence: 'Every Tuesday',
  // Number of the oldest issue on the site. Moving from another platform mid-run? Set it to
  // the number your first imported issue had there, and the rest count up from it by date.
  firstIssue: 93,
  // The Cut: a members issue's free part ends at <!-- cut --> and the rest is removed from the
  // build (page and RSS). false keeps the removal but shows a plain "Continue reading" link
  // instead of the rule, word meter and form.
  theCut: true,
  price: '$12/mo', // printed on the members button; keep it in step with `plans` below
  // The subscribe forms post to Buttondown. Another provider: src/lib/subscribe-target.ts.
  username: 'harbor-notes', // Buttondown newsletter username
  homeRecent: 8, // archive rows on the home page
};

// The /subscribe table, in order. `price` is printed as written.
export const plans = [
  {
    name: 'Free',
    price: '$0',
    detail: 'The free issues, about two in five, and the opening of every members issue.',
  },
  { name: 'Monthly', price: '$12 a month', detail: 'Every issue in full, plus the archive.' },
  {
    name: 'Annual',
    price: '$120 a year',
    detail: 'Every issue in full, plus the archive. Two months free.',
  },
];

export const features = {
  darkMode: true,
};

export const analytics = {
  provider: null as null | 'plausible' | 'ga4' | 'umami',
  id: '',
  // Self-hosted Plausible or Umami: the origin serving the script, no trailing slash.
  // Empty means the hosted service. GA4 ignores it.
  host: '',
};
