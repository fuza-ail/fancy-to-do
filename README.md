# fancy-to-do
---

### Description
This is Todo app that can record your tasks and send it to your email.

---
### API
1. Google SIgn in
2. [SendGrid](https://sendgrid.com/)

---
### Framework / Library
1. [Bootstrap](https://getbootstrap.com/)
2. [SWAL2](https://sweetalert2.github.io/)

---
### RESTFUL API

#### POST /register
###### Create account
- Request Body:
```
{
	"email": "fuzail@gmail.com",
	"password":"rahasia"
}
```

- Response ( 201 ):
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlVzZXJFbWFpbCI6ImZ1emFpbEBnbWFpbC5jb20iLCJpYXQiOjE1ODYxNzc2Nzl9.uKvEPP32PfwCgBnw78i-ToV8QRj26TlQ2KkAlXaMaUc"
}
```

- Error Response ( 400 - empty value ):
```
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Validation notEmpty on email failed",
            "type": "Validation error",
            "path": "email",
            "value": "",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "email": "",
                "password": "$2a$08$X5yFuOiAt6vhRpcBjLs1JOJKrSdotcwXykcntNJNnIbEDIgmnVtNu",
                "updatedAt": "2020-04-06T12:57:57.392Z",
                "createdAt": "2020-04-06T12:57:57.392Z"
            },
            "validatorKey": "notEmpty",
            "validatorName": "notEmpty",
            "validatorArgs": [
                false
            ],
            "original": {
                "validatorName": "notEmpty",
                "validatorArgs": [
                    false
                ]
            }
        }
    ]
}
```

- Error Response ( 500 - Internal server error ):
```
{
    "error": "Internal Server Error"
}
```

---
#### POST /login
###### Login account
- Request Body:
```
{
	"email": "fuzail@gmail.com",
	"password":"rahasia"
}
```

- Response ( 201 ):
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlVzZXJFbWFpbCI6ImZ1emFpbEBnbWFpbC5jb20iLCJpYXQiOjE1ODYxNzgwMTl9.2GoJlM6J9egn9fvuPCqB9vu8oDyBJCSU_Cn3hhMlUUA"
}
```

- Error Response ( 400 - wrong password )
```
{
    "error": "wrong password"
}
```

- Error Response ( 404 - email not found )
```
{
    "error": "email not found"
}
```


- Error Response ( 500 - Internal server error ):
```
{
    "error": "Internal Server Error"
}
```

---
#### GET /todos
###### Get all todo data
- Reqest Header:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlVzZXJFbWFpbCI6ImZ1emFpbEBnbWFpbC5jb20iLCJpYXQiOjE1ODYxNzgwMTl9.2GoJlM6J9egn9fvuPCqB9vu8oDyBJCSU_Cn3hhMlUUA"
}
```

- Response ( 200 ):
```
[
    {
        "id": 7,
        "title": "Learn to code",
        "description": "deployement",
        "status": false,
        "due_date": "2020-03-31T17:00:00.000Z",
        "UserId": 3,
        "createdAt": "2020-04-06T13:12:29.225Z",
        "updatedAt": "2020-04-06T13:12:29.225Z"
    }
]
```


- Error Response ( 500 - Internal server error ):
```
{
    "error": "Internal Server Error"
}
```

---
#### POST /todos
###### Create todo
- Request Body:
```
{
	"title": "Learn to code",
	"description":"deployement",
	"status": false,
	"due_date" : "2020/04/01"
}
```

- Request Header:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlVzZXJFbWFpbCI6ImZ1emFpbEBnbWFpbC5jb20iLCJpYXQiOjE1ODYxNzgwMTl9.2GoJlM6J9egn9fvuPCqB9vu8oDyBJCSU_Cn3hhMlUUA"
}
```

- Response:
```
{
    "id": 7,
    "title": "Learn to code",
    "description": "deployement",
    "status": false,
    "due_date": "2020-03-31T17:00:00.000Z",
    "UserId": 3,
    "updatedAt": "2020-04-06T13:12:29.225Z",
    "createdAt": "2020-04-06T13:12:29.225Z"
}
```

- Error Response ( 400 - empty value ):
```
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Title can not be empty",
            "type": "Validation error",
            "path": "title",
            "value": "",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "",
                "description": "deployement",
                "status": false,
                "due_date": "2020-03-31T17:00:00.000Z",
                "UserId": 3,
                "updatedAt": "2020-04-06T13:15:24.788Z",
                "createdAt": "2020-04-06T13:15:24.788Z"
            },
            "validatorKey": "notEmpty",
            "validatorName": "notEmpty",
            "validatorArgs": [
                true
            ],
            "original": {
                "validatorName": "notEmpty",
                "validatorArgs": [
                    true
                ]
            }
        }
    ]
}
```


- Error Response ( 500 - Internal server error ):
```
{
    "error": "Internal Server Error"
}
```

---
#### GET /todos/:id
###### Get specific todo
- Request Header:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlVzZXJFbWFpbCI6ImZ1emFpbEBnbWFpbC5jb20iLCJpYXQiOjE1ODYxNzgwMTl9.2GoJlM6J9egn9fvuPCqB9vu8oDyBJCSU_Cn3hhMlUUA"
}
```

- Response ( 200 ):
```
{
    "id": 7,
    "title": "Learn to code",
    "description": "deployement",
    "status": false,
    "due_date": "2020-03-31T17:00:00.000Z",
    "UserId": 3,
    "createdAt": "2020-04-06T13:12:29.225Z",
    "updatedAt": "2020-04-06T13:12:29.225Z"
}
```


- Error Response ( 500 - Internal server error ):
```
{
    "error": "Internal Server Error"
}
```

---
#### PUT /todos/:id
###### Edit specific todo
- Request Body:
```
{
	"title": "learn updated",
	"description":"deployement",
	"status": false,
	"due_date" : "2020/04/01"
}
```

- Request Headers:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlVzZXJFbWFpbCI6ImZ1emFpbEBnbWFpbC5jb20iLCJpYXQiOjE1ODYxNzgwMTl9.2GoJlM6J9egn9fvuPCqB9vu8oDyBJCSU_Cn3hhMlUUA"
}
```

- Response ( 200 ):
```
{
	"title": "learn updated",
	"description":"deployement",
	"status": false,
	"due_date" : "2020/04/01"
}
```

- Error Response ( 404 - todo not found );
```
{
    "error": "todo not found"
}
```

- Error Response ( 400 - access forbidden ):
```
{
    "error": "access forbidden"
}
```

- Error Response ( 500 - Internal server error ):
```
{
    "error": "Internal Server Error"
}
```

---
#### DELETE /todos/:id
###### Delete specific
- Request params:
```
{
    "id": 7
}
```

- Response:
```
{
    "id": 7,
    "title": "learn updated",
    "description": "deployement",
    "status": false,
    "due_date": "2020-03-31T17:00:00.000Z",
    "UserId": 3,
    "createdAt": "2020-04-06T13:12:29.225Z",
    "updatedAt": "2020-04-06T13:25:36.369Z"
}
```

- Error Response ( 404 - todo not found );
```
{
    "error": "todo not found"
}
```

- Error Response ( 400 - access forbidden ):
```
{
    "error": "access forbidden"
}
```


- Error Response ( 500 - Internal server error ):
```
{
    "error": "Internal Server Error"
}
```