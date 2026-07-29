import { useState } from 'react'
import type { MockExchange } from '../data/types'

interface Props {
  mock: MockExchange
  defaultOpen?: boolean
}

export function ApiEvidence({ mock, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="evidence" data-open={open}>
      <button
        type="button"
        className="evidence-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="evidence-kicker">API evidence</span>
        <span className="evidence-title">
          <span className="method">{mock.method}</span>
          <code>{mock.path}</code>
        </span>
        <span className="evidence-chevron" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>

      <p className="evidence-plain">{mock.plainEnglish}</p>

      {open && (
        <div className="evidence-body">
          {mock.request && (
            <div className="code-block">
              <div className="code-label">
                {mock.method === 'GET' ? 'Query / headers' : 'Request body'}
              </div>
              <pre>{JSON.stringify(mock.request, null, 2)}</pre>
            </div>
          )}
          <div className="code-block">
            <div className="code-label">Technical response</div>
            <pre>{JSON.stringify(mock.response, null, 2)}</pre>
          </div>
          <p className="evidence-note">
            Sample CA Lite–style payload for demonstration. No live NDIA or Care Access
            endpoints are called.
          </p>
        </div>
      )}
    </section>
  )
}
