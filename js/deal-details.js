// deal-details.js
document.addEventListener('DOMContentLoaded', function () {
    // Tab navigation
    const detailsTabs = document.querySelectorAll('.details-tab');
    const detailsSections = [
        document.querySelector('.property-info-section'),
        document.querySelector('.market-analysis-section'),
        document.querySelector('.financial-overview-section'),
        document.querySelector('.investment-thesis-section')
    ];

    detailsTabs.forEach((tab, index) => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            detailsTabs.forEach(t => t.classList.remove('active'));

            // Hide all sections
            detailsSections.forEach(section => {
                section.style.display = 'none';
            });

            // Activate clicked tab
            this.classList.add('active');

            // Show corresponding section
            detailsSections[index].style.display = 'block';
        });
    });

    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const section = this.closest('.section-header').nextElementSibling;
            const infoValues = section.querySelectorAll('.info-value, .metric-value');

            infoValues.forEach(value => {
                const currentText = value.textContent;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentText;
                input.classList.add('edit-input');

                value.innerHTML = '';
                value.appendChild(input);
            });

            // Change button to Save
            this.textContent = 'Save';
            this.classList.add('btn-save');
            this.classList.remove('btn-edit');
        });
    });

    // Continue and Back buttons
    const continueButton = document.querySelector('.btn-primary');
    const backButton = document.querySelector('.btn-secondary');

    continueButton.addEventListener('click', function () {
        window.location.href = 'deal-documents.html';
    });

    backButton.addEventListener('click', function () {
        window.location.href = 'pipeline.html';
    });
});