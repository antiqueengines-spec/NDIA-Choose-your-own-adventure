import { useState } from 'react'
import { reports } from '../data/reports'
import type { ReportEventId } from '../data/types'

interface Props {
  onBack: () => void
}

export function ReportsHub({ onBack }: Props) {
  const [active, setActive] = useState<ReportEventId>('SB_REPORT')
  const report = reports.find((r) => r.eventId === active) ?? reports[0]

  return (
    <section className="reports panel">
      <button type="button" className="text-btn back" onClick={onBack}>
        ← Back
      </button>
      <p className="eyebrow">Notifications · report requests</p>
      <h2 className="display">Business reports</h2>
      <p className="lead">
        CA Lite can request NDIA report events via{' '}
        <code>POST /notifications/report</code>. Below are demo views of what your business
        can surface once those payloads arrive (webhook / inbox) — sample data for this
        walkthrough.
      </p>

      <div className="report-tabs" role="tablist" aria-label="Report types">
        {reports.map((r) => (
          <button
            key={r.eventId}
            type="button"
            role="tab"
            aria-selected={r.eventId === active}
            className={r.eventId === active ? 'report-tab active' : 'report-tab'}
            onClick={() => setActive(r.eventId)}
          >
            {r.eventId.replaceAll('_', ' ')}
          </button>
        ))}
      </div>

      <article className="report-panel">
        <header>
          <p className="eyebrow">{report.eventId}</p>
          <h3>{report.title}</h3>
          <p className="lead tight">{report.summary}</p>
        </header>

        <div className="evidence compact">
          <div className="evidence-plain mono">
            <span className="method">POST</span> <code>{report.path}</code>
          </div>
          <pre className="mini-json">{JSON.stringify(report.request, null, 2)}</pre>
        </div>

        {report.sections.map((section) => (
          <div key={section.heading} className="report-section">
            <h4>{section.heading}</h4>
            {section.columns && section.rows && (
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      {section.columns.map((c) => (
                        <th key={c}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row) => (
                      <tr key={row.join('|')}>
                        {row.map((cell, i) => (
                          <td key={`${section.columns?.[i]}-${cell}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {section.bullets && (
              <ul className="report-bullets">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </article>
    </section>
  )
}
