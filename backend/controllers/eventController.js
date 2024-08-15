const db = require('../config/db');

exports.getAllEvents = (req, res) => {
  console.log('Received GET request to /api/events');
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: err });
    }
    connection.query('SELECT * FROM events', (err, results) => {
      connection.release();
      if (err) {
        console.error('Error fetching events:', err);
        return res.status(500).json({ error: err });
      }
      res.json(results);
    });
  });
};

exports.createEvent = (req, res) => {
  console.log('Received POST request to /api/events', req.body);
  const { name, date, location, description } = req.body;
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: err });
    }
    connection.query(
      'INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)',
      [name, date, location, description],
      (err, result) => {
        connection.release();
        if (err) {
          console.error('Error creating event:', err);
          return res.status(500).json({ error: err });
        }
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    );
  });
};

exports.getEventById = (req, res) => {
  console.log('Received GET request to /api/events/:id');
  const { id } = req.params;
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: err });
    }
    connection.query('SELECT * FROM events WHERE id = ?', [id], (err, result) => {
      connection.release();
      if (err) {
        console.error('Error fetching event by id:', err);
        return res.status(500).json({ error: err });
      }
      res.json(result[0]);
    });
  });
};

exports.updateEvent = (req, res) => {
  console.log('Received PUT request to /api/events/:id', req.body);
  const { id } = req.params;
  const { name, date, location, description } = req.body;
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: err });
    }
    connection.query(
      'UPDATE events SET name = ?, date = ?, location = ?, description = ? WHERE id = ?',
      [name, date, location, description, id],
      (err) => {
        connection.release();
        if (err) {
          console.error('Error updating event:', err);
          return res.status(500).json({ error: err });
        }
        res.status(204).end();
      }
    );
  });
};

exports.deleteEvent = (req, res) => {
  console.log('Received DELETE request to /api/events/:id');
  const { id } = req.params;
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: err });
    }
    connection.query('DELETE FROM events WHERE id = ?', [id], (err) => {
      connection.release();
      if (err) {
        console.error('Error deleting event:', err);
        return res.status(500).json({ error: err });
      }
      res.status(204).end();
    });
  });
};
