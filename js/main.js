// Main JavaScript for INVEST PLATFORM

// User Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    // User menu dropdown
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', function (e) {
            e.preventDefault();
            // This would normally toggle a dropdown menu
            console.log('User menu clicked');
        });
    }

    // Mobile menu toggle (for responsive design)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            const sideNav = document.querySelector('.side-nav');
            sideNav.classList.toggle('show');
        });
    }

    // Initialize tooltips
    initTooltips();

    // Initialize dropdown menus
    initDropdowns();
});

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function () {
            const tooltipText = this.getAttribute('data-tooltip');

            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;

            document.body.appendChild(tooltipElement);

            const rect = this.getBoundingClientRect();
            const tooltipRect = tooltipElement.getBoundingClientRect();

            tooltipElement.style.top = `${rect.top - tooltipRect.height - 10}px`;
            tooltipElement.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
            tooltipElement.style.opacity = '1';

            this.addEventListener('mouseleave', function () {
                tooltipElement.remove();
            }, { once: true });
        });
    });
}

// Initialize dropdown menus
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (trigger && menu) {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                menu.classList.toggle('show');

                // Close when clicking outside
                document.addEventListener('click', function () {
                    menu.classList.remove('show');
                }, { once: true });
            });
        }
    });
}

// Format numbers with commas (e.g., 1,000,000)
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format currency values
function formatCurrency(amount) {
    return '$' + formatNumber(amount.toFixed(2));
}

// Format percentage values
function formatPercent(value) {
    return value.toFixed(1) + '%';
}

// Format date to MM/DD/YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

// Show notification toast
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
        </div>
        <button class="notification-close">×</button>
    `;

    document.body.appendChild(notification);

    // Show the notification with a slight delay for animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);

    // Add close button handler
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        hideNotification(notification);
    });
}

// Hide notification toast
function hideNotification(notification) {
    notification.classList.remove('show');

    // Remove from DOM after animation
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Confirm dialog
function confirmDialog(message, confirmCallback, cancelCallback) {
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
        <div class="confirm-dialog-content">
            <p>${message}</p>
            <div class="confirm-dialog-actions">
                <button class="btn btn-secondary cancel-btn">Cancel</button>
                <button class="btn btn-primary confirm-btn">Confirm</button>
            </div>
        </div>
    `;

    document.body.appendChild(dialog);

    // Show the dialog with a slight delay for animation
    setTimeout(() => {
        dialog.classList.add('show');
    }, 10);

    // Add event listeners
    const confirmBtn = dialog.querySelector('.confirm-btn');
    const cancelBtn = dialog.querySelector('.cancel-btn');

    confirmBtn.addEventListener('click', () => {
        hideDialog(dialog);
        if (confirmCallback) confirmCallback();
    });

    cancelBtn.addEventListener('click', () => {
        hideDialog(dialog);
        if (cancelCallback) cancelCallback();
    });
}

// Hide dialog
function hideDialog(dialog) {
    dialog.classList.remove('show');

    // Remove from DOM after animation
    setTimeout(() => {
        dialog.remove();
    }, 300);
}

// Generate random ID
function generateId() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

// Debounce function to limit the rate of function calls
function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add event listeners to tabs
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs');

    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab-item');
        const contentSections = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Show corresponding content
                const targetId = this.getAttribute('data-target');

                contentSections.forEach(section => {
                    section.style.display = 'none';
                });

                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                }
            });
        });
    });
}