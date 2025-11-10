// Track login state (you can later replace this with real authentication)
let isLoggedIn = false;

// --- Initialize UI State on Page Load ---
window.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.getElementById("user-icon");
  const authButton = document.getElementById("auth-button");

  // Ensure the correct state is displayed on page load
  if (!isLoggedIn) {
    userIcon.classList.add("hidden"); // Keep icon hidden when not logged in
    authButton.textContent = "Login";
  } else {
    userIcon.classList.remove("hidden");
    authButton.textContent = "Logout";
  }
});

// --- Toggle Login/Logout ---
function toggleAuthButton() {
  const authButton = document.getElementById("auth-button");
  const userIcon = document.getElementById("user-icon");

  if (isLoggedIn) {
    // --- LOGOUT Routine ---
    authButton.textContent = "Login";
    userIcon.classList.add("hidden"); // Hide the icon again
    isLoggedIn = false;

    console.log("User logged out. Button now shows 'Login'.");

    // Example: Clear session or token if needed
    // localStorage.removeItem('authToken');
  } else {
    // --- LOGIN Routine ---
    authButton.textContent = "Logout";
    userIcon.classList.remove("hidden"); // Show the icon
    isLoggedIn = true;

    console.log("User logged in. Button now shows 'Logout'.");

    // Example: Save session state if you want it persistent
    // localStorage.setItem('authToken', 'example_token');
  }
}

// --- Event Listener for Login/Logout Button ---
document.getElementById("auth-button").addEventListener("click", toggleAuthButton);
