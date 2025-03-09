// ⚠️ Note: Never store passwords in frontend JavaScript in production!
const users = {
    "admin1@example.com": {
        password: "password123",
        reportUrl: "https://app.powerbi.com/reportEmbed?reportId=db8575fc-eda4-4ccc-a6e1-b8e56f81cba9&autoAuth=true&ctid=e6d0ae50-8d73-4eb2-acbc-4858b79c8ad1" // ✅ Add Power BI report URL for admin1
    },
    "admin2@example.com": {
        password: "adminpass",
        reportUrl: "https://app.powerbi.com/reportEmbed?reportId=e5e58fc7-ac48-4e4b-80d5-c0aa9022200b&autoAuth=true&ctid=e6d0ae50-8d73-4eb2-acbc-4858b79c8ad1" // ✅ Add Power BI report URL for admin2
    }
};

// Get DOM elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const rememberMeCheckbox = document.getElementById("remember-me");
const loginButton = document.getElementById("login-btn");

// Check if email is remembered and auto-fill
const rememberedEmail = localStorage.getItem("rememberedEmail");
if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberMeCheckbox.checked = true;
}

// Hide error message when user starts typing
[emailInput, passwordInput].forEach(input => {
    input.addEventListener("input", () => {
        errorMessage.style.display = "none";
    });
});

// Login function
function loginUser() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate inputs
    if (!email || !password) {
        showError("⚠️ Please enter both email and password.");
        return;
    }

    // Authenticate user
    const user = users[email];
    if (user && user.password === password) {
        handleRememberMe(email);

        // ✅ Store Power BI report URL in sessionStorage
        sessionStorage.setItem("reportUrl", user.reportUrl); 

        console.log("✅ Power BI Report URL stored:", user.reportUrl); // Debugging log

        alert("✅ Login Successful! Redirecting to Dashboard...");
        window.location.href = "dashboard.html"; // 🔀 Redirect to dashboard
    } else {
        showError("❌ Invalid Email or Password.");
    }
}

// Remember Me functionality
function handleRememberMe(email) {
    if (rememberMeCheckbox.checked) {
        localStorage.setItem("rememberedEmail", email);
    } else {
        localStorage.removeItem("rememberedEmail");
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

// Attach event listeners
loginButton.addEventListener("click", loginUser);
passwordInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") loginUser(); // Allow Enter key to trigger login
});
