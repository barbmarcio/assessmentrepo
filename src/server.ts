import express from 'express';

import './database';

const app = express();

app.use('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

app.listen(3333, () => {
  console.log('Server started on port 3333! 🎈');
});
