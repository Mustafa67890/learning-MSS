/**
 * ============================================
 * MAIN APPLICATION CONTROLLER
 * ============================================
 * Orchestrates all LMS features and page navigation
 */

let AppState = {
    currentUser: null,
    currentSection: 'dashboard',

    init() {
        // Check if user is logged in
        const user = StorageManager.getCurrentUser();
        if (!user) {
            // Show login page
            this.showLoginPage();
        } else {
            // Show dashboard
            this.showDashboard();
        }
    },

    showLoginPage() {
        document.body.style.display = 'block';
        const indexPage = document.querySelector('.login-page');
        if (indexPage) {
            indexPage.style.display = 'flex';
        }
    },

    showDashboard() {
        const user = StorageManager.getCurrentUser();
        if (!user) return;

        this.currentUser = user;
        this.updateDashboard(user.id);
    },

    updateDashboard(userId) {
        // Update all dashboard elements
        this.updateUserGreeting(userId);
        this.updateProgressBar(userId);
        this.updateStats(userId);
        if (typeof GameificationEngine !== 'undefined') {
            GameificationEngine.checkAllBadges(userId);
        }
        if (typeof GamificationRenderer !== 'undefined' && GamificationRenderer.updateDashboardGamification) {
            GamificationRenderer.updateDashboardGamification(userId);
        }
    },

    updateUserGreeting(userId) {
        const user = StorageManager.getUser(userId);
        const greetingEl = document.getElementById('userGreeting');
        if (greetingEl && user) {
            greetingEl.textContent = `Welcome back, ${user.studentName}!`;
        }
    },

    updateProgressBar(userId) {
        const progress = StorageManager.getProgress(userId);
        const progressPercent = StorageManager.getOverallProgress(userId);

        const overallProgressEl = document.getElementById('overallProgress');
        if (overallProgressEl) {
            overallProgressEl.textContent = progressPercent + '%';
        }

        const progressBar = document.getElementById('courseProgressBar');
        if (progressBar) {
            progressBar.style.width = progressPercent + '%';
        }

        const progressTextEl = document.getElementById('progressText');
        if (progressTextEl) {
            progressTextEl.textContent = `${progress.lessonsCompleted.length} of 5 days completed`;
        }
    },

    updateStats(userId) {
        const gamification = StorageManager.getGamification(userId);
        const progress = StorageManager.getProgress(userId);

        const pointsEl = document.getElementById('totalPoints');
        if (pointsEl) pointsEl.textContent = gamification.totalPoints;

        const badgeEl = document.getElementById('badgeCount');
        if (badgeEl) badgeEl.textContent = StorageManager.getBadges(userId).length;

        if (typeof GameificationEngine !== 'undefined') {
            const levelInfo = GameificationEngine.getLevelInfo(gamification.totalPoints);
            const levelEl = document.getElementById('currentLevel');
            if (levelEl) levelEl.textContent = levelInfo.name;
        }

        // Update daily challenge
        this.updateDailyChallenge(userId);
    },

    updateDailyChallenge(userId) {
        const challenge = StorageManager.getDailyChallenge(userId);
        const titleEl = document.getElementById('dailyChallenge');
        const statusEl = document.getElementById('challengeStatus');

        if (!challenge || !challenge.challenge) return;

        if (titleEl) {
            titleEl.innerHTML = `
                <strong>${challenge.challenge.title}</strong><br>
                <small>${challenge.challenge.description}</small>
            `;
        }

        if (statusEl) {
            if (challenge.completed) {
                statusEl.innerHTML = '<span class="badge bg-success">Completed Today!</span>';
            } else {
                statusEl.innerHTML = '<span class="badge bg-warning">Not Completed</span>';
            }
        }
    }
};

// ============================================
// PAGE NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize storage
    StorageManager.init();

    // Check login status
    const user = StorageManager.getCurrentUser();
    const isLoginPage = document.body.classList.contains('login-page');
    const isDashboardPage = document.body.classList.contains('dashboard-page');

    if (user) {
        if (isLoginPage) {
            // Already logged in, move to dashboard
            window.location.href = 'dashboard.html';
        } else if (isDashboardPage) {
            // Setup dashboard
            setupDashboard(user.id);
        }
    } else {
        if (isDashboardPage) {
            // Not logged in, move to login
            window.location.href = 'index.html';
        } else if (isLoginPage) {
            // Show login form
            setupLoginForm();
        }
    }

    // Register service worker for basic offline caching (optional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').then(() => {
            console.log('Service worker registered');
        }).catch(() => {
            // Ignore registration failures
        });
    }
});

/**
 * Setup login form
 */
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const demoBtn = document.getElementById('demoBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const studentName = document.getElementById('studentName').value.trim();
            const studentID = document.getElementById('studentID').value.trim();
            const gradeLevel = document.getElementById('gradeLevel').value;

            if (!studentName || !studentID || !gradeLevel) {
                alert('Please fill in all fields');
                return;
            }

            // Register or get existing user
            const result = StorageManager.registerUser({
                studentName,
                studentID,
                gradeLevel
            });

            if (result.success) {
                StorageManager.setCurrentUser(result.user.id);
                window.location.href = 'dashboard.html';
            } else {
                // User exists, just log them in
                const existingUser = StorageManager.getUser(studentID);
                if (existingUser) {
                    StorageManager.setCurrentUser(existingUser.id);
                    window.location.href = 'dashboard.html';
                }
            }
        });
    }

    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            const result = StorageManager.registerUser({
                studentName: 'Demo Student',
                studentID: 'DEMO001',
                gradeLevel: 'Grade 10'
            });

            if (result.success) {
                StorageManager.setCurrentUser(result.user.id);
                window.location.href = 'dashboard.html';
            }
        });
    }
}

/**
 * Setup dashboard after login
 */
function setupDashboard(userId) {
    const user = StorageManager.getUser(userId);

    if (!user) return;

    AppState.currentUser = user;
    AppState.updateDashboard(userId);

    // Setup navigation
    setupNavigation(userId);

    // Setup logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            StorageManager.logout();
            window.location.href = 'index.html';
        });
    }

    // Setup quick links
    setupQuickLinks(userId);

    // Setup daily challenge
    setupDailyChallenge(userId);

    // Setup sidebar toggle
    setupSidebarToggle();

    // Initial render
    renderSection('dashboard', userId);
}

/**
 * Handle sidebar collapse/expand
 */
function setupSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebarCollapse');

    if (!sidebar || !toggleBtn) return;

    // Load persisted state
    const isCollapsed = localStorage.getItem('lms_sidebar_collapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
    }

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const nowCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('lms_sidebar_collapsed', nowCollapsed);
    });
}

/**
 * Setup sidebar navigation
 */
function setupNavigation(userId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.currentTarget.dataset.section;
            if (section) {
                e.preventDefault();
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.currentTarget.classList.add('active');
                renderSection(section, userId);
            }
        });
    });
}

/**
 * Render different sections
 */
function renderSection(section, userId) {
    AppState.currentSection = section;

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        lessons: 'Lessons',
        quiz: 'Quizzes',
        assignments: 'Assignments',
        forum: 'Discussion Forum',
        gamification: 'Achievements',
        profile: 'My Profile'
    };

    document.getElementById('pageTitle').textContent = titles[section] || 'Dashboard';

    switch (section) {
        case 'dashboard':
            document.getElementById('dashboard-section').style.display = 'block';
            break;

        case 'lessons':
            document.getElementById('lessons-section').style.display = 'block';
            LessonRenderer.renderLessonList('lessonsList', userId);
            break;

        case 'quiz':
            document.getElementById('quiz-section').style.display = 'block';
            QuizRenderer.renderQuizList('quizList', userId);
            break;

        case 'assignments':
            document.getElementById('assignments-section').style.display = 'block';
            AssignmentRenderer.renderAssignmentList('assignmentsList', userId);
            break;

        case 'forum':
            document.getElementById('forum-section').style.display = 'block';
            ForumRenderer.renderForum('forumPosts', userId);
            ForumRenderer.setupForumForm(userId);
            break;

        case 'gamification':
            document.getElementById('gamification-section').style.display = 'block';
            GamificationRenderer.renderBadges('badgesList', userId);
            GamificationRenderer.renderLevelInfo('levelInfo', userId);
            GamificationRenderer.renderLeaderboard('leaderboard');
            break;

        case 'profile':
            document.getElementById('profile-section').style.display = 'block';
            renderProfile(userId);
            break;
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

/**
 * Render user profile section
 */
function renderProfile(userId) {
    const user = StorageManager.getUser(userId);
    const progress = StorageManager.getProgress(userId);
    const gamification = StorageManager.getGamification(userId);
    const levelInfo = GameificationEngine.getLevelInfo(gamification.totalPoints);

    let profileHtml = `
        <div class="row">
            <div class="col-md-4 text-center mb-4">
                <div style="width: 120px; height: 120px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px;">
                    ${user.studentName.charAt(0).toUpperCase()}
                </div>
                <h4 class="mt-3">${user.studentName}</h4>
                <p class="text-muted">${user.studentID}</p>
            </div>
            <div class="col-md-8">
                <h6>Student Details</h6>
                <table class="table table-sm">
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>${user.studentName}</td>
                    </tr>
                    <tr>
                        <td><strong>Student ID:</strong></td>
                        <td>${user.studentID}</td>
                    </tr>
                    <tr>
                        <td><strong>Grade:</strong></td>
                        <td>${user.gradeLevel}</td>
                    </tr>
                    <tr>
                        <td><strong>Joined:</strong></td>
                        <td>${new Date(user.registeredDate).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td><strong>Last Access:</strong></td>
                        <td>${new Date(user.lastAccess).toLocaleDateString()}</td>
                    </tr>
                </table>
            </div>
        </div>

        <hr class="my-4">

        <div class="row">
            <div class="col-md-6">
                <h6>Learning Progress</h6>
                <table class="table table-sm">
                    <tr>
                        <td>Lessons Completed:</td>
                        <td><strong>${progress.lessonsCompleted.length}/5</strong></td>
                    </tr>
                    <tr>
                        <td>Quizzes Passed:</td>
                        <td><strong>${progress.quizzesTaken.length}/5</strong></td>
                    </tr>
                    <tr>
                        <td>Assignments Submitted:</td>
                        <td><strong>${progress.assignmentsSubmitted.length}/5</strong></td>
                    </tr>
                    <tr>
                        <td>Forum Posts:</td>
                        <td><strong>${progress.forumPostsCount}</strong></td>
                    </tr>
                </table>
            </div>

            <div class="col-md-6">
                <h6>Achievements</h6>
                <table class="table table-sm">
                    <tr>
                        <td>Current Level:</td>
                        <td><strong>${levelInfo.name}</strong></td>
                    </tr>
                    <tr>
                        <td>Total Points:</td>
                        <td><strong>${gamification.totalPoints}</strong></td>
                    </tr>
                    <tr>
                        <td>Badges Earned:</td>
                        <td><strong>${StorageManager.getBadges(userId).length}</strong></td>
                    </tr>
                    <tr>
                        <td>Overall Progress:</td>
                        <td><strong>${StorageManager.getOverallProgress(userId)}%</strong></td>
                    </tr>
                </table>
            </div>
        </div>
    `;

    document.getElementById('profileInfo').innerHTML = profileHtml;

    let statsHtml = `
        <div class="progress mb-3">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${StorageManager.getOverallProgress(userId)}%"></div>
        </div>
        <p class="small text-muted mb-3">Overall Course Completion: ${StorageManager.getOverallProgress(userId)}%</p>

        <h6 class="mt-4">Top 3 Badges</h6>
        <div class="d-flex gap-2 mb-3">
    `;

    const badges = StorageManager.getBadges(userId);
    badges.slice(0, 3).forEach(badge => {
        statsHtml += `<div class="badge badge-icon" title="${badge.description}">${badge.icon}</div>`;
    });

    statsHtml += `</div>`;

    if (badges.length === 0) {
        statsHtml += '<p class="text-muted small">Complete lessons and activities to earn badges!</p>';
    }

    document.getElementById('statsInfo').innerHTML = statsHtml;
}

/**
 * Setup quick links
 */
function setupQuickLinks(userId) {
    document.querySelectorAll('.quick-link').forEach(link => {
        link.addEventListener('click', () => {
            const section = link.dataset.section;
            renderSection(section, userId);
            document.querySelector(`[data-section="${section}"]`).click();
        });
        // keyboard activation for accessibility (Enter / Space)
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });
}

/**
 * Setup daily challenge
 */
function setupDailyChallenge(userId) {
    const completeBtn = document.getElementById('completeChallenge');
    if (completeBtn) {
        completeBtn.addEventListener('click', () => {
            const result = StorageManager.completeDailyChallenge(userId);
            if (result) {
                showNotification('success', 'Daily challenge completed! +10 points');
                AppState.updateDashboard(userId);
            } else {
                showNotification('info', 'You already completed today\'s challenge!');
            }
        });
    }
}

/**
 * Show notification
 */
function showNotification(type, message) {
    const notificationArea = document.getElementById('notificationArea');
    if (!notificationArea) return;

    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    notificationArea.appendChild(notif);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notif.remove();
    }, 4000);
}

// ============================================
// BADGE CHECK ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof StorageManager !== 'undefined' && typeof GameificationEngine !== 'undefined') {
            const user = StorageManager.getCurrentUser();
            if (user) {
                const awardedBadges = GameificationEngine.checkAllBadges(user.id);
                awardedBadges.forEach(badge => {
                    GameificationEngine.showBadgeNotification(badge);
                });
            }
        }
    }, 1000);
});
