FRANK'S EMPIRE V9 — THE STUDIO UPDATE
Open index.html or publish the contents of this folder to your existing GitHub repository (index.html at the root). No build command. Netlify publish directory: .
New: 3 shops, 18 original studio illustrations, refreshed panoramic category banners, compact dropdown navigation, Frank Guo profile, editable fictional checkout with selectable test cards, 10 distinct games and connected liquid wave physics. Media Lounge links to official sources and an optional third-party open-film player.
Demo checkout does not send or store form values. Never enter actual payment or personal information. All products and reviews are fictional.

V9.1 photo update: six kitchenware product illustrations replaced with generated studio photography; kitchenware banner rebuilt. Travel and stationery retain V9 original illustrations.

V12: image-led gallery and six sanctuary themes; endless recentered scrolling, feathered transitions, and wall-clock focus timer. Existing static hosting settings unchanged.

VERSION 13.1 — Capri local navigation prototype
Capri runs entirely in the browser. It is not a generative AI model and has no API key, account, or external request. The Experiences > Capri link and the roaming avatar open it. The old Fidget Room link redirects to Capri.
Focus Sanctuary: compact study interface, editable 1–180 minute duration, deadline-based timer, digital/circular/analog modes.
Gallery: ten intact paintings with edge-matched, pre-rendered transition extensions. No fade or forced snapping. Transitions use reflected and blended source artwork, not individually outpainted scenes; visible artistic artifacts can remain. Exact 60 FPS is not guaranteed.

OPTIONAL FUTURE AI INTEGRATION (NOT ENABLED IN THIS RELEASE)
Use a server-side Netlify Function to call an AI provider's API. Store the API key only as a server-side environment variable (OPENAI_API_KEY for OpenAI). Never put a secret in capri.js, HTML, GitHub, or browser storage. Give the server model a fixed site directory and catalog, request a short reply and an allowlisted route ID, and keep the browser responsible for displaying safe links. Keep the local guide as a fallback. Require access control and rate limits before exposing a paid endpoint publicly, cap input/output lengths, and configure usage alerts/limits. Use age-appropriate safety controls, do not request private information, and disclose when questions are sent to an external service. A parent/guardian should help with account permission and billing if the developer is under 18. API usage is separate from ChatGPT subscriptions.
Official references: https://platform.openai.com/docs/overview and https://docs.netlify.com/build/functions/environment-variables/
