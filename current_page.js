// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Sets the active state for navigation links based on current URL
     * Supports both absolute and relative paths
     */
    function setActiveNavLink() {
        try {
            // Get the current page's pathname and clean it
            let currentPage = window.location.pathname;
            
            // If we're at root, set it to '/' for comparison
            if (currentPage === '') currentPage = '/';
            
            // Handle trailing slash consistency
            currentPage = currentPage.endsWith('/') ? currentPage : currentPage + '/';
            
            // Select all navigation links
            const navLinks = document.querySelectorAll('.nav-link');
            
            // Remove any existing active classes first
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Check each link against current page
            navLinks.forEach(link => {
                try {
                    // Handle both absolute and relative URLs
                    let linkPath = '';
                    
                    if (link.href.startsWith('http')) {
                        // Absolute URL: Parse it to get pathname
                        linkPath = new URL(link.href).pathname;
                    } else {
                        // Relative URL: Use as is
                        linkPath = link.getAttribute('href');
                    }
                    
                    // Handle trailing slash consistency
                    linkPath = linkPath.endsWith('/') ? linkPath : linkPath + '/';
                    
                    // Compare and set active class
                    if (linkPath === currentPage) {
                        link.classList.add('active');
                        // Optionally handle parent elements (for nested menus)
                        const parentListItem = link.closest('li');
                        if (parentListItem) {
                            parentListItem.classList.add('active');
                        }
                    }
                } catch (linkError) {
                    console.warn('Error processing link:', linkError);
                }
            });
        } catch (error) {
            console.error('Error setting active nav link:', error);
        }
    }

    // Set active link when page loads
    setActiveNavLink();

    // Optionally: Update active link when using HTML5 History API
    window.addEventListener('popstate', setActiveNavLink);
});