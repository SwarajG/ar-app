$(document).ready(function () {
  $('.radio-toolbar').on('click', '.radio-button', function () {
    const data = $(this).find('input');
    if (!data.is(':checked')) {
      console.log(data.val());
    }
  });
});