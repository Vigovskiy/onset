function check_availability_username() {

  var min_chars = 4;
  var max_chars = 30;
  var re = /^\w+$/;
  var characters_error1 = 'Minimum amount of chars is 4';
  var characters_error2 = 'Maximum amount of chars is 30';
  var characters_error3 = 'Chars can be only letters, numbers and underscores!';
  var checking_html = 'Checking...';

  var username = $('#username').val();

  $.post("check_username.php", {
      username: username
    },
    function(result) {

      if (result == 1) {

        if ($('#username').val().length < min_chars) {
          $('#username_availability_result').html(characters_error1);
          $('input[name=submit]').attr('disabled', true);
        } else if ($('#username').val().length > max_chars) {
          $('#username_availability_result').html(characters_error2);
          $('input[name=submit]').attr('disabled', true);
        } else if (!re.test($('#username').val())) {
          $('#username_availability_result').html(characters_error3);
          $('input[name=submit]').attr('disabled', true);
        } else {
          $('#username_availability_result').html(username + ' is Available');
          $('input[name=submit]').attr('disabled', false);
        }
      } else {
        $('#username_availability_result').html(username + ' is not Available');
        $('input[name=submit]').attr('disabled', true);
      }
    });

  if (event.which == 13 || event.keyCode == 13) {

    $.post("check_username.php", {
        username: username
      },
      function(result) {

        if (result == 0) {

          $('#username_availability_result').html(username + ' is not Available');
          $('input[name=submit]').attr('disabled', true);
        }
      });
  }
  
  $('#submit').click(function() {
    $.post("check_username.php", {
        username: username
      },
      function(result) {

        if (result == 0) {

          $('#username_availability_result').html(username + ' is not Available');
          $('input[name=submit]').attr('disabled', true);
        }
      });

  });
}