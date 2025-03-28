from flask import Flask
from app.config import Config

def create_app(config_class=Config):
    """建立並配置 Flask 應用程式實例"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # 確保必要的設定存在
    if not app.config['GOOGLE_MAPS_API_KEY']:
        raise ValueError("Google Maps API Key is required. Please set GOOGLE_MAPS_API_KEY in .env file.")
    
    # 註冊路由
    from app.routes import main_bp
    app.register_blueprint(main_bp)
    
    return app