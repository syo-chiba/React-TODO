import React from 'react'; // Reactをインポート
import { Link } from 'react-router-dom'; // React RouterのLinkコンポーネントをインポート
import axios from 'axios'; // HTTPクライアントライブラリaxiosをインポート

function EventItem({ event }) {
  // イベントを削除するための関数
  const handleDelete = () => {
    // 指定されたイベントIDでDELETEリクエストを送信
    axios.delete(`http://localhost:5000/api/events/${event.id}`)
      .then(response => {
        // 削除成功時の処理
        console.log('Event deleted:', response.data);
      })
      .catch(error => {
        // 削除失敗時のエラーハンドリング
        console.error('There was an error deleting the event!', error);
      });
  };

  return (
    // イベントの情報を表示するリストアイテム
    <li>
      <h2>{event.name}</h2> {/* イベント名を表示 */}
      <p>{event.date}</p> {/* イベントの日付を表示 */}
      <p>{event.location}</p> {/* イベントの場所を表示 */}
      <p>{event.description}</p> {/* イベントの説明を表示 */}
      <Link to={`/edit/${event.id}`} className="edit">Edit</Link> {/* 編集ページへのリンク */}
      <button onClick={handleDelete}>Delete</button> {/* 削除ボタン */}
    </li>
  );
}

export default EventItem; // コンポーネントをエクスポート
