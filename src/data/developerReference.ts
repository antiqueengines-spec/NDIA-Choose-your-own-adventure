export interface DeveloperEndpoint {
  id: string
  title: string
  shortLabel: string
  method: 'GET'
  path: string
  description: string
  whenToUse: string[]
  request?: Record<string, unknown>
  response: Record<string, unknown>
  notes?: string[]
}

/**
 * Developer reference helpers — CA Lite Reference Data (3) + Products GET.
 * Sample payloads aligned to CA Lite API Hub docs.
 */
export const developerEndpoints: DeveloperEndpoint[] = [
  {
    id: 'ref_list',
    title: 'List all reference data',
    shortLabel: 'Reference list',
    method: 'GET',
    path: '/ndia-middleware/v1/3.0/reference-data/',
    description:
      'Retrieves the full catalogue of reference fields and usage descriptions. Use this first so you know which attribute keys other APIs expect or return.',
    whenToUse: [
      'Discover valid reference keys (claim_status, event_id, product_category_item, …)',
      'Onboard a new integration before calling Budget, Service Bookings, Payments, or Quotations',
      'Map NDIA codes to human-readable labels in your UI',
    ],
    response: {
      success: true,
      result: [
        { key: 'claim_status', value: 'Claim Status used in Payments API' },
        { key: 'reject_reason_code', value: 'Reject Reason Code used in Payments API' },
        { key: 'event_id', value: 'Event ID used in Notifications subscribe / report' },
        { key: 'product_category_item', value: 'Support item codes used across Products and Payments' },
        { key: 'unit_of_measure', value: 'Unit of measure for support items' },
        { key: 'user_status_code', value: 'User status code used in Quotations API' },
      ],
    },
    notes: [
      'Trimmed demo list — live NDIA returns the full catalogue.',
      'Next step: GET /reference-data/{attribute_name} with a key from this list.',
    ],
  },
  {
    id: 'ref_attribute',
    title: 'Reference data by attribute',
    shortLabel: 'By attribute',
    method: 'GET',
    path: '/ndia-middleware/v1/3.0/reference-data/{attribute_name}',
    description:
      'Returns all keys and values for one reference entity. Supply a valid attribute_name from the list endpoint (e.g. claim_status, event_id, product_category_item).',
    whenToUse: [
      'Populate dropdowns (claim status, tax code, reject reasons)',
      'Resolve event_id values before notifications subscribe',
      'Look up product_category_item keys before Products GET',
    ],
    request: {
      attribute_name: 'unit_of_measure',
    },
    response: {
      success: true,
      result: [
        { key: 'D', value: 'Days' },
        { key: 'EA', value: 'Each' },
        { key: 'H', value: 'Hour' },
        { key: 'WK', value: 'Week' },
      ],
    },
    notes: [
      'Demo uses unit_of_measure — swap attribute_name for claim_status, event_id, reject_reason_code, etc.',
      'Common attributes: claim_status, booking_type, event_id, product_category, product_category_item, reject_reason_code, tax_code, unit_of_measure, user_status_code.',
    ],
  },
  {
    id: 'ref_subattribute',
    title: 'Reference data by attribute + sub-attribute',
    shortLabel: 'By sub-attribute',
    method: 'GET',
    path: '/ndia-middleware/v1/3.0/reference-data/{attribute_name}/{subattribute_name}',
    description:
      'Returns values for an attribute scoped to a sub-attribute — e.g. unit of measure for a specific support item, or items under a product category.',
    whenToUse: [
      'Get unit_of_measure for a product_category_item before claiming',
      'List product_category_item values under a product_category',
      'Resolve status codes for a process_type (quotations, service-bookings)',
    ],
    request: {
      attribute_name: 'unit_of_measure',
      subattribute_name: '15_037_0117_1_3',
    },
    response: {
      success: true,
      result: [{ key: 'H', value: 'Hour' }],
    },
    notes: [
      'Example pairing: unit_of_measure / 15_037_0117_1_3 → Hour.',
      'Other pairings: product_category_item / CB_CHOICE_CONTROL · status / ZSAG · process_type / quotations.',
    ],
  },
  {
    id: 'products_get',
    title: 'Products GET',
    shortLabel: 'Products GET',
    method: 'GET',
    path: '/ndia-middleware/v1/3.0/products/{product_name}',
    description:
      'Retrieves Support Item details — unit of measure, validity window, and category. product_name must be a valid product_category_item key or short text from Reference Data.',
    whenToUse: [
      'Validate a support item before lodging a payment or quotation',
      'Show unit of measure and valid-from / valid-to in your PMS',
      'Confirm the item still exists in the current price guide window',
    ],
    request: {
      product_name: '05_123906171_0113_1_2',
    },
    response: {
      success: true,
      result: [
        {
          product_category_item: '05_123906171_0113_1_2',
          product_category_itm_short_txt: 'Assistive Products For Electronic Orientation',
          unit_of_measure: 'EA',
          unit_description: 'Each',
          support_category: 'ASSISTIVE_TECHNOLOGY',
          support_category_text: 'Assistive Technology',
          item_valid_from: '2013-06-10',
          item_valid_to: '2023-06-30',
          rego_group: 'Vision Equipment',
        },
      ],
    },
    notes: [
      'Discover valid product_name values via GET /reference-data/product_category_item.',
      'Short-text names (e.g. washable incontinence products for children) also work when they match Reference Data.',
    ],
  },
]
