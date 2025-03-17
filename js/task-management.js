// task-management.js

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const createTaskBtn = document.getElementById('create-task-btn');
    const taskModal = document.getElementById('task-modal');
    const taskForm = document.getElementById('task-form');
    const saveTaskBtn = document.getElementById('save-task-btn');
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-cancel');
    const viewTabs = document.querySelectorAll('.view-tab');
    const tasksListView = document.querySelector('.tasks-list-view');
    const tasksBoardView = document.querySelector('.tasks-board-view');

    // Filters
    const statusFilter = document.getElementById('status-filter');
    const assigneeFilter = document.getElementById('assignee-filter');
    const relatedFilter = document.getElementById('related-filter');
    const priorityFilter = document.getElementById('priority-filter');
    const searchInput = document.querySelector('.search-input');
    const sortSelect = document.getElementById('sort-by');

    // Form Inputs
    const taskTitleInput = document.getElementById('task-title-input');
    const taskDescriptionInput = document.getElementById('task-description-input');
    const taskAssigneeInput = document.getElementById('task-assignee-input');
    const taskStatusInput = document.getElementById('task-status-input');
    const taskPriorityInput = document.getElementById('task-priority-input');
    const taskDueInput = document.getElementById('task-due-input');
    const taskRelatedInput = document.getElementById('task-related-input');
    const taskIdInput = document.getElementById('task-id-input');

    // Initialize
    initEventListeners();
    populateBoardView(); // Populate kanban board with tasks

    function initEventListeners() {
        // Open create task modal
        if (createTaskBtn) {
            createTaskBtn.addEventListener('click', () => {
                openTaskModal();
            });
        }

        // Close modal buttons
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                closeTaskModal();
            });
        });

        // Save task button
        if (saveTaskBtn) {
            saveTaskBtn.addEventListener('click', handleSaveTask);
        }

        // View tabs
        viewTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const view = this.getAttribute('data-view');
                changeView(view);
            });
        });

        // Edit task buttons
        const editButtons = document.querySelectorAll('.task-edit');
        editButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                const taskRow = e.target.closest('.task-row');
                if (taskRow) {
                    openEditTaskModal(taskRow);
                }
            });
        });

        // Filter change events
        if (statusFilter) statusFilter.addEventListener('change', applyFilters);
        if (assigneeFilter) assigneeFilter.addEventListener('change', applyFilters);
        if (relatedFilter) relatedFilter.addEventListener('change', applyFilters);
        if (priorityFilter) priorityFilter.addEventListener('change', applyFilters);
        if (searchInput) searchInput.addEventListener('input', applyFilters);
        if (sortSelect) sortSelect.addEventListener('change', sortTasks);

        // Row click event for task details
        const taskRows = document.querySelectorAll('.task-row');
        taskRows.forEach(row => {
            row.addEventListener('click', function (e) {
                // Only open modal if not clicking on a button or link
                if (!e.target.closest('button') && !e.target.closest('a')) {
                    const taskId = this.getAttribute('data-id');
                    openTaskDetailsModal(taskId);
                }
            });
        });
    }

    function openTaskModal(taskData = null) {
        // Reset form
        taskForm.reset();
        taskIdInput.value = '';

        // Set modal title
        const modalTitle = document.getElementById('task-modal-title');
        modalTitle.textContent = taskData ? 'Edit Task' : 'Create New Task';

        // Fill form with task data if editing
        if (taskData) {
            fillTaskForm(taskData);
        } else {
            // Set default values for new task
            taskStatusInput.value = 'open';
            taskPriorityInput.value = 'medium';

            // Set due date to tomorrow by default
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            taskDueInput.value = formatDateForInput(tomorrow);
        }

        // Show modal
        taskModal.classList.add('show');

        // Focus on title input
        setTimeout(() => {
            taskTitleInput.focus();
        }, 100);
    }

    function closeTaskModal() {
        taskModal.classList.remove('show');
    }

    function fillTaskForm(taskData) {
        taskTitleInput.value = taskData.title;
        taskDescriptionInput.value = taskData.description || '';
        taskAssigneeInput.value = taskData.assignee || '';
        taskStatusInput.value = taskData.status || 'open';
        taskPriorityInput.value = taskData.priority || 'medium';
        taskDueInput.value = taskData.dueDate ? formatDateForInput(new Date(taskData.dueDate)) : '';
        taskRelatedInput.value = taskData.relatedItem || '';
        taskIdInput.value = taskData.id || '';
    }

    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function handleSaveTask() {
        // Validate form
        if (!taskTitleInput.value.trim()) {
            //showNotification('Please enter a task title', 'error');
            return;
        }

        // Get form data
        const taskData = {
            id: taskIdInput.value || generateTaskId(),
            title: taskTitleInput.value.trim(),
            description: taskDescriptionInput.value.trim(),
            assignee: taskAssigneeInput.value,
            status: taskStatusInput.value,
            priority: taskPriorityInput.value,
            dueDate: taskDueInput.value ? new Date(taskDueInput.value) : null,
            relatedItem: taskRelatedInput.value
        };

        // In a real app, this would send data to an API
        // For demo purposes, we'll just update the UI
        if (taskIdInput.value) {
            updateTaskInUI(taskData);
            //showNotification('Task updated successfully', 'success');
        } else {
            addTaskToUI(taskData);
            //showNotification('Task created successfully', 'success');
        }

        // Close modal
        closeTaskModal();
    }

    function generateTaskId() {
        return 'task_' + Date.now();
    }

    function addTaskToUI(taskData) {
        // Add to list view
        addTaskToListView(taskData);

        // Add to board view
        addTaskToBoardView(taskData);

        // Update counts
        updateTaskCounts();
    }

    function updateTaskInUI(taskData) {
        // Update in list view
        updateTaskInListView(taskData);

        // Update in board view
        updateTaskInBoardView(taskData);

        // Update counts
        updateTaskCounts();
    }

    function addTaskToListView(taskData) {
        const tableBody = document.querySelector('.tasks-table tbody');
        if (!tableBody) return;

        // Create new row
        const row = document.createElement('tr');
        row.className = 'task-row';
        row.setAttribute('data-id', taskData.id);
        row.setAttribute('data-status', taskData.status);
        row.setAttribute('data-priority', taskData.priority);
        row.setAttribute('data-assignee', taskData.assignee);
        row.setAttribute('data-related', taskData.relatedItem);

        // Format due date for display
        let dueDateDisplay = '';
        let dueDateClass = '';

        if (taskData.dueDate) {
            if (taskData.status === 'completed') {
                dueDateDisplay = 'Completed';
                dueDateClass = 'completed';
            } else {
                const today = new Date();
                const dueDate = new Date(taskData.dueDate);
                const diffDays = Math.round((dueDate - today) / (1000 * 60 * 60 * 24));

                if (diffDays < 0) {
                    dueDateDisplay = 'Overdue';
                    dueDateClass = 'due-soon';
                } else if (diffDays === 0) {
                    dueDateDisplay = 'Today';
                    dueDateClass = 'due-soon';
                } else if (diffDays === 1) {
                    dueDateDisplay = 'Tomorrow';
                    dueDateClass = 'due-soon';
                } else if (diffDays < 7) {
                    dueDateDisplay = diffDays + ' days';
                    dueDateClass = 'due-soon';
                } else {
                    dueDateDisplay = dueDate.toLocaleDateString();
                }
            }
        }

        // Get assignee information
        const assigneeInfo = getAssigneeInfo(taskData.assignee);

        // Get related item information
        const relatedInfo = getRelatedItemInfo(taskData.relatedItem);

        // Set row HTML
        row.innerHTML = `
            <td class="task-status">
                <span class="status-indicator status-${taskData.status}"></span>
            </td>
            <td class="task-title">
                <div class="task-title-wrapper">
                    <span class="task-name">${taskData.title}</span>
                    <span class="task-description">${taskData.description || ''}</span>
                </div>
            </td>
            <td class="task-assignee">
                ${assigneeInfo ? `<div class="user-avatar" title="${assigneeInfo.name}">${assigneeInfo.initials}</div>` : ''}
            </td>
            <td class="task-priority">
                <span class="priority-badge priority-${taskData.priority}">${capitalizeFirstLetter(taskData.priority)}</span>
            </td>
            <td class="task-due">
                <span class="due-date ${dueDateClass}">${dueDateDisplay}</span>
            </td>
            <td class="task-related">
                ${relatedInfo ? `
                    <a href="${relatedInfo.url}" class="related-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        ${relatedInfo.name}
                    </a>
                ` : ''}
            </td>
            <td class="task-actions">
                <button class="btn-icon task-edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </td>
        `;

        // Add to table (prepend for newest first)
        tableBody.prepend(row);

        // Add click event for edit
        const editButton = row.querySelector('.task-edit');
        if (editButton) {
            editButton.addEventListener('click', function (e) {
                e.stopPropagation();
                openEditTaskModal(row);
            });
        }

        // Add click event for row
        row.addEventListener('click', function (e) {
            if (!e.target.closest('button') && !e.target.closest('a')) {
                openTaskDetailsModal(taskData.id);
            }
        });
    }

    function updateTaskInListView(taskData) {
        const row = document.querySelector(`.task-row[data-id="${taskData.id}"]`);
        if (!row) return;

        // Update row attributes
        row.setAttribute('data-status', taskData.status);
        row.setAttribute('data-priority', taskData.priority);
        row.setAttribute('data-assignee', taskData.assignee);
        row.setAttribute('data-related', taskData.relatedItem);

        // Update status indicator
        const statusIndicator = row.querySelector('.status-indicator');
        if (statusIndicator) {
            statusIndicator.className = `status-indicator status-${taskData.status}`;
        }

        // Update title and description
        const taskName = row.querySelector('.task-name');
        const taskDescription = row.querySelector('.task-description');
        if (taskName) taskName.textContent = taskData.title;
        if (taskDescription) taskDescription.textContent = taskData.description || '';

        // Update assignee
        const assigneeCell = row.querySelector('.task-assignee');
        const assigneeInfo = getAssigneeInfo(taskData.assignee);
        if (assigneeCell) {
            assigneeCell.innerHTML = assigneeInfo
                ? `<div class="user-avatar" title="${assigneeInfo.name}">${assigneeInfo.initials}</div>`
                : '';
        }

        // Update priority
        const priorityBadge = row.querySelector('.priority-badge');
        if (priorityBadge) {
            priorityBadge.className = `priority-badge priority-${taskData.priority}`;
            priorityBadge.textContent = capitalizeFirstLetter(taskData.priority);
        }

        // Update due date
        const dueDateElement = row.querySelector('.due-date');
        if (dueDateElement) {
            let dueDateDisplay = '';
            let dueDateClass = '';

            if (taskData.dueDate) {
                if (taskData.status === 'completed') {
                    dueDateDisplay = 'Completed';
                    dueDateClass = 'completed';
                } else {
                    const today = new Date();
                    const dueDate = new Date(taskData.dueDate);
                    const diffDays = Math.round((dueDate - today) / (1000 * 60 * 60 * 24));

                    if (diffDays < 0) {
                        dueDateDisplay = 'Overdue';
                        dueDateClass = 'due-soon';
                    } else if (diffDays === 0) {
                        dueDateDisplay = 'Today';
                        dueDateClass = 'due-soon';
                    } else if (diffDays === 1) {
                        dueDateDisplay = 'Tomorrow';
                        dueDateClass = 'due-soon';
                    } else if (diffDays < 7) {
                        dueDateDisplay = diffDays + ' days';
                        dueDateClass = 'due-soon';
                    } else {
                        dueDateDisplay = dueDate.toLocaleDateString();
                    }
                }
            }

            dueDateElement.className = `due-date ${dueDateClass}`;
            dueDateElement.textContent = dueDateDisplay;
        }

        // Update related item
        const relatedCell = row.querySelector('.task-related');
        const relatedInfo = getRelatedItemInfo(taskData.relatedItem);
        if (relatedCell) {
            relatedCell.innerHTML = relatedInfo
                ? `
                    <a href="${relatedInfo.url}" class="related-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        ${relatedInfo.name}
                    </a>
                `
                : '';
        }
    }

    function openEditTaskModal(taskRow) {
        const taskId = taskRow.getAttribute('data-id');
        const taskTitle = taskRow.querySelector('.task-name').textContent;
        const taskDescription = taskRow.querySelector('.task-description').textContent;
        const taskStatus = taskRow.getAttribute('data-status');
        const taskPriority = taskRow.getAttribute('data-priority');
        const taskAssignee = taskRow.getAttribute('data-assignee');
        const taskRelated = taskRow.getAttribute('data-related');

        // Get due date from text (not ideal, in a real app you'd store this in data attributes)
        const dueDateText = taskRow.querySelector('.due-date').textContent;
        let dueDate = null;

        if (dueDateText !== 'Completed' && dueDateText !== 'Overdue') {
            const today = new Date();

            if (dueDateText === 'Today') {
                dueDate = today;
            } else if (dueDateText === 'Tomorrow') {
                dueDate = new Date();
                dueDate.setDate(today.getDate() + 1);
            } else if (dueDateText.includes('days')) {
                const days = parseInt(dueDateText);
                dueDate = new Date();
                dueDate.setDate(today.getDate() + days);
            } else {
                // Try to parse the date string
                try {
                    dueDate = new Date(dueDateText);
                } catch (e) {
                    dueDate = null;
                }
            }
        }

        const taskData = {
            id: taskId,
            title: taskTitle,
            description: taskDescription,
            status: taskStatus,
            priority: taskPriority,
            assignee: taskAssignee,
            relatedItem: taskRelated,
            dueDate: dueDate
        };

        openTaskModal(taskData);
    }

    function openTaskDetailsModal(taskId) {
        // In a real app, you would fetch task details from an API
        // For demo purposes, we'll just use the data from the row
        const taskRow = document.querySelector(`.task-row[data-id="${taskId}"]`);
        if (taskRow) {
            openEditTaskModal(taskRow);
        }
    }

    function populateBoardView() {
        // Get all tasks from list view
        const taskRows = document.querySelectorAll('.task-row');

        // Clear existing board tasks
        const boardColumns = document.querySelectorAll('.column-tasks');
        boardColumns.forEach(column => {
            column.innerHTML = '';
        });

        // Add tasks to board
        taskRows.forEach(row => {
            const taskData = {
                id: row.getAttribute('data-id'),
                title: row.querySelector('.task-name').textContent,
                description: row.querySelector('.task-description').textContent,
                status: row.getAttribute('data-status'),
                priority: row.getAttribute('data-priority'),
                assignee: row.getAttribute('data-assignee'),
                dueDate: row.querySelector('.due-date').textContent,
                relatedItem: row.getAttribute('data-related')
            };

            addTaskToBoardView(taskData);
        });

        // Update counts
        updateTaskCounts();
    }

    function addTaskToBoardView(taskData) {
        // Find the correct column
        const column = document.querySelector(`.board-column:nth-child(${getColumnIndexForStatus(taskData.status)}) .column-tasks`);
        if (!column) return;

        // Get assignee information
        const assigneeInfo = getAssigneeInfo(taskData.assignee);

        // Get related item information
        const relatedInfo = getRelatedItemInfo(taskData.relatedItem);

        // Format due date for display
        let dueDateDisplay = '';
        let dueDateClass = '';

        if (taskData.dueDate) {
            if (typeof taskData.dueDate === 'string') {
                dueDateDisplay = taskData.dueDate;
                dueDateClass = taskData.dueDate === 'Completed' ? 'completed' :
                    (taskData.dueDate === 'Overdue' || taskData.dueDate === 'Today' ||
                        taskData.dueDate === 'Tomorrow' || taskData.dueDate.includes('days')) ? 'due-soon' : '';
            } else {
                if (taskData.status === 'completed') {
                    dueDateDisplay = 'Completed';
                    dueDateClass = 'completed';
                } else {
                    const today = new Date();
                    const dueDate = new Date(taskData.dueDate);
                    const diffDays = Math.round((dueDate - today) / (1000 * 60 * 60 * 24));

                    if (diffDays < 0) {
                        dueDateDisplay = 'Overdue';
                        dueDateClass = 'due-soon';
                    } else if (diffDays === 0) {
                        dueDateDisplay = 'Today';
                        dueDateClass = 'due-soon';
                    } else if (diffDays === 1) {
                        dueDateDisplay = 'Tomorrow';
                        dueDateClass = 'due-soon';
                    } else if (diffDays < 7) {
                        dueDateDisplay = diffDays + ' days';
                        dueDateClass = 'due-soon';
                    } else {
                        dueDateDisplay = dueDate.toLocaleDateString();
                    }
                }
            }
        }

        // Create task card
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.setAttribute('data-id', taskData.id);
        taskCard.setAttribute('data-priority', taskData.priority);
        taskCard.setAttribute('data-assignee', taskData.assignee || '');
        taskCard.setAttribute('data-related', taskData.relatedItem || '');

        taskCard.innerHTML = `
            <div class="task-card-header">
                <span class="priority-indicator priority-${taskData.priority}"></span>
                <button class="btn-icon task-edit">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="task-card-title">${taskData.title}</div>
            <div class="task-card-description">${taskData.description || ''}</div>
            ${dueDateDisplay ? `
                <div class="task-card-due">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="${dueDateClass}">${dueDateDisplay}</span>
                </div>
            ` : ''}
            <div class="task-card-footer">
                ${assigneeInfo ? `
                    <div class="task-card-assignee">
                        <div class="user-avatar" title="${assigneeInfo.name}">${assigneeInfo.initials}</div>
                    </div>
                ` : ''}
                ${relatedInfo ? `
                    <div class="task-card-related">
                        <a href="${relatedInfo.url}" class="related-item-small">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </a>
                    </div>
                ` : ''}
            </div>
        `;

        // Add to column
        column.appendChild(taskCard);

        // Add click event for edit
        const editButton = taskCard.querySelector('.task-edit');
        if (editButton) {
            editButton.addEventListener('click', function (e) {
                e.stopPropagation();
                openTaskDetailsModal(taskData.id);
            });
        }

        // Add click event for card
        taskCard.addEventListener('click', function () {
            openTaskDetailsModal(taskData.id);
        });
    }

    function updateTaskInBoardView(taskData) {
        // Remove existing card (it might have changed columns)
        const existingCard = document.querySelector(`.task-card[data-id="${taskData.id}"]`);
        if (existingCard) {
            existingCard.remove();
        }

        // Add the updated card (to potentially a new column)
        addTaskToBoardView(taskData);
    }

    function getColumnIndexForStatus(status) {
        switch (status) {
            case 'open': return 1;
            case 'in-progress': return 2;
            case 'completed': return 3;
            default: return 1;
        }
    }

    function updateTaskCounts() {
        // Update list count in header
        const totalTasks = document.querySelectorAll('.task-row').length;

        // Update board counts
        const openTasks = document.querySelectorAll('.task-row[data-status="open"]').length;
        const inProgressTasks = document.querySelectorAll('.task-row[data-status="in-progress"]').length;
        const completedTasks = document.querySelectorAll('.task-row[data-status="completed"]').length;

        // Update column headers
        const openCount = document.querySelector('.board-column:nth-child(1) .task-count');
        const inProgressCount = document.querySelector('.board-column:nth-child(2) .task-count');
        const completedCount = document.querySelector('.board-column:nth-child(3) .task-count');

        if (openCount) openCount.textContent = openTasks;
        if (inProgressCount) inProgressCount.textContent = inProgressTasks;
        if (completedCount) completedCount.textContent = completedTasks;

        // Update pagination (in a real app, this would be more complex)
        const paginationInfo = document.querySelector('.pagination-info');
        if (paginationInfo) {
            paginationInfo.textContent = `Page 1 of 1 (${totalTasks} tasks)`;
        }
    }

    function changeView(view) {
        // Update active tab
        viewTabs.forEach(tab => {
            if (tab.getAttribute('data-view') === view) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Show correct view
        if (view === 'list') {
            tasksListView.style.display = 'block';
            tasksBoardView.style.display = 'none';
        } else if (view === 'board') {
            tasksListView.style.display = 'none';
            tasksBoardView.style.display = 'block';

            // Refresh board view
            populateBoardView();
        }
    }

    function getAssigneeInfo(assigneeCode) {
        switch (assigneeCode) {
            case 'js':
                return { name: 'John Smith', initials: 'JS' };
            case 'sj':
                return { name: 'Sarah Johnson', initials: 'SJ' };
            case 'mc':
                return { name: 'Michael Chen', initials: 'MC' };
            case 'er':
                return { name: 'Emily Rodriguez', initials: 'ER' };
            default:
                return null;
        }
    }

    function getRelatedItemInfo(relatedCode) {
        switch (relatedCode) {
            case 'hampton':
                return { name: 'Hampton Inn & Suites', url: 'deal-underwriting.html' };
            case 'courtyard':
                return { name: 'Courtyard by Marriott', url: 'deal-underwriting.html' };
            case 'hilton':
                return { name: 'Hilton Garden Inn', url: 'deal-underwriting.html' };
            case 'prop1':
                return { name: 'Property 1', url: 'property-details.html' };
            case 'prop2':
                return { name: 'Property 2', url: 'property-details.html' };
            default:
                return null;
        }
    }

    function applyFilters() {
        const statusValue = statusFilter.value;
        const assigneeValue = assigneeFilter.value;
        const relatedValue = relatedFilter.value;
        const priorityValue = priorityFilter.value;
        const searchValue = searchInput.value.toLowerCase();

        // Apply filters to list view
        const rows = document.querySelectorAll('.task-row');
        rows.forEach(row => {
            const rowStatus = row.getAttribute('data-status');
            const rowAssignee = row.getAttribute('data-assignee');
            const rowRelated = row.getAttribute('data-related');
            const rowPriority = row.getAttribute('data-priority');
            const rowTitle = row.querySelector('.task-name').textContent.toLowerCase();
            const rowDescription = row.querySelector('.task-description').textContent.toLowerCase();

            // Check if row matches all filters
            const matchesStatus = statusValue === 'all' || rowStatus === statusValue;
            const matchesAssignee = assigneeValue === 'all' ||
                (assigneeValue === 'me' && rowAssignee === 'js') || // 'me' is John Smith in this demo
                (assigneeValue === 'unassigned' && !rowAssignee) ||
                rowAssignee === assigneeValue;

            const matchesRelated = relatedValue === 'all' ||
                (relatedValue === 'deals' && (rowRelated === 'hampton' || rowRelated === 'courtyard' || rowRelated === 'hilton')) ||
                (relatedValue === 'properties' && (rowRelated === 'prop1' || rowRelated === 'prop2')) ||
                (relatedValue === 'general' && !rowRelated) ||
                rowRelated === relatedValue;

            const matchesPriority = priorityValue === 'all' || rowPriority === priorityValue;

            const matchesSearch = searchValue === '' ||
                rowTitle.includes(searchValue) ||
                rowDescription.includes(searchValue);

            if (matchesStatus && matchesAssignee && matchesRelated && matchesPriority && matchesSearch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });

        // Apply filters to board view
        const cards = document.querySelectorAll('.task-card');
        cards.forEach(card => {
            const cardPriority = card.getAttribute('data-priority');
            const cardAssignee = card.getAttribute('data-assignee');
            const cardRelated = card.getAttribute('data-related');
            const cardTitle = card.querySelector('.task-card-title').textContent.toLowerCase();
            const cardDescription = card.querySelector('.task-card-description').textContent.toLowerCase();

            // Check if card matches all filters
            const matchesAssignee = assigneeValue === 'all' ||
                (assigneeValue === 'me' && cardAssignee === 'js') ||
                (assigneeValue === 'unassigned' && !cardAssignee) ||
                cardAssignee === assigneeValue;

            const matchesRelated = relatedValue === 'all' ||
                (relatedValue === 'deals' && (cardRelated === 'hampton' || cardRelated === 'courtyard' || cardRelated === 'hilton')) ||
                (relatedValue === 'properties' && (cardRelated === 'prop1' || cardRelated === 'prop2')) ||
                (relatedValue === 'general' && !cardRelated) ||
                cardRelated === relatedValue;

            const matchesPriority = priorityValue === 'all' || cardPriority === priorityValue;

            const matchesSearch = searchValue === '' ||
                cardTitle.includes(searchValue) ||
                cardDescription.includes(searchValue);

            if (matchesAssignee && matchesRelated && matchesPriority && matchesSearch) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

        // Update counts after filtering
        updateTaskCounts();
    }

    function sortTasks() {
        const sortBy = sortSelect.value;
        const tableBody = document.querySelector('.tasks-table tbody');
        const rows = Array.from(document.querySelectorAll('.task-row'));

        // Sort rows
        rows.sort((a, b) => {
            if (sortBy === 'due-date') {
                const aDate = getDueDateValue(a.querySelector('.due-date').textContent);
                const bDate = getDueDateValue(b.querySelector('.due-date').textContent);
                return aDate - bDate;
            } else if (sortBy === 'priority') {
                return getPriorityValue(b.getAttribute('data-priority')) - getPriorityValue(a.getAttribute('data-priority'));
            } else if (sortBy === 'created') {
                // For demo purposes, just use the task ID which should have a timestamp
                const aId = a.getAttribute('data-id').split('_')[1] || 0;
                const bId = b.getAttribute('data-id').split('_')[1] || 0;
                return bId - aId; // newest first
            } else if (sortBy === 'updated') {
                // For demo purposes, return in current order
                return 0;
            }

            return 0;
        });

        // Re-append rows in sorted order
        if (tableBody) {
            rows.forEach(row => {
                tableBody.appendChild(row);
            });
        }

        // Also sort board view cards
        sortBoardCards(sortBy);
    }

    function sortBoardCards(sortBy) {
        const columns = document.querySelectorAll('.column-tasks');

        columns.forEach(column => {
            const cards = Array.from(column.querySelectorAll('.task-card'));

            // Sort cards
            cards.sort((a, b) => {
                if (sortBy === 'due-date') {
                    const aDateEl = a.querySelector('.task-card-due span');
                    const bDateEl = b.querySelector('.task-card-due span');
                    const aDate = aDateEl ? getDueDateValue(aDateEl.textContent) : Number.MAX_SAFE_INTEGER;
                    const bDate = bDateEl ? getDueDateValue(bDateEl.textContent) : Number.MAX_SAFE_INTEGER;
                    return aDate - bDate;
                } else if (sortBy === 'priority') {
                    return getPriorityValue(b.getAttribute('data-priority')) - getPriorityValue(a.getAttribute('data-priority'));
                } else if (sortBy === 'created') {
                    // For demo purposes, just use the task ID which should have a timestamp
                    const aId = a.getAttribute('data-id').split('_')[1] || 0;
                    const bId = b.getAttribute('data-id').split('_')[1] || 0;
                    return bId - aId; // newest first
                } else if (sortBy === 'updated') {
                    // For demo purposes, return in current order
                    return 0;
                }

                return 0;
            });

            // Re-append cards in sorted order
            cards.forEach(card => {
                column.appendChild(card);
            });
        });
    }

    function getDueDateValue(dueDateText) {
        // Convert due date text to a sortable value
        if (dueDateText === 'Completed') return Number.MAX_SAFE_INTEGER;
        if (dueDateText === 'Overdue') return -1;
        if (dueDateText === 'Today') return 0;
        if (dueDateText === 'Tomorrow') return 1;

        if (dueDateText.includes('days')) {
            return parseInt(dueDateText);
        }

        // Try to parse as date
        try {
            return new Date(dueDateText).getTime();
        } catch (e) {
            return Number.MAX_SAFE_INTEGER;
        }
    }

    function getPriorityValue(priority) {
        switch (priority) {
            case 'high': return 3;
            case 'medium': return 2;
            case 'low': return 1;
            default: return 0;
        }
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add to document
        document.body.appendChild(notification);

        // Add close event
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notification.remove();
            });
        }

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});