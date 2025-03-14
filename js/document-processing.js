// Document Processing JavaScript for INVEST PLATFORM

document.addEventListener('DOMContentLoaded', function () {
    // Initialize document filters
    initDocumentFilters();

    // Initialize document cards
    initDocumentCards();

    // Initialize processing status
    initProcessingStatus();

    // Initialize data validation
    initDataValidation();

    // Initialize upload button
    initUploadButton();
});

// Initialize document filters
function initDocumentFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');

    filterSelects.forEach(select => {
        select.addEventListener('change', function () {
            const filterType = this.getAttribute('data-filter');
            const filterValue = this.value;

            // In a real application, this would filter the documents
            // For the prototype, we'll just show a notification
            showNotification(`Filtering documents by ${filterType}: ${filterValue}`, 'info');
        });
    });

    const searchInput = document.querySelector('.search-documents input');

    if (searchInput) {
        // Use debounce to prevent too many search events while typing
        const debouncedSearch = debounce(function () {
            const searchTerm = searchInput.value.trim();

            if (searchTerm.length > 0) {
                showNotification(`Searching for: "${searchTerm}"`, 'info');

                // In a real application, this would search the documents
                // For the prototype, we'll just show a notification
            }
        }, 500);

        searchInput.addEventListener('input', debouncedSearch);
    }
}

// Initialize document cards
function initDocumentCards() {
    const viewButtons = document.querySelectorAll('.document-action:nth-child(1)');
    const processButtons = document.querySelectorAll('.document-action:nth-child(2)');
    const addDocumentCard = document.querySelector('.add-document-card');

    viewButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const documentCard = this.closest('.document-card');
            const documentName = documentCard.querySelector('.document-name').textContent.trim();

            showNotification(`Opening document: ${documentName}`, 'info');
        });
    });

    processButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const documentCard = this.closest('.document-card');
            const documentName = documentCard.querySelector('.document-name').textContent.trim();

            showNotification(`Processing document: ${documentName}`, 'info');

            // Simulate processing delay
            setTimeout(() => {
                showNotification(`Document processing started: ${documentName}`, 'success');

                // Show the processing status section
                const processingStatus = document.querySelector('.processing-card');
                if (processingStatus) {
                    processingStatus.style.display = 'flex';

                    // Update document name in processing card
                    const processingTitle = processingStatus.querySelector('.processing-title');
                    if (processingTitle) {
                        processingTitle.textContent = `Document: ${documentName}`;
                    }

                    // Start progress animation
                    startProgressAnimation();
                }
            }, 1000);
        });
    });

    if (addDocumentCard) {
        addDocumentCard.addEventListener('click', function () {
            showNotification('Document upload feature will be available in the next release.', 'info');
        });
    }
}

// Initialize processing status
function initProcessingStatus() {
    const viewExtractedBtn = document.querySelector('.view-extracted-btn');
    const cancelProcessingBtn = document.querySelector('.cancel-processing');

    if (viewExtractedBtn) {
        viewExtractedBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // In a real application, this would navigate to the extracted data view
            showNotification('Extracted data view will be available in the next release.', 'info');
        });
    }

    if (cancelProcessingBtn) {
        cancelProcessingBtn.addEventListener('click', function (e) {
            e.preventDefault();

            confirmDialog('Are you sure you want to cancel processing?', function () {
                showNotification('Processing cancelled.', 'info');

                // Hide the processing card
                const processingCard = document.querySelector('.processing-card');
                if (processingCard) {
                    processingCard.style.display = 'none';
                }
            });
        });
    }
}

// Initialize data validation
function initDataValidation() {
    const approveBtn = document.querySelector('.approve-btn');
    const editBtn = document.querySelector('.edit-btn');
    const rejectBtn = document.querySelector('.reject-btn');

    if (approveBtn) {
        approveBtn.addEventListener('click', function () {
            showNotification('All extracted data approved!', 'success');
        });
    }

    if (editBtn) {
        editBtn.addEventListener('click', function () {
            showNotification('Edit mode will be available in the next release.', 'info');
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', function () {
            showNotification('Rejection workflow will be available in the next release.', 'info');
        });
    }

    // Add click handlers for editable cells
    const editableCells = document.querySelectorAll('.validation-table td:nth-child(2)');

    editableCells.forEach(cell => {
        cell.addEventListener('click', function () {
            const currentValue = this.textContent.trim();
            const fieldName = this.parentElement.querySelector('td:first-child').textContent.trim();

            // Create an input to replace the text
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.className = 'inline-edit';

            // Replace the cell content with the input
            this.innerHTML = '';
            this.appendChild(input);

            // Focus the input
            input.focus();

            // Select all text
            input.select();

            // Handle blur event to save
            input.addEventListener('blur', function () {
                const newValue = this.value;
                cell.textContent = newValue;

                // In a real application, this would update the extracted data
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

// Initialize upload button
function initUploadButton() {
    const uploadBtn = document.querySelector('.page-actions .btn');

    if (uploadBtn) {
        uploadBtn.addEventListener('click', function () {
            showNotification('Document upload feature will be available in the next release.', 'info');
        });
    }
}

// Simulate progress animation
function startProgressAnimation() {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const timeRemaining = document.querySelector('.time-remaining');

    if (!progressBar || !progressText || !timeRemaining) return;

    // Reset progress
    progressBar.style.width = '0%';
    let progress = 0;
    let seconds = 30;

    // Update progress every 300ms
    const interval = setInterval(() => {
        progress += 3.33; // Complete in ~30 steps (≈10 seconds)
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.min(Math.round(progress), 100)}% Complete`;

        seconds = Math.max(0, seconds - 1);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timeRemaining.textContent = `Time Remaining: ${mins}:${secs.toString().padStart(2, '0')}`;

        if (progress >= 100) {
            clearInterval(interval);
            showNotification('Document processing complete!', 'success');

            // Show validation section
            const validationCard = document.querySelector('.validation-card');
            if (validationCard) {
                validationCard.style.display = 'block';

                // Scroll to validation section
                validationCard.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, 300);
}