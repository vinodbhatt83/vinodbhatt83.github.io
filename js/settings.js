// Settings Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Profile Form Submission
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        const saveProfileBtn = profileForm.querySelector('.btn-primary');
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', function (e) {
                e.preventDefault();
                // Here you would typically send the form data to the server
                console.log('Saving profile changes');
                //showNotification('Profile updated successfully');
            });
        }
    }

    // Password Form Submission
    const passwordForm = document.querySelector('.password-form');
    if (passwordForm) {
        const updatePasswordBtn = passwordForm.querySelector('.btn-primary');
        if (updatePasswordBtn) {
            updatePasswordBtn.addEventListener('click', function (e) {
                e.preventDefault();

                const currentPassword = document.getElementById('current-password').value;
                const newPassword = document.getElementById('new-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;

                if (!currentPassword || !newPassword || !confirmPassword) {
                    //showNotification('Please fill in all password fields', 'error');
                    return;
                }

                if (newPassword !== confirmPassword) {
                    //showNotification('New passwords do not match', 'error');
                    return;
                }

                // Here you would typically send the password data to the server
                console.log('Updating password');

                // Clear password fields
                document.getElementById('current-password').value = '';
                document.getElementById('new-password').value = '';
                document.getElementById('confirm-password').value = '';

                //showNotification('Password updated successfully');
            });
        }
    }

    // Two-Factor Authentication Toggle
    const twoFactorToggle = document.getElementById('two-factor');
    if (twoFactorToggle) {
        twoFactorToggle.addEventListener('change', function () {
            if (this.checked) {
                // Here you would typically handle enabling 2FA
                console.log('Two-factor authentication enabled');
                //showNotification('Two-factor authentication enabled');
            } else {
                // Here you would typically handle disabling 2FA
                console.log('Two-factor authentication disabled');
                //showNotification('Two-factor authentication disabled');
            }
        });
    }

    // Preferences Form Submission
    const preferencesForm = document.querySelector('.preferences-form');
    if (preferencesForm) {
        const savePreferencesBtn = preferencesForm.querySelector('.btn-primary');
        if (savePreferencesBtn) {
            savePreferencesBtn.addEventListener('click', function (e) {
                e.preventDefault();
                // Here you would typically send the preferences data to the server
                console.log('Saving preferences');
                //showNotification('Preferences saved successfully');
            });
        }
    }

    // Notification Settings Submission
    const notificationSettings = document.querySelector('.notification-settings');
    if (notificationSettings) {
        const saveNotificationBtn = notificationSettings.querySelector('.btn-primary');
        if (saveNotificationBtn) {
            saveNotificationBtn.addEventListener('click', function (e) {
                e.preventDefault();
                // Here you would typically send the notification settings to the server
                console.log('Saving notification settings');
                //showNotification('Notification settings saved successfully');
            });
        }
    }

    // API Key Actions
    const viewKeyBtns = document.querySelectorAll('.api-keys .btn:not(.btn-secondary)');
    const regenerateKeyBtns = document.querySelectorAll('.api-keys .btn-secondary');

    viewKeyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const keyItem = this.closest('.api-key-item');
            const keyValue = keyItem.querySelector('.key-value');

            if (keyValue.textContent.includes('•')) {
                keyValue.textContent = 'api_' + Math.random().toString(36).substring(2, 15);
                this.textContent = 'Hide Key';
            } else {
                keyValue.textContent = '••••••••••••••••••••••••';
                this.textContent = 'View Key';
            }
        });
    });

    regenerateKeyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('Are you sure you want to regenerate this API key? The current key will be invalidated.')) {
                // Here you would typically send a request to regenerate the key
                console.log('Regenerating API key');
                //showNotification('API key regenerated successfully');
            }
        });
    });

    // Data Management Actions
    const exportBtns = document.querySelectorAll('.export-options .btn');
    const saveRetentionBtn = document.querySelector('.data-retention .btn-primary');
    const deleteAccountBtn = document.querySelector('.data-deletion .btn-danger');

    exportBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Here you would typically handle the export
            console.log('Exporting data in format:', this.textContent);
            //showNotification('Data export initiated. You will be notified when it\'s ready.');
        });
    });

    if (saveRetentionBtn) {
        saveRetentionBtn.addEventListener('click', function () {
            // Here you would typically send the retention settings to the server
            console.log('Saving retention settings');
            //showNotification('Data retention settings saved successfully');
        });
    }

    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function () {
            if (confirm('WARNING: This action cannot be undone. Are you sure you want to permanently delete your account and all associated data?')) {
                // Here you would typically send a request to delete the account
                console.log('Deleting account');
                //showNotification('Account deletion initiated. You will be logged out shortly.');

                // Redirect to logout page after a delay
                setTimeout(() => {
                    window.location.href = '/logout';
                }, 3000);
            }
        });
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