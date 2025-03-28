lettucebo: 幫我建立一個使用 HTML, CSS, JS 的網站，網站的主要功能為吃甚麼。

使用純 HTML、CSS 和 JavaScript 來實作。
首頁直接放在根目錄並命名為 index.html。
網站的主要功能為吃甚麼，使用者可以透過輸入地址來搜尋附近的餐廳，並且可以選擇餐廳類型與搜尋範圍。

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
  - 所有 command 請使用 PowerShell 來執行
- 地圖請使用 Google Map API 與 Google Places API
  - 使用者可以透過 Google Map API 顯示地圖
  - 使用者可以透過 Google Map API 顯示餐廳位置
  - 使用者可以透過 Google Map API 顯示餐廳資訊
  - 跟 Google Map API 有關的呼叫請全部使用前端 JAVASCRIPT 來呼叫
  - 地圖相關請使用繁體中文顯示
- 網站語言請確保使用繁體中文
- 提供 README.md 檔案，說明如何啟動網站等常見 README 內容。
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
- 請使用繁體中文

GitHub Copilot: 我將幫您創建一個「吃什麼？」的網站，使用HTML、CSS和JavaScript實現，並整合Google Maps和Places API來搜尋附近餐廳。首先，讓我們創建必要的文件結構。我看到工作區中已有一個 .git 資料夾。現在讓我為您創建「吃什麼？」網站所需的基本文件結構。我將創建以下文件：

1. index.html - 網站首頁
2. css/style.css - 樣式表
3. js/main.js - 主要JavaScript代碼
4. README.md - 說明文件

讓我們開始創建這些文件：看起來在 Windows PowerShell 中 mkdir 的參數使用方式不同。讓我們改用正確的 PowerShell 命令來創建資料夾結構：資料夾結構已成功創建！我剛剛為網站建立了三個資料夾：css、js 和 images。現在讓我們開始創建網站的檔案內容。

首先，我將建立 README.md 檔案，提供網站的基本說明：
````
# 吃什麼？- 餐廳搜尋網站

這是一個幫助用戶尋找附近餐廳的網站，使用 HTML、CSS 和 JavaScript 開發。

## 功能

- 輸入地址搜尋附近餐廳
- 依餐廳類型過濾（中式、日式、義式、韓式、美式等）
- 可調整搜尋範圍（500公尺、1公里、2公里）
- 顯示餐廳詳細資訊（名稱、類型、地址、評價、電話）
- 整合 Google Maps 顯示餐廳位置
- 隨機推薦功能
- 支援深色/淺色模式切換

## 使用技術

- HTML5
- CSS3 (Bootstrap 5)
- JavaScript (原生)
- Google Maps API
- Google Places API
- Font Awesome 圖示庫

## 如何使用

1. 複製本專案到您的本地環境
2. 打開 `index.html` 檔案
3. 由於使用了 Google Maps API，您可能需要在瀏覽器中允許位置存取權限
4. 輸入您的地址並開始搜尋附近的餐廳

## 注意事項

- 此網站需要連接互聯網才能正常運作
- 使用 Google Maps API 和 Google Places API，使用者體驗可能會受到 API 使用限制的影響
- 為了最佳效果，建議使用最新版本的 Chrome、Firefox 或 Edge 瀏覽器
````


Made changes.

現在讓我們繼續建立網站的其他檔案。首先，我會創建首頁 `index.html`：
````
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>吃什麼？ - 尋找附近美食的好幫手</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0/css/all.min.css" rel="stylesheet">
    <!-- 自定義 CSS -->
    <link href="css/style.css" rel="stylesheet">
    <!-- 網站圖標 -->
    <link rel="icon" href="images/favicon.png" type="image/png">
</head>
<body>
    <!-- 導航欄 -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#"><i class="fas fa-utensils me-2"></i>吃什麼？</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="#home">首頁</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#map-view">地圖檢視</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about">關於我們</a>
                    </li>
                    <!-- 深色/淺色模式切換按鈕 -->
                    <li class="nav-item">
                        <button id="theme-toggle" class="btn btn-sm nav-link">
                            <i id="theme-icon" class="fas fa-moon"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- 主要內容 -->
    <main>
        <!-- 首頁區域 -->
        <section id="home" class="container mt-5 pt-5">
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="text-center mb-5 animate__animated animate__fadeIn">
                        <h1 class="display-4 fw-bold">肚子餓了？讓我們幫你找美食！</h1>
                        <p class="lead">輸入您的地址，探索附近的美食選擇</p>
                    </div>

                    <!-- 搜尋表單 -->
                    <div class="card search-card shadow mb-5">
                        <div class="card-body p-4">
                            <form id="search-form">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <label for="address" class="form-label"><i class="fas fa-map-marker-alt me-2"></i>您的地址</label>
                                        <input type="text" class="form-control form-control-lg" id="address" placeholder="輸入您的地址...">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="cuisine-type" class="form-label"><i class="fas fa-hamburger me-2"></i>餐廳類型</label>
                                        <select class="form-select form-select-lg" id="cuisine-type">
                                            <option value="">所有類型</option>
                                            <option value="中式">中式</option>
                                            <option value="日式">日式</option>
                                            <option value="義式">義式</option>
                                            <option value="韓式">韓式</option>
                                            <option value="美式">美式</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="search-radius" class="form-label"><i class="fas fa-ruler me-2"></i>搜尋範圍</label>
                                        <select class="form-select form-select-lg" id="search-radius">
                                            <option value="500" selected>500公尺</option>
                                            <option value="1000">1公里</option>
                                            <option value="2000">2公里</option>
                                        </select>
                                    </div>
                                    <div class="col-12 text-center">
                                        <button type="submit" class="btn btn-primary btn-lg px-5"><i class="fas fa-search me-2"></i>搜尋餐廳</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- 載入中動畫 -->
                    <div id="loading" class="text-center d-none">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">載入中...</span>
                        </div>
                        <p>正在尋找附近餐廳...</p>
                    </div>

                    <!-- 搜尋結果區域 -->
                    <div id="results-container" class="mb-5 d-none">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h2><i class="fas fa-list me-2"></i>搜尋結果</h2>
                            <button id="random-pick-btn" class="btn btn-success"><i class="fas fa-random me-2"></i>隨機選擇</button>
                        </div>
                        
                        <!-- 餐廳列表 -->
                        <div id="restaurant-list" class="row row-cols-1 row-cols-md-2 g-4"></div>
                        
                        <!-- 無結果顯示 -->
                        <div id="no-results" class="text-center py-5 d-none">
                            <i class="fas fa-frown fa-3x mb-3"></i>
                            <h3>抱歉，沒有找到符合條件的餐廳</h3>
                            <p>請嘗試更改搜尋條件或擴大搜尋範圍</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 地圖檢視區域 -->
        <section id="map-view" class="container-fluid d-none">
            <div class="row">
                <div class="col-md-4 col-lg-3 p-0" id="map-sidebar">
                    <div class="p-3 sticky-top">
                        <h3><i class="fas fa-store me-2"></i>附近餐廳</h3>
                        <div id="map-list" class="list-group"></div>
                    </div>
                </div>
                <div class="col-md-8 col-lg-9 p-0">
                    <div id="map" class="map-container"></div>
                </div>
            </div>
        </section>

        <!-- 關於區域 -->
        <section id="about" class="container my-5 py-5">
            <div class="row justify-content-center">
                <div class="col-md-8 text-center">
                    <h2 class="mb-4"><i class="fas fa-info-circle me-2"></i>關於吃什麼？</h2>
                    <p class="lead">「吃什麼？」是一個幫助您解決用餐選擇困難的平台。</p>
                    <p>有時候我們會為了決定今天吃什麼而浪費太多時間，這個網站就是為了解決這個問題而生！只需輸入您的地址，我們將幫您找出附近的美食選擇，甚至可以為您隨機推薦一個餐廳，讓您告別選擇困難症。</p>
                    <div class="d-flex justify-content-center gap-3 mt-4">
                        <button class="btn btn-outline-primary btn-lg"><i class="fab fa-facebook me-2"></i>分享</button>
                        <button class="btn btn-outline-primary btn-lg"><i class="fas fa-envelope me-2"></i>聯絡我們</button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- 頁腳 -->
    <footer class="footer py-4">
        <div class="container text-center">
            <p>© 2025 吃什麼？ - 尋找附近美食的好幫手</p>
            <p><small>使用 Google Maps API 提供地理資訊服務</small></p>
        </div>
    </footer>

    <!-- 隨機推薦的彈出視窗 -->
    <div class="modal fade" id="randomPickModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><i class="fas fa-gift me-2"></i>今天就吃這家！</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <div id="random-pick-result"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                    <button type="button" class="btn btn-primary" id="pick-again-btn">再抽一次</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap 5 JS with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- 自定義 JS -->
    <script src="js/main.js"></script>
    <!-- Google Maps API -->
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap&language=zh-TW" defer></script>
</body>
</html>
````


Made changes.

現在讓我們繼續創建 CSS 和 JavaScript 文件，以完成網站的功能和設計。

首先，我將創建 CSS 樣式文件，實現網站的視覺設計和深色/淺色模式：
````
/**
 * 吃什麼？ - 餐廳搜尋網站樣式表
 * 包含深色/淺色模式切換及全站視覺設計
 */

/* 全局變數 */
:root {
    /* 淺色模式變數 */
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --accent-color: #ff9f43;
    --background-color: #f9f9f9;
    --card-bg: #ffffff;
    --text-color: #333333;
    --border-color: #e0e0e0;
    --input-bg: #ffffff;
    --input-border: #ced4da;
    --hover-color: #f8f9fa;
    --shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
    --navbar-bg: rgba(255, 255, 255, 0.95);
    --navbar-text: #333333;
    --footer-bg: #f8f9fa;
    --rating-color: #ffc107;
    --transition: all 0.3s ease;
}

/* 深色模式變數 */
[data-theme="dark"] {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --accent-color: #ff9f43;
    --background-color: #121212;
    --card-bg: #1e1e1e;
    --text-color: #e0e0e0;
    --border-color: #333333;
    --input-bg: #2c2c2c;
    --input-border: #444444;
    --hover-color: #333333;
    --shadow: 0 .5rem 1rem rgba(0, 0, 0, .5);
    --navbar-bg: rgba(30, 30, 30, 0.95);
    --navbar-text: #e0e0e0;
    --footer-bg: #1a1a1a;
    --rating-color: #ffc107;
}

/* 基本樣式 */
html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Microsoft JhengHei', 'Noto Sans TC', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    transition: var(--transition);
}

/* 導航欄 */
.navbar {
    background-color: var(--navbar-bg);
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.navbar-brand {
    font-weight: bold;
    color: var(--primary-color) !important;
    font-size: 1.5rem;
}

.nav-link {
    color: var(--navbar-text) !important;
    font-weight: 500;
    transition: var(--transition);
}

.nav-link:hover, .nav-link.active {
    color: var(--primary-color) !important;
}

/* 頁面區塊 */
section {
    padding: 80px 0;
    min-height: 100vh;
}

/* 搜尋卡片 */
.search-card {
    background-color: var(--card-bg);
    border: none;
    border-radius: 15px;
    transition: var(--transition);
}

.search-card:hover {
    transform: translateY(-5px);
}

/* 表單元素 */
.form-control, .form-select {
    background-color: var(--input-bg);
    border-color: var(--input-border);
    color: var(--text-color);
    border-radius: 10px;
    transition: var(--transition);
}

.form-control:focus, .form-select:focus {
    background-color: var(--input-bg);
    border-color: var(--primary-color);
    color: var(--text-color);
    box-shadow: 0 0 0 0.25rem rgba(255, 107, 107, 0.25);
}

/* 按鈕樣式 */
.btn-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    transition: var(--transition);
}

.btn-primary:hover, .btn-primary:focus {
    background-color: #ff5252;
    border-color: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 107, 107, 0.3);
}

.btn-success {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
    transition: var(--transition);
}

.btn-success:hover, .btn-success:focus {
    background-color: #3dbeb6;
    border-color: #3dbeb6;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(78, 205, 196, 0.3);
}

.btn-outline-primary {
    color: var(--primary-color);
    border-color: var(--primary-color);
    transition: var(--transition);
}

.btn-outline-primary:hover {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    transform: translateY(-2px);
}

/* 餐廳卡片 */
.restaurant-card {
    background-color: var(--card-bg);
    border-radius: 15px;
    overflow: hidden;
    transition: var(--transition);
    border: 1px solid var(--border-color);
}

.restaurant-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow);
}

.restaurant-img {
    height: 180px;
    object-fit: cover;
}

.restaurant-info {
    padding: 1.5rem;
}

.restaurant-name {
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.restaurant-type {
    font-size: 0.9rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
}

.restaurant-rating {
    margin-bottom: 1rem;
}

.rating-star {
    color: var(--rating-color);
}

.restaurant-address, .restaurant-phone {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

/* 載入動畫 */
.spinner-border {
    width: 3rem;
    height: 3rem;
    margin: 2rem;
}

/* 地圖容器 */
.map-container {
    height: 100vh;
    width: 100%;
}

#map-sidebar {
    background-color: var(--card-bg);
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid var(--border-color);
}

.map-list-item {
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    transition: var(--transition);
}

.map-list-item:hover, .map-list-item.active {
    background-color: var(--hover-color);
    border-color: var(--primary-color);
    color: var(--primary-color);
}

/* 隨機選擇模態 */
.modal-content {
    background-color: var(--card-bg);
    color: var(--text-color);
    border-radius: 15px;
}

.modal-header, .modal-footer {
    border-color: var(--border-color);
}

/* 頁腳 */
.footer {
    background-color: var(--footer-bg);
    color: var(--text-color);
    transition: var(--transition);
}

/* 隨機選擇結果動畫 */
@keyframes highlight {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(255, 107, 107, 0);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(255, 107, 107, 0);
    }
}

.highlight-pick {
    animation: highlight 1s ease-in-out;
}

/* 深色模式切換圖標 */
#theme-toggle {
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

#theme-toggle:hover {
    background-color: var(--hover-color);
}
````


Made changes.

現在讓我們繼續創建 JavaScript 檔案，實現網站的功能，包括地址搜尋、餐廳列表顯示、地圖整合以及隨機選擇餐廳的功能：
````
/**
 * 吃什麼？ - 餐廳搜尋網站
 * 主要 JavaScript 檔案
 * 包含所有網站功能的實現
 */

// 全域變數
let map; // Google Map 物件
let markers = []; // 地圖上的標記
let restaurants = []; // 搜尋到的餐廳清單
let userMarker; // 使用者位置標記
let infoWindow; // 地圖資訊視窗
let geocoder; // 地理編碼器
let placesService; // 地點搜尋服務

/**
 * 初始化 Google Maps
 * 在頁面載入完成後執行，設定地圖初始狀態
 */
function initMap() {
    // 創建地圖物件，設定初始中心點為台北市
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 25.0330, lng: 121.5654 },
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
        mapId: "main-map"
    });

    // 初始化相關服務
    infoWindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();
    placesService = new google.maps.places.PlacesService(map);

    // 初始化事件監聽器
    setupEventListeners();

    // 嘗試獲取使用者當前位置
    getCurrentLocation();
}

/**
 * 設定頁面所有事件監聽器
 * 包括表單提交、按鈕點擊等交互操作
 */
function setupEventListeners() {
    // 搜尋表單提交
    document.getElementById("search-form").addEventListener("submit", function(event) {
        event.preventDefault();
        searchRestaurants();
    });

    // 隨機選擇餐廳按鈕
    document.getElementById("random-pick-btn").addEventListener("click", function() {
        randomPickRestaurant();
    });

    // 再抽一次按鈕
    document.getElementById("pick-again-btn").addEventListener("click", function() {
        randomPickRestaurant();
    });

    // 地圖連結切換
    document.querySelector('a[href="#map-view"]').addEventListener("click", function(event) {
        event.preventDefault();
        showMapView();
    });

    // 首頁連結切換
    document.querySelector('a[href="#home"]').addEventListener("click", function(event) {
        event.preventDefault();
        showHomeView();
    });

    // 深色/淺色模式切換
    document.getElementById("theme-toggle").addEventListener("click", function() {
        toggleTheme();
    });

    // 初始化主題
    initTheme();
}

/**
 * 獲取使用者當前位置
 * 使用瀏覽器的地理位置 API
 */
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // 設定使用者位置標記
                if (userMarker) userMarker.setMap(null);
                userMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: "您的位置",
                    icon: {
                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    },
                    animation: google.maps.Animation.DROP,
                });

                // 將地圖中心設為使用者位置
                map.setCenter(pos);

                // 反向地理編碼獲取地址
                geocoder.geocode({ location: pos }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        document.getElementById("address").value = results[0].formatted_address;
                    }
                });
            },
            () => {
                console.log("無法獲取您的位置");
            }
        );
    } else {
        console.log("您的瀏覽器不支援地理位置功能");
    }
}

/**
 * 搜尋餐廳
 * 使用 Google Places API 查詢附近的餐廳
 */
function searchRestaurants() {
    // 顯示載入中動畫
    document.getElementById("loading").classList.remove("d-none");
    document.getElementById("results-container").classList.add("d-none");
    document.getElementById("no-results").classList.add("d-none");

    // 獲取使用者輸入
    const address = document.getElementById("address").value;
    const cuisineType = document.getElementById("cuisine-type").value;
    const radius = parseInt(document.getElementById("search-radius").value);

    // 若地址為空，提示使用者
    if (!address) {
        alert("請輸入地址");
        document.getElementById("loading").classList.add("d-none");
        return;
    }

    // 地理編碼將地址轉換為經緯度
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            
            // 在地圖上標記使用者位置
            if (userMarker) userMarker.setMap(null);
            userMarker = new google.maps.Marker({
                position: location,
                map: map,
                title: "搜尋位置",
                icon: {
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                },
                animation: google.maps.Animation.DROP,
            });

            // 將地圖中心設為搜尋位置
            map.setCenter(location);

            // 清除先前的餐廳標記
            clearMarkers();
            
            // 搜尋關鍵詞組合 (餐廳 + 餐廳類型)
            let keyword = "餐廳";
            if (cuisineType) {
                keyword = cuisineType + " " + keyword;
            }

            // 使用 Places API 搜尋附近餐廳
            const request = {
                location: location,
                radius: radius,
                type: "restaurant",
                keyword: keyword,
                language: "zh-TW",
            };

            placesService.nearbySearch(request, processSearchResults);
        } else {
            alert("地址查詢失敗，請嘗試其他地址");
            document.getElementById("loading").classList.add("d-none");
        }
    });
}

/**
 * 處理餐廳搜尋結果
 * @param {Array} results - Places API 回傳的搜尋結果
 * @param {String} status - API 請求狀態
 */
function processSearchResults(results, status) {
    // 隱藏載入中動畫
    document.getElementById("loading").classList.add("d-none");
    
    if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        // 紀錄搜尋到的餐廳
        restaurants = results;
        
        // 顯示結果區域
        document.getElementById("results-container").classList.remove("d-none");
        
        // 生成餐廳列表和地圖標記
        displayRestaurantList(results);
        addRestaurantMarkers(results);
        
        // 更新地圖檢視中的餐廳列表
        updateMapListView(results);
    } else {
        // 若沒有找到餐廳，顯示無結果訊息
        document.getElementById("no-results").classList.remove("d-none");
        document.getElementById("results-container").classList.remove("d-none");
        document.getElementById("restaurant-list").innerHTML = "";
    }
}

/**
 * 顯示餐廳列表
 * @param {Array} restaurants - 搜尋到的餐廳資料
 */
function displayRestaurantList(restaurants) {
    const container = document.getElementById("restaurant-list");
    container.innerHTML = ""; // 清空先前的列表

    restaurants.forEach((restaurant, index) => {
        // 獲取餐廳詳細資訊
        placesService.getDetails(
            { placeId: restaurant.place_id, fields: ["formatted_phone_number", "website", "formatted_address", "rating", "user_ratings_total"] },
            (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // 建立餐廳卡片
                    const restaurantCard = createRestaurantCard(restaurant, place, index);
                    container.appendChild(restaurantCard);
                }
            }
        );
    });
}

/**
 * 創建餐廳卡片元素
 * @param {Object} restaurant - 餐廳基本資料
 * @param {Object} details - 餐廳詳細資料
 * @param {Number} index - 餐廳索引
 * @return {HTMLElement} 餐廳卡片 DOM 元素
 */
function createRestaurantCard(restaurant, details, index) {
    // 建立卡片容器
    const colDiv = document.createElement("div");
    colDiv.className = "col";
    
    // 餐廳卡片 HTML
    colDiv.innerHTML = `
        <div class="restaurant-card" data-index="${index}">
            <img src="${restaurant.photos ? restaurant.photos[0].getUrl({ maxWidth: 400 }) : 'https://via.placeholder.com/400x200?text=無照片'}" alt="${restaurant.name}" class="restaurant-img w-100">
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                <div class="restaurant-type">${getTags(restaurant)}</div>
                <div class="restaurant-rating">
                    ${getRatingStars(details.rating || 0)}
                    <span class="rating-count">(${details.user_ratings_total || 0}則評價)</span>
                </div>
                <div class="restaurant-address"><i class="fas fa-map-marker-alt me-2"></i>${details.formatted_address || '無地址資訊'}</div>
                <div class="restaurant-phone"><i class="fas fa-phone me-2"></i>${details.formatted_phone_number || '無電話資訊'}</div>
                <div class="mt-3">
                    <a href="#" class="btn btn-sm btn-primary view-on-map-btn" data-index="${index}"><i class="fas fa-map me-2"></i>在地圖上查看</a>
                    ${details.website ? `<a href="${details.website}" target="_blank" class="btn btn-sm btn-outline-primary ms-2"><i class="fas fa-globe me-2"></i>官方網站</a>` : ''}
                </div>
            </div>
        </div>
    `;
    
    // 添加卡片點擊事件
    colDiv.querySelector(".view-on-map-btn").addEventListener("click", function(e) {
        e.preventDefault();
        const index = parseInt(this.getAttribute("data-index"));
        showMapView();
        google.maps.event.trigger(markers[index], "click");
    });
    
    return colDiv;
}

/**
 * 獲取餐廳類型標籤
 * @param {Object} restaurant - 餐廳資料
 * @return {String} HTML 格式的類型標籤
 */
function getTags(restaurant) {
    let tags = "";
    if (restaurant.types && restaurant.types.length > 0) {
        const typeMap = {
            "restaurant": "餐廳",
            "food": "美食",
            "cafe": "咖啡廳",
            "bakery": "麵包店",
            "bar": "酒吧",
            "meal_takeaway": "外帶",
            "meal_delivery": "外送"
        };
        
        restaurant.types.forEach(type => {
            if (typeMap[type]) {
                tags += `<span class="badge bg-secondary me-1">${typeMap[type]}</span>`;
            }
        });
    }
    return tags || '<span class="badge bg-secondary">一般餐廳</span>';
}

/**
 * 生成評分星星
 * @param {Number} rating - 評分值
 * @return {String} HTML 格式的星星評分
 */
function getRatingStars(rating) {
    let stars = "";
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    // 添加實星
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star rating-star"></i>';
    }
    
    // 添加半星
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt rating-star"></i>';
    }
    
    // 添加空星
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star rating-star"></i>';
    }
    
    return `<div class="stars">${stars}</div>`;
}

/**
 * 在地圖上添加餐廳標記
 * @param {Array} restaurants - 餐廳資料陣列
 */
function addRestaurantMarkers(restaurants) {
    // 清空先前的標記
    clearMarkers();
    
    restaurants.forEach((restaurant, index) => {
        // 創建標記
        const marker = new google.maps.Marker({
            position: restaurant.geometry.location,
            map: map,
            title: restaurant.name,
            animation: google.maps.Animation.DROP,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }
        });
        
        // 紀錄標記
        markers.push(marker);
        
        // 添加點擊事件
        marker.addListener("click", () => {
            // 獲取餐廳詳細資訊
            placesService.getDetails(
                { placeId: restaurant.place_id, fields: ["formatted_phone_number", "website", "formatted_address", "rating", "user_ratings_total"] },
                (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        // 顯示資訊視窗
                        showInfoWindow(restaurant, place, marker, index);
                        
                        // 高亮顯示側邊欄中的餐廳
                        highlightMapListItem(index);
                    }
                }
            );
        });
    });
    
    // 調整地圖範圍顯示所有標記
    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        if (userMarker) bounds.extend(userMarker.getPosition());
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
    }
}

/**
 * 清除地圖上的餐廳標記
 */
function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

/**
 * 顯示餐廳資訊視窗
 * @param {Object} restaurant - 餐廳基本資料
 * @param {Object} details - 餐廳詳細資料
 * @param {Object} marker - 地圖標記物件
 * @param {Number} index - 餐廳索引
 */
function showInfoWindow(restaurant, details, marker, index) {
    // 創建資訊視窗內容
    const contentString = `
        <div class="info-window" style="max-width: 300px;">
            <h5 style="color: #ff6b6b; margin-bottom: 8px;">${restaurant.name}</h5>
            <div style="margin-bottom: 8px;">${getTags(restaurant)}</div>
            <div style="margin-bottom: 8px;">${getRatingStars(details.rating || 0)}</div>
            <div style="margin-bottom: 5px;"><i class="fas fa-map-marker-alt" style="margin-right: 8px;"></i>${details.formatted_address || '無地址資訊'}</div>
            <div style="margin-bottom: 8px;"><i class="fas fa-phone" style="margin-right: 8px;"></i>${details.formatted_phone_number || '無電話資訊'}</div>
            <div style="margin-top: 12px;">
                ${details.website ? `<a href="${details.website}" target="_blank" style="color: #4ecdc4; text-decoration: none;"><i class="fas fa-globe" style="margin-right: 5px;"></i>官方網站</a>` : ''}
            </div>
        </div>
    `;
    
    // 設定資訊視窗內容並打開
    infoWindow.setContent(contentString);
    infoWindow.open(map, marker);
}

/**
 * 更新地圖檢視中的餐廳列表
 * @param {Array} restaurants - 餐廳資料陣列
 */
function updateMapListView(restaurants) {
    const mapList = document.getElementById("map-list");
    mapList.innerHTML = ""; // 清空先前的列表
    
    restaurants.forEach((restaurant, index) => {
        // 創建列表項目
        const listItem = document.createElement("a");
        listItem.href = "#";
        listItem.className = "list-group-item list-group-item-action map-list-item";
        listItem.setAttribute("data-index", index);
        
        // 設定列表項目內容
        listItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-1">${restaurant.name}</h6>
                <small>${(restaurant.distance / 1000).toFixed(1)}km</small>
            </div>
            <div class="mb-1">${getTags(restaurant)}</div>
            <small><i class="fas fa-star rating-star me-1"></i>${restaurant.rating || 'N/A'}</small>
        `;
        
        // 添加點擊事件
        listItem.addEventListener("click", function(e) {
            e.preventDefault();
            const index = parseInt(this.getAttribute("data-index"));
            google.maps.event.trigger(markers[index], "click");
            highlightMapListItem(index);
        });
        
        mapList.appendChild(listItem);
    });
}

/**
 * 高亮地圖列表中的特定項目
 * @param {Number} index - 餐廳索引
 */
function highlightMapListItem(index) {
    // 移除所有項目的 active 狀態
    document.querySelectorAll(".map-list-item").forEach(item => {
        item.classList.remove("active");
    });
    
    // 將指定項目設為 active
    const targetItem = document.querySelector(`.map-list-item[data-index="${index}"]`);
    if (targetItem) {
        targetItem.classList.add("active");
        targetItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}

/**
 * 隨機選擇餐廳
 * 從搜尋結果中隨機挑選一家餐廳
 */
function randomPickRestaurant() {
    if (restaurants.length === 0) {
        alert("請先搜尋餐廳");
        return;
    }
    
    // 隨機選擇一家餐廳
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const restaurant = restaurants[randomIndex];
    
    // 獲取詳細資訊
    placesService.getDetails(
        { placeId: restaurant.place_id, fields: ["formatted_phone_number", "website", "formatted_address", "rating", "user_ratings_total"] },
        (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // 顯示結果
                displayRandomResult(restaurant, place, randomIndex);
            }
        }
    );
}

/**
 * 顯示隨機選擇的結果
 * @param {Object} restaurant - 餐廳基本資料
 * @param {Object} details - 餐廳詳細資料
 * @param {Number} index - 餐廳索引
 */
function displayRandomResult(restaurant, details, index) {
    const resultContainer = document.getElementById("random-pick-result");
    
    // 設定結果內容
    resultContainer.innerHTML = `
        <div class="restaurant-card highlight-pick">
            <img src="${restaurant.photos ? restaurant.photos[0].getUrl({ maxWidth: 400 }) : 'https://via.placeholder.com/400x200?text=無照片'}" alt="${restaurant.name}" class="restaurant-img w-100">
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                <div class="restaurant-type">${getTags(restaurant)}</div>
                <div class="restaurant-rating">
                    ${getRatingStars(details.rating || 0)}
                    <span class="rating-count">(${details.user_ratings_total || 0}則評價)</span>
                </div>
                <div class="restaurant-address"><i class="fas fa-map-marker-alt me-2"></i>${details.formatted_address || '無地址資訊'}</div>
                <div class="restaurant-phone"><i class="fas fa-phone me-2"></i>${details.formatted_phone_number || '無電話資訊'}</div>
                <div class="mt-3">
                    <a href="#" class="btn btn-sm btn-primary view-on-map-btn" data-index="${index}"><i class="fas fa-map me-2"></i>在地圖上查看</a>
                    ${details.website ? `<a href="${details.website}" target="_blank" class="btn btn-sm btn-outline-primary ms-2"><i class="fas fa-globe me-2"></i>官方網站</a>` : ''}
                </div>
            </div>
        </div>
    `;
    
    // 添加地圖連結點擊事件
    resultContainer.querySelector(".view-on-map-btn").addEventListener("click", function(e) {
        e.preventDefault();
        const index = parseInt(this.getAttribute("data-index"));
        const modal = bootstrap.Modal.getInstance(document.getElementById("randomPickModal"));
        modal.hide();
        showMapView();
        google.maps.event.trigger(markers[index], "click");
    });
    
    // 顯示模態視窗
    const modal = new bootstrap.Modal(document.getElementById("randomPickModal"));
    modal.show();
}

/**
 * 顯示地圖檢視
 * 切換到地圖頁面
 */
function showMapView() {
    // 隱藏其他區塊
    document.getElementById("home").classList.add("d-none");
    document.getElementById("about").classList.add("d-none");
    
    // 顯示地圖區塊
    document.getElementById("map-view").classList.remove("d-none");
    
    // 更新導航欄選中項目
    updateNavActiveItem("#map-view");
    
    // 重新調整地圖大小
    google.maps.event.trigger(map, "resize");
}

/**
 * 顯示首頁檢視
 * 切換到首頁頁面
 */
function showHomeView() {
    // 顯示首頁區塊
    document.getElementById("home").classList.remove("d-none");
    document.getElementById("about").classList.remove("d-none");
    
    // 隱藏地圖區塊
    document.getElementById("map-view").classList.add("d-none");
    
    // 更新導航欄選中項目
    updateNavActiveItem("#home");
}

/**
 * 更新導航欄選中項目
 * @param {String} selector - 選中的項目選擇器
 */
function updateNavActiveItem(selector) {
    // 移除所有項目的 active 狀態
    document.querySelectorAll(".nav-link").forEach(item => {
        item.classList.remove("active");
    });
    
    // 將指定項目設為 active
    document.querySelector(`a[href="${selector}"]`).classList.add("active");
}

/**
 * 初始化主題設定
 * 根據系統偏好或使用者設定決定淺色/深色模式
 */
function initTheme() {
    // 檢查本地儲存的主題設定
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
        // 使用儲存的設定
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // 使用系統深色模式偏好
        document.documentElement.setAttribute("data-theme", "dark");
        updateThemeIcon("dark");
    }
}

/**
 * 切換淺色/深色主題
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    // 設定新主題
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    // 更新主題圖標
    updateThemeIcon(newTheme);
}

/**
 * 更新主題圖標
 * @param {String} theme - 當前主題 ('light' 或 'dark')
 */
function updateThemeIcon(theme) {
    const icon = document.getElementById("theme-icon");
    if (theme === "dark") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}
````


Made changes.

現在我已經為您成功建立了「吃什麼？」網站的基本架構，包括以下檔案：

1. index.html - 網站首頁，包含搜尋表單、餐廳列表顯示區、地圖檢視區和隨機推薦功能
2. style.css - 樣式表，實現了網站的視覺設計和深色/淺色模式切換
3. main.js - JavaScript 檔案，實現了所有功能，包括地址搜尋、餐廳列表顯示、Google Maps 整合和隨機選擇功能
4. README.md - 專案說明文件

這個網站現在具備了您所需的所有功能：

- 使用者可以輸入地址搜尋附近餐廳
- 可以選擇餐廳類型（中式、日式、義式、韓式、美式）
- 可以設定搜尋範圍（500公尺、1公里、2公里）
- 顯示餐廳詳細資訊（名稱、類型、地址、評價、電話等）
- 使用 Google Maps 顯示餐廳位置
- 提供隨機選擇功能
- 支援深色/淺色模式切換

網站的設計遵循了您的要求，使用了 Bootstrap 5 和 Font Awesome 圖示庫來創建華麗的介面，並加入了過渡動畫和互動效果，使用者體驗豐富。

**請注意**：您需要將 Google Maps API 的金鑰替換為您自己的，這個金鑰位於 index.html 檔案底部的 Google Maps API 腳本標籤中：

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap&language=zh-TW" defer></script>
```

您需要：
1. 在 Google Cloud Platform 創建一個專案
2. 啟用 Maps JavaScript API 和 Places API
3. 創建 API 金鑰
4. 將 `YOUR_API_KEY` 替換為您的實際 API 金鑰

若要啟動網站，只需在瀏覽器中打開 index.html 檔案，或者使用簡單的 HTTP 伺服器來服務這些檔案。

網站上的所有文字都使用繁體中文，與 Google Maps 的地址、位置和餐廳資訊都設定為使用繁體中文顯示。

需要進一步完善或有任何其他需求，請告訴我！