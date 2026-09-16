/**
 * Feature Hints — persistent beacons + "What's New" spotlight.
 *
 * Hints API (separate from Tour API):
 *   const h = hints({ hints: [...] });
 *   h.show();  h.open(id);  h.dismiss(id);  h.restore(id);
 */
function getFeatureHints(cfg = {}) {
  const { extra = [] } = cfg;
  const defaults = [
    {
      id: 'export',
      element: '#export-btn',
      popover: {
        title: 'New: Export Reports 📊',
        description: 'Download as CSV, PDF, or Excel. One click.',
        side: 'bottom', align: 'start',
      },
    },
    {
      id: 'collab',
      element: '#collaborate-btn',
      popover: {
        title: 'Team Collaboration 🤝',
        description: 'Real-time editing, comments, @mentions.',
        side: 'left', align: 'center',
      },
    },
  ];
  return { hints: [...defaults, ...extra] };
}

/**
 * "What's New" tour steps (spotlight pattern).
 * Light overlay so the UI stays visible.
 */
function getWhatsNewSteps(features) {
  return [
    {
      popover: {
        title: 'What\'s New ✨',
        description: 'Latest features to boost your productivity.',
        side: 'bottom', align: 'center',
      },
    },
    ...features.map((f, i) => ({
      element: f.element,
      popover: {
        title: `${f.icon} ${f.title}`,
        description: f.description,
        side: i === features.length - 1 ? 'top' : 'bottom',
        align: 'center',
      },
    })),
  ];
}

if (typeof module !== 'undefined') module.exports = { getFeatureHints, getWhatsNewSteps };
