# AGENTS.md - Development Guidelines for Periodic Table Game

## Project Overview

This is an **online educational game** for practicing the periodic table of chemical elements. The game is hosted on GitHub at [GHlacour/PeriodicTable](https://github.com/GHlacour/PeriodicTable) and is displayed directly from the repository.

**Primary Goal**: Create an interactive web-based game for learning the periodic table that is accessible, educational, and multi-language (English, Dutch, Danish).

**Target Audience**: Students, teachers, and chemistry enthusiasts worldwide.

---

## GitHub Workflow Rules

### ALL Changes MUST Be Committed to GitHub

**This is non-negotiable.** Every change, no matter how small, must be:
1. Committed to the local repository with a descriptive message
2. Pushed to the remote GitHub repository
3. Associated with the correct version number

### Version Tracking

The project uses **Semantic Versioning (SemVer)** for all releases:
- `MAJOR` - Breaking changes, major feature additions
- `MINOR` - New features, improvements (backward compatible)
- `PATCH` - Bug fixes, small improvements

**Version Format**: `vX.Y.Z` (e.g., `v1.0.0`)

#### Version Number Locations
- **Primary**: `package.json` (if exists) or `VERSION` file
- **Secondary**: Git tag with format `vX.Y.Z`
- **Reference**: Update `CHANGELOG.md` with each version

#### Version Bump Procedure
```bash
# After implementing changes:
git add .
git commit -m "feat: add new game mode"

# Update version (example: from v1.0.0 to v1.1.0 for new feature)
# Edit VERSION file or package.json

# Tag the release
git tag -a v1.1.0 -m "Release v1.1.0: Add timed challenge mode"
git push origin main --tags
```

### Branch Strategy

| Branch Type | Naming Convention | Purpose | When to Use |
|-------------|-------------------|---------|-------------|
| `main` | `main` | Production-ready code | Always exists |
| `develop` | `develop` | Integration branch for next release | Long-lived |
| Feature | `feat/<short-description>` | New features | Per feature |
| Bug Fix | `fix/<short-description>` | Bug fixes | Per bug |
| Release | `release/vX.Y.Z` | Prepare release | Before deployment |
| Hotfix | `hotfix/<short-description>` | Critical production fixes | Urgent issues |
| Documentation | `docs/<short-description>` | Documentation updates | Per doc change |
| Refactor | `refactor/<short-description>` | Code refactoring | Per refactor |

#### Branch Creation Rules
```bash
# Feature branch (from develop or main)
git checkout -b feat/add-multiplayer main

# Bug fix branch (from main)
git checkout -b fix/element-positioning main

# Hotfix branch (from main)
git checkout -b hotfix/critical-security main
```

### Issue-Driven Development

**ALL** game changes must be tracked through GitHub Issues:

1. **Before Starting Work**: Create or find an existing issue
2. **In Issue**: Clearly describe the change, expected behavior, and acceptance criteria
3. **Branch Name**: Reference the issue number in the branch name
4. **Commit Messages**: Reference the issue in commit messages
5. **Pull Request**: Link to the issue when opening a PR

#### Issue Types
| Type | Label | Example |
|------|-------|---------|
| Bug | `bug` | Element not highlighting correctly |
| Feature | `enhancement` | Add quiz mode with custom questions |
| Documentation | `documentation` | Update README with setup instructions |
| Refactor | `refactor` | Clean up game state management |
| Translation | `i18n` | Add German language support |
| Accessibility | `accessibility` | Improve screen reader support |

#### Commit Message Format
```
<type>(<scope>): <description>

<optional body>

<optional footer with issue reference>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `i18n`

**Examples**:
```bash
# Good commit messages
git commit -m "feat(game): add find-by-block mode"
git commit -m "fix(ui): correct element highlighting on mobile"
git commit -m "i18n: add Swedish translations"
git commit -m "docs: update README with installation instructions"

# With issue reference
git commit -m "feat(quiz): add custom question mode

Implements ability to create custom quizzes

Closes #42"
```

### Pull Request Requirements

Before merging any PR:
- [ ] All tests pass (if applicable)
- [ ] Code follows repository style guidelines
- [ ] No console errors or warnings
- [ ] All languages are supported (EN, NL, DA)
- [ ] Documentation updated (if needed)
- [ ] Version number updated (if applicable)
- [ ] PR description includes:
  - What was changed
  - Why it was changed
  - Screenshots (if UI changes)
  - Testing notes
- [ ] At least one approval from maintainer
- [ ] Linked to relevant issue(s)

---

## Development Guidelines

### Code Quality Standards

#### HTML
- Semantic HTML5
- Proper ARIA attributes for accessibility
- Valid markup (use [W3C Validator](https://validator.w3.org/))
- Mobile-first responsive design

#### CSS
- Use CSS custom properties (variables) for theming
- Flexbox and Grid for layouts
- No `!important` (except for overriding third-party styles)
- Mobile-responsive with media queries
- Prefer class selectors over element selectors

#### JavaScript
- ES6+ features (use Babel if needed for older browsers)
- Modular code with clear separation of concerns
- No global variables (use IIFE or modules)
- Error handling for all external operations
- Promises/async-await for asynchronous code
- No jQuery or framework dependencies (vanilla JS only)

### File Structure
```
PeriodicTable/
├── .github/                  # GitHub configuration
│   ├── ISSUE_TEMPLATE/      # Issue templates
│   └── workflows/           # GitHub Actions
├── AGENTS.md                # This file - AI agent guidelines
├── CHANGELOG.md             # Version history
├── CONTRIBUTING.md          # Contribution guidelines
├── LICENSE                  # License file
├── README.md                # Project documentation
├── VERSION                  # Current version number
├── index.html               # Main game entry point
├── css/
│   ├── style.css            # Main stylesheet
│   └── theme.css            # Theme variables (future)
├── js/
│   ├── game.js               # Core game logic
│   ├── periodic-table.js     # Periodic table data and rendering
│   ├── i18n.js               # Internationalization system
│   └── utils.js              # Utility functions
├── lang/
│   ├── en.json               # English translations
│   ├── nl.json               # Dutch translations
│   └── da.json               # Danish translations
├── assets/
│   ├── images/               # Images and icons
│   └── sounds/               # Sound effects (future)
└── tests/                   # Test files (future)
```

### Internationalization (i18n) Requirements

**ALL** user-facing text must support:
- English (en)
- Dutch (nl) 
- Danish (da)

**Rules**:
1. Never hardcode text in JavaScript - use i18n system
2. All new features must include translations for all three languages
3. Element names must be localized (Hydrogen = Waterstof = Brint)
4. UI labels, buttons, feedback messages must be translatable
5. Test all languages before committing

**Adding a New Language**:
1. Create new JSON file in `lang/` directory
2. Copy structure from `en.json`
3. Translate all strings
4. Add to language selector in `index.html`
5. Update `i18n.js` to support the new language
6. Test thoroughly

### Accessibility Requirements

The game must meet **WCAG 2.1 AA** standards:

- [ ] All interactive elements are keyboard navigable
- [ ] All images have alt text
- [ ] All form elements have labels
- [ ] Sufficient color contrast (4.5:1 for text)
- [ ] ARIA attributes for screen readers
- [ ] Focus management for modals and overlays
- [ ] Reduce motion support
- [ ] High contrast mode support
- [ ] Skip to content link (if page grows)

### Browser Support

| Browser | Minimum Version | Support Level |
|---------|-----------------|---------------|
| Chrome | Latest 2 versions | Full |
| Firefox | Latest 2 versions | Full |
| Safari | Latest 2 versions | Full |
| Edge | Latest 2 versions | Full |
| Mobile browsers | Latest versions | Full (touch support) |

### Testing Requirements

Before committing:
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile (iOS and Android)
- [ ] Test all language support (EN, NL, DA)
- [ ] Verify keyboard navigation works
- [ ] Check screen reader compatibility (VoiceOver/NVDA)
- [ ] Validate HTML and CSS
- [ ] No console errors or warnings
- [ ] All game modes work correctly
- [ ] Responsive design works at all breakpoints

---

## Game Development Standards

### Game State Management
- Use clear, predictable state transitions
- Persist game preferences in localStorage
- Reset state properly between games
- Handle edge cases (e.g., all elements used)

### Periodic Table Data
- Source: IUPAC standard periodic table
- 118 elements (as of 2024)
- Store in structured format with:
  - Atomic number
  - Symbol
  - Name (localized)
  - Category
  - Group
  - Period
  - Block (s, p, d, f)
  - Position (x, y coordinates)

### Game Modes
Each game mode must:
1. Have clear objectives
2. Provide feedback on user actions
3. Track score accurately
4. Support all languages
5. Be accessible
6. Work on mobile devices

**Current Modes**:
- Find by Name
- Find by Symbol
- Find by Group
- Find by Period
- Study Mode

**Future Mode Ideas**:
- Timed challenges
- Custom quizzes
- Element properties quiz
- Multiplayer (future)

### Scoring System
- Clear scoring rules
- Visual feedback for correct/incorrect answers
- Performance summary at game end
- Option to save high scores (localStorage)

### Visual Design
- Clean, educational aesthetic
- Color-coded element categories
- Clear typography
- Consistent spacing
- Mobile-friendly touch targets (min 48x48px)

---

## Security & Privacy

### DO NOT
- ❌ Add tracking, analytics, or advertising code
- ❌ Include any user data collection
- ❌ Use external dependencies without approval
- ❌ Commit secrets, API keys, or credentials
- ❌ Make the game publicly writable
- ❌ Bypass GitHub security features

### DO
- ✅ Use HTTPS for all external resources
- ✅ Sanitize all user inputs
- ✅ Validate all data before rendering
- ✅ Use Content Security Policy (CSP) headers
- ✅ Keep dependencies updated
- ✅ Review third-party code carefully

---

## Deployment Process

### GitHub Pages Deployment
The game is deployed via GitHub Pages from the `main` branch.

**Automatic Deployment**:
1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Game is available at: https://GHlacour.github.io/PeriodicTable/

**Manual Deployment** (if needed):
```bash
# Build and deploy
npm run build  # If using build process
git add dist/
git commit -m "deploy: update GitHub Pages"
git push origin main
```

### Version Release Process

1. **Create Release Branch**:
   ```bash
   git checkout -b release/v1.2.0 develop
   ```

2. **Update Version**:
   - Update `VERSION` file
   - Update `CHANGELOG.md`
   - Update any version references in code

3. **Test Thoroughly**:
   - All features work
   - All languages supported
   - No bugs or errors

4. **Merge to Main**:
   ```bash
   git checkout main
   git merge release/v1.2.0 --no-ff
   git tag -a v1.2.0 -m "Release v1.2.0: <description>"
   ```

5. **Push to GitHub**:
   ```bash
   git push origin main
   git push origin v1.2.0
   ```

6. **Create GitHub Release**:
   - Go to GitHub Releases
   - Create new release from tag
   - Add release notes
   - Publish

---

## Maintenance Tasks

### Regular Tasks
- [ ] Update dependencies (if any)
- [ ] Review and triage new issues
- [ ] Test on latest browser versions
- [ ] Update translations (if needed)
- [ ] Review accessibility compliance
- [ ] Check for security vulnerabilities

### Before Major Release
- [ ] Full regression testing
- [ ] Performance testing
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Accessibility audit
- [ ] Update all documentation
- [ ] Create migration guide (if needed)

---

## Getting Help

### Questions?
When in doubt about design decisions, prioritize:

1. **Educational Value** - Does it help users learn chemistry?
2. **User Experience** - Is it intuitive and enjoyable?
3. **Accessibility** - Can everyone use it?
4. **Performance** - Does it run smoothly?
5. **Maintainability** - Can it be easily updated?

### Decision Making
- Small changes: Use your best judgment
- Medium changes: Discuss in issue comments
- Large changes: Create RFC (Request for Comments) issue

### Resources
- [GitHub Repository](https://github.com/GHlacour/PeriodicTable)
- [GitHub Issues](https://github.com/GHlacour/PeriodicTable/issues)
- [GitHub Discussions](https://github.com/GHlacour/PeriodicTable/discussions)
- [IUPAC Periodic Table](https://iupac.org/what-we-do/periodic-table-of-elements/)

---

## Quick Reference Commands

```bash
# Start development
# (No build process needed - just edit files)

# Check status
git status

# Add all changes
git add -A

# Commit with message
git commit -m "feat: add new feature"

# Push to remote
git push origin <branch-name>

# Create new branch
git checkout -b feat/new-feature

# Merge branch
git checkout main
git merge feat/new-feature

# Tag release
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# Pull latest changes
git pull origin main

# Resolve conflicts
# (Use merge tool or manual resolution)
```

---

**Remember**: Every change, no matter how small, must go through GitHub with proper version tracking and issue linkage.

*Last updated: [Date will be auto-updated by maintainers]*
*Version: This document applies to all versions of the Periodic Table Game*
