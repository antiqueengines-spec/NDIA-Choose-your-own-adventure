import { getMock } from '../data/mocks'
import { getStep } from '../data/participants'
import type { Participant } from '../data/types'
import { ApiEvidence } from './ApiEvidence'
import { ParsedResponse } from './ParsedResponse'
import { ParticipantPortrait } from './ParticipantPortrait'
import { ReadablePanel } from './ReadablePanel'

interface Props {
  participant: Participant
  stepId: string
  history: string[]
  onChoose: (nextStepId: string) => void
  onRestart: () => void
  onPickAnother: () => void
  onOpenReports?: () => void
}


export function JourneyPlayer({
  participant,
  stepId,
  history,
  onChoose,
  onRestart,
  onPickAnother,
  onOpenReports,
}: Props) {
  const step = getStep(participant, stepId)
  if (!step) {
    return (
      <div className="panel">
        <p>Step not found.</p>
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          Start over
        </button>
      </div>
    )
  }

  const mock = getMock(step.mockId)
  const progress = Math.min(100, Math.round((history.length / Math.max(participant.steps.length - 1, 1)) * 100))

  if (step.isEnding) {
    return (
      <article className="ending panel" style={{ ['--accent' as string]: participant.accent }}>
        <div className="journey-identity">
          <ParticipantPortrait
            id={participant.id}
            name={participant.name}
            accent={participant.accent}
            size="lg"
          />
          <p className="eyebrow">Journey complete · {participant.name}</p>
        </div>
        <h2 className="display">{step.title}</h2>
        <p className="lead">{step.business}</p>
        {step.endingSummary && <p className="ending-summary">{step.endingSummary}</p>}

        <div className="cta-card">
          <h3>Bring this flow into your systems</h3>
          <p>
            Care Access connects your CRM or practice software to NDIA APIs — plan checks,
            consent, PACE, and claims — without building a Digital Partnership from scratch.
          </p>
          <div className="cta-actions">
            <a
              className="btn btn-primary"
              href="https://www.yourcareaccess.com.au/"
              target="_blank"
              rel="noreferrer"
            >
              Visit Care Access
            </a>
            <a
              className="btn btn-ghost"
              href="https://www.yourcareaccess.com.au/servicesandsolutions"
              target="_blank"
              rel="noreferrer"
            >
              Explore CA Lite
            </a>
          </div>
        </div>

        <div className="ending-nav">
          <button type="button" className="btn btn-ghost" onClick={onPickAnother}>
            Try another participant
          </button>
          {onOpenReports && (
            <button type="button" className="btn btn-ghost" onClick={onOpenReports}>
              View business reports
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={onRestart}>
            Back to start
          </button>
        </div>
      </article>
    )
  }

  return (
    <article className="journey panel" style={{ ['--accent' as string]: participant.accent }}>
      <header className="journey-top">
        <div className="journey-heading">
          <ParticipantPortrait
            id={participant.id}
            name={participant.name}
            accent={participant.accent}
            size="lg"
          />
          <div>
            <p className="eyebrow">
              {participant.name} · {participant.managementType}
            </p>
            <h2 className="display step-title">{step.title}</h2>
          </div>
        </div>
        <div className="progress" aria-label={`Progress ${progress}%`}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">Step {history.length}</span>
        </div>
      </header>

      <p className={`business tone-${step.tone ?? 'neutral'}`}>{step.business}</p>

      {step.withoutCareAccess && (
        <aside className="callout callout-warn">
          <strong>Without Care Access</strong>
          <p>{step.withoutCareAccess}</p>
        </aside>
      )}

      {step.note && (
        <aside className="callout callout-note">
          <strong>Note</strong>
          {Array.isArray(step.note) ? (
            step.note.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)
          ) : (
            <p>{step.note}</p>
          )}
        </aside>
      )}

      {step.readableId && <ReadablePanel readableId={step.readableId} />}

      {mock && <ApiEvidence key={mock.id} mock={mock} defaultOpen={false} />}

      {mock && <ParsedResponse key={`${mock.id}-parsed`} mock={mock} />}

      <div className="choices">
        <p className="choices-label">What do you do next?</p>
        {step.choices.map((choice) => (
          <button
            key={choice.nextStepId + choice.label}
            type="button"
            className="choice"
            onClick={() => onChoose(choice.nextStepId)}
          >
            <span className="choice-label">{choice.label}</span>
            {choice.hint && <span className="choice-hint">{choice.hint}</span>}
          </button>
        ))}
      </div>

      <div className="journey-footer">
        <button type="button" className="text-btn" onClick={onPickAnother}>
          Choose a different participant
        </button>
      </div>
    </article>
  )
}
