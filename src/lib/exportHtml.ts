import { getTheme } from '../data/themes';
import type { Campaign } from '../types';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export function generateCampaignHtml(campaign: Campaign) {
  const theme = getTheme(campaign.theme);
  const amounts = campaign.donationAmounts
    .map((amount) => `<button type="button" class="donation-chip">$${amount}</button>`)
    .join('');
  const hero = campaign.heroImageUrl
    ? `<img src="${escapeHtml(campaign.heroImageUrl)}" alt="${escapeHtml(campaign.heroImageAlt)}" />`
    : '';

  return `<section class="donation-campaign" style="--accent:${theme.accent};--bg:${theme.background};--surface:${theme.surface};--text:${theme.text};">
  <div class="campaign-copy">
    ${campaign.urgencyMessage ? `<p class="urgency">${escapeHtml(campaign.urgencyMessage)}</p>` : ''}
    <h2>${escapeHtml(campaign.headline)}</h2>
    <p>${escapeHtml(campaign.intro)}</p>
    <div class="donation-amounts" aria-label="Suggested donation amounts">${amounts}</div>
    <button class="campaign-cta" type="button">${escapeHtml(campaign.ctaText)}</button>
    <p class="thanks">${escapeHtml(campaign.thankYouMessage)}</p>
  </div>
  ${hero}
</section>`;
}
