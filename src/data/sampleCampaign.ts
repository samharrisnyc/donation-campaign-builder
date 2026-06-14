import type { Campaign } from '../types';

export const sampleCampaign: Campaign = {
  id: 'sample-community-kitchen',
  name: 'Community Kitchen Spring Drive',
  headline: 'Help serve 4,000 fresh meals this spring',
  intro:
    'Your gift helps our volunteer kitchen prepare healthy dinners, pantry staples, and warm handoffs for neighbors navigating food insecurity.',
  donationAmounts: [10, 25, 50, 100],
  ctaText: 'Give a meal today',
  theme: 'field',
  heroImageUrl:
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
  heroImageAlt: 'Volunteers packing fresh produce and pantry boxes for a community food program',
  urgencyMessage: 'Spring match active through Friday: every gift is doubled.',
  thankYouMessage: 'Thank you for helping neighbors eat well this week.',
  updatedAt: new Date().toISOString(),
};

export const blankCampaign: Campaign = {
  id: crypto.randomUUID(),
  name: 'Untitled campaign',
  headline: '',
  intro: '',
  donationAmounts: [5, 15, 25, 50],
  ctaText: 'Donate now',
  theme: 'field',
  heroImageUrl: '',
  heroImageAlt: '',
  urgencyMessage: '',
  thankYouMessage: 'Thank you for supporting this campaign.',
  updatedAt: new Date().toISOString(),
};
