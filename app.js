/* ═══════════════════════════════════════════════════════════════
   WEALTHIFY — app.js
   Pure JavaScript dashboard — connects to FastAPI backend
   ═══════════════════════════════════════════════════════════════ */

const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? '/api'
    : 'http://localhost:8000/api';

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
        };
        this.pageSize = 15;

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
            'investor-summary': 'Investor Summary',
            'fund-summary': 'Fund Summary',
            'investors': 'All Investors',
        };
        if (bc) bc.textContent = labels[viewId] || viewId;

        // Load data
        if (viewId === 'dashboard') this.loadDashboard();
        if (viewId === 'investor-summary') this.loadInvestorSummary();
        if (viewId === 'fund-summary') this.loadFundSummary();
        if (viewId === 'investors') this.loadInvestorsList();
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
                    this.showToast("Demo Mode: Loaded Offline Mock Data", "info");
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
                                    return label.length > 25 ? label.substring(0, 25) + '…' : label;
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
            tbody.innerHTML = data.map(r => `
                <tr>
                    <td>${this.escapeHtml(r.investor_name)}</td>
                    <td><span class="fund-tag">${this.escapeHtml(r.mutual_fund)}</span></td>
                    <td class="text-right"><span class="amount-text">${this.formatCurrency(r.total_amount)}</span></td>
                    <td class="text-right">${this.formatNumber(r.total_units)}</td>
                </tr>
            `).join('');
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
            tbody.innerHTML = data.map(r => `
                <tr>
                    <td><span class="fund-tag">${this.escapeHtml(r.mutual_fund)}</span></td>
                    <td>${this.escapeHtml(r.investor_name)}</td>
                    <td class="text-right"><span class="amount-text">${this.formatCurrency(r.amount)}</span></td>
                    <td class="text-right">${this.formatNumber(r.units)}</td>
                </tr>
            `).join('');
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

        this.showSkeleton('investors-tbody', 4, 5);

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
                    <td>${this.escapeHtml(r.investor_name)}</td>
                    <td><code style="font-size:0.8rem;color:var(--text-muted)">${this.escapeHtml(r.pan_number)}</code></td>
                    <td class="text-right"><span class="amount-text">${this.formatCurrency(r.total_investment)}</span></td>
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
}

// ─────────────────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────────────────
const app = new WealthifyApp();
