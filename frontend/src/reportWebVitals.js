// Web Vitalsのレポートを設定する関数
const reportWebVitals = onPerfEntry => {
  // 引数onPerfEntryが関数である場合にのみ処理を実行
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // 動的インポートを使用してweb-vitalsモジュールを読み込む
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // 各Web Vitalsのメトリクスを取得し、onPerfEntryコールバックに渡す
      getCLS(onPerfEntry);  // Cumulative Layout Shift（CLS）
      getFID(onPerfEntry);  // First Input Delay（FID）
      getFCP(onPerfEntry);  // First Contentful Paint（FCP）
      getLCP(onPerfEntry);  // Largest Contentful Paint（LCP）
      getTTFB(onPerfEntry); // Time to First Byte（TTFB）
    });
  }
};

// reportWebVitals関数をデフォルトエクスポート
export default reportWebVitals;
