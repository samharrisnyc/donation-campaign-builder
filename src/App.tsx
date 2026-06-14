import { useMemo, useState } from 'react';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { CampaignForm } from './components/CampaignForm';
import { CampaignPreview } from './components/CampaignPreview';
import { ExportHtml } from './components/ExportHtml';
import { SavedDrafts } from './components/SavedDrafts';
import { blankCampaign } from './data/sampleCampaign';
import { hasErrors, validateCampaign } from './lib/validation';
import { loadDrafts, persistDrafts, upsertDraft } from './lib/storage';
import type { Campaign, CampaignDraft } from './types';

function App() {
  const [drafts, setDrafts] = useState<CampaignDraft[]>(() => loadDrafts());
  const [campaign, setCampaign] = useState<Campaign>(() => drafts[0] ?? blankCampaign);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const errors = useMemo(() => validateCampaign(campaign), [campaign]);

  const saveDraft = () => {
    const nextDrafts = upsertDraft(drafts, campaign);
    setDrafts(nextDrafts);
    setCampaign(nextDrafts.find((draft) => draft.id === campaign.id) ?? campaign);
    persistDrafts(nextDrafts);
  };

  const loadDraft = (draft: CampaignDraft) => {
    setCampaign(draft);
  };

  const deleteDraft = (id: string) => {
    const nextDrafts = drafts.filter((draft) => draft.id !== id);
    setDrafts(nextDrafts);
    persistDrafts(nextDrafts);

    if (campaign.id === id && nextDrafts[0]) {
      setCampaign(nextDrafts[0]);
    }
  };

  const startNewDraft = () => {
    setCampaign({ ...blankCampaign, id: crypto.randomUUID(), updatedAt: new Date().toISOString() });
  };

  return (
    <main>
      <header className="app-header">
        <div>
          <p className="eyebrow">Portfolio project</p>
          <h1>Donation Campaign Builder</h1>
          <p>
            A practical front-end tool for drafting accessible nonprofit donation pages, previewing donor-facing
            copy, and preparing handoff-ready HTML.
          </p>
        </div>
        <button type="button" className="primary-button" onClick={startNewDraft}>New campaign</button>
      </header>

      <div className="status-bar" role="status">
        {hasErrors(errors)
          ? 'Draft needs a few required fields before it is campaign-ready.'
          : 'Draft passes required content checks.'}
      </div>

      <div className="workspace">
        <CampaignForm campaign={campaign} errors={errors} onChange={setCampaign} />
        <CampaignPreview
          campaign={campaign}
          previewMode={previewMode}
          onPreviewModeChange={setPreviewMode}
        />
      </div>

      <div className="support-grid">
        <AccessibilityPanel campaign={campaign} />
        <AnalyticsPanel campaign={campaign} />
      </div>

      <div className="support-grid bottom-grid">
        <SavedDrafts
          drafts={drafts}
          currentId={campaign.id}
          onSave={saveDraft}
          onLoad={loadDraft}
          onDelete={deleteDraft}
        />
        <ExportHtml campaign={campaign} />
      </div>
    </main>
  );
}

export default App;
