// Main JavaScript file for Schönerr Schwanz website
// Initialize any custom interactions here

// Force scroll to top on page load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function() {
    // Ensure we're at the top after everything loads
    window.scrollTo(0, 0);
    
    console.log('Schönerr Schwanz website loaded 🤘');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
