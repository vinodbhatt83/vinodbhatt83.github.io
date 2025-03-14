// document-extraction.js

document.addEventListener('DOMContentLoaded', function () {
    // Tab navigation for validation tabs
    const validationTabs = document.querySelectorAll('.validation-tab');

    validationTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            validationTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Here you would normally show/hide tab content
            // For demo purposes, we'll just simulate a data load
            simulateTabDataLoad(this.textContent.trim());
        });
    });

    // Make cells editable on click
    const editableCells = document.querySelectorAll('.editable-cell');

    editableCells.forEach(cell => {
        cell.addEventListener('click', function () {
            makeEditable(this);
        });
    });

    // Edit button functionality
    const editButtons = document.querySelectorAll('.extraction-results .btn-icon');

    editButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const cell = this.closest('tr').querySelector('.editable-cell');
            makeEditable(cell);
        });
    });

    // Action buttons
    const approveAllBtn = document.querySelector('.validation-actions .btn-primary');
    if (approveAllBtn) {
        approveAllBtn.addEventListener('click', function () {
            showNotification('All fields approved', 'success');
            // Simulate moving to next step
            updateProgressStep(4); // Move to mapping step
        });
    }

    const editSelectedBtn = document.querySelector('.validation-actions .btn-secondary:nth-child(2)');
    if (editSelectedBtn) {
        editSelectedBtn.addEventListener('click', function () {
            showNotification('Edit mode enabled', 'info');
        });
    }

    const rejectSelectedBtn = document.querySelector('.validation-actions .btn-secondary:first-child');
    if (rejectSelectedBtn) {
        rejectSelectedBtn.addEventListener('click', function () {
            showNotification('Selected fields rejected', 'warning');
        });
    }

    // Mapping options
    const mappingOptions = document.querySelectorAll('.mapping-option input[type="radio"]');

    mappingOptions.forEach(option => {
        option.addEventListener('change', function () {
            showNotification(`Data will be mapped to: ${this.nextElementSibling.querySelector('strong').textContent}`, 'info');
        });
    });

    // Final action buttons
    const saveProcessBtn = document.querySelector('.page-actions .btn-primary');
    if (saveProcessBtn) {
        saveProcessBtn.addEventListener('click', function () {
            const selectedMapping = document.querySelector('.mapping-option input[type="radio"]:checked');
            if (selectedMapping) {
                const mappingDestination = selectedMapping.nextElementSibling.querySelector('strong').textContent;
                showNotification(`Extraction completed. Data mapped to ${mappingDestination}`, 'success');

                // Simulate completion
                updateProgressStep(5);

                // In a real app, you would redirect to the next page or update UI
                setTimeout(() => {
                    window.location.href = 'document-processing.html';
                }, 1500);
            } else {
                showNotification('Please select a mapping destination', 'error');
            }
        });
    }

    const backBtn = document.querySelector('.page-actions .btn-secondary');
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            if (confirm('Are you sure you want to go back? Any unsaved progress will be lost.')) {
                window.location.href = 'document-processing.html';
            }
        });
    }

    // Page navigation for document preview
    const prevPageBtn = document.querySelector('.page-controls .btn:first-child');
    const nextPageBtn = document.querySelector('.page-controls .btn:last-child');
    const pageIndicator = document.querySelector('.page-controls span');
    let currentPage = 1;
    const totalPages = 4;

    if (prevPageBtn && nextPageBtn) {
        prevPageBtn.addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                updatePageIndicator();
                // Here you would normally update the document preview
                showNotification(`Showing page ${currentPage}`, 'info');
            }
        });

        nextPageBtn.addEventListener('click', function () {
            if (currentPage < totalPages) {
                currentPage++;
                updatePageIndicator();
                // Here you would normally update the document preview
                showNotification(`Showing page ${currentPage}`, 'info');
            }
        });

        function updatePageIndicator() {
            pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        }
    }

    // Document Intelligence Simulation
    initializeDocumentIntelligence();
});

// Make a cell editable
function makeEditable(cell) {
    // Save current text
    const currentText = cell.textContent;

    // Replace with input
    cell.innerHTML = `<input type="text" class="edit-input" value="${currentText}">`;
    const input = cell.querySelector('input');

    // Focus and select all text
    input.focus();
    input.select();

    // Handle enter key and blur
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            finishEditing(cell, input);
        } else if (e.key === 'Escape') {
            cell.textContent = currentText;
            input.removeEventListener('blur', blurHandler);
        }
    });

    // Handle click outside
    const blurHandler = function () {
        finishEditing(cell, input);
    };

    input.addEventListener('blur', blurHandler);
}

// Finish editing a cell
function finishEditing(cell, input) {
    const newValue = input.value;
    cell.textContent = newValue;

    // In a real app, you would update the data model and maybe recalculate confidence
    const confidenceIndicator = cell.closest('tr').querySelector('.confidence-indicator');
    if (confidenceIndicator) {
        // Simulate confidence change based on editing
        confidenceIndicator.textContent = '100%';
        confidenceIndicator.classList.remove('medium', 'low');
        confidenceIndicator.classList.add('high');
    }
}

// Simulate loading data for different tabs
function simulateTabDataLoad(tabName) {
    const tableBody = document.querySelector('.validation-table tbody');

    // Show loading state
    tableBody.innerHTML = '<tr><td colspan="4" class="text-center">Loading...</td></tr>';

    // Simulate API call
    setTimeout(() => {
        let html = '';

        switch (tabName) {
            case 'Property Info':
                // Reuse existing content
                html = `
                    <tr>
                        <td>Property Name</td>
                        <td class="editable-cell">Courtyard by Marriott Nashville</td>
                        <td><div class="confidence-indicator high">98%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td class="editable-cell">1901 West End Ave, Nashville, TN 37203</td>
                        <td><div class="confidence-indicator high">97%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Number of Rooms</td>
                        <td class="editable-cell">138</td>
                        <td><div class="confidence-indicator high">99%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Report Date</td>
                        <td class="editable-cell">February 2025</td>
                        <td><div class="confidence-indicator high">96%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Chain Scale</td>
                        <td class="editable-cell">Upscale</td>
                        <td><div class="confidence-indicator medium">85%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Property Type</td>
                        <td class="editable-cell">Full Service</td>
                        <td><div class="confidence-indicator medium">82%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                `;
                break;

            case 'Performance Metrics':
                html = `
                    <tr>
                        <td>Occupancy</td>
                        <td class="editable-cell">76.2%</td>
                        <td><div class="confidence-indicator high">97%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>ADR</td>
                        <td class="editable-cell">$177.00</td>
                        <td><div class="confidence-indicator high">99%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>RevPAR</td>
                        <td class="editable-cell">$135.00</td>
                        <td><div class="confidence-indicator high">98%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>RevPAR Index</td>
                        <td class="editable-cell">105.2</td>
                        <td><div class="confidence-indicator high">95%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Room Revenue</td>
                        <td class="editable-cell">$547,885</td>
                        <td><div class="confidence-indicator medium">88%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                `;
                break;

            case 'Market Data':
                html = `
                    <tr>
                        <td>Market Occupancy</td>
                        <td class="editable-cell">72.1%</td>
                        <td><div class="confidence-indicator high">96%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Market ADR</td>
                        <td class="editable-cell">$172.00</td>
                        <td><div class="confidence-indicator high">94%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Market RevPAR</td>
                        <td class="editable-cell">$124.00</td>
                        <td><div class="confidence-indicator high">93%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>YoY RevPAR Change</td>
                        <td class="editable-cell">+5.8%</td>
                        <td><div class="confidence-indicator medium">87%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Supply Growth</td>
                        <td class="editable-cell">+2.1%</td>
                        <td><div class="confidence-indicator high">91%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                `;
                break;

            case 'Competitive Set':
                html = `
                    <tr>
                        <td>Comp 1</td>
                        <td class="editable-cell">Hilton Garden Inn Nashville</td>
                        <td><div class="confidence-indicator high">94%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Comp 2</td>
                        <td class="editable-cell">Hampton Inn & Suites Nashville</td>
                        <td><div class="confidence-indicator high">92%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Comp 3</td>
                        <td class="editable-cell">Hyatt Place Nashville</td>
                        <td><div class="confidence-indicator high">93%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Comp 4</td>
                        <td class="editable-cell">Residence Inn Nashville</td>
                        <td><div class="confidence-indicator medium">85%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                    <tr>
                        <td>Comp 5</td>
                        <td class="editable-cell">Holiday Inn Express Nashville</td>
                        <td><div class="confidence-indicator medium">83%</div></td>
                        <td><button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></td>
                    </tr>
                `;
                break;
        }

        tableBody.innerHTML = html;

        // Reattach event listeners
        const newEditableCells = document.querySelectorAll('.editable-cell');
        newEditableCells.forEach(cell => {
            cell.addEventListener('click', function () {
                makeEditable(this);
            });
        });

        const newEditButtons = document.querySelectorAll('.extraction-results .btn-icon');
        newEditButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.stopPropagation();
                const cell = this.closest('tr').querySelector('.editable-cell');
                makeEditable(cell);
            });
        });

    }, 500);
}

// Update progress step
function updateProgressStep(step) {
    const steps = document.querySelectorAll('.status-step');
    const connectors = document.querySelectorAll('.status-connector');

    // Update steps
    steps.forEach((stepEl, index) => {
        if (index < step) {
            stepEl.classList.add('completed');
            stepEl.classList.remove('active');
        } else if (index === step - 1) {
            stepEl.classList.add('active');
            stepEl.classList.remove('completed');
        } else {
            stepEl.classList.remove('active', 'completed');
        }
    });

    // Update connectors
    connectors.forEach((connector, index) => {
        if (index < step - 1) {
            connector.classList.add('completed');
        } else {
            connector.classList.remove('completed');
        }
    });
}

// Show notification
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

// Initialize document intelligence features
function initializeDocumentIntelligence() {
    // Simulate AI insights
    const aiInsightElement = document.querySelector('.ai-insight');
    if (aiInsightElement) {
        const insights = [
            "This STR report shows property metrics are above the competitive set in all categories. Consider adjusting the property type classification from \"Full Service\" to \"Select Service\" based on the amenities described on page 3.",
            "Property's RevPAR index of 105.2 indicates strong market position. There's potential for ADR growth without sacrificing occupancy based on the competitive set pricing.",
            "The extracted chain scale (Upscale) has medium confidence. Our database suggests this property might be categorized as Upper Upscale based on brand standards and amenities.",
            "Market supply growth of 2.1% is below the 5.2% demand growth, suggesting favorable market conditions for the next 12-24 months."
        ];

        // Randomly select an insight
        const randomInsight = insights[Math.floor(Math.random() * insights.length)];
        aiInsightElement.innerHTML = `<strong>AI Insight:</strong> ${randomInsight}`;
    }

    // Highlight fields with low confidence
    setTimeout(() => {
        const lowConfidenceFields = document.querySelectorAll('.confidence-indicator.low');
        lowConfidenceFields.forEach(field => {
            const row = field.closest('tr');
            if (row) {
                row.classList.add('highlight-warning');
                showNotification(`Low confidence detected for field: ${row.querySelector('td:first-child').textContent}`, 'warning');
            }
        });
    }, 2000);
}