import type { MockExchange } from './types'

/**
 * Mocked CA Lite–style exchanges derived from the CA Lite API Hub docs.
 * Base URL pattern: https://api.uat.yourcareaccess.com.au/ndia-middleware/...
 * Demo only — no live calls.
 */
export const mocks: Record<string, MockExchange> = {
  maya_determine: {
    id: 'maya_determine',
    label: 'Determine participant plan',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/determine-participant-plan/',
    request: {
      participant: 430001234,
      participant_surname: 'Chen',
      date_of_birth: '1991-04-12',
    },
    response: {
      success: true,
      result: {
        is_pace_plan: false,
        plan_first_start_date: '0001-01-01',
      },
    },
    plainEnglish:
      'Maya is on an existing (non-PACE) plan. Your system now knows which plan and budget endpoints to use next.',
  },
  maya_plans: {
    id: 'maya_plans',
    label: 'Active plans',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/plans/',
    request: {
      participant: 430001234,
      participant_surname: 'Chen',
      date_of_birth: '1991-04-12',
    },
    response: {
      success: true,
      result: [
        {
          is_pace_plan: false,
          participant_plan_id: 1082401,
          plan_start_date: '2025-10-01',
          plan_end_date: '2026-09-30',
          plan_first_start_date: '0001-01-01',
        },
      ],
    },
    plainEnglish:
      'Active plan dates and plan ID come back in one response — enough to unlock budget and claiming steps.',
  },
  maya_bookings: {
    id: 'maya_bookings',
    label: 'Service bookings',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/service-bookings/',
    request: {
      participant: 430001234,
    },
    response: {
      success: true,
      result: [
        {
          service_booking_id: 50081234,
          booking_type: 'Standard Service Booking',
          participant: 430001234,
          participant_name: 'Maya Chen',
          start_date: '2025-10-01',
          end_date: '2026-09-30',
          submitted_date: '2025-09-28',
          created_by: '430423457',
          status: 'Approved',
          virtual_status: 'Active',
          participant_plan_id: 1082401,
          provider_comments: 'Core daily activities',
        },
      ],
    },
    plainEnglish:
      'An approved, active service booking exists between Maya and your organisation — open it next to see allocated vs remaining amounts.',
  },
  maya_booking_detail: {
    id: 'maya_booking_detail',
    label: 'Service booking detail',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/service-bookings/{service_booking_id}',
    request: {
      participant: 430001234,
      service_booking_id: 50081234,
    },
    response: {
      success: true,
      result: {
        participant: 430001234,
        participant_name: 'Maya Chen',
        booking_type: 'Standard Service Booking',
        service_booking_id: 50081234,
        start_date: '2025-10-01',
        end_date: '2026-09-30',
        revised_end_date: '2026-09-30',
        inkind_program: false,
        status: 'Approved',
        virtual_status: 'Active',
        participant_plan_id: 1082401,
        provider_comments: 'Core daily activities',
        items: [
          {
            product_category: 'DAILY_ACTIVITIES',
            product_category_item: '01_011_0107_1_1',
            product_category_item_desc: 'Assistance with Self-Care Activities',
            quantity: 120,
            allocated_amount: 8107.2,
            remaining_amount: 6420.48,
          },
          {
            product_category: 'COMMUNITY_PARTICIPATION',
            product_category_item: '04_104_0125_6_1',
            product_category_item_desc: 'Access Community, Social and Rec Activities',
            quantity: 80,
            allocated_amount: 5237.6,
            remaining_amount: 3928.2,
          },
          {
            product_category: 'CONSUMABLES',
            product_category_item: '03_040010057_0103_1_1',
            product_category_item_desc: 'Low Cost AT - Consumables',
            quantity: 1,
            allocated_amount: 500,
            remaining_amount: 350,
          },
        ],
      },
    },
    plainEnglish:
      'Service booking line items show allocated and remaining amounts per support item — enough remaining to claim today’s supports.',
    responseParsed: {
      title: 'Service booking funding',
      summary:
        'Booking 50081234 is Active. Line items below show what was allocated on the booking and what is still remaining.',
      stats: [
        { label: 'Booking ID', value: '50081234' },
        { label: 'Status', value: 'Approved / Active' },
        { label: 'Total allocated', value: '$13,844.80' },
        { label: 'Total remaining', value: '$10,698.68' },
      ],
      columns: ['Support item', 'Description', 'Allocated', 'Remaining'],
      rows: [
        ['01_011_0107_1_1', 'Assistance with Self-Care Activities', '$8,107.20', '$6,420.48'],
        ['04_104_0125_6_1', 'Access Community, Social and Rec Activities', '$5,237.60', '$3,928.20'],
        ['03_040010057_0103_1_1', 'Low Cost AT - Consumables', '$500.00', '$350.00'],
      ],
      notes: ['Claiming draws down remaining amounts against these booking lines.'],
    },
  },
  maya_claim: {
    id: 'maya_claim',
    label: 'Create payment request',
    method: 'POST',
    path: '/ndia-middleware/v1/4.0/payments/',
    request: {
      ref_doc_no: 'MAYA-20260728-01',
      service_agreement: 50081234,
      product_category_item: '01_011_0107_1_1',
      participant: 430001234,
      claimed_amount: 135.12,
      quantity: 2,
      tax_code: 'P2',
      claim_type: '',
      claim_reason: '',
      start_date: '2026-07-28',
      end_date: '2026-07-28',
      unit_of_measure: 'H',
      abn_provider: 60006000014,
      abn_not_available: false,
    },
    response: {
      success: true,
      result: {
        amount: 135.12,
        participant: 430001234,
        participant_name: 'Maya Chen',
        start_date: '2026-07-28',
        end_date: '2026-07-28',
        claim_number: 10502821,
        product_category: 'DAILY_ACTIVITIES',
        quantity: 2,
        product_category_item: '01_011_0107_1_1',
        claim_type: '',
        claim_reason: '',
        claimed_amount: 135.12,
        tax_code: 'P2',
        claim_status: '4',
        reject_reason_code: '',
        invoice_number: '300000290031',
        product_description: 'Assistance with Self-Care Activities',
        plan_id: 1082401,
        service_agreement: 50081234,
        inkind_flag: false,
        submit_date: '2026-07-28',
        submit_by: '430423457',
        paid_date: '0000-00-00',
        ref_doc_no: 'MAYA-20260728-01',
      },
    },
    plainEnglish:
      'Payment request created successfully with a claim number. Pre-checks meant no authority or booking surprises at submit time.',
  },
  jordan_determine: {
    id: 'jordan_determine',
    label: 'Determine participant plan',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/determine-participant-plan/',
    request: {
      participant: 430009876,
      participant_surname: 'Blake',
      date_of_birth: '1988-11-03',
    },
    response: {
      success: true,
      result: {
        is_pace_plan: false,
        plan_first_start_date: '0001-01-01',
      },
    },
    plainEnglish:
      'Jordan looks like an existing-plan participant. The next calls will show whether your organisation has authority/consent to go further.',
  },
  jordan_authority_fail: {
    id: 'jordan_authority_fail',
    label: 'Plans / authority check',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/plans/',
    request: {
      participant: 430009876,
      participant_surname: 'Blake',
      date_of_birth: '1988-11-03',
    },
    response: {
      success: false,
      errors: [' Requestor does not have the authority to perform the request '],
    },
    plainEnglish:
      'CA Lite returns 403-style authority failure. In practice this is often missing or expired participant consent / provider relationship — stop before you claim.',
  },
  jordan_claim_reject: {
    id: 'jordan_claim_reject',
    label: 'Create payment request (blocked)',
    method: 'POST',
    path: '/ndia-middleware/v1/4.0/payments/',
    request: {
      ref_doc_no: 'JORDAN-SKIP-01',
      service_agreement: 50090001,
      product_category_item: '15_005_0118_1_3',
      participant: 430009876,
      claimed_amount: 193.99,
      quantity: 1,
      tax_code: 'P2',
      start_date: '2026-07-28',
      end_date: '2026-07-28',
      unit_of_measure: 'H',
      abn_provider: 60006000014,
      abn_not_available: false,
    },
    response: {
      success: false,
      errors: [
        {
          key: 'V19',
          value:
            'NDIS reviewed and rejected claim as participant disputed receiving support.',
        },
      ],
    },
    plainEnglish:
      'NDIS rejected the claim with code V19 — the participant disputed receiving the support. Skipping authority checks left you with a hard rejection to unwind.',
    responseParsed: {
      title: 'Claim rejected',
      summary: 'NDIS rejected this payment request after review.',
      stats: [
        { label: 'Outcome', value: 'Rejected' },
        { label: 'Reject code', value: 'V19' },
      ],
      columns: ['Code', 'Reason'],
      rows: [
        [
          'V19',
          'NDIS reviewed and rejected claim as participant disputed receiving support.',
        ],
      ],
      notes: [
        'Fix consent/relationship and confirm the support was delivered before lodging again.',
      ],
    },
  },
  jordan_authority_ok: {
    id: 'jordan_authority_ok',
    label: 'Plans (after consent renewed)',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/plans/',
    request: {
      participant: 430009876,
      participant_surname: 'Blake',
      date_of_birth: '1988-11-03',
    },
    response: {
      success: true,
      result: [
        {
          is_pace_plan: false,
          participant_plan_id: 1083102,
          plan_start_date: '2025-08-15',
          plan_end_date: '2026-08-14',
          plan_first_start_date: '0001-01-01',
        },
      ],
    },
    plainEnglish:
      'After consent/relationship is renewed by the provider staff requesting plan consent and confirming category endorsement is set by the participant in their portal, the same Plans call succeeds and returns Jordan’s active plan.',
  },
  jordan_claim_ok: {
    id: 'jordan_claim_ok',
    label: 'Create payment request',
    method: 'POST',
    path: '/ndia-middleware/v1/4.0/payments/',
    request: {
      ref_doc_no: 'JORDAN-20260728-02',
      service_agreement: 50090001,
      product_category_item: '15_005_0118_1_3',
      participant: 430009876,
      claimed_amount: 193.99,
      quantity: 1,
      tax_code: 'P2',
      start_date: '2026-07-28',
      end_date: '2026-07-28',
      unit_of_measure: 'H',
      abn_provider: 60006000014,
      abn_not_available: false,
    },
    response: {
      success: true,
      result: {
        amount: 193.99,
        participant: 430009876,
        participant_name: 'Jordan Blake',
        start_date: '2026-07-28',
        end_date: '2026-07-28',
        claim_number: 10502990,
        product_category: 'CB_DAILY_ACTIVITY',
        quantity: 1,
        product_category_item: '15_005_0118_1_3',
        claimed_amount: 193.99,
        tax_code: 'P2',
        claim_status: '4',
        reject_reason_code: '',
        invoice_number: '300000290188',
        product_description: 'Therapy Assistant - Level 1',
        plan_id: 1083102,
        service_agreement: 50090001,
        inkind_flag: false,
        submit_date: '2026-07-28',
        submit_by: '430423457',
        paid_date: '0000-00-00',
        ref_doc_no: 'JORDAN-20260728-02',
      },
    },
    plainEnglish:
      'Second attempt succeeds with a claim number. Catching authority failure early turned a rejection cycle into a same-day fix.',
  },
  sam_determine: {
    id: 'sam_determine',
    label: 'Determine participant plan',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/determine-participant-plan/',
    request: {
      participant: 430005551,
      participant_surname: 'Okonkwo',
      date_of_birth: '1995-02-18',
    },
    response: {
      success: true,
      result: {
        is_pace_plan: true,
        plan_first_start_date: '2026-01-12',
      },
    },
    plainEnglish:
      'Sam is flagged as a PACE plan participant. Your integration should branch to PACE budget and PACE payment endpoints.',
  },
  sam_plans: {
    id: 'sam_plans',
    label: 'Active PACE plan',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/plans/',
    request: {
      participant: 430005551,
      participant_surname: 'Okonkwo',
      date_of_birth: '1995-02-18',
    },
    response: {
      success: true,
      result: [
        {
          is_pace_plan: true,
          participant_plan_id: 0,
          plan_start_date: '2026-01-12',
          plan_end_date: '2029-01-12',
          plan_first_start_date: '2026-01-12',
        },
      ],
    },
    plainEnglish:
      'PACE returns a single “plan for life” style response. Participant plan ID is not applicable (0) — access still depends on provider relationship/consent.',
  },
  sam_budget: {
    id: 'sam_budget',
    label: 'PACE budget',
    method: 'GET',
    path: '/ndia-middleware/v1/ext-int-part/5.0/pace/budget/',
    request: {
      participant: 430005551,
      participant_surname: 'Okonkwo',
      date_of_birth: '1995-02-18',
    },
    response: {
      success: true,
      result: {
        released_amount: 9600,
        spent_amount: 5494.75,
        remaining_amount: 4105.25,
        bgt_typ_lvl_dtls: [
          {
            plan_management: [
              {
                end_date: '2029-01-12',
                released_amount: 9600,
                supp_typ_lvl_dtls: [
                  {
                    end_date: '2029-01-12',
                    support_type_text: 'Capacity Building',
                    released_amount: 9600,
                    spent_amount: 5494.75,
                    remaining_amount: 4105.25,
                    approved_amount: 9600,
                    start_date: '2026-01-12',
                    supp_cat_lvl_dtls: [
                      {
                        end_date: '2029-01-12',
                        released_amount: 9600,
                        spent_amount: 5494.75,
                        remaining_amount: 4105.25,
                        funding_component_name: 'Capacity Building Daily Living',
                        support_category_text: 'Improved Daily Living Skills',
                        approved_amount: 9600,
                        start_date: '2026-01-12',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    plainEnglish:
      'PACE budget shows released vs remaining funds. Enough capacity-building budget remains for today’s support. This response is only available when the provider relationship (and required consent) is in place for Sam.',
  },
  sam_claim: {
    id: 'sam_claim',
    label: 'Create PACE payment request',
    method: 'POST',
    path: '/ndia-middleware/v1/5.0/payments/pace',
    request: {
      ref_doc_no: 'SAM-20260728-01',
      product_category_item: '15_037_0117_1_3',
      participant: 430005551,
      unit_price: 193.99,
      quantity: 1,
      tax_code: 'P2',
      claim_type: '',
      claim_reason: '',
      start_date: '2026-07-28',
      end_date: '2026-07-28',
      unit_of_measure: 'H',
      abn_provider: 60006000014,
      abn_not_available: false,
      authorised_by: 'careaccess-demo',
    },
    response: {
      success: true,
      result: {
        claim_id: 778812,
        unit_price: 193.99,
        claim_status: 'Pending Payment',
        quantity: 1,
        reject_reason_code: '',
      },
    },
    plainEnglish:
      'PACE payment request accepted with a claim ID. Extra PACE rules stayed inside the same Care Access flow.',
  },
}

export function getMock(id: string | undefined): MockExchange | undefined {
  if (!id) return undefined
  return mocks[id]
}
