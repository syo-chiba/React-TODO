const db = require('../config/db');

// 全イベントを取得する関数
exports.getAllEvents = (req, res) => {
  console.log('Received GET request to /api/events');

  // データベース接続を取得
  db.getConnection((err, connection) => {
    if (err) {
      // 接続エラーが発生した場合、エラーメッセージを返す
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: err });
    }

    // イベントテーブルから全レコードを取得するクエリを実行
    connection.query('SELECT * FROM events', (err, results) => {
      // クエリ完了後に接続を解放
      connection.release();
      if (err) {
        // クエリエラーが発生した場合、エラーメッセージを返す
        console.error('Error fetching events:', err);
        return res.status(500).json({ error: err });
      }

      // 取得したイベント情報をJSON形式で返す
      res.json(results);
    });
  });
};

// 新しいイベントを作成する関数
exports.createEvent = (req, res) => {
  // リクエストボディからイベント情報を取得
  const { name, date, location, description } = req.body;

  // 受け取った日付をJavaScriptのDateオブジェクトに変換
  const eventDate = new Date(date); 
  // 日付をUTC形式に変換
  const utcDate = new Date(eventDate.toISOString());

  // データベース接続を取得
  db.getConnection((err, connection) => {
    if (err) {
      // 接続エラーが発生した場合、エラーメッセージを返す
      return res.status(500).json({ error: err });
    }

    // イベントをデータベースに挿入するクエリを実行
    connection.query(
      'INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)',
      [name, eventDate, location, description],
      (err, result) => {
        // クエリ完了後に接続を解放
        connection.release();
        if (err) {
          // クエリエラーが発生した場合、エラーメッセージを返す
          return res.status(500).json({ error: err });
        }

        // 作成されたイベントのIDを含むレスポンスを返す
        res.status(201).json({ id: result.insertId, name, date: eventDate.toISOString(), location, description });
      }
    );
  });
};

// 特定のイベントをIDで取得する関数
exports.getEventById = (req, res) => {
  // リクエストパラメータからイベントIDを取得
  const { id } = req.params;

  // データベース接続を取得
  db.getConnection((err, connection) => {
    if (err) {
      // 接続エラーが発生した場合、エラーメッセージを返す
      return res.status(500).json({ error: err });
    }

    // 指定されたIDのイベントを取得するクエリを実行
    connection.query('SELECT * FROM events WHERE id = ?', [id], (err, result) => {
      // クエリ完了後に接続を解放
      connection.release();
      if (err) {
        // クエリエラーが発生した場合、エラーメッセージを返す
        return res.status(500).json({ error: err });
      }

      // 取得したイベント情報をJSON形式で返す
      const event = result[0];
      const eventDate = new Date(event.date).toISOString();
      res.json({ ...event, date: eventDate });
    });
  });
};

// イベント情報を更新する関数
exports.updateEvent = (req, res) => {
  console.log('Received PUT request to /api/events/:id', req.body);

  // リクエストパラメータからイベントIDを取得
  const { id } = req.params;
  // リクエストボディから更新するイベント情報を取得
  const { name, date, location, description } = req.body;

  // 日付をUTCに変換して保存
  const eventDate = new Date(date);
  const utcDate = new Date(Date.UTC(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate()));

  // データベース接続を取得
  db.getConnection((err, connection) => {
    if (err) {
      // 接続エラーが発生した場合、エラーメッセージを返す
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: err });
    }

    // イベント情報を更新するクエリを実行
    connection.query(
      'UPDATE events SET name = ?, date = ?, location = ?, description = ? WHERE id = ?',
      [name, utcDate, location, description, id],
      (err) => {
        // クエリ完了後に接続を解放
        connection.release();
        if (err) {
          // クエリエラーが発生した場合、エラーメッセージを返す
          console.error('Error updating event:', err);
          return res.status(500).json({ error: err });
        }

        // 成功した場合、204ステータスコードを返す
        res.status(204).end();
      }
    );
  });
};

// イベントを削除する関数
exports.deleteEvent = (req, res) => {
  console.log('Received DELETE request to /api/events/:id');

  // リクエストパラメータからイベントIDを取得
  const { id } = req.params;

  // データベース接続を取得
  db.getConnection((err, connection) => {
    if (err) {
      // 接続エラーが発生した場合、エラーメッセージを返す
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: err });
    }

    // 指定されたIDのイベントを削除するクエリを実行
    connection.query('DELETE FROM events WHERE id = ?', [id], (err) => {
      // クエリ完了後に接続を解放
      connection.release();
      if (err) {
        // クエリエラーが発生した場合、エラーメッセージを返す
        console.error('Error deleting event:', err);
        return res.status(500).json({ error: err });
      }

      // 成功した場合、204ステータスコードを返す
      res.status(204).end();
    });
  });
};
