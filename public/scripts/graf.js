document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/graf/account-growth')
    .then(response => response.json())
    .then(data => {
      renderGraph(data);
    })
    .catch(error => {
      console.error('Error fetching account growth data:', error);
    });
});

function renderGraph(data) {
  // Set dimensions and margins for the graph
  const margin = {top: 30, right: 30, bottom: 70, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // Append an SVG object to the body of the page
  // ...
  // Bars
  // ...
}

/* Additional D3.js functionality as required */
