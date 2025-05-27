// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup loading screen
    setupLoadingScreen();
    
    // Mobile Navigation Toggle
    setupMobileNav();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Form validation
    setupFormValidation();
    
    // Animation on scroll
    setupScrollAnimations();
    
    // Testimonial slider (if needed)
    setupTestimonialSlider();
    
    // Theme switcher
    setupThemeSwitcher();
});

// Loading Screen Setup
// Loading Screen Setup
function setupLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (!loadingScreen) {
        console.error('Loading screen element not found');
        return;
    }
    
    // Set a fixed duration for the loading screen (5 seconds)
    setTimeout(hideLoadingScreen, 5000);
    
    // Prevent scrolling while loading screen is visible
    document.body.style.overflow = 'hidden';
    
    function hideLoadingScreen() {
        loadingScreen.classList.add('hidden');
        
        // After transition completes, remove from DOM to improve performance
        setTimeout(function() {
            // Enable scrolling on body after loading screen is hidden
            document.body.style.overflow = '';
        }, 500); // Match this to your CSS transition time
    }
}

// Mobile Navigation Setup
function setupMobileNav() {
    // This function will be implemented when we add a mobile menu button
    // For now, we'll leave it as a placeholder for future implementation
    console.log('Mobile navigation ready for implementation');
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // If it's just "#" (logo link), scroll to top
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // For other links, scroll to the target element
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get the header height to offset the scroll position
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Calculate the target position with offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Form Validation
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            // Basic validation
            let isValid = true;
            
            // Validate name
            if (!nameField.value.trim()) {
                showError(nameField, 'Please enter your name');
                isValid = false;
            } else {
                removeError(nameField);
            }
            
            // Validate email
            if (!emailField.value.trim()) {
                showError(emailField, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailField.value)) {
                showError(emailField, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailField);
            }
            
            // Validate message
            if (!messageField.value.trim()) {
                showError(messageField, 'Please enter your message');
                isValid = false;
            } else {
                removeError(messageField);
            }
            
            // If form is valid, submit it (or show success message)
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                showFormSuccess();
            }
        });
    }
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show error message
function showError(field, message) {
    // Remove any existing error
    removeError(field);
    
    // Add error class to the field
    field.classList.add('error');
    
    // Create and append error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
}

// Helper function to remove error message
function removeError(field) {
    // Remove error class
    field.classList.remove('error');
    
    // Remove any existing error message
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Helper function to show form success message
function showFormSuccess() {
    const contactForm = document.getElementById('contactForm');
    const formContainer = contactForm.parentNode;
    
    // Hide the form
    contactForm.style.display = 'none';
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <h3>Thank You!</h3>
        <p>Your message has been sent successfully. We'll get back to you shortly.</p>
        <button id="resetForm" class="cta-button">Send Another Message</button>
    `;
    
    // Append success message
    formContainer.appendChild(successMessage);
    
    // Add event listener to reset button
    document.getElementById('resetForm').addEventListener('click', function() {
        // Remove success message
        successMessage.remove();
        
        // Reset and show form
        contactForm.reset();
        contactForm.style.display = 'block';
    });
}

// Animation on Scroll
function setupScrollAnimations() {
    // Get all elements that should be animated
    const animatedElements = document.querySelectorAll('.feature, .process-step, .testimonial, .client-logo');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Stop observing the element after it's animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Testimonial Slider
function setupTestimonialSlider() {
    // This is a placeholder for a testimonial slider
    // You can implement a slider here if needed
    console.log('Testimonial slider ready for implementation');
}

// Add CSS for animations and error messages
function addDynamicStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Animation classes */
        .feature, .process-step, .testimonial, .client-logo {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Error and success message styles */
        .error {
            border-color: #ff3860 !important;
        }
        
        .error-message {
            color: #ff3860;
            font-size: 0.85rem;
            margin-top: 0.25rem;
        }
        
        .success-message {
            text-align: center;
            padding: 2rem;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        
        .success-message h3 {
            color: #4361ee;
            margin-bottom: 1rem;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Call the function to add dynamic styles
addDynamicStyles();

// Sticky Header on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Add CSS for sticky header
const stickyStyles = document.createElement('style');
stickyStyles.textContent = `
    header {
        transition: all 0.3s ease;
    }
    
    header.sticky {
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 0.8rem 5%;
    }
`;
document.head.appendChild(stickyStyles);

// Counter Animation for Stats Section
function animateCounters() {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    statItems.forEach(item => {
        // Get the target number
        const target = parseInt(item.textContent);
        // Set initial count
        let count = 0;
        // Set duration in milliseconds
        const duration = 2000;
        // Calculate increment step
        const step = Math.ceil(target / (duration / 16));
        
        // Start counter animation
        const counter = setInterval(() => {
            count += step;
            
            // If count exceeds target, set to target and clear interval
            if (count >= target) {
                item.textContent = target + (item.textContent.includes('+') ? '+' : '');
                clearInterval(counter);
            } else {
                item.textContent = count + (item.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    });
}

// Trigger counter animation when stats section is in viewport
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(statsSection);
}


// Theme Switcher
function setupThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }
    
    // Get saved theme or use system default
    let currentTheme = localStorage.getItem('theme') || 'system';
    
    // Apply the current theme on page load
    applyTheme(currentTheme);
    
    // Update the toggle button to show current theme
    updateToggleButton(currentTheme);
    
    // Add click event to toggle through themes
    themeToggle.addEventListener('click', () => {
        // Cycle through themes: light -> dark -> system -> light
        if (currentTheme === 'light') {
            currentTheme = 'dark';
        } else if (currentTheme === 'dark') {
            currentTheme = 'system';
        } else {
            currentTheme = 'light';
        }
        
        // Save the new theme preference
        if (currentTheme === 'system') {
            localStorage.removeItem('theme');
        } else {
            localStorage.setItem('theme', currentTheme);
        }
        
        // Apply the new theme
        applyTheme(currentTheme);
        
        // Update the toggle button
        updateToggleButton(currentTheme);
        
        // Log the theme change for debugging
        console.log('Theme changed to:', currentTheme);
    });
    
    // Function to apply theme
    function applyTheme(theme) {
        if (theme === 'system') {
            // Use system preference
            if (prefersDarkScheme.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                console.log('Applied dark theme (system preference)');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                console.log('Applied light theme (system preference)');
            }
        } else {
            // Use selected theme
            document.documentElement.setAttribute('data-theme', theme);
            console.log('Applied', theme, 'theme (user selection)');
        }
    }
    
    // Function to update toggle button appearance
    function updateToggleButton(theme) {
        // Remove all theme classes
        themeToggle.classList.remove('light-theme', 'dark-theme', 'system-theme');
        
        // Add current theme class
        themeToggle.classList.add(`${theme}-theme`);
        
        // Update icon
        if (theme === 'light') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-desktop"></i>';
        }
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', e => {
        if (currentTheme === 'system') {
            applyTheme('system');
        }
    });
}


// Page transition functionality
function setupPageTransitions() {
    // Create the page transition element if it doesn't exist
    if (!document.querySelector('.page-transition')) {
        const transitionElement = document.createElement('div');
        transitionElement.className = 'page-transition';
        document.body.appendChild(transitionElement);
    }
    
    // Get all navigation links that lead to other pages
    const pageLinks = document.querySelectorAll('a[href$=".html"]');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't handle if modifier keys are pressed (to allow opening in new tabs)
            if (e.metaKey || e.ctrlKey) return;
            
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            const transitionElement = document.querySelector('.page-transition');
            
            // Prevent scrolling during transition
            document.body.style.overflow = 'hidden';
            
            // Activate the transition overlay
            transitionElement.classList.add('active');
            
            // After the transition completes, navigate to the new page
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300); // Match this timing with the CSS transition duration
        });
    });
}

// Initial page load - hide the loading screen after content loads
document.addEventListener('DOMContentLoaded', function() {
    // Show the initial loading screen only on the first page load
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Check if this is the first visit to the site in this session
    const isFirstVisit = !sessionStorage.getItem('visited');
    
    if (isFirstVisit) {
        // First visit - show the loading screen with logo
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Mark as visited
            sessionStorage.setItem('visited', 'true');
            // Enable scrolling
            document.body.style.overflow = '';
        }, 2000); // Adjust time as needed
    } else {
        // Not first visit - hide loading screen immediately
        loadingScreen.classList.add('hidden');
        // Enable scrolling immediately
        document.body.style.overflow = '';
    }
    
    // Setup the page transitions
    setupPageTransitions();
    
    // Sticky Header on Scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Add CSS for sticky header
    const stickyStyles = document.createElement('style');
    stickyStyles.textContent = `
        header {
            transition: all 0.3s ease;
        }
        
        header.sticky {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 0.8rem 5%;
        }
    `;
    document.head.appendChild(stickyStyles);
    
    // Counter Animation for Stats Section
    function animateCounters() {
        const statItems = document.querySelectorAll('.stat-item h3');
        
        statItems.forEach(item => {
            // Get the target number
            const target = parseInt(item.textContent);
            // Set initial count
            let count = 0;
            // Set duration in milliseconds
            const duration = 2000;
            // Calculate increment step
            const step = Math.ceil(target / (duration / 16));
            
            // Start counter animation
            const counter = setInterval(() => {
                count += step;
                
                // If count exceeds target, set to target and clear interval
                if (count >= target) {
                    item.textContent = target + (item.textContent.includes('+') ? '+' : '');
                    clearInterval(counter);
                } else {
                    item.textContent = count + (item.textContent.includes('+') ? '+' : '');
                }
            }, 16);
        });
    }
    
    // Trigger counter animation when stats section is in viewport
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(statsSection);
    }
});

// Handle the incoming transition when page loads
window.addEventListener('pageshow', function(event) {
    // Hide the transition element when the page is fully loaded
    const transitionElement = document.querySelector('.page-transition');
    if (transitionElement) {
        transitionElement.classList.remove('active');
    }
    
    // Ensure scrolling is enabled when page loads
    document.body.style.overflow = '';
});

// Chat Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chat-button');
    const chatPopup = document.getElementById('chat-popup');
    const closeChat = document.getElementById('close-chat');
    const sendMessage = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input-field');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            chatPopup.style.display = 'flex';
        });
    }
    
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatPopup.style.display = 'none';
        });
    }
    
    if (sendMessage && chatInput) {
        sendMessage.addEventListener('click', sendUserMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }
    
    function sendUserMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'message-sent';
            userMessageDiv.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(userMessageDiv);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate response after 1 second
            setTimeout(function() {
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'message-received';
                botMessageDiv.innerHTML = `<p>Thanks for your message! One of our team members will get back to you shortly. In the meantime, would you like to schedule a free consultation?</p>`;
                chatMessages.appendChild(botMessageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    // Floating Lead Form Functionality
    const leadFormToggle = document.getElementById('lead-form-toggle');
    const leadFormContent = document.querySelector('.lead-form-content');
    const toggleIcon = document.querySelector('.lead-form-toggle i');
    
    if (leadFormToggle) {
        leadFormToggle.addEventListener('click', function() {
            if (leadFormContent.style.display === 'block') {
                leadFormContent.style.display = 'none';
                toggleIcon.className = 'fas fa-angle-up';
            } else {
                leadFormContent.style.display = 'block';
                toggleIcon.className = 'fas fa-angle-down';
            }
        });
    }
    
    // Quick Lead Form Submission
    const quickLeadForm = document.getElementById('quick-lead-form');
    if (quickLeadForm) {
        quickLeadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your interest! We will contact you shortly with your free quote.');
            leadFormContent.style.display = 'none';
            toggleIcon.className = 'fas fa-angle-up';
        });
    }
});
// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.setAttribute('data-theme', 
                document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
            
            // Update icon
            const icon = themeToggle.querySelector('i');
            if (document.body.getAttribute('data-theme') === 'dark') {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
        });
    }
    
    // Scroll animations
    const scrollElements = document.querySelectorAll('.scroll-fade, .scroll-scale, .scroll-left, .scroll-right');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;
        
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initialize on load
    handleScrollAnimation();
    
    // Experimental Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const fullscreenNav = document.querySelector('.fullscreen-nav');
    
    if (navToggle && fullscreenNav) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            fullscreenNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Chatbud functionality
    const chatbudToggle = document.querySelector('.chatbud-toggle');
    const chatbudWindow = document.querySelector('.chatbud-window');
    
    if (chatbudToggle && chatbudWindow) {
        chatbudToggle.addEventListener('click', function() {
            if (chatbudWindow.style.display === 'flex') {
                chatbudWindow.style.display = 'none';
            } else {
                chatbudWindow.style.display = 'flex';
                // Add initial message
                setTimeout(() => {
                    const messagesContainer = document.querySelector('.chatbud-messages');
                    const message = document.createElement('div');
                    message.className = 'chatbud-message chatbud-bot';
                    message.textContent = 'Hi there! 👋 How can I help you today?';
                    messagesContainer.appendChild(message);
                }, 500);
            }
        });
        
        // Send message functionality
        const sendButton = document.querySelector('.chatbud-input button');
        const messageInput = document.querySelector('.chatbud-input input');
        
        if (sendButton && messageInput) {
            const sendMessage = () => {
                const message = messageInput.value.trim();
                if (message) {
                    const messagesContainer = document.querySelector('.chatbud-messages');
                    
                    // User message
                    const userMessage = document.createElement('div');
                    userMessage.className = 'chatbud-message chatbud-user';
                    userMessage.textContent = message;
                    messagesContainer.appendChild(userMessage);
                    
                    // Clear input
                    messageInput.value = '';
                    
                    // Scroll to bottom
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    
                    // Bot response (simulated)
                    setTimeout(() => {
                        const botMessage = document.createElement('div');
                        botMessage.className = 'chatbud-message chatbud-bot';
                        botMessage.textContent = 'Thanks for your message! One of our team members will get back to you shortly. Would you like to schedule a consultation?';
                        messagesContainer.appendChild(botMessage);
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }, 1000);
                }
            };
            
            sendButton.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
});