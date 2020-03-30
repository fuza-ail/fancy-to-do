# API Documentation

### GET /todos ==> Displaying all the todos from database

- Response:
  <pre><code>[
    	{
        "id": 1,
        "title": "first todo",
        "description": "learn API",
        "status": false,
        "due_date": "2020-03-30T17:00:00.000Z",
        "createdAt": "2020-03-30T10:26:32.217Z",
        "updatedAt": "2020-03-30T10:26:32.217Z"
    	},
    	{
        "id": 2,
        "title": "second todo",
        "description": "learn API",
        "status": false,
        "due_date": "2020-03-30T17:00:00.000Z",
        "createdAt": "2020-03-30T10:29:53.665Z",
        "updatedAt": "2020-03-30T10:29:53.665Z"
    	}
]</code></pre>

### POST /todos ==> Create todo in database

- Request Header:
  <pre><code>{
  "Content-Type":"application/json; charset=utf-8"
  }</code></pre>

- Request Body:
  <pre><code>{
    "id": 1,
    "title": "first todo",
    "description": "learn API",
    "status": false,
    "due_date": "2020-03-30T17:00:00.000Z"
  }</code></pre>

- Response:
  <pre><code>{
    "id": 1,
    "title": "first todo",
    "description": "learn API",
    "status": false,
    "due_date": "2020-03-30T17:00:00.000Z",
    "updatedAt": "2020-03-30T10:26:32.217Z",
    "createdAt": "2020-03-30T10:26:32.217Z"
  }</code></pre>

### GET /todos/:id ==> Displaying todo by id

- Response:
  <pre><code>{
    "id": 1,
    "title": "first todo",
    "description": "learn API",
    "status": false,
    "due_date": "2020-03-30T17:00:00.000Z",
    "createdAt": "2020-03-30T10:26:32.217Z",
    "updatedAt": "2020-03-30T10:26:32.217Z"
}</code></pre>

- Error Response:
<pre><code>{ "error": "not found" }</code></pre>

### PUT /todos/:id ==> Editing todo by id

- Request Body:
<pre><code></code>{
        "id": 2,
        "title": "second todo",
        "description": "learn API and CRUD",
        "status": false,
        "due_date": "2020-03-30T17:00:00.000Z",
    }</pre>

- Response:
<pre><code>{
        "id": 2,
        "title": "second todo",
        "description": "learn API and CRUD",
        "status": false,
        "due_date": "2020-03-30T17:00:00.000Z",
        "createdAt": "2020-03-30T10:29:53.665Z",
        "updatedAt": "2020-03-30T10:36:16.940Z"
    }</code></pre>

- Error Response:
<pre><code>{ "error": "not found" }</code></pre>

### DELETE /todos/:id ==> Delete todo by id

- Error Response:
<pre><code>{ "error": "not found" }</code></pre>
