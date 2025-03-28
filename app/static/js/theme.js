// 主題切換功能
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // 檢查本地存儲的主題設定
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // 切換主題按鈕事件監聽
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // 觸發自定義事件以通知地圖更新
        const event = new CustomEvent('themeChanged', { detail: { theme: newTheme } });
        document.dispatchEvent(event);
    });
    
    // 更新主題圖標
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.setAttribute('title', '切換至淺色模式');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeToggle.setAttribute('title', '切換至深色模式');
        }
    }
});