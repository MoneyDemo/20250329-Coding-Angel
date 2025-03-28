import os
from dotenv import load_dotenv

# 載入環境變數
load_dotenv()

class Config:
    """應用程式設定類別"""
    # Flask 設定
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-please-change-in-production'
    
    # Google Maps API 設定 (用於前端)
    GOOGLE_MAPS_API_KEY = os.environ.get('GOOGLE_MAPS_API_KEY')
    if not GOOGLE_MAPS_API_KEY:
        raise ValueError(
            "未設定 Google Maps API 金鑰。請在 .env 檔案中設定 GOOGLE_MAPS_API_KEY。\n"
            "您需要：\n"
            "1. 在 Google Cloud Console 建立專案\n"
            "2. 啟用以下 API：\n"
            "   - Maps JavaScript API\n"
            "   - Places API\n"
            "3. 建立 API 金鑰並設定適當的限制\n"
            "4. 將金鑰加入 .env 檔案"
        )
    
    # 預設搜尋範圍（公尺）
    DEFAULT_SEARCH_RADIUS = 500
    
    # 支援的餐廳類型
    RESTAURANT_TYPES = [
        {'id': 'chinese', 'name': '中式料理'},
        {'id': 'japanese', 'name': '日式料理'},
        {'id': 'korean', 'name': '韓式料理'},
        {'id': 'italian', 'name': '義式料理'},
        {'id': 'american', 'name': '美式料理'}
    ]
    
    # 搜尋範圍選項（公尺）
    SEARCH_RADIUS_OPTIONS = [
        {'value': 500, 'name': '500公尺'},
        {'value': 1000, 'name': '1公里'},
        {'value': 2000, 'name': '2公里'}
    ]