// 全屏滚动控制
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    let currentSection = 0;
    let isScrolling = false;
    let scrollTimeout;

    // 滚动到指定section
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        
        isScrolling = true;
        currentSection = index;
        
        sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // 设置滚动锁定时间
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // 处理滚轮事件
    function handleWheel(e) {
        e.preventDefault(); // 阻止默认滚动行为
        
        if (isScrolling) return;

        if (e.deltaY > 0) {
            // 向下滚动
            scrollToSection(currentSection + 1);
        } else {
            // 向上滚动
            scrollToSection(currentSection - 1);
        }
    }

    // 添加滚轮事件监听
    window.addEventListener('wheel', handleWheel, { passive: false });

    // 初始化：确保第一个section在视口中居中
    scrollToSection(0);
});
