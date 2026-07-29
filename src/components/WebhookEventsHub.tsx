import { webhookEvents } from '../data/webhookEvents'

interface Props {
  onBack: () => void
  onOpenReports?: () => void
}

export function WebhookEventsHub({ onBack, onOpenReports }: Props) {
  return (
    <section className="webhook-hub panel">
      <button type="button" className="text-btn back" onClick={onBack}>
        ← Back
      </button>
      <p className="eyebrow">Notifications · webhook events</p>
      <h2 className="display">Event-based notifications</h2>
      <p className="lead">
        After you configure a webhook and subscribe the NDIA events are pushed to your
        endpoint as they occur. The table lists the event IDs available through Care Access.
      </p>

      <div className="webhook-event-list">
        {webhookEvents.map((e) => (
          <article key={e.id} className="webhook-event-card">
            <header className="webhook-event-header">
              <code className="event-id">{e.eventId}</code>
              <h3 className="webhook-event-title">{e.title}</h3>
              {e.audience && <p className="event-audience">{e.audience}</p>}
            </header>

            <p className="webhook-event-trigger">{e.trigger}</p>

            {e.causes && e.causes.length > 0 && (
              <ul className="webhook-causes">
                {e.causes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            )}

            {e.samples?.map((sample) => (
              <div key={sample.label ?? JSON.stringify(sample.payload)} className="webhook-sample">
                {sample.label && <p className="webhook-sample-label">{sample.label}</p>}
                <pre className="mini-json">{JSON.stringify(sample.payload, null, 2)}</pre>
              </div>
            ))}

            {e.notes && e.notes.length > 0 && (
              <aside className="callout callout-note webhook-event-note">
                <strong>Note</strong>
                <ul className="webhook-notes">
                  {e.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </aside>
            )}
          </article>
        ))}
      </div>

      <p className="webhook-count">
        {webhookEvents.length} notifications issued by the NDIA via webhook
      </p>

      {onOpenReports && (
        <div className="picker-reports">
          <button type="button" className="btn btn-ghost" onClick={onOpenReports}>
            View sample report payloads →
          </button>
        </div>
      )}
    </section>
  )
}
