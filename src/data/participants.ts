import type { Participant } from './types'

export const participants: Participant[] = [
  {
    id: 'maya',
    name: 'Maya Chen',
    ageBand: 'Adult · metro',
    tagline: 'Existing plan · clean claim path',
    managementType: 'Existing plan (non-PACE)',
    scenario: 'Determine plan → plans → SB list → SB detail (allocated/remaining) → payment.',
    accent: '#D54F7F',
    startStepId: 'maya_1',
    steps: [
      {
        id: 'maya_1',
        title: 'Determine Maya’s plan type',
        business:
          'Before anything else, Care Access asks NDIA whether Maya is on an existing plan or a PACE plan — so your software calls the right endpoints.',
        tone: 'neutral',
        mockId: 'maya_determine',
        choices: [
          {
            label: 'Retrieve active plan details',
            nextStepId: 'maya_2',
            hint: 'GET /v1/4.0/plans/',
          },
        ],
      },
      {
        id: 'maya_2',
        title: 'Confirm the active plan',
        business:
          'You get plan ID and dates without logging into My Place. Finance and support teams can work from the same verified record.',
        tone: 'success',
        mockId: 'maya_plans',
        choices: [
          {
            label: 'Check service bookings',
            nextStepId: 'maya_3',
            hint: 'GET /v1/4.0/service-bookings/',
          },
        ],
      },
      {
        id: 'maya_3',
        title: 'List service bookings',
        business:
          'Care Access returns Maya’s approved bookings. Pick the active booking to inspect allocated vs remaining funds before you claim.',
        tone: 'success',
        mockId: 'maya_bookings',
        choices: [
          {
            label: 'Open booking 50081234',
            nextStepId: 'maya_4',
            hint: 'GET /v1/4.0/service-bookings/{service_booking_id}',
          },
        ],
      },
      {
        id: 'maya_4',
        title: 'Check allocated & remaining',
        business:
          'The booking detail shows each support item with allocated and remaining amounts — so finance knows the claim will fit before it is lodged.',
        tone: 'success',
        mockId: 'maya_booking_detail',
        choices: [
          {
            label: 'Lodge the payment request',
            nextStepId: 'maya_5',
            hint: 'POST /v1/4.0/payments/',
          },
        ],
      },
      {
        id: 'maya_5',
        title: 'Payment request created',
        business:
          'Because plan type, plan details, and booking remaining balances were already verified, the payment request returns a claim number on the first pass.',
        tone: 'success',
        mockId: 'maya_claim',
        choices: [
          {
            label: 'See the business outcome',
            nextStepId: 'maya_end',
          },
        ],
      },
      {
        id: 'maya_end',
        title: 'Outcome for your organisation',
        business:
          'Same-day clarity: Maya’s support is claimable, cash flow is protected, and staff never left their own system to chase portals.',
        tone: 'success',
        isEnding: true,
        endingSummary:
          'Existing plan confirmed → bookings listed → SB allocated/remaining checked → payment request created.',
        choices: [],
      },
    ],
  },
  {
    id: 'jordan',
    name: 'Jordan Blake',
    ageBand: 'Adult · regional',
    tagline: 'Authority / consent gap',
    managementType: 'Existing plan · authority blocked',
    scenario:
      'A realistic failure path — CA Lite returns authority failure until consent/relationship is fixed.',
    accent: '#76ABD6',
    startStepId: 'jordan_1',
    steps: [
      {
        id: 'jordan_1',
        title: 'Determine Jordan’s plan type',
        business:
          'Jordan appears as an existing-plan participant. At a glance everything looks fine — the next call tests whether you have authority to proceed.',
        tone: 'warning',
        mockId: 'jordan_determine',
        choices: [
          {
            label: 'Retrieve plan details now',
            nextStepId: 'jordan_2',
            hint: 'Recommended — surface authority/consent issues early',
          },
          {
            label: 'Skip checks and claim anyway',
            nextStepId: 'jordan_skip',
            hint: 'See what happens without Care Access discipline',
          },
        ],
      },
      {
        id: 'jordan_2',
        title: 'Authority blocks the plan call',
        business:
          'Plans GET fails: “Requestor does not have the authority to perform the request.” Your team pauses and fixes consent/relationship before claiming.',
        withoutCareAccess:
          'Without this check, staff often discover the problem only after a rejected payment request — days later — with rework across billing and support.',
        tone: 'danger',
        mockId: 'jordan_authority_fail',
        choices: [
          {
            label: 'Renew consent, then re-check',
            nextStepId: 'jordan_3',
          },
        ],
      },
      {
        id: 'jordan_skip',
        title: 'Payment request rejected',
        business:
          'You lodged without resolving authority. NDIS rejects the claim with code V19 — the participant disputed receiving the support. Cash flow stalls until the relationship and delivery record are fixed.',
        withoutCareAccess:
          'This is the manual-world default: portals, spreadsheets, and late surprises. Care Access exists to stop this branch.',
        tone: 'danger',
        mockId: 'jordan_claim_reject',
        choices: [
          {
            label: 'Go back and fix authority',
            nextStepId: 'jordan_2',
          },
        ],
      },
      {
        id: 'jordan_3',
        title: 'Authority restored',
        business:
          'After consent/relationship is renewed by the provider staff requesting plan consent and confirming category endorsement is set by the participant in their portal, the same Plans call succeeds and returns Jordan’s active plan.',
        tone: 'success',
        mockId: 'jordan_authority_ok',
        choices: [
          {
            label: 'Lodge the payment request',
            nextStepId: 'jordan_4',
          },
        ],
      },
      {
        id: 'jordan_4',
        title: 'Payment request created',
        business:
          'Second attempt succeeds with a claim number. Catching authority failure early turned a multi-day rejection cycle into a same-day recovery.',
        tone: 'success',
        mockId: 'jordan_claim_ok',
        choices: [
          {
            label: 'See the business outcome',
            nextStepId: 'jordan_end',
          },
        ],
      },
      {
        id: 'jordan_end',
        title: 'Outcome for your organisation',
        business:
          'Authority and consent gaps are expensive when found late. Care Access makes them visible before cash flow takes the hit.',
        tone: 'success',
        isEnding: true,
        endingSummary:
          'Authority failure caught early → consent renewed → Plans succeeds → payment request created.',
        choices: [],
      },
    ],
  },
  {
    id: 'sam',
    name: 'Sam Okonkwo',
    ageBand: 'Adult · metro',
    tagline: 'PACE participant path',
    managementType: 'PACE plan',
    scenario:
      'Determine PACE → plan details → PACE budget → POST /payments/pace.',
    accent: '#C1285E',
    startStepId: 'sam_1',
    steps: [
      {
        id: 'sam_1',
        title: 'Identify a PACE participant',
        business:
          'Determine Participant Plan returns is_pace_plan: true. Your integration must branch to PACE budget and PACE payment APIs.',
        tone: 'warning',
        mockId: 'sam_determine',
        choices: [
          {
            label: 'Retrieve PACE plan details',
            nextStepId: 'sam_2',
          },
        ],
      },
      {
        id: 'sam_2',
        title: 'Confirm the PACE plan',
        business:
          'PACE returns a single plan-for-life style response. Access still depends on provider relationship — but you now have dates to work with.',
        withoutCareAccess:
          'Teams that treat every participant like a classic SAP plan often call the wrong budget/payment endpoints and burn hours on avoidable errors.',
        tone: 'success',
        mockId: 'sam_plans',
        choices: [
          {
            label: 'Check PACE budget',
            nextStepId: 'sam_3',
            hint: 'GET /v1/ext-int-part/5.0/pace/budget/',
          },
        ],
      },
      {
        id: 'sam_3',
        title: 'Validate PACE funds',
        business:
          'PACE budget shows released and remaining amounts. Enough capacity-building funding remains for today’s support.',
        note:
          'Availability of the Budget API response is dictated by the provider relationship. Without an active relationship (and required consent) for this participant, fund balances will not be returned.',
        tone: 'success',
        mockId: 'sam_budget',
        choices: [
          {
            label: 'Lodge the PACE payment request',
            nextStepId: 'sam_4',
            hint: 'POST /v1/5.0/payments/pace',
          },
        ],
      },
      {
        id: 'sam_4',
        title: 'PACE payment request created',
        business:
          'Payment request accepted with a claim ID. Extra PACE rules stayed inside the same Care Access automated flow.',
        tone: 'success',
        mockId: 'sam_claim',
        choices: [
          {
            label: 'See the business outcome',
            nextStepId: 'sam_end',
          },
        ],
      },
      {
        id: 'sam_end',
        title: 'Outcome for your organisation',
        business:
          'PACE does not have to mean a second manual process. Care Access keeps determine → plan → budget → pace payment in one path.',
        tone: 'success',
        isEnding: true,
        endingSummary:
          'PACE identified → plan retrieved → budget checked → POST /payments/pace succeeded.',
        choices: [],
      },
    ],
  },
  {
    id: 'aisha',
    name: 'Aisha Rahman',
    ageBand: 'Young adult · metro',
    tagline: 'PACE goals & historical goals',
    managementType: 'PACE plan · goals focus',
    scenario: 'Determine plan → GET plans → goals → historical goals.',
    accent: '#5B8DB8',
    startStepId: 'aisha_1',
    steps: [
      {
        id: 'aisha_1',
        title: 'Confirm Aisha is PACE',
        business:
          'Determine Participant Plan returns is_pace_plan: true. Support coordinators and planners need goals next — not just funding.',
        tone: 'warning',
        mockId: 'aisha_determine',
        choices: [
          { label: 'Get the active plan', nextStepId: 'aisha_2', hint: 'GET /v1/4.0/plans/' },
        ],
      },
      {
        id: 'aisha_2',
        title: 'Retrieve the PACE plan',
        business:
          'Plan dates are confirmed. With relationship/consent in place, you can retrieve the goals that drive support design.',
        tone: 'success',
        mockId: 'aisha_plans',
        choices: [
          { label: 'Pull current goals', nextStepId: 'aisha_3', hint: 'GET /v1/4.0/plans/goals' },
        ],
      },
      {
        id: 'aisha_3',
        title: 'Read current goals',
        business:
          'Short and long-term goals, living context, and nominee details land in your system — ready for planning conversations.',
        note:
          'Availability of the Goals API response is dictated by the provider relationship. Without an active relationship (and required consent) for this participant, goals will not be returned.',
        tone: 'success',
        mockId: 'aisha_goals',
        readableId: 'aisha_goals_view',
        choices: [
          {
            label: 'Review historical goals',
            nextStepId: 'aisha_4',
            hint: 'GET /ext-int-part/4.0/pace/historical/goals',
          },
        ],
      },
      {
        id: 'aisha_4',
        title: 'Compare historical goals',
        business:
          'Inactive historical goals show what mattered last plan cycle — so your team does not lose continuity when supports change.',
        tone: 'success',
        mockId: 'aisha_historical_goals',
        readableId: 'aisha_hist_goals_view',
        choices: [{ label: 'See the business outcome', nextStepId: 'aisha_end' }],
      },
      {
        id: 'aisha_end',
        title: 'Outcome for your organisation',
        business:
          'Goals APIs turn plan documents into structured data your CRM can display — current and historical — without PDF archaeology.',
        tone: 'success',
        isEnding: true,
        endingSummary:
          'PACE confirmed → plan retrieved → current goals → historical goals for continuity.',
        choices: [],
      },
    ],
  },
  {
    id: 'riley',
    name: 'Riley Nguyen',
    ageBand: 'Adult · metro',
    tagline: 'PACE budget → batch claims',
    managementType: 'PACE · finance / claiming',
    scenario:
      'GET plans → PACE budget → historical budgets → service delivered table → 5.0 payments batch.',
    accent: '#1B1B27',
    startStepId: 'riley_1',
    steps: [
      {
        id: 'riley_1',
        title: 'Get Riley’s plan',
        business:
          'Finance starts with an active plan check so budget and claim calls use the right PACE pathway.',
        tone: 'neutral',
        mockId: 'riley_plans',
        choices: [
          {
            label: 'Check current PACE budget',
            nextStepId: 'riley_2',
            hint: 'GET /ext-int-part/5.0/pace/budget/',
          },
        ],
      },
      {
        id: 'riley_2',
        title: 'Validate current budget',
        business:
          'Released vs remaining funds confirm the week’s delivered supports are claimable.',
        note:
          'Availability of the Budget API response is dictated by the provider relationship. Without an active relationship (and required consent) for this participant, fund balances will not be returned.',
        tone: 'success',
        mockId: 'riley_pace_budget',
        choices: [
          {
            label: 'Review historical budgets',
            nextStepId: 'riley_3',
            hint: 'GET /ext-int-part/4.0/pace/historical/budgets',
          },
        ],
      },
      {
        id: 'riley_3',
        title: 'Historical budget context',
        business:
          'Historical budgets give auditors and plan managers the story behind today’s balances.',
        tone: 'success',
        mockId: 'riley_historical_budget',
        readableId: 'riley_hist_budget_view',
        choices: [
          {
            label: 'Review services delivered this week',
            nextStepId: 'riley_4',
          },
        ],
      },
      {
        id: 'riley_4',
        title: 'Services ready to claim',
        business:
          'Your roster system already captured three delivered supports. Instead of three portal claims, Care Access can batch them.',
        tone: 'warning',
        readableId: 'riley_services_view',
        choices: [
          {
            label: 'Submit 5.0 payments batch',
            nextStepId: 'riley_5',
            hint: 'POST /v1/5.0/payments/batch',
          },
        ],
      },
      {
        id: 'riley_5',
        title: 'Bulk claim finished',
        business:
          'The 5.0 batch process finishes with a full result — accepted lines, claim numbers, and totals. Open the API evidence to compare the technical JSON with the parsed business view underneath.',
        tone: 'success',
        mockId: 'riley_batch',
        choices: [{ label: 'See the business outcome', nextStepId: 'riley_end' }],
      },
      {
        id: 'riley_end',
        title: 'Outcome for your organisation',
        business:
          'Budget confidence plus batch claiming compresses days of admin into a single controlled submission.',
        tone: 'success',
        isEnding: true,
        endingSummary:
          'Plans → PACE budget → historical budgets → service table → POST /payments/batch accepted.',
        choices: [],
      },
    ],
  },
  {
    id: 'priya',
    name: 'Priya Sunshine',
    ageBand: 'Adult · regional',
    tagline: 'Quotations GET → PATCH',
    managementType: 'Existing plan · AT quoting',
    scenario: 'GET plans → quotations list → respond with quotations PATCH.',
    accent: '#A83A66',
    startStepId: 'priya_1',
    steps: [
      {
        id: 'priya_1',
        title: 'Confirm Priya’s plan',
        business:
          'Assistive technology quotes still need an active plan relationship. Start with Plans GET, then open quotations.',
        tone: 'neutral',
        mockId: 'priya_plans',
        choices: [
          {
            label: 'List open quotations',
            nextStepId: 'priya_2',
            hint: 'GET /v1/3.0/quotations/',
          },
        ],
      },
      {
        id: 'priya_2',
        title: 'Review open quotations',
        business:
          'Open quotes show product, price, GST, and reply-by dates. Your sales/AT team can respond without leaving the CRM.',
        tone: 'warning',
        mockId: 'priya_quotations',
        readableId: 'priya_quotes_view',
        choices: [
          {
            label: 'Respond to the quotation',
            nextStepId: 'priya_3',
            hint: 'PATCH /v1/3.0/quotations/{quotation_id}',
          },
        ],
      },
      {
        id: 'priya_3',
        title: 'Quotation response submitted',
        business:
          'PATCH updates price, terms, and status to RESR (responded). The participant pathway can continue without portal delays.',
        tone: 'success',
        mockId: 'priya_quotation_patch',
        choices: [{ label: 'See the business outcome', nextStepId: 'priya_end' }],
      },
      {
        id: 'priya_end',
        title: 'Outcome for your organisation',
        business:
          'Quotations APIs close the AT loop: discover open requests, respond with commercial terms, keep audit evidence in your own system.',
        tone: 'success',
        isEnding: true,
        endingSummary: 'Plans confirmed → quotations listed → quotation PATCH responded successfully.',
        choices: [],
      },
    ],
  },
]

export function getParticipant(id: string): Participant | undefined {
  return participants.find((p) => p.id === id)
}

export function getStep(participant: Participant, stepId: string) {
  return participant.steps.find((s) => s.id === stepId)
}
