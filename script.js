document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('data-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    saveDataToGoogleSheets(formDataObject);
    form.reset();
  });
});

function saveDataToGoogleSheets(data) {
  const url = 'https://script.google.com/macros/s/AKfycbyE5r-jRGY6N5iVQWQ-SgrMXMN3lGzvMynUDiQs25r4xuEolCT-eKbfiYCFOT-4UxDegQ/exec'; // Replace with your Google Script URL
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then(response => response.json())
    .then(result => {
      console.log('Data saved to Google Sheets:', result);
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
}
