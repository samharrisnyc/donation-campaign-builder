export type Campaign = {
  id: string;
  name: string;
  headline: string;
  intro: string;
  donationAmounts: number[];
  ctaText: string;
  updatedAt: string;
};

export type FieldErrors = Partial<Record<keyof Campaign | 'donationAmountsText', string>>;

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
