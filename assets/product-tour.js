/**
 * Product Tour — reusable step config.
 *
 * Usage:
 *   const steps = getProductTourSteps({ appName: 'Acme' });
 *   const tour = driver({ showProgress: true, steps });
 *   tour.drive();
 */
function getProductTourSteps(cfg = {}) {
  const {
    appName = 'MyApp',
    logoSel = '#logo',
    sidebarSel = '#sidebar',
    navSel = '#nav-dashboard',
    searchSel = '#search-input',
    notifSel = '#notifications-btn',
    profileSel = '#profile-btn',
    contentSel = '#main-content',
    createSel = '#create-btn',
    extra = [],
  } = cfg;

  return [
    {
      element: logoSel,
      popover: {
        title: `Welcome to ${appName}! 👋`,
        description: `Quick tour — about a minute. You can restart anytime.`,
        side: 'right', align: 'start',
      },
    },
    {
      element: sidebarSel,
      popover: {
        title: 'Navigation Sidebar',
        description: 'All your tools in one place — Dashboard, Projects, Team, and more.',
        side: 'right', align: 'start',
      },
    },
    {
      element: navSel,
      popover: {
        title: 'Dashboard',
        description: 'Bird\'s-eye view: metrics, recent activity, quick actions.',
        side: 'right', align: 'center',
      },
    },
    {
      element: searchSel,
      popover: {
        title: 'Quick Search 🔍',
        description: 'Find anything instantly — projects, tasks, people, files.',
        side: 'bottom', align: 'start',
      },
    },
    {
      element: notifSel,
      popover: {
        title: 'Notifications',
        description: 'Real-time alerts for mentions, deadlines, and updates.',
        side: 'bottom', align: 'end',
      },
    },
    {
      element: profileSel,
      popover: {
        title: 'Your Account',
        description: 'Profile, preferences, billing, and sign-out.',
        side: 'bottom', align: 'end',
      },
    },
    {
      element: createSel,
      popover: {
        title: 'Create New ✨',
        description: 'Start a project, invite teammates, begin collaborating.',
        side: 'left', align: 'start',
      },
    },
    {
      element: contentSel,
      popover: {
        title: 'You\'re All Set! 🎉',
        description: 'Explore at your own pace. Restart this tour from the 🦊 button.',
        side: 'top', align: 'center',
      },
    },
    ...extra,
  ];
}

if (typeof module !== 'undefined') module.exports = { getProductTourSteps };
