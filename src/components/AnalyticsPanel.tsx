import type { AnalyticsMetric, Campaign, VariantResult } from '../types';

const baseMetrics: AnalyticsMetric[] = [
  { label: 'Impressions', value: '18.4K', detail: '+12% vs. last appeal' },
  { label: 'Conversion', value: '8.7%', detail: 'Projected conversion' },
  { label: 'Average Donation', value: '$42', detail: 'Based on amount mix' },
];

const variantResults: VariantResult[] = [
  { variant: 'Ask A', clicks: 1480, conversions: 121 },
  { variant: 'Ask B', clicks: 1660, conversions: 149 },
];

type AnalyticsPanelProps = {
  campaign: Campaign;
};

export function AnalyticsPanel({ campaign }: AnalyticsPanelProps) {
  const maxConversions = Math.max(...variantResults.map((result) => result.conversions));
  const averageDonation =
    campaign.donationAmounts.length > 0
      ? Math.round(campaign.donationAmounts.reduce((sum, amount) => sum + amount, 0) / campaign.donationAmounts.length)
      : 0;
  const metrics = baseMetrics.map((metric) =>
    metric.label === 'Average Donation' ? { ...metric, value: `$${averageDonation || 42}` } : metric,
  );

  return (
    <section className="panel analytics-panel" aria-labelledby="analytics-heading">
      <div className="panel-heading">
        <p className="eyebrow">Response forecast</p>
        <h2 id="analytics-heading">Campaign pulse</h2>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="chart-wrap" aria-label="A/B comparison chart">
        {variantResults.map((result) => (
          <div className="chart-row" key={result.variant}>
            <span>{result.variant}</span>
            <div className="chart-track">
              <div style={{ width: `${(result.conversions / maxConversions) * 100}%` }} />
            </div>
            <strong>{result.conversions} gifts</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
