export type Screen = 'landing' | 'pick' | 'journey' | 'reports' | 'notifications' | 'developers'

export type ParticipantId =
  | 'maya'
  | 'jordan'
  | 'sam'
  | 'aisha'
  | 'riley'
  | 'priya'
  | 'lena'
  | 'kai'

export interface MockExchange {
  id: string
  label: string
  method: 'GET' | 'POST' | 'PATCH'
  path: string
  request?: Record<string, unknown>
  response: Record<string, unknown>
  plainEnglish: string
  /** Optional human-readable breakdown shown below the technical response JSON */
  responseParsed?: {
    title: string
    summary?: string
    stats?: { label: string; value: string }[]
    columns?: string[]
    rows?: (string | number)[][]
    notes?: string[]
  }
}

export interface Choice {
  label: string
  nextStepId: string
  hint?: string
}

export interface JourneyStep {
  id: string
  title: string
  business: string
  withoutCareAccess?: string
  /** Optional callout note shown on the step (string or paragraphs) */
  note?: string | string[]
  tone?: 'neutral' | 'success' | 'warning' | 'danger'
  mockId?: string
  /** Optional human-readable panel keyed in readableViews */
  readableId?: string
  choices: Choice[]
  isEnding?: boolean
  endingSummary?: string
}

export interface Participant {
  id: ParticipantId
  name: string
  ageBand: string
  tagline: string
  managementType: string
  scenario: string
  accent: string
  startStepId: string
  steps: JourneyStep[]
}

export type ReadableKind =
  | 'goals'
  | 'historicalGoals'
  | 'historicalBudget'
  | 'serviceDelivered'
  | 'quotations'
  | 'batchResult'

export interface ReadableView {
  id: string
  kind: ReadableKind
  title: string
  subtitle?: string
  data: unknown
}

export type ReportEventId =
  | 'SB_REPORT'
  | 'PRICE_GUIDE_REPORT'
  | 'PARTICIPANT_CLAIMS'
  | 'PARTICIPANT_REPORT'
  | 'BULK_CLAIM_REPORT'

export interface ReportDemo {
  eventId: ReportEventId
  title: string
  summary: string
  request: Record<string, unknown>
  path: string
  /** Sample business-friendly rows/sections as if delivered to webhook */
  sections: {
    heading: string
    columns?: string[]
    rows?: (string | number)[][]
    bullets?: string[]
  }[]
}
