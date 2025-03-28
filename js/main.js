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