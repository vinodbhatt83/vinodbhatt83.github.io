// deal-documents.js
document.addEventListener('DOMContentLoaded', function () {
    const documentUpload = document.getElementById('document-upload');
    const uploadArea = document.querySelector('.upload-area');
    const uploadLink = document.querySelector('.upload-link');
    const uploadedDocumentsList = document.querySelector('.uploaded-documents-list');
    const continueButton = document.querySelector('.btn-primary');
    const backButton = document.querySelector('.btn-secondary');
    const uploadButtons = document.querySelectorAll('.btn-upload');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    uploadArea.addEventListener('drop', handleDrop, false);

    // Handle file input change
    documentUpload.addEventListener('change', handleFiles, false);

    // Open file browser when upload link is clicked
    uploadLink.addEventListener('click', () => {
        documentUpload.click();
    });

    // Upload buttons for specific document types
    uploadButtons.forEach(button => {
        button.addEventListener('click', () => {
            documentUpload.click();
        });
    });

    // Continue and Back buttons
    continueButton.addEventListener('click', function () {
        window.location.href = 'deal-team.html';
    });

    backButton.addEventListener('click', function () {
        window.location.href = 'deal-details.html';
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        uploadArea.classList.add('highlight');
    }

    function unhighlight() {
        uploadArea.classList.remove('highlight');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(e) {
        // If event is a file input change event, get files from event
        const files = e.target ? e.target.files : e;

        // Convert FileList to array
        [...files].forEach(uploadFile);
    }

    function uploadFile(file) {
        // Create document item
        const documentItem = document.createElement('div');
        documentItem.classList.add('uploaded-document-item');

        documentItem.innerHTML = `
            <div class="document-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8.34162C20 7.8034 19.7831 7.28789 19.3982 6.91161L14.9579 2.56999C14.5842 2.20459 14.0824 2 13.5598 2H6C4.89543 2 4 2.89543 4 4Z" stroke="#2D5BFF" stroke-width="2" stroke-linecap="round" />
                    <path d="M14 2V6C14 7.10457 14.8954 8 16 8H20" stroke="#2D5BFF" stroke-width="2" stroke-linecap="round" />
                </svg>
            </div>
            <div class="document-details">
                <h3>${file.name}</h3>
                <p>Uploaded on ${new Date().toLocaleDateString()} - ${Math.round(file.size / 1024)} KB</p>
            </div>
            <div class="document-actions">
                <button class="btn-view">View</button>
                <button class="btn-delete">Delete</button>
            </div>
        `;

        // Add delete functionality
        const deleteBtn = documentItem.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', () => {
            documentItem.remove();
        });

        // Add view functionality (basic - in real app, would open document)
        const viewBtn = documentItem.querySelector('.btn-view');
        viewBtn.addEventListener('click', () => {
            alert(`Viewing ${file.name}`);
        });

        // Append to list
        uploadedDocumentsList.appendChild(documentItem);

        // Reset file input
        documentUpload.value = '';
    }
});