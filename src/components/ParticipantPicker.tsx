import { useState } from 'react'
import type { Participant, TeamFocus } from '../data/types'
import { ParticipantPortrait } from './ParticipantPortrait'

interface Props {
  participants: Participant[]
  onSelect: (id: string) => void
  onBack: () => void
  onOpenReports?: () => void
}

type TeamFilter = 'all' | TeamFocus

const TEAM_FILTERS: { id: TeamFilter; label: string; blurb: string }[] = [
  { id: 'all', label: 'All teams', blurb: 'Every journey' },
  {
    id: 'intake',
    label: 'Intake',
    blurb: 'Plan type, consent, first checks',
  },
  {
    id: 'operations',
    label: 'Operations',
    blurb: 'Bookings, goals, quotations',
  },
  {
    id: 'finance',
    label: 'Finance',
    blurb: 'Claims, payments, reports',
  },
]

const TEAM_LABELS: Record<TeamFocus, string> = {
  intake: 'Intake',
  operations: 'Operations',
  finance: 'Finance',
}

export function ParticipantPicker({ participants, onSelect, onBack, onOpenReports }: Props) {
  const [teamFilter, setTeamFilter] = useState<TeamFilter>('all')

  const filtered =
    teamFilter === 'all'
      ? participants
      : participants.filter((p) => p.teams.includes(teamFilter))

  const activeBlurb = TEAM_FILTERS.find((t) => t.id === teamFilter)?.blurb

  return (
    <section className="picker panel">
      <button type="button" className="text-btn back" onClick={onBack}>
        ← Back
      </button>
      <p className="eyebrow">Choose your path</p>
      <h2 className="display">Pick a participant</h2>
      <p className="lead">
        Each journey is fictional demo data. Filter by team to see the stories that matter
        most for Intake, Operations, or Finance.
      </p>

      <div className="team-filters" role="tablist" aria-label="Filter journeys by team">
        {TEAM_FILTERS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={teamFilter === t.id}
            className={teamFilter === t.id ? 'team-filter active' : 'team-filter'}
            onClick={() => setTeamFilter(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {activeBlurb && <p className="team-filter-blurb">{activeBlurb}</p>}

      <div className="participant-grid">
        {filtered.map((p, i) => (
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
            <span className="participant-teams">
              {p.teams.map((team) => (
                <span key={team} className="participant-team-chip">
                  {TEAM_LABELS[team]}
                </span>
              ))}
            </span>
            <span className="participant-tag">{p.tagline}</span>
            <span className="participant-scenario">{p.scenario}</span>
            <span className="participant-cta">Start journey →</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="team-filter-empty">No journeys for this team yet.</p>
      )}

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
