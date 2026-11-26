function openTab(evt, tabName, bgNumber) {
  // Hide all tab content sections
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.classList.remove('active'));

  // Reset all tab buttons so only the active one enlarges
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));

  // Show selected tab & enlarge its button
  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');

  // Switch page background between Painting (1) and Swirl Pattern (2)
  document.body.className = 'bg-' + bgNumber;
}


