const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, GET request!');
});

app.post('/', (req, res) => {
  const data = req.body;
  res.send(`Hello, POST request! You sent: ${JSON.stringify(data)}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
