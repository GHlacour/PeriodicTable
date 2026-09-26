# Periodic Table Game

An **interactive online game** for practicing and learning the periodic table of chemical elements. Test your knowledge by identifying element locations, symbols, and properties across multiple game modes.

## Features

- 🎮 **Interactive Periodic Table**: Empty table that reveals elements as you play
- 🌍 **Multi-Language Support**: Dutch, English, and Danish
- 📚 **Educational**: Learn element names, symbols, groups, periods, and blocks
- ⏱️ **Game Modes**:
  - Find by Name: Locate elements by their name
  - Find by Symbol: Identify elements by their chemical symbol
  - Group Challenge: Identify elements belonging to specific groups
  - Period Challenge: Find elements in specific periods
  - Study Mode: Explore the table at your own pace
- 📊 **Scoring System**: Track your progress and improve over time
- 🎨 **Responsive Design**: Works on desktop and mobile devices
- ♿ **Accessible**: Screen reader friendly with keyboard navigation

## Quick Start

### Playing the Game

Simply open `index.html` in any modern web browser:

```bash
# Open directly in browser
open index.html
# or
xdg-open index.html
```

Or serve it locally:

```bash
# Using Python
python3 -m http.server 8000
# Then visit http://localhost:8000

# Using Node.js
npx serve
# Then visit http://localhost:3000
```

### Development

No build process required! Just edit the files and refresh your browser.

## Project Structure

```
PeriodicTable/
├── index.html          # Main game page
├── css/
│   └── style.css      # Game styling
├── js/
│   ├── game.js         # Core game logic
│   ├── periodic-table.js # Periodic table data and rendering
│   └── i18n.js         # Internationalization handling
├── lang/
│   ├── en.json         # English translations
│   ├── nl.json         # Dutch translations
│   └── da.json         # Danish translations
└── README.md           # This file
```

## Game Controls

| Action | Keyboard | Mouse/Touch |
|--------|----------|-------------|
| Select element | Arrow keys + Enter | Click/Tap |
| Change language | L | Language selector |
| Start game | S | Start button |
| Next question | N or Space | Next button |
| Show hint | H | Hint button |
| Reset game | R | Reset button |

## Supported Languages

| Code | Language | Element Names Example |
|------|----------|------------------------|
| en | English | Hydrogen, Helium, Lithium |
| nl | Dutch | Waterstof, Helium, Lithium |
| da | Danish | Brint, Helium, Lithium |

## Periodic Table Data

The game uses standard periodic table data with:
- 118 confirmed elements (as of 2024)
- Atomic numbers 1-118
- Standard symbols (H, He, Li, etc.)
- Element groups (Alkali metals, Noble gases, etc.)
- Periods (rows 1-7)
- Blocks (s, p, d, f)

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Opera | ✅ Full |
| Mobile browsers | ✅ Touch support |

## Contributing

Contributions are welcome! Please see [AGENTS.md](AGENTS.md) for development guidelines.

### Adding a New Language

1. Create a new JSON file in the `lang/` directory (e.g., `fr.json`)
2. Copy the structure from `en.json`
3. Translate all strings
4. Add the language to the language selector in `index.html`

### Adding a New Game Mode

1. Add the mode definition in `js/game.js`
2. Create the necessary UI elements in `index.html`
3. Add translations for the new mode in all language files
4. Test across all supported languages

## License

This project is open source and available for educational use.

## Acknowledgments

- Element data based on IUPAC standard periodic table
- Inspired by chemistry education tools worldwide
- Special thanks to teachers and students who use this to learn chemistry

---

**Happy Learning!** 🧪✨
