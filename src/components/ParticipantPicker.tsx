import type { Participant } from '../data/types'
import { ParticipantPortrait } from './ParticipantPortrait'

interface Props {
  participants: Participant[]
  onSelect: (id: string) => void
  onBack: () => void
  onOpenReports?: () => void
}

export function ParticipantPicker({ participants, onSelect, onBack, onOpenReports }: Props) {
  return (
    <section className="picker panel">
      <button type="button" className="text-btn back" onClick={onBack}>
        ← Back
      </button>
      <p className="eyebrow">Choose your path</p>
      <h2 className="display">Pick a participant</h2>
      <p className="lead">
        Each journey is fictional demo data. Follow the business story — open API evidence
        when you want to see the response behind a decision.
      </p>

      <div className="participant-grid">
        {participants.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className="participant-card"
            style={{ ['--accent' as string]: p.accent, animationDelay: `${i * 80}ms` }}
            onClick={() => onSelect(p.id)}
          >
            <span className="participant-card-top">
              <ParticipantPortrait id={p.id} name={p.name} accent={p.accent} size="md" />
              <span className="participant-card-copy">
                <span className="participant-name">{p.name}</span>
                <span className="participant-meta">{p.ageBand}</span>
              </span>
            </span>
            <span className="participant-tag">{p.tagline}</span>
            <span className="participant-scenario">{p.scenario}</span>
            <span className="participant-cta">Start journey →</span>
          </button>
        ))}
      </div>

      {onOpenReports && (
        <div className="picker-reports">
          <button type="button" className="btn btn-ghost" onClick={onOpenReports}>
            Or explore notification reports →
          </button>
        </div>
      )}
    </section>
  )
}
