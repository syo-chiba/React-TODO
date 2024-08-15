import React from 'react'; // Reactをインポート
import { Link } from 'react-router-dom'; // React RouterのLinkコンポーネントをインポート
import axios from 'axios'; // HTTPクライアントライブラリaxiosをインポート

function EventList({ events, onDelete }) {
  // イベントが存在しない場合に表示するメッセージ
  if (events.length === 0) {
    return <p>No events found.</p>; // イベントがないことを示すメッセージ
  }

  // イベントを削除する関数
  const handleDelete = (id) => {
    // 指定されたイベントIDでDELETEリクエストを送信
    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(response => {
        console.log('Event deleted:', response.data); // 削除成功時のログ
        onDelete(id); // 親コンポーネントに削除を通知
      })
      .catch(error => {
        // 削除失敗時のエラーハンドリング
        console.error('There was an error deleting the event!', error);
      });
  };

  // 日付をフォーマットする関数
  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);

    // 日付をYYYY-MM-DD形式にフォーマット
    const year = eventDate.getFullYear();
    const month = ('0' + (eventDate.getMonth() + 1)).slice(-2); // 月は0から始まるため+1
    const day = ('0' + eventDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`; // フォーマットされた日付を返す
  };

  return (
    // イベントリストを表示する部分
    <ul className="event-list">
      {events.map(event => (
        <li key={event.id} className="event-item">
          <h2>{event.name}</h2> {/* イベント名を表示 */}
          <p>Date: {formatDate(event.date)}</p> {/* フォーマットされた日付を表示 */}
          <p>Location: {event.location}</p> {/* イベントの場所を表示 */}
          <p>Description: {event.description}</p> {/* イベントの説明を表示 */}
          <Link to={`/edit/${event.id}`} className="edit">Edit</Link> {/* 編集ページへのリンク */}
          <button onClick={() => handleDelete(event.id)}>Delete</button> {/* 削除ボタン */}
        </li>
      ))}
    </ul>
  );
}

export default EventList; // コンポーネントをエクスポート
