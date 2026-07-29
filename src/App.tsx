import { useState } from 'react'
import { participants, getParticipant } from './data/participants'
import type { Screen } from './data/types'
import { ParticipantPicker } from './components/ParticipantPicker'
import { JourneyPlayer } from './components/JourneyPlayer'
import { ReportsHub } from './components/ReportsHub'
import { WebhookEventsHub } from './components/WebhookEventsHub'
import { DeveloperReferenceHub } from './components/DeveloperReferenceHub'

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [participantId, setParticipantId] = useState<string | null>(null)
  const [stepId, setStepId] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])

  const participant = participantId ? getParticipant(participantId) : undefined

  function goLanding() {
    setScreen('landing')
    setParticipantId(null)
    setStepId(null)
    setHistory([])
  }

  function goPick() {
    setScreen('pick')
    setParticipantId(null)
    setStepId(null)
    setHistory([])
  }

  function goReports() {
    setScreen('reports')
    setParticipantId(null)
    setStepId(null)
    setHistory([])
  }

  function goNotifications() {
    setScreen('notifications')
    setParticipantId(null)
    setStepId(null)
    setHistory([])
  }

  function goDevelopers() {
    setScreen('developers')
    setParticipantId(null)
    setStepId(null)
    setHistory([])
  }

  function startParticipant(id: string) {
    const p = getParticipant(id)
    if (!p) return
    setParticipantId(id)
    setStepId(p.startStepId)
    setHistory([p.startStepId])
    setScreen('journey')
  }

  function choose(nextStepId: string) {
    setStepId(nextStepId)
    setHistory((h) => [...h, nextStepId])
  }

  return (
    <div className="app-shell">
      <div className="bg-glow" aria-hidden />
      <div className="bg-glow-2" aria-hidden />
      <div className="bg-grid" aria-hidden />

      <header className="site-header">
        <a className="brand" href="https://www.yourcareaccess.com.au/" target="_blank" rel="noreferrer">
          <img
            className="brand-logo"
            src={`${import.meta.env.BASE_URL}brand/logo.png`}
            alt="Care Access"
            width={160}
            height={48}
          />
        </a>
        <div className="header-actions">
          <button type="button" className="text-btn" onClick={goPick}>
            Journeys
          </button>
          <button type="button" className="text-btn" onClick={goNotifications}>
            Webhooks
          </button>
          <button type="button" className="text-btn" onClick={goReports}>
            Reports
          </button>
          <button type="button" className="text-btn" onClick={goDevelopers}>
            Developers
          </button>
          <span className="demo-badge">CA Lite - Interactive Demo</span>
        </div>
      </header>

      <main>
        {screen === 'landing' && (
          <section className="hero panel">
            <div className="hero-copy">
              <p className="eyebrow hero-in">NDIS providers &amp; software vendors</p>
              <h1 className="display hero-in delay-1">
                Follow a participant.
                <span className="display-accent"> See why the API checks matter.</span>
              </h1>
              <p className="lead hero-in delay-2">
                A choose-your-own-adventure walkthrough of Care Access CA Lite — business
                outcomes first, sample API responses as evidence. No live NDIA calls.
              </p>
              <div className="hero-actions hero-in delay-3">
                <button type="button" className="btn btn-primary" onClick={goPick}>
                  Choose a participant
                </button>
                <button type="button" className="btn btn-brand-blue" onClick={goNotifications}>
                  Event notifications
                </button>
                <button type="button" className="btn btn-brand-pink" onClick={goReports}>
                  Explore business reports
                </button>
                <button type="button" className="btn btn-ghost" onClick={goDevelopers}>
                  Reference data &amp; products
                </button>
              </div>
              <ul className="hero-points hero-in delay-4">
                <li>Plan, goals &amp; PACE paths</li>
                <li>Batch claiming &amp; quotations</li>
                <li>Webhook event notifications</li>
                <li>Reference data &amp; products for developers</li>
              </ul>
            </div>
            <figure className="hero-visual hero-in delay-2">
              <img
                src={`${import.meta.env.BASE_URL}brand/hero-mark.png`}
                alt="Care Access — connecting providers to NDIA APIs"
                width={640}
                height={480}
              />
            </figure>
          </section>
        )}

        {screen === 'pick' && (
          <ParticipantPicker
            participants={participants}
            onSelect={startParticipant}
            onBack={goLanding}
            onOpenReports={goReports}
          />
        )}

        {screen === 'notifications' && (
          <WebhookEventsHub onBack={goLanding} onOpenReports={goReports} />
        )}

        {screen === 'reports' && <ReportsHub onBack={goLanding} />}

        {screen === 'developers' && <DeveloperReferenceHub onBack={goLanding} />}

        {screen === 'journey' && participant && stepId && (
          <JourneyPlayer
            participant={participant}
            stepId={stepId}
            history={history}
            onChoose={choose}
            onRestart={goLanding}
            onPickAnother={goPick}
            onOpenReports={goReports}
          />
        )}
      </main>

      <footer className="site-footer">
        <div className="site-footer-brand">
          <img
            className="footer-logo"
            src={`${import.meta.env.BASE_URL}brand/logo.png`}
            alt="Care Access"
            width={120}
            height={36}
          />
          <p>
            Demo data only. Not affiliated with the NDIA beyond Care Access being an approved
            integration pathway for providers.
          </p>
        </div>
        <a href="https://www.yourcareaccess.com.au/" target="_blank" rel="noreferrer">
          www.yourcareaccess.com.au
        </a>
      </footer>
    </div>
  )
}
