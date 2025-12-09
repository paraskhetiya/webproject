document.getElementById('applicationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const companyName = document.getElementById('companyName').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const appDate = document.getElementById('appDate').value;
    const interviewDate = document.getElementById('interviewDate').value;
    const appStatus = document.getElementById('appStatus').value;
    const source = document.getElementById('source').value.trim();
    const salaryExpectation = document.getElementById('salaryExpectation').value;
    const messageElement = document.getElementById('message');
    
    messageElement.textContent = '';
    messageElement.className = 'hidden';

    // Validation
    if (!companyName || !jobTitle || !appDate || !appStatus) {
        showMessage('Please fill out all required fields (*).', 'error');
        return;
    }

    if (interviewDate && appDate && new Date(interviewDate) < new Date(appDate)) {
        showMessage('Interview Date cannot be before the Application Date.', 'error');
        return;
    }

    // Create application object
    const newApplication = {
        id: Date.now(),
        title: jobTitle,
        company: companyName,
        role: 'Full-time',
        industry: 'N/A',
        location: 'Remote/Hybrid',
        status: appStatus,
        date: appDate,
        link: '',
        source: source || 'N/A',
        salaryExpectation: salaryExpectation || 'N/A',
        interviewDate: interviewDate || 'N/A'
    };

    // Get existing applications from localStorage
    let applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    
    // Add new application
    applications.push(newApplication);
    
    // Save back to localStorage
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    
    console.log('Application Data Saved:', newApplication);
    console.log('Total Applications:', applications.length);
    
    showMessage('Application for "' + jobTitle + '" at "' + companyName + '" successfully logged and saved!', 'success');
    
    // Reset form
    document.getElementById('applicationForm').reset();
});

function showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = type;
}