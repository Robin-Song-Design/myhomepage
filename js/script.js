// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 加载导航栏
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // 导航栏加载后激活当前页面的链接
            highlightCurrentPage();
            
            // 设置暗色/亮色模式切换
            setupThemeToggle();
        });
    
    // 加载页脚
    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});

// 高亮当前页面的导航链接
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-blue-500', 'font-medium');
        }
    });
}

// 设置暗色/亮色模式切换
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', 
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
        });
    }
    
    // 检查用户偏好的主题
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// 微信二维码弹窗功能
document.addEventListener('DOMContentLoaded', function() {
    const wechatIcon = document.getElementById('wechatIcon');
    const wechatModal = document.getElementById('wechatModal');
    const closeModal = document.getElementById('closeModal');
    
    if (wechatIcon && wechatModal && closeModal) {
        // 点击微信图标打开弹窗
        wechatIcon.addEventListener('click', function(e) {
            e.preventDefault();
            wechatModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
        
        // 点击关闭按钮关闭弹窗
        closeModal.addEventListener('click', function() {
            wechatModal.classList.add('hidden');
            document.body.style.overflow = ''; // 恢复背景滚动
        });
        
        // 点击弹窗背景关闭弹窗
        wechatModal.addEventListener('click', function(e) {
            if (e.target === wechatModal) {
                wechatModal.classList.add('hidden');
                document.body.style.overflow = ''; // 恢复背景滚动
            }
        });
        
        // ESC键关闭弹窗
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !wechatModal.classList.contains('hidden')) {
                wechatModal.classList.add('hidden');
                document.body.style.overflow = ''; // 恢复背景滚动
            }
        });
    }
});

//moble menu
// 移动菜单控制逻辑
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileDesignDropdown = document.getElementById('mobileDesignDropdown');
    const mobileDesignMenu = document.getElementById('mobileDesignMenu');
    const mobileCodeDropdown = document.getElementById('mobileCodeDropdown');
    const mobileCodeMenu = document.getElementById('mobileCodeMenu');
    
    // 汉堡菜单切换
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 移动端Design下拉菜单切换
    if (mobileDesignDropdown && mobileDesignMenu) {
        mobileDesignDropdown.addEventListener('click', function() {
            mobileDesignMenu.classList.toggle('hidden');
            // 切换箭头方向
            const arrow = mobileDesignDropdown.querySelector('i');
            if (arrow) {
                arrow.classList.toggle('fa-chevron-down');
                arrow.classList.toggle('fa-chevron-up');
            }
        });
    }
    
    // 移动端Code下拉菜单切换
    if (mobileCodeDropdown && mobileCodeMenu) {
        mobileCodeDropdown.addEventListener('click', function() {
            mobileCodeMenu.classList.toggle('hidden');
            // 切换箭头方向
            const arrow = mobileCodeDropdown.querySelector('i');
            if (arrow) {
                arrow.classList.toggle('fa-chevron-down');
                arrow.classList.toggle('fa-chevron-up');
            }
        });
    }
    
    // 确保移动端语言和主题按钮工作
    const mobileLangToggle = document.getElementById('mobileLangToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const mobileWechatIcon = document.getElementById('mobileWechatIcon');
    
    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', function() {
            // 复用已有的语言切换逻辑
            const langToggle = document.getElementById('langToggle');
            if (langToggle) {
                langToggle.click();
            }
        });
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function() {
            // 复用已有的主题切换逻辑
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.click();
            }
        });
    }
    
    if (mobileWechatIcon) {
        mobileWechatIcon.addEventListener('click', function() {
            // 复用已有的微信图标点击逻辑
            const wechatIcon = document.getElementById('wechatIcon');
            if (wechatIcon) {
                wechatIcon.click();
            }
        });
    }
    
    // 在窗口调整大小时处理菜单显示
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) { // md断点
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // 获取所有需要显示的元素
    const elements = document.querySelectorAll('.scroll-reveal');
    
    // 初始化 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 关键修改：不再取消观察，而是根据可见性切换类
        if (entry.isIntersecting) {
          // 元素进入视口，添加可见类
          entry.target.classList.add('is-visible');
        } else {
          // 元素离开视口，移除可见类，这样再次进入时会重新触发动画
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      root: null, // 使用视口作为根元素
      rootMargin: '0px 0px -100px 0px', // 当元素距离底部 100px 时触发
      threshold: 0.1 // 当 10% 的元素可见时触发
    });
    
    // 开始观察所有元素
    elements.forEach(el => {
      observer.observe(el);
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const flipCard = document.querySelector('.flip-card-container');
    const cardFront = document.querySelector('.flip-card-front');
    const svgLogo = cardFront.querySelector('svg');
    
    // 添加SVG logo脉动动画
    function pulseSvg() {
        svgLogo.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' }
        ], {
            duration: 2000,
            iterations: Infinity
        });
    }
    
    // 页面加载时启动脉动
    pulseSvg();
    
    // 点击也可以触发翻转
    flipCard.addEventListener('click', function() {
        this.querySelector('.flip-card').classList.toggle('clicked');
    });
    
    // 由于已经在CSS中处理了hover效果，这里添加clicked类的样式
    const style = document.createElement('style');
    style.textContent = `
        .flip-card.clicked {
            transform: rotateY(180deg);
        }
    `;
    document.head.appendChild(style);
    
    // 添加键盘可访问性
    flipCard.setAttribute('tabindex', '0');
    flipCard.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.querySelector('.flip-card').classList.toggle('clicked');
        }
    });
});

// 处理卡片翻转
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
});
