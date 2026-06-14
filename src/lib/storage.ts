import { sampleCampaign } from '../data/sampleCampaign';
import type { CampaignDraft } from '../types';

const storageKey = 'donation-campaign-builder:drafts';

export function loadDrafts(): CampaignDraft[] {
  const stored = localStorage.getItem(storageKey);

  if (!stored) {
    return [sampleCampaign];
  }

  try {
    const parsed = JSON.parse(stored) as CampaignDraft[];
    return parsed.length ? parsed : [sampleCampaign];
  } catch {
    return [sampleCampaign];
  }
}

export function persistDrafts(drafts: CampaignDraft[]) {
  localStorage.setItem(storageKey, JSON.stringify(drafts));
}

export function upsertDraft(drafts: CampaignDraft[], draft: CampaignDraft): CampaignDraft[] {
  const nextDraft = { ...draft, updatedAt: new Date().toISOString() };
  const existing = drafts.some((item) => item.id === draft.id);

  if (existing) {
    return drafts.map((item) => (item.id === draft.id ? nextDraft : item));
  }

  return [nextDraft, ...drafts];
}
