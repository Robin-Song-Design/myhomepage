// theme.js
document.addEventListener('DOMContentLoaded', function() {
    // 深色模式切换
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // 检查用户系统首选项
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        html.classList.add('dark');
    }

    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else if (savedTheme === 'light') {
        html.classList.remove('dark');
    }

    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
});
