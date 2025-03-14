document.addEventListener('DOMContentLoaded', function () {
    const continueButton = document.querySelector('.btn-primary');
    const cancelButton = document.querySelector('.btn-secondary');

    continueButton.addEventListener('click', function () {
        // Basic form validation
        window.location.href = 'deal-documents.html';
        const requiredFields = document.querySelectorAll('input[required], select[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            // Collect form data
            const formData = {
                propertyName: document.querySelector('input[placeholder="Enter property name"]').value,
                brand: document.querySelector('select[placeholder="Select Brand"]').value,
                location: document.querySelector('input[placeholder="City, State"]').value,
                numberOfKeys: document.querySelector('input[placeholder="Enter number of rooms"]').value,
                purchasePrice: document.querySelector('input[placeholder="$ Amount"]').value,
                dealStage: document.querySelector('select[placeholder="Initial Review"]').value,
                propertyType: document.querySelector('select[placeholder="Select Property Type"]').value,
                marketType: document.querySelector('select[placeholder="Select Market"]').value,
                dealLead: document.querySelector('select[name="deal-lead"]').value,
                underwritingTeam: Array.from(document.querySelector('select[multiple]').selectedOptions).map(option => option.value)
            };

            // In a real app, this would send data to backend
            console.log('New Deal Data:', formData);

            // Redirect to deal details page
            //window.location.href = 'deal-details.html';
        }
    });

    cancelButton.addEventListener('click', function () {
        window.location.href = 'pipeline.html';
    });
});