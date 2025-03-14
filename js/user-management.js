// user-management.js

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const inviteUserBtn = document.getElementById('invite-user-btn');
    const inviteUserModal = document.getElementById('invite-user-modal');
    const createTeamBtn = document.getElementById('create-team-btn');
    const createTeamCard = document.getElementById('create-team-card');
    const createTeamModal = document.getElementById('create-team-modal');
    const sendInviteBtn = document.getElementById('send-invite-btn');
    const createTeamSubmitBtn = document.getElementById('create-team-submit-btn');
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-cancel');

    // Initialize event listeners
    initEventListeners();

    function initEventListeners() {
        // Open invite user modal
        if (inviteUserBtn) {
            inviteUserBtn.addEventListener('click', () => {
                showModal(inviteUserModal);
            });
        }

        // Open create team modal
        if (createTeamBtn) {
            createTeamBtn.addEventListener('click', () => {
                showModal(createTeamModal);
            });
        }

        // Alternative create team button (card)
        if (createTeamCard) {
            createTeamCard.addEventListener('click', () => {
                showModal(createTeamModal);
            });
        }

        // Close modal buttons
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                hideModal(modal);
            });
        });

        // Handle send invite
        if (sendInviteBtn) {
            sendInviteBtn.addEventListener('click', handleInviteSubmit);
        }

        // Handle create team
        if (createTeamSubmitBtn) {
            createTeamSubmitBtn.addEventListener('click', handleCreateTeam);
        }

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                hideModal(e.target);
            }
        });

        // Attach edit and delete listeners for user rows
        attachUserActionListeners();
    }

    function showModal(modal) {
        if (modal) {
            modal.classList.add('show');
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        }
    }

    function hideModal(modal) {
        if (modal) {
            modal.classList.remove('show');
            // Restore body scrolling
            document.body.style.overflow = '';

            // Reset form if exists
            const form = modal.querySelector('form');
            if (form) {
                form.reset();
            }
        }
    }

    function handleInviteSubmit() {
        // Get form data
        const email = document.getElementById('invite-email').value;
        const name = document.getElementById('invite-name').value;
        const role = document.getElementById('invite-role').value;
        const team = document.getElementById('invite-team').value;

        // Validate form
        if (!email || !name || !role) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // In a real application, this would send an API request
        // For demo purposes, we'll just show a notification
        showNotification(`Invitation sent to ${email}`, 'success');

        // Add the new user to the table (for demo purposes)
        addNewUserToTable({
            name: name,
            email: email,
            role: role,
            team: getTeamName(team),
            status: 'invited'
        });

        // Close the modal
        hideModal(inviteUserModal);
    }

    function getTeamName(teamValue) {
        // Convert team value to display name
        switch (teamValue) {
            case 'management':
                return 'Management';
            case 'acquisitions':
                return 'Acquisitions';
            case 'asset-management':
                return 'Asset Management';
            case 'investors':
                return 'Investors';
            default:
                return teamValue || 'Unassigned';
        }
    }

    function addNewUserToTable(userData) {
        const tableBody = document.querySelector('.users-table tbody');
        if (!tableBody) return;

        // Create new row
        const newRow = document.createElement('tr');

        // Generate initials
        const nameParts = userData.name.split(' ');
        const initials = nameParts.map(part => part.charAt(0)).join('');

        // Role class and label
        let roleClass = 'role-viewer';
        let roleLabel = 'Viewer';

        if (userData.role === 'admin') {
            roleClass = 'role-admin';
            roleLabel = 'Admin';
        } else if (userData.role === 'analyst') {
            roleClass = 'role-analyst';
            roleLabel = 'Analyst';
        }

        // Status class and label
        let statusClass = 'status-active';
        let statusLabel = 'Active';

        if (userData.status === 'invited') {
            statusClass = 'status-invited';
            statusLabel = 'Invited';
        } else if (userData.status === 'inactive') {
            statusClass = 'status-inactive';
            statusLabel = 'Inactive';
        }

        // Set row HTML
        newRow.innerHTML = `
            <td class="user-cell">
                <div class="user-avatar">${initials}</div>
                <span>${userData.name}</span>
            </td>
            <td>${userData.email}</td>
            <td>
                <span class="role-badge ${roleClass}">${roleLabel}</span>
            </td>
            <td>${userData.team}</td>
            <td>
                <span class="status-badge ${statusClass}">${statusLabel}</span>
            </td>
            <td class="actions-cell">
                <button class="btn-icon edit-user">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="btn-icon delete-user">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </td>
        `;

        // Prepend to table (new users at top)
        tableBody.prepend(newRow);

        // Attach event listeners to new buttons
        attachUserActionListeners(newRow);

        // Update pagination count (in a real app)
        updatePagination();

        // Add to recent activity
        addActivityItem({
            type: 'invite',
            user: 'John Smith',
            target: userData.name,
            role: roleLabel
        });
    }

    function updatePagination() {
        // This would update pagination in a real app
        // For demo purposes, we just update the count
        const paginationInfo = document.querySelector('.pagination-info');
        if (paginationInfo) {
            paginationInfo.textContent = 'Page 1 of 1';
        }
    }

    function attachUserActionListeners(container = document) {
        // Edit user buttons
        const editButtons = container.querySelectorAll('.edit-user');
        editButtons.forEach(button => {
            button.addEventListener('click', handleEditUser);
        });

        // Delete user buttons
        const deleteButtons = container.querySelectorAll('.delete-user');
        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDeleteUser);
        });
    }

    function handleEditUser(e) {
        const row = e.target.closest('tr');
        if (!row) return;

        // Get user data
        const userName = row.querySelector('.user-cell span').textContent;
        const userEmail = row.querySelector('td:nth-child(2)').textContent;
        const userRole = row.querySelector('.role-badge').textContent;
        const userTeam = row.querySelector('td:nth-child(4)').textContent;

        // In a real app, this would open an edit modal with the data pre-filled
        showNotification(`Editing user: ${userName}`, 'info');

        // For demo purposes, we'll just log the data
        console.log('Edit user:', {
            name: userName,
            email: userEmail,
            role: userRole,
            team: userTeam
        });
    }

    function handleDeleteUser(e) {
        const row = e.target.closest('tr');
        if (!row) return;

        // Get user name
        const userName = row.querySelector('.user-cell span').textContent;

        // Confirm deletion
        if (confirm(`Are you sure you want to delete ${userName}?`)) {
            // In a real app, this would send an API request
            // For demo purposes, we'll just remove the row
            row.remove();

            // Show notification
            showNotification(`User ${userName} has been deleted`, 'success');

            // Add to recent activity
            addActivityItem({
                type: 'delete',
                user: 'John Smith',
                target: userName
            });
        }
    }

    function handleCreateTeam() {
        // Get form data
        const teamName = document.getElementById('team-name').value;
        const teamDescription = document.getElementById('team-description').value;

        // Validate form
        if (!teamName) {
            showNotification('Please enter a team name', 'error');
            return;
        }

        // In a real application, this would send an API request
        // For demo purposes, we'll just show a notification
        showNotification(`Team ${teamName} created successfully`, 'success');

        // Add the new team to the grid (for demo purposes)
        addNewTeamToGrid({
            name: teamName,
            description: teamDescription,
            members: []
        });

        // Close the modal
        hideModal(createTeamModal);
    }

    function addNewTeamToGrid(teamData) {
        const teamsGrid = document.querySelector('.teams-grid');
        if (!teamsGrid) return;

        // Create new team card
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';

        // Set card HTML
        teamCard.innerHTML = `
            <div class="team-info">
                <h3>${teamData.name}</h3>
                <p>0 members</p>
            </div>
            <div class="team-users">
                <!-- No members yet -->
            </div>
            <div class="team-actions">
                <button class="btn-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;

        // Insert before the "Create Team" card
        teamsGrid.insertBefore(teamCard, createTeamCard);

        // Add to recent activity
        addActivityItem({
            type: 'create-team',
            user: 'John Smith',
            target: teamData.name
        });
    }

    function addActivityItem(activityData) {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        // Create new activity item
        const activityItem = document.createElement('li');
        activityItem.className = 'activity-item';

        // Set icon based on activity type
        let iconSvg = '';
        let contentHtml = '';

        switch (activityData.type) {
            case 'invite':
                iconSvg = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9V15M9 12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                contentHtml = `
                    <span class="activity-user">${activityData.user}</span> invited <span class="activity-highlight">${activityData.target}</span> to join as ${activityData.role}
                `;
                break;
            case 'delete':
                iconSvg = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                contentHtml = `
                    <span class="activity-user">${activityData.user}</span> removed user <span class="activity-highlight">${activityData.target}</span>
                `;
                break;
            case 'create-team':
                iconSvg = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9V15M9 12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                contentHtml = `
                    <span class="activity-user">${activityData.user}</span> created the <span class="activity-highlight">${activityData.target}</span> team
                `;
                break;
            default:
                iconSvg = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 11V14M12 17H12.01M12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                contentHtml = `
                    <span class="activity-user">${activityData.user}</span> performed an action on <span class="activity-highlight">${activityData.target}</span>
                `;
        }

        // Set item HTML
        activityItem.innerHTML = `
            <div class="activity-icon">
                ${iconSvg}
            </div>
            <div class="activity-content">
                ${contentHtml}
            </div>
            <div class="activity-time">Just now</div>
        `;

        // Prepend to activity list (newest first)
        activityList.prepend(activityItem);

        // Remove oldest item if list gets too long
        if (activityList.children.length > 10) {
            activityList.lastElementChild.remove();
        }
    }

    function showNotification(message, type = 'info') {
        // Check if notification container exists
        let notificationContainer = document.querySelector('.notification-container');

        // Create container if it doesn't exist
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
            <button class="notification-close">×</button>
        `;

        // Add notification to container
        notificationContainer.appendChild(notification);

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function () {
            notification.classList.add('notification-hide');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('notification-hide');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
});