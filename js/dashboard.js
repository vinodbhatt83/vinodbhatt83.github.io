// Dashboard JavaScript for INVEST PLATFORM

document.addEventListener('DOMContentLoaded', function () {
    // Initialize task checkboxes
    initTaskCheckboxes();

    // Simulate chart data for demo purposes
    //simulateCharts();

    // Add functionality to deal cards
    //initDealCards();

    // Add new deal button functionality
    const newDealBtn = document.querySelector('.btn-primary');
    if (newDealBtn) {
        newDealBtn.addEventListener('click', function () {
            window.location.href = 'new-deal.html';
            //showNotification('New deal creation feature will be available in the next release.', 'info');
        });

        // Simulate RevPAR and other charts
        function simulateCharts() {
            // This would normally use a charting library like Chart.js
            // For the static prototype, we're using placeholder images
            console.log('Simulating chart data loading...');
        }

        // Initialize deal cards
        function initDealCards() {
            const dealCards = document.querySelectorAll('.deal-card');

            dealCards.forEach(card => {
                card.addEventListener('click', function () {
                    const dealName = this.querySelector('h3').textContent;
                    //showNotification(`Opening deal: ${dealName}`, 'info');

                    // In a real application, this would navigate to the deal page
                    // window.location.href = `deal-underwriting.html?deal=${encodeURIComponent(dealName)}`;
                });
            });
        }
    }

    // Add click handlers for view all links
    const viewAllLinks = document.querySelectorAll('.view-all, .view-report, .view-all-tasks');
    // viewAllLinks.forEach(link => {
    //     link.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const feature = this.textContent.trim();
    //         showNotification(`The "${feature}" feature will be available in the next release.`, 'info');
    //     });
    // });
});

// Initialize task checkboxes
function initTaskCheckboxes() {
    const taskCheckboxes = document.querySelectorAll('.task-item input[type="checkbox"]');

    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const taskItem = this.parentElement;

            if (this.checked) {
                // Add completed class to task item
                taskItem.classList.add('completed');

                // Simulate task completion notification
                setTimeout(() => {
                    showNotification('Task marked as complete!', 'success');
                }, 500);

                // Move task to bottom of list (would typically be done with backend)
                setTimeout(() => {
                    const taskList = taskItem.parentElement;
                    taskList.appendChild(taskItem);
                }, 1000);
            } else {
                // Remove completed class
                taskItem.classList.remove('completed');
            }
        });
    });
}