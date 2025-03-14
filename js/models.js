document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const createModelBtn = document.getElementById('create-model-btn');
    const createModelModal = document.getElementById('create-model-modal');
    const modalCloseBtn = createModelModal.querySelector('.modal-close');
    const modalCancelBtn = createModelModal.querySelector('.modal-cancel');
    const submitModelBtn = document.getElementById('submit-model-btn');

    // Model Start Radio Buttons
    const modelStartRadios = createModelModal.querySelectorAll('input[name="model-start"]');
    const templateSelect = createModelModal.querySelector('.template-select');

    // Tabs
    const modelTabs = document.querySelectorAll('.models-tab');
    const modelsGrid = document.querySelector('.models-grid');

    // Filters
    const modelTypeFilter = document.getElementById('model-type-filter');
    const propertyTypeFilter = document.getElementById('property-type-filter');
    const createdByFilter = document.getElementById('created-by-filter');
    const searchInput = document.querySelector('.search-filter input');

    // Sample Model Data (in a real app, this would come from a backend)
    const modelData = [
        {
            id: 1,
            name: 'Full Service Hotel Acquisition',
            type: 'acquisition',
            propertyType: 'full',
            description: 'Standard acquisition model for full service hotels with departmental P&L forecasting.',
            createdBy: 'me',
            createdDate: '3/1/25',
            modifiedDate: '3/1/25'
        },
        {
            id: 2,
            name: 'Select Service Hotel Acquisition',
            type: 'acquisition',
            propertyType: 'select',
            description: 'Standard acquisition model for select service hotels with simplified P&L structure.',
            createdBy: 'me',
            createdDate: '3/5/25',
            modifiedDate: '3/5/25'
        },
        {
            id: 3,
            name: 'Extended Stay Hotel Acquisition',
            type: 'acquisition',
            propertyType: 'extended',
            description: 'Standard acquisition model for extended stay hotels with length-of-stay forecasting.',
            createdBy: 'team',
            createdDate: '3/8/25',
            modifiedDate: '3/8/25'
        },
        {
            id: 4,
            name: 'Hotel Development Model',
            type: 'development',
            propertyType: 'all',
            description: 'Hotel development model with construction budget, timeline, and stabilization projections.',
            createdBy: 'system',
            createdDate: '2/25/25',
            modifiedDate: '3/10/25'
        },
        {
            id: 5,
            name: 'Hotel Refinance Model',
            type: 'refinance',
            propertyType: 'all',
            description: 'Hotel refinancing model with debt restructuring, cash out analysis, and debt coverage calculations.',
            createdBy: 'me',
            createdDate: '3/5/25',
            modifiedDate: '3/5/25'
        }
    ];

    // Render Model Cards
    function renderModelCards(models) {
        // Clear existing cards except the create model card
        const createModelCard = modelsGrid.querySelector('.create-model-card');
        modelsGrid.innerHTML = '';
        modelsGrid.appendChild(createModelCard);

        models.forEach(model => {
            const modelCard = document.createElement('div');
            modelCard.className = 'model-card';
            modelCard.innerHTML = `
                <div class="model-header">
                    <h3>${model.name}</h3>
                    <button class="btn-icon model-menu-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12V12.01M12 6V6.01M12 18V18.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="model-info">
                    <div class="model-type">${model.type.charAt(0).toUpperCase() + model.type.slice(1)} Model</div>
                    <div class="model-property-type">${model.propertyType.charAt(0).toUpperCase() + model.propertyType.slice(1)}</div>
                </div>
                <div class="model-description">${model.description}</div>
                <div class="model-meta">
                    <div class="meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Created: ${model.createdDate}</span>
                    </div>
                    <div class="meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Modified: ${model.modifiedDate}</span>
                    </div>
                </div>
                <div class="model-actions-footer">
                    <button class="btn btn-sm">Use Template</button>
                    <button class="btn btn-sm btn-secondary">Duplicate</button>
                </div>
            `;
            modelsGrid.appendChild(modelCard);
        });
    }

    // Filter Models
    function filterModels() {
        const modelType = modelTypeFilter.value;
        const propertyType = propertyTypeFilter.value;
        const createdBy = createdByFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        const filteredModels = modelData.filter(model =>
            (modelType === 'all' || model.type === modelType) &&
            (propertyType === 'all' || model.propertyType === propertyType) &&
            (createdBy === 'all' || model.createdBy === createdBy) &&
            (searchTerm === '' || model.name.toLowerCase().includes(searchTerm))
        );

        renderModelCards(filteredModels);
    }

    // Initial render
    renderModelCards(modelData);

    // Filter event listeners
    modelTypeFilter.addEventListener('change', filterModels);
    propertyTypeFilter.addEventListener('change', filterModels);
    createdByFilter.addEventListener('change', filterModels);
    searchInput.addEventListener('input', filterModels);

    // Tab functionality
    modelTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            modelTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Filter models based on selected tab
            const activeTab = tab.dataset.tab;
            let filteredModels;

            switch (activeTab) {
                case 'my-models':
                    filteredModels = modelData.filter(model => model.createdBy === 'me');
                    break;
                case 'team-models':
                    filteredModels = modelData.filter(model => model.createdBy === 'team');
                    break;
                case 'system-templates':
                    filteredModels = modelData.filter(model => model.createdBy === 'system');
                    break;
                case 'archived':
                    filteredModels = []; // No archived models in this example
                    break;
                default:
                    filteredModels = modelData;
            }

            renderModelCards(filteredModels);
        });
    });

    // Modal open/close functionality
    createModelBtn.addEventListener('click', () => {
        createModelModal.style.display = 'flex';
    });

    modalCloseBtn.addEventListener('click', () => {
        createModelModal.style.display = 'none';
    });

    modalCancelBtn.addEventListener('click', () => {
        createModelModal.style.display = 'none';
    });

    // Model start radio button functionality
    modelStartRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'template') {
                templateSelect.style.display = 'block';
            } else {
                templateSelect.style.display = 'none';
            }
        });
    });

    // Submit model form
    submitModelBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const modelName = document.getElementById('model-name').value;
        const modelType = document.getElementById('model-type').value;
        const propertyType = document.getElementById('property-type').value;
        const modelDescription = document.getElementById('model-description').value;
        const modelStart = document.querySelector('input[name="model-start"]:checked').value;
        const modelSharing = document.getElementById('model-sharing').value;

        // Basic validation
        if (!modelName || !modelType || !propertyType) {
            alert('Please fill in all required fields');
            return;
        }

        // In a real app, this would be sent to a backend
        const newModel = {
            id: modelData.length + 1,
            name: modelName,
            type: modelType,
            propertyType: propertyType,
            description: modelDescription,
            createdBy: 'me',
            createdDate: new Date().toLocaleDateString('en-US'),
            modifiedDate: new Date().toLocaleDateString('en-US')
        };

        modelData.push(newModel);
        renderModelCards(modelData);
        // Close modal
        createModelModal.style.display = 'none';
    });

    // Populate Recent Activity
    function populateRecentActivity() {
        const activityList = document.querySelector('.activity-list');
        const activities = [
            {
                user: 'John Smith',
                action: 'created',
                model: 'Hotel Valuation Model',
                time: '1 day ago'
            },
            {
                user: 'Sarah Johnson',
                action: 'updated',
                model: 'Hotel Development Model',
                time: '5 days ago'
            },
            {
                user: 'Michael Chen',
                action: 'shared',
                model: 'Full Service Acquisition Model',
                time: '1 week ago'
            },
            {
                user: 'Emily Rodriguez',
                action: 'duplicated',
                model: 'Refinance Model',
                time: '2 weeks ago'
            }
        ];

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-content">
                    <b>${activity.user}</b> ${activity.action} <a href="#">${activity.model}</a>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }

    // Render Charts (using Chart.js for demonstration)
    function renderCharts() {
        // Model Usage by Type Chart
        const modelTypeChartEl = document.getElementById('model-type-chart');
        if (modelTypeChartEl && typeof Chart !== 'undefined') {
            new Chart(modelTypeChartEl, {
                type: 'pie',
                data: {
                    labels: ['Acquisition', 'Development', 'Refinance', 'Valuation'],
                    datasets: [{
                        data: [45, 20, 15, 20],
                        backgroundColor: [
                            '#2D5BFF',   // Blue
                            '#2A9D8F',   // Teal
                            '#E9C46A',   // Gold
                            '#E76F51'    // Coral
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Model Usage Over Time Chart
        const modelUsageChartEl = document.getElementById('model-usage-chart');
        if (modelUsageChartEl && typeof Chart !== 'undefined') {
            new Chart(modelUsageChartEl, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Model Usage',
                        data: [12, 19, 3, 5, 2, 3],
                        borderColor: '#2D5BFF',
                        backgroundColor: 'rgba(45, 91, 255, 0.2)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    // Initial setup
    populateRecentActivity();
    renderCharts();

    // Event delegation for model card actions
    modelsGrid.addEventListener('click', (e) => {
        const modelCard = e.target.closest('.model-card');
        if (!modelCard) return;

        // Menu button
        const menuBtn = e.target.closest('.model-menu-btn');
        if (menuBtn) {
            alert('Model menu options would be shown here');
            return;
        }

        // Use Template button
        const useTemplateBtn = e.target.closest('.btn-sm:first-child');
        if (useTemplateBtn) {
            const modelName = modelCard.querySelector('.model-header h3').textContent;
            alert(`Using template: ${modelName}`);
            return;
        }

        // Duplicate button
        const duplicateBtn = e.target.closest('.btn-sm:last-child');
        if (duplicateBtn) {
            const modelName = modelCard.querySelector('.model-header h3').textContent;
            alert(`Duplicating model: ${modelName}`);
            return;
        }
    });
});

// Dynamically load Chart.js if not already loaded
function loadChartJS() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js';
        script.onload = () => {
            // Re-render charts once script is loaded
            renderCharts();
        };
        document.head.appendChild(script);
    }
}

// Load Chart.js
loadChartJS();