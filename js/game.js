// ===== Game Logic =====

class PeriodicTableGame {
    constructor() {
        this.table = null;
        this.i18n = window.I18n || new I18n();
        this.score = 0;
        this.totalQuestions = 10;
        this.currentQuestion = 0;
        this.currentElement = null;
        this.currentMode = 'find-by-name';
        this.currentLevel = 'all';
        this.gameActive = false;
        this.timer = null;
        this.timeRemaining = 60;
        this.usedElements = new Set();
        this.gameStartTime = null;
        this.hintsUsed = 0;
        
        // Define level boundaries (atomic numbers)
        this.levels = {
            'neon': 10,      // Up to Neon (10)
            'argon': 18,     // Up to Argon (18)
            'krypton': 36,   // Up to Krypton (36)
            'xenon': 54,     // Up to Xenon (54)
            'radon': 86,     // Up to Radon (86)
            'oganesson': 118, // Up to Oganesson (118)
            'all': 118       // All elements
        };
        
        // Initialize
        this._initialize();
    }
    
    _initialize() {
        // Create periodic table
        this.table = new PeriodicTable('periodic-table', this._handleElementClick.bind(this));
        
        // Set up UI references
        this.scoreValueEl = document.getElementById('score-value');
        this.totalQuestionsEl = document.getElementById('total-questions');
        this.modeValueEl = document.getElementById('mode-value');
        this.levelValueEl = document.getElementById('level-value');
        this.levelLabelEl = document.getElementById('level-label');
        this.questionTextEl = document.getElementById('question-text');
        this.elementPromptEl = document.getElementById('element-prompt');
        this.feedbackTextEl = document.getElementById('feedback-text');
        this.timerContainerEl = document.getElementById('timer-container');
        this.timerValueEl = document.getElementById('timer-value');
        this.startBtn = document.getElementById('start-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.hintBtn = document.getElementById('hint-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.gameOverModal = document.getElementById('game-over-modal');
        this.finalScoreEl = document.getElementById('final-score');
        this.finalTotalEl = document.getElementById('final-total');
        this.performanceTextEl = document.getElementById('performance-text');
        this.playAgainBtn = document.getElementById('play-again-btn');
        
        // Set up event listeners
        this._setupEventListeners();
        
        // Update mode and level displays
        this._updateModeDisplay();
        this._updateLevelDisplay();
        
        // Hide timer initially
        if (this.timerContainerEl) {
            this.timerContainerEl.style.display = 'none';
        }
    }
    
    _setupEventListeners() {
        // Start button
        if (this.startBtn) {
            this.startBtn.addEventListener('click', () => this.startGame());
        }
        
        // Next button
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        // Hint button
        if (this.hintBtn) {
            this.hintBtn.addEventListener('click', () => this.showHint());
        }
        
        // Reset button
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetGame());
        }
        
        // Play again button
        if (this.playAgainBtn) {
            this.playAgainBtn.addEventListener('click', () => this.resetGame());
        }
        
        // Mode selection
        const modeInputs = document.querySelectorAll('input[name="game-mode"]');
        modeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.currentMode = e.target.value;
                this._updateModeDisplay();
            });
        });
        
        // Level selection
        const levelInputs = document.querySelectorAll('input[name="game-level"]');
        levelInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.currentLevel = e.target.value;
                this._updateLevelDisplay();
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ignore if typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch (e.key) {
                case 's':
                case 'S':
                    if (!this.gameActive) {
                        this.startGame();
                    }
                    break;
                case 'n':
                case 'N':
                case ' ':
                    if (this.gameActive && !e.repeat) {
                        this.nextQuestion();
                        e.preventDefault();
                    }
                    break;
                case 'h':
                case 'H':
                    if (this.gameActive && !e.repeat) {
                        this.showHint();
                        e.preventDefault();
                    }
                    break;
                case 'r':
                case 'R':
                    this.resetGame();
                    break;
                case 'Escape':
                    if (this.gameActive) {
                        this.resetGame();
                    }
                    break;
            }
        });
        
        // Close element info on click outside
        document.addEventListener('click', (e) => {
            const infoPanel = document.getElementById('element-info');
            const closeBtn = document.getElementById('close-info-btn');
            
            if (infoPanel && infoPanel.style.display === 'block') {
                if (!infoPanel.contains(e.target) && !closeBtn.contains(e.target)) {
                    this.table.hideElementInfo();
                }
            }
        });
        
        // Close button for element info
        const closeInfoBtn = document.getElementById('close-info-btn');
        if (closeInfoBtn) {
            closeInfoBtn.addEventListener('click', () => {
                this.table.hideElementInfo();
            });
        }
        
        // Language change event
        window.addEventListener('languageChanged', (e) => {
            this._updateModeDisplay();
            if (this.currentElement) {
                // Re-render the question with new language
                this._askQuestion();
            }
        });
    }
    
    _updateModeDisplay() {
        if (this.modeValueEl) {
            const modeNames = {
                'find-by-name': this.i18n.translate('mode.findByName', 'Find by Name'),
                'find-by-symbol': this.i18n.translate('mode.findBySymbol', 'Find by Symbol'),
                'find-by-group': this.i18n.translate('mode.findByGroup', 'Find by Group'),
                'find-by-period': this.i18n.translate('mode.findByPeriod', 'Find by Period'),
                'study': this.i18n.translate('mode.study', 'Study Mode')
            };
            this.modeValueEl.textContent = modeNames[this.currentMode] || this.currentMode;
        }
    }
    
    _updateLevelDisplay() {
        if (this.levelValueEl) {
            const levelNames = {
                'neon': this.i18n.translate('level.neon', 'Up to Neon (1-10)'),
                'argon': this.i18n.translate('level.argon', 'Up to Argon (1-18)'),
                'krypton': this.i18n.translate('level.krypton', 'Up to Krypton (1-36)'),
                'xenon': this.i18n.translate('level.xenon', 'Up to Xenon (1-54)'),
                'radon': this.i18n.translate('level.radon', 'Up to Radon (1-86)'),
                'oganesson': this.i18n.translate('level.oganesson', 'Up to Oganesson (1-118)'),
                'all': this.i18n.translate('level.all', 'All Elements (1-118)')
            };
            this.levelValueEl.textContent = levelNames[this.currentLevel] || this.currentLevel;
        }
    }
    
    startGame() {
        if (this.gameActive) return;
        
        this.gameActive = true;
        this.score = 0;
        this.currentQuestion = 0;
        this.usedElements = new Set();
        this.hintsUsed = 0;
        this.gameStartTime = Date.now();
        
        // Get level max atomic number
        this.maxAtomicNumber = this.levels[this.currentLevel] || 118;
        
        // Update UI
        this._updateScoreDisplay();
        this._clearFeedback();
        
        // Enable/disable buttons
        if (this.startBtn) this.startBtn.disabled = true;
        if (this.nextBtn) this.nextBtn.disabled = false;
        if (this.hintBtn) this.hintBtn.disabled = false;
        
        // Hide all elements initially
        this.table.hideAllElements();
        this.table.clearAllHighlights();
        this.table.hideElementInfo();
        
        // Show timer for timed modes
        if (this._isTimedMode()) {
            this.timeRemaining = 60;
            this._startTimer();
            if (this.timerContainerEl) {
                this.timerContainerEl.style.display = 'flex';
            }
        } else {
            if (this.timerContainerEl) {
                this.timerContainerEl.style.display = 'none';
            }
        }
        
        // Ask first question
        this._askQuestion();
    }
    
    _isTimedMode() {
        return this.currentMode !== 'study';
    }
    
    _startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this._updateTimerDisplay();
            
            if (this.timeRemaining <= 0) {
                this._endGame();
            }
        }, 1000);
    }
    
    _stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    _updateTimerDisplay() {
        if (this.timerValueEl) {
            this.timerValueEl.textContent = this.timeRemaining;
        }
    }
    
    _updateScoreDisplay() {
        if (this.scoreValueEl) {
            this.scoreValueEl.textContent = this.score;
        }
        if (this.totalQuestionsEl) {
            this.totalQuestionsEl.textContent = this.totalQuestions;
        }
    }
    
    _clearFeedback() {
        if (this.feedbackTextEl) {
            this.feedbackTextEl.textContent = '';
            this.feedbackTextEl.className = 'feedback';
        }
    }
    
    _askQuestion() {
        this._clearFeedback();
        this.table.clearAllHighlights();
        
        // Check if game should end
        if (this.currentQuestion >= this.totalQuestions) {
            this._endGame();
            return;
        }
        
        // Select a new element based on game mode
        let element = null;
        
        switch (this.currentMode) {
            case 'find-by-name':
                element = this._getRandomElement();
                break;
            case 'find-by-symbol':
                element = this._getRandomElement();
                break;
            case 'find-by-group':
                // Random group from 1-18
                const group = Math.floor(Math.random() * 18) + 1;
                element = this.table.getRandomElementFromGroup(group);
                if (!element) {
                    // Fallback to random element
                    element = this._getRandomElement();
                }
                break;
            case 'find-by-period':
                // Random period from 1-7
                const period = Math.floor(Math.random() * 7) + 1;
                element = this.table.getRandomElementFromPeriod(period);
                if (!element) {
                    // Fallback to random element
                    element = this._getRandomElement();
                }
                break;
            case 'study':
                // In study mode, show all symbols and let user explore
                this.table.showAllSymbols();
                if (this.questionTextEl) {
                    this.questionTextEl.textContent = this.i18n.translate('mode.studyInstructions', 'Click on any element to learn about it. Use the language selector to change language.');
                }
                if (this.elementPromptEl) {
                    this.elementPromptEl.textContent = '';
                }
                return;
            default:
                element = this._getRandomElement();
        }
        
        if (!element) {
            this._endGame();
            return;
        }
        
        this.currentElement = element;
        
        // Update question display
        if (this.questionTextEl && this.elementPromptEl) {
            switch (this.currentMode) {
                case 'find-by-name':
                    this.questionTextEl.textContent = this.i18n.translate('question.find', 'Find the element:') + ' ';
                    this.elementPromptEl.textContent = this.i18n.getElementName(element.symbol) || element.name;
                    break;
                case 'find-by-symbol':
                    this.questionTextEl.textContent = this.i18n.translate('question.findSymbol', 'Find the element with symbol:') + ' ';
                    this.elementPromptEl.textContent = element.symbol;
                    break;
                case 'find-by-group':
                    const groupName = this.i18n.translate(`group.${element.group}`) || this._getGroupName(element.group);
                    this.questionTextEl.textContent = this.i18n.translate('question.findGroup', 'Find an element in group:') + ' ';
                    this.elementPromptEl.textContent = `${element.group} (${groupName})`;
                    break;
                case 'find-by-period':
                    this.questionTextEl.textContent = this.i18n.translate('question.findPeriod', 'Find an element in period:') + ' ';
                    this.elementPromptEl.textContent = element.period.toString();
                    break;
            }
        }
    }
    
    _getRandomElement() {
        // Try to get an element not used yet, filtered by level
        const allElements = window.PERIODIC_TABLE_DATA || [];
        const levelElements = allElements.filter(el => el.number <= this.maxAtomicNumber);
        const unusedElements = levelElements.filter(el => !this.usedElements.has(el.symbol));
        
        if (unusedElements.length > 0) {
            const randomIndex = Math.floor(Math.random() * unusedElements.length);
            const element = unusedElements[randomIndex];
            this.usedElements.add(element.symbol);
            return element;
        }
        
        // If all elements used for this level, reset and pick random from level
        this.usedElements.clear();
        const randomIndex = Math.floor(Math.random() * levelElements.length);
        const element = levelElements[randomIndex];
        this.usedElements.add(element.symbol);
        return element;
    }
    
    _getGroupName(groupNumber) {
        const groupNames = {
            1: 'Alkali metals',
            2: 'Alkaline earth metals',
            13: 'Boron group',
            14: 'Carbon group',
            15: 'Nitrogen group',
            16: 'Chalcogens',
            17: 'Halogens',
            18: 'Noble gases'
        };
        return groupNames[groupNumber] || `Group ${groupNumber}`;
    }
    
    _handleElementClick(symbol, element) {
        if (!this.gameActive || !this.currentElement) return;
        
        // In study mode, just show info
        if (this.currentMode === 'study') {
            this.table.selectElement(symbol);
            return;
        }
        
        // Check answer
        let isCorrect = false;
        
        switch (this.currentMode) {
            case 'find-by-name':
                // Check if this is the element we're looking for
                isCorrect = symbol === this.currentElement.symbol;
                break;
            case 'find-by-symbol':
                isCorrect = symbol === this.currentElement.symbol;
                break;
            case 'find-by-group':
                // Check if element is in the same group
                isCorrect = element && element.group === this.currentElement.group;
                break;
            case 'find-by-period':
                // Check if element is in the same period
                isCorrect = element && element.period === this.currentElement.period;
                break;
        }
        
        if (isCorrect) {
            this._handleCorrectAnswer(symbol);
        } else {
            this._handleIncorrectAnswer(symbol);
        }
    }
    
    _handleCorrectAnswer(symbol) {
        this.score++;
        this._updateScoreDisplay();
        
        // Highlight correct element
        this.table.highlightElement(symbol, 'correct');
        
        // Show feedback
        if (this.feedbackTextEl) {
            this.feedbackTextEl.textContent = this.i18n.translate('feedback.correct', 'Correct!') + ' ' + 
                (this.i18n.getElementName(symbol) || symbol);
            this.feedbackTextEl.className = 'feedback correct';
        }
        
        // Reveal the element
        this.table.revealElement(symbol, true);
        
        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestion++;
            this._askQuestion();
        }, 1000);
    }
    
    _handleIncorrectAnswer(symbol) {
        // Highlight incorrect selection
        this.table.highlightElement(symbol, 'incorrect');
        
        // Show feedback
        if (this.feedbackTextEl) {
            const correctName = this.i18n.getElementName(this.currentElement.symbol) || this.currentElement.name;
            const correctSymbol = this.currentElement.symbol;
            
            let message = '';
            switch (this.currentMode) {
                case 'find-by-name':
                case 'find-by-symbol':
                    message = this.i18n.translate('feedback.incorrect', 'Incorrect. The correct answer is:') + ' ' + correctName + ' (' + correctSymbol + ')';
                    break;
                case 'find-by-group':
                    message = this.i18n.translate('feedback.incorrectGroup', 'Incorrect. That element is in group:') + ' ' + (this._getGroupName(this.currentElement.group));
                    break;
                case 'find-by-period':
                    message = this.i18n.translate('feedback.incorrectPeriod', 'Incorrect. That element is in period:') + ' ' + this.currentElement.period;
                    break;
            }
            
            this.feedbackTextEl.textContent = message;
            this.feedbackTextEl.className = 'feedback incorrect';
        }
        
        // Reveal the correct element
        this.table.revealElement(this.currentElement.symbol, true);
        this.table.highlightElement(this.currentElement.symbol, 'correct');
        
        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestion++;
            this._askQuestion();
        }, 1500);
    }
    
    showHint() {
        if (!this.gameActive || !this.currentElement || this.hintsUsed >= 3) return;
        
        this.hintsUsed++;
        
        // Highlight the correct element briefly
        this.table.highlightElement(this.currentElement.symbol, 'hint');
        
        if (this.feedbackTextEl) {
            this.feedbackTextEl.textContent = this.i18n.translate('feedback.hint', 'Hint: Element is highlighted!') + ' ' +
                (this.i18n.translate('feedback.hintsRemaining', 'Hints remaining:') + ' ' + (3 - this.hintsUsed));
            this.feedbackTextEl.className = 'feedback hint';
        }
        
        // Remove highlight after delay
        setTimeout(() => {
            this.table.clearHighlight(this.currentElement.symbol, 'hint');
        }, 2000);
    }
    
    nextQuestion() {
        if (!this.gameActive) return;
        
        this._clearFeedback();
        this.table.clearAllHighlights();
        this.table.hideElementInfo();
        
        this.currentQuestion++;
        this._askQuestion();
    }
    
    _endGame() {
        this.gameActive = false;
        this._stopTimer();
        
        // Calculate performance
        const endTime = Date.now();
        const duration = (endTime - this.gameStartTime) / 1000; // in seconds
        const scorePercentage = Math.round((this.score / this.totalQuestions) * 100);
        
        let performanceMessage = '';
        if (scorePercentage >= 90) {
            performanceMessage = this.i18n.translate('performance.excellent', 'Excellent work! You are a periodic table master!');
        } else if (scorePercentage >= 70) {
            performanceMessage = this.i18n.translate('performance.good', 'Good job! Keep practicing to improve.');
        } else if (scorePercentage >= 50) {
            performanceMessage = this.i18n.translate('performance.ok', 'Not bad! Review the elements you missed.');
        } else {
            performanceMessage = this.i18n.translate('performance.practice', 'Keep practicing! You will get better with time.');
        }
        
        // Show game over modal
        if (this.finalScoreEl) {
            this.finalScoreEl.textContent = this.score;
        }
        if (this.finalTotalEl) {
            this.finalTotalEl.textContent = this.totalQuestions;
        }
        if (this.performanceTextEl) {
            this.performanceTextEl.textContent = performanceMessage;
        }
        
        if (this.gameOverModal) {
            this.gameOverModal.style.display = 'block';
            // Focus on play again button for accessibility
            if (this.playAgainBtn) {
                this.playAgainBtn.focus();
            }
        }
        
        // Reset buttons
        if (this.startBtn) this.startBtn.disabled = false;
        if (this.nextBtn) this.nextBtn.disabled = true;
        if (this.hintBtn) this.hintBtn.disabled = true;
    }
    
    resetGame() {
        this.gameActive = false;
        this._stopTimer();
        this._clearFeedback();
        
        // Hide modals
        if (this.gameOverModal) {
            this.gameOverModal.style.display = 'none';
        }
        
        // Reset display
        this.score = 0;
        this.currentQuestion = 0;
        this.currentElement = null;
        this.usedElements.clear();
        this.hintsUsed = 0;
        
        this._updateScoreDisplay();
        this._updateTimerDisplay();
        
        // Reset buttons
        if (this.startBtn) this.startBtn.disabled = false;
        if (this.nextBtn) this.nextBtn.disabled = true;
        if (this.hintBtn) this.hintBtn.disabled = true;
        
        // Clear table
        this.table.hideAllElements();
        this.table.clearAllHighlights();
        this.table.hideElementInfo();
        
        // Reset question display
        if (this.questionTextEl) {
            this.questionTextEl.textContent = '';
        }
        if (this.elementPromptEl) {
            this.elementPromptEl.textContent = '';
        }
        
        // Hide timer
        if (this.timerContainerEl) {
            this.timerContainerEl.style.display = 'none';
        }
    }
    
    // Public method to set mode
    setMode(mode) {
        this.currentMode = mode;
        this._updateModeDisplay();
    }
    
    // Public method to set total questions
    setTotalQuestions(count) {
        this.totalQuestions = Math.max(1, count);
        this._updateScoreDisplay();
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for i18n to initialize
    const checkI18n = setInterval(() => {
        if (window.I18n) {
            clearInterval(checkI18n);
            window.game = new PeriodicTableGame();
        }
    }, 100);
});
