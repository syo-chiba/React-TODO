import React from 'react'; // Reactをインポート
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Routerのコンポーネントをインポート
import HomePage from './pages/HomePage'; // ホームページコンポーネントをインポート
import CreateEventPage from './pages/CreateEventPage'; // イベント作成ページコンポーネントをインポート
import EditEventPage from './pages/EditEventPage'; // イベント編集ページコンポーネントをインポート
import './App.css'; // アプリケーションのスタイルをインポート

function App() {
  return (
    // アプリケーション全体にルーティングを提供するRouterコンポーネント
    <Router>
      <div>
        {/* ナビゲーションバー */}
        <nav>
          <a href="/">Home</a> {/* ホームページへのリンク */}
          <a href="/create">Create Event</a> {/* イベント作成ページへのリンク */}
        </nav>
        {/* ルート定義 */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* ホームページのルート */}
          <Route path="/create" element={<CreateEventPage />} /> {/* イベント作成ページのルート */}
          <Route path="/edit/:id" element={<EditEventPage />} /> {/* イベント編集ページのルート */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; // アプリケーションコンポーネントをエクスポート
