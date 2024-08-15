const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/events', eventRoutes);

// データベース接続のテスト
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database.');
    connection.query('SELECT 1 + 1 AS solution', (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing test query:', err);
      } else {
        console.log('Test query result:', results[0].solution);
      }
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
