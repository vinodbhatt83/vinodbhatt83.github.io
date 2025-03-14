// Property Analysis JavaScript for INVEST PLATFORM

document.addEventListener('DOMContentLoaded', function () {
    // Initialize tabs
    initPropertyTabs();

    // Initialize chart controls
    initChartControls();

    // Initialize competitive set table
    initCompTable();

    // Add event listeners for action buttons
    initActionButtons();
});

// Initialize property tabs
function initPropertyTabs() {
    const tabs = document.querySelectorAll('.property-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // In a real application, this would show the corresponding tab content
            const tabName = this.textContent.trim();
            showNotification(`${tabName} tab selected. Content for this tab will be available in the next release.`, 'info');
        });
    });
}

// Initialize chart controls
function initChartControls() {
    const timeSelect = document.querySelector('#time-period');
    const metricSelect = document.querySelector('#metric-select');
    const comparisonSelect = document.querySelector('#comparison-select');

    if (timeSelect) {
        timeSelect.addEventListener('change', updateChart);
    }

    if (metricSelect) {
        metricSelect.addEventListener('change', updateChart);
    }

    if (comparisonSelect) {
        comparisonSelect.addEventListener('change', updateChart);
    }

    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Exporting chart data...', 'info');

            // Simulate export delay
            setTimeout(() => {
                showNotification('Chart data exported successfully!', 'success');
            }, 1500);
        });
    }
}

// Update chart based on selections
function updateChart() {
    // This would normally update the chart with new data
    // For the prototype, we'll just show a notification
    showNotification('Chart updated with new parameters', 'info');
}

// Initialize competitive set table
function initCompTable() {
    const editCompSetBtn = document.querySelector('.edit-comp-set');

    if (editCompSetBtn) {
        editCompSetBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Edit competitive set feature will be available in the next release.', 'info');
        });
    }

    // Add sorting to table headers
    const tableHeaders = document.querySelectorAll('.comp-table th');

    tableHeaders.forEach(header => {
        if (header.getAttribute('data-sortable') !== 'false') {
            header.classList.add('sortable');
            header.addEventListener('click', function () {
                sortTable(this);
            });
        }
    });
}

// Sort table based on clicked header
function sortTable(header) {
    const table = header.closest('table');
    const index = Array.from(header.parentNode.children).indexOf(header);
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const isNumeric = header.getAttribute('data-type') === 'numeric';
    const isAscending = header.getAttribute('data-order') !== 'asc';

    // Update sort direction
    table.querySelectorAll('th').forEach(th => {
        th.removeAttribute('data-order');
    });

    header.setAttribute('data-order', isAscending ? 'asc' : 'desc');

    // In a real application, this would sort the table rows
    showNotification(`Table sorted by ${header.textContent.trim()} (${isAscending ? 'Ascending' : 'Descending'})`, 'info');
}

// Initialize action buttons
function initActionButtons() {
    const actionsBtn = document.querySelector('.page-actions .btn');

    if (actionsBtn) {
        actionsBtn.addEventListener('click', function () {
            showNotification('Actions menu will be available in the next release.', 'info');
        });
    }

    const viewLinks = document.querySelectorAll('.view-all-metrics, .view-full-analysis, .view-financial-detail, .view-full-market-analysis, .view-all-documents');

    viewLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const featureName = this.textContent.trim();
            showNotification(`${featureName} feature will be available in the next release.`, 'info');
        });
    });

    const mapLink = document.querySelector('.map-link');

    if (mapLink) {
        mapLink.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Map view will be available in the next release.', 'info');
        });
    }
}