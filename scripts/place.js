// Function to calculate windchill
function calculateWindChill(temperature, windSpeed, units) {
    // Check if conditions are met for wind chill calculation
    if ((units === "metric" && temperature <= 10 && windSpeed > 4.8) ||
        (units === "imperial" && temperature <= 50 && windSpeed > 3)) {
        // Calculate windchill
        return units === "metric" ?
            ((13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16)))).toFixed(2) + "°C" :
            ((35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16)))).toFixed(2) + "°F";
    } else {
        return "N/A";
    }
}

// Display windchill on page load
window.addEventListener('load', function () {
    const temperature = 25; 
    const windSpeed = 10; 
    const units = "metric";
    const windchillElement = document.getElementById('windchill');
    const windchill = calculateWindChill(temperature, windSpeed, units);
    windchillElement.textContent = windchill;
});

// Get the current year and update the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get the last modified date of the document and update the footer
document.getElementById('lastModification').textContent = "Last Modification: " + document.lastModified;
