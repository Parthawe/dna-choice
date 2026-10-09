# DNA · The Choice

An interactive exhibit adapted from Parth Pawar’s [DNA speculative design project](https://designwhich.works/dna-speculative/), created at NYU ITP in 2024.

The original pharmaceutical boxes ask whether you would take 50 more years. This version adds five independent situations about relationships, health, unequal access, ongoing treatment, and evidence. Each situation changes one condition of the starting offer. Visitors can inspect the original photography, answer, reconsider, and record what matters to them.

## The personal record

After six answers, the matrix compares each situation with the original decision. Visitors can revise any row without erasing later answers. Three counts describe the current answers:

- **Differences:** the number of the five situation answers that differ from the original answer. An undecided answer is a distinct choice.
- **Undecided:** the number of undecided answers across all six decisions.
- **Choice counts:** the totals for Extend, Accept, and Undecided.

The observations come from those answers. There are no audience statistics, scores, or personality labels. Text downloads and print/PDF records include all decisions, assumptions, reflection questions, private notes, and sources.

## Run and verify

There are no dependencies or build step. Serve the static files:

```sh
python3 -m http.server 4317 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:4317/`. Run the calculation and export tests with Node.js 18 or later:

```sh
node --test tests/model.test.mjs
node --input-type=module --check < dist/app.js
```

`dist/model.mjs` defines the independent scenarios, calculations, and text record. `dist/app.js` connects the model to native browser controls. `dist/style.css` contains the responsive presentation and print layout. The optional Sites deployment configuration lives in `.openai/hosting.json`; the static site can also be served by another provider.

## Data and accessibility

All treatment offers are fictional. Responses and notes stay in page memory only. There is no browser storage, analytics, account, payment, or submission form. Reloading or restarting clears the session. Exported files remain wherever the visitor saves them. The hosting provider may process ordinary requests under its own policies.

The interface uses labeled native radio buttons, keyboard gallery tabs, native dialogs, visible focus states, live choice announcements, browser history, and layouts for narrow screens. Optional WebMCP tools use the same validated actions as the controls and never expose private notes.

## Sources and assets

Scientific context links to the National Institute on Aging’s [healthspan discussion](https://www.nia.nih.gov/news/live-long-good-health-could-calorie-restriction-mimetics-hold-key), [Interventions Testing Program](https://www.nia.nih.gov/research/dab/interventions-testing-program-itp/about-itp), and [Division of Aging Biology](https://www.nia.nih.gov/research/dab). The context distinguishes research in mice from evidence for the fictional human promise.

Original artifact photography and the DNA concept belong to Parth Pawar. The exhibit preserves the original photographs and adds new interface copy and scenarios. Instrument Sans is hosted locally under the [SIL Open Font License](dist/assets/InstrumentSans-OFL.txt). See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). No blanket license is granted for the project’s code or photography.

## Design-system foundation

Open `design-system.html` to explore the bright gallery direction, an interactive opening preview, reusable choice controls, inspection sheet, color/type/spacing tokens, motion, and image states. The selected system is documented in [DESIGN.md](DESIGN.md); its shared CSS and radio renderer are in `dist/system/`. The full exhibit migration follows this foundation.
