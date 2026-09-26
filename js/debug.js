// ===== Debug System for Periodic Table Game =====

/**
 * Debug configuration and utilities for the Periodic Table Game.
 * This module provides debugging capabilities that can be enabled/disabled
 * to help diagnose issues in development and production.
 */

class GameDebugger {
    constructor() {
        // Debug configuration - can be overridden via URL params or localStorage
        this.config = {
            enabled: false,           // Master switch for all debugging
            logLevel: 'info',         // 'verbose', 'debug', 'info', 'warn', 'error', 'silent'
            consoleOutput: true,      // Output to console
            stateInspection: false,   // Enable state inspection panel
            performance: false,      // Track performance metrics
            traceEvents: false,       // Trace game events
            validateState: false,     // Validate game state on changes
            showTiming: false         // Show timing information
        };
        
        // Performance metrics
        this.metrics = {
            initTime: 0,
            frameTimes: [],
            eventCounts: {},
            memory: {}
        };
        
        // State history for debugging
        this.stateHistory = [];
        this.maxHistory = 100;
        
        // Initialize from URL params and localStorage
        this._initialize();
    }
    
    _initialize() {
        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.has('debug')) {
            this.config.enabled = urlParams.get('debug') !== 'false';
        }
        
        if (urlParams.has('logLevel')) {
            this.config.logLevel = urlParams.get('logLevel');
        }
        
        if (urlParams.has('stateInspection')) {
            this.config.stateInspection = urlParams.get('stateInspection') === 'true';
        }
        
        // Check localStorage for saved debug settings
        const savedConfig = localStorage.getItem('periodicTableDebug');
        if (savedConfig) {
            try {
                const parsed = JSON.parse(savedConfig);
                Object.assign(this.config, parsed);
            } catch (e) {
                this._log('error', 'Failed to parse debug config from localStorage', e);
            }
        }
        
        // Add debug info to console
        if (this.config.enabled) {
            this._log('info', 'Debug mode enabled', {
                config: this.config,
                url: window.location.href
            });
            
            // Add debug commands to window for easy access
            window.debugGame = this;
            
            // Add console helper
            window.d = this._log.bind(this);
        }
        
        // Set up performance monitoring if enabled
        if (this.config.performance) {
            this._setupPerformanceMonitoring();
        }
    }
    
    /**
     * Log a debug message
     * @param {string} level - Log level (verbose, debug, info, warn, error)
     * @param {string} message - Message to log
     * @param {*} data - Optional data to log
     * @param {string} source - Optional source identifier
     */
    _log(level, message, data = null, source = null) {
        if (!this.config.enabled) return;
        
        const levels = ['verbose', 'debug', 'info', 'warn', 'error'];
        const levelIndex = levels.indexOf(level);
        const configLevelIndex = levels.indexOf(this.config.logLevel);
        
        // Only log if level is at or above configured level
        if (levelIndex === -1 || levelIndex < configLevelIndex) return;
        
        const timestamp = new Date().toISOString();
        const prefix = source ? `[${source}]` : '';
        
        // Format the message
        let formattedMessage = `${timestamp} ${prefix} [${level.toUpperCase()}] ${message}`;
        
        if (data !== null && data !== undefined) {
            formattedMessage += ` ${JSON.stringify(data, null, 2)}`;
        }
        
        // Output to console
        if (this.config.consoleOutput) {
            switch (level) {
                case 'error':
                    console.error(`[DEBUG] ${formattedMessage}`);
                    break;
                case 'warn':
                    console.warn(`[DEBUG] ${formattedMessage}`);
                    break;
                case 'info':
                    console.info(`[DEBUG] ${formattedMessage}`);
                    break;
                case 'debug':
                    console.debug(`[DEBUG] ${formattedMessage}`);
                    break;
                case 'verbose':
                    console.log(`[DEBUG] ${formattedMessage}`);
                    break;
                default:
                    console.log(`[DEBUG] ${formattedMessage}`);
            }
        }
        
        // Store in history
        this.stateHistory.push({
            timestamp: Date.now(),
            level,
            message,
            data,
            source
        });
        
        // Trim history
        if (this.stateHistory.length > this.maxHistory) {
            this.stateHistory = this.stateHistory.slice(-this.maxHistory);
        }
    }
    
    /**
     * Public log method
     */
    log(level, message, data = null, source = null) {
        this._log(level, message, data, source);
    }
    
    /**
     * Shorthand methods for each log level
     */
    verbose(message, data = null, source = null) {
        this._log('verbose', message, data, source);
    }
    
    debug(message, data = null, source = null) {
        this._log('debug', message, data, source);
    }
    
    info(message, data = null, source = null) {
        this._log('info', message, data, source);
    }
    
    warn(message, data = null, source = null) {
        this._log('warn', message, data, source);
    }
    
    error(message, data = null, source = null) {
        this._log('error', message, data, source);
    }
    
    /**
     * Trace an event
     */
    trace(eventName, data = {}) {
        if (!this.config.enabled || !this.config.traceEvents) return;
        
        const timestamp = Date.now();
        
        // Update event counts
        this.metrics.eventCounts[eventName] = (this.metrics.eventCounts[eventName] || 0) + 1;
        
        this._log('debug', `Event: ${eventName}`, {
            ...data,
            count: this.metrics.eventCounts[eventName]
        }, 'trace');
    }
    
    /**
     * Record a state snapshot
     */
    recordState(stateName, state = {}) {
        if (!this.config.enabled || !this.config.validateState) return;
        
        const snapshot = {
            timestamp: Date.now(),
            name: stateName,
            state: this._deepClone(state)
        };
        
        this.stateHistory.push(snapshot);
        
        if (this.stateHistory.length > this.maxHistory) {
            this.stateHistory = this.stateHistory.slice(-this.maxHistory);
        }
        
        this._log('debug', `State recorded: ${stateName}`, state, 'state');
    }
    
    /**
     * Validate game state
     */
    validateGameState(game) {
        if (!this.config.enabled || !this.config.validateState) return true;
        
        const errors = [];
        
        // Check required properties
        const requiredProps = [
            'gameActive', 'score', 'currentQuestion', 'totalQuestions',
            'currentElement', 'currentMode', 'currentLevel', 'maxAtomicNumber'
        ];
        
        for (const prop of requiredProps) {
            if (game[prop] === undefined) {
                errors.push(`Missing required property: ${prop}`);
            }
        }
        
        // Check score validity
        if (game.score < 0 || game.score > game.totalQuestions) {
            errors.push(`Invalid score: ${game.score} (should be 0-${game.totalQuestions})`);
        }
        
        // Check question number
        if (game.currentQuestion < 0 || game.currentQuestion > game.totalQuestions) {
            errors.push(`Invalid currentQuestion: ${game.currentQuestion}`);
        }
        
        // Check mode validity
        const validModes = ['find-by-name', 'find-by-symbol', 'find-by-group', 'find-by-period', 'study'];
        if (!validModes.includes(game.currentMode)) {
            errors.push(`Invalid mode: ${game.currentMode}`);
        }
        
        // Check level validity
        const validLevels = ['neon', 'argon', 'krypton', 'xenon', 'radon', 'oganesson', 'all'];
        if (!validLevels.includes(game.currentLevel)) {
            errors.push(`Invalid level: ${game.currentLevel}`);
        }
        
        // Check maxAtomicNumber
        if (!game.maxAtomicNumber || game.maxAtomicNumber < 1 || game.maxAtomicNumber > 118) {
            errors.push(`Invalid maxAtomicNumber: ${game.maxAtomicNumber}`);
        }
        
        // Check usedElements consistency
        if (game.usedElements && game.usedElements.size > 0) {
            for (const symbol of game.usedElements) {
                const element = window.PERIODIC_TABLE_DATA?.find(e => e.symbol === symbol);
                if (!element) {
                    errors.push(`Used element not found in data: ${symbol}`);
                } else if (element.number > (game.levels?.[game.currentLevel] || 118)) {
                    errors.push(`Used element ${symbol} (${element.number}) exceeds current level max`);
                }
            }
        }
        
        if (errors.length > 0) {
            this._log('error', 'Game state validation failed', { errors }, 'validate');
            return false;
        }
        
        this._log('debug', 'Game state validation passed', null, 'validate');
        return true;
    }
    
    /**
     * Assert a condition
     */
    assert(condition, message, data = null) {
        if (!condition) {
            this._log('error', `Assertion failed: ${message}`, data, 'assert');
            if (this.config.enabled) {
                throw new Error(`Assertion failed: ${message}`);
            }
        }
    }
    
    /**
     * Set debug configuration
     */
    setConfig(newConfig) {
        Object.assign(this.config, newConfig);
        
        // Save to localStorage
        localStorage.setItem('periodicTableDebug', JSON.stringify(this.config));
        
        this._log('info', 'Debug config updated', this.config);
    }
    
    /**
     * Enable debug mode
     */
    enable() {
        this.config.enabled = true;
        this._log('info', 'Debug mode enabled');
    }
    
    /**
     * Disable debug mode
     */
    disable() {
        this.config.enabled = false;
    }
    
    /**
     * Toggle debug mode
     */
    toggle() {
        this.config.enabled = !this.config.enabled;
        if (this.config.enabled) {
            this._log('info', 'Debug mode enabled');
        }
    }
    
    /**
     * Set log level
     */
    setLogLevel(level) {
        if (['verbose', 'debug', 'info', 'warn', 'error', 'silent'].includes(level)) {
            this.config.logLevel = level;
            this._log('info', `Log level set to: ${level}`);
        }
    }
    
    /**
     * Get debug panel HTML
     */
    getDebugPanelHTML() {
        if (!this.config.stateInspection) return '';
        
        return `
            <div id="debug-panel" style="
                position: fixed;
                bottom: 10px;
                right: 10px;
                background: rgba(0,0,0,0.8);
                color: #0f0;
                padding: 10px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 11px;
                z-index: 10000;
                max-width: 400px;
                max-height: 300px;
                overflow: auto;
            ">
                <h3 style="color: #ff0; margin: 0 0 10px 0;">DEBUG</h3>
                <div id="debug-content"></div>
                <button onclick="window.debugGame?.toggleStateInspection()" style="
                    margin-top: 5px;
                    padding: 2px 5px;
                    background: #333;
                    color: #0f0;
                    border: 1px solid #0f0;
                    border-radius: 3px;
                    cursor: pointer;
                ">Toggle</button>
            </div>
        `;
    }
    
    /**
     * Update debug panel with current state
     */
    updateDebugPanel(game) {
        if (!this.config.stateInspection || !game) return;
        
        const panel = document.getElementById('debug-content');
        if (!panel) return;
        
        const state = {
            gameActive: game.gameActive,
            mode: game.currentMode,
            level: game.currentLevel,
            maxAtomicNumber: game.maxAtomicNumber,
            score: game.score,
            question: game.currentQuestion,
            totalQuestions: game.totalQuestions,
            currentElement: game.currentElement ? {
                symbol: game.currentElement.symbol,
                name: game.currentElement.name,
                number: game.currentElement.number
            } : null,
            usedElements: Array.from(game.usedElements || []).slice(0, 10),
            hintsUsed: game.hintsUsed,
            timeRemaining: game.timeRemaining,
            timerActive: game.timer !== null
        };
        
        panel.innerHTML = `<pre style="margin: 0; white-space: pre-wrap;">${JSON.stringify(state, null, 2)}</pre>`;
    }
    
    toggleStateInspection() {
        this.config.stateInspection = !this.config.stateInspection;
        
        if (this.config.stateInspection) {
            // Create panel if it doesn't exist
            if (!document.getElementById('debug-panel')) {
                const panelHTML = this.getDebugPanelHTML();
                document.body.insertAdjacentHTML('beforeend', panelHTML);
            }
            document.getElementById('debug-panel').style.display = 'block';
        } else {
            const panel = document.getElementById('debug-panel');
            if (panel) {
                panel.style.display = 'none';
            }
        }
    }
    
    /**
     * Set up performance monitoring
     */
    _setupPerformanceMonitoring() {
        this.metrics.initTime = Date.now();
        
        // Track frame times
        let lastFrameTime = performance.now();
        const trackFrame = () => {
            const now = performance.now();
            const frameTime = now - lastFrameTime;
            this.metrics.frameTimes.push(frameTime);
            
            if (this.metrics.frameTimes.length > 100) {
                this.metrics.frameTimes.shift();
            }
            
            lastFrameTime = now;
            requestAnimationFrame(trackFrame);
        };
        
        requestAnimationFrame(trackFrame);
        
        // Log memory usage periodically
        if (window.performance && window.performance.memory) {
            setInterval(() => {
                this.metrics.memory = {
                    usedJSHeapSize: performance.memory.usedJSHeapSize,
                    totalJSHeapSize: performance.memory.totalJSHeapSize,
                    jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
                };
                
                this._log('verbose', 'Memory usage', this.metrics.memory, 'perf');
            }, 5000);
        }
    }
    
    /**
     * Get performance summary
     */
    getPerformanceSummary() {
        const avgFrameTime = this.metrics.frameTimes.reduce((a, b) => a + b, 0) / 
            (this.metrics.frameTimes.length || 1);
        const maxFrameTime = Math.max(...this.metrics.frameTimes, 0);
        const minFrameTime = Math.min(...this.metrics.frameTimes.filter(t => t > 0), Infinity);
        
        return {
            initTime: this.metrics.initTime,
            uptime: Date.now() - this.metrics.initTime,
            avgFrameTime,
            maxFrameTime,
            minFrameTime,
            frameCount: this.metrics.frameTimes.length,
            eventCounts: this.metrics.eventCounts,
            memory: this.metrics.memory
        };
    }
    
    /**
     * Deep clone an object
     */
    _deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (obj instanceof Set) {
            return new Set(Array.from(obj));
        }
        
        if (obj instanceof Map) {
            return new Map(Array.from(obj));
        }
        
        if (Array.isArray(obj)) {
            return obj.map(item => this._deepClone(item));
        }
        
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = this._deepClone(obj[key]);
            }
        }
        return cloned;
    }
    
    /**
     * Check if an element exists in the periodic table data
     */
    validateElement(symbol) {
        if (!symbol) return false;
        
        const element = window.PERIODIC_TABLE_DATA?.find(e => 
            e.symbol === symbol.toUpperCase()
        );
        
        if (!element) {
            this._log('warn', `Element not found: ${symbol}`, null, 'validate');
            return false;
        }
        
        return true;
    }
    
    /**
     * Check if element is within current level bounds
     */
    validateElementForLevel(symbol, maxAtomicNumber) {
        const element = window.PERIODIC_TABLE_DATA?.find(e => 
            e.symbol === symbol.toUpperCase()
        );
        
        if (!element) {
            this._log('warn', `Element ${symbol} not found in data`, null, 'validate');
            return false;
        }
        
        if (element.number > maxAtomicNumber) {
            this._log('warn', `Element ${symbol} (${element.number}) exceeds max ${maxAtomicNumber}`, null, 'validate');
            return false;
        }
        
        return true;
    }
}

// Create global debug instance
window.Debugger = GameDebugger;
window.debugGame = null;

// Initialize debugger when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.debugGame = new GameDebugger();
    
    // Add keyboard shortcut for debug toggle (Ctrl+Alt+D)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key === 'd') {
            e.preventDefault();
            if (window.debugGame) {
                window.debugGame.toggle();
                if (window.debugGame.config.enabled) {
                    window.debugGame.info('Debug mode toggled ON', null, 'keyboard');
                }
            }
        }
    });
});
