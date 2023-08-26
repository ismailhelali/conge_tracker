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
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyxfbHb-v57wqbqWi1sB08lbxtbWP2NdZ9pdSHC325HTuNIiImBIYd4WoAhix7ycebtqw/exec';
  const jsonpCallbackName = 'handleResponse';

  const url = `${scriptURL}?callback=${jsonpCallbackName}&data=${encodeURIComponent(JSON.stringify(data))}`;
  const scriptElement = document.createElement('script');
  scriptElement.src = url;
  document.body.appendChild(scriptElement);
}

function handleResponse(response) {
  if (response.success) {
    console.log('Data saved to Google Sheets:', response);
  } else {
    console.error('Error saving data:', response.error);
  }
}
