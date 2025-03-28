幫我建立一個 Python WEB 專案，網站的主要功能為午餐吃甚麼。

網站的使用者功能有:
- 首頁
  - 使用者可以輸入地址
  - 使用者可以選擇餐廳類型
    - Ex: 中式、日式、義式、韓式、美式
  - 提供一個選項可以設定搜尋範圍
    - Ex: 500公尺、1公里、2公里
        - 預設值為500公尺
  - 透過使用者輸入的地址
    - 顯示附近的餐廳
      - 使用列表方式顯示餐廳
        - 餐廳名稱
        - 餐廳類型
        - 餐廳地址
        - 餐廳的評價
        - Google Map 顯示餐廳位置
        - 餐廳的電話
        - 使用者可以透過點擊"隨機"按鈕隨機選擇餐廳
      - 提供一個頁面透過地圖顯示所有有搜尋到的餐廳
        - 使用 Google Map API 顯示地圖
        - 顯示使用者輸入的地址
        - 顯示所有搜尋到的餐廳位置
        - 點擊餐廳位置顯示餐廳資訊
  - 最後提供一個按鈕可以隨機選擇在列表內的餐廳

系統的網站架構與設計應該要有:
- OS 是 Windows 11
  - 確保在終端機裡面的指令與 windows 相容
- 地圖請使用 Google Map API 與 Google Places API
  - 使用者可以透過 Google Map API 顯示地圖
  - 使用者可以透過 Google Map API 顯示餐廳位置
  - 使用者可以透過 Google Map API 顯示餐廳資訊
  - 跟 Google Map API 有關的呼叫請全部使用前端 JAVASCRIPT 來呼叫
- 網站語言請確保使用繁體中文
- 要使用 python 的虛擬環境來開發。
  - 虛擬環境的名稱為 env-eat。
- 使用 Python 3.13 以上的版本。
- 使用 Flask 作為後端框架。
- 提供 README.md 檔案，說明如何啟動網站等常見 README 內容。
  - 要包含如何執行各種不同的測試。
- 程式碼必須包含適當的註解。
  - 所有的 Class 與 Method 一定要有註解
  - 所有的變數與參數一定要有註解
  - 適當地為所有程式碼加入註解
- 使用 Bootstrap 5 來設計網站。
  - 使用 fontawesome 來提供 ICON。
  - 畫面要華麗
  - 可以加入動畫效果。
  - 畫面的整體色調一定要色彩繽紛
  - 要有 Dark Mode 與 Light Mode 的切換功能。
- 使用 jsdeliver CDN 來載入 Bootstrap 5 與 fontawesome。
  - 若有任何其他前段需要的 library 也要使用 jsdeliver CDN。
 
其他要求:
- Update relevant documentation in /docs when modifying features
- Keep README.md in sync with new capabilities
- Maintain changelog entries in CHANGELOG.md
- Write implementation plan to .md files in /docs/implementation
  - Naming convention: <date>-<feature-name>.md
- Each step should be committed separately to preserve history.
- 請使用繁體中文
 
先不要執行，請先產出一個執行計畫與檔案文件目錄結構給我看，以及提供預計要使用那些 API 來取得資訊，並提供這些API的前置作業說明，例如: 需要註冊帳號、取得 API KEY 等等。