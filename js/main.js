// 'use strict';

(function ($) {

  function ajax_form() {
    let name = $('#nameInput');
    let surname = $('#surnameInput');
    let terms = $('#termsInput');
    let termsError = $('.termsError');
    let submit = $('#submitButton');
    let formMessage = $('#formMessage');

    let nameValid = false;
    let surnameValid = false;
    let termsValid = false;

    submit.on('click', function () {
      let nameValue = name.val();
      let surnameValue = surname.val();
      if (nameValue.length < 3) {
        name.css({borderColor: 'red'});
        console.error('nameValue is shorter than 3');
      } else {
        nameValid = true;
      }
      if (surnameValue.length < 3) {
        surname.css({borderColor: 'red'});
        console.error('surnameValue is shorter than 3');
      } else {
        surnameValid = true;
      }
      if (terms[0].checked) {
        console.log(true);
        termsError[0].innerHTML = '';
        termsValid = true;
      } else {
        console.error(false);
        termsError[0].innerHTML = 'Zaakceptuj regulamin!';
        termsValid = false;
      }

      let postData = {
        nameInput: nameValue,
        surnameInput: surnameValue,
        termsInput: termsValid
      };

      if (nameValid && surnameValid && termsValid) {
        $.ajax({
          type: 'post',
          url: 'php/send.php',
          data: postData,
          success: function (response) {
            console.log(response);
            formMessage.html(response);
          }
        });
      } else {


        console.error('Form not valid')
      }

    });

    name.on('input', function () {
      let nameValue = name.val();
      if (nameValue.length < 4) {
        name.css({borderColor: 'red'});
        nameValid = false;
      } else if (nameValue.length > 3) {
        name.css({borderColor: 'green'});
        nameValid = true;
      } else {
        name.css({borderColor: 'transparent'});
        nameValid = false;
      }
    });

    surname.on('input', function () {
      let surnameValue = surname.val();
      if (surnameValue.length < 4) {
        surname.css({borderColor: 'red'});
        surnameValid = false;
      } else if (surnameValue.length > 3) {
        surname.css({borderColor: 'green'});
        surnameValid = true;
      } else {
        surname.css({borderColor: 'transparent'});
        surnameValid = false;
      }
    });

    terms.on('change', function () {
      if (terms[0].checked) {
        termsError[0].innerHTML = '';
        termsValid = true;
      } else {
        termsError[0].innerHTML = 'Zaakceptuj regulamin!';
        termsValid = false;
      }
    })
  }

  ajax_form();


  function colors() {

    let rangeRed = $('.rangeRed');
    let redColorValue = $('#redColorValue');
    rangeRed.on('input', function () {
      redColorValue.text(rangeRed.val());
      getColorsValues();
    });

    let rangeGreen = $('.rangeGreen');
    let greenColorValue = $('#greenColorValue');
    rangeGreen.on('input', function () {
      greenColorValue.text(rangeGreen.val());
      getColorsValues();
    });

    let rangeBlue = $('.rangeBlue');
    let blueColorValue = $('#blueColorValue');
    rangeBlue.on('input', function () {
      blueColorValue.text(rangeBlue.val());
      getColorsValues();
    });

    let rangeOpacity = $('.rangeOpacity');
    let opacityValue = $('#opacityValue');
    rangeOpacity.on('input', function () {
      opacityValue.text(rangeOpacity.val());
      getColorsValues();
    });


    let resultColor = $('.resultColor');
    let resultRgbaColor = $('.resultRgbaColor');
    let resultHexColor = $('.resultHexColor');
    let resultOpacity = $('.resultOpacity');

    function getColorsValues() {

      let red = rangeRed.val();
      let green = rangeGreen.val();
      let blue = rangeBlue.val();


      let redHex = (red * 1).toString(16).length === 1 ? '0' + (red * 1).toString(16) : (red * 1).toString(16);
      let greenHex = (green * 1).toString(16).length === 1 ? '0' + (green * 1).toString(16) : (green * 1).toString(16);
      let blueHex = (blue * 1).toString(16).length === 1 ? '0' + (blue * 1).toString(16) : (blue * 1).toString(16);

      let opacity = rangeOpacity.val();

      let rgbaColor = 'rgba(' + red + ',' + green + ',' + blue + ',' + opacity + ')';

      resultColor.css({backgroundColor: rgbaColor});
      resultRgbaColor.find('span').text(rgbaColor);
      resultOpacity.find('span').text(opacity);

      resultHexColor.find('.redHex').text(redHex);
      resultHexColor.find('.greenHex').text(greenHex);
      resultHexColor.find('.blueHex').text(blueHex);
    }
  }
  colors();
})(jQuery);