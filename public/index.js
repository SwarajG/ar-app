$(document).ready(function () {
  function init() {
    var response = new Promise(function (resolve) {
      resolve(['English', 'Gujarati', 'Hindi']);
    });
    response.then(function (data) {
      $('select').html(`
        ${data.map(function (value) {
          return `<option value=${value}>${value}</option>`;
        }).join('')}
      `);
      $('select').niceSelect();
    });
  }

  $('.submit').on('click', function () {
    var value = $('select').find(":selected").val();
    console.log(value);
  });

  // init page from here
  init();
});
