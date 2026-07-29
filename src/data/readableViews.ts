import type { ReadableView } from './types'

export const readableViews: Record<string, ReadableView> = {
  aisha_goals_view: {
    id: 'aisha_goals_view',
    kind: 'goals',
    title: 'Current plan goals',
    subtitle: 'What the team sees after Plans GET /goals',
    data: {
      about: [
        ['Living arrangements', 'Lives with family in shared accommodation'],
        ['Daily life', 'Attends community programs three days per week'],
        ['Strengths', 'Strong verbal communication and digital literacy'],
        ['Provided by', 'Plan nominee'],
      ],
      shortGoals: [
        {
          text: 'Build independent travel skills',
          how: 'Travel training with support worker',
          support: 'Capacity building — improved daily living',
        },
      ],
      longGoals: [
        {
          text: 'Secure part-time employment using computer skills',
          how: 'Work readiness coaching and placement support',
          support: 'Finding and keeping a job supports',
        },
      ],
      nominee: 'Nadia Rahman (Plan nominee)',
    },
  },
  aisha_hist_goals_view: {
    id: 'aisha_hist_goals_view',
    kind: 'historicalGoals',
    title: 'Historical goals',
    subtitle: 'Inactive goals retained for continuity',
    data: {
      status: 'Inactive',
      created: '2 Aug 2024',
      description: 'I would like to find work that is part time and where I can use my computer skills.',
      howReach:
        'Take control of my money bit by bit starting with paying for my own clothes when I go shopping and understand if I am getting the right change.',
    },
  },
  riley_hist_budget_view: {
    id: 'riley_hist_budget_view',
    kind: 'historicalBudget',
    title: 'Historical budget snapshot',
    subtitle: 'Prior plan period funding',
    data: {
      period: '20 Mar 2024 – 20 Mar 2025',
      totalAvailable: '$15,000.00',
      rows: [
        ['Choice and Control', 'Capacity Building', 'Plan-managed', '$10,000.00', '$0.00', 'Available'],
        ['Assistive Technology', 'Capital', 'Agency-managed', '$0.00', '$0.00', 'Available'],
      ],
    },
  },
  riley_services_view: {
    id: 'riley_services_view',
    kind: 'serviceDelivered',
    title: 'Services delivered — ready to batch claim',
    subtitle: 'Week 30 · selected for POST /v1/5.0/payments/batch',
    data: {
      columns: ['Date', 'Support item', 'Description', 'Qty / hrs', 'Unit price', 'Amount', 'Ref'],
      rows: [
        ['21 Jul 2026', '01_011_0107_1_1', 'Assistance with self-care', '2 hrs', '$67.56', '$135.12', 'RILEY-W30-01'],
        ['22 Jul 2026', '04_104_0125_6_1', 'Access community — social', '3 hrs', '$65.47', '$196.41', 'RILEY-W30-02'],
        ['23 Jul 2026', '15_037_0117_1_3', 'Improved daily living skills', '1 hr', '$193.99', '$193.99', 'RILEY-W30-03'],
      ],
      total: '$525.52',
    },
  },
  riley_batch_view: {
    id: 'riley_batch_view',
    kind: 'batchResult',
    title: 'Batch claim result',
    subtitle: 'riley-week30-batch.csv',
    data: {
      accepted: 3,
      rejected: 0,
      totalAmount: '$525.52',
      status: 'Accepted for processing',
    },
  },
  priya_quotes_view: {
    id: 'priya_quotes_view',
    kind: 'quotations',
    title: 'Open quotations',
    subtitle: 'GET /v1/3.0/quotations/',
    data: {
      columns: ['Quote ID', 'Product', 'Participant', 'Price', 'GST', 'Status', 'Reply by'],
      rows: [
        ['10125329', 'Power Bed - Composite', 'Priya Sunshine', '$321.33', '$12.25', 'OPEN', '31 Jul 2026'],
      ],
    },
  },
}

export function getReadable(id: string | undefined): ReadableView | undefined {
  if (!id) return undefined
  return readableViews[id]
}
