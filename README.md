# Evolv³ Maps v0.6 — Manual Update (No Code Needed)

## What’s inside
- Updated **index.html**, **script.js**, **styles.css**, and **favicon.png**
- `src/config/version.json` with version + date
- `CHANGELOG.md` with v0.6 notes

## How to publish using the GitHub website
1. Go to your repo: **Evolv3RE/evolv3maps-site** → click **Add file → Upload files**.
2. Drag the files from this ZIP into the upload area. Make sure to keep the folder structure (`src/config/version.json`).
3. Scroll down and click **Commit changes**.
4. Netlify will automatically rebuild and deploy your site.

## Post‑deploy checklist
- The site loads and the map shows brighter satellite imagery during daytime.
- Browser tab title reads **“Evolve Real Estate Maps | Powered by AI”** and the new favicon appears.
- The **AI Enablement** drop-zone lets you click or drag to add files (shows a toast with names).
- The file **src/config/version.json** contains `"version": "v0.6"`.
- Netlify dashboard shows the latest build as **Published**.
