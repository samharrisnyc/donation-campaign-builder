import type { Campaign } from '../types';

type CampaignPreviewProps = {
  campaign: Campaign;
  previewMode: 'desktop' | 'mobile';
  onPreviewModeChange: (mode: 'desktop' | 'mobile') => void;
};

export function CampaignPreview({ campaign, previewMode, onPreviewModeChange }: CampaignPreviewProps) {
  const previewStatus = !campaign.headline.trim()
    ? 'Needs headline'
    : !campaign.intro.trim()
      ? 'Needs intro'
      : 'Ready for review';

  return (
    <section className="panel preview-panel" aria-labelledby="preview-heading">
      <div className="panel-heading preview-heading-row">
        <div>
          <p className="eyebrow">Campaign preview</p>
          <h2 id="preview-heading">Donation page preview</h2>
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
        >
          <div className="campaign-copy">
            <p className="preview-status">{previewStatus}</p>
            <h3>{campaign.headline || 'Campaign headline appears here'}</h3>
            <p>{campaign.intro || 'Add a short paragraph explaining the campaign and why it matters.'}</p>
            <div className="amount-row" aria-label="Suggested donation amounts">
              {campaign.donationAmounts.map((amount) => (
                <button type="button" key={amount}>${amount}</button>
              ))}
            </div>
            <button type="button" className="campaign-cta">{campaign.ctaText || 'Donate'}</button>
            <p className="preview-note">Thank you for helping move this campaign toward launch.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
