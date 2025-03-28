// 地圖相關功能
let map;
let markers = [];
let currentInfoWindow = null;
let placesService;
let geocoder;

// 初始化地圖
function initMap() {
    console.log('開始初始化地圖...');
    
    // 确保即使在地图加载失败时也会触发事件
    window.setTimeout(() => {
        const event = new CustomEvent('mapInitialized');
        window.dispatchEvent(event);
    }, 1000);
    
    try {
        // 預設以台北市為中心
        const defaultCenter = { lat: 25.0330, lng: 121.5654 };
        
        // 初始化地圖
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: defaultCenter,
            styles: getMapStyles(localStorage.getItem('theme') || 'light')
        });

        // 初始化 Places 服務
        placesService = new google.maps.places.PlacesService(map);
        
        // 初始化地理編碼服務
        geocoder = new google.maps.Geocoder();
        
        console.log('地圖初始化完成');
        
    } catch (error) {
        console.error('地圖初始化失敗:', error);
        showError('地圖載入失敗，請重新整理頁面');
    }
}

// 搜尋附近餐廳
async function searchNearbyRestaurants(address, type, radius) {
    try {
        // 先將地址轉換為座標
        const location = await geocodeAddress(address);
        
        // 搜尋參數
        const request = {
            location: location,
            radius: radius,
            type: 'restaurant',
            keyword: type || ''
        };
        
        // 返回 Promise 以便使用 async/await
        return new Promise((resolve, reject) => {
            placesService.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    const restaurants = results.map(place => ({
                        place_id: place.place_id,
                        name: place.name,
                        address: place.vicinity,
                        rating: place.rating || 0,
                        user_ratings_total: place.user_ratings_total || 0,
                        location: {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        },
                        types: place.types
                    }));
                    resolve(restaurants);
                } else {
                    reject(new Error(getErrorMessage(status)));
                }
            });
        });
    } catch (error) {
        throw error;
    }
}

// 獲取餐廳詳細資訊
async function getPlaceDetails(placeId) {
    const request = {
        placeId: placeId,
        fields: ['name', 'formatted_address', 'formatted_phone_number', 
                'rating', 'reviews', 'website', 'opening_hours', 'price_level']
    };
    
    return new Promise((resolve, reject) => {
        placesService.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(place);
            } else {
                reject(new Error(getErrorMessage(status)));
            }
        });
    });
}

// 將地址轉換為座標
async function geocodeAddress(address) {
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                resolve(results[0].geometry.location);
            } else {
                reject(new Error(getErrorMessage(status)));
            }
        });
    });
}

// 設置地圖標記
function setMapMarkers(restaurants) {
    // 清除現有標記
    clearMarkers();
    
    const bounds = new google.maps.LatLngBounds();
    
    restaurants.forEach((restaurant, index) => {
        const position = {
            lat: restaurant.location.lat,
            lng: restaurant.location.lng
        };
        
        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: restaurant.name,
            animation: google.maps.Animation.DROP,
            label: (index + 1).toString()
        });
        
        bounds.extend(position);
        
        // 創建資訊視窗
        const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(restaurant)
        });
        
        // 點擊標記時顯示資訊視窗
        marker.addListener('click', () => {
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }
            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
        });
        
        markers.push(marker);
    });
    
    // 調整地圖範圍以顯示所有標記
    if (markers.length > 0) {
        map.fitBounds(bounds);
    }
}

// 清除地圖上的所有標記
function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    if (currentInfoWindow) {
        currentInfoWindow.close();
        currentInfoWindow = null;
    }
}

// 創建資訊視窗內容
function createInfoWindowContent(restaurant) {
    const ratingStars = '★'.repeat(Math.round(restaurant.rating)) + 
                       '☆'.repeat(5 - Math.round(restaurant.rating));
    
    return `
        <div class="info-window">
            <h5>${restaurant.name}</h5>
            <p>
                <i class="fas fa-map-marker-alt"></i> ${restaurant.address}<br>
                <span class="rating" style="color: #ffd700;">${ratingStars}</span>
                (${restaurant.rating} / ${restaurant.user_ratings_total} 則評價)
            </p>
            <button class="btn btn-sm btn-primary" 
                    onclick="showRestaurantDetails('${restaurant.place_id}')">
                查看詳細資訊
            </button>
        </div>
    `;
}

// 獲取錯誤訊息
function getErrorMessage(status) {
    const errorMessages = {
        'ZERO_RESULTS': '在指定範圍內找不到符合條件的餐廳。',
        'OVER_QUERY_LIMIT': '已超過 API 配額限制。請稍後再試。',
        'REQUEST_DENIED': 'API 請求被拒絕。請檢查 API 金鑰設定。',
        'INVALID_REQUEST': '無效的請求。請檢查輸入的參數是否正確。',
        'NOT_FOUND': '找不到指定的地點。',
        'UNKNOWN_ERROR': '發生未知錯誤。請稍後再試。'
    };
    
    return errorMessages[status] || `發生錯誤: ${status}`;
}

// 取得地圖樣式
function getMapStyles(theme) {
    if (theme === 'dark') {
        return [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
            },
        ];
    }
    return []; // 淺色主題使用預設樣式
}

// 監聽主題變更事件
document.addEventListener('themeChanged', (event) => {
    if (map) {
        map.setOptions({ styles: getMapStyles(event.detail.theme) });
    }
});

// 當 DOM 載入完成時初始化地圖
document.addEventListener('DOMContentLoaded', initMap);