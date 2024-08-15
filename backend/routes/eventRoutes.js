const express = require('express'); // Expressフレームワークをインポート
const router = express.Router(); // Expressのルーターオブジェクトを作成
const eventController = require('../controllers/eventController'); // イベントに関するコントローラをインポート

// ルートに対するGETリクエストを処理し、全イベントを取得する
router.get('/', eventController.getAllEvents);

// ルートに対するPOSTリクエストを処理し、新しいイベントを作成する
router.post('/', eventController.createEvent);

// ルートに対するGETリクエストを処理し、特定のIDのイベントを取得する
router.get('/:id', eventController.getEventById);

// ルートに対するPUTリクエストを処理し、特定のIDのイベントを更新する
router.put('/:id', eventController.updateEvent);

// ルートに対するDELETEリクエストを処理し、特定のIDのイベントを削除する
router.delete('/:id', eventController.deleteEvent);

module.exports = router; // ルーターをモジュールとしてエクスポート
