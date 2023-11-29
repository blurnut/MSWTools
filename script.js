var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var selectedHsgAdd = "";
var selectedHsgType = "";

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
//GOOGLE TRANSLATE - Function to add Google Translate Element
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'zh-CN,ms,ta',  // Chinese (Simplified), Malay, Tamil
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

//SELECTION OF ADDRESS & HOUSING TYPE - Function for dropdown menu
document.addEventListener("DOMContentLoaded", function () {
    // Function to display the selected option
    console.log(selectedHsgAdd);
    function showSelectedOption() {
      // Get selected values from the dropdowns
      selectedHsgAdd = document.getElementById('selectOptionHsgAdd').value;
      selectedHsgType = document.getElementById('selectOptionHsgType').value;
  
      // Display the selected options below the dropdowns
      document.getElementById('selectedOptionHsgAdd').textContent = 'Selected Housing Address: ' + selectedHsgAdd;
      document.getElementById('selectedOptionHsgType').textContent = 'Selected Housing Type: ' + selectedHsgType;
  }
  
  
    // Expose the showSelectedOption function to the global scope
    window.showSelectedOption = showSelectedOption;
    console.log(selectedHsgAdd);

  });

//FAMILY TABLE - Function to add a new row to table
function addRow() {
    // Get the table reference
    var table = document.getElementById("Family");
  
    // Insert a new row at the end of the table
    var newRow = table.insertRow(table.rows.length);
  
    // Define the columns
    var columns = ["Name", "NRIC", "Nationality", "Age", "Relationship", "Occupation", "GrossIncome", "NettIncome"];
  
    // Add cells to the new row
    for (var i = 0; i < columns.length; i++) {
        var cell = newRow.insertCell(i);
        cell.contentEditable = true;
        cell.innerHTML = "";
    }
  }

//EXPENSE TABLE AUTO SUM
document.addEventListener("DOMContentLoaded", function () {
    // Attach an input event listener to each expense cell
    document.querySelectorAll('#expensesTable [contenteditable=true]').forEach(function (cell) {
        cell.addEventListener('input', updateTotal);
    });

    // Calculate and update the total expenses
    function updateTotal() {
        var expenseCells = document.querySelectorAll('#expensesTable [contenteditable=true]');
        var total = 0;

        // Loop through all expense cells and sum up the values
        expenseCells.forEach(function (cell) {
            total += parseFloat(cell.textContent) || 0;
        });

        // Update the total cell
        document.getElementById('total').textContent = total.toFixed(0);
    }
});
