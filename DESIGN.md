# DNA design system

The chosen direction is a bright, tactile gallery. This system currently powers `dist/design-system.html`, including its interactive opening preview. The full six-situation exhibit will migrate in a later pass.

## Visual foundation

Original photographic objects occupy the scene. The opening uses a large, unframed photograph, bold Archivo type, and a shared horizontal choice group. The photographic background blends into the wall; the actual artifact colors and printed wording remain intact. Detailed inspection shows the complete original photograph.

The original DNA wordmark retains its serif treatment. Archivo is locally hosted, under the SIL Open Font License. Display type uses weight 600, a 1.02 line height, and tracking of -0.035em. Reading text uses normal weight and generous line height. Typography contracts at narrow widths rather than clipping.

## Shared tokens

`dist/system/tokens.css` is the source of truth. The reference page reads color values directly from it.

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Wall | `--dna-wall` | `#f5f4f0` | Gallery background |
| Sheet | `--dna-sheet` | `#eae9e3` | Inspection and media states |
| Ink | `--dna-ink` | `#212524` | Main text and advancing actions |
| Secondary | `--dna-muted` | `#616760` | Supporting text |
| Line | `--dna-line` | `#c8cbc2` | Group boundaries and unselected controls |
| Life | `--dna-life` | `#25516d` | The blue package’s choice |
| Mortality | `--dna-end` | `#7d4038` | The red package’s choice |
| Focus | `--dna-focus` | `#175c8a` | Keyboard focus |

Blue and red identify the offers. They do not assign value to an answer. Matrix comparisons must include written labels and marks.

Spacing uses 4, 8, 12, 16, 24, 40, 64, and 96px steps. Control corners are 2px; inspection sheets have square corners. The system uses no decorative shadows.

## Components

`dist/system/components.css` contains the shared component styles. `dist/system/choice-group.mjs` renders native radio groups using the approved answer labels.

| Component | Contract |
| --- | --- |
| `.dna-choice-group` | Three equal choices on desktop; stacked rows below 700px. Selected state uses a filled mark and a stronger top rule. Focus has its own outline. Native radio keyboard behavior remains intact. |
| `.dna-button` | Solid advancing action; `--quiet` for supporting actions; `--link` for optional reading or inspection. Minimum height 44px. Disabled state remains visibly unavailable. |
| `.dna-reflection` | Question revealed after a choice; text remains accessible when animation is unavailable. |
| `.dna-sheet` | Native dialog for protected artifact inspection. Escape closes it and returns focus. Horizontal gallery tabs support arrows, Home, and End. |
| `.dna-progress` | Six small marks with a named situation and readable position. Position does not imply completed answers. |
| `.dna-matrix` | Neutral comparison table. The reference mirrors the actual opening answer; five remaining rows stay unanswered. Narrow screens have a labeled horizontal scroll region. |
| `.dna-notes` | Optional native textarea with a 500-character limit, visible counter, clear action, and page-memory lifetime. |
| `.dna-status` | Plain state copy. Media failures explain the problem and provide a retry action. |

Use the shared radio API:

```js
import {createChoiceGroup} from './system/choice-group.mjs';
const group = createChoiceGroup(host, {
  name: 'decision',
  legend: 'Your answer to the fictional offer',
  onChange(choice) { /* Update the exhibit's in-memory model. */ }
});
group.set('extend');
group.set(null);
group.disable(true);
```

Each group needs a unique name. Do not assign different values to visual and model state. The opening and component reference use the same renderer.

## Motion and states

Controls respond in 120ms. A reflection reveals in 360ms with `cubic-bezier(.16,1,.3,1)`; JavaScript reads the duration and easing tokens. Reduced motion removes the reveal and animated loading indicator. No automatic scrolling, decorative floating, or looping entrances.

The reference page demonstrates ready, selected, disabled, loading, error, recovery, and empty-answer states. Opening and inspection photography also have actual loading and retry behavior. Loading/error demonstrations are explicitly labeled previews.

## Responsive and accessibility rules

At 700px and below, the artifact follows the question and precedes the controls. Choices stack, sections become a single reading column, and inspection tabs can scroll. At 320px, labels wrap rather than overflow. Keyboard focus stays distinct from selection. Use the shared authored SVG symbols for arrow, close, check, and expand controls.

Color contrast is verified for ink, secondary text, both choice colors, and focus against the wall and sheet. Artifact captions sit on a solid wall-colored surface. Image alt text names the original objects. The opening answer and preview state changes are held in page memory; no submission or browser storage is introduced.
