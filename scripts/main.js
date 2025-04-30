// 课程数据（示例）
const courseData = [
    {
        id: 1,
        name: "希腊罗马神话",
        type: "general",
        description: "希罗神话课内知识 + 伊利亚特每章中文纲要 + 学科智能体",
        lastUpdate: "2025-04-30",
        feishuLink: "https://zjut-team.feishu.cn/wiki/Esk8wisptiQLH7kBkSBcT3eSn0c?from=from_copylink",
        agentLink: "https://doubao.com/bot/tReg6NUq",
        tip: "AI辅助，一周通关"
    },
    {
        id: 2,
        name: "语言学教程",
        type: "general",
        description: "语言学教程1-4章主要知识点",
        lastUpdate: "2025-04-29",
        feishuLink: "https://example.feishu.cn/english",
        agentLink: "https://doubao.com/bot/9mFcss2r",
        tip: "速通，速通！"
    },
    
];

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化课程展示
    initializeCourses();
    
    // 初始化搜索和筛选功能
    initializeSearch();
    
    // 初始化返回顶部按钮
    initializeBackToTop();
    
    // 初始化滚动动画
    initializeScrollAnimation();
});

// 初始化课程展示
function initializeCourses() {
    const courseGrid = document.getElementById('courseGrid');
    
    // 首次渲染所有课程
    renderCourses(courseData);

    function renderCourses(courses) {
        courseGrid.innerHTML = '';
        if (courses.length === 0) {
            courseGrid.innerHTML = '<div class="no-results">没有找到匹配的课程</div>';
            return;
        }

        courses.forEach(course => {
            const card = createCourseCard(course);
            courseGrid.appendChild(card);
        });
    }

    // 创建课程卡片
    function createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card fade-in';
        
        // 添加点击整个卡片跳转的功能
        card.addEventListener('click', () => {
            window.open(course.feishuLink, '_blank');
        });

        card.innerHTML = `
            <div class="course-tip">${course.tip}</div>
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <div class="course-meta">
                <span class="update-time">最后更新：${course.lastUpdate}</span>
                <span class="course-type">${course.type === 'general' ? '通识课程' : '专业课程'}</span>
            </div>
            <div class="course-links">
                <a href="${course.feishuLink}" target="_blank" class="course-link" onclick="event.stopPropagation();">
                    <i class="fas fa-book"></i> 查看资料
                </a>
                <a href="${course.agentLink}" target="_blank" class="course-link" onclick="event.stopPropagation();">
                    <i class="fas fa-book"></i> 学科智能体
                </a>
            </div>
        `;
        return card;
    }

    // 将渲染函数暴露给全局，供搜索功能使用
    window.renderCourses = renderCourses;
}

// 初始化搜索和筛选功能
function initializeSearch() {
    const searchInput = document.getElementById('courseSearch');
    const filterSelect = document.getElementById('courseFilter');

    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterType = filterSelect.value;

        const filteredCourses = courseData.filter(course => {
            const matchesSearch = course.name.toLowerCase().includes(searchTerm) ||
                                course.description.toLowerCase().includes(searchTerm);
            const matchesType = filterType === 'all' || course.type === filterType;
            return matchesSearch && matchesType;
        });

        window.renderCourses(filteredCourses);
    }

    // 添加输入事件监听
    searchInput.addEventListener('input', filterCourses);
    filterSelect.addEventListener('change', filterCourses);
}

// 初始化返回顶部按钮
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 初始化滚动动画
function initializeScrollAnimation() {
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 导航栏高亮当前section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
