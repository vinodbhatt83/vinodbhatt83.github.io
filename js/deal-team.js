// deal-team.js
document.addEventListener('DOMContentLoaded', function () {
    const continueButton = document.querySelector('.btn-primary');
    const backButton = document.querySelector('.btn-secondary');
    const addMemberButton = document.querySelector('.btn-add-member');
    const inviteForm = document.querySelector('.invite-form');
    const sendInvitationButton = inviteForm.querySelector('.btn-primary');
    const inviteModal = document.getElementById('invite-modal');
    const modalCloseButton = inviteModal.querySelector('.modal-close');
    const modalDoneButton = inviteModal.querySelector('.btn-primary');

    // Continue and Back buttons
    continueButton.addEventListener('click', function () {
        // In a real app, this would validate team setup
        window.location.href = 'pipeline.html';
    });

    backButton.addEventListener('click', function () {
        window.location.href = 'deal-documents.html';
    });

    // Add Member Button (opens invite section)
    addMemberButton.addEventListener('click', function () {
        const inviteSection = document.querySelector('.invite-section');
        inviteSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Send Invitation Button
    sendInvitationButton.addEventListener('click', function (e) {
        e.preventDefault();

        // Basic form validation
        const emailInput = inviteForm.querySelector('input[type="email"]');
        const roleSelect = inviteForm.querySelector('select');

        if (!emailInput.value.trim()) {
            emailInput.classList.add('error');
            return;
        }

        if (roleSelect.value === 'Select Role') {
            roleSelect.classList.add('error');
            return;
        }

        // Remove any previous error states
        emailInput.classList.remove('error');
        roleSelect.classList.remove('error');

        // Show invite modal
        inviteModal.classList.add('open');
    });

    // Modal Close Button
    modalCloseButton.addEventListener('click', function () {
        inviteModal.classList.remove('open');
    });

    // Modal Done Button
    modalDoneButton.addEventListener('click', function () {
        inviteModal.classList.remove('open');
    });

    // Role Selector Changes
    const roleSelectors = document.querySelectorAll('.role-selector');
    roleSelectors.forEach(selector => {
        selector.addEventListener('change', function () {
            const teamCard = this.closest('.team-card');
            const memberDetails = teamCard.querySelector('.team-member-details p');

            // Update role display
            memberDetails.textContent = this.value;
        });
    });

    // Toggle Switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function () {
            const parentCard = this.closest('.permission-card, .notification-card');
            if (this.checked) {
                parentCard.classList.remove('disabled');
            } else {
                parentCard.classList.add('disabled');
            }
        });
    });
});