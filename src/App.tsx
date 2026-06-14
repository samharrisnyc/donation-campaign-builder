import { useEffect, useMemo, useState } from 'react';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { CampaignForm } from './components/CampaignForm';
import { CampaignPreview } from './components/CampaignPreview';
import { blankCampaign } from './data/sampleCampaign';
import { hasErrors, validateCampaign } from './lib/validation';
import { loadCampaign, persistCampaign } from './lib/storage';
import type { Campaign } from './types';

function App() {
  const [campaign, setCampaign] = useState<Campaign>(() => loadCampaign());
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const errors = useMemo(() => validateCampaign(campaign), [campaign]);
  const lastSaved = useMemo(
    () =>
      campaign.updatedAt
        ? new Intl.DateTimeFormat('en', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(campaign.updatedAt))
        : 'Not saved',
    [campaign.updatedAt],
  );

  useEffect(() => {
    persistCampaign(campaign);
  }, [campaign]);

  const updateCampaign = (nextCampaign: Campaign) => {
    setCampaign({ ...nextCampaign, updatedAt: new Date().toISOString() });
  };

  const startNewDraft = () => {
    setCampaign({ ...blankCampaign, id: crypto.randomUUID(), updatedAt: new Date().toISOString() });
  };

  return (
    <main>
      <header className="app-header">
        <div className="poster-kicker">
          <span>Campaign workspace</span>
        </div>
        <div className="poster-title-row">
          <div>
            <p className="eyebrow">Donation campaign builder</p>
            <h1>Donation Campaign Builder</h1>
          </div>
          <button type="button" className="primary-button" onClick={startNewDraft}>Start new draft</button>
        </div>
        <div className="poster-meta" aria-label="Campaign metadata">
          <div>
            <span>Draft status</span>
            <strong>{hasErrors(errors) ? 'Needs review' : 'Ready for review'}</strong>
          </div>
          <div>
            <span>Audience</span>
            <strong>Individual donors</strong>
          </div>
          <div>
            <span>Variant</span>
            <strong>{previewMode === 'desktop' ? 'Primary variant' : 'Mobile variant'}</strong>
          </div>
          <div>
            <span>Last saved</span>
            <strong>{lastSaved}</strong>
          </div>
        </div>
        <p className="header-note">
          Build a campaign appeal, review the donation ask, and move the draft toward launch.
        </p>
      </header>

      <div className="production-board">
        <div className="board-form">
          <CampaignForm campaign={campaign} errors={errors} onChange={updateCampaign} />
        </div>
        <div className="board-preview">
          <CampaignPreview
            campaign={campaign}
            previewMode={previewMode}
            onPreviewModeChange={setPreviewMode}
          />
        </div>
        <div className="board-pulse">
          <AnalyticsPanel campaign={campaign} />
        </div>
      </div>
    </main>
  );
}

export default App;
