# 午餐吃什麼？

一個幫助您決定午餐要吃什麼的網站應用程式。使用 Google Maps API 來搜尋並顯示附近的餐廳，並提供隨機選擇功能。

## 功能特色

- 輸入地址搜尋附近餐廳
- 依餐廳類型篩選（中式、日式、義式、韓式、美式等）
- 自訂搜尋範圍（500公尺、1公里、2公里）
- 顯示餐廳詳細資訊（評價、電話、營業時間等）
- 支援地圖檢視所有搜尋結果
- 隨機選擇功能
- 支援深色模式

## 系統需求

- Python 3.13 或以上版本
- Google Maps API 金鑰
- 網際網路連線

## 安裝說明

1. 複製專案
```bash
git clone https://github.com/MoneyDemo/20250329-Coding-Angel
cd luncheat
```

2. 建立並啟動虛擬環境
```bash
python -m venv eatenv
source eatenv/bin/activate  # Linux/macOS
.\eatenv\Scripts\activate   # Windows
```

3. 安裝相依套件
```bash
pip install -r requirements.txt
```

4. 設定環境變數
建立 `.env` 檔案並加入以下內容：
```
GOOGLE_MAPS_API_KEY=你的API金鑰
SECRET_KEY=你的密鑰
```

5. 執行應用程式
```bash
python run.py
```

## 開發設定

### 取得 Google Maps API 金鑰

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇既有專案
3. 啟用以下 API：
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. 在「憑證」頁面建立 API 金鑰
5. 設定 API 金鑰的限制（建議設定）

### 執行測試

執行所有測試：
```bash
pytest
```

執行特定測試檔案：
```bash
pytest tests/test_routes.py
```

執行特定測試函式：
```bash
pytest tests/test_routes.py::test_search_restaurants
```

## 專案結構

```
luncheat/
├── app/                    # 應用程式主目錄
│   ├── __init__.py        # 應用程式初始化
│   ├── config.py          # 設定檔
│   ├── routes.py          # 路由定義
│   ├── utils/             # 工具函數
│   │   └── google_api.py  # Google API 整合
│   ├── static/            # 靜態檔案
│   │   ├── css/          # CSS 樣式
│   │   ├── js/           # JavaScript 檔案
│   │   └── img/          # 圖片資源
│   └── templates/         # HTML 模板
├── tests/                 # 測試目錄
├── docs/                  # 文件目錄
├── .env                   # 環境變數
├── requirements.txt       # 相依套件
└── run.py                # 應用程式入口點
```

## 貢獻指南

1. Fork 這個專案
2. 建立您的功能分支
3. 提交您的修改
4. 發送 Pull Request

## 授權條款

本專案採用 MIT 授權條款。詳細內容請參閱 [LICENSE](LICENSE) 檔案。
