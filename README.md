# BE Theory

An English-first study companion for the **Flemish Category B driving theory exam** in Belgium.

The site is intentionally static and has no backend. It can be hosted directly on GitHub Pages and stores study progress in the browser with `localStorage`.

## Features

- 9 concise theory lessons focused on the current rules applicable in Flanders
- Visual Belgian road-sign study cards
- Mixed, topic-specific and weak-question practice
- Local progress, accuracy, streak and mock-test history
- 50-question mock exam
- Flemish scoring model: pass at 41/50; ordinary errors cost 1 point; questions concerning permitted maximum speeds and confirmed third-/fourth-degree offences cost 5 points
- Optional 15-second training timer
- Optional English browser text-to-speech
- Responsive mobile/desktop UI with automatic light/dark appearance
- Installable PWA and offline fallback
- No account, analytics or database required

## Accuracy and scope

Content was reviewed against current sources on **10 September 2026**. The project targets the **Flemish** Category B exam and should not be treated as an official exam product.

Important: Belgium's new Code of the Public Road is currently scheduled to enter into force on **1 June 2027**. This site teaches the regulations applicable before that date. Review the sources again before using the site for an exam after a legal change.

Primary references:

- Flemish Government — Category B theory exam: https://www.vlaanderen.be/mobiliteit-en-openbare-werken/auto-en-motor/rijbewijzen-en-rijopleiding/rijbewijs-b/theorie-examen-voor-rijbewijs-b
- Current Belgian traffic regulations: https://www.wegcode.be/nl/regelgeving/1975120109~hra8v386pu
- Regional speed limits: https://www.wegcode.be/nl/verkeersreglement/uitleg-bij-het-verkeersreglement/snelheidsbeperkingen
- Offences by degree: https://www.wegcode.be/nl/verkeersovertredingen/overtredingen-per-graad
- New-code timeline: https://www.wegcode.be/nl/code-van-de-openbare-weg
- VSV study platform: https://www.mijnrijbewijsb.be/studeren/

The mock questions are original study questions. They are not copied or represented as official exam questions. Road-sign illustrations are study recreations; use the current Wegcode for the complete legal sign catalogue and specifications.

## GitHub Pages

A Pages workflow is included at `.github/workflows/pages.yml` and deploys the `main` branch.

For the first deployment, open the repository on GitHub and set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** if it is not already selected. Pushes to `main` will then deploy automatically.

## Local development

The app has no build step. Serve the repository folder over HTTP, for example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Local data

Progress is saved under the browser key `betheory.progress.v1`. Clearing site data or using the in-app reset control deletes that device's progress. Because there is deliberately no account/backend, progress does not sync between devices.
