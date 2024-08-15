const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, // プール内の最大接続数
  host: 'localhost', // データベースサーバーのホスト名
  user: 'root', // データベースユーザー名
  password: 'rootroot', // データベースユーザーパスワード
  database: 'event_management', // 使用するデータベース名
  charset: 'utf8mb4'
});

module.exports = pool;
