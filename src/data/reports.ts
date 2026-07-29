import type { ReportDemo } from './types'

export const reports: ReportDemo[] = [
  {
    eventId: 'SB_REPORT',
    title: 'Service booking report',
    summary:
      'Snapshot of service bookings across your provider number — status, dates, and plan linkage.',
    path: '/ndia-middleware/v1/3.0/notifications/report',
    request: { event_id: 'SB_REPORT' },
    sections: [
      {
        heading: 'Active bookings',
        columns: ['Booking ID', 'Participant', 'Type', 'Status', 'Start', 'End', 'Plan ID'],
        rows: [
          [50081234, 'Maya Chen', 'Standard', 'Active', '01 Oct 2025', '30 Sep 2026', 1082401],
          [50090001, 'Jordan Blake', 'Standard', 'Active', '15 Aug 2025', '14 Aug 2026', 1083102],
          [50110220, 'Riley Nguyen', 'Standard', 'Active', '20 Jan 2025', '20 Jan 2028', 0],
        ],
      },
      {
        heading: 'What your ops team gains',
        bullets: [
          'See bookings about to expire before claims fail',
          'Reconcile CRM bookings to NDIA without My Place exports',
          'Trigger follow-ups when virtual status is no longer Active',
        ],
      },
    ],
  },
  {
    eventId: 'PRICE_GUIDE_REPORT',
    title: 'Price guide report',
    summary: 'Current support item pricing relevant to your claiming catalogue.',
    path: '/ndia-middleware/v1/3.0/notifications/report',
    request: { event_id: 'PRICE_GUIDE_REPORT' },
    sections: [
      {
        heading: 'Sample price guide extract',
        columns: ['Support item', 'Description', 'Unit', 'Price', 'Effective'],
        rows: [
          ['01_011_0107_1_1', 'Assistance with Self-Care Activities', 'Hour', '$67.56', '01 Jul 2026'],
          ['04_104_0125_6_1', 'Access Community, Social and Rec Activities', 'Hour', '$65.47', '01 Jul 2026'],
          ['15_037_0117_1_3', 'Improved Daily Living Skills', 'Hour', '$193.99', '01 Jul 2026'],
          ['15_005_0118_1_3', 'Therapy Assistant - Level 1', 'Hour', '$193.99', '01 Jul 2026'],
        ],
      },
      {
        heading: 'Business use',
        bullets: [
          'Keep PMS rate cards aligned to NDIS price guide',
          'Flag under/over quoting before batch claims',
          'Reduce manual spreadsheet refreshes after guide updates',
        ],
      },
    ],
  },
  {
    eventId: 'PARTICIPANT_CLAIMS',
    title: 'Participant claims',
    summary: 'Claims lodged for a date range — useful for finance reconciliation and participant statements.',
    path: '/ndia-middleware/v1/3.0/notifications/report',
    request: {
      event_id: 'PARTICIPANT_CLAIMS',
      start_date: '2026-07-01',
      end_date: '2026-07-28',
    },
    sections: [
      {
        heading: 'Claims in period',
        columns: ['Claim #', 'Participant', 'Item', 'Amount', 'Status', 'Service date'],
        rows: [
          [10502821, 'Maya Chen', '01_011_0107_1_1', '$135.12', 'Approved', '28 Jul 2026'],
          [10502990, 'Jordan Blake', '15_005_0118_1_3', '$193.99', 'Approved', '28 Jul 2026'],
          ['778812', 'Sam Okonkwo', '15_037_0117_1_3', '$193.99', 'Pending Payment', '28 Jul 2026'],
        ],
      },
      {
        heading: 'Business use',
        bullets: [
          'Month-end reconciliation without portal downloads',
          'Participant-level statements for plan managers',
          'Spot rejected claims early in the period',
        ],
      },
    ],
  },
  {
    eventId: 'PARTICIPANT_REPORT',
    title: 'Participant report',
    summary: 'Participant cohort overview — plan type, management, and key dates.',
    path: '/ndia-middleware/v1/3.0/notifications/report',
    request: { event_id: 'PARTICIPANT_REPORT' },
    sections: [
      {
        heading: 'Participant cohort',
        columns: ['NDIS #', 'Name', 'Plan type', 'Plan end', 'Authority', 'Open quotes'],
        rows: [
          [430001234, 'Maya Chen', 'Existing', '30 Sep 2026', 'OK', 0],
          [430009876, 'Jordan Blake', 'Existing', '14 Aug 2026', 'OK', 0],
          [430005551, 'Sam Okonkwo', 'PACE', '11 Dec 2026', 'OK', 0],
          [430007701, 'Aisha Rahman', 'PACE', '01 Mar 2028', 'OK', 0],
          [430008812, 'Riley Nguyen', 'PACE', '20 Jan 2028', 'OK', 0],
          [430212474, 'Priya Sunshine', 'Existing', '30 Jun 2026', 'OK', 1],
        ],
      },
      {
        heading: 'Business use',
        bullets: [
          'Leadership view of PACE vs existing mix',
          'Prioritise renewals approaching plan end',
          'See who still has open quotations outstanding',
        ],
      },
    ],
  },
  {
    eventId: 'BULK_CLAIM_REPORT',
    title: 'Bulk claim report',
    summary: 'Outcome of a batch payment upload — accepted vs rejected lines by batch reference.',
    path: '/ndia-middleware/v1/3.0/notifications/report',
    request: {
      event_id: 'BULK_CLAIM_REPORT',
      batch_reference_name: 'riley-week30-batch.csv',
    },
    sections: [
      {
        heading: 'Batch summary',
        columns: ['Batch ref', 'Accepted', 'Rejected', 'Total claimed', 'Processed'],
        rows: [['riley-week30-batch.csv', 3, 0, '$525.52', '28 Jul 2026 16:42']],
      },
      {
        heading: 'Line detail',
        columns: ['Ref doc', 'Participant', 'Item', 'Amount', 'Result'],
        rows: [
          ['RILEY-W30-01', 'Riley Nguyen', '01_011_0107_1_1', '$135.12', 'Accepted'],
          ['RILEY-W30-02', 'Riley Nguyen', '04_104_0125_6_1', '$196.41', 'Accepted'],
          ['RILEY-W30-03', 'Riley Nguyen', '15_037_0117_1_3', '$193.99', 'Accepted'],
        ],
      },
      {
        heading: 'Business use',
        bullets: [
          'Finance can clear a whole week of delivered services in one review',
          'Failed lines come back with enough detail to fix and resubmit',
          'Ties directly to POST /v1/5.0/payments/batch',
        ],
      },
    ],
  },
]
