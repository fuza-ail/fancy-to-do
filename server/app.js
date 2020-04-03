const express = require('express');
const app = express();
const router = require('./routes');
const cors = require('cors')
const PORT = 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(router)

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})

