import type { MockExchange } from './types'

type Parsed = NonNullable<MockExchange['responseParsed']>

function money(n: unknown): string | null {
  if (typeof n !== 'number' || Number.isNaN(n)) return null
  return n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })
}

function labelize(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatValue(key: string, value: unknown): string {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'boolean') {
    if (key.includes('pace')) return value ? 'PACE plan' : 'Existing plan'
    return value ? 'Yes' : 'No'
  }
  if (typeof value === 'number') {
    if (
      key.includes('amount') ||
      key.includes('price') ||
      key === 'amount' ||
      key.includes('released') ||
      key.includes('spent') ||
      key.includes('remaining') ||
      key.includes('approved')
    ) {
      return money(value) ?? String(value)
    }
    return String(value)
  }
  if (typeof value === 'string') {
    if (value === '0001-01-01' || value === '0000-00-00') return '—'
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
      const d = new Date(value)
      if (!Number.isNaN(d.getTime())) {
        return d.toLocaleDateString('en-AU', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      }
    }
    return value.trim()
  }
  return String(value)
}

const SKIP_KEYS = new Set([
  'bgt_typ_lvl_dtls',
  'plan_management',
  'supp_typ_lvl_dtls',
  'supp_cat_lvl_dtls',
  'supp_itm_lvl_dtls',
  'funded_supports',
  'funding_periods',
  'short_goal_items',
  'long_goal_items',
  'plan_goals',
  'medium_to_long_term_goals',
  'about_participant',
  'nominee',
  'my_supports',
  'goals',
  'historical_goals',
  'historical_budget',
  'line_results',
  'bulk_payment_request',
])

function flattenObject(
  obj: Record<string, unknown>,
  prefix = '',
): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = []
  for (const [key, value] of Object.entries(obj)) {
    if (SKIP_KEYS.has(key)) continue
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      rows.push(...flattenObject(value as Record<string, unknown>, prefix))
      continue
    }
    if (Array.isArray(value)) continue
    rows.push({
      label: labelize(key),
      value: formatValue(key, value),
    })
  }
  return rows
}

function parseGoals(result: Record<string, unknown>): Parsed {
  const about = (result.about_participant ?? {}) as Record<string, unknown>
  const short = (result.plan_goals as { short_goal_text?: string }[] | undefined)?.[0]
  const long = (
    result.medium_to_long_term_goals as { long_goal_text?: string }[] | undefined
  )?.[0]
  const nominee = (result.nominee as { nominee_name?: string }[] | undefined)?.[0]

  return {
    title: 'Cleaned response',
    summary: 'Participant goals and context for care planning.',
    stats: [
      { label: 'Plan type', value: result.is_pace_plan ? 'PACE' : 'Existing' },
      { label: 'Nominee', value: nominee?.nominee_name ?? '—' },
      { label: 'Short goal', value: short?.short_goal_text ?? '—' },
      { label: 'Long goal', value: long?.long_goal_text ?? '—' },
    ],
    columns: ['Field', 'Detail'],
    rows: Object.entries(about).map(([k, v]) => [labelize(k), formatValue(k, v)]),
    notes: ['Use this view in planning screens; open technical JSON only when debugging.'],
  }
}

function parseBudget(result: Record<string, unknown>): Parsed {
  const stats = [
    { label: 'Released', value: formatValue('released_amount', result.released_amount) },
    { label: 'Spent', value: formatValue('spent_amount', result.spent_amount) },
    { label: 'Remaining', value: formatValue('remaining_amount', result.remaining_amount) },
  ]

  const rows: (string | number)[][] = []
  const tree = result.bgt_typ_lvl_dtls as
    | {
        plan_management?: {
          supp_typ_lvl_dtls?: {
            support_type_text?: string
            supp_cat_lvl_dtls?: {
              support_category_text?: string
              funding_component_name?: string
              remaining_amount?: number
              released_amount?: number
              spent_amount?: number
            }[]
          }[]
        }[]
      }[]
    | undefined

  tree?.forEach((b) => {
    b.plan_management?.forEach((pm) => {
      pm.supp_typ_lvl_dtls?.forEach((st) => {
        st.supp_cat_lvl_dtls?.forEach((cat) => {
          rows.push([
            cat.funding_component_name || st.support_type_text || '—',
            cat.support_category_text || '—',
            formatValue('released_amount', cat.released_amount),
            formatValue('spent_amount', cat.spent_amount),
            formatValue('remaining_amount', cat.remaining_amount),
          ])
        })
      })
    })
  })

  return {
    title: 'Cleaned response',
    summary: 'Budget position at a glance — released, spent, and remaining funds.',
    stats,
    columns: rows.length
      ? ['Funding / type', 'Category', 'Released', 'Spent', 'Remaining']
      : undefined,
    rows: rows.length ? rows : undefined,
  }
}

function parseHistoricalBudget(result: Record<string, unknown>): Parsed {
  const hist = (result.historical_budget as Record<string, unknown>[] | undefined)?.[0]
  const rows: (string | number)[][] = []
  const tree = hist?.bgt_typ_lvl_dtls as
    | {
        plan_management?: {
          fund_management_type?: string
          funded_supports?: {
            support_category?: string
            support_type?: string
            remaining_amount?: number
            released_amount?: number
            budget_status?: string
          }[]
        }[]
      }[]
    | undefined

  tree?.forEach((b) => {
    b.plan_management?.forEach((pm) => {
      pm.funded_supports?.forEach((fs) => {
        rows.push([
          fs.support_category || '—',
          fs.support_type || '—',
          pm.fund_management_type || '—',
          formatValue('released_amount', fs.released_amount),
          formatValue('remaining_amount', fs.remaining_amount),
          fs.budget_status || '—',
        ])
      })
    })
  })

  return {
    title: 'Cleaned response',
    summary: `Historical budget${hist?.start_date ? ` from ${formatValue('start_date', hist.start_date)}` : ''}.`,
    stats: [
      {
        label: 'Total available',
        value: formatValue('total_plan_available', hist?.total_plan_available),
      },
    ],
    columns: ['Category', 'Type', 'Management', 'Released', 'Remaining', 'Status'],
    rows,
  }
}

function parseLineResults(result: Record<string, unknown>): Parsed | null {
  const lines = result.line_results as Record<string, unknown>[] | undefined
  if (!lines?.length) return null
  return {
    title: 'Cleaned response',
    summary: `Batch ${String(result.batch_reference_name ?? '')} · ${String(result.process_status ?? 'complete')}`.trim(),
    stats: [
      { label: 'Accepted', value: String(result.accepted_count ?? '—') },
      { label: 'Rejected', value: String(result.rejected_count ?? '—') },
      {
        label: 'Total claimed',
        value: formatValue('total_claimed_amount', result.total_claimed_amount),
      },
      { label: 'Status', value: String(result.process_status ?? '—') },
    ],
    columns: ['Ref', 'Support item', 'Amount', 'Claim #', 'Result'],
    rows: lines.map((line) => [
      String(line.ref_doc_no ?? '—'),
      String(line.product_category_item ?? '—'),
      formatValue('claimed_amount', line.claimed_amount),
      String(line.claim_number ?? line.claim_id ?? '—'),
      String(line.claim_status ?? '—'),
    ]),
  }
}

function parseQuotations(list: Record<string, unknown>[]): Parsed {
  return {
    title: 'Cleaned response',
    summary: `${list.length} quotation${list.length === 1 ? '' : 's'} returned.`,
    columns: ['Quote ID', 'Product', 'Participant', 'Price', 'GST', 'Status', 'Reply by'],
    rows: list.map((q) => [
      String(q.quotation_id ?? '—'),
      String(q.product_name ?? '—'),
      String(q.participant_name ?? q.participant ?? '—'),
      formatValue('price', q.price),
      formatValue('gst_amount', q.gst_amount),
      String(q.user_status_code ?? '—'),
      formatValue('reply_by_date', q.reply_by_date),
    ]),
  }
}

function parseBookings(list: Record<string, unknown>[]): Parsed {
  return {
    title: 'Cleaned response',
    summary: `${list.length} service booking${list.length === 1 ? '' : 's'} found.`,
    columns: ['Booking ID', 'Participant', 'Type', 'Status', 'Start', 'End'],
    rows: list.map((b) => [
      String(b.service_booking_id ?? '—'),
      String(b.participant_name ?? b.participant ?? '—'),
      String(b.booking_type ?? '—'),
      `${String(b.status ?? '—')} / ${String(b.virtual_status ?? '—')}`,
      formatValue('start_date', b.start_date),
      formatValue('end_date', b.end_date),
    ]),
  }
}

function parseBookingDetail(result: Record<string, unknown>): Parsed {
  const items = (result.items as Record<string, unknown>[] | undefined) ?? []
  const totalAllocated = items.reduce(
    (sum, i) => sum + (typeof i.allocated_amount === 'number' ? i.allocated_amount : 0),
    0,
  )
  const totalRemaining = items.reduce(
    (sum, i) => sum + (typeof i.remaining_amount === 'number' ? i.remaining_amount : 0),
    0,
  )

  return {
    title: 'Cleaned response',
    summary: `Booking ${String(result.service_booking_id ?? '')} · ${String(result.status ?? '')} / ${String(result.virtual_status ?? '')}`.trim(),
    stats: [
      { label: 'Booking ID', value: String(result.service_booking_id ?? '—') },
      {
        label: 'Status',
        value: `${String(result.status ?? '—')} / ${String(result.virtual_status ?? '—')}`,
      },
      { label: 'Total allocated', value: formatValue('allocated_amount', totalAllocated) },
      { label: 'Total remaining', value: formatValue('remaining_amount', totalRemaining) },
    ],
    columns: ['Support item', 'Description', 'Allocated', 'Remaining'],
    rows: items.map((i) => [
      String(i.product_category_item ?? '—'),
      String(i.product_category_item_desc ?? i.product_category ?? '—'),
      formatValue('allocated_amount', i.allocated_amount),
      formatValue('remaining_amount', i.remaining_amount),
    ]),
  }
}

function parsePlans(list: Record<string, unknown>[]): Parsed {
  return {
    title: 'Cleaned response',
    summary: 'Active plan details for this participant.',
    columns: ['Plan type', 'Plan ID', 'Start', 'End'],
    rows: list.map((p) => [
      p.is_pace_plan ? 'PACE' : 'Existing',
      p.participant_plan_id === 0 ? 'N/A (PACE)' : String(p.participant_plan_id ?? '—'),
      formatValue('plan_start_date', p.plan_start_date),
      formatValue('plan_end_date', p.plan_end_date),
    ]),
  }
}

/**
 * Build a business-friendly view of a mock API response.
 * Uses handcrafted `responseParsed` when present; otherwise derives one.
 */
export function getParsedResponse(mock: MockExchange): Parsed {
  if (mock.responseParsed) return mock.responseParsed

  const response = mock.response
  const success = response.success !== false && !response.errors

  if (Array.isArray(response.errors) && response.errors.length && response.success === false) {
    const errors = response.errors
    const keyValueRows = errors
      .filter((e): e is { key: string; value: string } => typeof e === 'object' && e !== null && 'key' in e)
      .map((e) => [String(e.key), String(e.value)])

    if (keyValueRows.length) {
      return {
        title: 'Cleaned response',
        summary: 'Request did not succeed — action needed before continuing.',
        stats: [
          { label: 'Outcome', value: 'Rejected' },
          { label: 'Reject code', value: String(keyValueRows[0][0]) },
        ],
        columns: ['Code', 'Reason'],
        rows: keyValueRows,
      }
    }

    const notes = errors.map((e) =>
      typeof e === 'string' ? e.trim() : JSON.stringify(e),
    )
    return {
      title: 'Cleaned response',
      summary: 'Request did not succeed — action needed before continuing.',
      stats: [
        { label: 'Outcome', value: 'Blocked / failed' },
        { label: 'Errors', value: String(notes.length) },
      ],
      notes,
    }
  }

  const result = response.result

  if (result && typeof result === 'object' && !Array.isArray(result)) {
    const obj = result as Record<string, unknown>

    if (obj.plan_goals || obj.about_participant) {
      const parsed = parseGoals(obj)
      if (mock.id === 'aisha_goals') {
        return {
          ...parsed,
          notes: [
            ...(parsed.notes ?? []),
            'Availability of the Goals API response is dictated by the provider relationship — without an active relationship and required consent, goals are not returned.',
          ],
        }
      }
      return parsed
    }
    if (obj.items && Array.isArray(obj.items) && obj.service_booking_id != null) {
      return parseBookingDetail(obj)
    }
    if (obj.bgt_typ_lvl_dtls || obj.released_amount != null) {
      const parsed = parseBudget(obj)
      if (mock.id === 'sam_budget' || mock.id === 'riley_pace_budget') {
        return {
          ...parsed,
          notes: [
            ...(parsed.notes ?? []),
            'Availability of the Budget API response is dictated by the provider relationship — without an active relationship and required consent, fund balances are not returned.',
          ],
        }
      }
      return parsed
    }
    if (obj.historical_budget) return parseHistoricalBudget(obj)
    if (obj.historical_goals && typeof obj.historical_goals === 'object') {
      const g = obj.historical_goals as Record<string, unknown>
      return {
        title: 'Cleaned response',
        summary: 'Historical (inactive) goal retained for continuity.',
        stats: [
          { label: 'Status', value: String(g.goal_status ?? '—') },
          { label: 'Created', value: formatValue('goal_created', g.goal_created) },
        ],
        columns: ['Field', 'Detail'],
        rows: [
          ['Goal', String(g.goal_description ?? '—')],
          ['How to reach', String(g.how_reach ?? '—')],
        ],
      }
    }
    const lineParsed = parseLineResults(obj)
    if (lineParsed) return lineParsed

    // Payment / generic object
    const stats = flattenObject(obj).slice(0, 8)
    return {
      title: 'Cleaned response',
      summary: success ? 'Request succeeded.' : 'See details below.',
      stats: [
        { label: 'Outcome', value: success ? 'Success' : 'Check details' },
        ...stats,
      ],
    }
  }

  if (Array.isArray(result) && result.length) {
    const first = result[0] as Record<string, unknown>
    if ('quotation_id' in first) return parseQuotations(result as Record<string, unknown>[])
    if ('service_booking_id' in first) return parseBookings(result as Record<string, unknown>[])
    if ('plan_start_date' in first || 'is_pace_plan' in first) {
      return parsePlans(result as Record<string, unknown>[])
    }
  }

  // Determine-plan style nested result already handled; bare success
  if (result && typeof result === 'object' && !Array.isArray(result)) {
    /* unreachable fallback */
  }

  if (response.success === true && (result === undefined || result === null || (typeof result === 'object' && !Array.isArray(result) && Object.keys(result as object).length === 0))) {
    return {
      title: 'Cleaned response',
      summary: 'Update accepted.',
      stats: [{ label: 'Outcome', value: 'Success' }],
    }
  }

  // Determine participant plan is result object with is_pace_plan - already in object branch
  // Final fallback: show top-level keys
  const top = flattenObject(response as Record<string, unknown>).filter(
    (r) => r.label !== 'Success' || true,
  )
  return {
    title: 'Cleaned response',
    summary: success ? 'Request succeeded.' : 'Request returned an issue.',
    stats: top.slice(0, 6),
  }
}
