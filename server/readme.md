API Documentation

routes:

GET /todos ==> Displaying all the todos from database

- Response:
  `[ { "id": 3, "title": "learn API", "description": "learn API part-2", "status": false, "due_date": "2020-03-30T00:00:00.000Z", "createdAt": "2020-03-30T05:25:24.880Z", "updatedAt": "2020-03-30T05:25:24.880Z" }, { "id": 2, "title": "learn API", "description": "learn API part-1", "status": false, "due_date": "2020-03-30T00:00:00.000Z", "createdAt": "2020-03-30T05:24:20.994Z", "updatedAt": "2020-03-30T05:24:20.994Z" } ]`

POST /todos ==> Create todo in database

- Request Header:
  `{"Content-Type":"application/json; charset=utf-8"}`

- Request Body:
  `{ "title": "learnet", "description": "learn API part-11", "status": false, "due_date": "2020-03-30T00:00:00.000Z" }`

- Response:
  `{ "id": 11, "title": "learnet", "description": "learn API part-11", "status": false, "due_date": "2020-03-30T00:00:00.000Z", "updatedAt": "2020-03-30T08:15:46.821Z", "createdAt": "2020-03-30T08:15:46.821Z" }`

GET /todos/:id ==> Displaying todo by id

- Response:
  `{ "id": 1, "title": "learn API", "description": "learn API part-0", "status": false, "due_date": "2020-03-30T00:00:00.000Z", "createdAt": "2020-03-30T05:14:30.520Z", "updatedAt": "2020-03-30T05:32:53.825Z" }`

- Error Response:
  `{ "error": "not found" }`

PUT /todos/:id ==> Editing todo by id

- Request Body:
  `{ "title": "learnet", "description": "learn API part-11", "status": false, "due_date": "2020-03-30T00:00:00.000Z" }`

- Response:
  `{ "id": 11, "title": "learnet", "description": "learn API part-11", "status": false, "due_date": "2020-03-30T00:00:00.000Z", "updatedAt": "2020-03-30T08:15:46.821Z", "createdAt": "2020-03-30T08:15:46.821Z" }`

- Error Response:
  `{ "error": "not found" }`

DELETE /todos/:id ==> Delete todo by id

- Error Response:
  `{ "error": "not found" }`
