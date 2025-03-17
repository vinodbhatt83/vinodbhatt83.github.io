// Portfolio JavaScript for INVEST PLATFORM

document.addEventListener('DOMContentLoaded', function () {
    // Initialize property cards
    initPropertyCards();

    // Initialize filters
    initFilters();

    // Initialize add property button
    initAddPropertyButton();
});

// Initialize property cards
function initPropertyCards() {
    const propertyCards = document.querySelectorAll('.property-card:not(.add-property)');

    propertyCards.forEach(card => {
        card.addEventListener('click', function () {
            const propertyName = this.querySelector('h3').textContent;

            // Navigate to property analysis page for first property (Courtyard)
            if (propertyName === 'Courtyard by Marriott') {
                window.location.href = 'property-analysis.html';
            } else {
                // Show notification for other properties
                //showNotification(`Opening property: ${propertyName}`, 'info');
            }
        });
    });
}

// Initialize filters
function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');

    filterSelects.forEach(select => {
        select.addEventListener('change', function () {
            const filterType = this.id;
            const filterValue = this.value;

            // In a real application, this would filter the properties
            //showNotification(`Filtering properties by ${filterType}: ${filterValue}`, 'info');
        });
    });

    const searchInput = document.querySelector('.search-filter input');

    if (searchInput) {
        // Use debounce to prevent too many search events while typing
        const debouncedSearch = debounce(function () {
            const searchTerm = searchInput.value.trim();

            if (searchTerm.length > 0) {
                //showNotification(`Searching for: "${searchTerm}"`, 'info');

                // In a real application, this would search the properties
            }
        }, 500);

        searchInput.addEventListener('input', debouncedSearch);
    }
}

// Initialize add property button
function initAddPropertyButton() {
    const addPropertyBtn = document.querySelector('.page-actions .btn-primary');
    if (addPropertyBtn) {
        addPropertyBtn.addEventListener('click', function () {
            //showNotification('Add property feature will be available in the next release.', 'info');
        });
    }

    const addPropertyCard = document.querySelector('.add-property');
    if (addPropertyCard) {
        addPropertyCard.addEventListener('click', function () {
            //showNotification('Add property feature will be available in the next release.', 'info');
        });
    }
}

// Show property performance details
function showPropertyDetails(propertyName) {
    // In a real application, this would fetch and display property details
    //showNotification(`Loading details for ${propertyName}...`, 'info');

    // Simulated loading delay
    setTimeout(() => {
        window.location.href = 'property-analysis.html';
    }, 500);
}