const express = require('express');
const convertRouter = require('./routes/convert');

const app = express();
const PORT = 2000;

app.use('/', convertRouter);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}/`);
});
