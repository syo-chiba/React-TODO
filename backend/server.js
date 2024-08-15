const express = require('express'); // Expressフレームワークをインポート
const bodyParser = require('body-parser'); // リクエストボディを解析するためのミドルウェアをインポート
const cors = require('cors'); // CORS（クロスオリジンリソースシェアリング）を有効にするミドルウェアをインポート
const db = require('./config/db'); // データベース接続を管理するモジュールをインポート
const eventRoutes = require('./routes/eventRoutes'); // イベントルートをインポート

const app = express(); // Expressアプリケーションを作成
const PORT = 5000; // サーバーがリッスンするポート番号を設定

app.use(cors()); // 全てのリクエストでCORSを有効にする
app.use(bodyParser.json()); // JSON形式のリクエストボディを解析する

// すべてのリクエストに対して、HTTPメソッドとURLをコンソールに出力するミドルウェア
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// /api/eventsに対するリクエストをeventRoutesで処理する
app.use('/api/events', eventRoutes);

// データベース接続のテスト
db.getConnection((err, connection) => {
  if (err) {
    // データベース接続に失敗した場合のエラーメッセージ
    console.error('Database connection failed:', err);
  } else {
    // データベースに接続成功時のメッセージ
    console.log('Connected to the database.');

    // テスト用の簡単なクエリを実行
    connection.query('SELECT 1 + 1 AS solution', (err, results) => {
      connection.release(); // クエリ完了後に接続を解放
      if (err) {
        // クエリ実行中にエラーが発生した場合の処理
        console.error('Error executing test query:', err);
      } else {
        // クエリ実行結果をコンソールに出力
        console.log('Test query result:', results[0].solution);
      }
    });
  }
});

// 全てのエラーをキャッチするエラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err); // エラー内容をコンソールに出力
  res.status(500).json({ error: 'Internal server error' }); // エラーレスポンスを返す
});

// サーバーを指定したポートで起動し、リッスンする
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
