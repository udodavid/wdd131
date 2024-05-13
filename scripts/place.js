// Function to calculate windchill
function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 10 && windSpeed > 4.8) {
        return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
    } else {
        return "N/A";
    }
}

// Display windchill on page load
window.addEventListener('load', function () {
    const temperature = 25; // Static temperature value for example
    const windSpeed = 10; // Static wind speed value for example
    const windchill = document.getElementById('windchill');
    const result = calculateWindChill(temperature, windSpeed);
    windchill.textContent = result + "°C"; // Display windchill on the page
});

// Display current year and last modified date in the footer
// Get the current year and update the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get the last modified date of the document and update the footer
document.getElementById('lastModification').textContent = "Last Modification: " + document.lastModified;
