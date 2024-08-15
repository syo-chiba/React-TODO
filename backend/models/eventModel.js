const db = require('../config/db'); // データベース接続を管理するモジュールをインポート

// Eventオブジェクトを定義し、イベントのCRUD操作を行うためのメソッドを提供
const Event = {
  
  // 全てのイベントを取得するメソッド
  getAll: (callback) => {
    // データベースに対して全てのイベントを取得するクエリを実行
    db.query('SELECT * FROM events', (err, results) => {
      if (err) {
        // エラーが発生した場合、コールバック関数にエラーを渡す
        return callback(err, null);
      }
      // クエリ結果をコールバック関数に渡す
      callback(null, results);
    });
  },

  // IDで指定されたイベントを取得するメソッド
  getById: (id, callback) => {
    // データベースに対して特定のIDのイベントを取得するクエリを実行
    db.query('SELECT * FROM events WHERE id = ?', [id], (err, results) => {
      if (err) {
        // エラーが発生した場合、コールバック関数にエラーを渡す
        return callback(err, null);
      }
      // 取得したイベントデータをコールバック関数に渡す（結果の最初の要素）
      callback(null, results[0]);
    });
  },

  // 新しいイベントを作成するメソッド
  create: (eventData, callback) => {
    const { name, date, location, description } = eventData;
    // イベントデータをデータベースに挿入するクエリを実行
    db.query(
      'INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)',
      [name, date, location, description],
      (err, results) => {
        if (err) {
          // エラーが発生した場合、コールバック関数にエラーを渡す
          return callback(err, null);
        }
        // 挿入されたイベントのIDを含む新しいイベントデータをコールバック関数に渡す
        callback(null, { id: results.insertId, ...eventData });
      }
    );
  },

  // 指定されたIDのイベントを更新するメソッド
  update: (id, eventData, callback) => {
    const { name, date, location, description } = eventData;
    // イベントデータを更新するクエリを実行
    db.query(
      'UPDATE events SET name = ?, date = ?, location = ?, description = ? WHERE id = ?',
      [name, date, location, description, id],
      (err, results) => {
        if (err) {
          // エラーが発生した場合、コールバック関数にエラーを渡す
          return callback(err, null);
        }
        // 更新の結果をコールバック関数に渡す
        callback(null, results);
      }
    );
  },

  // 指定されたIDのイベントを削除するメソッド
  delete: (id, callback) => {
    // 指定されたIDのイベントを削除するクエリを実行
    db.query('DELETE FROM events WHERE id = ?', [id], (err, results) => {
      if (err) {
        // エラーが発生した場合、コールバック関数にエラーを渡す
        return callback(err, null);
      }
      // 削除の結果をコールバック関数に渡す
      callback(null, results);
    });
  }
};

// Eventオブジェクトをモジュールとしてエクスポート
module.exports = Event;
