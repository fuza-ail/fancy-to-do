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
        $("#error").hide();
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
                <td>${el.due_date.slice(0, 10)}</td>
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
        $("#error").html("")
        $("#error").append(`
        <div class="alert alert-danger" role="alert">
        ${err.responseJSON.error}
      </div>
        `)
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
        $("#error").hide();
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
                <td>${el.due_date.slice(0, 10)}</td>
                <td>
                  <button class="btn btn-primary editBtn"  value="${el.id}">Edit</button>|
                  <button class="btn btn-danger deleteBtn"  value="${el.id}" >Delete</button>
                </td>
              </tr>
            `)
            })
          })
          .fail(function (err) {
            console.log('error:', err)
          })

      })
      .fail(function (err) {
        console.log(err)
        $("#error").html("")
        $("#error").append(`
          <div class="alert alert-danger" role="alert">
            ${err.responseJSON.errors[0].message}
          </div>
        `)
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
        $("#error").hide();
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
            <td>${el.due_date.slice(0, 10)}</td>
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
        console.log('error disisni', err.responseJSON.errors[0].message)
        $("#error").html("")
        $("#error").append(`
          <div class="alert alert-danger" role="alert">
            ${err.responseJSON.errors[0].message}
          </div>
        `)
        $("#error").show()
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
            <td>${el.due_date.slice(0, 10)}</td>
            <td>
            <button class="btn btn-primary editBtn" value="${el.id}">Edit</button> |
            <button class="btn btn-danger deleteBtn" value="${el.id}" >Delete</button>
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
    $.ajax({
      type: "GET",
      url: `http://localhost:3000/todos/${e.target.value}`,
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .done(function (todo) {

        $("#edit").append(`
      <div class="form-group">
      <label for="title">Title</label>
      <input type="text" id="editTitle" class="form-control" name="title" value="${todo.title}" >
      </div>
      <div class="form-group">
      <label for="description">Description</label>
      <input  type="text" id="editDescription" class="form-control" name="description" value="${todo.description}" >
      </div>
      <div class="form-group">
      <label for="due_date">Due Date</label>
      <input  type="date" id="editDueDate" class="form-control" name="due_date" value="${todo.due_date.slice(0, 10)}" >
      </div>
      <button value="${todo.id}" id="edit-btn" class="btn btn-info">Update</button>
      `)
        $(".todo-section").hide();
        $("#toggle").hide();
        $(".edit-section").show();
      })
      .fail(function (err) {
        console.log(err)
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
    $("#error").hide();
    $(".todo-section").show();
    $("#toggle").hide();
    $(".add-section").hide();
  })

  // EDIT TODO
  $("#edit").html("")
  $("#edit").on('click', '#edit-btn', function (e) {
    e.preventDefault()
    const title = $("#editTitle").val();
    const description = $("#editDescription").val();
    const due_date = $("#editDueDate").val();
    $.ajax({
      type: "PUT",
      url: `http://localhost:3000/todos/${e.target.value}`,
      data: { title, description, due_date },
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .done(function (e) {
        $(".edit-section").hide();
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
            <td>${el.due_date.slice(0, 10)}</td>
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

  // LOGOUT
  $("#logout-btn").click(() => {
    localStorage.removeItem('access_token')
    location.reload();
  })

})

