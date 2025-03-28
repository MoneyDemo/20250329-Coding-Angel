// 全域變數儲存目前的餐廳清單
let currentRestaurants = [];
let isMapInitialized = false;

// 當文件載入完成時執行
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 載入完成，初始化應用程式...');
    // 創建錯誤訊息容器
    createErrorContainer();
    
    // 初始禁用搜尋按鈕
    const searchForm = document.getElementById('searchForm');
    const searchButton = searchForm.querySelector('button[type="submit"]');
    searchButton.disabled = true;
    
    // 等待地圖初始化完成
    window.addEventListener('mapInitialized', () => {
        console.log('接收到地圖初始化完成事件');
        isMapInitialized = true;
        setupEventListeners();
        
        // 更新按鈕狀態和文字
        searchButton.disabled = false;
        searchButton.innerHTML = '<i class="fas fa-search"></i> 搜尋';
    });
});

// 設置事件監聽器
function setupEventListeners() {
    console.log('設置事件監聽器...');
    // 搜尋表單提交事件處理
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearch);
    
    // 隨機選擇按鈕事件處理
    const randomButton = document.getElementById('randomButton');
    if (randomButton) {
        randomButton.addEventListener('click', handleRandomSelection);
    }
}

// 創建錯誤訊息容器
function createErrorContainer() {
    const container = document.createElement('div');
    container.id = 'errorContainer';
    container.className = 'position-fixed top-0 start-50 translate-middle-x p-3';
    container.style.zIndex = '1050';
    document.body.appendChild(container);
}

// 處理搜尋表單提交
async function handleSearch(event) {
    event.preventDefault();
    
    if (!isMapInitialized) {
        showError('地圖尚未完成初始化，請稍後再試');
        return;
    }
    
    const address = document.getElementById('address').value;
    const type = document.getElementById('type').value;
    const radius = document.getElementById('radius').value;
    
    try {
        showLoading();
        
        // 直接使用 Google Maps API 搜尋餐廳
        const restaurants = await searchNearbyRestaurants(address, type, parseInt(radius));
        currentRestaurants = restaurants;
        
        displayRestaurants(restaurants);
        setMapMarkers(restaurants);
        document.getElementById('randomButton').style.display = 'block';
    } catch (error) {
        showError(error.message);
        console.error('搜尋錯誤:', error);
    } finally {
        hideLoading();
    }
}

// 處理隨機選擇餐廳
async function handleRandomSelection() {
    if (currentRestaurants.length === 0) {
        showError('請先搜尋餐廳！');
        return;
    }
    
    try {
        showLoading();
        
        // 隨機選擇一間餐廳
        const restaurant = currentRestaurants[Math.floor(Math.random() * currentRestaurants.length)];
        
        // 顯示選中的餐廳
        highlightSelectedRestaurant(restaurant);
        await showRestaurantDetails(restaurant.place_id);
    } catch (error) {
        showError('無法取得餐廳詳細資訊');
        console.error('隨機選擇錯誤:', error);
    } finally {
        hideLoading();
    }
}

// 顯示餐廳清單
function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = '';
    
    if (restaurants.length === 0) {
        restaurantList.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> 在指定範圍內找不到符合條件的餐廳
                </div>
            </div>
        `;
        return;
    }
    
    restaurants.forEach((restaurant, index) => {
        const card = createRestaurantCard(restaurant, index);
        restaurantList.appendChild(card);
        
        // 使用淡入動畫
        setTimeout(() => {
            card.style.opacity = '1';
        }, index * 100);
    });
}

// 創建餐廳卡片
function createRestaurantCard(restaurant, index) {
    const card = document.createElement('div');
    card.className = 'col-md-6 fade-in';
    card.dataset.placeId = restaurant.place_id;
    card.style.opacity = '0';
    card.style.transition = 'opacity 0.3s ease-in-out';
    
    const ratingStars = '★'.repeat(Math.round(restaurant.rating)) + 
                       '☆'.repeat(5 - Math.round(restaurant.rating));
    
    card.innerHTML = `
        <div class="card restaurant-card h-100">
            <div class="card-body">
                <h5 class="card-title">
                    ${index + 1}. ${restaurant.name}
                </h5>
                <p class="card-text">
                    <i class="fas fa-map-marker-alt"></i> ${restaurant.address}<br>
                    <span class="rating" style="color: #ffd700;">
                        ${ratingStars}
                        <small>(${restaurant.rating} / ${restaurant.user_ratings_total} 則評價)</small>
                    </span>
                </p>
                <button class="btn btn-sm btn-primary" onclick="showRestaurantDetails('${restaurant.place_id}')">
                    <i class="fas fa-info-circle"></i> 詳細資訊
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// 顯示餐廳詳細資訊
async function showRestaurantDetails(placeId) {
    try {
        showLoading();
        
        // 直接使用 Google Maps API 獲取詳細資訊
        const details = await getPlaceDetails(placeId);
        showDetailsModal(details);
    } catch (error) {
        showError('無法取得餐廳詳細資訊');
        console.error('取得詳細資訊錯誤:', error);
    } finally {
        hideLoading();
    }
}

// 顯示詳細資訊 Modal
function showDetailsModal(details) {
    const modalBody = document.querySelector('#restaurantModal .modal-body');
    
    // 格式化營業時間
    const openingHours = details.opening_hours?.weekday_text?.join('<br>') || '未提供營業時間';
    
    // 計算價位等級
    const priceLevel = '💰'.repeat(details.price_level || 0) || '未提供價位資訊';
    
    modalBody.innerHTML = `
        <div class="restaurant-details">
            <h4>${details.name}</h4>
            <p>
                <i class="fas fa-map-marker-alt"></i> ${details.formatted_address}<br>
                <i class="fas fa-phone"></i> ${details.formatted_phone_number || '未提供電話'}<br>
                <i class="fas fa-dollar-sign"></i> ${priceLevel}<br>
                <i class="fas fa-clock"></i> 營業時間：<br>
                <small>${openingHours}</small>
            </p>
            ${details.website ? 
                `<p><a href="${details.website}" target="_blank" class="btn btn-sm btn-outline-primary">
                    <i class="fas fa-globe"></i> 查看網站
                </a></p>` : 
                ''
            }
            <hr>
            <h5><i class="fas fa-comments"></i> 最新評價</h5>
            ${details.reviews ? 
                details.reviews.slice(0, 3).map(review => `
                    <div class="review mb-3">
                        <p>
                            <strong>${review.author_name}</strong>
                            <span class="rating" style="color: #ffd700;">
                                ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                            </span>
                        </p>
                        <p class="review-text">${review.text}</p>
                    </div>
                `).join('') : 
                '<p>暫無評價</p>'
            }
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('restaurantModal'));
    modal.show();
}

// 高亮顯示被選中的餐廳
function highlightSelectedRestaurant(restaurant) {
    // 重置所有卡片樣式
    document.querySelectorAll('.restaurant-card').forEach(card => {
        card.classList.remove('border-success', 'border-3');
    });
    
    // 高亮顯示選中的卡片
    const selectedCard = document.querySelector(`[data-place-id="${restaurant.place_id}"] .restaurant-card`);
    if (selectedCard) {
        selectedCard.classList.add('border-success', 'border-3');
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // 在地圖上聚焦選中的餐廳
    markers.forEach(marker => {
        if (marker.getTitle() === restaurant.name) {
            google.maps.event.trigger(marker, 'click');
            map.panTo(marker.getPosition());
        }
    });
}

// 顯示載入中狀態
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingSpinner';
    loadingDiv.className = 'position-fixed top-50 start-50 translate-middle';
    loadingDiv.innerHTML = `
        <div class="d-flex flex-column align-items-center">
            <div class="spinner-border text-primary mb-2" role="status">
                <span class="visually-hidden">載入中...</span>
            </div>
            <span class="text-primary">載入中...</span>
        </div>
    `;
    loadingDiv.style.zIndex = '1060';
    document.body.appendChild(loadingDiv);
}

// 隱藏載入中狀態
function hideLoading() {
    const loadingDiv = document.getElementById('loadingSpinner');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// 顯示錯誤訊息
function showError(message) {
    const errorContainer = document.getElementById('errorContainer');
    
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-danger border-0';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-exclamation-circle me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    errorContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast, {
        animation: true,
        autohide: true,
        delay: 5000
    });
    
    bsToast.show();
    
    // 當 toast 隱藏時移除元素
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}