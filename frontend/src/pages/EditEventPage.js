import React, { useState, useEffect } from 'react'; // Reactとフックをインポート
import axios from 'axios'; // HTTPクライアントライブラリaxiosをインポート
import { useParams, useNavigate } from 'react-router-dom'; // React Routerのフックをインポート

function EditEventPage() {
  const { id } = useParams(); // URLパラメータからイベントIDを取得
  const [name, setName] = useState(''); // イベント名の状態を管理
  const [date, setDate] = useState(''); // イベントの日付の状態を管理
  const [location, setLocation] = useState(''); // イベントの場所の状態を管理
  const [description, setDescription] = useState(''); // イベントの説明の状態を管理
  const navigate = useNavigate(); // ナビゲーション用のフック

  // コンポーネントがマウントされた時にイベントの詳細を取得
  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(response => {
        const event = response.data;

        // UTCの日付をローカルタイムゾーンの日付に変換
        const eventDate = new Date(event.date);
        const offset = eventDate.getTimezoneOffset() * 60000;
        const localDate = new Date(eventDate.getTime() - offset).toISOString().split('T')[0];

        // 取得したイベントのデータを状態にセット
        setName(event.name);
        setDate(localDate); // ローカルタイムゾーンに変換された日付をセット
        setLocation(event.location);
        setDescription(event.description);
      })
      .catch(error => {
        // イベント取得時のエラーハンドリング
        console.error('There was an error fetching the event!', error);
      });
  }, [id]); // idの変更時にのみ実行

  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault(); // ページリロードを防ぐ
    axios.put(`http://localhost:5000/api/events/${id}`, { name, date, location, description })
      .then(response => {
        console.log('Event updated:', response.data); // 更新成功時のログ
        navigate('/'); // 更新後にホームページにリダイレクト
      })
      .catch(error => {
        // イベント更新時のエラーハンドリング
        console.error('There was an error updating the event!', error);
      });
  };

  return (
    // イベント編集用のフォーム
    <form onSubmit={handleSubmit}>
      <label>
        Event Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      </label>
      <button type="submit">Save</button> {/* フォーム送信ボタン */}
      <button type="button" onClick={() => navigate(-1)}>Cancel</button> {/* キャンセルボタン */}
    </form>
  );
}

export default EditEventPage; // コンポーネントをエクスポート
