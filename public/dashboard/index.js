$(document).ready(function () {
  function init() {
    var response = new Promise(function (resolve) {
      resolve([
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'Spanish',
          value: 'es',
        },
      ]);
    });
    response.then(function (data) {
      $('select').html(`
        ${data
          .map(function ({ value, label }) {
            return `<option value=${value}>${label}</option>`;
          })
          .join('')}
      `);
      $('select').niceSelect();
    });
  }

  $('.submit').on('click', function () {
    var value = $('select').find(':selected').val();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    location.href = `/product?language=${value}&product=${params.product}&size=${params.size}`;
  });

  // init page from here
  init();
});
