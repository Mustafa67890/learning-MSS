/**
 * ============================================
 * GAMIFICATION ENGINE
 * ============================================
 * Handles points, badges, levels, and leaderboard
 */

const GameificationEngine = {
    /**
     * Get all available badges
     */
    getAllBadges() {
        return [
            // Environmental Awareness Badges
            {
                id: 'eco_warrior',
                name: 'Eco Warrior',
                icon: '🌱',
                description: 'Completed Day 1: Environmental Awareness',
                condition: (userId) => StorageManager.hasPassedQuiz(userId, 'quiz1_day1'),
                points: 25
            },
            {
                id: 'bio_explorer',
                name: 'Biodiversity Explorer',
                icon: '🦋',
                description: 'Completed Day 2: Biodiversity & Ecosystems',
                condition: (userId) => StorageManager.hasPassedQuiz(userId, 'quiz2_day2'),
                points: 25
            },
            {
                id: 'climate_champion',
                name: 'Climate Champion',
                icon: '❄️',
                description: 'Completed Day 3: Climate Change Solutions',
                condition: (userId) => StorageManager.hasPassedQuiz(userId, 'quiz3_day3'),
                points: 25
            },
            {
                id: 'sustainability_star',
                name: 'Sustainability Star',
                icon: '⭐',
                description: 'Completed Day 4: Sustainable Living',
                condition: (userId) => StorageManager.hasPassedQuiz(userId, 'quiz4_day4'),
                points: 25
            },
            {
                id: 'activism_advocate',
                name: 'Activism Advocate',
                icon: '✊',
                description: 'Completed Day 5: Environmental Activism',
                condition: (userId) => StorageManager.hasPassedQuiz(userId, 'quiz5_day5'),
                points: 25
            },

            // Quiz Badges
            {
                id: 'quiz_master',
                name: 'Quiz Master',
                icon: '📚',
                description: 'Passed all 5 course quizzes',
                condition: (userId) => {
                    const quizzes = ['quiz1_day1', 'quiz2_day2', 'quiz3_day3', 'quiz4_day4', 'quiz5_day5'];
                    return quizzes.every(quiz => StorageManager.hasPassedQuiz(userId, quiz));
                },
                points: 100
            },
            {
                id: 'perfect_score',
                name: 'Perfect Score',
                icon: '💯',
                description: 'Scored 100% on a quiz',
                condition: (userId) => {
                    const results = StorageManager.getQuizResults(userId);
                    return results.some(r => r.percentage === 100);
                },
                points: 50
            },

            // Assignment Badges
            {
                id: 'assignment_artist',
                name: 'Assignment Artist',
                icon: '🎨',
                description: 'Completed all 5 assignments',
                condition: (userId) => {
                    const progress = StorageManager.getProgress(userId);
                    return progress && progress.assignmentsSubmitted.length === 5;
                },
                points: 75
            },

            // Forum Badges
            {
                id: 'discussion_leader',
                name: 'Discussion Leader',
                icon: '💬',
                description: 'Posted 5 times in the forum',
                condition: (userId) => {
                    const progress = StorageManager.getProgress(userId);
                    return progress && progress.forumPostsCount >= 5;
                },
                points: 30
            },
            {
                id: 'community_voice',
                name: 'Community Voice',
                icon: '🗣️',
                description: 'Posted 10 times in the forum',
                condition: (userId) => {
                    const progress = StorageManager.getProgress(userId);
                    return progress && progress.forumPostsCount >= 10;
                },
                points: 50
            },

            // Daily Challenge Badges
            {
                id: 'daily_doer',
                name: 'Daily Doer',
                icon: '✅',
                description: 'Complete 3 daily challenges',
                condition: (userId) => {
                    // This would need additional tracking
                    return false; // Placeholder
                },
                points: 40
            },

            // Engagement Badges
            {
                id: 'learning_junkie',
                name: 'Learning Junkie',
                icon: '🤓',
                description: 'Earned 500 total points',
                condition: (userId) => {
                    const gamification = StorageManager.getGamification(userId);
                    return gamification && gamification.totalPoints >= 500;
                },
                points: 100
            },
            {
                id: 'super_achiever',
                name: 'Super Achiever',
                icon: '🏆',
                description: 'Earned 1000 total points',
                condition: (userId) => {
                    const gamification = StorageManager.getGamification(userId);
                    return gamification && gamification.totalPoints >= 1000;
                },
                points: 200
            },

            // Completion Badge
            {
                id: 'course_complete',
                name: 'Course Complete',
                icon: '🎓',
                description: 'Completed the entire environmental course',
                condition: (userId) => {
                    const progress = StorageManager.getProgress(userId);
                    return progress && 
                           progress.lessonsCompleted.length === 5 &&
                           progress.quizzesTaken.length === 5 &&
                           progress.assignmentsSubmitted.length === 5;
                },
                points: 500
            }
        ];
    },

    /**
     * Get badge by ID
     */
    getBadge(badgeId) {
        return this.getAllBadges().find(b => b.id === badgeId);
    },

    /**
     * Check all badge conditions and award if earned
     */
    checkAllBadges(userId) {
        const badges = this.getAllBadges();
        const awarded = [];

        badges.forEach(badge => {
            if (!StorageManager.hasBadge(userId, badge.id) && badge.condition(userId)) {
                StorageManager.awardBadge(
                    userId,
                    badge.id,
                    badge.name,
                    badge.icon,
                    badge.description
                );
                awarded.push(badge);
                StorageManager.addPoints(userId, badge.points, `Badge Earned: ${badge.name}`);
            }
        });

        return awarded;
    },

    /**
     * Check quiz-specific badges
     */
    checkQuizBadges(userId) {
        this.checkAllBadges(userId);
        const awardedBadges = this.checkAllBadges(userId);
        
        awardedBadges.forEach(badge => {
            this.showBadgeNotification(badge);
        });
    },

    /**
     * Show badge unlock notification
     */
    showBadgeNotification(badge) {
        const modalElement = document.getElementById('badgeModal');
        if (!modalElement) return;

        document.getElementById('badgeTitle').textContent = `🎉 ${badge.name}!`;
        document.getElementById('badgeDesc').textContent = badge.description;

        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    },

    /**
     * Get level based on points
     */
    getLevelInfo(points) {
        const levels = [
            { level: 1, name: 'Novice', minPoints: 0, maxPoints: 99 },
            { level: 2, name: 'Apprentice', minPoints: 100, maxPoints: 249 },
            { level: 3, name: 'Practitioner', minPoints: 250, maxPoints: 499 },
            { level: 4, name: 'Expert', minPoints: 500, maxPoints: 999 },
            { level: 5, name: 'Master', minPoints: 1000, maxPoints: Infinity }
        ];

        return levels.find(l => points >= l.minPoints && points <= l.maxPoints);
    },

    /**
     * Calculate percentage to next level
     */
    getProgressToNextLevel(userId) {
        const gamification = StorageManager.getGamification(userId);
        if (!gamification) return 0;

        const currentLevel = gamification.currentLevel;
        const nextLevelThreshold = currentLevel * 100;
        const prevLevelThreshold = (currentLevel - 1) * 100;
        
        const pointsInCurrentLevel = gamification.totalPoints - prevLevelThreshold;
        const pointsNeededForLevel = nextLevelThreshold - prevLevelThreshold;

        return Math.min(Math.round((pointsInCurrentLevel / pointsNeededForLevel) * 100), 100);
    }
};

// ============================================
// GAMIFICATION RENDERING
// ============================================

const GamificationRenderer = {
    /**
     * Render badges section
     */
    renderBadges(containerId, userId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const userBadges = StorageManager.getBadges(userId);
        const allBadges = GameificationEngine.getAllBadges();

        let html = '<div class="badge-container d-flex flex-wrap justify-content-center gap-3">';

        allBadges.forEach(badge => {
            const isUnlocked = userBadges.some(b => b.id === badge.id);
            const unlockedClass = isUnlocked ? '' : 'locked';

            html += `
                <div class="badge ${unlockedClass}" title="${badge.description}">
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-name">${badge.name}</div>
                    <div class="badge-desc">${isUnlocked ? 'Earned' : 'Locked'}</div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    },

    /**
     * Render level information
     */
    renderLevelInfo(containerId, userId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const gamification = StorageManager.getGamification(userId);
        const levelInfo = GameificationEngine.getLevelInfo(gamification.totalPoints);
        const progressPercent = GameificationEngine.getProgressToNextLevel(userId);

        let html = `
            <div class="text-center mb-4">
                <h3 class="display-4">${levelInfo.name}</h3>
                <p class="text-muted">Level ${levelInfo.level}</p>
            </div>

            <div class="mb-4">
                <p class="small text-muted mb-2">Progress to Next Level</p>
                <div class="progress" style="height: 25px;">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${progressPercent}%">
                        <small class="fw-bold">${progressPercent}%</small>
                    </div>
                </div>
                <p class="small text-muted mt-2">${gamification.totalPoints} total points</p>
            </div>

            <div class="alert alert-info">
                <h6 class="mb-2">Level Achievements</h6>
                <ul class="small mb-0 ps-3">
                    <li>Novice: 0 points</li>
                    <li>Apprentice: 100 points</li>
                    <li>Practitioner: 250 points</li>
                    <li>Expert: 500 points</li>
                    <li>Master: 1000 points</li>
                </ul>
            </div>
        `;

        container.innerHTML = html;
    },

    /**
     * Render leaderboard
     */
    renderLeaderboard(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const leaderboard = StorageManager.getLeaderboard();

        if (leaderboard.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">No scores yet</p>';
            return;
        }

        let html = '';
        leaderboard.forEach((user, index) => {
            const medals = ['🥇', '🥈', '🥉'];
            const medal = index < 3 ? medals[index] : `${index + 1}.`;

            html += `
                <div class="leaderboard-row">
                    <div class="leaderboard-rank ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}">${medal}</div>
                    <div class="leaderboard-name">${user.name}</div>
                    <div>
                        <small class="text-muted me-3">Level ${user.level}</small>
                        <small class="badge bg-warning text-dark me-2">${user.badges} badges</small>
                    </div>
                    <div class="leaderboard-points">${user.points} pts</div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    /**
     * Update dashboard gamification widgets
     */
    updateDashboardGamification(userId) {
        const gamification = StorageManager.getGamification(userId);
        const levelInfo = GameificationEngine.getLevelInfo(gamification.totalPoints);
        const badges = StorageManager.getBadges(userId);

        document.getElementById('totalPoints').textContent = gamification.totalPoints;
        document.getElementById('currentLevel').textContent = levelInfo.name;
        document.getElementById('badgeCount').textContent = badges.length;
    }
};
