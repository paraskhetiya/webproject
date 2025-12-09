document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newApplicationForm');
    const tableBody = document.querySelector('#jobapp tbody');
    const alertContainer = document.getElementById('alertContainer');

    let applications = [];

    // Load applications from localStorage
    function loadApplications() {
        const storedApplications = localStorage.getItem('jobApplications');
        if (storedApplications) {
            applications = JSON.parse(storedApplications);
        }
        renderApplications();
        updateStats();
    }

    // Save applications to localStorage
    function saveApplications() {
        localStorage.setItem('jobApplications', JSON.stringify(applications));
    }

    // Create status badge
    function createStatusBadge(status) {
        let badgeClass = '';
        switch (status) {
            case 'Applied':
                badgeClass = 'bg-primary';
                break;
            case 'Interview Scheduled':
                badgeClass = 'bg-warning text-dark';
                break;
            case 'Offer Received':
                badgeClass = 'bg-success';
                break;
            case 'Rejected':
                badgeClass = 'bg-danger';
                break;
            case 'Awaiting Follow-up':
            default:
                badgeClass = 'bg-secondary';
                break;
        }
        return `<span class="badge ${badgeClass}">${status}</span>`;
    }

    // Render applications to table
    function renderApplications() {
        tableBody.innerHTML = ''; 
        
        if (applications.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center; padding:20px; color:#888;">
                        No applications logged yet. Click "New Application" to add one!
                    </td>
                </tr>
            `;
            return;
        }

        applications.forEach((app, index) => {
            const row = tableBody.insertRow();

            row.insertCell().textContent = app.title;
            row.insertCell().textContent = app.company;
            row.insertCell().textContent = app.role || 'Full-time';
            row.insertCell().textContent = app.industry || 'N/A';
            row.insertCell().innerHTML = createStatusBadge(app.status);
            row.insertCell().textContent = app.location || 'Remote/Hybrid';
            row.insertCell().textContent = app.date;

            const linkCell = row.insertCell();
            if (app.link) {
                linkCell.innerHTML = `<a href="${app.link}" target="_blank" class="btn btn-sm btn-outline-info">View Job</a>`;
            } else {
                linkCell.textContent = 'N/A';
            }
        });
    }

    // Update statistics
    function updateStats() {
        const total = applications.length;
        const interviews = applications.filter(app => app.status === 'Interview Scheduled').length;
        const offers = applications.filter(app => app.status === 'Offer Received').length;

        document.getElementById('totalApplications').textContent = total;
        document.getElementById('interviewsScheduled').textContent = interviews;
        document.getElementById('offersReceived').textContent = offers;
    }

    // Show alert message
    function showAlert(message, type = 'success') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.setAttribute('role', 'alert');
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertContainer.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.remove('show');
            alert.classList.add('fade');
            alert.addEventListener('transitionend', () => alert.remove());
        }, 5000);
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const newApplication = {
            id: Date.now(), // Unique ID
            title: document.getElementById('inputTitle').value,
            company: document.getElementById('inputCompany').value,
            role: document.getElementById('inputRole').value,
            industry: document.getElementById('inputIndustry').value,
            location: document.getElementById('inputLocation').value,
            status: document.getElementById('inputStatus').value,
            date: document.getElementById('inputDate').value,
            link: document.getElementById('inputLink').value,
        };

        applications.push(newApplication);
        saveApplications();
        renderApplications();
        updateStats();
        
        showAlert(`Application for <strong>${newApplication.title}</strong> at <strong>${newApplication.company}</strong> successfully logged!`, 'success');

        // Close modal
        const modalElement = document.getElementById('applicationModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        form.reset();
    });

    // Initialize
    loadApplications();
});