import React from 'react'; // Reactをインポート
import EventForm from '../components/EventForm'; // イベント作成/編集用のフォームコンポーネントをインポート

// 新しいイベントを作成するためのページコンポーネント
function CreateEventPage() {
  return (
    <div>
      <h1>Create Event</h1> {/* ページのタイトル */}
      <EventForm /> {/* イベント作成フォームを表示 */}
    </div>
  );
}

export default CreateEventPage; // コンポーネントをエクスポート
