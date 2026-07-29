import { useState } from 'react'
import { developerEndpoints } from '../data/developerReference'

interface Props {
  onBack: () => void
}

export function DeveloperReferenceHub({ onBack }: Props) {
  const [activeId, setActiveId] = useState(developerEndpoints[0].id)
  const endpoint = developerEndpoints.find((e) => e.id === activeId) ?? developerEndpoints[0]

  return (
    <section className="dev-hub panel">
      <button type="button" className="text-btn back" onClick={onBack}>
        ← Back
      </button>
      <p className="eyebrow">Developers · reference &amp; products</p>
      <h2 className="display">Reference data &amp; products</h2>
      <p className="lead">
        Use these CA Lite endpoints to discover NDIA codes, units of measure, and support-item
        details before you call Payments, Service Bookings, Quotations, or Notifications.
      </p>

      <aside className="callout callout-note">
        <strong>Suggested flow</strong>
        <p>
          Start with the reference list → pick an attribute → optionally scope with a
          sub-attribute → look up a product. Sample payloads below are for demonstration only.
        </p>
      </aside>

      <div className="report-tabs" role="tablist" aria-label="Developer endpoints">
        {developerEndpoints.map((e) => (
          <button
            key={e.id}
            type="button"
            role="tab"
            aria-selected={e.id === activeId}
            className={e.id === activeId ? 'report-tab active' : 'report-tab'}
            onClick={() => setActiveId(e.id)}
          >
            {e.shortLabel}
          </button>
        ))}
      </div>

      <article className="report-panel">
        <header>
          <p className="eyebrow">
            {endpoint.method} · endpoint {developerEndpoints.findIndex((e) => e.id === endpoint.id) + 1} of{' '}
            {developerEndpoints.length}
          </p>
          <h3>{endpoint.title}</h3>
          <p className="lead tight">{endpoint.description}</p>
        </header>

        <div className="evidence compact">
          <div className="evidence-plain mono">
            <span className="method">{endpoint.method}</span> <code>{endpoint.path}</code>
          </div>
          {endpoint.request && (
            <pre className="mini-json">{JSON.stringify(endpoint.request, null, 2)}</pre>
          )}
        </div>

        <div className="report-section">
          <h4>When developers use this</h4>
          <ul className="report-bullets">
            {endpoint.whenToUse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="report-section">
          <h4>Sample response</h4>
          <div className="code-block">
            <div className="code-label">Technical response</div>
            <pre>{JSON.stringify(endpoint.response, null, 2)}</pre>
          </div>
        </div>

        {endpoint.notes && endpoint.notes.length > 0 && (
          <aside className="callout callout-note webhook-event-note">
            <strong>Notes</strong>
            <ul className="webhook-notes">
              {endpoint.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </section>
  )
}
