import type { Campaign, FieldErrors } from '../types';

const genericCtaTerms = ['donate', 'click here', 'submit', 'give', 'learn more'];

export const parseDonationAmounts = (value: string): number[] =>
  value
    .split(',')
    .map((amount) => Number(amount.trim()))
    .filter((amount) => Number.isFinite(amount) && amount > 0);

export const formatDonationAmounts = (amounts: number[]): string => amounts.join(', ');

export function validateCampaign(campaign: Campaign): FieldErrors {
  const errors: FieldErrors = {};

  if (!campaign.headline.trim()) {
    errors.headline = 'Add a clear campaign headline.';
  }

  if (!campaign.intro.trim()) {
    errors.intro = 'Write a short intro so donors understand the ask.';
  }

  if (!campaign.ctaText.trim()) {
    errors.ctaText = 'Add CTA button text.';
  }

  if (campaign.donationAmounts.length < 2) {
    errors.donationAmountsText = 'Add at least two donation amounts.';
  }

  return errors;
}

export function getAccessibilityWarnings(campaign: Campaign) {
  const warnings: string[] = [];
  const normalizedCta = campaign.ctaText.trim().toLowerCase();

  if (!campaign.headline.trim()) {
    warnings.push('Headline is missing. Use one descriptive heading for the campaign preview.');
  }

  if (campaign.ctaText.trim().length < 8 || genericCtaTerms.includes(normalizedCta)) {
    warnings.push('CTA text is short or generic. Make the action specific to the donation moment.');
  }

  if (campaign.donationAmounts.length === 0) {
    warnings.push('Donation amount buttons are missing.');
  }

  return warnings;
}

export const hasErrors = (errors: FieldErrors) => Object.keys(errors).length > 0;
