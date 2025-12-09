function loadJobApplications() {
  const tableBody = document.getElementById("jobTableBody");
  
  if (!tableBody) {
    console.error("Table body element not found!");
    return;
  }
  
  tableBody.innerHTML = "";
  const jobs = JSON.parse(localStorage.getItem("jobApplications")) || [];
  

  const params = new URLSearchParams(window.location.search);
  const search = params.get("search")?.toLowerCase() || "";
  
  console.log("Total jobs:", jobs.length);
  console.log("Search term:", search);
  
  const filteredJobs = search ? jobs.filter(job =>
    (job.title || '').toLowerCase().includes(search) ||
    (job.company || '').toLowerCase().includes(search) ||
    (job.role || '').toLowerCase().includes(search) ||
    (job.industry || '').toLowerCase().includes(search) ||
    (job.location || '').toLowerCase().includes(search) ||
    (job.status || '').toLowerCase().includes(search)
  ) : jobs;
  
  console.log("Filtered jobs:", filteredJobs.length);
  
  if (filteredJobs.length === 0) {
    const message = search 
      ? `No results found for "<b>${search}</b>"`
      : "No applications found. Go to Dashboard to add applications!";
    
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:20px; color:#888;">
          ${message}
        </td>
      </tr>`;
    return;
  }
  
  // Show filtered results
  filteredJobs.forEach(job => {
    const row = document.createElement("tr");
    
    // Determine badge color based on status
    let badgeClass = "bg-secondary";
    const statusLower = (job.status || '').toLowerCase();
    
    if (statusLower.includes("rejected")) {
      badgeClass = "bg-danger";
    } else if (statusLower.includes("interview")) {
      badgeClass = "bg-warning text-dark";
    } else if (statusLower.includes("applied")) {
      badgeClass = "bg-primary";
    } else if (statusLower.includes("offer")) {
      badgeClass = "bg-success";
    } else if (statusLower.includes("awaiting") || statusLower.includes("follow")) {
      badgeClass = "bg-secondary";
    }
    
    row.innerHTML = `
      <td data-label="Posting Title">${job.title || 'N/A'}</td>
      <td data-label="Company">${job.company || 'N/A'}</td>
      <td data-label="Role">${job.role || 'Full-time'}</td>
      <td data-label="Industry">${job.industry || 'N/A'}</td>
      <td data-label="Application Status">
        <span class="badge ${badgeClass}">${job.status || 'N/A'}</span>
      </td>
      <td data-label="Location">${job.location || 'Remote/Hybrid'}</td>
      <td data-label="Application Date">${job.date || 'N/A'}</td>
      <td data-label="Link">
        ${job.link ? `<a href="${job.link}" target="_blank" class="btn btn-sm btn-info">View Posting</a>` : 'N/A'}
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Handle search form submission
function setupSearch() {
  const searchForm = document.querySelector('.navbar-search form');
  const searchInput = document.querySelector('.navbar-search input');
  
  if (searchForm && searchInput) {
    
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const searchTerm = searchInput.value.trim();
      console.log("Search submitted:", searchTerm);
      
      if (searchTerm) {
        
        window.location.href = `resources.html?search=${encodeURIComponent(searchTerm)}`;
      } else {
       
        window.location.href = 'resources.html';
      }
    });
    
    
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) {
      searchInput.value = search;
    }
  }
}




document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");
  setupSearch();
  loadJobApplications();
});