export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/#hero' },
  { label: 'Our Programme', href: '/#programme' },
  { label: 'Why GapZero', href: '/#why-gapzero' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQs', href: '/#faqs' },
  { label: 'Contact Us', href: '/#contact' },
];

export const FOOTER_LINKS = {
  navigation: [
    { label: 'Home', href: '/#hero' },
    { label: 'Our Programme', href: '/#programme' },
    { label: 'Why GapZero', href: '/#why-gapzero' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'FAQs', href: '/#faqs' },
    { label: 'Book Counselling', href: '/book-counselling' },
  ],
  subjects: [
    { label: 'Physics Personalized Coaching', href: '/book-counselling?subject=physics' },
    { label: 'Chemistry Targeted Coaching', href: '/book-counselling?subject=chemistry' },
    { label: 'Mathematics Focused Coaching', href: '/book-counselling?subject=mathematics' },
  ],
  legal: [
    { label: 'Privacy Policy (Draft)', href: '/privacy-policy' },
    { label: 'Terms and Conditions (Draft)', href: '/terms-and-conditions' },
    { label: 'Cancellation & Refund Policy (Draft)', href: '/cancellation-and-refund' },
  ]
};
