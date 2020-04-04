if (localStorage.getItem('access_token')) {
  $(document).ready(function () {
    $('.global').hide();
    showList()
    $('.todo-section').show();
  })
} else {
  $(document).ready(function () {
    $('.global').hide();
    $('.toggle').show();
  })
}

function showLogin() {
  $('.login-section').show()
  $('.register-section').hide()
  $('.google-section').show()
}

function showRegister() {
  $('.login-section').hide()
  $('.register-section').show()
  $('.google-section').show()
}

// REGISTER
function register(e) {
  e.preventDefault()
  const email = $("#register-input-email").val();
  const password = $("#register-input-password").val();
  
  $.ajax({
    type: "POST",
    url: "http://localhost:8000/register",
    data: { email, password }
  })
    .done(function (data) {
      Swal.fire('Registered', 'successfully register!', 'success')
      localStorage.setItem("access_token", data.access_token);
      $('#list').html('')
      $("#register-input-password").val('');
      $("#register-input-email").val('')
      $('.global').hide();
      $(".todo-section").show();
      showList()
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
}

// LOGIN
function login(e) {
  e.preventDefault();
  $("#error").html("")
  $("#list").html("")
  const email = $("#login-input-email").val();
  const password = $("#login-input-password").val();
  
  $.ajax({
    type: "POST",
    url: "http://localhost:8000/login",
    data: { email: email, password: password }
  })
    .done(function (data) {
      Swal.fire('Logged In!', 'successfully Login!', 'success')
      localStorage.setItem("access_token", data.access_token);
      $("#login-input-email").val('')
      $("#login-input-password").val('')

      $('.global').hide()
      $(".todo-section").show();
      showList()
    })
    .fail(function (err) {
      $("#error").html("")
      $("#error").append(`
      <div class="alert alert-danger" role="alert">
      ${err.responseJSON.error}
    </div>
      `)
    })
}

// LOGOUT
function logout() {
  Swal.fire('Log Out!', 'successfully logged out!', 'success');
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  $('.global').hide()
  $('.toggle').show()
  $('.list').html('')
  localStorage.removeItem('access_token')
}

// ADD
function add(e) {
  e.preventDefault();
  const title = $("#add-input-title").val();
  const description = $("#add-input-description").val();
  const due_date = $("#add-input-date").val();
  
  $.ajax({
    type: "POST",
    url: "http://localhost:8000/todos",
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: { title, description, due_date }
  })
    .done(function (data) {
      Swal.fire('Added!', 'successfully adding todo!', 'success')
      $("#add-input-title").val('')
      $("#add-input-description").val('')
      $("#add-input-date").val('')
      $(".global").hide();
      showList()
      $("#list").html("")
      $('.todo-section').show();
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
}

// DELETE
function deleteTodo(e) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      $.ajax({
        type: "DELETE",
        url: `http://localhost:8000/todos/${e.target.value}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .done(function (todo) {
          $.ajax({
            type: "GET",
            url: "http://localhost:8000/todos",
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .done(function (todos) {
              $("#list").html("")
              showList()
    
            })
            .fail(function (err) {
              console.log(err)
            })
          $(".todo-section").show();
        })
        .fail(function (err) {
          console.log(err)
        })
    }
    
  })
  
}

// EDIT FORM
function editTodo(e) {
  
  $.ajax({
    type: "GET",
    url: `http://localhost:8000/todos/${e.target.value}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function (todo) {
      console.log(todo)
      $('#edit-form').attr('class',`${todo.id}`)
      $('#list').html('')
      $('#add-form').hide()
      $('#edit-input-title').val(todo.title)
      $('#edit-input-description').val(todo.description)
      $('#edit-input-date').val(todo.due_date.slice(0,10))
      // $(".global").hide();
      // $("#add-form").hide();
      $("#edit-form").show()
      showList()
    })
    .fail(function (err) {
      console.log(err)
    })
}

// Cancle edit
function cancelEdit(e){
  e.preventDefault()
  $('.global').hide();
  showList()
  $('#list').html('')
  $('#edit-form').hide()
  $('.todo-section').show();
  $('#add-form').show()
}

// SUBMIT EDIT
function editSubmit(e){
  e.preventDefault()
  const title = $('#edit-input-title').val()
  const description = $('#edit-input-description').val()
  const due_date = $('#edit-input-date').val()
  $.ajax({
    type: "PUT",
    url: `http://localhost:8000/todos/${e.target.className}`,
    data: { title, description, due_date },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function (e) {
      showList()
      
      $('.global').hide()
      $('#list').html('')
      $(".todo-section").show();
      $('#edit-form').hide()
      $('#add-form').show()
    })
    .fail(function (err) {
      console.log(err)
    })
}

// SHOW LIST
function showList() {
  $("#error").html("")
  $.ajax({
    type: "GET",
    url: "http://localhost:8000/todos",
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(function (todos) {
      todos.forEach(el => {
        let status
        if (el.status == true) {
          status = 'checked'
        }
        $("#list").append(`
            <tr id="table-body " class="${status}" >
              <td>${el.title}</td>
              <td>${el.description}</td>
              <td>${el.due_date.slice(0, 10)}</td>
              <td style="width: 200px;">
                <button class="btn btn-dark edit-button" style="width: 80px !important;" value="${el.id}" onclick= "editTodo(event)">Edit</button>
                <button class="btn btn-danger delete-button" style="width: 80px !important;" value="${el.id}" onclick="deleteTodo(event)">Delete</button>
              </td>
              <td>
                <input type="checkbox" ${status} onclick="updateStatus(event)" id="${el.id}" value="${el.status}">
              </td>
            </tr>
          `)
      })
    })
    .fail(function (err) {
      console.log('error:', err)
    })
}

// // GOOGLE
function onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: 'http://localhost:8000/loginGoogle',
    data: {
      token: id_token
    },
    statusCode :{
      200: function(response){
        localStorage.setItem('access_token',response.access_token)
      }
    }
  })
  .done(function(){
    $('#list').html('')
    $('.global').hide()
    showList()
    $(".todo-section").show();
  })
  .fail(function(err){
    console.log(err)
  })
}


// EDIT status
function updateStatus(e){
  showList()
  let dataStatus
  let status = e.target.value
  if(status == 'true'){
    dataStatus = false
  }else{
    dataStatus = true
  }

  $.ajax({
    type: "PUT",
    url: `http://localhost:8000/todos/${e.target.id}`,
    data: { status: dataStatus },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(function(){
    $('#list').html('')
    showList()
  })
}