import { getTheme } from '../data/themes';
import type { Campaign } from '../types';

type CampaignPreviewProps = {
  campaign: Campaign;
  previewMode: 'desktop' | 'mobile';
  onPreviewModeChange: (mode: 'desktop' | 'mobile') => void;
};

export function CampaignPreview({ campaign, previewMode, onPreviewModeChange }: CampaignPreviewProps) {
  const theme = getTheme(campaign.theme);

  return (
    <section className="panel preview-panel" aria-labelledby="preview-heading">
      <div className="panel-heading preview-heading-row">
        <div>
          <p className="eyebrow">Live preview</p>
          <h2 id="preview-heading">Donor-facing page</h2>
        </div>
        <div className="segmented-control" aria-label="Preview size">
          <button
            type="button"
            className={previewMode === 'desktop' ? 'active' : ''}
            onClick={() => onPreviewModeChange('desktop')}
          >
            Desktop
          </button>
          <button
            type="button"
            className={previewMode === 'mobile' ? 'active' : ''}
            onClick={() => onPreviewModeChange('mobile')}
          >
            Mobile
          </button>
        </div>
      </div>

      <div className={`preview-frame ${previewMode}`} aria-live="polite">
        <article
          className="campaign-card"
          style={{
            '--theme-accent': theme.accent,
            '--theme-bg': theme.background,
            '--theme-surface': theme.surface,
            '--theme-text': theme.text,
          } as React.CSSProperties}
        >
          <div className="campaign-copy">
            {campaign.urgencyMessage && <p className="urgency">{campaign.urgencyMessage}</p>}
            <h3>{campaign.headline || 'Your campaign headline will appear here'}</h3>
            <p>{campaign.intro || 'Add a short, specific paragraph that tells donors what their gift makes possible.'}</p>
            <div className="amount-row" aria-label="Suggested donation amounts">
              {campaign.donationAmounts.map((amount) => (
                <button type="button" key={amount}>${amount}</button>
              ))}
            </div>
            <button type="button" className="campaign-cta">{campaign.ctaText || 'Donate'}</button>
            {campaign.thankYouMessage && <p className="thanks">{campaign.thankYouMessage}</p>}
          </div>

          {campaign.heroImageUrl ? (
            <img src={campaign.heroImageUrl} alt={campaign.heroImageAlt} />
          ) : (
            <div className="image-placeholder" aria-label="Campaign image placeholder">
              <span>Campaign image</span>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
