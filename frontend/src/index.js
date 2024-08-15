import React from 'react'; // Reactをインポート
import { createRoot } from 'react-dom/client'; // React 18用のcreateRoot APIをインポート
import './index.css'; // グローバルスタイルをインポート
import App from './App'; // アプリケーションのメインコンポーネントをインポート

// ReactアプリケーションをマウントするDOMコンテナを取得
const container = document.getElementById('root');

// createRootを使ってReactのルートを作成
const root = createRoot(container);

// ReactアプリケーションをStrictModeでレンダリング
root.render(
  <React.StrictMode>
    <App /> {/* アプリケーションのメインコンポーネントをレンダリング */}
  </React.StrictMode>
);
