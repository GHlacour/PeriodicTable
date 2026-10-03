// ===== Game Logic =====

// Debug helper - will be available if debug.js is loaded
const DEBUG = window.debugGame || {
    log: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
    trace: () => {},
    recordState: () => {},
    validateGameState: () => true,
    assert: () => {},
    updateDebugPanel: () => {}
};

class PeriodicTableGame {
    constructor() {
        DEBUG.info('PeriodicTableGame constructor called', null, 'game');
        
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
        this.maxAtomicNumber = 118;
        
        DEBUG.recordState('game.constructor', {
            score: this.score,
            totalQuestions: this.totalQuestions,
            mode: this.currentMode,
            level: this.currentLevel
        });
        
        // Validate initialization
        DEBUG.assert(this.i18n, 'I18n not initialized');
        DEBUG.assert(this.totalQuestions > 0, 'totalQuestions must be positive');
        
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
        DEBUG.info('Initializing game...', null, 'game');
        
        try {
            // Create periodic table
            DEBUG.trace('create.periodicTable');
            this.table = new PeriodicTable('periodic-table', this._handleElementClick.bind(this));
            DEBUG.assert(this.table, 'PeriodicTable not created');
            
            // Set up UI references
            DEBUG.trace('setup.uiReferences');
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
            
            // Validate critical UI elements
            DEBUG.assert(this.scoreValueEl, 'scoreValueEl not found');
            DEBUG.assert(this.questionTextEl, 'questionTextEl not found');
            DEBUG.assert(this.startBtn, 'startBtn not found');
            
            // Set up event listeners
            DEBUG.trace('setup.eventListeners');
            this._setupEventListeners();
            
            // Update mode and level displays
            DEBUG.trace('update.displays');
            this._updateModeDisplay();
            this._updateLevelDisplay();
            
            // Hide timer initially
            if (this.timerContainerEl) {
                this.timerContainerEl.style.display = 'none';
            }
            
            // Initialize level and mode from UI
            DEBUG.trace('initialize.fromUI');
            this._initializeFromUI();
            
            DEBUG.recordState('game.initialized', {
                mode: this.currentMode,
                level: this.currentLevel,
                maxAtomicNumber: this.maxAtomicNumber
            });
            
        } catch (error) {
            DEBUG.error('Initialization error', error, 'game');
            throw error;
        }
    }
    
    _initializeFromUI() {
        DEBUG.trace('initializeFromUI');
        
        try {
            const checkedLevelInput = document.querySelector('input[name="game-level"]:checked');
            if (checkedLevelInput) {
                this.currentLevel = checkedLevelInput.value;
                this.maxAtomicNumber = this.levels[this.currentLevel] || 118;
                DEBUG.info(`Level set to: ${this.currentLevel} (max: ${this.maxAtomicNumber})`, null, 'game');
            } else {
                DEBUG.warn('No level input checked, using default (all)', null, 'game');
                this.maxAtomicNumber = 118;
            }
            
            const checkedModeInput = document.querySelector('input[name="game-mode"]:checked');
            if (checkedModeInput) {
                this.currentMode = checkedModeInput.value;
                DEBUG.info(`Mode set to: ${this.currentMode}`, null, 'game');
            } else {
                DEBUG.warn('No mode input checked, using default (find-by-name)', null, 'game');
            }
            
            // Validate settings
            DEBUG.assert(this.maxAtomicNumber >= 1 && this.maxAtomicNumber <= 118, 
                `Invalid maxAtomicNumber: ${this.maxAtomicNumber}`);
            
        } catch (error) {
            DEBUG.error('Error in _initializeFromUI', error, 'game');
        }
    }
    
    _setupEventListeners() {
        DEBUG.trace('setupEventListeners');
        
        try {
            // Start button
            if (this.startBtn) {
                this.startBtn.addEventListener('click', () => {
                    DEBUG.trace('click.startBtn');
                    this.startGame();
                });
            }
            
            // Next button
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => {
                    DEBUG.trace('click.nextBtn');
                    this.nextQuestion();
                });
            }
            
            // Hint button
            if (this.hintBtn) {
                this.hintBtn.addEventListener('click', () => {
                    DEBUG.trace('click.hintBtn');
                    this.showHint();
                });
            }
            
            // Reset button
            if (this.resetBtn) {
                this.resetBtn.addEventListener('click', () => {
                    DEBUG.trace('click.resetBtn');
                    this.resetGame();
                });
            }
            
            // Play again button
            if (this.playAgainBtn) {
                this.playAgainBtn.addEventListener('click', () => {
                    DEBUG.trace('click.playAgainBtn');
                    this.resetGame();
                    this.startGame();
                });
            }
            
            // Mode selection
            const modeInputs = document.querySelectorAll('input[name="game-mode"]');
            modeInputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    DEBUG.trace('change.modeInput');
                    this.currentMode = e.target.value;
                    this._updateModeDisplay();
                });
            });
            
            // Level selection
            const levelInputs = document.querySelectorAll('input[name="game-level"]');
            levelInputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    DEBUG.trace('change.levelInput');
                    this.currentLevel = e.target.value;
                    this.maxAtomicNumber = this.levels[this.currentLevel] || 118;
                    this._updateLevelDisplay();
                });
            });
            
            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    return;
                }
                
                switch (e.key) {
                    case 's':
                    case 'S':
                        if (!this.gameActive) {
                            DEBUG.trace('keyboard.start');
                            this.startGame();
                        }
                        break;
                    case 'n':
                    case 'N':
                    case ' ':
                        if (this.gameActive && !e.repeat) {
                            DEBUG.trace('keyboard.next');
                            this.nextQuestion();
                            e.preventDefault();
                        }
                        break;
                    case 'h':
                    case 'H':
                        if (this.gameActive && !e.repeat) {
                            DEBUG.trace('keyboard.hint');
                            this.showHint();
                            e.preventDefault();
                        }
                        break;
                    case 'r':
                    case 'R':
                        DEBUG.trace('keyboard.reset');
                        this.resetGame();
                        break;
                    case 'Escape':
                        if (this.gameActive) {
                            DEBUG.trace('keyboard.escape');
                            this.resetGame();
                        }
                        break;
                }
            });
            
            // Language change event
            window.addEventListener('languageChanged', (e) => {
                DEBUG.trace('event.languageChanged');
                this._updateModeDisplay();
                this._updateLevelDisplay();
                if (this.currentElement && this.gameActive) {
                    this._askQuestion();
                }
            });
            
            DEBUG.info('Event listeners set up successfully', null, 'game');
            
        } catch (error) {
            DEBUG.error('Error in _setupEventListeners', error, 'game');
        }
    }
    
    _updateModeDisplay() {
        if (this.modeValueEl) {
            const modeNames = {
                'find-by-name': this.i18n.translate('mode.findByName', 'Find by Name'),
                'find-by-symbol': this.i18n.translate('mode.findBySymbol', 'Find by Symbol'),
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
        DEBUG.info('Starting game...', {
            currentMode: this.currentMode,
            currentLevel: this.currentLevel,
            maxAtomicNumber: this.maxAtomicNumber
        }, 'game');
        
        if (this.gameActive) {
            DEBUG.warn('Game already active, ignoring start request', null, 'game');
            return;
        }
        
        try {
            // Read current level and mode from UI
            this._initializeFromUI();
            
            // Reset game state
            this.gameActive = true;
            this.score = 0;
            this.currentQuestion = 0;
            this.usedElements = new Set();
            this.hintsUsed = 0;
            this.gameStartTime = Date.now();
            
            DEBUG.recordState('game.start', {
                mode: this.currentMode,
                level: this.currentLevel,
                maxAtomicNumber: this.maxAtomicNumber
            });
            
            // Update UI
            this._updateScoreDisplay();
            this._clearFeedback();
            
            // Enable/disable buttons
            if (this.startBtn) this.startBtn.disabled = true;
            if (this.nextBtn) this.nextBtn.disabled = false;
            if (this.hintBtn) this.hintBtn.disabled = false;
            
            // Validate table exists
            DEBUG.assert(this.table, 'Table not initialized');
            
            // Hide all elements initially
            this.table.hideAllElements();
            this.table.clearAllHighlights();
            this.table.hideElementInfo();
            
            // Ensure question area is visible
            if (this.questionTextEl) {
                this.questionTextEl.style.display = 'block';
                this.questionTextEl.style.visibility = 'visible';
                this.questionTextEl.style.opacity = '1';
            }
            
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
            DEBUG.trace('askFirstQuestion');
            this._askQuestion();
            
            DEBUG.info('Game started successfully', {
                mode: this.currentMode,
                level: this.currentLevel
            }, 'game');
            
        } catch (error) {
            DEBUG.error('Error starting game', error, 'game');
            this.gameActive = false;
            throw error;
        }
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
        DEBUG.trace('askQuestion', {
            questionNumber: this.currentQuestion,
            totalQuestions: this.totalQuestions,
            mode: this.currentMode
        });
        
        try {
            this._clearFeedback();
            this.table.clearAllHighlights();
            
            // Check if game should end
            if (this.currentQuestion >= this.totalQuestions) {
                DEBUG.info('All questions answered, ending game', null, 'game');
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
                case 'study':
                    // In study mode, show all symbols and let user explore
                    this.table.showAllSymbols();
                    if (this.questionTextEl) {
                        this.questionTextEl.textContent = this.i18n.translate('mode.studyInstructions', 'Click on any element to learn about it. Use the language selector to change language.');
                    }
                    return;
                default:
                    DEBUG.warn(`Unknown mode: ${this.currentMode}, using random element`, null, 'game');
                    element = this._getRandomElement();
            }
            
            if (!element) {
                DEBUG.error('No element selected, ending game', {
                    mode: this.currentMode,
                    usedElements: Array.from(this.usedElements)
                }, 'game');
                this._endGame();
                return;
            }
            
            // Validate element
            DEBUG.assert(element && element.symbol, 'Invalid element selected');
            DEBUG.assert(element.number <= this.maxAtomicNumber, 
                `Element ${element.symbol} (${element.number}) exceeds max atomic number ${this.maxAtomicNumber}`);
            
            this.currentElement = element;
            DEBUG.recordState('game.question', {
                questionNumber: this.currentQuestion,
                element: {
                    symbol: element.symbol,
                    name: element.name,
                    number: element.number,
                    group: element.group,
                    period: element.period
                }
            });
            
            // Update question display
            if (this.questionTextEl) {
                switch (this.currentMode) {
                    case 'find-by-name':
                        this.questionTextEl.textContent = this.i18n.translate('question.find', 'Find the element: ') + 
                            this.i18n.getElementName(element.symbol);
                        break;
                    case 'find-by-symbol':
                        this.questionTextEl.textContent = this.i18n.translate('question.findSymbol', 'Find the element with symbol: ') + element.symbol;
                        break;
                }
            } else {
                DEBUG.warn('questionTextEl not found', null, 'game');
            }
            
            // Update debug panel
            DEBUG.updateDebugPanel(this);
            
        } catch (error) {
            DEBUG.error('Error in _askQuestion', error, 'game');
            throw error;
        }
    }
    
    _getRandomElement() {
        DEBUG.trace('getRandomElement', {
            maxAtomicNumber: this.maxAtomicNumber,
            usedElementsCount: this.usedElements.size
        });
        
        try {
            // Get elements filtered by level
            const allElements = window.PERIODIC_TABLE_DATA || [];
            
            if (allElements.length === 0) {
                DEBUG.error('PERIODIC_TABLE_DATA is empty or not loaded', null, 'game');
                return null;
            }
            
            const levelElements = allElements.filter(el => el.number <= this.maxAtomicNumber);
            
            if (levelElements.length === 0) {
                DEBUG.error('No elements found for current level', {
                    maxAtomicNumber: this.maxAtomicNumber,
                    allElementsCount: allElements.length
                }, 'game');
                return null;
            }
            
            const unusedElements = levelElements.filter(el => !this.usedElements.has(el.symbol));
            
            let element;
            
            if (unusedElements.length > 0) {
                const randomIndex = Math.floor(Math.random() * unusedElements.length);
                element = unusedElements[randomIndex];
                this.usedElements.add(element.symbol);
                DEBUG.info(`Selected unused element: ${element.symbol} (${element.number})`, null, 'game');
            } else {
                // If all elements used for this level, reset and pick random from level
                DEBUG.info('All elements used, resetting usedElements set', null, 'game');
                this.usedElements.clear();
                const randomIndex = Math.floor(Math.random() * levelElements.length);
                element = levelElements[randomIndex];
                this.usedElements.add(element.symbol);
                DEBUG.info(`Selected element (reset): ${element.symbol} (${element.number})`, null, 'game');
            }
            
            // Validate element
            DEBUG.assert(element, 'No element selected');
            DEBUG.assert(element.symbol, 'Element has no symbol');
            DEBUG.assert(element.number <= this.maxAtomicNumber, 
                `Element ${element.symbol} exceeds max atomic number`);
            
            return element;
            
        } catch (error) {
            DEBUG.error('Error in _getRandomElement', error, 'game');
            return null;
        }
    }
    
    _handleElementClick(symbol, element) {
        DEBUG.trace('handleElementClick', {
            symbol,
            gameActive: this.gameActive,
            currentElement: this.currentElement ? this.currentElement.symbol : null,
            mode: this.currentMode
        });
        
        try {
            if (!this.gameActive) {
                DEBUG.info('Game not active, ignoring click', { symbol }, 'game');
                return;
            }
            
            if (!this.currentElement) {
                DEBUG.warn('No current element set, ignoring click', { symbol }, 'game');
                return;
            }
            
            // Validate symbol
            if (!symbol) {
                DEBUG.warn('No symbol provided in click', null, 'game');
                return;
            }
            
            // In study mode, just show info
            if (this.currentMode === 'study') {
                DEBUG.trace('studyMode.click', { symbol });
                this.table.selectElement(symbol, true);
                return;
            }
            
            // In game modes, don't show info panel - just handle the click
            this.table.hideElementInfo();
            this.table.clearAllHighlights();
            
            // Check answer
            let isCorrect = false;
            
            switch (this.currentMode) {
                case 'find-by-name':
                case 'find-by-symbol':
                    // Both modes check if the clicked symbol matches the expected symbol
                    // The difference is only in the question display, not the answer checking
                    isCorrect = symbol === this.currentElement.symbol;
                    DEBUG.trace('checkAnswer.findByNameOrSymbol', {
                        selected: symbol,
                        expected: this.currentElement.symbol,
                        isCorrect
                    });
                    break;
            }
            
            if (isCorrect) {
                DEBUG.info('Correct answer!', { symbol }, 'game');
                this._handleCorrectAnswer(symbol);
            } else {
                DEBUG.info('Incorrect answer', {
                    selected: symbol,
                    expected: this.currentElement.symbol
                }, 'game');
                this._handleIncorrectAnswer(symbol);
            }
            
        } catch (error) {
            DEBUG.error('Error in _handleElementClick', error, 'game');
        }
    }
    
    _handleCorrectAnswer(symbol) {
        DEBUG.trace('handleCorrectAnswer', { symbol, currentScore: this.score });
        
        try {
            // Only increment if score is less than total questions
            if (this.score < this.totalQuestions) {
                this.score++;
                DEBUG.info(`Score incremented to: ${this.score}`, null, 'game');
                this._updateScoreDisplay();
            } else {
                DEBUG.warn(`Score not incremented - already at max (${this.score}/${this.totalQuestions})`, null, 'game');
            }
            
            // Validate symbol
            DEBUG.assert(symbol, 'No symbol provided');
            
            // Highlight correct element
            this.table.highlightElement(symbol, 'correct');
            
            // Show feedback
            if (this.feedbackTextEl) {
                const elementName = this.i18n.getElementName(symbol) || symbol;
                this.feedbackTextEl.textContent = this.i18n.translate('feedback.correct', 'Correct!') + ' ' + elementName;
                this.feedbackTextEl.className = 'feedback correct';
                DEBUG.trace('showFeedback.correct', { message: this.feedbackTextEl.textContent });
            } else {
                DEBUG.warn('feedbackTextEl not found', null, 'game');
            }
            
            // Reveal the element
            this.table.revealElement(symbol, true);
            
            // Move to next question after delay
            DEBUG.trace('scheduleNextQuestion', { delay: 1000 });
            setTimeout(() => {
                this.currentQuestion++;
                DEBUG.recordState('game.correctAnswer', {
                    score: this.score,
                    question: this.currentQuestion
                });
                this._askQuestion();
            }, 1000);
            
        } catch (error) {
            DEBUG.error('Error in _handleCorrectAnswer', error, 'game');
        }
    }
    
    _handleIncorrectAnswer(symbol) {
        DEBUG.trace('handleIncorrectAnswer', {
            selected: symbol,
            expected: this.currentElement.symbol
        });
        
        try {
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
                }
                
                this.feedbackTextEl.textContent = message;
                this.feedbackTextEl.className = 'feedback incorrect';
                DEBUG.trace('showFeedback.incorrect', { message });
            } else {
                DEBUG.warn('feedbackTextEl not found', null, 'game');
            }
            
            // Validate currentElement
            DEBUG.assert(this.currentElement && this.currentElement.symbol, 
                'No current element to reveal');
            
            // Reveal the correct element
            this.table.revealElement(this.currentElement.symbol, true);
            this.table.highlightElement(this.currentElement.symbol, 'correct');
            
            // Move to next question after delay
            DEBUG.trace('scheduleNextQuestion', { delay: 1500 });
            setTimeout(() => {
                this.currentQuestion++;
                DEBUG.recordState('game.incorrectAnswer', {
                    score: this.score,
                    question: this.currentQuestion,
                    selected: symbol,
                    expected: this.currentElement.symbol
                });
                this._askQuestion();
            }, 1500);
            
        } catch (error) {
            DEBUG.error('Error in _handleIncorrectAnswer', error, 'game');
        }
    }
    
    showHint() {
        DEBUG.trace('showHint', {
            gameActive: this.gameActive,
            hasCurrentElement: !!this.currentElement,
            hintsUsed: this.hintsUsed
        });
        
        try {
            if (!this.gameActive) {
                DEBUG.info('Cannot show hint - game not active', null, 'game');
                return;
            }
            
            if (!this.currentElement) {
                DEBUG.warn('Cannot show hint - no current element', null, 'game');
                return;
            }
            
            if (this.hintsUsed >= 3) {
                DEBUG.info('Maximum hints used (3)', null, 'game');
                return;
            }
            
            this.hintsUsed++;
            DEBUG.info(`Hint used (${this.hintsUsed}/3)`, null, 'game');
            
            // Validate symbol
            DEBUG.assert(this.currentElement.symbol, 'No symbol to highlight');
            
            // Highlight the correct element briefly
            this.table.highlightElement(this.currentElement.symbol, 'hint');
            
            if (this.feedbackTextEl) {
                this.feedbackTextEl.textContent = this.i18n.translate('feedback.hint', 'Hint: Element is highlighted!') + ' ' +
                    (this.i18n.translate('feedback.hintsRemaining', 'Hints remaining:') + ' ' + (3 - this.hintsUsed));
                this.feedbackTextEl.className = 'feedback hint';
                DEBUG.trace('showFeedback.hint', { message: this.feedbackTextEl.textContent });
            }
            
            // Remove highlight after delay
            setTimeout(() => {
                this.table.clearHighlight(this.currentElement.symbol, 'hint');
                DEBUG.trace('clearHintHighlight');
            }, 2000);
            
        } catch (error) {
            DEBUG.error('Error in showHint', error, 'game');
        }
    }
    
    nextQuestion() {
        DEBUG.trace('nextQuestion', {
            gameActive: this.gameActive,
            currentQuestion: this.currentQuestion
        });
        
        try {
            if (!this.gameActive) {
                DEBUG.info('Cannot go to next question - game not active', null, 'game');
                return;
            }
            
            this._clearFeedback();
            this.table.clearAllHighlights();
            this.table.hideElementInfo();
            
            this.currentQuestion++;
            DEBUG.info(`Moving to question ${this.currentQuestion}`, null, 'game');
            
            this._askQuestion();
            
        } catch (error) {
            DEBUG.error('Error in nextQuestion', error, 'game');
        }
    }
    
    _endGame() {
        DEBUG.info('Ending game...', {
            score: this.score,
            totalQuestions: this.totalQuestions,
            duration: this.gameStartTime ? (Date.now() - this.gameStartTime) / 1000 : 0
        }, 'game');
        
        try {
            this.gameActive = false;
            this._stopTimer();
            
            // Calculate performance
            const endTime = Date.now();
            const duration = (endTime - this.gameStartTime) / 1000;
            const scorePercentage = Math.round((this.score / this.totalQuestions) * 100);
            
            DEBUG.recordState('game.ended', {
                score: this.score,
                totalQuestions: this.totalQuestions,
                scorePercentage,
                duration
            });
            
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
            } else {
                DEBUG.warn('finalScoreEl not found', null, 'game');
            }
            
            if (this.finalTotalEl) {
                this.finalTotalEl.textContent = this.totalQuestions;
            } else {
                DEBUG.warn('finalTotalEl not found', null, 'game');
            }
            
            if (this.performanceTextEl) {
                this.performanceTextEl.textContent = performanceMessage;
            } else {
                DEBUG.warn('performanceTextEl not found', null, 'game');
            }
            
            if (this.gameOverModal) {
                this.gameOverModal.style.display = 'block';
                if (this.playAgainBtn) {
                    this.playAgainBtn.focus();
                }
            } else {
                DEBUG.warn('gameOverModal not found', null, 'game');
            }
            
            // Reset buttons
            if (this.startBtn) this.startBtn.disabled = false;
            if (this.nextBtn) this.nextBtn.disabled = true;
            if (this.hintBtn) this.hintBtn.disabled = true;
            
            DEBUG.info('Game ended successfully', {
                score: this.score,
                totalQuestions: this.totalQuestions
            }, 'game');
            
        } catch (error) {
            DEBUG.error('Error in _endGame', error, 'game');
            throw error;
        }
    }
    
    resetGame() {
        DEBUG.info('Resetting game...', null, 'game');
        
        try {
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
            this.gameStartTime = null;
            
            DEBUG.recordState('game.reset', {
                score: 0,
                question: 0,
                usedElements: 0,
                hintsUsed: 0
            });
            
            this._updateScoreDisplay();
            this._updateTimerDisplay();
            
            // Reset buttons
            if (this.startBtn) this.startBtn.disabled = false;
            if (this.nextBtn) this.nextBtn.disabled = true;
            if (this.hintBtn) this.hintBtn.disabled = true;
            
            // Clear table
            if (this.table) {
                this.table.hideAllElements();
                this.table.clearAllHighlights();
                this.table.hideElementInfo();
            }
            
            // Reset question display
            if (this.questionTextEl) {
                this.questionTextEl.textContent = '';
                this.questionTextEl.style.display = '';
                this.questionTextEl.style.visibility = '';
                this.questionTextEl.style.opacity = '';
            }
            
            // Hide timer
            if (this.timerContainerEl) {
                this.timerContainerEl.style.display = 'none';
            }
        
        // Ensure element info is hidden
        if (this.table) {
            this.table.hideElementInfo();
        }
            
            // Update debug panel
            DEBUG.updateDebugPanel(this);
            
            DEBUG.info('Game reset successfully', null, 'game');
            
        } catch (error) {
            DEBUG.error('Error in resetGame', error, 'game');
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
    DEBUG.info('DOMContentLoaded event fired', null, 'init');
    
    // Wait for i18n to initialize
    const checkI18n = setInterval(() => {
        if (window.I18n) {
            DEBUG.info('I18n initialized, creating game instance', null, 'init');
            clearInterval(checkI18n);
            
            try {
                window.game = new PeriodicTableGame();
                DEBUG.info('Game instance created successfully', null, 'init');
                
                // Validate initialization
                if (window.debugGame) {
                    window.debugGame.validateGameState(window.game);
                }
                
            } catch (error) {
                DEBUG.error('Failed to create game instance', error, 'init');
                console.error('Failed to initialize game:', error);
            }
        }
    }, 100);
    
    // Timeout fallback for i18n initialization
    setTimeout(() => {
        if (!window.I18n) {
            DEBUG.warn('I18n initialization timeout, creating with default', null, 'init');
            if (checkI18n) {
                clearInterval(checkI18n);
            }
            try {
                window.I18n = new I18n();
                window.game = new PeriodicTableGame();
            } catch (error) {
                DEBUG.error('Failed to create fallback game instance', error, 'init');
                console.error('Critical error: Cannot initialize game without i18n');
            }
        }
    }, 5000);
});
