// Dark Mode Toggle - Professional Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme on page load - default to dark mode
    if (savedTheme === 'light') {
        // Only remove dark-mode if user explicitly chose light
        document.body.classList.remove('dark-mode');
    } else {
        // Default to dark mode (when no preference or preference is dark)
        document.body.classList.add('dark-mode');
    }

    // Create theme toggle button
    createThemeToggle();

    // Toggle theme function
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }

    // Create theme toggle button in navigation
    function createThemeToggle() {
        // Check if toggle already exists
        if (document.querySelector('.theme-toggle-btn')) return;

        const themeToggleBtn = document.createElement('button');
        themeToggleBtn.className = 'theme-toggle-btn';
        themeToggleBtn.setAttribute('aria-label', 'Toggle dark mode');
        themeToggleBtn.innerHTML = `
            <i class='bx bx-moon'></i>
            <i class='bx bx-sun'></i>
        `;

        // Add styles for the toggle button
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle-btn {
                position: relative;
                width: 44px;
                height: 44px;
                background: transparent;
                border: 2px solid var(--border-medium);
                border-radius: var(--radius-lg);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all var(--transition-base);
                overflow: hidden;
            }

            .theme-toggle-btn:hover {
                background: var(--bg-tertiary);
                border-color: var(--border-strong);
            }

            .theme-toggle-btn i {
                font-size: 20px;
                color: var(--text-primary);
                position: absolute;
                transition: all var(--transition-base);
            }

            .theme-toggle-btn .bx-sun {
                opacity: 0;
                transform: rotate(-90deg) scale(0);
            }

            .theme-toggle-btn .bx-moon {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }

            body.dark-mode .theme-toggle-btn .bx-sun {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }

            body.dark-mode .theme-toggle-btn .bx-moon {
                opacity: 0;
                transform: rotate(90deg) scale(0);
            }

            @media (max-width: 768px) {
                .theme-toggle-btn {
                    position: absolute;
                    top: 50%;
                    right: 60px;
                    transform: translateY(-50%);
                }
            }
        `;
        document.head.appendChild(style);

        // Insert toggle button into navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            // Insert before nav-toggle (mobile menu button) or at the end
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle) {
                navContainer.insertBefore(themeToggleBtn, navToggle);
            } else {
                navContainer.appendChild(themeToggleBtn);
            }

            // Add click event listener
            themeToggleBtn.addEventListener('click', toggleTheme);
        }
    }
});
