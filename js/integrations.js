// Integrations Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Integration Category Tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Here you would typically filter integrations based on the selected category
            const category = this.textContent.toLowerCase();
            console.log('Selected category:', category);

            // For demo purposes, let's just show a notification
            //showNotification(`Showing ${category} integrations`);
        });
    });

    // Configure Integration Buttons
    const configureButtons = document.querySelectorAll('.integration-actions .btn-secondary');
    if (configureButtons) {
        configureButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const integrationItem = this.closest('.integration-item');
                const integrationName = integrationItem.querySelector('h3').textContent;

                // Update modal title to reflect the selected integration
                const configModal = document.getElementById('integration-config-modal');
                if (configModal) {
                    const modalTitle = configModal.querySelector('h2');
                    if (modalTitle) {
                        modalTitle.textContent = `Configure ${integrationName} Integration`;
                    }

                    // Show the modal
                    configModal.style.display = 'flex';
                }
            });
        });
    }

    // Disconnect Integration Buttons
    const disconnectButtons = document.querySelectorAll('.integration-actions .btn-outline');
    if (disconnectButtons) {
        disconnectButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const integrationItem = this.closest('.integration-item');
                const integrationName = integrationItem.querySelector('h3').textContent;

                if (confirm(`Are you sure you want to disconnect the ${integrationName} integration? Any synced data will remain, but automatic syncing will stop.`)) {
                    // Here you would typically send a request to disconnect the integration
                    console.log('Disconnecting integration:', integrationName);

                    // Update the UI to show the integration as disconnected
                    integrationItem.classList.remove('connected');

                    // Update status indicator and text
                    const statusIndicator = integrationItem.querySelector('.status-indicator');
                    const statusText = integrationItem.querySelector('.status-text');

                    if (statusIndicator && statusText) {
                        statusIndicator.classList.remove('connected');
                        statusIndicator.classList.add('disconnected');
                        statusText.textContent = 'Not Connected';
                    }

                    // Update buttons
                    this.textContent = 'Connect';
                    this.classList.remove('btn-outline');
                    this.classList.add('btn-primary');

                    const configureBtn = integrationItem.querySelector('.btn-secondary');
                    if (configureBtn) {
                        configureBtn.style.display = 'none';
                    }

                    //showNotification(`${integrationName} disconnected successfully`);
                }
            });
        });
    }

    // Connect Integration Buttons
    const connectButtons = document.querySelectorAll('.integration-actions .btn-primary');
    if (connectButtons) {
        connectButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const integrationItem = this.closest('.integration-item');
                const integrationName = integrationItem.querySelector('h3').textContent;

                // Show the connection modal
                const connectionModal = document.getElementById('connection-modal');
                if (connectionModal) {
                    const modalTitle = connectionModal.querySelector('h2');
                    if (modalTitle) {
                        modalTitle.textContent = `Connect to ${integrationName}`;
                    }

                    // Show the modal
                    connectionModal.style.display = 'flex';
                }
            });
        });
    }

    // Modal Close Buttons
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modalCancelButtons = document.querySelectorAll('.modal-cancel');

    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Close all modals
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    modalCancelButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Close all modals
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Configuration Save Button
    const saveConfigBtn = document.getElementById('save-integration-config');
    if (saveConfigBtn) {
        saveConfigBtn.addEventListener('click', function () {
            // Here you would typically send the configuration to the server
            console.log('Saving integration configuration');

            // Close the modal
            const configModal = document.getElementById('integration-config-modal');
            if (configModal) {
                configModal.style.display = 'none';
            }

            //showNotification('Integration configuration saved successfully');
        });
    }

    // Connection Proceed Button
    const proceedConnectionBtn = document.getElementById('proceed-connection');
    if (proceedConnectionBtn) {
        proceedConnectionBtn.addEventListener('click', function () {
            // Here you would typically redirect to the authentication page for the service
            console.log('Proceeding with connection');

            // Close the modal
            const connectionModal = document.getElementById('connection-modal');
            if (connectionModal) {
                connectionModal.style.display = 'none';
            }

            // Simulate a connection process
            //showNotification('Connecting to service...');

            // Simulate a successful connection after a delay
            setTimeout(() => {
                //showNotification('Connection successful');

                // Refresh the page to show the updated integration status
                // window.location.reload();
                // Instead of refreshing, let's just simulate the UI update
                updateUIAfterConnection();
            }, 2000);
        });
    }

    // View All Activity Button
    const viewAllActivityBtn = document.querySelector('.view-all-activity');
    if (viewAllActivityBtn) {
        viewAllActivityBtn.addEventListener('click', function () {
            // Here you would typically navigate to a full activity log page
            console.log('View all activity clicked');
            //showNotification('Full activity log coming soon');
        });
    }

    // API Documentation Button
    const apiDocsBtn = document.querySelector('.custom-integration-options .btn:first-of-type');
    if (apiDocsBtn) {
        apiDocsBtn.addEventListener('click', function () {
            // Here you would typically navigate to the API documentation page
            console.log('API documentation clicked');
            //showNotification('API documentation opening in new tab');
            window.open('/api-docs', '_blank');
        });
    }

    // Configure Webhooks Button
    const webhooksBtn = document.querySelector('.custom-integration-options .btn:last-of-type');
    if (webhooksBtn) {
        webhooksBtn.addEventListener('click', function () {
            // Here you would typically navigate to the webhooks configuration page
            console.log('Configure webhooks clicked');
            //showNotification('Webhook configuration page coming soon');
        });
    }

    // Helper function to simulate UI update after connection
    function updateUIAfterConnection() {
        // Find the first disconnected integration
        const disconnectedIntegration = document.querySelector('.integration-item:not(.connected)');
        if (disconnectedIntegration) {
            // Update the UI to show the integration as connected
            disconnectedIntegration.classList.add('connected');

            // Update status indicator and text
            const statusIndicator = disconnectedIntegration.querySelector('.status-indicator');
            const statusText = disconnectedIntegration.querySelector('.status-text');

            if (statusIndicator && statusText) {
                statusIndicator.classList.remove('disconnected');
                statusIndicator.classList.add('connected');
                statusText.textContent = 'Connected';
            }

            // Update buttons
            const connectBtn = disconnectedIntegration.querySelector('.btn-primary');
            if (connectBtn) {
                connectBtn.textContent = 'Disconnect';
                connectBtn.classList.remove('btn-primary');
                connectBtn.classList.add('btn-outline');

                // Create and add configure button
                const actionsContainer = disconnectedIntegration.querySelector('.integration-actions');
                if (actionsContainer) {
                    const configureBtn = document.createElement('button');
                    configureBtn.className = 'btn btn-sm btn-secondary';
                    configureBtn.textContent = 'Configure';
                    actionsContainer.insertBefore(configureBtn, connectBtn);

                    // Add event listener to the new button
                    configureBtn.addEventListener('click', function () {
                        const integrationName = disconnectedIntegration.querySelector('h3').textContent;

                        // Update modal title
                        const configModal = document.getElementById('integration-config-modal');
                        if (configModal) {
                            const modalTitle = configModal.querySelector('h2');
                            if (modalTitle) {
                                modalTitle.textContent = `Configure ${integrationName} Integration`;
                            }

                            // Show the modal
                            configModal.style.display = 'flex';
                        }
                    });
                }
            }
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