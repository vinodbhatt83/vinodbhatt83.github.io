// Deal Underwriting JavaScript for INVEST PLATFORM

document.addEventListener('DOMContentLoaded', function () {
    // Initialize scenario selectors
    initScenarioSelectors();

    // Initialize underwriting tabs
    initUnderwritingTabs();

    // Initialize editable assumption fields
    initEditableFields();

    // Initialize AI suggestion buttons
    initAiSuggestions();

    // Initialize action buttons
    initActionButtons();

    // Initialize document sources
    initDocumentSources();
});

// Initialize scenario selectors
function initScenarioSelectors() {
    const scenarioSelect = document.querySelector('#scenario-select');
    const compareSelect = document.querySelector('#compare-select');
    const newScenarioBtn = document.querySelector('.new-scenario-btn');

    if (scenarioSelect) {
        scenarioSelect.addEventListener('change', function () {
            const selectedScenario = this.value;
            showNotification(`Loaded scenario: ${selectedScenario}`, 'info');

            // In a real application, this would load the selected scenario data
            // For the prototype, we'll just show a notification
        });
    }

    if (compareSelect) {
        compareSelect.addEventListener('change', function () {
            const compareScenario = this.value;

            if (compareScenario !== 'none') {
                showNotification(`Comparing with scenario: ${compareScenario}`, 'info');

                // Add a 'comparison' class to various metrics to show side-by-side data
                document.querySelectorAll('.metric-box').forEach(box => {
                    box.classList.add('comparison');
                });
            } else {
                // Remove comparison view
                document.querySelectorAll('.metric-box').forEach(box => {
                    box.classList.remove('comparison');
                });
            }
        });
    }

    if (newScenarioBtn) {
        newScenarioBtn.addEventListener('click', function () {
            // In a real application, this would open a modal to create a new scenario
            showNotification('New scenario creation will be available in the next release.', 'info');
        });
    }
}

// Initialize underwriting tabs
function initUnderwritingTabs() {
    const tabs = document.querySelectorAll('.underwriting-tab');

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

// Initialize editable assumption fields
function initEditableFields() {
    const editableFields = document.querySelectorAll('.assumption-value.editable');

    editableFields.forEach(field => {
        field.addEventListener('click', function () {
            const currentValue = this.textContent.trim();
            const fieldName = this.previousElementSibling.textContent.trim();

            // Create an input to replace the text
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.className = 'inline-edit';

            // Replace the field with the input
            this.innerHTML = '';
            this.appendChild(input);

            // Focus the input
            input.focus();

            // Select all text
            input.select();

            // Handle blur event to save
            input.addEventListener('blur', function () {
                const newValue = this.value;
                field.innerHTML = newValue;

                // In a real application, this would update the model
                if (newValue !== currentValue) {
                    showNotification(`Updated ${fieldName} to ${newValue}`, 'success');
                }
            });

            // Handle enter key
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    this.blur();
                }
            });
        });
    });
}

// Initialize AI suggestion buttons
function initAiSuggestions() {
    const aiSuggestBtns = document.querySelectorAll('.ai-suggest-btn');

    aiSuggestBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const cardTitle = this.closest('.assumption-card').querySelector('h3').textContent.trim();

            // Simulate AI thinking
            showNotification(`AI is analyzing data to suggest values for ${cardTitle}...`, 'info');

            // Simulate a delay for AI processing
            setTimeout(() => {
                showNotification(`AI suggestions for ${cardTitle} applied!`, 'success');

                // In a real application, this would update the values with AI suggestions
                const card = this.closest('.assumption-card');
                const fields = card.querySelectorAll('.assumption-value');

                fields.forEach(field => {
                    // Add a subtle highlight effect to show updated fields
                    field.classList.add('ai-updated');

                    setTimeout(() => {
                        field.classList.remove('ai-updated');
                    }, 2000);
                });
            }, 1500);
        });
    });
}

// Initialize action buttons
function initActionButtons() {
    const actionsBtn = document.querySelector('.page-actions .btn');

    if (actionsBtn) {
        actionsBtn.addEventListener('click', function () {
            showNotification('Actions menu will be available in the next release.', 'info');
        });
    }

    const viewAllMetricsBtn = document.querySelector('.view-all-metrics');

    if (viewAllMetricsBtn) {
        viewAllMetricsBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Full metrics view will be available in the next release.', 'info');
        });
    }
}

// Initialize document sources
function initDocumentSources() {
    const documentLinks = document.querySelectorAll('.document-link');

    documentLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const documentName = this.previousElementSibling.textContent.trim();
            showNotification(`Opening document: ${documentName}`, 'info');
        });
    });

    const addDocumentBtn = document.querySelector('.add-document');

    if (addDocumentBtn) {
        addDocumentBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Document upload feature will be available in the next release.', 'info');
        });
    }
}