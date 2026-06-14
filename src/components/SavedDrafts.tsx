import type { CampaignDraft } from '../types';

type SavedDraftsProps = {
  drafts: CampaignDraft[];
  currentId: string;
  onSave: () => void;
  onLoad: (draft: CampaignDraft) => void;
  onDelete: (id: string) => void;
};

export function SavedDrafts({ drafts, currentId, onSave, onLoad, onDelete }: SavedDraftsProps) {
  return (
    <section className="panel" aria-labelledby="saved-heading">
      <div className="panel-heading saved-heading-row">
        <div>
          <p className="eyebrow">Local storage</p>
          <h2 id="saved-heading">Saved drafts</h2>
        </div>
        <button type="button" className="secondary-button" onClick={onSave}>Save draft</button>
      </div>

      <div className="draft-list">
        {drafts.map((draft) => (
          <article className={draft.id === currentId ? 'draft-card active' : 'draft-card'} key={draft.id}>
            <div>
              <strong>{draft.name || 'Untitled campaign'}</strong>
              <span>{new Date(draft.updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="draft-actions">
              <button type="button" onClick={() => onLoad(draft)}>Load</button>
              <button type="button" onClick={() => onDelete(draft.id)} disabled={drafts.length === 1}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
