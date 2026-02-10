/**
 * ============================================
 * LOCAL STORAGE MANAGEMENT SYSTEM
 * ============================================
 * Handles all data persistence for the LMS
 * Stores: User data, progress, scores, submissions, forum posts
 */

const StorageManager = {
    // Storage keys
    KEYS: {
        CURRENT_USER: 'lms_current_user',
        USERS: 'lms_users',
        USER_PROGRESS: 'lms_user_progress_',
        QUIZ_RESULTS: 'lms_quiz_results_',
        ASSIGNMENTS: 'lms_assignments_',
        FORUM_POSTS: 'lms_forum_posts',
        GAMIFICATION: 'lms_gamification_',
        DAILY_CHALLENGE: 'lms_daily_challenge_',
        FACE_TO_FACE: 'lms_face_to_face_'
    },

    /**
     * Initialize localStorage with default data if needed
     */
    init() {
        if (!localStorage.getItem(this.KEYS.USERS)) {
            localStorage.setItem(this.KEYS.USERS, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.FORUM_POSTS)) {
            // Seed forum with a couple of starter posts to encourage discussion
            const seedPosts = [
                {
                    id: Date.now() - 200000,
                    userId: 0,
                    author: 'Instructor (Ms. Dlamini)',
                    content: 'Welcome to the course! Please introduce yourselves and share one local environmental concern you care about.',
                    timestamp: new Date(Date.now() - 200000).toISOString(),
                    replies: [],
                    likes: 0,
                    flagged: false
                },
                {
                    id: Date.now() - 100000,
                    userId: 0,
                    author: 'Eco Club',
                    content: 'Has anyone started a community cleanup recently? Share photos and tips.',
                    timestamp: new Date(Date.now() - 100000).toISOString(),
                    replies: [],
                    likes: 0,
                    flagged: false
                }
            ];
            localStorage.setItem(this.KEYS.FORUM_POSTS, JSON.stringify(seedPosts));
        }
    },

    // ============================================
    // USER MANAGEMENT
    // ============================================

    /**
     * Register new user
     */
    registerUser(userData) {
        const users = this.getAllUsers();

        // Check if user already exists
        if (users.some(u => u.studentID === userData.studentID)) {
            return { success: false, message: 'Student ID already exists' };
        }

        const newUser = {
            id: Date.now(),
            studentName: userData.studentName,
            studentID: userData.studentID,
            gradeLevel: userData.gradeLevel,
            registeredDate: new Date().toISOString(),
            lastAccess: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));

        // Initialize user data
        this.initializeUserData(newUser.id);

        return { success: true, user: newUser };
    },

    /**
     * Get user by ID or student ID
     */
    getUser(identifier) {
        const users = this.getAllUsers();
        return users.find(u => u.id === identifier || u.studentID === identifier);
    },

    /**
     * Get all users
     */
    getAllUsers() {
        const data = localStorage.getItem(this.KEYS.USERS);
        return data ? JSON.parse(data) : [];
    },

    /**
     * Update last access time
     */
    updateLastAccess(userId) {
        const users = this.getAllUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            user.lastAccess = new Date().toISOString();
            localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
        }
    },

    /**
     * Set current logged-in user
     */
    setCurrentUser(userId) {
        localStorage.setItem(this.KEYS.CURRENT_USER, userId.toString());
        this.updateLastAccess(userId);
    },

    /**
     * Get current logged-in user
     */
    getCurrentUser() {
        const userId = localStorage.getItem(this.KEYS.CURRENT_USER);
        return userId ? this.getUser(parseInt(userId)) : null;
    },

    /**
     * Logout current user
     */
    logout() {
        localStorage.removeItem(this.KEYS.CURRENT_USER);
    },

    // ============================================
    // PROGRESS TRACKING
    // ============================================

    /**
     * Initialize user progress on registration
     */
    initializeUserData(userId) {
        const progressKey = this.KEYS.USER_PROGRESS + userId;
        const gamificationKey = this.KEYS.GAMIFICATION + userId;
        const dailyChallengeKey = this.KEYS.DAILY_CHALLENGE + userId;
        const faceToFaceKey = this.KEYS.FACE_TO_FACE + userId;

        // Initialize progress
        const progress = {
            lessonsCompleted: [],
            lessonsViewed: [],
            quizzesTaken: [],
            assignmentsSubmitted: [],
            forumPostsCount: 0,
            overallProgress: 0,
            enrollmentDate: new Date().toISOString()
        };
        localStorage.setItem(progressKey, JSON.stringify(progress));

        // Initialize gamification
        const gamification = {
            totalPoints: 0,
            currentLevel: 1,
            badges: [],
            nextLevelPoints: 100,
            pointsToNextLevel: 100,
            totalXP: 0
        };
        localStorage.setItem(gamificationKey, JSON.stringify(gamification));

        // Initialize daily challenge
        const dailyChallenge = {
            todayDate: new Date().toDateString(),
            completed: false,
            challenge: null
        };
        localStorage.setItem(dailyChallengeKey, JSON.stringify(dailyChallenge));

        // Initialize face-to-face
        const faceToFace = {
            attendance: [],
            reflections: []
        };
        localStorage.setItem(faceToFaceKey, JSON.stringify(faceToFace));
    },

    /**
     * Get user progress
     */
    getProgress(userId) {
        const key = this.KEYS.USER_PROGRESS + userId;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    /**
     * Update lesson completion
     */
    completeLesson(userId, lessonId) {
        const key = this.KEYS.USER_PROGRESS + userId;
        const progress = this.getProgress(userId);

        if (progress && !progress.lessonsCompleted.includes(lessonId)) {
            progress.lessonsCompleted.push(lessonId);
            progress.overallProgress = Math.round(
                (progress.lessonsCompleted.length / 5) * 100
            );
            localStorage.setItem(key, JSON.stringify(progress));
            return true;
        }
        return false;
    },

    /**
     * Mark lesson as viewed
     */
    viewLesson(userId, lessonId) {
        const key = this.KEYS.USER_PROGRESS + userId;
        const progress = this.getProgress(userId);

        if (progress && !progress.lessonsViewed.includes(lessonId)) {
            progress.lessonsViewed.push(lessonId);
            localStorage.setItem(key, JSON.stringify(progress));
        }
    },

    /**
     * Calculate overall progress percentage
     */
    getOverallProgress(userId) {
        const progress = this.getProgress(userId);
        if (!progress) return 0;

        const lessonWeight = 0.4;
        const quizWeight = 0.3;
        const assignmentWeight = 0.2;
        const forumWeight = 0.1;

        const lessonProgress = (progress.lessonsCompleted.length / 5) * 100;
        const quizProgress = (progress.quizzesTaken.length / 5) * 100;
        const assignmentProgress = (progress.assignmentsSubmitted.length / 5) * 100;
        const forumProgress = Math.min((progress.forumPostsCount / 5) * 100, 100);

        return Math.round(
            (lessonProgress * lessonWeight) +
            (quizProgress * quizWeight) +
            (assignmentProgress * assignmentWeight) +
            (forumProgress * forumWeight)
        );
    },

    // ============================================
    // QUIZ MANAGEMENT
    // ============================================

    /**
     * Save quiz result
     */
    saveQuizResult(userId, quizId, result) {
        const key = this.KEYS.QUIZ_RESULTS + userId;
        let results = localStorage.getItem(key);
        results = results ? JSON.parse(results) : [];

        const quizResult = {
            quizId: quizId,
            score: result.score,
            totalQuestions: result.totalQuestions,
            percentage: result.percentage,
            passed: result.passed,
            attempts: result.attempts || 1,
            completedDate: new Date().toISOString(),
            answers: result.answers
        };

        const existingIndex = results.findIndex(r => r.quizId === quizId);
        if (existingIndex >= 0) {
            results[existingIndex] = quizResult;
        } else {
            results.push(quizResult);
        }

        localStorage.setItem(key, JSON.stringify(results));

        // Update progress
        const progress = this.getProgress(userId);
        if (progress && !progress.quizzesTaken.includes(quizId)) {
            progress.quizzesTaken.push(quizId);
            localStorage.setItem(this.KEYS.USER_PROGRESS + userId, JSON.stringify(progress));
        }

        return quizResult;
    },

    /**
     * Get quiz results for user
     */
    getQuizResults(userId) {
        const key = this.KEYS.QUIZ_RESULTS + userId;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },

    /**
     * Get specific quiz result
     */
    getQuizResult(userId, quizId) {
        const results = this.getQuizResults(userId);
        return results.find(r => r.quizId === quizId);
    },

    /**
     * Check if user passed quiz
     */
    hasPassedQuiz(userId, quizId) {
        const result = this.getQuizResult(userId, quizId);
        return result ? result.passed : false;
    },

    // ============================================
    // ASSIGNMENT MANAGEMENT
    // ============================================

    /**
     * Save assignment submission
     */
    saveAssignmentSubmission(userId, assignmentId, submission) {
        const key = this.KEYS.ASSIGNMENTS + userId;
        let submissions = localStorage.getItem(key);
        submissions = submissions ? JSON.parse(submissions) : [];

        const assignmentSubmission = {
            assignmentId: assignmentId,
            content: submission.content,
            submittedDate: new Date().toISOString(),
            status: 'submitted',
            feedback: ''
        };

        const existingIndex = submissions.findIndex(a => a.assignmentId === assignmentId);
        if (existingIndex >= 0) {
            submissions[existingIndex] = assignmentSubmission;
        } else {
            submissions.push(assignmentSubmission);
        }

        localStorage.setItem(key, JSON.stringify(submissions));

        // Update progress
        const progress = this.getProgress(userId);
        if (progress && !progress.assignmentsSubmitted.includes(assignmentId)) {
            progress.assignmentsSubmitted.push(assignmentId);
            localStorage.setItem(this.KEYS.USER_PROGRESS + userId, JSON.stringify(progress));
        }

        return assignmentSubmission;
    },

    /**
     * Get assignments for user
     */
    getAssignments(userId) {
        const key = this.KEYS.ASSIGNMENTS + userId;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },

    /**
     * Get specific assignment
     */
    getAssignment(userId, assignmentId) {
        const assignments = this.getAssignments(userId);
        return assignments.find(a => a.assignmentId === assignmentId);
    },

    /**
     * Check if assignment submitted
     */
    isAssignmentSubmitted(userId, assignmentId) {
        const assignment = this.getAssignment(userId, assignmentId);
        return assignment ? assignment.status === 'submitted' : false;
    },

    // ============================================
    // FORUM MANAGEMENT
    // ============================================

    /**
     * Add forum post
     */
    addForumPost(userId, postData) {
        let posts = JSON.parse(localStorage.getItem(this.KEYS.FORUM_POSTS) || '[]');

        const user = userId === 0 ? { studentName: 'Namkanda' } : this.getUser(userId);
        const post = {
            id: Date.now(),
            userId: userId,
            author: user.studentName,
            content: postData.content,
            timestamp: new Date().toISOString(),
            replies: [],
            likes: 0,
            isAI: userId === 0
        };

        posts.push(post);
        localStorage.setItem(this.KEYS.FORUM_POSTS, JSON.stringify(posts));

        // Update progress if not AI
        if (userId !== 0) {
            const progress = this.getProgress(userId);
            if (progress) {
                progress.forumPostsCount = (progress.forumPostsCount || 0) + 1;
                localStorage.setItem(this.KEYS.USER_PROGRESS + userId, JSON.stringify(progress));
            }
        }

        return post;
    },

    /**
     * Add reply to forum post
     */
    addReply(postId, userId, replyContent) {
        let posts = JSON.parse(localStorage.getItem(this.KEYS.FORUM_POSTS) || '[]');
        const user = userId === 0 ? { studentName: 'Namkanda' } : this.getUser(userId);

        const post = posts.find(p => p.id === postId);
        if (post) {
            const reply = {
                id: Date.now(),
                userId: userId,
                author: user.studentName,
                content: replyContent,
                timestamp: new Date().toISOString(),
                isAI: userId === 0
            };
            post.replies.push(reply);
            localStorage.setItem(this.KEYS.FORUM_POSTS, JSON.stringify(posts));

            // Update progress if not AI
            if (userId !== 0) {
                const progress = this.getProgress(userId);
                if (progress) {
                    progress.forumPostsCount = (progress.forumPostsCount || 0) + 1;
                    localStorage.setItem(this.KEYS.USER_PROGRESS + userId, JSON.stringify(progress));
                }
            }

            return reply;
        }
        return null;
    },

    /**
     * Get all forum posts
     */
    getForumPosts() {
        const data = localStorage.getItem(this.KEYS.FORUM_POSTS);
        return data ? JSON.parse(data) : [];
    },

    /**
     * Get forum post by ID
     */
    getForumPost(postId) {
        const posts = this.getForumPosts();
        return posts.find(p => p.id === postId);
    },

    // ============================================
    // GAMIFICATION
    // ============================================

    /**
     * Get gamification data
     */
    getGamification(userId) {
        const key = this.KEYS.GAMIFICATION + userId;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    /**
     * Add points to user
     */
    addPoints(userId, points, reason) {
        const key = this.KEYS.GAMIFICATION + userId;
        const gamification = this.getGamification(userId);

        if (gamification) {
            gamification.totalPoints += points;
            gamification.totalXP += points;
            gamification.pointsToNextLevel -= points;

            // Check for level up
            if (gamification.pointsToNextLevel <= 0) {
                gamification.currentLevel += 1;
                gamification.pointsToNextLevel = gamification.nextLevelPoints;
            }

            localStorage.setItem(key, JSON.stringify(gamification));
            return true;
        }
        return false;
    },

    /**
     * Award badge to user
     */
    awardBadge(userId, badgeId, badgeName, badgeIcon, badgeDesc) {
        const key = this.KEYS.GAMIFICATION + userId;
        const gamification = this.getGamification(userId);

        if (gamification) {
            // Check if badge already exists
            if (!gamification.badges.some(b => b.id === badgeId)) {
                const badge = {
                    id: badgeId,
                    name: badgeName,
                    icon: badgeIcon,
                    description: badgeDesc,
                    unlockedDate: new Date().toISOString()
                };
                gamification.badges.push(badge);
                localStorage.setItem(key, JSON.stringify(gamification));
                return true;
            }
        }
        return false;
    },

    /**
     * Get user badges
     */
    getBadges(userId) {
        const gamification = this.getGamification(userId);
        return gamification ? gamification.badges : [];
    },

    /**
     * Check if user has badge
     */
    hasBadge(userId, badgeId) {
        const badges = this.getBadges(userId);
        return badges.some(b => b.id === badgeId);
    },

    /**
     * Get leaderboard (top 10 users)
     */
    getLeaderboard() {
        const users = this.getAllUsers();
        const leaderboard = users
            .map(user => {
                const gamification = this.getGamification(user.id);
                return {
                    id: user.id,
                    name: user.studentName,
                    points: gamification ? gamification.totalPoints : 0,
                    level: gamification ? gamification.currentLevel : 1,
                    badges: gamification ? gamification.badges.length : 0
                };
            })
            .sort((a, b) => b.points - a.points)
            .slice(0, 10);

        return leaderboard;
    },

    /**
     * Get user rank
     */
    getUserRank(userId) {
        const leaderboard = this.getLeaderboard();
        return leaderboard.findIndex(u => u.id === userId) + 1;
    },

    // ============================================
    // DAILY CHALLENGES
    // ============================================

    /**
     * Get or create daily challenge
     */
    getDailyChallenge(userId) {
        const key = this.KEYS.DAILY_CHALLENGE + userId;
        let challenge = localStorage.getItem(key);
        challenge = challenge ? JSON.parse(challenge) : null;

        const today = new Date().toDateString();

        // If challenge is from a different day, create new one
        if (!challenge || challenge.todayDate !== today) {
            challenge = {
                todayDate: today,
                completed: false,
                challenge: this.getRandomChallenge()
            };
            localStorage.setItem(key, JSON.stringify(challenge));
        }

        return challenge;
    },

    /**
     * Complete daily challenge
     */
    completeDailyChallenge(userId) {
        const key = this.KEYS.DAILY_CHALLENGE + userId;
        const challenge = this.getDailyChallenge(userId);

        if (challenge && !challenge.completed) {
            challenge.completed = true;
            localStorage.setItem(key, JSON.stringify(challenge));

            // Award points
            this.addPoints(userId, 10, 'Daily Challenge Completed');

            return true;
        }
        return false;
    },

    /**
     * Get random challenge
     */
    getRandomChallenge() {
        const challenges = [
            {
                id: 1,
                title: 'Clean Your Space',
                description: 'Spend 15 minutes cleaning your study area or bedroom'
            },
            {
                id: 2,
                title: 'Reduce Waste',
                description: 'Use reusable containers or bags instead of plastic for 24 hours'
            },
            {
                id: 3,
                title: 'Plant Something',
                description: 'Plant a seed, water a plant, or care for a garden'
            },
            {
                id: 4,
                title: 'Save Energy',
                description: 'Turn off lights in unused rooms for the entire day'
            },
            {
                id: 5,
                title: 'Teach Others',
                description: 'Share one environmental tip with a friend or family member'
            },
            {
                id: 6,
                title: 'Collect Litter',
                description: 'Pick up at least 10 pieces of litter from your surroundings'
            },
            {
                id: 7,
                title: 'Water Saver',
                description: 'Take a shorter shower (5 min max) to save water'
            },
            {
                id: 8,
                title: 'Eco-Friendly Transport',
                description: 'Walk, bike, or use public transport instead of a car'
            }
        ];

        return challenges[Math.floor(Math.random() * challenges.length)];
    },

    // ============================================
    // FACE-TO-FACE ACTIVITIES
    // ============================================

    /**
     * Record face-to-face attendance
     */
    recordAttendance(userId, activityId, attended) {
        const key = this.KEYS.FACE_TO_FACE + userId;
        let faceToFace = localStorage.getItem(key);
        faceToFace = faceToFace ? JSON.parse(faceToFace) : { attendance: [], reflections: [] };

        const attendance = {
            activityId: activityId,
            attended: attended,
            date: new Date().toISOString()
        };

        const existingIndex = faceToFace.attendance.findIndex(a => a.activityId === activityId);
        if (existingIndex >= 0) {
            faceToFace.attendance[existingIndex] = attendance;
        } else {
            faceToFace.attendance.push(attendance);
        }

        localStorage.setItem(key, JSON.stringify(faceToFace));
        return true;
    },

    /**
     * Save face-to-face reflection
     */
    saveReflection(userId, activityId, reflection) {
        const key = this.KEYS.FACE_TO_FACE + userId;
        let faceToFace = localStorage.getItem(key);
        faceToFace = faceToFace ? JSON.parse(faceToFace) : { attendance: [], reflections: [] };

        const reflectionEntry = {
            activityId: activityId,
            content: reflection,
            date: new Date().toISOString()
        };

        const existingIndex = faceToFace.reflections.findIndex(r => r.activityId === activityId);
        if (existingIndex >= 0) {
            faceToFace.reflections[existingIndex] = reflectionEntry;
        } else {
            faceToFace.reflections.push(reflectionEntry);
        }

        localStorage.setItem(key, JSON.stringify(faceToFace));
        return true;
    },

    /**
     * Get face-to-face data
     */
    getFaceToFaceData(userId) {
        const key = this.KEYS.FACE_TO_FACE + userId;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : { attendance: [], reflections: [] };
    },

    // ============================================
    // UTILITY
    // ============================================

    /**
     * Clear all user data (for testing)
     */
    clearAllData() {
        const keys = Object.values(this.KEYS);
        keys.forEach(key => {
            const items = Object.keys(localStorage);
            items.forEach(item => {
                if (item.includes(key)) {
                    localStorage.removeItem(item);
                }
            });
        });
    },

    /**
     * Export user data as JSON
     */
    exportUserData(userId) {
        const user = this.getUser(userId);
        const progress = this.getProgress(userId);
        const quizResults = this.getQuizResults(userId);
        const assignments = this.getAssignments(userId);
        const gamification = this.getGamification(userId);
        const faceToFace = this.getFaceToFaceData(userId);

        return {
            user,
            progress,
            quizResults,
            assignments,
            gamification,
            faceToFace,
            exportDate: new Date().toISOString()
        };
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    StorageManager.init();
});
