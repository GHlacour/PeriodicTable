// ===== Periodic Table Data =====

// Complete periodic table data with all 118 elements
const PERIODIC_TABLE_DATA = [
    // Atomic number, Symbol, Name (English), Category, Group, Period, Block, x, y
    { number: 1, symbol: 'H', name: 'Hydrogen', category: 'nonmetal', group: 1, period: 1, block: 's', x: 0, y: 0 },
    { number: 2, symbol: 'He', name: 'Helium', category: 'noble-gas', group: 18, period: 1, block: 's', x: 17, y: 0 },
    
    // Period 2
    { number: 3, symbol: 'Li', name: 'Lithium', category: 'alkali-metal', group: 1, period: 2, block: 's', x: 0, y: 1 },
    { number: 4, symbol: 'Be', name: 'Beryllium', category: 'alkaline-earth-metal', group: 2, period: 2, block: 's', x: 1, y: 1 },
    { number: 5, symbol: 'B', name: 'Boron', category: 'metalloid', group: 13, period: 2, block: 'p', x: 12, y: 1 },
    { number: 6, symbol: 'C', name: 'Carbon', category: 'nonmetal', group: 14, period: 2, block: 'p', x: 13, y: 1 },
    { number: 7, symbol: 'N', name: 'Nitrogen', category: 'nonmetal', group: 15, period: 2, block: 'p', x: 14, y: 1 },
    { number: 8, symbol: 'O', name: 'Oxygen', category: 'nonmetal', group: 16, period: 2, block: 'p', x: 15, y: 1 },
    { number: 9, symbol: 'F', name: 'Fluorine', category: 'halogen', group: 17, period: 2, block: 'p', x: 16, y: 1 },
    { number: 10, symbol: 'Ne', name: 'Neon', category: 'noble-gas', group: 18, period: 2, block: 'p', x: 17, y: 1 },
    
    // Period 3
    { number: 11, symbol: 'Na', name: 'Sodium', category: 'alkali-metal', group: 1, period: 3, block: 's', x: 0, y: 2 },
    { number: 12, symbol: 'Mg', name: 'Magnesium', category: 'alkaline-earth-metal', group: 2, period: 3, block: 's', x: 1, y: 2 },
    { number: 13, symbol: 'Al', name: 'Aluminium', category: 'post-transition-metal', group: 13, period: 3, block: 'p', x: 12, y: 2 },
    { number: 14, symbol: 'Si', name: 'Silicon', category: 'metalloid', group: 14, period: 3, block: 'p', x: 13, y: 2 },
    { number: 15, symbol: 'P', name: 'Phosphorus', category: 'nonmetal', group: 15, period: 3, block: 'p', x: 14, y: 2 },
    { number: 16, symbol: 'S', name: 'Sulfur', category: 'nonmetal', group: 16, period: 3, block: 'p', x: 15, y: 2 },
    { number: 17, symbol: 'Cl', name: 'Chlorine', category: 'halogen', group: 17, period: 3, block: 'p', x: 16, y: 2 },
    { number: 18, symbol: 'Ar', name: 'Argon', category: 'noble-gas', group: 18, period: 3, block: 'p', x: 17, y: 2 },
    
    // Period 4
    { number: 19, symbol: 'K', name: 'Potassium', category: 'alkali-metal', group: 1, period: 4, block: 's', x: 0, y: 3 },
    { number: 20, symbol: 'Ca', name: 'Calcium', category: 'alkaline-earth-metal', group: 2, period: 4, block: 's', x: 1, y: 3 },
    { number: 21, symbol: 'Sc', name: 'Scandium', category: 'transition-metal', group: 3, period: 4, block: 'd', x: 2, y: 3 },
    { number: 22, symbol: 'Ti', name: 'Titanium', category: 'transition-metal', group: 4, period: 4, block: 'd', x: 3, y: 3 },
    { number: 23, symbol: 'V', name: 'Vanadium', category: 'transition-metal', group: 5, period: 4, block: 'd', x: 4, y: 3 },
    { number: 24, symbol: 'Cr', name: 'Chromium', category: 'transition-metal', group: 6, period: 4, block: 'd', x: 5, y: 3 },
    { number: 25, symbol: 'Mn', name: 'Manganese', category: 'transition-metal', group: 7, period: 4, block: 'd', x: 6, y: 3 },
    { number: 26, symbol: 'Fe', name: 'Iron', category: 'transition-metal', group: 8, period: 4, block: 'd', x: 7, y: 3 },
    { number: 27, symbol: 'Co', name: 'Cobalt', category: 'transition-metal', group: 9, period: 4, block: 'd', x: 8, y: 3 },
    { number: 28, symbol: 'Ni', name: 'Nickel', category: 'transition-metal', group: 10, period: 4, block: 'd', x: 9, y: 3 },
    { number: 29, symbol: 'Cu', name: 'Copper', category: 'transition-metal', group: 11, period: 4, block: 'd', x: 10, y: 3 },
    { number: 30, symbol: 'Zn', name: 'Zinc', category: 'transition-metal', group: 12, period: 4, block: 'd', x: 11, y: 3 },
    { number: 31, symbol: 'Ga', name: 'Gallium', category: 'post-transition-metal', group: 13, period: 4, block: 'p', x: 12, y: 3 },
    { number: 32, symbol: 'Ge', name: 'Germanium', category: 'metalloid', group: 14, period: 4, block: 'p', x: 13, y: 3 },
    { number: 33, symbol: 'As', name: 'Arsenic', category: 'metalloid', group: 15, period: 4, block: 'p', x: 14, y: 3 },
    { number: 34, symbol: 'Se', name: 'Selenium', category: 'nonmetal', group: 16, period: 4, block: 'p', x: 15, y: 3 },
    { number: 35, symbol: 'Br', name: 'Bromine', category: 'halogen', group: 17, period: 4, block: 'p', x: 16, y: 3 },
    { number: 36, symbol: 'Kr', name: 'Krypton', category: 'noble-gas', group: 18, period: 4, block: 'p', x: 17, y: 3 },
    
    // Period 5
    { number: 37, symbol: 'Rb', name: 'Rubidium', category: 'alkali-metal', group: 1, period: 5, block: 's', x: 0, y: 4 },
    { number: 38, symbol: 'Sr', name: 'Strontium', category: 'alkaline-earth-metal', group: 2, period: 5, block: 's', x: 1, y: 4 },
    { number: 39, symbol: 'Y', name: 'Yttrium', category: 'transition-metal', group: 3, period: 5, block: 'd', x: 2, y: 4 },
    { number: 40, symbol: 'Zr', name: 'Zirconium', category: 'transition-metal', group: 4, period: 5, block: 'd', x: 3, y: 4 },
    { number: 41, symbol: 'Nb', name: 'Niobium', category: 'transition-metal', group: 5, period: 5, block: 'd', x: 4, y: 4 },
    { number: 42, symbol: 'Mo', name: 'Molybdenum', category: 'transition-metal', group: 6, period: 5, block: 'd', x: 5, y: 4 },
    { number: 43, symbol: 'Tc', name: 'Technetium', category: 'transition-metal', group: 7, period: 5, block: 'd', x: 6, y: 4 },
    { number: 44, symbol: 'Ru', name: 'Ruthenium', category: 'transition-metal', group: 8, period: 5, block: 'd', x: 7, y: 4 },
    { number: 45, symbol: 'Rh', name: 'Rhodium', category: 'transition-metal', group: 9, period: 5, block: 'd', x: 8, y: 4 },
    { number: 46, symbol: 'Pd', name: 'Palladium', category: 'transition-metal', group: 10, period: 5, block: 'd', x: 9, y: 4 },
    { number: 47, symbol: 'Ag', name: 'Silver', category: 'transition-metal', group: 11, period: 5, block: 'd', x: 10, y: 4 },
    { number: 48, symbol: 'Cd', name: 'Cadmium', category: 'transition-metal', group: 12, period: 5, block: 'd', x: 11, y: 4 },
    { number: 49, symbol: 'In', name: 'Indium', category: 'post-transition-metal', group: 13, period: 5, block: 'p', x: 12, y: 4 },
    { number: 50, symbol: 'Sn', name: 'Tin', category: 'post-transition-metal', group: 14, period: 5, block: 'p', x: 13, y: 4 },
    { number: 51, symbol: 'Sb', name: 'Antimony', category: 'metalloid', group: 15, period: 5, block: 'p', x: 14, y: 4 },
    { number: 52, symbol: 'Te', name: 'Tellurium', category: 'metalloid', group: 16, period: 5, block: 'p', x: 15, y: 4 },
    { number: 53, symbol: 'I', name: 'Iodine', category: 'halogen', group: 17, period: 5, block: 'p', x: 16, y: 4 },
    { number: 54, symbol: 'Xe', name: 'Xenon', category: 'noble-gas', group: 18, period: 5, block: 'p', x: 17, y: 4 },
    
    // Period 6
    { number: 55, symbol: 'Cs', name: 'Cesium', category: 'alkali-metal', group: 1, period: 6, block: 's', x: 0, y: 5 },
    { number: 56, symbol: 'Ba', name: 'Barium', category: 'alkaline-earth-metal', group: 2, period: 6, block: 's', x: 1, y: 5 },
    { number: 57, symbol: 'La', name: 'Lanthanum', category: 'lanthanide', group: 3, period: 6, block: 'f', x: 2, y: 5 },
    { number: 58, symbol: 'Ce', name: 'Cerium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 3, y: 8 },
    { number: 59, symbol: 'Pr', name: 'Praseodymium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 4, y: 8 },
    { number: 60, symbol: 'Nd', name: 'Neodymium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 5, y: 8 },
    { number: 61, symbol: 'Pm', name: 'Promethium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 6, y: 8 },
    { number: 62, symbol: 'Sm', name: 'Samarium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 7, y: 8 },
    { number: 63, symbol: 'Eu', name: 'Europium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 8, y: 8 },
    { number: 64, symbol: 'Gd', name: 'Gadolinium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 9, y: 8 },
    { number: 65, symbol: 'Tb', name: 'Terbium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 10, y: 8 },
    { number: 66, symbol: 'Dy', name: 'Dysprosium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 11, y: 8 },
    { number: 67, symbol: 'Ho', name: 'Holmium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 12, y: 8 },
    { number: 68, symbol: 'Er', name: 'Erbium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 13, y: 8 },
    { number: 69, symbol: 'Tm', name: 'Thulium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 14, y: 8 },
    { number: 70, symbol: 'Yb', name: 'Ytterbium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 15, y: 8 },
    { number: 71, symbol: 'Lu', name: 'Lutetium', category: 'lanthanide', group: null, period: 6, block: 'f', x: 16, y: 8 },
    { number: 72, symbol: 'Hf', name: 'Hafnium', category: 'transition-metal', group: 4, period: 6, block: 'd', x: 3, y: 5 },
    { number: 73, symbol: 'Ta', name: 'Tantalum', category: 'transition-metal', group: 5, period: 6, block: 'd', x: 4, y: 5 },
    { number: 74, symbol: 'W', name: 'Tungsten', category: 'transition-metal', group: 6, period: 6, block: 'd', x: 5, y: 5 },
    { number: 75, symbol: 'Re', name: 'Rhenium', category: 'transition-metal', group: 7, period: 6, block: 'd', x: 6, y: 5 },
    { number: 76, symbol: 'Os', name: 'Osmium', category: 'transition-metal', group: 8, period: 6, block: 'd', x: 7, y: 5 },
    { number: 77, symbol: 'Ir', name: 'Iridium', category: 'transition-metal', group: 9, period: 6, block: 'd', x: 8, y: 5 },
    { number: 78, symbol: 'Pt', name: 'Platinum', category: 'transition-metal', group: 10, period: 6, block: 'd', x: 9, y: 5 },
    { number: 79, symbol: 'Au', name: 'Gold', category: 'transition-metal', group: 11, period: 6, block: 'd', x: 10, y: 5 },
    { number: 80, symbol: 'Hg', name: 'Mercury', category: 'transition-metal', group: 12, period: 6, block: 'd', x: 11, y: 5 },
    { number: 81, symbol: 'Tl', name: 'Thallium', category: 'post-transition-metal', group: 13, period: 6, block: 'p', x: 12, y: 5 },
    { number: 82, symbol: 'Pb', name: 'Lead', category: 'post-transition-metal', group: 14, period: 6, block: 'p', x: 13, y: 5 },
    { number: 83, symbol: 'Bi', name: 'Bismuth', category: 'post-transition-metal', group: 15, period: 6, block: 'p', x: 14, y: 5 },
    { number: 84, symbol: 'Po', name: 'Polonium', category: 'post-transition-metal', group: 16, period: 6, block: 'p', x: 15, y: 5 },
    { number: 85, symbol: 'At', name: 'Astatine', category: 'halogen', group: 17, period: 6, block: 'p', x: 16, y: 5 },
    { number: 86, symbol: 'Rn', name: 'Radon', category: 'noble-gas', group: 18, period: 6, block: 'p', x: 17, y: 5 },
    
    // Period 7
    { number: 87, symbol: 'Fr', name: 'Francium', category: 'alkali-metal', group: 1, period: 7, block: 's', x: 0, y: 6 },
    { number: 88, symbol: 'Ra', name: 'Radium', category: 'alkaline-earth-metal', group: 2, period: 7, block: 's', x: 1, y: 6 },
    { number: 89, symbol: 'Ac', name: 'Actinium', category: 'actinide', group: 3, period: 7, block: 'f', x: 2, y: 6 },
    { number: 90, symbol: 'Th', name: 'Thorium', category: 'actinide', group: null, period: 7, block: 'f', x: 3, y: 9 },
    { number: 91, symbol: 'Pa', name: 'Protactinium', category: 'actinide', group: null, period: 7, block: 'f', x: 4, y: 9 },
    { number: 92, symbol: 'U', name: 'Uranium', category: 'actinide', group: null, period: 7, block: 'f', x: 5, y: 9 },
    { number: 93, symbol: 'Np', name: 'Neptunium', category: 'actinide', group: null, period: 7, block: 'f', x: 6, y: 9 },
    { number: 94, symbol: 'Pu', name: 'Plutonium', category: 'actinide', group: null, period: 7, block: 'f', x: 7, y: 9 },
    { number: 95, symbol: 'Am', name: 'Americium', category: 'actinide', group: null, period: 7, block: 'f', x: 8, y: 9 },
    { number: 96, symbol: 'Cm', name: 'Curium', category: 'actinide', group: null, period: 7, block: 'f', x: 9, y: 9 },
    { number: 97, symbol: 'Bk', name: 'Berkelium', category: 'actinide', group: null, period: 7, block: 'f', x: 10, y: 9 },
    { number: 98, symbol: 'Cf', name: 'Californium', category: 'actinide', group: null, period: 7, block: 'f', x: 11, y: 9 },
    { number: 99, symbol: 'Es', name: 'Einsteinium', category: 'actinide', group: null, period: 7, block: 'f', x: 12, y: 9 },
    { number: 100, symbol: 'Fm', name: 'Fermium', category: 'actinide', group: null, period: 7, block: 'f', x: 13, y: 9 },
    { number: 101, symbol: 'Md', name: 'Mendelevium', category: 'actinide', group: null, period: 7, block: 'f', x: 14, y: 9 },
    { number: 102, symbol: 'No', name: 'Nobelium', category: 'actinide', group: null, period: 7, block: 'f', x: 15, y: 9 },
    { number: 103, symbol: 'Lr', name: 'Lawrencium', category: 'actinide', group: null, period: 7, block: 'f', x: 16, y: 9 },
    { number: 104, symbol: 'Rf', name: 'Rutherfordium', category: 'transition-metal', group: 4, period: 7, block: 'd', x: 3, y: 6 },
    { number: 105, symbol: 'Db', name: 'Dubnium', category: 'transition-metal', group: 5, period: 7, block: 'd', x: 4, y: 6 },
    { number: 106, symbol: 'Sg', name: 'Seaborgium', category: 'transition-metal', group: 6, period: 7, block: 'd', x: 5, y: 6 },
    { number: 107, symbol: 'Bh', name: 'Bohrium', category: 'transition-metal', group: 7, period: 7, block: 'd', x: 6, y: 6 },
    { number: 108, symbol: 'Hs', name: 'Hassium', category: 'transition-metal', group: 8, period: 7, block: 'd', x: 7, y: 6 },
    { number: 109, symbol: 'Mt', name: 'Meitnerium', category: 'unknown', group: 9, period: 7, block: 'd', x: 8, y: 6 },
    { number: 110, symbol: 'Ds', name: 'Darmstadtium', category: 'unknown', group: 10, period: 7, block: 'd', x: 9, y: 6 },
    { number: 111, symbol: 'Rg', name: 'Roentgenium', category: 'unknown', group: 11, period: 7, block: 'd', x: 10, y: 6 },
    { number: 112, symbol: 'Cn', name: 'Copernicium', category: 'unknown', group: 12, period: 7, block: 'd', x: 11, y: 6 },
    { number: 113, symbol: 'Nh', name: 'Nihonium', category: 'unknown', group: 13, period: 7, block: 'p', x: 12, y: 6 },
    { number: 114, symbol: 'Fl', name: 'Flerovium', category: 'unknown', group: 14, period: 7, block: 'p', x: 13, y: 6 },
    { number: 115, symbol: 'Mc', name: 'Moscovium', category: 'unknown', group: 15, period: 7, block: 'p', x: 14, y: 6 },
    { number: 116, symbol: 'Lv', name: 'Livermorium', category: 'unknown', group: 16, period: 7, block: 'p', x: 15, y: 6 },
    { number: 117, symbol: 'Ts', name: 'Tennessine', category: 'unknown', group: 17, period: 7, block: 'p', x: 16, y: 6 },
    { number: 118, symbol: 'Og', name: 'Oganesson', category: 'unknown', group: 18, period: 7, block: 'p', x: 17, y: 6 }
];

// Group names for display
const GROUP_NAMES = {
    1: 'Alkali metals',
    2: 'Alkaline earth metals',
    3: 'Group 3',
    4: 'Group 4',
    5: 'Group 5',
    6: 'Group 6',
    7: 'Group 7',
    8: 'Group 8',
    9: 'Group 9',
    10: 'Group 10',
    11: 'Group 11',
    12: 'Group 12',
    13: 'Boron group',
    14: 'Carbon group',
    15: 'Nitrogen group',
    16: 'Chalcogens',
    17: 'Halogens',
    18: 'Noble gases'
};

// Category display names
const CATEGORY_NAMES = {
    'alkali-metal': 'Alkali metal',
    'alkaline-earth-metal': 'Alkaline earth metal',
    'lanthanide': 'Lanthanide',
    'actinide': 'Actinide',
    'transition-metal': 'Transition metal',
    'post-transition-metal': 'Post-transition metal',
    'metalloid': 'Metalloid',
    'nonmetal': 'Nonmetal',
    'halogen': 'Halogen',
    'noble-gas': 'Noble gas',
    'unknown': 'Unknown properties'
};

// ===== Periodic Table Rendering =====

class PeriodicTable {
    constructor(containerId, onElementClick = null) {
        this.container = document.getElementById(containerId);
        this.onElementClick = onElementClick;
        this.elements = {};
        this.grid = [];
        this.selectedElement = null;
        
        // Initialize data structures
        this._initializeData();
        this._createGrid();
        this.render();
        this._setupEventListeners();
    }
    
    _initializeData() {
        // Index elements by symbol for quick lookup
        PERIODIC_TABLE_DATA.forEach(element => {
            this.elements[element.symbol] = element;
        });
        
        // Create 2D grid (18 columns x 10 rows)
        for (let y = 0; y < 10; y++) {
            this.grid[y] = [];
            for (let x = 0; x < 18; x++) {
                this.grid[y][x] = null;
            }
        }
        
        // Place elements in grid
        PERIODIC_TABLE_DATA.forEach(element => {
            if (element.x >= 0 && element.x < 18 && element.y >= 0 && element.y < 10) {
                this.grid[element.y][element.x] = element;
            }
        });
    }
    
    _createGrid() {
        // Create the grid structure
        this.container.innerHTML = '';
        
        // Create period and group labels
        this._createLabels();
        
        // Create element cells
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 18; x++) {
                const element = this.grid[y][x];
                const cell = this._createCell(element, x, y);
                this.container.appendChild(cell);
            }
        }
    }
    
    _createLabels() {
        // Create period labels (left side)
        for (let y = 0; y < 7; y++) {
            const label = document.createElement('div');
            label.className = 'period-label';
            label.textContent = y + 1;
            label.style.gridColumn = '1';
            label.style.gridRow = y + 1;
            label.style.justifySelf = 'start';
            this.container.appendChild(label);
        }
        
        // Create group labels (top)
        const groupLabels = [1, 2, null, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        for (let x = 0; x < 18; x++) {
            if (groupLabels[x] !== null) {
                const label = document.createElement('div');
                label.className = 'group-label';
                label.textContent = groupLabels[x];
                label.style.gridColumn = x + 1;
                label.style.gridRow = '1';
                label.style.alignSelf = 'start';
                this.container.appendChild(label);
            }
        }
    }
    
    _createCell(element, x, y) {
        const cell = document.createElement('div');
        cell.className = 'element-cell';
        cell.dataset.x = x;
        cell.dataset.y = y;
        cell.dataset.symbol = element ? element.symbol : '';
        cell.dataset.number = element ? element.number : '';
        cell.tabIndex = element ? 0 : -1;
        
        // Set grid position
        cell.style.gridColumn = x + 1;
        cell.style.gridRow = y + 2; // +2 to account for labels
        
        if (element) {
            cell.classList.add(element.category);
            cell.setAttribute('role', 'button');
            cell.setAttribute('aria-label', `${element.name} (${element.symbol}), atomic number ${element.number}`);
            
            // Create cell content
            const numberSpan = document.createElement('span');
            numberSpan.className = 'number';
            numberSpan.textContent = element.number;
            
            const symbolSpan = document.createElement('span');
            symbolSpan.className = 'symbol';
            symbolSpan.textContent = element.symbol;
            
            cell.appendChild(numberSpan);
            cell.appendChild(symbolSpan);
        } else {
            cell.classList.add('empty');
            cell.setAttribute('role', 'gridcell');
            cell.setAttribute('aria-hidden', 'true');
        }
        
        return cell;
    }
    
    render(showSymbols = false, showNames = false) {
        const cells = this.container.querySelectorAll('.element-cell');
        
        cells.forEach(cell => {
            const symbol = cell.dataset.symbol;
            const element = this.elements[symbol];
            
            if (element) {
                // Update visibility based on game state
                const symbolSpan = cell.querySelector('.symbol');
                const numberSpan = cell.querySelector('.number');
                
                if (symbolSpan) {
                    symbolSpan.style.display = showSymbols ? 'block' : 'none';
                }
                if (numberSpan) {
                    numberSpan.style.display = showSymbols ? 'block' : 'none';
                }
                
                // Remove any name display
                const nameSpan = cell.querySelector('.name');
                if (nameSpan) {
                    cell.removeChild(nameSpan);
                }
                
                if (showNames && element) {
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'name';
                    nameSpan.textContent = element.name;
                    nameSpan.style.fontSize = '0.6rem';
                    nameSpan.style.position = 'absolute';
                    nameSpan.style.bottom = '2px';
                    nameSpan.style.left = '2px';
                    nameSpan.style.right = '2px';
                    nameSpan.style.textAlign = 'center';
                    nameSpan.style.whiteSpace = 'nowrap';
                    nameSpan.style.overflow = 'hidden';
                    nameSpan.style.textOverflow = 'ellipsis';
                    cell.appendChild(nameSpan);
                }
            }
        });
    }
    
    revealElement(symbol, revealName = false) {
        const element = this.elements[symbol];
        if (!element) return null;
        
        const cell = this.container.querySelector(`.element-cell[data-symbol="${symbol}"]`);
        if (!cell) return null;
        
        const symbolSpan = cell.querySelector('.symbol');
        const numberSpan = cell.querySelector('.number');
        
        if (symbolSpan) symbolSpan.style.display = 'block';
        if (numberSpan) numberSpan.style.display = 'block';
        
        if (revealName && element) {
            const nameSpan = document.createElement('span');
            nameSpan.className = 'name';
            nameSpan.textContent = element.name;
            nameSpan.style.fontSize = '0.6rem';
            nameSpan.style.position = 'absolute';
            nameSpan.style.bottom = '2px';
            nameSpan.style.left = '2px';
            nameSpan.style.right = '2px';
            nameSpan.style.textAlign = 'center';
            nameSpan.style.whiteSpace = 'nowrap';
            nameSpan.style.overflow = 'hidden';
            nameSpan.style.textOverflow = 'ellipsis';
            cell.appendChild(nameSpan);
        }
        
        return cell;
    }
    
    hideElement(symbol) {
        const cell = this.container.querySelector(`.element-cell[data-symbol="${symbol}"]`);
        if (!cell) return null;
        
        const symbolSpan = cell.querySelector('.symbol');
        const numberSpan = cell.querySelector('.number');
        const nameSpan = cell.querySelector('.name');
        
        if (symbolSpan) symbolSpan.style.display = 'none';
        if (numberSpan) numberSpan.style.display = 'none';
        if (nameSpan) cell.removeChild(nameSpan);
        
        return cell;
    }
    
    hideAllElements() {
        const cells = this.container.querySelectorAll('.element-cell');
        cells.forEach(cell => {
            const symbolSpan = cell.querySelector('.symbol');
            const numberSpan = cell.querySelector('.number');
            const nameSpan = cell.querySelector('.name');
            
            if (symbolSpan) symbolSpan.style.display = 'none';
            if (numberSpan) numberSpan.style.display = 'none';
            if (nameSpan) cell.removeChild(nameSpan);
        });
    }
    
    showAllSymbols() {
        const cells = this.container.querySelectorAll('.element-cell');
        cells.forEach(cell => {
            const symbolSpan = cell.querySelector('.symbol');
            const numberSpan = cell.querySelector('.number');
            
            if (symbolSpan) symbolSpan.style.display = 'block';
            if (numberSpan) numberSpan.style.display = 'block';
        });
    }
    
    highlightElement(symbol, className) {
        const cell = this.container.querySelector(`.element-cell[data-symbol="${symbol}"]`);
        if (cell) {
            cell.classList.add(className);
            return cell;
        }
        return null;
    }
    
    clearHighlight(symbol, className) {
        const cell = this.container.querySelector(`.element-cell[data-symbol="${symbol}"]`);
        if (cell) {
            cell.classList.remove(className);
            return cell;
        }
        return null;
    }
    
    clearAllHighlights() {
        const cells = this.container.querySelectorAll('.element-cell');
        cells.forEach(cell => {
            cell.classList.remove('selected', 'correct', 'incorrect', 'hint');
        });
    }
    
    selectElement(symbol) {
        this.clearAllHighlights();
        this.selectedElement = symbol;
        const cell = this.highlightElement(symbol, 'selected');
        if (cell) {
            cell.focus();
            this._showElementInfo(symbol);
        }
        return cell;
    }
    
    _showElementInfo(symbol) {
        const element = this.elements[symbol];
        if (!element) return;
        
        const infoPanel = document.getElementById('element-info');
        if (!infoPanel) return;
        
        const i18n = window.I18n || { translate: (key) => key };
        
        // Update info panel content
        const nameEl = document.getElementById('element-name');
        const symbolEl = document.getElementById('element-symbol');
        const numberEl = document.getElementById('element-number');
        const groupEl = document.getElementById('element-group');
        const periodEl = document.getElementById('element-period');
        const blockEl = document.getElementById('element-block');
        const categoryEl = document.getElementById('element-category');
        
        // Get localized element name
        const localizedName = i18n.getElementName(symbol);
        const localizedCategory = i18n.translate(`category.${element.category}`);
        const localizedGroup = element.group ? i18n.translate(`group.${element.group}`) || GROUP_NAMES[element.group] || element.group : 'N/A';
        
        if (nameEl) nameEl.textContent = localizedName || element.name;
        if (symbolEl) symbolEl.textContent = element.symbol;
        if (numberEl) numberEl.textContent = element.number;
        if (groupEl) groupEl.textContent = localizedGroup;
        if (periodEl) periodEl.textContent = element.period;
        if (blockEl) blockEl.textContent = element.block.toUpperCase();
        if (categoryEl) categoryEl.textContent = localizedCategory || CATEGORY_NAMES[element.category] || element.category;
        
        // Position and show panel
        infoPanel.style.display = 'block';
    }
    
    hideElementInfo() {
        const infoPanel = document.getElementById('element-info');
        if (infoPanel) {
            infoPanel.style.display = 'none';
        }
    }
    
    _setupEventListeners() {
        // Click handler
        this.container.addEventListener('click', (e) => {
            const cell = e.target.closest('.element-cell');
            if (cell && cell.dataset.symbol) {
                const symbol = cell.dataset.symbol;
                if (this.onElementClick) {
                    this.onElementClick(symbol, this.elements[symbol]);
                }
                this.selectElement(symbol);
            }
        });
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearAllHighlights();
                this.selectedElement = null;
                this.hideElementInfo();
            }
        });
    }
    
    getElementBySymbol(symbol) {
        return this.elements[symbol.toUpperCase()] || null;
    }
    
    getElementByNumber(number) {
        const element = PERIODIC_TABLE_DATA.find(el => el.number === number);
        return element || null;
    }
    
    getElementByName(name) {
        const normalizedName = name.toLowerCase().trim();
        const element = PERIODIC_TABLE_DATA.find(el => 
            el.name.toLowerCase() === normalizedName
        );
        return element || null;
    }
    
    getElementsByGroup(group) {
        return PERIODIC_TABLE_DATA.filter(el => el.group === group);
    }
    
    getElementsByPeriod(period) {
        return PERIODIC_TABLE_DATA.filter(el => el.period === period);
    }
    
    getElementsByBlock(block) {
        return PERIODIC_TABLE_DATA.filter(el => el.block === block);
    }
    
    getElementsByCategory(category) {
        return PERIODIC_TABLE_DATA.filter(el => el.category === category);
    }
    
    getRandomElement() {
        const randomIndex = Math.floor(Math.random() * PERIODIC_TABLE_DATA.length);
        return PERIODIC_TABLE_DATA[randomIndex];
    }
    
    getRandomElementFromGroup(group) {
        const elements = this.getElementsByGroup(group);
        if (elements.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * elements.length);
        return elements[randomIndex];
    }
    
    getRandomElementFromPeriod(period) {
        const elements = this.getElementsByPeriod(period);
        if (elements.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * elements.length);
        return elements[randomIndex];
    }
}

// Export for use in other modules
window.PeriodicTable = PeriodicTable;
window.PERIODIC_TABLE_DATA = PERIODIC_TABLE_DATA;
