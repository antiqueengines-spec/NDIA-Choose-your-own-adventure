import type { MockExchange } from '../data/types'
import { getParsedResponse } from '../data/parseResponse'

interface Props {
  mock: MockExchange
}

/** Business-friendly view of an API response — no "Cleaned response" chrome. */
export function ParsedResponse({ mock }: Props) {
  const parsed = getParsedResponse(mock)
  const showTitle =
    parsed.title &&
    parsed.title !== 'Cleaned response' &&
    parsed.title !== 'Parsed for business readers'

  return (
    <div className="parsed-response standalone">
      {showTitle && <h4>{parsed.title}</h4>}
      {parsed.summary && <p className="parsed-summary">{parsed.summary}</p>}
      {parsed.stats && parsed.stats.length > 0 && (
        <div className="stat-row compact">
          {parsed.stats.map((s) => (
            <div key={`${s.label}-${s.value}`} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      )}
      {parsed.columns && parsed.rows && (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                {parsed.columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsed.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, i) => (
                    <td key={`${parsed.columns![i]}-${cell}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {parsed.notes && (
        <ul className="parsed-notes">
          {parsed.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
