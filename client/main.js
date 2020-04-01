$(document).ready(function () {
  $(".register-section").hide();
  $(".login-section").hide();
  $(".todo-section").hide()

  $("#login-btn").click(function () {
    $(".login-section").show();
    $(".register-section").hide();
  });
  
  $("#register-btn").click(function () {
    $(".register-section").show();
    $(".login-section").hide()
  });

  $("#login").submit(function (e) {
    e.preventDefault()
    const email = $("#email-login").val();
    const password = $("#password-login").val();
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/login",
      data: { email: email, password: password }
    })
      .done(function (data) {
        localStorage.setItem("access_token", data.access_token);
        $(".register-section").hide();
        $(".login-section").hide();
        $("#toggle").hide();
        $(".todo-section").show();
      })
      .fail(function (err) {
        console.log('error cui :', err)
      })
  })


})

