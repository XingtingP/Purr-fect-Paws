$(document).ready(function() {
  // Show the overview content by default
  $("#overview").show();
  $(".tab-button[data-tab='overview']").addClass('active');

  // Switch displayed content when a tab button is clicked
  $(".tab-button").click(afterclick);
});

function afterclick(event) {
  // Prevent the default behavior
  event.preventDefault();

  // Get the tab identifier from the clicked button
  let tabToShow = $(this).attr("data-tab");

  // Hide all tab contents
  $(".tab-content").hide();
  // Remove 'active' class from all tab buttons
  $(".tab-button").removeClass('active');

  // Show the tab content of the currently selected tab and set the button as active
  $("#" + tabToShow).show();
  $(this).addClass('active');
}
