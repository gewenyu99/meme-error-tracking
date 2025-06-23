import posthog from 'posthog-js'

posthog.init('phc_5xbNHn6pKYcPD2qpmtoJIET2qhoNLObyPsrO8evJQ7w', {
  api_host: 'https://us.i.posthog.com',
  defaults: '2025-05-24',
  debug: true
});

posthog.reset(true)