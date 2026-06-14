export type ThemeId = 'field' | 'coral' | 'ink';

export type Campaign = {
  id: string;
  name: string;
  headline: string;
  intro: string;
  donationAmounts: number[];
  ctaText: string;
  theme: ThemeId;
  heroImageUrl: string;
  heroImageAlt: string;
  urgencyMessage: string;
  thankYouMessage: string;
  updatedAt: string;
};

export type CampaignDraft = Campaign;

export type FieldErrors = Partial<Record<keyof Campaign | 'donationAmountsText', string>>;

export type Theme = {
  id: ThemeId;
  name: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  contrastStatus: 'Pass' | 'Review';
  contrastNote: string;
};

export type AnalyticsMetric = {
  label: string;
  value: string;
  detail: string;
};

export type VariantResult = {
  variant: string;
  clicks: number;
  conversions: number;
};
