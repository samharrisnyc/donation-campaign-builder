import { useMemo, useState } from 'react';
import { generateCampaignHtml } from '../lib/exportHtml';
import type { Campaign } from '../types';

type ExportHtmlProps = {
  campaign: Campaign;
};

export function ExportHtml({ campaign }: ExportHtmlProps) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => generateCampaignHtml(campaign), [campaign]);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="panel export-panel" aria-labelledby="export-heading">
      <div className="panel-heading saved-heading-row">
        <div>
          <p className="eyebrow">Export</p>
          <h2 id="export-heading">HTML snippet</h2>
        </div>
        <button type="button" className="secondary-button" onClick={copyHtml}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <textarea value={html} readOnly aria-label="Generated HTML snippet" rows={10} />
    </section>
  );
}
