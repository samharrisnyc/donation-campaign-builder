import { sampleCampaign } from '../data/sampleCampaign';
import type { Campaign } from '../types';

const storageKey = 'donation-campaign-builder:current-draft';

const normalizeCampaign = (campaign: Partial<Campaign>): Campaign => ({
  ...sampleCampaign,
  ...campaign,
  donationAmounts: Array.isArray(campaign.donationAmounts) ? campaign.donationAmounts : sampleCampaign.donationAmounts,
  updatedAt: campaign.updatedAt ?? new Date().toISOString(),
});

const isOldEmptyStarterDraft = (campaign: Partial<Campaign>) =>
  campaign.name === 'Untitled campaign' &&
  !campaign.headline?.trim() &&
  !campaign.intro?.trim() &&
  campaign.ctaText === 'Donate now';

export function loadCampaign(): Campaign {
  const stored = localStorage.getItem(storageKey);

  if (!stored) {
    return sampleCampaign;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<Campaign>;
    return isOldEmptyStarterDraft(parsed) ? sampleCampaign : normalizeCampaign(parsed);
  } catch {
    return sampleCampaign;
  }
}

export function persistCampaign(campaign: Campaign) {
  localStorage.setItem(storageKey, JSON.stringify(campaign));
}
