$(document).ready(function () {
  $(".register-section").hide();
  $(".login-section").hide();
  $(".todo-section").hide();
  $(".add-section").hide();
  $(".edit-section").hide();

  $("#login-btn").click(function () {
    $(".login-section").show();
    $(".register-section").hide();
  });

  $("#register-btn").click(function () {
    $(".register-section").show();
    $(".login-section").hide()
  });

  // LOGIN
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
                  <button class="btn btn-primary editBtn" value="${el.id}">Edit</button> |
                  <button class="btn btn-danger deleteBtn"  value="${el.id}" >Delete</button>
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

  // REGISTER
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
                  <button class="btn btn-primary editBtn"  value="${el.id}">Edit</button>|
                  <button class="btn btn-danger deleteBtn"  value="${el.id}" >Delete</button>
                </td>
              </tr>
            `)
            })
          })
          .fail(function (err) {
            console.log(err)
          })

      })
      .fail(function (err) {
        console.log('error:', err)
      })
  })

  // ADD FORM
  $("#add-btn").click(function () {
    $(".todo-section").hide();
    $("#toggle").hide();
    $(".add-section").show();
  })

  // ADD TODO
  $("#add").submit(function (e) {
    e.preventDefault();
    const title = $("#todo-title").val();
    const description = $("#todo-description").val();
    const due_date = $("#todo-due_date").val();

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/todos",
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      data: { title, description, due_date }
    })
      .done(function (data) {
        $(".add-section").hide();
        $.ajax({
          type: "GET",
          url: "http://localhost:3000/todos",
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .done(function (todos) {
            $("#todoList").html("")
            todos.forEach(el => {
              $("#todoList").append(`
            <tr>
            <td>${el.id}</td>
            <td>${el.title}</td>
            <td>${el.description}</td>
            <td>${el.due_date}</td>
            <td>
            <button class="btn btn-primary editBtn"  value="${el.id}">Edit</button> |
            <button class="btn btn-danger deleteBtn"  value="${el.id}" >Delete</button>
            </td>
            </tr>
            `)
            })
          })
          .fail(function (err) {
            console.log(err)
          })
        $(".todo-section").show();
      })
      .fail(function (err) {
        console.log(err)
      })
  })

  // DELETE TODO
  $("#todoList").html("")
  $("#todoList").on("click", ".deleteBtn", function (e) {
    $.ajax({
      type: "DELETE",
      url: `http://localhost:3000/todos/${e.target.value}`,
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .done(function (todo) {
        $.ajax({
          type: "GET",
          url: "http://localhost:3000/todos",
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .done(function (todos) {
            $("#todoList").html("")
            todos.forEach(el => {
              $("#todoList").append(`
            <tr>
            <td>${el.id}</td>
            <td>${el.title}</td>
            <td>${el.description}</td>
            <td>${el.due_date}</td>
            <td>
            <button class="btn btn-primary" class="editBtn" value="${el.id}">Edit</button> |
            <button class="btn btn-danger" class="deleteBtn" value="${el.id}" >Delete</button>
            </td>
            </tr>
            `)
            })
          })
          .fail(function (err) {
            console.log(err)
          })
        $(".todo-section").show();
      })
      .fail(function (err) {
        console.log(err)
      })
  })

  // EDIT FORM
  $("#todoList").html("")
  $("#todoList").on("click", ".editBtn", function (e) {
    console.log(e.target.value)
    $(".editBtn").click(function () {
      $(".todo-section").hide();
      $("#toggle").hide();
      $(".edit-section").show();
    })
  })


  // CANCEL EDIT
  $("#cancel-edit").click(function () {
    $(".todo-section").show();
    $("#toggle").hide();
    $(".edit-section").hide();
  })

  // CANCEL ADD
  $("#cancel-add").click(function () {
    $(".todo-section").show();
    $("#toggle").hide();
    $(".add-section").hide();
  })
  

  // EDIT TODO


  // LOGOUT
  $("#logout-btn").click(()=>{
    $(".todo-section").hide();
    $("#toggle").show();
    $(".add-section").hide();
  })

})

