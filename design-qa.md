# Design QA

## Target and evidence

- Host-app reference: `/Users/anoopjose/Downloads/VIDEO-2026-08-26-08-05-38.mp4`
- Meditation source: `/Users/anoopjose/Downloads/SAINTS CHAPEL meditation.docx`, rendered and visually reviewed across both pages before implementation.
- Reference frame: 384 x 848, with the chapel website occupying the 384 x 507 region between the Jubilee header and bottom navigation.
- Measured host colours: navy `#122644`, orange `#EF6624`, canvas `#F0F2F4`, off-white surface, and cool grey borders.
- Homepage viewport capture: `/Users/anoopjose/.codex/visualizations/2026/08/26/01a03cec-9fdc-73d3-a4ac-f36cba76a9ec/jubilee-preview/jubilee-home-384x848.png`
- Exact embedded-band capture: `/Users/anoopjose/.codex/visualizations/2026/08/26/01a03cec-9fdc-73d3-a4ac-f36cba76a9ec/jubilee-preview/jubilee-embedded-band-384x507.png`
- Updated tabbed-home capture: `/Users/anoopjose/.codex/visualizations/2026/08/26/01a03cec-9fdc-73d3-a4ac-f36cba76a9ec/jubilee-preview/jubilee-home-tabs-849x800.png`
- Meditation capture at the exact embedded size: `/Users/anoopjose/.codex/visualizations/2026/08/26/01a03cec-9fdc-73d3-a4ac-f36cba76a9ec/jubilee-preview/jubilee-meditation-384x507.png`
- Detail captures: `jubilee-detail-top-384x848.png`, `jubilee-detail-top-320x720.png`, and `jubilee-detail-prayer-390x844.png` in the same preview folder.

## Visual review

- The site now continues the Jubilee app's light canvas, deep navy text, orange actions, cool borders, 16 px mobile gutters, and rounded 14 to 20 px surfaces.
- Spectral carries the devotional display voice. A rounded system interface stack matches the native host for body copy, labels, controls, and metadata.
- The phone gallery remains two columns because it mirrors the host app's two-up shortcut pattern. It expands to three columns at 640 px, four at 960 px, and five at 1120 px.
- The homepage is left aligned and uses normal title case. Portraits and saint names remain the primary visual focus.
- Detail pages use a compact all-saints and prayer navigation row, a contained portrait surface, a warm prayer panel, readable story copy, and non-sticky pagination.
- Bright Jubilee orange is retained for decoration and the main action. Darker orange is used for small text, focus indicators, and control boundaries where stronger contrast is required.

## Functional and responsive review

- All ten saint cards render with portraits, patronage, and accessible labels.
- Saint cards identify each subject as “Patron of” or, for Jacinta and Francisco, “Patrons of”.
- The chapel section navigation exposes Saints and Meditation as 44px route links. Meditation preserves the supplied Scripture, reflection sequence, emphasis, litany order, and closing prayer in a mobile devotional layout.
- John Paul II opened from the gallery, the prayer control scrolled the prayer heading to 16 px from the viewport top, and next-saint navigation reached Carlo Acutis with the correct document title.
- No horizontal overflow was found at 320, 384, or 390 px. The exact 384 x 507 embedded viewport also had zero overflow.
- Gallery and detail images completed loading successfully in the browser. The detail portrait reserves its dimensions and has a static navy loading surface beneath the image.
- Browser console checks returned zero warnings and zero errors.
- Route motion is limited to opacity and transform, shortened to 220 ms, and removed under `prefers-reduced-motion`.
- The document declares `viewport-fit=cover`, a light colour scheme, and the host-matched first-paint background. No top safe-area inset is added inside the host-owned header region.

## Issues found and resolved

- P1: The near-black website canvas visibly broke continuity with the light Jubilee shell. Replaced it with the measured app palette and tinted light surfaces.
- P1: The original heading and saint labels were smaller and denser than the host interface. Rebuilt the type hierarchy and increased mobile label sizes.
- P1: Bright orange focus outlines missed the 3:1 focus-indicator contrast threshold. Focus now uses the darker AA orange.
- P1: Fine-pointer opacity hover states reduced text contrast below 4.5:1. Hover feedback now uses transform, contrast-safe colours, and underline thickness.
- P2: The bright orange prayer pill needed a stronger component boundary. Added a darker orange 1 px border.
- P2: Four gallery portraits were preloaded even though only the first row is visible in the app viewport. Priority is now limited to the first two.
- P2: The old detail image could appear as an empty arch while loading. The new fixed-ratio frame exposes an intentional navy loading surface without an extra network request.
- P2: The detail action row was a generic labelled header. It is now a semantic navigation landmark.
- P2: The homepage footer repeated attribution and interaction guidance beneath the completed content. Removed the section and retained 40 px of bottom breathing space.
- P2: The homepage gallery summary repeated information already visible in the hero and cards. Removed the row and retained deliberate separation before the portraits.

## Verification

- `npm run lint`: passed.
- `npm test`: passed, including a successful production build and 8 of 8 tests.
- Production build: 16 of 16 static routes generated, including `/meditation`.
- Browser checks: 320 x 720, 384 x 507, 384 x 848, 390 x 844, and 849 x 800; gallery-to-detail navigation; Saints-to-Meditation tab navigation; all 14 litany responses; prayer anchor; next-saint navigation; image completion; horizontal overflow; and console output.

## Remaining integration check

- Local browser evidence verifies the website at the exact recorded WebView dimensions, but it does not run inside the official Jubilee app. The final release should be checked once in the host app to confirm its WebView background during the pre-response loading interval and its handling of external source links.

Local result: passed. Official host-app integration: pending.
