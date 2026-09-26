# AGENTS.md

## Guidelines for AI Agents

This project is an **online educational game** for practicing the periodic table of elements. The game helps users learn basic chemistry by interacting with an empty periodic table to identify element locations and properties.

### Project Scope
- **Primary Goal**: Create an interactive web-based game for learning the periodic table
- **Target Audience**: Students and chemistry enthusiasts
- **Supported Languages**: Dutch, English, Danish (multi-language support required)
- **Platform**: Web browser (mobile and desktop compatible)

### Development Guidelines

#### Code Quality
- Use semantic HTML5, modern CSS (Flexbox/Grid), and vanilla JavaScript (ES6+)
- Keep the codebase simple and maintainable
- Follow accessibility best practices (WCAG 2.1 AA minimum)
- Ensure responsive design for all screen sizes

#### Game Design
- The core gameplay involves an **empty periodic table** that users interact with
- Game modes should include:
  - Element location practice (find elements by name/symbol)
  - Element property identification (groups, periods, blocks)
  - Timed challenges
  - Study mode (explore without pressure)
- Support multiple languages for all UI text and element names
- Include visual feedback and scoring systems

#### Internationalization (i18n)
- All user-facing text must support Dutch, English, and Danish
- Use a simple i18n system with JSON language files
- Element names should be localized (e.g., "Iron" = "IJzer" in Dutch, "Jern" in Danish)
- UI labels, instructions, and feedback messages must be translatable

#### File Structure
```
PeriodicTable/
├── index.html          # Main game page
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   ├── game.js         # Core game logic
│   ├── periodic-table.js # Periodic table data and rendering
│   └── i18n.js         # Internationalization handling
├── lang/
│   ├── en.json         # English translations
│   ├── nl.json         # Dutch translations
│   └── da.json         # Danish translations
└── assets/             # Images, sounds, etc.
```

### Do Not
- ❌ Add external dependencies without approval
- ❌ Use frameworks (React, Vue, Angular, etc.) - keep it vanilla
- ❌ Include tracking, analytics, or advertising code
- ❌ Make the game publicly accessible during development
- ❌ Commit secrets, API keys, or credentials

### Testing
- Test on modern browsers (Chrome, Firefox, Safari, Edge)
- Verify all language support works correctly
- Ensure touch support for mobile devices
- Validate accessibility with screen readers

### Commit Messages
Use clear, descriptive commit messages following conventional commits style:
- `feat: add periodic table grid rendering`
- `fix: correct element positioning in mobile view`
- `docs: update README with game instructions`
- `i18n: add Danish element names`

### Questions?
When in doubt about design decisions, prioritize:
1. Educational value (does it help users learn chemistry?)
2. Simplicity (can it be implemented cleanly?)
3. Accessibility (can everyone use it?)
4. Performance (does it run smoothly?)
