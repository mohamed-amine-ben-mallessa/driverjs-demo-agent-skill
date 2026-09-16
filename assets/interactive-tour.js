/**
 * Interactive Tour — user performs actions before advancing.
 *
 * Key patterns:
 *   advanceOnClick: true   — tour advances when user clicks the element
 *   waitForElement: 3000   — wait up to 3s for a dynamic element to appear
 *   disableActiveInteraction: false — allow typing/clicking
 */
function getInteractiveSteps(cfg = {}) {
  const { taskName = 'your first task', extra = [] } = cfg;

  return [
    {
      popover: {
        title: `Let's Create ${taskName}! 🚀`,
        description: 'Hands-on tour — you\'ll interact with the app as you learn.',
        side: 'bottom', align: 'center',
      },
    },
    {
      element: '#create-btn',
      popover: {
        title: 'Step 1: Start',
        description: 'Click this button to open the creation form.',
        side: 'left', align: 'start',
      },
      advanceOnClick: true,
    },
    {
      element: '#creation-modal',
      popover: {
        title: 'Step 2: The Form',
        description: 'Great! Now fill in the details below.',
        side: 'right', align: 'center',
      },
      waitForElement: 3000,
    },
    {
      element: '#input-name',
      popover: {
        title: 'Step 3: Name It',
        description: 'Type a descriptive name for your project.',
        side: 'right', align: 'start',
      },
      disableActiveInteraction: false,
    },
    {
      element: '#save-btn',
      popover: {
        title: 'Step 4: Save 🎉',
        description: 'Click Save to create it. You\'re done!',
        side: 'top', align: 'center',
      },
      advanceOnClick: true,
    },
    ...extra,
  ];
}

/**
 * Setup wizard steps.
 */
function getSetupSteps() {
  return [
    { popover: { title: 'Welcome! 🛠️', description: 'Quick setup — about 2 minutes.', side: 'bottom', align: 'center' } },
    { element: '#workspace-name', popover: { title: 'Workspace Name', description: 'Usually your team or company name.', side: 'bottom', align: 'start' } },
    { element: '#invite-team', popover: { title: 'Invite Your Team', description: 'Enter emails. They\'ll be notified automatically.', side: 'left', align: 'start' } },
    { element: '#integrations', popover: { title: 'Connect Tools', description: 'Link Slack, GitHub, Google Drive, and more.', side: 'top', align: 'start' } },
    { element: '#finish-setup', popover: { title: 'Launch! 🚀', description: 'Click to finish setup and start using your workspace.', side: 'top', align: 'center' }, advanceOnClick: true },
  ];
}

if (typeof module !== 'undefined') module.exports = { getInteractiveSteps, getSetupSteps };
