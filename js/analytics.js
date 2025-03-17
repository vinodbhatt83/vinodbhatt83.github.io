// Analytics JavaScript for INVEST PLATFORM

document.addEventListener('DOMContentLoaded', function () {
    // Initialize filter controls
    initFilters();

    // Initialize chart controls
    initChartControls();

    // Initialize table sorting
    initTableSorting();

    // Initialize export button
    initExportButton();
});

// Initialize filters
function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-bar .filter-select');

    filterSelects.forEach(select => {
        select.addEventListener('change', function () {
            const filterType = this.id;
            const filterValue = this.value;

            // In a real application, this would filter the data
            //showNotification(`Filtering data by ${filterType}: ${filterValue}`, 'info');

            // Update charts and tables based on filter
            updateVisualizations();
        });
    });
}

// Initialize chart controls
function initChartControls() {
    const metricSelect = document.querySelector('#trend-metric');
    const marketSelect = document.querySelector('#trend-market');

    if (metricSelect) {
        metricSelect.addEventListener('change', function () {
            const metric = this.value;

            // In a real application, this would update the chart
            //showNotification(`Updating chart to show ${metric} trend`, 'info');

            // Update chart visualization
            updateTrendChart(metric);
        });
    }

    if (marketSelect) {
        marketSelect.addEventListener('change', function () {
            const market = this.value;

            // In a real application, this would update the chart
            //showNotification(`Updating chart to show data for ${market}`, 'info');

            // Update chart visualization
            updateTrendChart(null, market);
        });
    }
}

// Initialize table sorting
function initTableSorting() {
    const tableHeaders = document.querySelectorAll('.market-table th');

    tableHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const columnIndex = Array.from(this.parentNode.children).indexOf(this);
            const table = this.closest('table');

            // Toggle sort direction
            const currentDirection = this.getAttribute('data-sort-direction') || 'none';
            let newDirection = 'asc';

            if (currentDirection === 'asc') {
                newDirection = 'desc';
            } else if (currentDirection === 'desc') {
                newDirection = 'asc';
            }

            // Reset all headers
            tableHeaders.forEach(h => {
                h.removeAttribute('data-sort-direction');
                h.classList.remove('sorted-asc', 'sorted-desc');
            });

            // Set this header's sort direction
            this.setAttribute('data-sort-direction', newDirection);
            this.classList.add(`sorted-${newDirection}`);

            // In a real application, this would sort the table
            //showNotification(`Sorting table by ${this.textContent} (${newDirection === 'asc' ? 'Ascending' : 'Descending'})`, 'info');

            // Sort the table
            sortTable(table, columnIndex, newDirection);
        });
    });
}

// Sort table function
function sortTable(table, columnIndex, direction) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Sort the rows
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        // Try to parse as numbers if possible
        const numA = parseFloat(cellA.replace(/[^0-9.-]+/g, ''));
        const numB = parseFloat(cellB.replace(/[^0-9.-]+/g, ''));

        if (!isNaN(numA) && !isNaN(numB)) {
            return direction === 'asc' ? numA - numB : numB - numA;
        } else {
            return direction === 'asc' ?
                cellA.localeCompare(cellB) :
                cellB.localeCompare(cellA);
        }
    });

    // Remove all existing rows
    rows.forEach(row => row.remove());

    // Add sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

// Initialize export button
function initExportButton() {
    const exportButton = document.querySelector('.page-actions .btn-primary');

    if (exportButton) {
        exportButton.addEventListener('click', function () {
            //showNotification('Preparing to export analytics report...', 'info');

            // Simulate export delay
            setTimeout(() => {
                //showNotification('Analytics report exported successfully!', 'success');
            }, 1500);
        });
    }
}

// Update visualizations based on filters
function updateVisualizations() {
    const timePeriod = document.querySelector('#time-period').value;
    const market = document.querySelector('#market-filter').value;
    const propertyType = document.querySelector('#property-type-filter').value;

    // Simulate chart updates with slight delay to show loading
    // In a real app, this would fetch and update data
    setTimeout(() => {
        //showNotification('Visualizations updated with new filter criteria', 'success');
    }, 800);
}

// Update trend chart with new parameters
function updateTrendChart(metric, market) {
    metric = metric || document.querySelector('#trend-metric').value;
    market = market || document.querySelector('#trend-market').value;

    // In a real application, this would update the chart
    // For now, just log the parameters
    console.log(`Updating trend chart: metric=${metric}, market=${market}`);

    // Simulate chart update delay
    setTimeout(() => {
        //showNotification('Chart updated successfully', 'success');
    }, 500);
}

// Format currency values
function formatCurrency(value) {
    return '$' + value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

// Format percentage values
function formatPercentage(value) {
    return value.toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }) + '%';
}