# Priyanshu Negi — Midnight Rose Portfolio

This update uses the user's live Vercel layout as its base. It adds a black/pink theme, a compact toolkit, colorful project illustrations, SQUEEZE as the first featured independent build, clearly styled animated website links, an interactive Sun/eight-planet service system, and four service groups.

## Deploy to Vercel
1. Extract this ZIP into a project folder.
2. Upload the extracted files to a GitHub repository and import it in Vercel.
3. Framework Preset: Other. Build command: npm run build. Output directory: dist.
4. Deploy. No environment variables, API keys, database, or package installation are required.

You can also run npx vercel --prod from the extracted folder after signing in. Select your existing Vercel project if updating the live site.

## Local preview
Run npm run build, then python -m http.server 8080 --directory dist.
Open http://localhost:8080. Opening index.html directly is insufficient for JavaScript modules.

## Editing
index.html: page text and links.
app.js: original project detail content and hero orbit.
journey.js: service and four-group workspace descriptions, original scroll motion.
solar.js: interactive orbital service diagram.
pink.css: black/pink theme and responsive layouts.
images: replaceable artwork and profile photo.

The Sun and planet colors are stylized and planet inspired; distances, sizes and speeds are for the interface rather than a scientifically scaled simulation. Select planets directly or use the keyboard-accessible service buttons. Local/global pause controls and reduced-motion preferences are respected. The solar diagram uses Canvas 2D and therefore works even if WebGL is unavailable; the original 3D hero/Nova retain their WebGL fallbacks.

The Fieldwork card uses an actual screenshot of its website intro. Other project illustrations are clearly labelled concepts and do not represent actual client screenshots or measured outcomes. Vooket and Operations use restrained, minimal interface concepts. SpaceAI remains described as a prototype with its AI API unconnected. All original professional project details, real links, résumé, filters, email actions, Nova, mobile menu and hero focus controls are retained.

## Verification
JavaScript syntax, asset references, all project dialogs/filters, 8 service selections, 4 workspace selections, solar click selection and motion controls were checked programmatically at desktop and mobile sizes, including reduced motion. The static build and ZIP contents were checked. Browser visual/performance QA was unavailable; these checks do not establish measured frame rates or replace visual review.

## Licensing
Bundled fonts and libraries retain their license files in assets/licenses and vendor headers.
