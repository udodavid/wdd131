document.addEventListener('DOMContentLoaded', function() {
    // Product array
    const products = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' }
    ];

    // Populate product options
    const productSelect = document.getElementById('productName');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

    // Handle form submission
    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Increment review counter in localStorage
        let reviewCount = localStorage.getItem('reviewCount') || 0;
        reviewCount++;
        localStorage.setItem('reviewCount', reviewCount);
        // Redirect to review.html
        window.location.href = 'review.html';
    });
});

// Get the current year and update the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get the last modified date of the document and update the footer
document.getElementById('lastModified').textContent = "Last Modified: " + document.lastModified;
