import { getTheme } from '../data/themes';
import { getAccessibilityWarnings } from '../lib/validation';
import type { Campaign } from '../types';

type AccessibilityPanelProps = {
  campaign: Campaign;
};

export function AccessibilityPanel({ campaign }: AccessibilityPanelProps) {
  const theme = getTheme(campaign.theme);
  const warnings = getAccessibilityWarnings(campaign);

  return (
    <section className="panel" aria-labelledby="accessibility-heading">
      <div className="panel-heading">
        <p className="eyebrow">Accessibility</p>
        <h2 id="accessibility-heading">Content checks</h2>
      </div>

      <div className={`contrast-status ${theme.contrastStatus === 'Pass' ? 'pass' : 'review'}`}>
        <strong>Color contrast: {theme.contrastStatus}</strong>
        <span>{theme.contrastNote}</span>
      </div>

      {warnings.length ? (
        <ul className="warning-list">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">No accessibility warnings for the current draft.</p>
      )}
    </section>
  );
}
