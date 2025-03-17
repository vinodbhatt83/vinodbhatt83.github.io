// Documents Page JavaScript
// This script provides functionality for the Documents page of the INVEST PLATFORM

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const listTab = document.getElementById('list-tab');
    const gridTab = document.getElementById('grid-tab');
    const listView = document.getElementById('list-view');
    const gridView = document.getElementById('grid-view');
    const documentDetails = document.getElementById('document-details');
    const closeDetailsBtn = document.querySelector('.close-details');
    const uploadBtn = document.getElementById('upload-document-btn');
    const uploadModal = document.getElementById('upload-modal');
    const newFolderBtn = document.getElementById('new-folder-btn');
    const newFolderModal = document.getElementById('new-folder-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const tableRows = document.querySelectorAll('.table-row');
    const folderCards = document.querySelectorAll('.folder-card');
    const infoButtons = document.querySelectorAll('.action-btn[aria-label="View document details"]');
    const shareButtons = document.querySelectorAll('.action-btn[aria-label="Share document"]');
    const shareModal = document.getElementById('share-modal');
    const moreOptionsButtons = document.querySelectorAll('.action-btn[aria-label="More options"]');
    const contextMenu = document.getElementById('document-context-menu');
    const confirmationModal = document.getElementById('confirmation-modal');
    const aiAnalysisModal = document.getElementById('ai-analysis-modal');
    const toastContainer = document.getElementById('toast-container');
    const loadingOverlay = document.getElementById('loading-overlay');
    const propertyFilter = document.getElementById('property-filter');
    const categoryFilter = document.getElementById('category-filter');
    const dateFilter = document.getElementById('date-filter');
    const documentSearch = document.getElementById('document-search');
    const paginationButtons = document.querySelectorAll('.pagination-btn');

    // View Switching
    if (listTab && gridTab && listView && gridView) {
        listTab.addEventListener('click', function() {
            setActiveView('list');
        });

        gridTab.addEventListener('click', function() {
            setActiveView('grid');
        });
    }

    function setActiveView(viewType) {
        if (viewType === 'list') {
            listTab.classList.add('active');
            listTab.setAttribute('aria-selected', 'true');
            gridTab.classList.remove('active');
            gridTab.setAttribute('aria-selected', 'false');
            
            if (listView) listView.hidden = false;
            if (gridView) gridView.hidden = true;
        } else {
            gridTab.classList.add('active');
            gridTab.setAttribute('aria-selected', 'true');
            listTab.classList.remove('active');
            listTab.setAttribute('aria-selected', 'false');
            
            if (gridView) gridView.hidden = false;
            if (listView) listView.hidden = true;
        }
    }

    // Document Details Panel
    if (tableRows && documentDetails) {
        tableRows.forEach(row => {
            row.addEventListener('click', function(e) {
                // Don't open details if clicking on action buttons
                if (e.target.closest('.action-btn')) return;
                
                showDocumentDetails();
            });
        });
    }

    if (closeDetailsBtn && documentDetails) {
        closeDetailsBtn.addEventListener('click', function() {
            hideDocumentDetails();
        });
    }

    function showDocumentDetails() {
        if (documentDetails) {
            documentDetails.hidden = false;
            documentDetails.setAttribute('aria-hidden', 'false');
            // Announce to screen readers
            document.getElementById('notification-area').textContent = 'Document details panel opened';
        }
    }

    function hideDocumentDetails() {
        if (documentDetails) {
            documentDetails.hidden = true;
            documentDetails.setAttribute('aria-hidden', 'true');
            // Announce to screen readers
            document.getElementById('notification-area').textContent = 'Document details panel closed';
        }
    }

    // Folder Navigation
    if (folderCards) {
        folderCards.forEach(card => {
            card.addEventListener('click', function() {
                // In a real application, this would navigate to the folder contents
                // For demo purposes, we'll show a toast notification
                showToast('Folder opened', 'Navigating to folder contents...', 'success');
                
                // Simulate loading
                showLoading();
                setTimeout(function() {
                    hideLoading();
                }, 1000);
            });
            
            // Add keyboard support
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    // Modal Handling
    if (uploadBtn && uploadModal) {
        uploadBtn.addEventListener('click', function() {
            showModal(uploadModal);
        });
    }

    if (newFolderBtn && newFolderModal) {
        newFolderBtn.addEventListener('click', function() {
            showModal(newFolderModal);
        });
    }

    if (closeModalBtns) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = btn.closest('.modal');
                hideModal(modal);
            });
        });
    }

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal:not([hidden])');
        modals.forEach(modal => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal:not([hidden])');
            if (modals.length > 0) {
                hideModal(modals[modals.length - 1]); // Close the top-most modal
            } else if (!documentDetails.hidden) {
                hideDocumentDetails();
            }
        }
    });

    function showModal(modal) {
        if (modal) {
            modal.hidden = false;
            modal.setAttribute('aria-hidden', 'false');
            
            // Find the first focusable element and focus it
            const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable.length > 0) {
                focusable[0].focus();
            }
            
            // Trap focus within modal
            trapFocus(modal);
            
            // Announce to screen readers
            document.getElementById('notification-area').textContent = 'Dialog opened';
        }
    }

    function hideModal(modal) {
        if (modal) {
            modal.hidden = true;
            modal.setAttribute('aria-hidden', 'true');
            
            // Return focus to the element that opened the modal
            const returnFocusTo = document.activeElement;
            if (returnFocusTo) {
                returnFocusTo.focus();
            }
            
            // Announce to screen readers
            document.getElementById('notification-area').textContent = 'Dialog closed';
        }
    }

    function trapFocus(element) {
        const focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }

    // Action Buttons
    if (infoButtons) {
        infoButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                showDocumentDetails();
            });
        });
    }

    if (shareButtons && shareModal) {
        shareButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                showModal(shareModal);
            });
        });
    }

    // Context Menu
    if (moreOptionsButtons && contextMenu) {
        moreOptionsButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Position the context menu
                const rect = btn.getBoundingClientRect();
                contextMenu.style.top = `${rect.bottom + 5}px`;
                contextMenu.style.left = `${rect.left - 160 + rect.width / 2}px`;
                
                // Show the context menu
                contextMenu.hidden = false;
                
                // Add event listener to hide context menu when clicking outside
                document.addEventListener('click', hideContextMenu);
            });
        });
    }

    function hideContextMenu() {
        if (contextMenu) {
            contextMenu.hidden = true;
            document.removeEventListener('click', hideContextMenu);
        }
    }

    // Context Menu Actions
    if (contextMenu) {
        const deleteAction = contextMenu.querySelector('.context-menu-item-danger');
        if (deleteAction && confirmationModal) {
            deleteAction.addEventListener('click', function() {
                hideContextMenu();
                showModal(confirmationModal);
            });
        }
    }

    // Confirmation Modal Actions
    if (confirmationModal) {
        const cancelAction = confirmationModal.querySelector('#cancel-action');
        const confirmAction = confirmationModal.querySelector('#confirm-action');
        
        if (cancelAction) {
            cancelAction.addEventListener('click', function() {
                hideModal(confirmationModal);
            });
        }
        
        if (confirmAction) {
            confirmAction.addEventListener('click', function() {
                hideModal(confirmationModal);
                showToast('Document deleted', 'The document has been permanently deleted.', 'success');
            });
        }
    }

    // AI Analysis
    const aiAnalysisBtn = document.querySelector('.ai-tool-btn[aria-label="Analyze document"]');
    if (aiAnalysisBtn && aiAnalysisModal) {
        aiAnalysisBtn.addEventListener('click', function() {
            showModal(aiAnalysisModal);
        });
    }

    // File Upload Handling
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('file-upload');
    const selectFilesBtn = document.getElementById('select-files-btn');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function() {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            if (e.dataTransfer.files.length > 0) {
                handleFiles(e.dataTransfer.files);
            }
        });
        
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        if (selectFilesBtn) {
            selectFilesBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                fileInput.click();
            });
        }
        
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                handleFiles(fileInput.files);
            }
        });
    }

    function handleFiles(files) {
        // In a real application, this would upload the files to the server
        // For demo purposes, we'll show a toast notification
        showToast('Files selected', `${files.length} file(s) selected for upload.`, 'success');
        
        // Display file names in the upload area
        const fileList = Array.from(files).map(file => file.name).join(', ');
        const uploadAreaText = document.querySelector('.upload-area p');
        if (uploadAreaText) {
            uploadAreaText.textContent = fileList;
        }
    }

    // Filtering and Searching
    if (propertyFilter) {
        propertyFilter.addEventListener('change', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', applyFilters);
    }
    
    if (documentSearch) {
        documentSearch.addEventListener('input', applyFilters);
    }

    function applyFilters() {
        // In a real application, this would filter the documents based on the selected criteria
        // For demo purposes, we'll show a loading overlay and then a toast notification
        showLoading();
        
        setTimeout(function() {
            hideLoading();
            showToast('Filters applied', 'Documents filtered based on selected criteria.', 'success');
        }, 500);
    }

    // Pagination
    if (paginationButtons) {
        paginationButtons.forEach(btn => {
            if (!btn.disabled) {
                btn.addEventListener('click', function() {
                    // In a real application, this would navigate to the selected page
                    // For demo purposes, we'll show a loading overlay and then a toast notification
                    showLoading();
                    
                    setTimeout(function() {
                        hideLoading();
                        
                        // Update active page
                        paginationButtons.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        
                        showToast('Page changed', `Navigated to page ${btn.textContent}`, 'success');
                    }, 500);
                });
            }
        });
    }

    // Toast Notifications
    function showToast(title, message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 7.58L19 9L10 17Z" fill="#10B981"/></svg>';
        } else if (type === 'warning') {
            iconSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#F59E0B"/></svg>';
        } else if (type === 'error') {
            iconSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#EF4444"/></svg>';
        }
        
        toast.innerHTML = `
            <div class="toast-icon">${iconSvg}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close notification">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#64748B"/>
                </svg>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Announce to screen readers
        document.getElementById('notification-area').textContent = `${type}: ${title}. ${message}`;
        
        // Add event listener to close button
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                toast.remove();
            });
        }
        
        // Auto-remove after 3 seconds
        setTimeout(function() {
            if (toast.parentNode === toastContainer) {
                toast.remove();
            }
        }, 3000);
    }

    // Loading Overlay
    function showLoading() {
        if (loadingOverlay) {
            loadingOverlay.hidden = false;
        }
    }
    
    function hideLoading() {
        if (loadingOverlay) {
            loadingOverlay.hidden = true;
        }
    }

    // Initialize the page
    function initPage() {
        // Set default view
        setActiveView('list');
        
        // Show welcome toast
        setTimeout(function() {
            showToast('Documents Page Loaded', 'Welcome to the Documents repository.', 'success');
        }, 500);
    }

    // Call initialization
    initPage();
});
