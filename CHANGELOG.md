# Changelog

All notable changes to the Periodic Table Game project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.3.0] - 2026-11-22

### Features

- **feat(game)**: in Study Mode, show only the selected level's elements - issue #19
  - In-set cells show symbol/number; out-of-set cells are dimmed (`.element-cell.dimmed`) with hidden symbols but stay clickable, so the info pop-up still opens for any element
  - Mode/level changes update the table live when no game is active; starting a game in study mode keeps the level filter
  - Game modes and hints unchanged

Closes #19

---

## [v1.2.0] - 2026-11-22

### Features

- **feat(ui)**: show the app version in the footer - issue #18
  - New generated `js/version.js` exposes `window.APP_VERSION` from the `VERSION` file (works via file:// and on PR previews, no fetch needed)
  - Footer renders it as small muted text (`#app-version` in index.html, `.app-version` in css/style.css, wired in js/game.js)
  - AGENTS.md release procedure now regenerates `js/version.js` together with VERSION/CHANGELOG

Closes #18

---

## [v1.1.1] - 2026-11-22

### Fixes

- **fix(game)**: make Study Mode clicks open the element info panel - [f017026](https://github.com/GHlacour/PeriodicTable/commit/f017026)
  - The study-mode branch in `_handleElementClick` now runs before the `gameActive`/`currentElement` guards (study mode never sets a current question, so clicks were always ignored)
  - Selecting study mode while no game is active reveals all symbols; switching back hides them
  - Game modes unchanged

Closes #16

---

## [v1.1.0] - 2026-11-22

### Features

- **feat(game)**: add Essentials level as the default - [9871071](https://github.com/GHlacour/PeriodicTable/commit/9871071b5155211f9e948e421487f6460c569aac)
  - New `essentials` level with the fixed 36-element set from issue #10, selected by default in the level picker
  - Question targets and hint decoys are drawn from the essential set (shared `_getLevelElements()`); all existing levels unchanged
  - Level display is initialized from the selected radio at boot
  - Added `level.essentials` translations for EN, NL, DA

Closes #10


---

## [v1.0.2] - 2026-11-21

### Fixes

- **fix(game)**: make the Hint button useful - [231cc77](https://github.com/GHlacour/PeriodicTable/commit/231cc779c873e61368f2b5f25b2f2f210e83fd82)
  - Hint now highlights 3 possible locations: the correct element plus 2 random decoys from the current level's element set, persisting until the question is answered (previously a 2s flash on an empty cell)
  - Repeated hints replace the previous highlight set; 3-hint limit kept
  - Hint button disabled outside an active game (e.g. study mode)
  - Updated `feedback.hint` text in EN, NL, DA

Fixes #13

---

## [v1.0.1] - 2026-11-21

### Fixes

- **fix(i18n)**: make language selection work end-to-end - [651d9ed](https://github.com/GHlacour/PeriodicTable/commit/651d9eda9b4dee0eef9ac8409c16840befff928e)
  - Language dropdown now updates all UI text, including the level selection panel (new `data-i18n` attributes and `level.select` key)
  - Element names in table cells, aria-labels, and the info panel re-localize when the language changes
  - Saved language preference persists across reloads (translation loading is awaited before reading localStorage)
  - Translations fall back to embedded data (`js/lang-data.js`, generated from `lang/*.json`) when `fetch()` is unavailable, e.g. opening `index.html` via `file://`
  - No longer overwrites the level display with "All Elements" on language change
  - Added missing `element.group` / `element.period` translations for EN, NL, DA
  - Added missing `trace()` to the debug fallback in `js/i18n.js` - `setLanguage()` threw before the language-selector listener was attached, so the dropdown never worked (root cause of #2)
  - Fixed game-over modal always showing "0 out of N": `updateAllTranslations()` rebuilt `final-score-text` via `innerHTML`, detaching the `#final-score` span cached by `game.js`; the text nodes are now updated in place and `_endGame()` looks the spans up fresh

Fixes #2

---

## [v1.0.0] - 2026-09-27

### Initial Release

First stable release of the Periodic Table Game with all core features implemented.

### Features

- **feat**: Initial project setup with periodic table game - [70bb2df](https://github.com/GHlacour/PeriodicTable/commit/70bb2df)
- **feat**: Add level selection and fix element prompt visibility - [2f53429](https://github.com/GHlacour/PeriodicTable/commit/2f53429)
- **feat**: Improve mobile layout by hiding mode/level selection on small screens - [ebcde0f](https://github.com/GHlacour/PeriodicTable/commit/ebcde0f)
- **feat**: Reduce periodic table cell sizes for better mobile fit - [13b5253](https://github.com/GHlacour/PeriodicTable/commit/13b5253)
- **feat**: Add comprehensive debugging system with state inspection - [31b5253](https://github.com/GHlacour/PeriodicTable/commit/31b5253)
- **docs**: Enhance AGENTS.md with comprehensive GitHub workflow rules - [92327c0](https://github.com/GHlacour/PeriodicTable/commit/92327c0)

### Fixes

- **fix**: Chemically correct symbol case and lighter element colors - [f4ab9c8](https://github.com/GHlacour/PeriodicTable/commit/f4ab9c8)
- **fix**: Reduce spacing between periodic table elements - [3ed6aa3](https://github.com/GHlacour/PeriodicTable/commit/3ed6aa3)
- **fix**: Ensure question is visible before and after start, improve mobile layout - [0a07d73](https://github.com/GHlacour/PeriodicTable/commit/0a07d73)
- **fix**: Question text visibility and next button behavior - [8c386e5](https://github.com/GHlacour/PeriodicTable/commit/8c386e5)
- **fix**: Level selection not working and question display issues - [bb6c2e4](https://github.com/GHlacour/PeriodicTable/commit/bb6c2e4)
- **fix**: Rewrite game.js and periodic-table.js to fix initialization issues - [09f613a](https://github.com/GHlacour/PeriodicTable/commit/09f613a)
- **fix**: Restore periodic table and game start functionality - [aa5c5de](https://github.com/GHlacour/PeriodicTable/commit/aa5c5de)
- **fix**: Element info panel close button and question visibility - [5a9af34](https://github.com/GHlacour/PeriodicTable/commit/5a9af34)
- **fix**: Question text color to black for better readability - [31c4798](https://github.com/GHlacour/PeriodicTable/commit/31c4798)
- **fix**: Hide element info panel in game modes, only show in study mode - [03a7a18](https://github.com/GHlacour/PeriodicTable/commit/03a7a18)
- **fix**: Properly hide element info popup in game modes - [2d33600](https://github.com/GHlacour/PeriodicTable/commit/2d33600)
- **fix**: Element info panel showing in game mode and improve mobile visibility - [59fbfde](https://github.com/GHlacour/PeriodicTable/commit/59fbfde)
- **fix**: Improve touch event handling for better click registration on mobile/tablet - [f6583a0](https://github.com/GHlacour/PeriodicTable/commit/f6583a0)
- **fix**: Multiple game issues - score overflow, default level, and element names - [5eedd62](https://github.com/GHlacour/PeriodicTable/commit/5eedd62)
  - Fix score exceeding total questions (12/10 bug)
  - Change default level from 'all' to 'krypton'
  - Fix element names not being cleared between games
  - Fix element names appearing in white instead of black

---

## Notes

This is the first formal release of the Periodic Table Game. All previous commits have been retroactively documented in this changelog to establish a complete version history.

Version tracking system implemented as per AGENTS.md requirements:
- Primary: VERSION file
- Secondary: Git tag (v1.0.0)
- Reference: CHANGELOG.md
