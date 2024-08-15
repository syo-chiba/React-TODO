import React, { useState, useEffect } from 'react'; // Reactとフックをインポート
import { useNavigate } from 'react-router-dom'; // React Routerのナビゲーションフックをインポート
import axios from 'axios'; // HTTPクライアントライブラリaxiosをインポート

function EventForm({ eventId }) {
  // イベントフォームに入力するデータの状態を管理
  const [name, setName] = useState(''); // イベント名
  const [date, setDate] = useState(''); // イベントの日付
  const [location, setLocation] = useState(''); // イベントの場所
  const [description, setDescription] = useState(''); // イベントの説明
  const navigate = useNavigate(); // ナビゲーション用のフック

  // イベントIDが渡された場合、そのIDのイベントデータを取得してフォームに表示
  useEffect(() => {
    if (eventId) {
      axios.get(`http://localhost:5000/api/events/${eventId}`)
        .then(response => {
          const event = response.data;
          // 取得したデータを各状態にセット
          setName(event.name);
          setDate(event.date);
          setLocation(event.location);
          setDescription(event.description);
        })
        .catch(error => {
          // イベント取得時のエラーハンドリング
          console.error('There was an error fetching the event!', error);
        });
    }
  }, [eventId]); // eventIdの変更時にのみ実行

  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault(); // ページリロードを防ぐ
    const eventData = { name, date, location, description }; // フォームデータをまとめる

    // イベントIDが存在する場合はイベントの更新、存在しない場合は新規作成
    if (eventId) {
      axios.put(`http://localhost:5000/api/events/${eventId}`, eventData)
        .then(response => {
          console.log('Event updated:', response.data);
          navigate('/'); // 成功時にホーム画面にリダイレクト
        })
        .catch(error => {
          // イベント更新時のエラーハンドリング
          console.error('There was an error updating the event!', error);
        });
    } else {
      axios.post('http://localhost:5000/api/events', eventData)
        .then(response => {
          console.log('Event created:', response.data);
          navigate('/'); // 成功時にホーム画面にリダイレクト
        })
        .catch(error => {
          // イベント作成時のエラーハンドリング
          console.error('There was an error creating the event!', error);
        });
    }
  };

  return (
    // イベントの作成/更新用のフォーム
    <form onSubmit={handleSubmit}>
      <label>
        Event Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save</button> {/* フォーム送信ボタン */}
      <button type="button" onClick={() => navigate('/')}>Cancel</button> {/* キャンセルボタン */}
    </form>
  );
}

export default EventForm; // コンポーネントをエクスポート
