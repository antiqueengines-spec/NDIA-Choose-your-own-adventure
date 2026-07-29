import { useState } from 'react'
import type { MockExchange } from '../data/types'

interface Props {
  mock: MockExchange
  defaultOpen?: boolean
}

export function ApiEvidence({ mock, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const highlightOpenFields = mock.id === 'kai_batch_open' || mock.id === 'kai_batch_get'

  function formatJson(value: unknown) {
    const raw = JSON.stringify(value, null, 2)
    if (!highlightOpenFields) return raw
    return raw
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replace(/"claim_number": 0/g, '<span class="json-emph">"claim_number": 0</span>')
      .replace(/"claim_status": ""/g, '<span class="json-emph">"claim_status": ""</span>')
      .replace(/"reject_reason_code": ""/g, '<span class="json-emph">"reject_reason_code": ""</span>')
  }

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
              {highlightOpenFields ? (
                <pre dangerouslySetInnerHTML={{ __html: formatJson(mock.request) }} />
              ) : (
                <pre>{formatJson(mock.request)}</pre>
              )}
            </div>
          )}
          <div className="code-block">
            <div className="code-label">Technical response</div>
            {highlightOpenFields ? (
              <pre dangerouslySetInnerHTML={{ __html: formatJson(mock.response) }} />
            ) : (
              <pre>{formatJson(mock.response)}</pre>
            )}
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
