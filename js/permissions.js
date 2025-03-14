// Permissions Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Tabs functionality
    const tabs = document.querySelectorAll('.permissions-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Functionality to show/hide content based on active tab would go here
        });
    });

    // Create Role Modal functionality
    const createRoleBtn = document.getElementById('create-role-btn');
    const createRoleModal = document.getElementById('create-role-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalCancel = document.querySelector('.modal-cancel');
    const createRoleSubmit = document.getElementById('create-role-submit');

    if (createRoleBtn && createRoleModal) {
        createRoleBtn.addEventListener('click', function () {
            createRoleModal.style.display = 'flex';
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', function () {
            createRoleModal.style.display = 'none';
        });
    }

    if (modalCancel) {
        modalCancel.addEventListener('click', function () {
            createRoleModal.style.display = 'none';
        });
    }

    // Base Role Selection
    const baseRoleOptions = document.querySelectorAll('input[name="base-role"]');
    if (baseRoleOptions) {
        baseRoleOptions.forEach(option => {
            option.addEventListener('change', function () {
                updatePermissionCheckboxes(this.value);
            });
        });
    }

    // Create Role Submission
    if (createRoleSubmit) {
        createRoleSubmit.addEventListener('click', function () {
            const roleName = document.getElementById('role-name').value;
            const roleDescription = document.getElementById('role-description').value;

            if (!roleName) {
                alert('Please enter a role name');
                return;
            }

            // Here you would typically send the role data to the server
            console.log('Creating role with name:', roleName);

            // Close the modal and show success message
            createRoleModal.style.display = 'none';
            showNotification('Role created successfully');
        });
    }

    // Resource Access Configuration
    const configureResourceBtn = document.querySelector('.permissions-actions .btn-secondary');
    if (configureResourceBtn) {
        configureResourceBtn.addEventListener('click', function () {
            // Here you would typically show a modal or navigate to resource configuration
            console.log('Configure resource access clicked');
            showNotification('Resource access configuration is coming soon');
        });
    }

    // Permission Policy Actions
    const policyEditBtns = document.querySelectorAll('.policy-actions .btn:not(.btn-secondary)');
    const policyDeleteBtns = document.querySelectorAll('.policy-actions .btn-secondary');

    policyEditBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const policyItem = this.closest('.policy-item');
            const policyName = policyItem.querySelector('.policy-name').textContent;

            // Here you would typically show an edit modal or navigate to policy edit page
            console.log('Edit policy:', policyName);
            showNotification('Policy editor is coming soon');
        });
    });

    policyDeleteBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const policyItem = this.closest('.policy-item');
            const policyName = policyItem.querySelector('.policy-name').textContent;

            if (confirm(`Are you sure you want to delete the policy "${policyName}"?`)) {
                // Here you would typically send a request to delete the policy
                console.log('Deleting policy:', policyName);
                policyItem.remove();
                showNotification('Policy deleted successfully');
            }
        });
    });

    // Audit Log Filters
    const logDateRange = document.getElementById('log-date-range');
    const logActionType = document.getElementById('log-action-type');
    const logUser = document.getElementById('log-user');

    const logFilters = [logDateRange, logActionType, logUser];
    logFilters.forEach(filter => {
        if (filter) {
            filter.addEventListener('change', function () {
                // Here you would typically filter the audit log based on the selected filters
                console.log('Filter changed:', this.id, 'Value:', this.value);
                // For demo purposes, let's just show a notification
                showNotification('Audit log filtered');
            });
        }
    });

    // Export Log Button
    const exportLogBtn = document.querySelector('.audit-log .btn-secondary');
    if (exportLogBtn) {
        exportLogBtn.addEventListener('click', function () {
            // Here you would typically handle the log export
            console.log('Exporting audit log');
            showNotification('Audit log export initiated. You will be notified when it\'s ready.');
        });
    }

    // Helper Functions
    function updatePermissionCheckboxes(baseRole) {
        // This would update the permission checkboxes based on the selected base role
        console.log('Updating permissions for base role:', baseRole);

        // For demo purposes, let's set some checkboxes based on the role
        const allCheckboxes = document.querySelectorAll('.permission-customization input[type="checkbox"]');

        switch (baseRole) {
            case 'admin':
                allCheckboxes.forEach(cb => cb.checked = true);
                break;
            case 'analyst':
                allCheckboxes.forEach(cb => {
                    // Enable basic permissions but disable advanced ones
                    if (cb.name.includes('delete')) {
                        cb.checked = false;
                    } else {
                        cb.checked = true;
                    }
                });
                break;
            case 'viewer':
                allCheckboxes.forEach(cb => {
                    // Only enable view permissions
                    if (cb.name.includes('view')) {
                        cb.checked = true;
                    } else {
                        cb.checked = false;
                    }
                });
                break;
            case 'custom':
                // Start with all unchecked for custom role
                allCheckboxes.forEach(cb => cb.checked = false);
                break;
        }
    }

    // Utility function to show notifications
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});