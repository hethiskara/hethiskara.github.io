// Dark/Light Mode Toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle element
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <div class="toggle-ball">
            <i class="bx bx-sun"></i>
            <i class="bx bx-moon"></i>
        </div>
    `;

    // Insert toggle before the btn in right-header
    const rightHeader = document.querySelector('.right-header');
    const downloadBtn = rightHeader.querySelector('.btn');
    rightHeader.insertBefore(themeToggle, downloadBtn);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.classList.add('active');
    }

    // Toggle theme function
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        themeToggle.classList.toggle('active');
        
        // Save theme preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', toggleTheme);
});
