import { themes } from '../data/themes';
import { formatDonationAmounts, parseDonationAmounts } from '../lib/validation';
import type { Campaign, FieldErrors, ThemeId } from '../types';

type CampaignFormProps = {
  campaign: Campaign;
  errors: FieldErrors;
  onChange: (campaign: Campaign) => void;
};

export function CampaignForm({ campaign, errors, onChange }: CampaignFormProps) {
  const update = <Key extends keyof Campaign>(key: Key, value: Campaign[Key]) => {
    onChange({ ...campaign, [key]: value });
  };

  return (
    <section className="panel builder-panel" aria-labelledby="builder-heading">
      <div className="panel-heading">
        <p className="eyebrow">Campaign setup</p>
        <h2 id="builder-heading">Build the appeal</h2>
      </div>

      <div className="form-grid">
        <label>
          Campaign name
          <input
            aria-label="Campaign name"
            value={campaign.name}
            onChange={(event) => update('name', event.target.value)}
            placeholder="Community kitchen spring drive"
          />
        </label>

        <label>
          Headline
          <input
            aria-label="Headline"
            value={campaign.headline}
            onChange={(event) => update('headline', event.target.value)}
            aria-invalid={Boolean(errors.headline)}
            aria-describedby={errors.headline ? 'headline-error' : undefined}
            placeholder="Help serve 4,000 fresh meals"
          />
          {errors.headline && <span id="headline-error" className="field-error">{errors.headline}</span>}
        </label>

        <label className="span-2">
          Short intro paragraph
          <textarea
            aria-label="Short intro paragraph"
            value={campaign.intro}
            onChange={(event) => update('intro', event.target.value)}
            aria-invalid={Boolean(errors.intro)}
            aria-describedby={errors.intro ? 'intro-error' : undefined}
            rows={4}
            placeholder="Explain the need, who benefits, and why now."
          />
          {errors.intro && <span id="intro-error" className="field-error">{errors.intro}</span>}
        </label>

        <label>
          Donation amounts
          <input
            aria-label="Donation amounts"
            value={formatDonationAmounts(campaign.donationAmounts)}
            onChange={(event) => update('donationAmounts', parseDonationAmounts(event.target.value))}
            aria-invalid={Boolean(errors.donationAmountsText)}
            aria-describedby={errors.donationAmountsText ? 'amounts-error' : undefined}
            placeholder="5, 15, 25, 50"
          />
          {errors.donationAmountsText && (
            <span id="amounts-error" className="field-error">{errors.donationAmountsText}</span>
          )}
        </label>

        <label>
          CTA button text
          <input
            aria-label="CTA button text"
            value={campaign.ctaText}
            onChange={(event) => update('ctaText', event.target.value)}
            aria-invalid={Boolean(errors.ctaText)}
            aria-describedby={errors.ctaText ? 'cta-error' : undefined}
            placeholder="Give a meal today"
          />
          {errors.ctaText && <span id="cta-error" className="field-error">{errors.ctaText}</span>}
        </label>

        <fieldset className="theme-fieldset span-2">
          <legend>Theme</legend>
          <div className="theme-options">
            {themes.map((theme) => (
              <label key={theme.id} className="theme-option">
                <input
                  type="radio"
                  name="theme"
                  value={theme.id}
                  checked={campaign.theme === theme.id}
                  onChange={(event) => update('theme', event.target.value as ThemeId)}
                />
                <span className="swatch" style={{ background: theme.accent }} />
                {theme.name}
              </label>
            ))}
          </div>
        </fieldset>

        <label>
          Optional hero image URL
          <input
            aria-label="Optional hero image URL"
            value={campaign.heroImageUrl}
            onChange={(event) => update('heroImageUrl', event.target.value)}
            placeholder="https://images.unsplash.com/..."
          />
        </label>

        <label>
          Hero image alt text
          <input
            aria-label="Hero image alt text"
            value={campaign.heroImageAlt}
            onChange={(event) => update('heroImageAlt', event.target.value)}
            aria-invalid={Boolean(errors.heroImageAlt)}
            aria-describedby={errors.heroImageAlt ? 'alt-error' : undefined}
            placeholder="Volunteers packing produce boxes"
          />
          {errors.heroImageAlt && <span id="alt-error" className="field-error">{errors.heroImageAlt}</span>}
        </label>

        <label>
          Urgency message
          <input
            aria-label="Urgency message"
            value={campaign.urgencyMessage}
            onChange={(event) => update('urgencyMessage', event.target.value)}
            placeholder="Match active through Friday"
          />
        </label>

        <label>
          Thank-you message
          <input
            aria-label="Thank-you message"
            value={campaign.thankYouMessage}
            onChange={(event) => update('thankYouMessage', event.target.value)}
            placeholder="Thank you for showing up for neighbors."
          />
        </label>
      </div>
    </section>
  );
}
