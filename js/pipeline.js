// Pipeline JavaScript for INVEST PLATFORM

document.addEventListener('DOMContentLoaded', function () {
    // Initialize deal cards
    initDealCards();

    // Initialize filters
    initFilters();

    // Initialize new deal button
    const newDealBtn = document.querySelector('.btn-primary');
    if (newDealBtn) {
        newDealBtn.addEventListener('click', function () {
            window.location.href = 'new-deal.html';
            ////showNotification('New deal creation feature will be available in the next release.', 'info');
        });
    }
});

// Initialize deal cards
function initDealCards() {
    const dealCards = document.querySelectorAll('.deal-card');

    dealCards.forEach(card => {
        // Add click event to cards
        card.addEventListener('click', function () {
            const dealName = this.querySelector('h3').textContent;

            // For the Courtyard by Marriott card, navigate to the deal underwriting page
            if (dealName) {
                window.location.href = 'deal-underwriting.html';
            } else if (dealName === 'Hampton Inn & Suites') {
                // Show notification for other cards
                //showNotification(`Opening deal: ${dealName}`, 'info');
            } else {
                //showNotification(`Opening deal: ${dealName}`, 'info');
            }
        });

        // Add click event to menu
        const menuBtn = card.querySelector('.deal-menu');
        if (menuBtn) {
            menuBtn.addEventListener('click', function (e) {
                e.stopPropagation(); // Prevent card click
                //showNotification('Card menu options will be available in the next release.', 'info');
            });
        }
    });
}

// Initialize filters
function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');

    filterSelects.forEach(select => {
        select.addEventListener('change', function () {
            const filterType = this.id;
            const filterValue = this.value;

            // In a real application, this would filter the deals
            //showNotification(`Filtering deals by ${filterType}: ${filterValue}`, 'info');
        });
    });

    const searchInput = document.querySelector('.search-filter input');

    if (searchInput) {
        // Use debounce to prevent too many search events while typing
        const debouncedSearch = debounce(function () {
            const searchTerm = searchInput.value.trim();

            if (searchTerm.length > 0) {
                //showNotification(`Searching for: "${searchTerm}"`, 'info');

                // In a real application, this would search the deals
            }
        }, 500);

        searchInput.addEventListener('input', debouncedSearch);
    }
}

// Make cards draggable in a future enhancement
function makeDraggable() {
    // This is a placeholder for future drag and drop functionality
    // Would use HTML5 Drag and Drop API or a library like SortableJS
    console.log('Drag and drop will be implemented in a future release');
}

// Handle stage change for a deal
function changeDealStage(dealId, newStage) {
    // This would update the deal's stage in a real application
    //showNotification(`Deal moved to ${newStage} stage.`, 'success');

    // Move the card to the new column (in a real app)
    console.log(`Moving deal ${dealId} to ${newStage} stage`);
}

// Create a new deal
function createNewDeal() {
    // This would open a form to create a new deal in a real application
    //showNotification('New deal creation form will be available in the next release.', 'info');
}

// Get deal details
function getDealDetails(dealId) {
    // This would fetch deal details from the server in a real application
    console.log(`Fetching details for deal ${dealId}`);

    // Simulate fetching deal data
    return {
        name: 'Sample Deal',
        location: 'Sample Location',
        price: '$XX.XM',
        keys: 'XXX',
        stage: 'Underwriting',
        assignedTo: 'JS'
    };
}