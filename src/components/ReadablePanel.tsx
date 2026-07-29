import { getReadable } from '../data/readableViews'
import type { ReadableView } from '../data/types'

interface Props {
  readableId: string
}

export function ReadablePanel({ readableId }: Props) {
  const view = getReadable(readableId)
  if (!view) return null

  return (
    <section className="readable">
      <header className="readable-head">
        <p className="eyebrow">Business view</p>
        <h3>{view.title}</h3>
        {view.subtitle && <p className="readable-sub">{view.subtitle}</p>}
      </header>
      {renderBody(view)}
    </section>
  )
}

function renderBody(view: ReadableView) {
  const data = view.data as Record<string, unknown>

  if (view.kind === 'goals') {
    const about = data.about as [string, string][]
    const shortGoals = data.shortGoals as { text: string; how: string; support: string }[]
    const longGoals = data.longGoals as { text: string; how: string; support: string }[]
    return (
      <div className="readable-stack">
        <div className="kv-grid">
          {about.map(([k, v]) => (
            <div key={k} className="kv">
              <strong>{k}</strong>
              <span>{v}</span>
            </div>
          ))}
        </div>
        <div className="goal-cards">
          {shortGoals.map((g) => (
            <article key={g.text} className="goal-card">
              <span className="pill">Short term</span>
              <h4>{g.text}</h4>
              <p>
                <em>How:</em> {g.how}
              </p>
              <p>
                <em>Support:</em> {g.support}
              </p>
            </article>
          ))}
          {longGoals.map((g) => (
            <article key={g.text} className="goal-card">
              <span className="pill">Medium / long term</span>
              <h4>{g.text}</h4>
              <p>
                <em>How:</em> {g.how}
              </p>
              <p>
                <em>Support:</em> {g.support}
              </p>
            </article>
          ))}
        </div>
        <p className="readable-note">Nominee: {String(data.nominee)}</p>
      </div>
    )
  }

  if (view.kind === 'historicalGoals') {
    return (
      <div className="goal-card historical">
        <span className="pill">{String(data.status)}</span>
        <p className="readable-note">Created {String(data.created)}</p>
        <h4>{String(data.description)}</h4>
        <p>
          <em>How to reach:</em> {String(data.howReach)}
        </p>
      </div>
    )
  }

  if (view.kind === 'historicalBudget') {
    const rows = data.rows as string[][]
    return (
      <div className="readable-stack">
        <p className="readable-note">
          Period {String(data.period)} · Total available {String(data.totalAvailable)}
        </p>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Type</th>
                <th>Management</th>
                <th>Released</th>
                <th>Spent</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.join('-')}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (view.kind === 'serviceDelivered' || view.kind === 'quotations') {
    const columns = data.columns as string[]
    const rows = data.rows as string[][]
    return (
      <div className="readable-stack">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, i) => (
                    <td key={`${columns[i]}-${cell}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.total != null && (
          <p className="readable-total">
            Week total <strong>{String(data.total)}</strong>
          </p>
        )}
      </div>
    )
  }

  if (view.kind === 'batchResult') {
    return (
      <div className="stat-row">
        <div className="stat">
          <strong>{String(data.accepted)}</strong>
          <span>Accepted</span>
        </div>
        <div className="stat">
          <strong>{String(data.rejected)}</strong>
          <span>Rejected</span>
        </div>
        <div className="stat">
          <strong>{String(data.totalAmount)}</strong>
          <span>Claimed</span>
        </div>
        <div className="stat wide">
          <strong>{String(data.status)}</strong>
          <span>Batch status</span>
        </div>
      </div>
    )
  }

  return null
}
