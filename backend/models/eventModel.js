const db = require('../config/db');

const Event = {
  getAll: (callback) => {
    db.query('SELECT * FROM events', (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM events WHERE id = ?', [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  create: (eventData, callback) => {
    const { name, date, location, description } = eventData;
    db.query(
      'INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)',
      [name, date, location, description],
      (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, { id: results.insertId, ...eventData });
      }
    );
  },

  update: (id, eventData, callback) => {
    const { name, date, location, description } = eventData;
    db.query(
      'UPDATE events SET name = ?, date = ?, location = ?, description = ? WHERE id = ?',
      [name, date, location, description, id],
      (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM events WHERE id = ?', [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
};

module.exports = Event;
