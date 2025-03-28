from flask import Blueprint, render_template, request, jsonify, current_app
import random

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    """首頁路由
    
    顯示主頁面，包含搜尋表單和地圖
    """
    return render_template('index.html',
                         config=current_app.config)

@main_bp.route('/search', methods=['POST'])
def search_restaurants():
    """搜尋餐廳 API
    
    根據使用者提供的地址和條件搜尋附近餐廳
    """
    try:
        data = request.get_json()
        if not data or 'address' not in data:
            return jsonify({
                'success': False,
                'error': '請提供搜尋地址'
            }), 400
        
        address = data.get('address')
        restaurant_type = data.get('type')
        radius = data.get('radius', current_app.config['DEFAULT_SEARCH_RADIUS'])
        
        restaurants = get_nearby_restaurants(address, restaurant_type, radius)
        return jsonify({
            'success': True,
            'restaurants': restaurants
        })
    except GoogleAPIError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400
    except Exception as e:
        current_app.logger.error(f'搜尋餐廳時發生錯誤: {str(e)}')
        return jsonify({
            'success': False,
            'error': '發生未預期的錯誤，請稍後再試'
        }), 500

@main_bp.route('/restaurant/<place_id>')
def get_restaurant_details(place_id):
    """取得餐廳詳細資訊
    
    根據 place_id 獲取餐廳的詳細資訊
    """
    try:
        details = get_place_details(place_id)
        return jsonify({
            'success': True,
            'details': details
        })
    except GoogleAPIError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400
    except Exception as e:
        current_app.logger.error(f'取得餐廳詳細資訊時發生錯誤: {str(e)}')
        return jsonify({
            'success': False,
            'error': '發生未預期的錯誤，請稍後再試'
        }), 500

@main_bp.route('/random', methods=['POST'])
def get_random_restaurant():
    """隨機選擇餐廳
    
    從搜尋結果中隨機選擇一間餐廳
    """
    try:
        data = request.get_json()
        restaurants = data.get('restaurants', [])
        
        if not restaurants:
            return jsonify({
                'success': False,
                'error': '沒有可供選擇的餐廳'
            }), 400
            
        chosen_restaurant = random.choice(restaurants)
        return jsonify({
            'success': True,
            'restaurant': chosen_restaurant
        })
    except Exception as e:
        current_app.logger.error(f'隨機選擇餐廳時發生錯誤: {str(e)}')
        return jsonify({
            'success': False,
            'error': '發生未預期的錯誤，請稍後再試'
        }), 500