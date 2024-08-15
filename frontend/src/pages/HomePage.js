import React, { useEffect, useState } from 'react'; // Reactとフックをインポート
import axios from 'axios'; // HTTPクライアントライブラリaxiosをインポート
import EventList from '../components/EventList'; // イベントリストコンポーネントをインポート

function HomePage() {
  const [events, setEvents] = useState([]); // イベントの配列を状態として管理

  // コンポーネントがマウントされた時にイベントを取得
  useEffect(() => {
    fetchEvents(); // イベントを取得する関数を呼び出し
  }, []); // 初回レンダリング時のみ実行

  // サーバーからイベントを取得する関数
  const fetchEvents = () => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data); // 取得したイベントデータを状態にセット
      })
      .catch(error => {
        // イベント取得時のエラーハンドリング
        console.error('There was an error fetching the events!', error);
      });
  };

  // イベント削除後にリストを更新するための関数
  const handleDelete = (id) => {
    // 指定されたIDのイベントを状態から削除
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div>
      <h1>Events</h1> {/* ページのタイトル */}
      <EventList events={events} onDelete={handleDelete} /> {/* イベントリストコンポーネントを表示 */}
    </div>
  );
}

export default HomePage; // コンポーネントをエクスポート
