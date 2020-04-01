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

  // login
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
        $.ajax({
          type: "GET",
          url: "http://localhost:3000/todos",
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .done(function (todos) {
            todos.forEach(el => {
              $("#todoList").append(`
              <tr>
                <td>${el.id}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.due_date}</td>
                <td>
                  <a href="#"><button class="btn btn-primary" id="login-btn">Edit</button></a> |
                  <a href="#"><button class="btn btn-danger" id="login-btn">Delete</button></a>
                </td>
              </tr>
            `)
            })
          })

      })
      .fail(function (err) {
        console.log('error:', err)
      })

      // register
      $.ajax({

      })
  })

  //register
  $("#register").submit(function (e) {
    e.preventDefault()
    const email = $("#email-reg").val();
    const password = $("#password-reg").val();

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/register",
      data: { email: email, password: password }
    })
      .done(function (data) {
        localStorage.setItem("access_token", data.access_token);
        $(".register-section").hide();
        $(".login-section").hide();
        $("#toggle").hide();
        $(".todo-section").show();
        $.ajax({
          type: "GET",
          url: "http://localhost:3000/todos",
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .done(function (todos) {
            todos.forEach(el => {
              $("#todoList").append(`
              <tr>
                <td>${el.id}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.due_date}</td>
                <td>
                  <a href="#"><button class="btn btn-primary" id="login-btn">Edit</button></a> |
                  <a href="#"><button class="btn btn-danger" id="login-btn">Delete</button></a>
                </td>
              </tr>
            `)
            })
          })

      })
      .fail(function (err) {
        console.log('error:', err)
      })

  })

})

