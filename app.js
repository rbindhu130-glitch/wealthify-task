/* ═══════════════════════════════════════════════════════════════
   WEALTHIFY — app.js
   Pure JavaScript dashboard — connects to FastAPI backend
   ═══════════════════════════════════════════════════════════════ */

const API_BASE = (window.location.protocol === 'file:')
    ? 'http://127.0.0.1:8000/api'
    : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? (window.location.port === '8000' ? '/api' : 'http://127.0.0.1:8000/api')
        : '/api';

// ═════════════════════════════════════════════════════════════
// OFFLINE MOCK DATA FOR DEMO MODE
// ═════════════════════════════════════════════════════════════
const MOCK_DATA = {
    '/mutualfund-overall': [
        {"mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":46902.68,"total_units":1445.34,"average_nav":32.45},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","total_amount":24420.79,"total_units":661.80,"average_nav":36.90},
        {"mutual_fund":"SBI Magnum Ultra Short Duration Fund Regular Growth","total_amount":20000.00,"total_units":3.36,"average_nav":5952.38},
        {"mutual_fund":"SBI Small Cap Fund Regular Growth","total_amount":9999.50,"total_units":59.62,"average_nav":167.72},
        {"mutual_fund":"DSP Nifty 50 Equal Weight Index Fund - Reg - Growth","total_amount":6499.68,"total_units":261.49,"average_nav":24.86},
        {"mutual_fund":"ICICI Prudential Ultra Short Term Fund - Growth","total_amount":1500.00,"total_units":54.46,"average_nav":27.54}
    ],
    '/investor-summary': [
        {"investor_name":"M Padmapriya","mutual_fund":"SBI Magnum Ultra Short Duration Fund Regular Growth","total_amount":20000.0,"total_units":3.36},
        {"investor_name":"K Shyma","mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":16499.18,"total_units":508.44},
        {"investor_name":"M Padmapriya","mutual_fund":"SBI Small Cap Fund Regular Growth","total_amount":9999.5,"total_units":59.62},
        {"investor_name":"K Shyma","mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","total_amount":8499.58,"total_units":230.33},
        {"investor_name":"Meethala Pullutummal Narayani","mutual_fund":"DSP Nifty 50 Equal Weight Index Fund - Reg - Growth","total_amount":6499.68,"total_units":261.49},
        {"investor_name":"Meethala Pullutummal Narayani","mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","total_amount":5499.73,"total_units":149.04},
        {"investor_name":"Avinash Wadhwani","mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":5199.74,"total_units":160.24},
        {"investor_name":"Meethala Pullutummal Narayani","mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":4399.78,"total_units":135.58},
        {"investor_name":"S Vinoth Kumar","mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":2999.85,"total_units":92.44},
        {"investor_name":"Manikandan N Nepolian","mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":2999.85,"total_units":92.44},
        {"investor_name":"Nivedhitha Rajagopal","mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":2591.87,"total_units":79.87},
        {"investor_name":"Sheethal Balaji","mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":2499.88,"total_units":77.04},
        {"investor_name":"Manushia Jain","mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":2299.89,"total_units":70.87},
        {"investor_name":"Srividhya D","mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":2299.89,"total_units":70.87},
        {"investor_name":"R Sethupathy","mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","total_amount":2299.89,"total_units":70.87}
    ],
    '/fund-summary': [
        {"mutual_fund":"DSP Nifty 50 Equal Weight Index Fund - Reg - Growth","investor_name":"Meethala Pullutummal Narayani","amount":6499.68,"units":261.49},
        {"mutual_fund":"ICICI Prudential Ultra Short Term Fund - Growth","investor_name":"M Padmapriya","amount":1500.0,"units":54.46},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","investor_name":"K Shyma","amount":8499.58,"units":230.33},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","investor_name":"Meethala Pullutummal Narayani","amount":5499.73,"units":149.04},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","investor_name":"Priyavarshini Damodaran","amount":1999.9,"units":54.2},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","investor_name":"Avinash Wadhwani","amount":1949.9,"units":52.84},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","investor_name":"Shilpa J Suresh","amount":1491.93,"units":40.43},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","investor_name":"S Vinoth Kumar","amount":999.95,"units":27.1},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","investor_name":"Manikandan N Nepolian","amount":999.95,"units":27.1},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","investor_name":"Nivedhitha Rajagopal","amount":999.95,"units":27.1},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","investor_name":"R Sethupathy","amount":999.95,"units":27.1},
        {"mutual_fund":"Kotak Gold Fund - Growth (Regular Plan)","investor_name":"Srijesh","amount":979.95,"units":26.56},
        {"mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","investor_name":"K Shyma","amount":16499.18,"units":508.44},
        {"mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","investor_name":"Avinash Wadhwani","amount":5199.74,"units":160.24},
        {"mutual_fund":"Mahindra Manulife Mid Cap Fund - Regular - Growth","investor_name":"Meethala Pullutummal Narayani","amount":4399.78,"units":135.58}
    ],
    '/investors': [
        {"investor_name":"M Padmapriya","pan_number":"ANIPP0516B","total_investment":31499.5},
        {"investor_name":"K Shyma","pan_number":"ABCPS7064H","total_investment":24998.76},
        {"investor_name":"Meethala Pullutummal Narayani","pan_number":"AAEPN3766A","total_investment":16399.19},
        {"investor_name":"Avinash Wadhwani","pan_number":"ABAPW8282F","total_investment":7149.64},
        {"investor_name":"Manikandan N Nepolian","pan_number":"BHXPM3600B","total_investment":3999.80},
        {"investor_name":"S Vinoth Kumar","pan_number":"AFYPV6441F","total_investment":3999.80},
        {"investor_name":"Nivedhitha Rajagopal","pan_number":"AVNPN8269J","total_investment":3591.82},
        {"investor_name":"R Sethupathy","pan_number":"FPHPS1056H","total_investment":3299.84},
        {"investor_name":"Srijesh","pan_number":"EFBPS7950P","total_investment":2792.86},
        {"investor_name":"Sheethal Balaji","pan_number":"DCSPS9502J","total_investment":2499.88},
        {"investor_name":"Srividhya D","pan_number":"BWHPS1316K","total_investment":2299.89},
        {"investor_name":"Manushia Jain","pan_number":"BCFPJ2150L","total_investment":2299.89},
        {"investor_name":"Priyavarshini Damodaran","pan_number":"HECPD7014E","total_investment":1999.90},
        {"investor_name":"Shilpa J Suresh","pan_number":"FRSPS3248J","total_investment":1491.93},
        {"investor_name":"Anirudh D","pan_number":"CEBPD0457D","total_investment":999.95}
    ]
};

// ─────────────────────────────────────────────────────────────────
// MAIN APP CLASS
// ─────────────────────────────────────────────────────────────────
class WealthifyApp {
    constructor() {
        // Current active view
        this.currentView = 'dashboard';

        // Pagination state per view
        this.pages = {
            investorSummary: 1,
            fundSummary: 1,
            investors: 1,
            transactions: 1,
            funds: 1,
        };
        this.pageSize = 15;

        // CRUD state variables
        this.crudSearch = {
            transactions: '',
            investors: '',
            funds: ''
        };
        this.currentCrudEntity = null;
        this.currentCrudAction = null;
        this.currentCrudItemId = null;

        // Cached data for client-side sort on dashboard table
        this.dashboardData = [];
        this.dashboardSort = { col: null, dir: 'asc' };

        // Chart instances
        this.charts = {
            fundInvestment: null,
            fundUnits: null,
        };

        // Offline / Live API flags
        this.shownMockNotice = false;
        this.liveConnected = false;

        // Initialize mock lists if not present, and calculate initial mock aggregates in nested format
        if (typeof MOCK_DATA !== 'undefined') {
            const storedInvestors = localStorage.getItem('wealthify_investors');
            const storedFunds = localStorage.getItem('wealthify_funds');
            const storedTxns = localStorage.getItem('wealthify_transactions');

            // Self-healing: if stored transactions list contains old dummy data (length < 10), clear it to load full CSV dataset
            let isOldData = false;
            if (storedTxns) {
                try {
                    const parsed = JSON.parse(storedTxns);
                    if (Array.isArray(parsed) && parsed.length < 10) {
                        isOldData = true;
                    }
                } catch(e) {}
            }

            if (storedInvestors && !isOldData) {
                MOCK_DATA['/investors/list'] = JSON.parse(storedInvestors);
            } else {
                MOCK_DATA['/investors/list'] = [
                    {"id": 1, "name": "Meethala Pullutummal Narayani", "pan_number": "AAEPN3766A"},
                    {"id": 2, "name": "Shilpa J Suresh", "pan_number": "FRSPS3248J"},
                    {"id": 3, "name": "Priyavarshini Damodaran", "pan_number": "HECPD7014E"},
                    {"id": 4, "name": "Nivedhitha Rajagopal", "pan_number": "AVNPN8269J"},
                    {"id": 5, "name": "S Vinoth Kumar", "pan_number": "AFYPV6441F"},
                    {"id": 6, "name": "K Shyma", "pan_number": "ABCPS7064H"},
                    {"id": 7, "name": "Srijesh", "pan_number": "EFBPS7950P"},
                    {"id": 8, "name": "Manikandan N Nepolian", "pan_number": "BHXPM3600B"},
                    {"id": 9, "name": "Avinash Wadhwani", "pan_number": "ABAPW8282F"},
                    {"id": 10, "name": "R Sethupathy", "pan_number": "FPHPS1056H"},
                    {"id": 11, "name": "M Padmapriya", "pan_number": "ANIPP0516B"},
                    {"id": 12, "name": "Srividhya D", "pan_number": "BWHPS1316K"},
                    {"id": 13, "name": "Sheethal Balaji", "pan_number": "DCSPS9502J"},
                    {"id": 14, "name": "Anirudh D", "pan_number": "CEBPD0457D"},
                    {"id": 15, "name": "Manushia Jain", "pan_number": "BCFPJ2150L"}
                ];
                localStorage.setItem('wealthify_investors', JSON.stringify(MOCK_DATA['/investors/list']));
            }

            if (storedFunds && !isOldData) {
                MOCK_DATA['/funds/list'] = JSON.parse(storedFunds);
            } else {
                MOCK_DATA['/funds/list'] = [
                    {"id": 1, "name": "DSP Nifty 50 Equal Weight Index Fund - Reg - Growth", "amc_code": "D", "scheme_type": "Index Fund"},
                    {"id": 2, "name": "Kotak Gold Fund - Growth (Regular Plan)", "amc_code": "K", "scheme_type": "Gold FOF"},
                    {"id": 3, "name": "SBI Magnum Ultra Short Duration Fund Regular Growth", "amc_code": "L", "scheme_type": "Ultra Liquid"},
                    {"id": 4, "name": "SBI Small Cap Fund Regular Growth", "amc_code": "L", "scheme_type": "Equity(G)"},
                    {"id": 5, "name": "Mahindra Manulife Mid Cap Fund - Regular - Growth", "amc_code": "MM", "scheme_type": "Equity(G)"},
                    {"id": 6, "name": "ICICI Prudential Ultra Short Term Fund - Growth", "amc_code": "P", "scheme_type": "Ultra Liquid"}
                ];
                localStorage.setItem('wealthify_funds', JSON.stringify(MOCK_DATA['/funds/list']));
            }

            if (storedTxns && !isOldData) {
                MOCK_DATA['/transactions'] = JSON.parse(storedTxns);
            } else {
                MOCK_DATA['/transactions'] = [
                    {"id": 1, "investor_id": 1, "fund_id": 1, "transaction_date": "2025-05-27", "amount": 6499.68, "nav": 24.86, "units": 261.49, "folio_no": "10074454/92", "location": "Andheri", "tax_status": "Individual"},
                    {"id": 2, "investor_id": 2, "fund_id": 2, "transaction_date": "2025-05-27", "amount": 1491.93, "nav": 36.9, "units": 40.43, "folio_no": "16635601/85", "location": "Mumbai", "tax_status": "NRI - Non-Repatriable (NRO)"},
                    {"id": 3, "investor_id": 3, "fund_id": 2, "transaction_date": "2025-05-27", "amount": 1999.9, "nav": 36.9, "units": 54.2, "folio_no": "16675812/23", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 4, "investor_id": 4, "fund_id": 2, "transaction_date": "2025-05-27", "amount": 999.95, "nav": 36.9, "units": 27.1, "folio_no": "15160625/67", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 5, "investor_id": 5, "fund_id": 2, "transaction_date": "2025-05-27", "amount": 999.95, "nav": 36.9, "units": 27.1, "folio_no": "16453558/07", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 6, "investor_id": 6, "fund_id": 2, "transaction_date": "2025-05-27", "amount": 8499.58, "nav": 36.9, "units": 230.33, "folio_no": "14728000/82", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 7, "investor_id": 7, "fund_id": 2, "transaction_date": "2025-05-27", "amount": 979.95, "nav": 36.9, "units": 26.56, "folio_no": "14901576/50", "location": "Mumbai", "tax_status": "NRI - Repatriable (NRE)"},
                    {"id": 8, "investor_id": 8, "fund_id": 2, "transaction_date": "2025-05-27", "amount": 999.95, "nav": 36.9, "units": 27.1, "folio_no": "16639339/26", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 9, "investor_id": 1, "fund_id": 2, "transaction_date": "2025-05-27", "amount": 5499.73, "nav": 36.9, "units": 149.04, "folio_no": "16664403/09", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 10, "investor_id": 9, "fund_id": 2, "transaction_date": "2025-05-27", "amount": 1949.9, "nav": 36.9, "units": 52.84, "folio_no": "16560644/13", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 11, "investor_id": 10, "fund_id": 2, "transaction_date": "2025-05-27", "amount": 999.95, "nav": 36.9, "units": 27.1, "folio_no": "16586803/09", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 12, "investor_id": 11, "fund_id": 3, "transaction_date": "2025-05-27", "amount": 10000.0, "nav": 5942.08, "units": 1.68, "folio_no": "33964957", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 13, "investor_id": 11, "fund_id": 4, "transaction_date": "2025-05-27", "amount": 9999.5, "nav": 167.71, "units": 59.62, "folio_no": "33964957", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 14, "investor_id": 11, "fund_id": 3, "transaction_date": "2025-05-27", "amount": 10000.0, "nav": 5942.08, "units": 1.68, "folio_no": "33964957", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 15, "investor_id": 10, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 2299.89, "nav": 32.45, "units": 70.87, "folio_no": "1001627799", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 16, "investor_id": 9, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 5199.74, "nav": 32.45, "units": 160.24, "folio_no": "1001617374", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 17, "investor_id": 12, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 2299.89, "nav": 32.45, "units": 70.87, "folio_no": "1000986016", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 18, "investor_id": 6, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 16499.18, "nav": 32.45, "units": 508.44, "folio_no": "1001175551", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 19, "investor_id": 13, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 2499.88, "nav": 32.45, "units": 77.04, "folio_no": "1001643579", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 20, "investor_id": 4, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 2591.87, "nav": 32.45, "units": 79.87, "folio_no": "1001057193", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 21, "investor_id": 14, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 999.95, "nav": 32.45, "units": 30.81, "folio_no": "1001148895", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 22, "investor_id": 15, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 2299.89, "nav": 32.45, "units": 70.87, "folio_no": "1001529402", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 23, "investor_id": 7, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 1812.91, "nav": 32.45, "units": 55.87, "folio_no": "1001041365", "location": "Mumbai", "tax_status": "Person of Indian Origin [PIO]"},
                    {"id": 24, "investor_id": 5, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 2999.85, "nav": 32.45, "units": 92.44, "folio_no": "1001567190", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 25, "investor_id": 1, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 4399.78, "nav": 32.45, "units": 135.58, "folio_no": "1001641578", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 26, "investor_id": 8, "fund_id": 5, "transaction_date": "2025-05-27", "amount": 2999.85, "nav": 32.45, "units": 92.44, "folio_no": "1001636795", "location": "Mumbai", "tax_status": "Individual"},
                    {"id": 27, "investor_id": 11, "fund_id": 6, "transaction_date": "2025-05-27", "amount": 1500.0, "nav": 27.54, "units": 54.46, "folio_no": "25944381/45", "location": "Andheri", "tax_status": "Individual"}
                ];
                localStorage.setItem('wealthify_transactions', JSON.stringify(MOCK_DATA['/transactions']));
            }
            this.recalculateMockAggregates();
        }

        this.init();
    }

    // ═════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═════════════════════════════════════════════════════════════
    init() {
        this.setupNavigation();
        this.setupMobileSidebar();
        this.setupSortableHeaders();
        this.setHeaderDate();
        this.checkApiHealth();
        this.setupCrud();
        this.loadDashboard();
    }

    // ── Header date ──────────────────────────────────────────────
    setHeaderDate() {
        const el = document.getElementById('header-date-text');
        if (el) {
            const d = new Date();
            el.textContent = d.toLocaleDateString('en-IN', {
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
            });
        }
    }

    // ── API health check ─────────────────────────────────────────
    async checkApiHealth() {
        const dot = document.getElementById('status-dot');
        const txt = document.getElementById('status-text');
        if (!dot || !txt) return;

        dot.className = 'status-dot connecting';
        txt.textContent = 'Connecting...';

        try {
            const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(5000) });
            if (res.ok) {
                dot.className = 'status-dot online';
                txt.textContent = 'API Online';
            } else {
                dot.className = 'status-dot offline';
                txt.textContent = 'API Error';
            }
        } catch {
            dot.className = 'status-dot offline';
            txt.textContent = 'API Offline';
        }
    }

    // ═════════════════════════════════════════════════════════════
    // NAVIGATION
    // ═════════════════════════════════════════════════════════════
    setupNavigation() {
        const items = document.querySelectorAll('.nav-item[data-view]');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.getAttribute('data-view');
                this.switchView(view);
                items.forEach(n => n.classList.remove('active'));
                item.classList.add('active');
                // Close mobile sidebar
                this.closeSidebar();
            });
        });
    }

    switchView(viewId) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        const target = document.getElementById(viewId);
        if (target) target.classList.add('active');
        this.currentView = viewId;

        // Update breadcrumb
        const bc = document.getElementById('breadcrumb-current');
        const labels = {
            'dashboard': 'Overview',
            'transactions': 'Transactions',
            'investors': 'All Investors',
            'funds': 'All Funds',
            'investor-summary': 'Investor Summary',
            'fund-summary': 'Fund Summary',
        };
        if (bc) bc.textContent = labels[viewId] || viewId;

        // Load data
        if (viewId === 'dashboard') this.loadDashboard();
        if (viewId === 'transactions') this.loadTransactionsList();
        if (viewId === 'investors') this.loadInvestorsList();
        if (viewId === 'funds') this.loadFundsList();
        if (viewId === 'investor-summary') this.loadInvestorSummary();
        if (viewId === 'fund-summary') this.loadFundSummary();
    }

    // ═════════════════════════════════════════════════════════════
    // MOBILE SIDEBAR
    // ═════════════════════════════════════════════════════════════
    setupMobileSidebar() {
        const ham = document.getElementById('hamburger');
        const close = document.getElementById('sidebar-close');
        const overlay = document.getElementById('sidebar-overlay');

        if (ham) ham.addEventListener('click', () => this.openSidebar());
        if (close) close.addEventListener('click', () => this.closeSidebar());
        if (overlay) overlay.addEventListener('click', () => this.closeSidebar());
    }

    openSidebar() {
        document.getElementById('sidebar')?.classList.add('open');
        document.getElementById('sidebar-overlay')?.classList.add('open');
    }

    closeSidebar() {
        document.getElementById('sidebar')?.classList.remove('open');
        document.getElementById('sidebar-overlay')?.classList.remove('open');
    }

    getThemeColors() {
        return {
            text: '#64748b',
            grid: '#bae6fd',
            bg:   '#ffffff',
        };
    }

    // ═════════════════════════════════════════════════════════════
    // SORTABLE TABLE HEADERS (dashboard overview table only)
    // ═════════════════════════════════════════════════════════════
    setupSortableHeaders() {
        document.querySelectorAll('.data-table th.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const col = th.getAttribute('data-col');
                const table = th.getAttribute('data-table');
                if (table !== 'dashboard') return;

                // Toggle direction
                if (this.dashboardSort.col === col) {
                    this.dashboardSort.dir = this.dashboardSort.dir === 'asc' ? 'desc' : 'asc';
                } else {
                    this.dashboardSort.col = col;
                    this.dashboardSort.dir = 'asc';
                }

                // Update icons
                document.querySelectorAll(`th[data-table="dashboard"]`).forEach(h => {
                    h.classList.remove('sort-asc', 'sort-desc');
                });
                th.classList.add(this.dashboardSort.dir === 'asc' ? 'sort-asc' : 'sort-desc');

                // Re-render with sorted data
                this.renderDashboardTable(this.getSortedDashboardData());
            });
        });
    }

    getSortedDashboardData() {
        const { col, dir } = this.dashboardSort;
        if (!col) return [...this.dashboardData];

        const sorted = [...this.dashboardData].sort((a, b) => {
            let va = a[col];
            let vb = b[col];
            if (typeof va === 'string') {
                va = va.toLowerCase();
                vb = vb.toLowerCase();
            }
            if (va < vb) return dir === 'asc' ? -1 : 1;
            if (va > vb) return dir === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }

    // ═════════════════════════════════════════════════════════════
    // API FETCH HELPER
    // ═════════════════════════════════════════════════════════════
    async fetchAPI(endpoint, params = {}) {
        try {
            const url = new URL(`${API_BASE}${endpoint}`, window.location.origin);
            Object.entries(params).forEach(([key, val]) => {
                if (val !== undefined && val !== null && val !== '') {
                    url.searchParams.append(key, val);
                }
            });

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            
            if (!this.liveConnected) {
                this.liveConnected = true;
                this.showToast("Connected to Live Backend API", "success");
            }
            return await res.json();
        } catch (err) {
            console.error(`API Error [${endpoint}]. Falling back to mock data:`, err);
            
            if (MOCK_DATA[endpoint]) {
                if (!this.shownMockNotice) {
                    this.shownMockNotice = true;
                    // Suppressed "Demo Mode: Loaded Offline Mock Data" toast popup
                }
                
                let mockResult = [...MOCK_DATA[endpoint]];
                
                // 1. Text search filter
                if (params.search) {
                    const q = params.search.toLowerCase();
                    mockResult = mockResult.filter(item => 
                        (item.investor_name && item.investor_name.toLowerCase().includes(q)) ||
                        (item.mutual_fund && item.mutual_fund.toLowerCase().includes(q))
                    );
                }
                
                // 2. Pagination slicing
                if (params.page && params.limit) {
                    const start = (params.page - 1) * params.limit;
                    const end = start + params.limit;
                    mockResult = mockResult.slice(start, end);
                }
                
                return mockResult;
            }
            
            this.showToast(`Failed to fetch data: ${err.message}`, 'error');
            return null;
        }
    }

    // ═════════════════════════════════════════════════════════════
    // FORMATTERS
    // ═════════════════════════════════════════════════════════════
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(amount);
    }

    formatNumber(num, decimals = 2) {
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimals,
        }).format(num);
    }

    // ═════════════════════════════════════════════════════════════
    // ANIMATED NUMBER COUNTER
    // ═════════════════════════════════════════════════════════════
    animateValue(el, endVal, isCurrency = false) {
        const duration = 600;
        const startTime = performance.now();
        const startVal = 0;

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = startVal + (endVal - startVal) * ease;

            el.textContent = isCurrency
                ? this.formatCurrency(current)
                : this.formatNumber(current);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Final exact value
                el.textContent = isCurrency
                    ? this.formatCurrency(endVal)
                    : this.formatNumber(endVal);
            }
        };

        requestAnimationFrame(step);
    }

    // ═════════════════════════════════════════════════════════════
    // SKELETON HELPERS
    // ═════════════════════════════════════════════════════════════
    showSkeleton(tbodyId, cols = 4, rows = 5) {
        const tbody = document.getElementById(tbodyId);
        if (!tbody) return;
        tbody.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            const tr = document.createElement('tr');
            tr.className = 'skeleton-row';
            tr.innerHTML = `<td colspan="${cols}"><div class="skeleton-line"></div></td>`;
            tbody.appendChild(tr);
        }
    }

    hideChartSkeleton(id) {
        const sk = document.getElementById(id);
        if (sk) sk.classList.add('hidden');
    }

    showChartSkeleton(id) {
        const sk = document.getElementById(id);
        if (sk) sk.classList.remove('hidden');
    }

    // ═════════════════════════════════════════════════════════════
    // TOAST NOTIFICATIONS
    // ═════════════════════════════════════════════════════════════
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const icons = {
            success: 'fa-check',
            error: 'fa-xmark',
            info: 'fa-info',
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon"><i class="fa-solid ${icons[type] || icons.info}"></i></div>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.closest('.toast').remove()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        container.appendChild(toast);

        // Auto-remove after 4s
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ═════════════════════════════════════════════════════════════
    // EMPTY STATE HELPER
    // ═════════════════════════════════════════════════════════════
    toggleEmpty(emptyId, show) {
        const el = document.getElementById(emptyId);
        if (!el) return;
        if (show) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    }

    // ═════════════════════════════════════════════════════════════
    // ═══  1. DASHBOARD (OVERVIEW)  ═══
    // ═════════════════════════════════════════════════════════════
    async loadDashboard() {
        const startDate = document.getElementById('dash-start-date')?.value;
        const endDate = document.getElementById('dash-end-date')?.value;

        // Show loading
        this.showSkeleton('dashboard-tbody', 4, 4);
        this.showChartSkeleton('chart-skeleton-1');
        this.showChartSkeleton('chart-skeleton-2');

        const data = await this.fetchAPI('/mutualfund-overall', {
            start_date: startDate,
            end_date: endDate,
        });

        if (data === null) return; // fetch error

        this.dashboardData = data;

        // ── Stat cards ──
        const totalInvested = data.reduce((s, r) => s + r.total_amount, 0);
        const totalUnits    = data.reduce((s, r) => s + r.total_units, 0);
        const avgNav        = totalUnits > 0 ? totalInvested / totalUnits : 0;
        const fundCount     = data.length;

        this.animateValue(document.getElementById('stat-total-invested'), totalInvested, true);
        this.animateValue(document.getElementById('stat-total-units'), totalUnits);
        this.animateValue(document.getElementById('stat-avg-nav'), avgNav, true);
        this.animateValue(document.getElementById('stat-fund-count'), fundCount);

        // ── Table ──
        this.toggleEmpty('dashboard-empty', data.length === 0);
        this.renderDashboardTable(this.getSortedDashboardData());

        // ── Charts ──
        this.renderCharts(data);
    }

    renderDashboardTable(data) {
        const tbody = document.getElementById('dashboard-tbody');
        if (!tbody) return;

        if (data.length === 0) {
            tbody.innerHTML = '';
            return;
        }

        tbody.innerHTML = data.map(r => `
            <tr>
                <td><span class="fund-tag">${this.escapeHtml(r.mutual_fund)}</span></td>
                <td class="text-right"><span class="amount-text">${this.formatCurrency(r.total_amount)}</span></td>
                <td class="text-right">${this.formatNumber(r.total_units)}</td>
                <td class="text-right">${this.formatCurrency(r.average_nav)}</td>
            </tr>
        `).join('');
    }

    renderCharts(data) {
        const fullLabels = data.map(d => d.mutual_fund);
        const truncatedLabels = data.map(d => this.truncateLabel(d.mutual_fund, 25));
        const amounts = data.map(d => d.total_amount);
        const units   = data.map(d => d.total_units);
        const colors  = this.getThemeColors();

        const chartColors = [
            '#6366f1', '#3b82f6', '#14b8a6', '#ec4899', '#f59e0b',
            '#8b5cf6', '#06b6d4', '#10b981', '#f43f5e', '#a855f7',
            '#0ea5e9', '#22c55e', '#e11d48', '#7c3aed', '#64748b',
        ];

        // ── Bar Chart ──
        if (this.charts.fundInvestment) this.charts.fundInvestment.destroy();
        const ctx1 = document.getElementById('fundInvestmentChart');
        if (ctx1) {
            this.charts.fundInvestment = new Chart(ctx1.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: fullLabels,
                    datasets: [{
                        label: 'Total Invested (₹)',
                        data: amounts,
                        backgroundColor: chartColors.slice(0, amounts.length),
                        borderRadius: 8,
                        borderSkipped: false,
                        maxBarThickness: 50,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            bottom: 30
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: colors.bg,
                            titleColor: colors.text,
                            bodyColor: colors.text,
                            borderColor: colors.grid,
                            borderWidth: 1,
                            padding: 12,
                            callbacks: {
                                label: (ctx) => ` ₹${this.formatNumber(ctx.parsed.y)}`,
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { 
                                color: colors.text, 
                                font: { size: 11 }, 
                                maxRotation: 45,
                                callback: function(val) {
                                    const label = this.getLabelForValue(val);
                                    return label.length > 18 ? label.substring(0, 18) + '…' : label;
                                }
                            },
                            grid: { display: false },
                        },
                        y: {
                            ticks: {
                                color: colors.text,
                                font: { size: 11 },
                                callback: (v) => `₹${(v / 1000).toFixed(0)}K`,
                            },
                            grid: { color: colors.grid, drawBorder: false },
                        },
                    },
                },
            });
        }
        this.hideChartSkeleton('chart-skeleton-1');

        // ── Doughnut Chart ──
        if (this.charts.fundUnits) this.charts.fundUnits.destroy();
        const ctx2 = document.getElementById('fundUnitsChart');
        if (ctx2) {
            this.charts.fundUnits = new Chart(ctx2.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: truncatedLabels,
                    datasets: [{
                        data: units,
                        backgroundColor: chartColors.slice(0, units.length),
                        borderWidth: 0,
                        hoverOffset: 8,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: colors.text,
                                padding: 14,
                                font: { size: 11 },
                                usePointStyle: true,
                                pointStyleWidth: 10,
                            },
                        },
                        tooltip: {
                            backgroundColor: colors.bg,
                            titleColor: colors.text,
                            bodyColor: colors.text,
                            borderColor: colors.grid,
                            borderWidth: 1,
                            padding: 12,
                            callbacks: {
                                title: (tooltipItems) => {
                                    const index = tooltipItems[0].dataIndex;
                                    return fullLabels[index];
                                },
                                label: (ctx) => ` ${this.formatNumber(ctx.parsed)} units`,
                            },
                        },
                    },
                },
            });
        }
        this.hideChartSkeleton('chart-skeleton-2');
    }

    resetDashboardFilters() {
        const s = document.getElementById('dash-start-date');
        const e = document.getElementById('dash-end-date');
        if (s) s.value = '';
        if (e) e.value = '';
        this.loadDashboard();
    }

    // ═════════════════════════════════════════════════════════════
    // ═══  2. INVESTOR SUMMARY  ═══
    // ═════════════════════════════════════════════════════════════
    async loadInvestorSummary() {
        const search    = document.getElementById('inv-search')?.value;
        const startDate = document.getElementById('inv-start-date')?.value;
        const endDate   = document.getElementById('inv-end-date')?.value;
        const page      = this.pages.investorSummary;

        this.showSkeleton('investor-summary-tbody', 4, 5);

        const data = await this.fetchAPI('/investor-summary', {
            search,
            start_date: startDate,
            end_date: endDate,
            page,
            limit: this.pageSize,
        });

        if (data === null) return;

        const tbody = document.getElementById('investor-summary-tbody');
        if (!tbody) return;

        this.toggleEmpty('investor-summary-empty', data.length === 0);

        if (data.length === 0) {
            tbody.innerHTML = '';
        } else {
            tbody.innerHTML = data.map((r, index) => `
                <tr class="accordion-parent-row" data-target="inv-${index}">
                    <td class="accordion-chevron-cell"><span class="accordion-chevron"><i class="fa-solid fa-chevron-right"></i></span></td>
                    <td><strong>${this.escapeHtml(r.investor_name)}</strong></td>
                    <td class="text-right"><span class="amount-text">${this.formatCurrency(r.total_amount)}</span></td>
                    <td class="text-right">${this.formatNumber(r.total_units)}</td>
                </tr>
                <tr class="nested-table-row hidden" id="inv-${index}">
                    <td colspan="4">
                        <div class="nested-table-container">
                            <table class="nested-table">
                                <thead>
                                    <tr>
                                        <th>Mutual Fund</th>
                                        <th class="text-right">Amount (₹)</th>
                                        <th class="text-right">Units</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${r.funds.map(f => `
                                        <tr>
                                            <td><span class="fund-tag">${this.escapeHtml(f.mutual_fund)}</span></td>
                                            <td class="text-right"><span class="amount-text">${this.formatCurrency(f.total_amount)}</span></td>
                                            <td class="text-right">${this.formatNumber(f.total_units)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        // Setup accordion click handlers using delegation if not already set
        if (!tbody.dataset.accordionWired) {
            tbody.dataset.accordionWired = 'true';
            tbody.addEventListener('click', (e) => {
                const parentRow = e.target.closest('.accordion-parent-row');
                if (!parentRow) return;
                
                const targetId = parentRow.dataset.target;
                const childRow = document.getElementById(targetId);
                if (childRow) {
                    const isExpanded = parentRow.classList.toggle('expanded');
                    childRow.classList.toggle('hidden', !isExpanded);
                }
            });
        }

        // Update pagination
        this.updatePagination('inv', page, data.length);

        const label = document.getElementById('inv-count-label');
        if (label) label.textContent = `Showing page ${page} · ${data.length} records`;
    }

    // ═════════════════════════════════════════════════════════════
    // ═══  3. FUND SUMMARY  ═══
    // ═════════════════════════════════════════════════════════════
    async loadFundSummary() {
        const startDate = document.getElementById('fund-start-date')?.value;
        const endDate   = document.getElementById('fund-end-date')?.value;
        const page      = this.pages.fundSummary;

        this.showSkeleton('fund-summary-tbody', 4, 5);

        const data = await this.fetchAPI('/fund-summary', {
            start_date: startDate,
            end_date: endDate,
            page,
            limit: this.pageSize,
        });

        if (data === null) return;

        const tbody = document.getElementById('fund-summary-tbody');
        if (!tbody) return;

        this.toggleEmpty('fund-summary-empty', data.length === 0);

        if (data.length === 0) {
            tbody.innerHTML = '';
        } else {
            tbody.innerHTML = data.map((r, index) => `
                <tr class="accordion-parent-row" data-target="fund-${index}">
                    <td class="accordion-chevron-cell"><span class="accordion-chevron"><i class="fa-solid fa-chevron-right"></i></span></td>
                    <td><strong>${this.escapeHtml(r.mutual_fund)}</strong></td>
                    <td class="text-right"><span class="amount-text">${this.formatCurrency(r.total_amount)}</span></td>
                    <td class="text-right">${this.formatNumber(r.total_units)}</td>
                </tr>
                <tr class="nested-table-row hidden" id="fund-${index}">
                    <td colspan="4">
                        <div class="nested-table-container">
                            <table class="nested-table">
                                <thead>
                                    <tr>
                                        <th>Investor Name</th>
                                        <th class="text-right">Amount (₹)</th>
                                        <th class="text-right">Units</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${r.investors.map(inv => `
                                        <tr>
                                            <td>${this.escapeHtml(inv.investor_name)}</td>
                                            <td class="text-right"><span class="amount-text">${this.formatCurrency(inv.amount)}</span></td>
                                            <td class="text-right">${this.formatNumber(inv.units)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        // Setup accordion click handlers using delegation if not already set
        if (!tbody.dataset.accordionWired) {
            tbody.dataset.accordionWired = 'true';
            tbody.addEventListener('click', (e) => {
                const parentRow = e.target.closest('.accordion-parent-row');
                if (!parentRow) return;
                
                const targetId = parentRow.dataset.target;
                const childRow = document.getElementById(targetId);
                if (childRow) {
                    const isExpanded = parentRow.classList.toggle('expanded');
                    childRow.classList.toggle('hidden', !isExpanded);
                }
            });
        }

        this.updatePagination('fund', page, data.length);

        const label = document.getElementById('fund-count-label');
        if (label) label.textContent = `Showing page ${page} · ${data.length} records`;
    }

    // ═════════════════════════════════════════════════════════════
    // ═══  4. ALL INVESTORS  ═══
    // ═════════════════════════════════════════════════════════════
    async loadInvestorsList() {
        const search    = document.getElementById('all-inv-search')?.value;
        const startDate = document.getElementById('all-inv-start-date')?.value;
        const endDate   = document.getElementById('all-inv-end-date')?.value;
        const page      = this.pages.investors;

        this.showSkeleton('investors-tbody', 5, 5);

        const data = await this.fetchAPI('/investors', {
            search,
            start_date: startDate,
            end_date: endDate,
            page,
            limit: this.pageSize,
        });

        if (data === null) return;

        const tbody = document.getElementById('investors-tbody');
        if (!tbody) return;

        this.toggleEmpty('investors-empty', data.length === 0);

        if (data.length === 0) {
            tbody.innerHTML = '';
        } else {
            const offset = (page - 1) * this.pageSize;
            tbody.innerHTML = data.map((r, i) => `
                <tr>
                    <td><span class="row-index">${offset + i + 1}</span></td>
                    <td><strong>${this.escapeHtml(r.investor_name)}</strong></td>
                    <td><code style="font-size:0.8rem;color:var(--text-muted)">${this.escapeHtml(r.pan_number)}</code></td>
                    <td class="text-right"><span class="amount-text">${this.formatCurrency(r.total_investment)}</span></td>
                    <td>
                        <div class="action-btn-group">
                            <button class="action-btn action-btn-edit" onclick="app.editCrudItem('investor', ${r.id})" aria-label="Edit investor">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="action-btn action-btn-delete" onclick="app.deleteCrudItem('investor', ${r.id})" aria-label="Delete investor">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        this.updatePagination('all-inv', page, data.length);

        const label = document.getElementById('all-inv-count-label');
        if (label) label.textContent = `Showing page ${page} · ${data.length} records`;
    }

    // ═════════════════════════════════════════════════════════════
    // PAGINATION HELPERS
    // ═════════════════════════════════════════════════════════════
    updatePagination(prefix, page, resultCount) {
        const prevBtn = document.getElementById(`${prefix}-prev`);
        const nextBtn = document.getElementById(`${prefix}-next`);
        const pageNum = document.getElementById(`${prefix}-page-num`);
        const pageInfo = document.getElementById(`${prefix}-page-info`);

        if (prevBtn) prevBtn.disabled = (page <= 1);
        if (nextBtn) nextBtn.disabled = (resultCount < this.pageSize);
        if (pageNum) pageNum.textContent = page;
        if (pageInfo) pageInfo.textContent = `Page ${page}`;
    }

    nextPage(viewKey) {
        // viewKey = 'investorSummary', 'fundSummary', or 'investors'
        this.pages[viewKey]++;
        this.loadViewByKey(viewKey);
    }

    prevPage(viewKey) {
        if (this.pages[viewKey] > 1) {
            this.pages[viewKey]--;
            this.loadViewByKey(viewKey);
        }
    }

    resetPageAndLoad(viewKey) {
        this.pages[viewKey] = 1;
        this.loadViewByKey(viewKey);
    }

    loadViewByKey(viewKey) {
        if (viewKey === 'investorSummary') this.loadInvestorSummary();
        if (viewKey === 'fundSummary') this.loadFundSummary();
        if (viewKey === 'investors') this.loadInvestorsList();
        if (viewKey === 'transactions') this.loadTransactionsList();
        if (viewKey === 'funds') this.loadFundsList();
    }

    // ═════════════════════════════════════════════════════════════
    // UTILITIES
    // ═════════════════════════════════════════════════════════════
    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    truncateLabel(text, max = 25) {
        if (!text) return '';
        return text.length > max ? text.substring(0, max) + '…' : text;
    }

    setupCrud() {
        // Search inputs
        document.getElementById('all-txns-search')?.addEventListener('input', (e) => {
            this.crudSearch.transactions = e.target.value;
            this.pages.transactions = 1;
            this.loadTransactionsList();
        });
        document.getElementById('all-inv-search')?.addEventListener('input', (e) => {
            this.pages.investors = 1;
            this.loadInvestorsList();
        });
        document.getElementById('all-funds-search')?.addEventListener('input', (e) => {
            this.crudSearch.funds = e.target.value;
            this.pages.funds = 1;
            this.loadFundsList();
        });

        // Modal close / cancel
        document.getElementById('crud-modal-close')?.addEventListener('click', () => this.closeCrudModal());
        document.getElementById('btn-modal-cancel')?.addEventListener('click', () => this.closeCrudModal());
        document.getElementById('btn-modal-save')?.addEventListener('click', () => this.submitCrudForm());
    }

    // ── CRUD Request Wrapper with Offline Simulation ──
    async requestAPI(endpoint, method = 'GET', body = null, params = {}) {
        try {
            const url = new URL(`${API_BASE}${endpoint}`, window.location.origin);
            Object.entries(params).forEach(([key, val]) => {
                if (val !== undefined && val !== null && val !== '') {
                    url.searchParams.append(key, val);
                }
            });

            const options = {
                method,
                headers: {
                    "Content-Type": "application/json"
                }
            };
            if (body && (method === 'POST' || method === 'PUT')) {
                options.body = JSON.stringify(body);
            }

            const res = await fetch(url, options);
            if (!res.ok) {
                const errText = await res.text().catch(() => "");
                throw new Error(`HTTP ${res.status}: ${res.statusText || errText}`);
            }
            
            if (method !== 'DELETE') {
                return await res.json();
            } else {
                return { success: true };
            }
        } catch (err) {
            console.error(`API ${method} Error [${endpoint}]. Falling back to mock CRUD:`, err);
            
            // Offline mock CRUD fallback
            return this.handleMockCRUD(endpoint, method, body, params);
        }
    }

    // ── Offline Mock CRUD Handler ──
    handleMockCRUD(endpoint, method, body, params) {
        if (!MOCK_DATA['/investors/list']) {
            MOCK_DATA['/investors/list'] = [
                { id: 1, name: "M Padmapriya", pan_number: "ANIPP0516B" },
                { id: 2, name: "K Shyma", pan_number: "ABCPS7064H" },
                { id: 3, name: "Meethala Pullutummal Narayani", pan_number: "AAEPN3766A" },
                { id: 4, name: "Avinash Wadhwani", pan_number: "ABAPW8282F" },
                { id: 5, name: "Manikandan N Nepolian", pan_number: "BHXPM3600B" },
                { id: 6, name: "S Vinoth Kumar", pan_number: "AFYPV6441F" },
                { id: 7, name: "Nivedhitha Rajagopal", pan_number: "AVNPN8269J" },
                { id: 8, name: "R Sethupathy", pan_number: "FPHPS1056H" },
                { id: 9, name: "Srijesh", pan_number: "EFBPS7950P" },
                { id: 10, name: "Sheethal Balaji", pan_number: "DCSPS9502J" }
            ];
        }
        if (!MOCK_DATA['/funds/list']) {
            MOCK_DATA['/funds/list'] = [
                { id: 1, name: "Mahindra Manulife Mid Cap Fund - Regular - Growth", amc_code: "MM", scheme_type: "Equity" },
                { id: 2, name: "Kotak Gold Fund - Growth (Regular Plan)", amc_code: "K", scheme_type: "Gold" },
                { id: 3, name: "SBI Magnum Ultra Short Duration Fund Regular Growth", amc_code: "SBI", scheme_type: "Debt" },
                { id: 4, name: "SBI Small Cap Fund Regular Growth", amc_code: "SBI", scheme_type: "Equity" },
                { id: 5, name: "DSP Nifty 50 Equal Weight Index Fund - Reg - Growth", amc_code: "DSP", scheme_type: "Equity" },
                { id: 6, name: "ICICI Prudential Ultra Short Term Fund - Growth", amc_code: "ICICI", scheme_type: "Debt" }
            ];
        }
        if (!MOCK_DATA['/transactions']) {
            MOCK_DATA['/transactions'] = [
                { id: 1, investor_id: 1, fund_id: 3, transaction_date: "2025-05-27", amount: 20000.0, nav: 5952.38, units: 3.36, folio_no: "50100", location: "Mumbai", tax_status: "Individual" },
                { id: 2, investor_id: 2, fund_id: 1, transaction_date: "2025-05-27", amount: 16499.18, nav: 32.45, units: 508.44, folio_no: "50200", location: "Mumbai", tax_status: "Individual" },
                { id: 3, investor_id: 1, fund_id: 4, transaction_date: "2025-05-27", amount: 9999.5, nav: 167.72, units: 59.62, folio_no: "50300", location: "Mumbai", tax_status: "Individual" },
                { id: 4, investor_id: 2, fund_id: 2, transaction_date: "2025-05-27", amount: 8499.58, nav: 36.90, units: 230.33, folio_no: "50400", location: "Mumbai", tax_status: "Individual" }
            ];
        }

        const isListRequest = method === 'GET';
        const parts = endpoint.split('/');
        const hasId = parts.length > 2 && !isNaN(parseInt(parts[parts.length - 1]));
        const entityId = hasId ? parseInt(parts[parts.length - 1]) : null;
        const baseEndpoint = hasId ? '/' + parts.slice(1, parts.length - 1).join('/') : endpoint;

        // GET
        if (isListRequest) {
            let data = MOCK_DATA[baseEndpoint] || [];
            if (hasId) {
                return data.find(item => item.id === entityId) || null;
            }
            
            if (params.search) {
                const q = params.search.toLowerCase();
                if (baseEndpoint === '/investors/list') {
                    data = data.filter(i => i.name.toLowerCase().includes(q) || i.pan_number.toLowerCase().includes(q));
                } else if (baseEndpoint === '/funds/list') {
                    data = data.filter(f => f.name.toLowerCase().includes(q) || (f.amc_code && f.amc_code.toLowerCase().includes(q)));
                } else if (baseEndpoint === '/transactions') {
                    data = data.filter(t => {
                        const inv = MOCK_DATA['/investors/list'].find(i => i.id === t.investor_id);
                        const fnd = MOCK_DATA['/funds/list'].find(f => f.id === t.fund_id);
                        return (inv && inv.name.toLowerCase().includes(q)) || (fnd && fnd.name.toLowerCase().includes(q));
                    });
                }
            }

            const page = parseInt(params.page) || 1;
            const limit = parseInt(params.limit) || 10;
            const start = (page - 1) * limit;
            return data.slice(start, start + limit);
        }

        // POST
        if (method === 'POST') {
            const data = MOCK_DATA[baseEndpoint] || [];
            const nextId = data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1;
            const newObj = { id: nextId, ...body };
            data.push(newObj);
            MOCK_DATA[baseEndpoint] = data;

            if (baseEndpoint === '/investors/list') localStorage.setItem('wealthify_investors', JSON.stringify(data));
            if (baseEndpoint === '/funds/list') localStorage.setItem('wealthify_funds', JSON.stringify(data));
            if (baseEndpoint === '/transactions') localStorage.setItem('wealthify_transactions', JSON.stringify(data));
            
            this.recalculateMockAggregates();
            return newObj;
        }

        // PUT
        if (method === 'PUT') {
            const data = MOCK_DATA[baseEndpoint] || [];
            const index = data.findIndex(item => item.id === entityId);
            if (index !== -1) {
                data[index] = { ...data[index], ...body };
                MOCK_DATA[baseEndpoint] = data;

                if (baseEndpoint === '/investors/list') localStorage.setItem('wealthify_investors', JSON.stringify(data));
                if (baseEndpoint === '/funds/list') localStorage.setItem('wealthify_funds', JSON.stringify(data));
                if (baseEndpoint === '/transactions') localStorage.setItem('wealthify_transactions', JSON.stringify(data));

                this.recalculateMockAggregates();
                return data[index];
            }
            throw new Error(`Item ${entityId} not found`);
        }

        // DELETE
        if (method === 'DELETE') {
            const data = MOCK_DATA[baseEndpoint] || [];
            const index = data.findIndex(item => item.id === entityId);
            if (index !== -1) {
                data.splice(index, 1);
                MOCK_DATA[baseEndpoint] = data;

                if (baseEndpoint === '/investors/list') {
                    MOCK_DATA['/transactions'] = MOCK_DATA['/transactions'].filter(t => t.investor_id !== entityId);
                    localStorage.setItem('wealthify_transactions', JSON.stringify(MOCK_DATA['/transactions']));
                    localStorage.setItem('wealthify_investors', JSON.stringify(data));
                } else if (baseEndpoint === '/funds/list') {
                    MOCK_DATA['/transactions'] = MOCK_DATA['/transactions'].filter(t => t.fund_id !== entityId);
                    localStorage.setItem('wealthify_transactions', JSON.stringify(MOCK_DATA['/transactions']));
                    localStorage.setItem('wealthify_funds', JSON.stringify(data));
                } else if (baseEndpoint === '/transactions') {
                    localStorage.setItem('wealthify_transactions', JSON.stringify(data));
                }
                
                this.recalculateMockAggregates();
                return { success: true };
            }
            throw new Error(`Item ${entityId} not found`);
        }
    }

    recalculateMockAggregates() {
        const txns = MOCK_DATA['/transactions'] || [];
        const investorsList = MOCK_DATA['/investors/list'] || [];
        const fundsList = MOCK_DATA['/funds/list'] || [];

        // 1. Investor Summary (Nested)
        const invSumMap = {};
        txns.forEach(t => {
            const inv = investorsList.find(i => i.id === t.investor_id);
            const fnd = fundsList.find(f => f.id === t.fund_id);
            if (inv && fnd) {
                if (!invSumMap[inv.name]) {
                    invSumMap[inv.name] = {
                        investor_name: inv.name,
                        total_amount: 0,
                        total_units: 0,
                        fundsMap: {}
                    };
                }
                const invData = invSumMap[inv.name];
                invData.total_amount += t.amount;
                invData.total_units += t.units;

                if (!invData.fundsMap[fnd.name]) {
                    invData.fundsMap[fnd.name] = {
                        mutual_fund: fnd.name,
                        total_amount: 0,
                        total_units: 0
                    };
                }
                invData.fundsMap[fnd.name].total_amount += t.amount;
                invData.fundsMap[fnd.name].total_units += t.units;
            }
        });
        MOCK_DATA['/investor-summary'] = Object.values(invSumMap).map(invData => {
            const funds = Object.values(invData.fundsMap);
            delete invData.fundsMap;
            invData.funds = funds;
            return invData;
        }).sort((a, b) => b.total_amount - a.total_amount);

        // 2. Fund Summary (Nested)
        const fundSumMap = {};
        txns.forEach(t => {
            const inv = investorsList.find(i => i.id === t.investor_id);
            const fnd = fundsList.find(f => f.id === t.fund_id);
            if (inv && fnd) {
                if (!fundSumMap[fnd.name]) {
                    fundSumMap[fnd.name] = {
                        mutual_fund: fnd.name,
                        total_amount: 0,
                        total_units: 0,
                        investorsMap: {}
                    };
                }
                const fundData = fundSumMap[fnd.name];
                fundData.total_amount += t.amount;
                fundData.total_units += t.units;

                if (!fundData.investorsMap[inv.name]) {
                    fundData.investorsMap[inv.name] = {
                        investor_name: inv.name,
                        amount: 0,
                        units: 0
                    };
                }
                fundData.investorsMap[inv.name].amount += t.amount;
                fundData.investorsMap[inv.name].units += t.units;
            }
        });
        MOCK_DATA['/fund-summary'] = Object.values(fundSumMap).map(fundData => {
            const investors = Object.values(fundData.investorsMap);
            delete fundData.investorsMap;
            fundData.investors = investors;
            return fundData;
        }).sort((a, b) => a.mutual_fund.localeCompare(b.mutual_fund));

        const invMap = {};
        txns.forEach(t => {
            const inv = investorsList.find(i => i.id === t.investor_id);
            if (inv) {
                if (!invMap[inv.name]) {
                    invMap[inv.name] = { id: inv.id, investor_name: inv.name, pan_number: inv.pan_number, total_investment: 0 };
                }
                invMap[inv.name].total_investment += t.amount;
            }
        });
        investorsList.forEach(inv => {
            if (!invMap[inv.name]) {
                invMap[inv.name] = { id: inv.id, investor_name: inv.name, pan_number: inv.pan_number, total_investment: 0 };
            }
        });
        MOCK_DATA['/investors'] = Object.values(invMap);

        const fndMap = {};
        txns.forEach(t => {
            const fnd = fundsList.find(f => f.id === t.fund_id);
            if (fnd) {
                if (!fndMap[fnd.name]) {
                    fndMap[fnd.name] = { mutual_fund: fnd.name, total_amount: 0, total_units: 0, average_nav: 0 };
                }
                fndMap[fnd.name].total_amount += t.amount;
                fndMap[fnd.name].total_units += t.units;
            }
        });
        fundsList.forEach(fnd => {
            if (!fndMap[fnd.name]) {
                fndMap[fnd.name] = { mutual_fund: fnd.name, total_amount: 0, total_units: 0, average_nav: 0 };
            }
        });
        Object.values(fndMap).forEach(f => {
            f.average_nav = f.total_units > 0 ? (f.total_amount / f.total_units) : 0;
        });
        MOCK_DATA['/mutualfund-overall'] = Object.values(fndMap);
    }

    // ── CRUD View Fetch & Renderers ──
    async loadTransactionsList() {
        const tbody = document.getElementById('transactions-tbody');
        if (!tbody) return;

        this.showSkeleton('transactions-tbody', 8, 5);

        try {
            const search = document.getElementById('all-txns-search')?.value || '';
            const page = this.pages.transactions;
            const data = await this.fetchAPI('/transactions', {
                search,
                page,
                limit: this.pageSize
            }) || [];

            this.toggleEmpty('transactions-empty', data.length === 0);

            if (data.length === 0) {
                tbody.innerHTML = '';
            } else {
                const allInv = await this.requestAPI('/investors/list', 'GET', null, { limit: 100 }) || [];
                const allFunds = await this.requestAPI('/funds/list', 'GET', null, { limit: 100 }) || [];

                const invMap = {};
                allInv.forEach(i => invMap[i.id] = i.name);
                const fundMap = {};
                allFunds.forEach(f => fundMap[f.id] = f.name);

                tbody.innerHTML = data.map(t => {
                    const invName = invMap[t.investor_id] || `Investor #${t.investor_id}`;
                    const fundName = fundMap[t.fund_id] || `Fund #${t.fund_id}`;
                    return `
                        <tr>
                            <td><span class="row-index">${t.id}</span></td>
                            <td><strong>${this.escapeHtml(invName)}</strong></td>
                            <td><span class="fund-tag">${this.escapeHtml(fundName)}</span></td>
                            <td>${t.transaction_date}</td>
                            <td class="text-right amount-text">${this.formatCurrency(t.amount)}</td>
                            <td class="text-right">${this.formatNumber(t.nav)}</td>
                            <td class="text-right">${this.formatNumber(t.units)}</td>
                            <td>
                                <div class="action-btn-group">
                                    <button class="action-btn action-btn-edit" onclick="app.editCrudItem('transaction', ${t.id})" aria-label="Edit transaction">
                                        <i class="fa-solid fa-pen"></i>
                                    </button>
                                    <button class="action-btn action-btn-delete" onclick="app.deleteCrudItem('transaction', ${t.id})" aria-label="Delete transaction">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `;
                }).join('');
            }

            this.updatePagination('all-txns', page, data.length);
        } catch (e) {
            tbody.innerHTML = `<tr><td colspan="8" class="table-empty">Error loading transactions: ${e.message}</td></tr>`;
        }
    }

    async loadFundsList() {
        const tbody = document.getElementById('funds-tbody');
        if (!tbody) return;

        this.showSkeleton('funds-tbody', 5, 5);

        try {
            const search = document.getElementById('all-funds-search')?.value || '';
            const page = this.pages.funds;
            const data = await this.fetchAPI('/funds/list', {
                search,
                page,
                limit: this.pageSize
            }) || [];

            this.toggleEmpty('funds-empty', data.length === 0);

            if (data.length === 0) {
                tbody.innerHTML = '';
            } else {
                tbody.innerHTML = data.map(f => `
                    <tr>
                        <td><span class="row-index">${f.id}</span></td>
                        <td><strong>${this.escapeHtml(f.name)}</strong></td>
                        <td><span class="fund-tag">${this.escapeHtml(f.amc_code || 'N/A')}</span></td>
                        <td>${this.escapeHtml(f.scheme_type || 'N/A')}</td>
                        <td>
                            <div class="action-btn-group">
                                <button class="action-btn action-btn-edit" onclick="app.editCrudItem('fund', ${f.id})" aria-label="Edit fund">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button class="action-btn action-btn-delete" onclick="app.deleteCrudItem('fund', ${f.id})" aria-label="Delete fund">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }

            this.updatePagination('all-funds', page, data.length);
        } catch (e) {
            tbody.innerHTML = `<tr><td colspan="5" class="table-empty">Error loading funds: ${e.message}</td></tr>`;
        }
    }

    renderPagination(containerId, currentPage, totalPages, onPageChange) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (totalPages <= 1) {
            container.innerHTML = '';
            container.style.display = 'none';
            return;
        }
        container.style.display = 'flex';

        let btnGroupHtml = '';
        for (let i = 1; i <= totalPages; i++) {
            btnGroupHtml += `
                <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }

        container.innerHTML = `
            <span>Page ${currentPage} of ${totalPages}</span>
            <div class="pagination-btn-group">
                <button class="pagination-btn" id="${containerId}-prev" ${currentPage === 1 ? 'disabled' : ''}>
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                ${btnGroupHtml}
                <button class="pagination-btn" id="${containerId}-next" ${currentPage === totalPages ? 'disabled' : ''}>
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        `;

        container.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetBtn = e.currentTarget;
                if (targetBtn.disabled) return;
                
                let targetPage = currentPage;
                const pageAttr = targetBtn.getAttribute('data-page');
                if (pageAttr) {
                    targetPage = parseInt(pageAttr);
                } else if (targetBtn.id.includes('-prev')) {
                    targetPage = currentPage - 1;
                } else if (targetBtn.id.includes('-next')) {
                    targetPage = currentPage + 1;
                }
                
                onPageChange(targetPage);
            });
        });
    }

    // ── Form Modal Dialog Controllers ──
    async openCrudModal(entity, action, itemId = null) {
        this.currentCrudEntity = entity;
        this.currentCrudAction = action;
        this.currentCrudItemId = itemId;

        const titleEl = document.getElementById('crud-modal-title');
        const formEl = document.getElementById('crud-form');
        const overlay = document.getElementById('crud-modal-overlay');

        if (!titleEl || !formEl || !overlay) return;

        titleEl.textContent = `${action === 'add' ? 'Add' : 'Edit'} ${entity.charAt(0).toUpperCase() + entity.slice(1)}`;
        formEl.innerHTML = '<p class="text-muted">Loading form...</p>';
        overlay.classList.add('active');

        try {
            let fieldsHtml = '';
            let itemData = null;

            if (action === 'edit' && itemId) {
                const endpoint = entity === 'transaction' ? `/transactions/${itemId}` : (entity === 'investor' ? `/investors/${itemId}` : `/funds/${itemId}`);
                itemData = await this.requestAPI(endpoint, 'GET');
            }

            if (entity === 'investor') {
                fieldsHtml = `
                    <div class="form-group">
                        <label class="form-label" for="inv-name-field">Investor Name</label>
                        <input type="text" id="inv-name-field" class="form-input" required value="${itemData ? this.escapeHtml(itemData.name) : ''}" placeholder="Enter full name">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="inv-pan-field">PAN Number</label>
                        <input type="text" id="inv-pan-field" class="form-input" required value="${itemData ? this.escapeHtml(itemData.pan_number) : ''}" placeholder="Enter 10-digit PAN">
                    </div>
                `;
            } else if (entity === 'fund') {
                fieldsHtml = `
                    <div class="form-group">
                        <label class="form-label" for="fund-name-field">Mutual Fund Name</label>
                        <input type="text" id="fund-name-field" class="form-input" required value="${itemData ? this.escapeHtml(itemData.name) : ''}" placeholder="Enter scheme name">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="fund-amc-field">AMC Code</label>
                        <input type="text" id="fund-amc-field" class="form-input" value="${itemData && itemData.amc_code ? this.escapeHtml(itemData.amc_code) : ''}" placeholder="e.g. AXIS, KOTAK">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="fund-type-field">Scheme Type</label>
                        <input type="text" id="fund-type-field" class="form-input" value="${itemData && itemData.scheme_type ? this.escapeHtml(itemData.scheme_type) : ''}" placeholder="e.g. Equity, Debt, Gold">
                    </div>
                `;
            } else if (entity === 'transaction') {
                const allInv = await this.requestAPI('/investors/list', 'GET', null, { limit: 100 }) || [];
                const allFunds = await this.requestAPI('/funds/list', 'GET', null, { limit: 100 }) || [];

                const investorOptions = allInv.map(i => `
                    <option value="${i.id}" ${itemData && itemData.investor_id === i.id ? 'selected' : ''}>
                        ${this.escapeHtml(i.name)} (${i.pan_number})
                    </option>
                `).join('');

                const fundOptions = allFunds.map(f => `
                    <option value="${f.id}" ${itemData && itemData.fund_id === f.id ? 'selected' : ''}>
                        ${this.escapeHtml(f.name)}
                    </option>
                `).join('');

                fieldsHtml = `
                    <div class="form-group">
                        <label class="form-label" for="txn-investor-field">Investor</label>
                        <select id="txn-investor-field" class="form-select" required>
                            <option value="">-- Select Investor --</option>
                            ${investorOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="txn-fund-field">Mutual Fund</label>
                        <select id="txn-fund-field" class="form-select" required>
                            <option value="">-- Select Mutual Fund --</option>
                            ${fundOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="txn-date-field">Transaction Date</label>
                        <input type="date" id="txn-date-field" class="form-input" required value="${itemData ? itemData.transaction_date : new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="txn-amount-field">Amount (₹)</label>
                        <input type="number" step="0.01" id="txn-amount-field" class="form-input" required value="${itemData ? itemData.amount : ''}" placeholder="0.00">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="txn-nav-field">NAV (₹)</label>
                        <input type="number" step="0.0001" id="txn-nav-field" class="form-input" required value="${itemData ? itemData.nav : ''}" placeholder="0.0000">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="txn-units-field">Units</label>
                        <input type="number" step="0.0001" id="txn-units-field" class="form-input" required value="${itemData ? itemData.units : ''}" placeholder="0.0000">
                    </div>
                `;
            }

            formEl.innerHTML = fieldsHtml;

            if (entity === 'transaction') {
                const amt = document.getElementById('txn-amount-field');
                const nav = document.getElementById('txn-nav-field');
                const units = document.getElementById('txn-units-field');
                
                const recalc = () => {
                    const a = parseFloat(amt.value) || 0;
                    const n = parseFloat(nav.value) || 0;
                    if (n > 0) {
                        units.value = (a / n).toFixed(4);
                    }
                };
                
                amt?.addEventListener('input', recalc);
                nav?.addEventListener('input', recalc);
            }

        } catch (e) {
            formEl.innerHTML = `<p class="text-danger">Failed to load form: ${e.message}</p>`;
        }
    }

    async submitCrudForm() {
        const entity = this.currentCrudEntity;
        const action = this.currentCrudAction;
        const itemId = this.currentCrudItemId;

        const form = document.getElementById('crud-form');
        if (!form) return;

        const inputs = form.querySelectorAll('[required]');
        for (let input of inputs) {
            if (!input.value.trim()) {
                this.showToast(`Please fill out all required fields`, 'error');
                input.focus();
                return;
            }
        }

        let body = {};
        let endpoint = '';

        if (entity === 'investor') {
            body = {
                name: document.getElementById('inv-name-field').value.trim(),
                pan_number: document.getElementById('inv-pan-field').value.trim()
            };
            endpoint = action === 'add' ? '/investors' : `/investors/${itemId}`;
        } else if (entity === 'fund') {
            body = {
                name: document.getElementById('fund-name-field').value.trim(),
                amc_code: document.getElementById('fund-amc-field').value.trim() || null,
                scheme_type: document.getElementById('fund-type-field').value.trim() || null
            };
            endpoint = action === 'add' ? '/funds' : `/funds/${itemId}`;
        } else if (entity === 'transaction') {
            body = {
                investor_id: parseInt(document.getElementById('txn-investor-field').value),
                fund_id: parseInt(document.getElementById('txn-fund-field').value),
                transaction_date: document.getElementById('txn-date-field').value,
                amount: parseFloat(document.getElementById('txn-amount-field').value),
                nav: parseFloat(document.getElementById('txn-nav-field').value),
                units: parseFloat(document.getElementById('txn-units-field').value)
            };
            endpoint = action === 'add' ? '/transactions' : `/transactions/${itemId}`;
        }

        const method = action === 'add' ? 'POST' : 'PUT';

        try {
            await this.requestAPI(endpoint, method, body);
            this.showToast(`${entity.charAt(0).toUpperCase() + entity.slice(1)} ${action === 'add' ? 'created' : 'updated'} successfully!`, 'success');
            this.closeCrudModal();
            this.loadViewByKey(this.currentView);
            this.loadDashboard();
        } catch (e) {
            this.showToast(`Operation failed: ${e.message}`, 'error');
        }
    }

    closeCrudModal() {
        const overlay = document.getElementById('crud-modal-overlay');
        if (overlay) overlay.classList.remove('active');
        this.currentCrudItemId = null;
    }

    editCrudItem(entity, id) {
        this.openCrudModal(entity, 'edit', id);
    }

    async deleteCrudItem(entity, id) {
        const confirmMsg = `Are you sure you want to delete this ${entity}? All linked records will be cascade deleted.`;
        if (!confirm(confirmMsg)) return;

        const endpoint = entity === 'transaction' ? `/transactions/${id}` : (entity === 'investor' ? `/investors/${id}` : `/funds/${id}`);

        try {
            await this.requestAPI(endpoint, 'DELETE');
            this.showToast(`${entity.charAt(0).toUpperCase() + entity.slice(1)} deleted successfully!`, 'success');
            this.loadViewByKey(this.currentView);
            this.loadDashboard();
        } catch (e) {
            this.showToast(`Delete failed: ${e.message}`, 'error');
        }
    }
}

// ─────────────────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────────────────
const app = new WealthifyApp();
