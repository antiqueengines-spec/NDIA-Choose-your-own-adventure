export interface WebhookSample {
  label?: string
  payload: Record<string, unknown>
}

export interface WebhookEvent {
  /** Unique row key — same event_id can appear more than once with different meanings */
  id: string
  eventId: string
  title: string
  trigger: string
  causes?: string[]
  notes?: string[]
  samples?: WebhookSample[]
  audience?: string
}

/**
 * Notifications issued by the NDIA via webhook (after subscribe).
 * Content aligned to Care Access / CA Lite notification catalogue.
 */
export const webhookEvents: WebhookEvent[] = [
  {
    id: 'sb_new',
    eventId: 'SB_NEW',
    title: 'New Service Booking created',
    trigger: 'The notification for this event will be triggered when a new service booking is created.',
    causes: [
      'By a Staff member using the staff portal',
      'By a Participant using the myplace participant portal',
      'By a Provider using the myplace provider portal',
      'Via API',
    ],
  },
  {
    id: 'sb_end_date_updated',
    eventId: 'SB_END_DATE_UPDATED',
    title: 'SB End Date updated',
    trigger:
      'The notification for this event will be triggered when the end date of a service booking is updated.',
    causes: [
      'By a Staff member using the staff portal',
      'By a Participant using the myplace participant portal',
      'By a Provider using the myplace provider portal',
      "By a Digital Partner using Provider API's PATCH /{service_booking_id}/extend-end-date or PATCH /{service_booking_id}/reduce-end-date operation.",
      "Due to a plan's end date being updated as a result of an unscheduled plan review, participant access being revoked or participant access being ceased (due to death).",
    ],
  },
  {
    id: 'sb_budget_updated',
    eventId: 'SB_BUDGET_UPDATED',
    title: 'Service Booking Budget Updated',
    trigger:
      'The notification for this event will be triggered when the quantity and/or allocated amount of one or more supports within a service booking is updated.',
    causes: [
      'By a Staff member using the staff portal',
      'By a Participant using the participant portal',
      'By a Provider using the myplace provider portal',
      'Via API',
    ],
  },
  {
    id: 'sb_deleted',
    eventId: 'SB_DELETED',
    title: 'Service Booking deleted',
    trigger: 'The notification for this event will be triggered when a service booking is deleted.',
    causes: [
      'By a Participant using the myplace participant portal',
      'By a Provider using the myplace provider portal',
      "By a Provider using the Provider API's DELETE /{service_booking_id} operation",
    ],
  },
  {
    id: 'sb_expiring',
    eventId: 'SB_EXPIRING',
    title: 'SB is Expiring',
    trigger:
      'The notification for this event will be triggered for a service booking one day prior to its end date.',
  },
  {
    id: 'plan_end_dt_updated',
    eventId: 'PLAN_END_DT_UPDATED',
    title: 'Plan End Date is updated',
    trigger:
      "The notification of this event will be triggered when the plan end date of a participant's current active plan is updated.",
    causes: [
      'Due to an unscheduled plan review',
      'Due to the auto extension of plan',
      "Due to the participant's access ceasing (due to death for instance)",
    ],
  },
  {
    id: 'remit_adv_generated',
    eventId: 'REMIT_ADV_GENERATED',
    title: 'Remittance Advise is generated',
    trigger:
      'The notification for this event will be triggered overnight and the JSON payload available in your inbox, when the remittance advice is ready, for payment claims that have been processed and paid, the day before.',
  },
  {
    id: 'quotation_respo_reqd',
    eventId: 'QUOTATION_RESPO_REQD',
    title: 'Quotation Response is Required',
    trigger:
      'The notification for this event will be triggered when a response to a quotation request is required from the provider organisation.',
  },
  {
    id: 'rfs_assigned',
    eventId: 'RFS_ASSIGNED',
    title: 'Request for Service Response is Required',
    trigger:
      'The notification for this event will be triggered when a RFS is issued. Please log into your myplace provider portal to view the details of the RFS and to accept or reject it.',
  },
  {
    id: 'bulk_process_finish',
    eventId: 'BULK_PROCESS_FINISH',
    title: 'Report for Bulk Payment Process Finish',
    trigger:
      'The notification will be triggered immediately when a bulk payment has been submitted by a provider using either of the channels below, and the bulk payment has finished processing.',
    causes: ['the API', 'the myplace provider portal'],
  },
  {
    id: 'plan_approved',
    eventId: 'PLAN_APPROVED',
    title: 'New Plan Created',
    trigger:
      "This notification will allow Plan Managers or Support Coordinators to be notified when a participant's new plan is created.",
    causes: [
      'The notification for this event will be triggered and sent to the Plan Manager or Support Coordinator when there is a new plan approval given that the provider has consent/authority to view plan details with the related participant.',
    ],
    audience: 'Plan Manager · Support Coordinator',
    notes: [
      'Frequency is "IMMEDIATE", and notification can take up to 1 hour to trigger.',
    ],
    samples: [
      {
        label: 'Sample response data',
        payload: {
          event_id: 'PLAN_APPROVED',
          response: { participant: 430111111 },
        },
      },
    ],
  },
  {
    id: 'rltn_created',
    eventId: 'RLTN_CREATED',
    title: 'Relationship Created',
    trigger: 'For PACE participants, the notification for this event will be triggered when:',
    causes: [
      'My Provider Relationship is created between participant and provider in PACE.',
      'Plan Manager Relationship is created between participant and provider in PACE.',
      'Recovery Coach Relationship is created between participant and provider in PACE.',
      'Support Coordinator Relationship is created between participant and provider in PACE.',
    ],
    notes: [
      'Frequency is "IMMEDIATE", and notification can take up to 1 hour to trigger.',
      'End date can be blank if there is no end date recorded in the PACE system ("end_date": "").',
    ],
    samples: [
      {
        label: 'Sample response data',
        payload: {
          event_id: 'RLTN_CREATED',
          response: {
            participant: 430111111,
            provider_role: 'Plan Manager',
            start_date: '2021-12-30',
            end_date: '2021-12-30',
          },
        },
      },
    ],
  },
  {
    id: 'rltn_end_date_update',
    eventId: 'RLTN_END_DATE_UPDATE',
    title: 'Relationship End Date Update',
    trigger: 'For PACE participants, the notification for this event will be triggered when:',
    causes: [
      'My Provider Relationship end date is updated in PACE.',
      'Plan Manager Relationship end date is updated in PACE.',
      'Recovery Coach Relationship end date is updated in PACE.',
      'Support Coordinator Relationship end date is updated in PACE.',
    ],
    notes: [
      'Frequency is "IMMEDIATE", and notification can take up to 1 hour to trigger.',
    ],
    samples: [
      {
        label: 'Sample response data',
        payload: {
          event_id: 'RLTN_END_DATE_UPDATE',
          response: {
            participant: 430111111,
            provider_role: 'Plan Manager',
            start_date: '2021-12-30',
            end_date: '2021-12-30',
          },
        },
      },
    ],
  },
  {
    id: 'budget_updated_new_p1',
    eventId: 'BUDGET_UPDATED',
    title: 'New Budget Notification created',
    trigger:
      "This notification will allow Plan Managers to be notified when a P1 participant's budget is changed. The trigger is sent if the Plan Manager has participant consent and when a P1 participant's plan-managed budget is updated via APIs or a Staff Member using the Staff Portal for the following scenarios:",
    audience: 'Plan Manager',
    causes: [
      'A participant plan extension',
      'Service Booking creation, update or cancellation',
      'Service booking on quotation approved',
    ],
    samples: [
      {
        label: 'Sample — plan extension',
        payload: {
          event_id: 'BUDGET_UPDATED',
          response: [{ participant: 430111111, plan_id: 1011111 }],
        },
      },
      {
        label: 'Sample — service booking change',
        payload: {
          event_id: 'BUDGET_UPDATED',
          response: [{ participant: 430111111, service_booking_id: 5555556 }],
        },
      },
    ],
  },
  {
    id: 'budget_updated_general',
    eventId: 'BUDGET_UPDATED',
    title: 'Budget Updated Notification',
    trigger:
      "This notification will allow Plan Managers or Support Coordinators to be notified when a participant's budget is updated. The notification for this event will be triggered and sent to the Plan Manager or Support Coordinator when a participant's budget is updated via APIs or a Staff Member using the Staff Portal, given that the provider has consent/authority with the related participant.",
    audience: 'Plan Manager · Support Coordinator',
    notes: [
      'Frequency is "IMMEDIATE", and notification can take up to 1 hour to trigger.',
    ],
    samples: [
      {
        label: 'Sample response data',
        payload: {
          event_id: 'BUDGET_UPDATED',
          response: { participant: 430111111 },
        },
      },
    ],
  },
]

export const webhookSubscribePath = '/ndia-middleware/v1/3.0/notifications/subscribe'
export const webhookConfigPath = '/ndia-middleware/v1/notifications/webhook'
