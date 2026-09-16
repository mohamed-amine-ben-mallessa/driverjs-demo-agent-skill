/**
 * Form Guidance — field-by-field tour with validation hints.
 *
 * Use disableActiveInteraction: false so the user can type.
 */
function getFormSteps(cfg = {}) {
  const { type = 'signup', extra = [] } = cfg;

  const signup = [
    {
      element: '#field-name',
      popover: { title: 'Full Name', description: 'First and last name as displayed to teammates.', side: 'right', align: 'start' },
      disableActiveInteraction: false,
    },
    {
      element: '#field-email',
      popover: { title: 'Email 📧', description: 'Work email for team features. Verification link sent here.', side: 'right', align: 'start' },
      disableActiveInteraction: false,
    },
    {
      element: '#field-password',
      popover: { title: 'Password 🔒', description: 'Min 8 chars. Mix letters, numbers, symbols.', side: 'right', align: 'start' },
      disableActiveInteraction: false,
    },
    {
      element: '#field-role',
      popover: { title: 'Your Role', description: 'Personalizes your experience and suggestions.', side: 'left', align: 'start' },
    },
    {
      element: '#field-team',
      popover: { title: 'Team Size', description: 'Determines which plan fits best.', side: 'left', align: 'start' },
    },
    {
      element: '#field-terms',
      popover: { title: 'Terms ✅', description: 'Accept to continue. Review policies anytime.', side: 'left', align: 'start' },
    },
    {
      element: '#submit-btn',
      popover: { title: 'All Set! 🎉', description: 'Click to create your account.', side: 'top', align: 'center' },
      advanceOnClick: true,
    },
  ];

  const checkout = [
    {
      element: '#billing-name',
      popover: { title: 'Billing Name', description: 'Appears on invoices.', side: 'right', align: 'start' },
      disableActiveInteraction: false,
    },
    {
      element: '#card-number',
      popover: { title: 'Card Number 💳', description: '256-bit encryption — your data is secure.', side: 'bottom', align: 'start' },
      disableActiveInteraction: false,
    },
    {
      element: '#card-expiry',
      popover: { title: 'Expiry', description: 'MM/YY format.', side: 'bottom', align: 'start' },
      disableActiveInteraction: false,
    },
    {
      element: '#card-cvv',
      popover: { title: 'CVV', description: '3-digit code on the back (4 for Amex).', side: 'bottom', align: 'end' },
      disableActiveInteraction: false,
    },
    {
      element: '#pay-btn',
      popover: { title: 'Complete Purchase ✅', description: 'Review and confirm. Receipt sent by email.', side: 'top', align: 'center' },
      advanceOnClick: true,
    },
  ];

  const map = { signup, checkout, custom: extra };
  return map[type] || signup;
}

if (typeof module !== 'undefined') module.exports = { getFormSteps };
