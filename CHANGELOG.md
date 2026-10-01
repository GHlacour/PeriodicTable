# Changelog

All notable changes to the Periodic Table Game project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
