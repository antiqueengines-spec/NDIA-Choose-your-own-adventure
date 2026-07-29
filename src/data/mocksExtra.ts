import type { MockExchange } from './types'
import { mocks as baseMocks } from './mocksBase'

/** Additional journey mocks (goals, historical, batch, quotations). */
export const extraMocks: Record<string, MockExchange> = {
  aisha_determine: {
    id: 'aisha_determine',
    label: 'Determine participant plan',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/determine-participant-plan/',
    request: {
      participant: 430007701,
      participant_surname: 'Rahman',
      date_of_birth: '1998-06-21',
    },
    response: {
      success: true,
      result: { is_pace_plan: true, plan_first_start_date: '2025-03-01' },
    },
    plainEnglish:
      'Aisha is on a PACE plan. Next you retrieve the live plan, then goals — including historical goals for continuity of support.',
  },
  aisha_plans: {
    id: 'aisha_plans',
    label: 'Active PACE plan',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/plans/',
    request: {
      participant: 430007701,
      participant_surname: 'Rahman',
      date_of_birth: '1998-06-21',
    },
    response: {
      success: true,
      result: [
        {
          is_pace_plan: true,
          participant_plan_id: 0,
          plan_start_date: '2025-03-01',
          plan_end_date: '2028-03-01',
          plan_first_start_date: '2025-03-01',
        },
      ],
    },
    plainEnglish:
      'PACE plan dates are confirmed. You can now pull current goals that drive support planning.',
  },
  aisha_goals: {
    id: 'aisha_goals',
    label: 'Plan goals',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/plans/goals',
    request: {
      participant: 430007701,
      participant_surname: 'Rahman',
      date_of_birth: '1998-06-21',
      participant_plan_id: 0,
    },
    response: {
      success: true,
      result: {
        is_pace_plan: true,
        participant_plan_id: 0,
        about_participant: {
          living_arrangements: 'Lives with family in shared accommodation',
          daily_life: 'Attends community programs three days per week',
          strengths: 'Strong verbal communication and digital literacy',
          provided_by: 'Plan nominee',
        },
        plan_goals: [
          {
            short_goal_text: 'Build independent travel skills',
            short_goal_type: 'CCR',
            short_goal_items: [
              {
                short_how_achieve: 'Travel training with support worker',
                short_how_support: 'Capacity building — improved daily living',
              },
            ],
          },
        ],
        medium_to_long_term_goals: [
          {
            long_goal_text: 'Secure part-time employment using computer skills',
            long_goal_type: 'SCC',
            long_goal_items: [
              {
                long_how_achieve: 'Work readiness coaching and placement support',
                long_how_support: 'Finding and keeping a job supports',
              },
            ],
          },
        ],
        nominee: [
          {
            nominee_name: 'Nadia Rahman',
            nominee_relationship_type: 'ZPNM',
          },
        ],
        my_supports: [
          {
            support_goal_type: 'MAI',
            description: 'Mainstream education and employment pathways',
          },
        ],
        goals: [
          {
            goal_created: '2025-03-01',
            how_reach: 'Weekly capacity-building sessions and community access',
            goal_description: 'Increase independence in daily routines',
          },
        ],
      },
    },
    plainEnglish:
      'Current goals, living context, and nominee details arrive in one call — usable directly in care planning screens. This response is only available when the provider relationship (and required consent) is in place for Aisha.',
  },
  aisha_historical_goals: {
    id: 'aisha_historical_goals',
    label: 'Historical PACE goals',
    method: 'GET',
    path: '/ndia-middleware/v1/ext-int-part/4.0/pace/historical/goals',
    request: {
      participant: 430007701,
      participant_surname: 'Rahman',
      date_of_birth: '1998-06-21',
    },
    response: {
      success: true,
      result: {
        historical_goals: {
          how_reach:
            'Take control of my money bit by bit starting with paying for my own clothes when I go shopping and understand if I am getting the right change.',
          goal_description:
            'I would like to find work that is part time and where I can use my computer skills.',
          goal_status: 'Inactive',
          goal_created: '2024-08-02T04:37:08.000+0000',
        },
      },
    },
    plainEnglish:
      'Historical goals show what mattered before — critical context when a plan renews or supports change.',
  },
  riley_plans: {
    id: 'riley_plans',
    label: 'Active plans',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/plans/',
    request: {
      participant: 430008812,
      participant_surname: 'Nguyen',
      date_of_birth: '1990-01-09',
    },
    response: {
      success: true,
      result: [
        {
          is_pace_plan: true,
          participant_plan_id: 0,
          plan_start_date: '2025-01-20',
          plan_end_date: '2028-01-20',
          plan_first_start_date: '2025-01-20',
        },
      ],
    },
    plainEnglish: 'Riley’s PACE plan is active. Next: current budget, then historical budget context.',
  },
  riley_pace_budget: {
    id: 'riley_pace_budget',
    label: 'PACE budget',
    method: 'GET',
    path: '/ndia-middleware/v1/ext-int-part/5.0/pace/budget/',
    request: {
      participant: 430008812,
      participant_surname: 'Nguyen',
      date_of_birth: '1990-01-09',
    },
    response: {
      success: true,
      result: {
        released_amount: 327000,
        spent_amount: 24,
        remaining_amount: 191976,
        bgt_typ_lvl_dtls: [
          {
            end_date: '2028-01-20',
            released_amount: 156000,
            spent_amount: 22.5,
            remaining_amount: 51977.5,
            plan_management: [
              {
                end_date: '2028-01-20',
                released_amount: 156000,
                supp_typ_lvl_dtls: [
                  {
                    end_date: '2028-01-20',
                    support_type_text: 'Core',
                    released_amount: 156000,
                    spent_amount: 22.5,
                    remaining_amount: 51977.5,
                    approved_amount: 156000,
                    start_date: '2025-01-20',
                    supp_cat_lvl_dtls: [
                      {
                        end_date: '2028-01-20',
                        released_amount: 78000,
                        spent_amount: 22.5,
                        remaining_amount: 25977.5,
                        funding_component_name: 'Core Flexible (Plan-managed)',
                        support_category_text: 'Consumables',
                        approved_amount: 78000,
                        instalment_type: 'Regular',
                        start_date: '2025-01-20',
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
      'Current PACE budget shows released and remaining funds — enough headroom for the week’s delivered supports. This response is only available when the provider relationship (and required consent) is in place for Riley.',
  },
  riley_historical_budget: {
    id: 'riley_historical_budget',
    label: 'Historical PACE budgets',
    method: 'GET',
    path: '/ndia-middleware/v1/ext-int-part/4.0/pace/historical/budgets',
    request: {
      participant: 430008812,
      participant_surname: 'Nguyen',
      date_of_birth: '1990-01-09',
      plan_date: '2025-03-20',
    },
    response: {
      success: true,
      result: {
        historical_budget: [
          {
            end_date: '2025-03-20',
            start_date: '2024-03-20',
            total_plan_available: 15000,
            bgt_typ_lvl_dtls: [
              {
                budget_type_total_available: 15000,
                budget_type: 'Stated',
                plan_management: [
                  {
                    management_total_available: 15000,
                    management_spent_amount: 0,
                    fund_management_type: 'Plan-managed',
                    funded_supports: [
                      {
                        support_category: 'Choice and Control',
                        support_type: 'Capacity Building',
                        budget_status: 'Available',
                        released_amount: 10000,
                        spent_amount: 0,
                        remaining_amount: 10000,
                        approved_amount: 20000,
                        start_date: '2025-03-17',
                        end_date: '2025-03-20',
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
      'Historical budgets help auditors and plan managers explain spend over time — not just today’s remaining balance.',
  },
  riley_batch: {
    id: 'riley_batch',
    label: 'Payments batch (5.0) — bulk process finish',
    method: 'POST',
    path: '/ndia-middleware/v1/5.0/payments/batch',
    request: {
      bulk_payment_request: [
        {
          participant: 430008812,
          start_date: '2026-07-21',
          end_date: '2026-07-21',
          product_category_item: '01_011_0107_1_1',
          ref_doc_no: 'RILEY-W30-01',
          quantity: 2,
          hours: '2',
          unit_price: 67.56,
          tax_code: 'P2',
          authorised_by: 'ops-lead',
          participant_approved: 430008812,
          inkind_flag: false,
          abn_provider: 60006000014,
          abn_not_available: false,
        },
        {
          participant: 430008812,
          start_date: '2026-07-22',
          end_date: '2026-07-22',
          product_category_item: '04_104_0125_6_1',
          ref_doc_no: 'RILEY-W30-02',
          quantity: 1,
          hours: '3',
          unit_price: 65.47,
          tax_code: 'P2',
          authorised_by: 'ops-lead',
          participant_approved: 430008812,
          inkind_flag: false,
          abn_provider: 60006000014,
          abn_not_available: false,
        },
        {
          participant: 430008812,
          start_date: '2026-07-23',
          end_date: '2026-07-23',
          product_category_item: '15_037_0117_1_3',
          ref_doc_no: 'RILEY-W30-03',
          quantity: 1,
          hours: '1',
          unit_price: 193.99,
          tax_code: 'P2',
          authorised_by: 'ops-lead',
          participant_approved: 430008812,
          inkind_flag: false,
          abn_provider: 60006000014,
          abn_not_available: false,
        },
      ],
    },
    response: {
      success: true,
      result: {
        batch_reference_name: 'riley-week30-batch.csv',
        process_status: 'FINISHED',
        submitted_at: '2026-07-28T16:40:12+10:00',
        finished_at: '2026-07-28T16:42:05+10:00',
        accepted_count: 3,
        rejected_count: 0,
        total_claimed_amount: 525.52,
        currency: 'AUD',
        line_results: [
          {
            ref_doc_no: 'RILEY-W30-01',
            participant: 430008812,
            product_category_item: '01_011_0107_1_1',
            claimed_amount: 135.12,
            claim_number: 10503101,
            claim_status: 'Accepted',
            reject_reason_code: '',
          },
          {
            ref_doc_no: 'RILEY-W30-02',
            participant: 430008812,
            product_category_item: '04_104_0125_6_1',
            claimed_amount: 196.41,
            claim_number: 10503102,
            claim_status: 'Accepted',
            reject_reason_code: '',
          },
          {
            ref_doc_no: 'RILEY-W30-03',
            participant: 430008812,
            product_category_item: '15_037_0117_1_3',
            claimed_amount: 193.99,
            claim_number: 10503103,
            claim_status: 'Accepted',
            reject_reason_code: '',
          },
        ],
      },
      errors: [],
    },
    plainEnglish:
      'Bulk process finished successfully. All three week-30 lines were accepted and assigned claim numbers under one batch reference.',
    responseParsed: {
    title: 'Bulk finish result',
    summary:
      'Batch riley-week30-batch.csv finished processing. 3 of 3 lines accepted — $525.52 ready for payment follow-up.',
      stats: [
        { label: 'Process status', value: 'Finished' },
        { label: 'Accepted', value: '3' },
        { label: 'Rejected', value: '0' },
        { label: 'Total claimed', value: '$525.52' },
      ],
      columns: ['Ref', 'Support item', 'Amount', 'Claim #', 'Result'],
      rows: [
        ['RILEY-W30-01', '01_011_0107_1_1', '$135.12', '10503101', 'Accepted'],
        ['RILEY-W30-02', '04_104_0125_6_1', '$196.41', '10503102', 'Accepted'],
        ['RILEY-W30-03', '15_037_0117_1_3', '$193.99', '10503103', 'Accepted'],
      ],
      notes: [
        'Submitted 28 Jul 2026 4:40 pm · finished 4:42 pm (AEST)',
        'Use BULK_CLAIM_REPORT with this batch reference for finance reconciliation.',
      ],
    },
  },
  priya_plans: {
    id: 'priya_plans',
    label: 'Active plans',
    method: 'GET',
    path: '/ndia-middleware/v1/4.0/plans/',
    request: {
      participant: 430212474,
      participant_surname: 'Sunshine',
      date_of_birth: '2001-12-31',
    },
    response: {
      success: true,
      result: [
        {
          is_pace_plan: false,
          participant_plan_id: 1084500,
          plan_start_date: '2025-07-01',
          plan_end_date: '2026-06-30',
          plan_first_start_date: '0001-01-01',
        },
      ],
    },
    plainEnglish:
      'Priya’s plan is active. For assistive technology, the next step is reviewing open quotations — not jumping straight to claim.',
  },
  priya_quotations: {
    id: 'priya_quotations',
    label: 'Quotations list',
    method: 'GET',
    path: '/ndia-middleware/v1/3.0/quotations/',
    request: {
      user_status_code: 'OPEN',
      quote_type: 'ZQ02',
    },
    response: {
      success: true,
      result: [
        {
          quotation_id: 10125329,
          participant: 430212474,
          participant_name: 'Priya Sunshine',
          request_date: '2026-07-10',
          reply_by_date: '2026-07-31',
          user_status_code: 'OPEN',
          product_id: 5425010912,
          product_name: 'Power Bed - Composite',
          quote_type: 'ZQ02',
          quantity: 1,
          supply_details: 'will be delivered',
          specifications: 'no batteries',
          inclusions: 'include the cover',
          specific_exclusions: '10/10',
          price: 321.33,
          gst_amount: 12.25,
          terms_of_quote: 'ZQ01',
        },
      ],
    },
    plainEnglish:
      'Open quotations for your organisation appear with product, price, and reply-by dates — ready for a response.',
  },
  priya_quotation_patch: {
    id: 'priya_quotation_patch',
    label: 'Respond to quotation',
    method: 'PATCH',
    path: '/ndia-middleware/v1/3.0/quotations/{quotation_id}',
    request: {
      price: 318.5,
      gst_amount: 28.95,
      user_status_code: 'RESR',
      supply_details: 'Delivered within 10 business days',
      specifications: 'Includes mattress protector',
      inclusions: 'Cover and delivery',
      specific_exclusions: 'Batteries not included',
      terms_of_quote: 'ZQ01',
      user_notes: 'Updated quote with delivery window',
    },
    response: {
      success: true,
    },
    plainEnglish:
      'PATCH marks the quotation as responded (RESR) with your price and terms — closing the loop without portal hopping.',
  },
}

export const mocks: Record<string, MockExchange> = {
  ...baseMocks,
  ...extraMocks,
}

export function getMock(id: string | undefined): MockExchange | undefined {
  if (!id) return undefined
  return mocks[id]
}
