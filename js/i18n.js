// ===== Internationalization (i18n) System =====

class I18n {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.elementNames = {};
        this._loadTranslations();
    }
    
    async _loadTranslations() {
        // Try to load translations for all available languages
        const languages = ['en', 'nl', 'da'];
        
        for (const lang of languages) {
            try {
                const response = await fetch(`lang/${lang}.json`);
                if (response.ok) {
                    const data = await response.json();
                    this.translations[lang] = data.translations || {};
                    this.elementNames[lang] = data.elementNames || {};
                }
            } catch (error) {
                console.warn(`Failed to load translations for ${lang}:`, error);
                // Fall back to empty object
                this.translations[lang] = {};
                this.elementNames[lang] = {};
            }
        }
        
        // Set default language
        this.setLanguage(this.currentLanguage);
    }
    
    setLanguage(languageCode) {
        // Validate language code
        if (!this.translations[languageCode]) {
            console.warn(`Language ${languageCode} not available, falling back to English`);
            languageCode = 'en';
        }
        
        this.currentLanguage = languageCode;
        
        // Update document language
        document.documentElement.lang = languageCode;
        
        // Update all translatable elements
        this.updateAllTranslations();
        
        // Save preference
        localStorage.setItem('periodicTableLanguage', languageCode);
        
        // Dispatch event for other components to react
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: languageCode }
        }));
    }
    
    getLanguage() {
        return this.currentLanguage;
    }
    
    translate(key, fallback = key) {
        const lang = this.translations[this.currentLanguage];
        if (lang && lang[key]) {
            return lang[key];
        }
        
        // Try English as fallback
        if (this.translations.en && this.translations.en[key]) {
            return this.translations.en[key];
        }
        
        return fallback;
    }
    
    getElementName(symbol) {
        const elementNames = this.elementNames[this.currentLanguage];
        if (elementNames && elementNames[symbol]) {
            return elementNames[symbol];
        }
        
        // Try English as fallback
        if (this.elementNames.en && this.elementNames.en[symbol]) {
            return this.elementNames.en[symbol];
        }
        
        // Return symbol if no name found
        return symbol;
    }
    
    getElementSymbol(name) {
        // Reverse lookup: find symbol by name
        const elementNames = this.elementNames[this.currentLanguage];
        
        for (const [symbol, elementName] of Object.entries(elementNames)) {
            if (elementName.toLowerCase() === name.toLowerCase()) {
                return symbol;
            }
        }
        
        // Try English
        if (this.elementNames.en) {
            for (const [symbol, elementName] of Object.entries(this.elementNames.en)) {
                if (elementName.toLowerCase() === name.toLowerCase()) {
                    return symbol;
                }
            }
        }
        
        return null;
    }
    
    updateAllTranslations() {
        // Update all elements with data-i18n attributes
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.translate(key, el.textContent);
            el.textContent = translation;
        });
        
        // Update specific known elements
        this._updateKnownElements();
        
        // Update level display if it exists
        const levelValue = document.getElementById('level-value');
        if (levelValue) {
            levelValue.textContent = this.translate('level.all', 'All Elements (1-118)');
        }
        const levelLabel = document.getElementById('level-label');
        if (levelLabel) {
            levelLabel.textContent = this.translate('level.label', 'Level:') + ' ';
        }
    }
    
    _updateKnownElements() {
        // Game title
        const titleEl = document.getElementById('game-title');
        if (titleEl) {
            titleEl.textContent = this.translate('game.title', 'Periodic Table Game');
        }
        
        // Language selector label
        const langLabel = document.getElementById('language-label');
        if (langLabel) {
            langLabel.textContent = this.translate('language.label', 'Language:') + ' ';
        }
        
        // Score display
        const scoreLabel = document.getElementById('score-label');
        if (scoreLabel) {
            scoreLabel.textContent = this.translate('game.score', 'Score:') + ' ';
        }
        
        // Mode display
        const modeLabel = document.getElementById('mode-label');
        if (modeLabel) {
            modeLabel.textContent = this.translate('game.mode', 'Mode:') + ' ';
        }
        
        // Timer display
        const timerLabel = document.getElementById('timer-label');
        if (timerLabel) {
            timerLabel.textContent = this.translate('game.timer', 'Time:') + ' ';
        }
        
        // Button texts
        const startBtn = document.getElementById('start-btn-text');
        if (startBtn) {
            startBtn.textContent = this.translate('button.start', 'Start Game');
        }
        
        const nextBtn = document.getElementById('next-btn-text');
        if (nextBtn) {
            nextBtn.textContent = this.translate('button.next', 'Next');
        }
        
        const hintBtn = document.getElementById('hint-btn-text');
        if (hintBtn) {
            hintBtn.textContent = this.translate('button.hint', 'Hint');
        }
        
        const resetBtn = document.getElementById('reset-btn-text');
        if (resetBtn) {
            resetBtn.textContent = this.translate('button.reset', 'Reset');
        }
        
        // Mode selection title
        const modeTitle = document.getElementById('select-mode-title');
        if (modeTitle) {
            modeTitle.textContent = this.translate('mode.select', 'Select Game Mode');
        }
        
        // Mode option texts
        const modeName = document.getElementById('mode-name-text');
        if (modeName) {
            modeName.textContent = this.translate('mode.findByName', 'Find by Name');
        }
        
        const modeSymbol = document.getElementById('mode-symbol-text');
        if (modeSymbol) {
            modeSymbol.textContent = this.translate('mode.findBySymbol', 'Find by Symbol');
        }
        
        const modeGroup = document.getElementById('mode-group-text');
        if (modeGroup) {
            modeGroup.textContent = this.translate('mode.findByGroup', 'Find by Group');
        }
        
        const modePeriod = document.getElementById('mode-period-text');
        if (modePeriod) {
            modePeriod.textContent = this.translate('mode.findByPeriod', 'Find by Period');
        }
        
        const modeStudy = document.getElementById('mode-study-text');
        if (modeStudy) {
            modeStudy.textContent = this.translate('mode.study', 'Study Mode');
        }
        
        // Game over modal
        const gameOverTitle = document.getElementById('game-over-title');
        if (gameOverTitle) {
            gameOverTitle.textContent = this.translate('gameOver.title', 'Game Over');
        }
        
        const finalScoreText = document.getElementById('final-score-text');
        if (finalScoreText) {
            // Keep the span structure, just update the text parts
            const text = this.translate('gameOver.score', 'Your score:');
            finalScoreText.innerHTML = `${text} <span id="final-score">0</span> ${this.translate('gameOver.of', 'out of')} <span id="final-total">10</span>`;
        }
        
        const playAgainBtn = document.getElementById('play-again-text');
        if (playAgainBtn) {
            playAgainBtn.textContent = this.translate('button.playAgain', 'Play Again');
        }
        
        // Element info panel labels
        const symbolLabel = document.getElementById('element-symbol-label');
        if (symbolLabel) {
            symbolLabel.textContent = this.translate('element.symbol', 'Symbol:') + ' ';
        }
        
        const numberLabel = document.getElementById('element-number-label');
        if (numberLabel) {
            numberLabel.textContent = this.translate('element.atomicNumber', 'Atomic Number:') + ' ';
        }
        
        const groupLabel = document.getElementById('element-group-label');
        if (groupLabel) {
            groupLabel.textContent = this.translate('element.group', 'Group:') + ' ';
        }
        
        const periodLabel = document.getElementById('element-period-label');
        if (periodLabel) {
            periodLabel.textContent = this.translate('element.period', 'Period:') + ' ';
        }
        
        const blockLabel = document.getElementById('element-block-label');
        if (blockLabel) {
            blockLabel.textContent = this.translate('element.block', 'Block:') + ' ';
        }
        
        const categoryLabel = document.getElementById('element-category-label');
        if (categoryLabel) {
            categoryLabel.textContent = this.translate('element.category', 'Category:') + ' ';
        }
        
        // Footer
        const footerText = document.getElementById('footer-text');
        if (footerText) {
            footerText.textContent = this.translate('footer.description', 
                'An educational game for learning the periodic table. Support for English, Dutch, and Danish.'
            );
        }
        
        const keyboardHint = document.getElementById('keyboard-hint');
        if (keyboardHint) {
            keyboardHint.textContent = this.translate('footer.keyboardHint',
                "Press 'L' to change language, 'S' to start, 'N' or Space for next"
            );
        }
    }
    
    // Initialize language from localStorage or browser settings
    async initialize() {
        // Check localStorage for saved preference
        const savedLang = localStorage.getItem('periodicTableLanguage');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
        } else {
            // Try to detect browser language
            const browserLang = navigator.language || navigator.userLanguage || 'en';
            const langCode = browserLang.split('-')[0].toLowerCase();
            
            // Check if we support this language
            if (this.translations[langCode]) {
                this.currentLanguage = langCode;
            } else if (langCode === 'nl' || langCode === 'da') {
                this.currentLanguage = langCode;
            }
        }
        
        // Set the language (this will update all translations)
        this.setLanguage(this.currentLanguage);
        
        // Update the language selector
        const langSelector = document.getElementById('language');
        if (langSelector) {
            langSelector.value = this.currentLanguage;
        }
    }
}

// Create global instance
window.I18n = new I18n();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await window.I18n.initialize();
    
    // Set up language selector
    const langSelector = document.getElementById('language');
    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            window.I18n.setLanguage(e.target.value);
        });
    }
    
    // Set up keyboard shortcut for language change
    document.addEventListener('keydown', (e) => {
        if (e.key === 'l' || e.key === 'L') {
            // Cycle through languages
            const languages = ['en', 'nl', 'da'];
            const currentIndex = languages.indexOf(window.I18n.getLanguage());
            const nextIndex = (currentIndex + 1) % languages.length;
            window.I18n.setLanguage(languages[nextIndex]);
            
            // Update selector
            const langSelector = document.getElementById('language');
            if (langSelector) {
                langSelector.value = languages[nextIndex];
            }
        }
    });
});
