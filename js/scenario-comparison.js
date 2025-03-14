// scenario-comparison.js

document.addEventListener('DOMContentLoaded', function () {
    // Scenario selection
    const baselineSelect = document.getElementById('baseline-scenario');
    const comparisonSelect = document.getElementById('comparison-scenario');

    // View toggles
    const viewButtons = document.querySelectorAll('.view-btn');

    // Chart metric selector
    const performanceMetricSelect = document.getElementById('performance-metric');

    // Sensitivity analysis selectors
    const sensitivityVarsSelect = document.getElementById('sensitivity-vars');
    const sensitivityMetricSelect = document.getElementById('sensitivity-metric');

    // Action buttons
    const exportBtn = document.querySelector('.page-actions .btn-primary');
    const backBtn = document.querySelector('.page-actions .btn-secondary');
    const createScenarioBtn = document.querySelector('.action-bar .btn-secondary');
    const applyBtn = document.querySelector('.action-bar .btn-primary');

    // Initialize UI and attach event listeners
    initializeUI();

    function initializeUI() {
        // View toggle functionality
        viewButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all buttons
                viewButtons.forEach(b => b.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Update view
                updateView(this.getAttribute('data-view'));
            });
        });

        // Scenario selection change events
        baselineSelect.addEventListener('change', updateScenarioComparison);
        comparisonSelect.addEventListener('change', updateScenarioComparison);

        // Performance metric change
        performanceMetricSelect.addEventListener('change', updatePerformanceChart);

        // Sensitivity analysis change events
        sensitivityVarsSelect.addEventListener('change', updateSensitivityAnalysis);
        sensitivityMetricSelect.addEventListener('change', updateSensitivityAnalysis);

        // Button click events
        if (exportBtn) {
            exportBtn.addEventListener('click', exportToExcel);
        }

        if (backBtn) {
            backBtn.addEventListener('click', function () {
                window.location.href = 'deal-underwriting.html';
            });
        }

        if (createScenarioBtn) {
            createScenarioBtn.addEventListener('click', createNewScenario);
        }

        if (applyBtn) {
            applyBtn.addEventListener('click', applyToUnderwriting);
        }

        // Initial load
        updateScenarioComparison();
    }

    function updateScenarioComparison() {
        const baseline = baselineSelect.value;
        const comparison = comparisonSelect.value;

        // In a real application, this would fetch data from an API
        // For demo purposes, we'll just update the UI with simulated data

        // Update table headers
        const tableHeaders = document.querySelectorAll('.comparison-table thead th:nth-child(2), .comparison-table thead th:nth-child(3)');
        if (tableHeaders.length >= 2) {
            tableHeaders[0].textContent = formatScenarioName(baseline);
            tableHeaders[1].textContent = formatScenarioName(comparison);
        }

        // Show simulated comparison
        showComparisonData(baseline, comparison);

        // Update charts
        updatePerformanceChart();
        updateSensitivityAnalysis();

        // Show notification
        showNotification(`Comparing ${formatScenarioName(baseline)} to ${formatScenarioName(comparison)}`, 'info');
    }

    function formatScenarioName(scenario) {
        switch (scenario) {
            case 'base':
                return 'Base Case';
            case 'upside':
                return 'Upside Case';
            case 'downside':
                return 'Downside Case';
            case 'acquisition':
                return 'Acquisition Case';
            default:
                return scenario;
        }
    }

    function showComparisonData(baseline, comparison) {
        // This is a simplified demo that would normally fetch real data
        // For now, we'll just simulate different data based on the scenario selection

        // Define sample data for metrics comparison
        const metricsData = {
            'base-upside': [
                { metric: 'IRR', baseline: '16.2%', comparison: '18.7%', variance: '+2.5%', positive: true },
                { metric: 'Equity Multiple', baseline: '1.82x', comparison: '1.95x', variance: '+0.13x', positive: true },
                { metric: 'Cash on Cash (Avg)', baseline: '8.5%', comparison: '9.3%', variance: '+0.8%', positive: true },
                { metric: 'NPV ($000s)', baseline: '$2,845', comparison: '$3,680', variance: '+$835', positive: true },
                { metric: 'Exit Cap Rate', baseline: '7.25%', comparison: '7.00%', variance: '-0.25%', positive: true },
                { metric: 'Exit Price ($000s)', baseline: '$32,845', comparison: '$36,520', variance: '+$3,675', positive: true },
                { metric: 'Exit Price Per Key', baseline: '$238,007', comparison: '$264,638', variance: '+$26,631', positive: true }
            ],
            'base-downside': [
                { metric: 'IRR', baseline: '16.2%', comparison: '13.5%', variance: '-2.7%', positive: false },
                { metric: 'Equity Multiple', baseline: '1.82x', comparison: '1.65x', variance: '-0.17x', positive: false },
                { metric: 'Cash on Cash (Avg)', baseline: '8.5%', comparison: '7.2%', variance: '-1.3%', positive: false },
                { metric: 'NPV ($000s)', baseline: '$2,845', comparison: '$1,920', variance: '-$925', positive: false },
                { metric: 'Exit Cap Rate', baseline: '7.25%', comparison: '7.50%', variance: '+0.25%', positive: false },
                { metric: 'Exit Price ($000s)', baseline: '$32,845', comparison: '$29,350', variance: '-$3,495', positive: false },
                { metric: 'Exit Price Per Key', baseline: '$238,007', comparison: '$212,681', variance: '-$25,326', positive: false }
            ],
            'upside-downside': [
                { metric: 'IRR', baseline: '18.7%', comparison: '13.5%', variance: '-5.2%', positive: false },
                { metric: 'Equity Multiple', baseline: '1.95x', comparison: '1.65x', variance: '-0.30x', positive: false },
                { metric: 'Cash on Cash (Avg)', baseline: '9.3%', comparison: '7.2%', variance: '-2.1%', positive: false },
                { metric: 'NPV ($000s)', baseline: '$3,680', comparison: '$1,920', variance: '-$1,760', positive: false },
                { metric: 'Exit Cap Rate', baseline: '7.00%', comparison: '7.50%', variance: '+0.50%', positive: false },
                { metric: 'Exit Price ($000s)', baseline: '$36,520', comparison: '$29,350', variance: '-$7,170', positive: false },
                { metric: 'Exit Price Per Key', baseline: '$264,638', comparison: '$212,681', variance: '-$51,957', positive: false }
            ]
        };

        // Get the correct comparison data
        const comparisonKey = `${baseline}-${comparison}`;
        let data;

        if (metricsData[comparisonKey]) {
            data = metricsData[comparisonKey];
        } else {
            // If we don't have this exact comparison, try the reverse with inverted values
            const reverseKey = `${comparison}-${baseline}`;
            if (metricsData[reverseKey]) {
                data = metricsData[reverseKey].map(item => {
                    // Invert the values
                    return {
                        metric: item.metric,
                        baseline: item.comparison,
                        comparison: item.baseline,
                        variance: item.variance.startsWith('+') ?
                            item.variance.replace('+', '-') :
                            item.variance.replace('-', '+'),
                        positive: !item.positive
                    };
                });
            } else {
                // Default to base-upside if no match found
                data = metricsData['base-upside'];
            }
        }

        // Update the metrics table
        updateMetricsTable(data);

        // Similar approach would be used for assumptions table, but simplified for this demo
        updateAssumptionsTable(baseline, comparison);
    }

    function updateMetricsTable(data) {
        const tableBody = document.querySelector('.metrics-comparison .comparison-table tbody');
        if (!tableBody) return;

        let html = '';

        data.forEach(row => {
            html += `
                <tr>
                    <td class="metric-name">${row.metric}</td>
                    <td>${row.baseline}</td>
                    <td>${row.comparison}</td>
                    <td class="${row.positive ? 'positive' : 'negative'}">${row.variance}</td>
                </tr>
            `;
        });

        tableBody.innerHTML = html;
    }

    function updateAssumptionsTable(baseline, comparison) {
        // This would fetch real data in a production app
        // Simplified for demo purposes
    }

    function updateView(view) {
        // This would update the visible content based on the selected view
        // For demo purposes, we just log the change
        console.log(`View changed to: ${view}`);

        // Show a notification about the view change
        showNotification(`Switched to ${view} view`, 'info');
    }

    function updatePerformanceChart() {
        const metric = performanceMetricSelect.value;
        // In a real application, this would update the chart
        console.log(`Performance chart updated to show: ${metric}`);
    }

    function updateSensitivityAnalysis() {
        const variables = sensitivityVarsSelect.value;
        const metric = sensitivityMetricSelect.value;

        // Update the heatmap labels
        const xAxisLabel = document.querySelector('.x-axis-label');
        const yAxisLabel = document.querySelector('.y-axis-label');

        if (variables === 'revpar-cap') {
            if (xAxisLabel) xAxisLabel.textContent = 'Exit Cap Rate';
            if (yAxisLabel) yAxisLabel.textContent = 'RevPAR Growth';
        } else if (variables === 'revpar-expenses') {
            if (xAxisLabel) xAxisLabel.textContent = 'Operating Expenses';
            if (yAxisLabel) yAxisLabel.textContent = 'RevPAR Growth';
        } else if (variables === 'capex-cap') {
            if (xAxisLabel) xAxisLabel.textContent = 'Exit Cap Rate';
            if (yAxisLabel) yAxisLabel.textContent = 'CapEx';
        } else if (variables === 'interest-cap') {
            if (xAxisLabel) xAxisLabel.textContent = 'Exit Cap Rate';
            if (yAxisLabel) yAxisLabel.textContent = 'Interest Rate';
        }

        // In a real app, this would update the heatmap data
        console.log(`Sensitivity analysis updated: ${variables} vs ${metric}`);
    }

    function exportToExcel() {
        // In a real application, this would export the data to Excel
        showNotification('Exporting to Excel...', 'info');

        // Simulate export completion
        setTimeout(() => {
            showNotification('Export complete!', 'success');
        }, 1500);
    }

    function createNewScenario() {
        // In a real application, this would open a modal to create a new scenario
        showNotification('Creating new scenario...', 'info');

        // Redirect to underwriting page with new scenario flag
        setTimeout(() => {
            window.location.href = 'deal-underwriting.html?newScenario=true';
        }, 1000);
    }

    function applyToUnderwriting() {
        // Get the selected scenario
        const scenario = comparisonSelect.value;

        // Show confirmation
        showNotification(`Applying ${formatScenarioName(scenario)} to underwriting...`, 'info');

        // Redirect to underwriting page with selected scenario
        setTimeout(() => {
            window.location.href = `deal-underwriting.html?scenario=${scenario}`;
        }, 1000);
    }

    function showNotification(message, type = 'info') {
        // Check if notification container exists
        let notificationContainer = document.querySelector('.notification-container');

        // Create container if it doesn't exist
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
            <button class="notification-close">×</button>
        `;

        // Add notification to container
        notificationContainer.appendChild(notification);

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function () {
            notification.classList.add('notification-hide');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('notification-hide');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
});