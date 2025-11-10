document.getElementById('applicationForm').addEventListener('submit', function(event) {
   
    event.preventDefault();

    const companyName = document.getElementById('companyName').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const appDate = document.getElementById('appDate').value;
    const interviewDate = document.getElementById('interviewDate').value;
    const appStatus = document.getElementById('appStatus').value;
    const messageElement = document.getElementById('message');
    
    messageElement.textContent = '';
    messageElement.className = 'hidden';

    if (!companyName || !jobTitle || !appDate || !appStatus) {
        showMessage('Please fill out all required fields (*).', 'error');
        return;
    }

    if (interviewDate && appDate && new Date(interviewDate) < new Date(appDate)) {
        showMessage('Interview Date cannot be before the Application Date.', 'error');
        return;
    }

    const formData = {
        companyName: companyName,
        jobTitle: jobTitle,
        applicationDate: appDate,
        interviewDate: interviewDate,
        applicationStatus: appStatus,
        source: document.getElementById('source').value.trim() || 'N/A', 
        salaryExpectation: document.getElementById('salaryExpectation').value || 'N/A'
    };

   
    console.log('Application Data Submitted:', formData);
    
   
    showMessage('Application for "' + jobTitle + '" at "' + companyName + '" successfully logged!', 'success');
    
    
    document.getElementById('applicationForm').reset();
});



function showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = type; 
}