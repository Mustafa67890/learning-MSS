/**
 * ============================================
 * QUIZ ENGINE
 * ============================================
 * Handles quiz logic, scoring, feedback, and unlock mechanics
 */

const QuizEngine = {
    currentQuiz: null,
    currentQuestionIndex: 0,
    userAnswers: [],
    quizStartTime: null,
    timerInterval: null,
    timeLeft: 120, // 2 minutes in seconds

    /**
     * Get all quizzes
     */
    getAllQuizzes() {
        return [
            {
                id: 'quiz1_day1',
                dayNumber: 1,
                title: 'Day 1: Environmental Awareness Quiz',
                description: 'Test your understanding of environmental challenges',
                passingScore: 70,
                timeLimit: 10, // minutes
                questions: [
                    {
                        id: 'q1',
                        question: 'What is the primary cause of water pollution in urban areas?',
                        options: [
                            'Industrial waste and sewage discharge',
                            'Natural rainfall',
                            'Fish farming',
                            'Plant growth'
                        ],
                        correctAnswer: 0,
                        explanation: 'Industrial waste and sewage are major contributors to water pollution in urban areas like Soweto.'
                    },
                    {
                        id: 'q2',
                        question: 'Which of the following is NOT a greenhouse gas?',
                        options: [
                            'Carbon Dioxide (CO2)',
                            'Methane (CH4)',
                            'Oxygen (O2)',
                            'Nitrous Oxide (N2O)'
                        ],
                        correctAnswer: 2,
                        explanation: 'Oxygen (O2) is not a greenhouse gas. The main greenhouse gases are CO2, CH4, and N2O.'
                    },
                    {
                        id: 'q3',
                        question: 'What can individuals do to reduce plastic waste?',
                        options: [
                            'Use reusable bags and containers',
                            'Never recycle plastic',
                            'Throw plastic in the ocean',
                            'Buy more plastic products'
                        ],
                        correctAnswer: 0,
                        explanation: 'Using reusable bags and containers is one of the most effective ways to reduce plastic waste.'
                    },
                    {
                        id: 'q4',
                        question: 'Which ecosystem is most affected by deforestation?',
                        options: [
                            'Grasslands',
                            'Rainforests',
                            'Deserts',
                            'Tundra'
                        ],
                        correctAnswer: 1,
                        explanation: 'Rainforests are being rapidly deforested, affecting biodiversity and climate regulation.'
                    },
                    {
                        id: 'q5',
                        question: 'How can you conserve water at home?',
                        options: [
                            'Leave taps running',
                            'Take long showers',
                            'Fix leaking pipes and take shorter showers',
                            'Ignore water conservation'
                        ],
                        correctAnswer: 2,
                        explanation: 'Fixing leaks and reducing shower time are practical ways to conserve water.'
                    }
                ]
            },
            {
                id: 'quiz2_day2',
                dayNumber: 2,
                title: 'Day 2: Biodiversity & Ecosystems',
                description: 'Explore the importance of biodiversity',
                passingScore: 70,
                timeLimit: 10,
                questions: [
                    {
                        id: 'q1',
                        question: 'What is biodiversity?',
                        options: [
                            'The variety of different species and ecosystems',
                            'A type of pollution',
                            'Climate change',
                            'Plastic recycling'
                        ],
                        correctAnswer: 0,
                        explanation: 'Biodiversity refers to the variety of living organisms and ecosystems on Earth.'
                    },
                    {
                        id: 'q2',
                        question: 'Which country has the most biodiversity?',
                        options: [
                            'USA',
                            'Brazil',
                            'Australia',
                            'Canada'
                        ],
                        correctAnswer: 1,
                        explanation: 'Brazil, home to the Amazon rainforest, has the highest biodiversity on Earth.'
                    },
                    {
                        id: 'q3',
                        question: 'What is an endangered species?',
                        options: [
                            'A species with many members',
                            'A species at risk of extinction',
                            'A domesticated animal',
                            'A harmful invasive species'
                        ],
                        correctAnswer: 1,
                        explanation: 'An endangered species is one whose population is at risk of extinction.'
                    },
                    {
                        id: 'q4',
                        question: 'Which of these is a sign of a healthy ecosystem?',
                        options: [
                            'Monoculture crops only',
                            'High biodiversity and balance',
                            'No plants or animals',
                            'Frequent floods'
                        ],
                        correctAnswer: 1,
                        explanation: 'A healthy ecosystem has high biodiversity and ecological balance.'
                    },
                    {
                        id: 'q5',
                        question: 'What is the role of pollinators in ecosystems?',
                        options: [
                            'To pollute the air',
                            'To help plants reproduce through pollination',
                            'To destroy crops',
                            'To warm the atmosphere'
                        ],
                        correctAnswer: 1,
                        explanation: 'Pollinators like bees help plants reproduce by transferring pollen between flowers.'
                    }
                ]
            },
            {
                id: 'quiz3_day3',
                dayNumber: 3,
                title: 'Day 3: Climate Change & Solutions',
                description: 'Understanding climate change and mitigation strategies',
                passingScore: 70,
                timeLimit: 12,
                questions: [
                    {
                        id: 'q1',
                        question: 'What is the main driver of climate change?',
                        options: [
                            'Solar flares',
                            'Human greenhouse gas emissions',
                            'Volcanic eruptions only',
                            'Ocean currents'
                        ],
                        correctAnswer: 1,
                        explanation: 'Human activities, particularly burning fossil fuels, are the primary cause of climate change.'
                    },
                    {
                        id: 'q2',
                        question: 'Which renewable energy source is most abundant?',
                        options: [
                            'Wind power',
                            'Geothermal energy',
                            'Solar energy',
                            'Tidal energy'
                        ],
                        correctAnswer: 2,
                        explanation: 'Solar energy from the sun is the most abundant renewable resource on Earth.'
                    },
                    {
                        id: 'q3',
                        question: 'What does carbon footprint measure?',
                        options: [
                            'The size of your shoes',
                            'Total greenhouse gases produced by your activities',
                            'Distance you walk daily',
                            'Amount of water you use'
                        ],
                        correctAnswer: 1,
                        explanation: 'Carbon footprint measures the total greenhouse gases produced directly and indirectly by your activities.'
                    },
                    {
                        id: 'q4',
                        question: 'Which action has the greatest impact on reducing climate change?',
                        options: [
                            'Planting one tree',
                            'Using public transport',
                            'Collective policy changes and renewable energy adoption',
                            'Changing clothes daily'
                        ],
                        correctAnswer: 2,
                        explanation: 'Large-scale policy changes and renewable energy adoption have the greatest climate impact.'
                    },
                    {
                        id: 'q5',
                        question: 'What is a carbon sink?',
                        options: [
                            'A place where carbon is discarded',
                            'A forest that absorbs and stores CO2',
                            'Industrial machinery',
                            'A type of pollution'
                        ],
                        correctAnswer: 1,
                        explanation: 'Carbon sinks like forests absorb and store CO2, helping reduce atmospheric carbon levels.'
                    }
                ]
            },
            {
                id: 'quiz4_day4',
                dayNumber: 4,
                title: 'Day 4: Sustainable Living Practices',
                description: 'Implementing sustainable practices in daily life',
                passingScore: 70,
                timeLimit: 10,
                questions: [
                    {
                        id: 'q1',
                        question: 'What does the 3R principle stand for?',
                        options: [
                            'Reuse, Recycle, Reduce',
                            'Reduce, Reuse, Recycle',
                            'Recycle, Reduce, Reuse',
                            'Reduce, Recycle, Remanufacture'
                        ],
                        correctAnswer: 1,
                        explanation: 'The correct order is Reduce (consumption), Reuse (items), then Recycle (materials).'
                    },
                    {
                        id: 'q2',
                        question: 'Which food choice is most environmentally friendly?',
                        options: [
                            'Imported exotic fruits',
                            'Local, seasonal, plant-based foods',
                            'Heavily processed foods',
                            'Foods with excessive packaging'
                        ],
                        correctAnswer: 1,
                        explanation: 'Local, seasonal foods reduce transportation emissions and environmental impact.'
                    },
                    {
                        id: 'q3',
                        question: 'What is sustainable fashion?',
                        options: [
                            'Buying new clothes every day',
                            'Clothing made through ethical and eco-friendly practices',
                            'Wearing only one outfit',
                            'Fast fashion brands'
                        ],
                        correctAnswer: 1,
                        explanation: 'Sustainable fashion uses eco-friendly materials and ethical production methods.'
                    },
                    {
                        id: 'q4',
                        question: 'How can you reduce energy consumption at home?',
                        options: [
                            'Leave all lights on',
                            'Use LED bulbs and insulate properly',
                            'Use air conditioning 24/7',
                            'Never close windows'
                        ],
                        correctAnswer: 1,
                        explanation: 'LED bulbs and proper insulation significantly reduce energy consumption.'
                    },
                    {
                        id: 'q5',
                        question: 'What is composting?',
                        options: [
                            'Burning waste',
                            'Converting organic waste into nutrient-rich soil',
                            'Landfilling garbage',
                            'Industrial pollution'
                        ],
                        correctAnswer: 1,
                        explanation: 'Composting transforms organic waste into valuable soil for gardening.'
                    }
                ]
            },
            {
                id: 'quiz5_day5',
                dayNumber: 5,
                title: 'Day 5: Environmental Activism & Community Action',
                description: 'Your role in environmental protection',
                passingScore: 70,
                timeLimit: 10,
                questions: [
                    {
                        id: 'q1',
                        question: 'What is environmental activism?',
                        options: [
                            'Sitting at home',
                            'Taking action to protect the environment',
                            'Ignoring environmental issues',
                            'Polluting more'
                        ],
                        correctAnswer: 1,
                        explanation: 'Environmental activism involves taking action to protect and preserve the environment.'
                    },
                    {
                        id: 'q2',
                        question: 'How can youth contribute to environmental protection?',
                        options: [
                            'Youth cannot make a difference',
                            'Raise awareness, lead community projects, and advocate for change',
                            'Wait until adulthood',
                            'Do nothing'
                        ],
                        correctAnswer: 1,
                        explanation: 'Youth have significant power to create environmental change through awareness and action.'
                    },
                    {
                        id: 'q3',
                        question: 'What is a community cleanup initiative?',
                        options: [
                            'Ignoring litter',
                            'A group effort to clean and protect local areas',
                            'Creating more pollution',
                            'Private activity'
                        ],
                        correctAnswer: 1,
                        explanation: 'Community cleanups unite people to improve local environments and raise awareness.'
                    },
                    {
                        id: 'q4',
                        question: 'Which organization works globally on environmental issues?',
                        options: [
                            'United Nations Environment Programme (UNEP)',
                            'Only local organizations',
                            'No global organizations exist',
                            'Private companies only'
                        ],
                        correctAnswer: 0,
                        explanation: 'UNEP coordinates global environmental action and policy.'
                    },
                    {
                        id: 'q5',
                        question: 'What is your personal responsibility for the environment?',
                        options: [
                            'The government should handle everything',
                            'It is only for scientists',
                            'Everyone has a role in protecting the environment',
                            'Individuals cannot make a difference'
                        ],
                        correctAnswer: 2,
                        explanation: 'Every individual plays a crucial role in environmental protection through their daily choices.'
                    }
                ]
            }
        ];
    },

    /**
     * Get quiz by ID
     */
    getQuiz(quizId) {
        return this.getAllQuizzes().find(q => q.id === quizId);
    },

    /**
     * Get quizzes for a specific day
     */
    getQuizzesByDay(dayNumber) {
        return this.getAllQuizzes().filter(q => q.dayNumber === dayNumber);
    },

    /**
     * Start a quiz
     */
    startQuiz(quizId, userId) {
        this.currentQuiz = this.getQuiz(quizId);
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.quizStartTime = new Date();
        this.timeLeft = 120; // 2 minutes
        this.startTimer(userId);
        return this.currentQuiz;
    },

    /**
     * Start the countdown timer
     */
    startTimer(userId) {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            QuizRenderer.updateTimerUI(this.timeLeft);

            if (this.timeLeft <= 0) {
                this.stopTimer();
                // Removed alert for a smoother transition
                QuizRenderer.showQuizResults(userId);
            }
        }, 1000);
    },

    /**
     * Stop the timer
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    /**
     * Get current question
     */
    getCurrentQuestion() {
        if (!this.currentQuiz) return null;
        return this.currentQuiz.questions[this.currentQuestionIndex];
    },

    /**
     * Submit answer for current question
     */
    submitAnswer(selectedOptionIndex) {
        if (!this.currentQuiz) return false;

        this.userAnswers.push({
            questionId: this.getCurrentQuestion().id,
            selectedAnswer: selectedOptionIndex,
            isCorrect: selectedOptionIndex === this.getCurrentQuestion().correctAnswer
        });

        return this.isCorrect(selectedOptionIndex);
    },

    /**
     * Check if answer is correct
     */
    isCorrect(selectedOptionIndex) {
        const question = this.getCurrentQuestion();
        return selectedOptionIndex === question.correctAnswer;
    },

    /**
     * Move to next question
     */
    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false; // Quiz completed
    },

    /**
     * Check if quiz is completed
     */
    isQuizCompleted() {
        return this.currentQuestionIndex === this.currentQuiz.questions.length - 1
            && this.userAnswers.length === this.currentQuiz.questions.length;
    },

    /**
     * Get quiz results
     */
    getQuizResults() {
        if (!this.currentQuiz) return null;

        const correctAnswers = this.userAnswers.filter(a => a.isCorrect).length;
        const totalQuestions = this.currentQuiz.questions.length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        const passed = percentage >= this.currentQuiz.passingScore;

        return {
            quizId: this.currentQuiz.id,
            score: correctAnswers,
            totalQuestions: totalQuestions,
            percentage: percentage,
            passed: passed,
            answers: this.userAnswers,
            timeTaken: Math.max(1, Math.round((new Date() - this.quizStartTime) / 60000)) // at least 1 min for logic
        };
    },

    /**
     * Get explanation for a question
     */
    getExplanation(questionId) {
        const question = this.currentQuiz.questions.find(q => q.id === questionId);
        return question ? question.explanation : '';
    },

    /**
     * Reset quiz state
     */
    resetQuiz() {
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.quizStartTime = null;
    }
};

// ============================================
// QUIZ RENDERING
// ============================================

const QuizRenderer = {
    /**
     * Render quiz list
     */
    renderQuizList(containerId, userId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const quizzes = QuizEngine.getAllQuizzes();
        let html = '';

        quizzes.forEach(quiz => {
            const result = StorageManager.getQuizResult(userId, quiz.id);
            const passed = result ? result.passed : false;
            const attemptCount = result ? 1 : 0;
            const score = result ? result.percentage : 0;

            html += `
                <div class="card mb-3 quiz-card" data-quiz-id="${quiz.id}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 class="card-title">${quiz.title}</h5>
                                <p class="card-text text-muted small">${quiz.description}</p>
                                <p class="small"><strong>Passing Score:</strong> ${quiz.passingScore}%</p>
                            </div>
                            <div class="text-end">
                                ${passed ? `
                                    <span class="badge bg-success">✓ Passed</span>
                                    <p class="small text-muted mt-2">${score}%</p>
                                ` : attemptCount > 0 ? `
                                    <span class="badge bg-warning text-dark">Failed</span>
                                    <p class="small text-muted mt-2">${score}%</p>
                                ` : `
                                    <span class="badge bg-secondary">Not Attempted</span>
                                `}
                            </div>
                        </div>
                        <button type="button" class="btn btn-sm btn-primary mt-3 start-quiz-btn" data-quiz-id="${quiz.id}">
                            ${result ? 'Retake Quiz' : 'Start Quiz'}
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Add event listeners for start/retake buttons (use currentTarget to read dataset reliably)
        document.querySelectorAll('.start-quiz-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const quizId = e.currentTarget.dataset.quizId;
                QuizRenderer.startQuizUI(quizId, userId);
            });
        });
    },

    /**
     * Start quiz UI
     */
    startQuizUI(quizId, userId) {
        const quiz = QuizEngine.startQuiz(quizId, userId);
        const container = document.getElementById('quizContainer');

        document.getElementById('quizList').style.display = 'none';
        container.style.display = 'block';

        this.renderQuestion(container, userId);
    },

    /**
     * Render quiz question
     */
    renderQuestion(container, userId) {
        const question = QuizEngine.getCurrentQuestion();
        const questionIndex = QuizEngine.currentQuestionIndex;
        const totalQuestions = QuizEngine.currentQuiz.questions.length;
        const progress = ((questionIndex + 1) / totalQuestions) * 100;

        let html = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5>${QuizEngine.currentQuiz.title}</h5>
                        <span class="badge bg-primary">${questionIndex + 1} of ${totalQuestions}</span>
                    </div>
                    <div id="quizTimer" class="text-center mt-2 fw-bold text-danger" style="font-size: 1.2rem;">
                        Time Left: 02:00
                    </div>
                    <div class="progress mt-2" style="height: 6px;">
                        <div class="progress-bar" role="progressbar" style="width: ${progress}%"></div>
                    </div>
                </div>

                <div class="mt-4">
                    <div class="question-number">${questionIndex + 1}</div>
                    <h6 class="question-text">${question.question}</h6>

                    <div id="optionsContainer">
                        ${question.options.map((option, index) => `
                            <label class="option" tabindex="0" data-index="${index}">
                                <input type="radio" name="answer" value="${index}" class="quiz-option">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>

                    <div id="feedbackContainer" role="status" aria-live="polite"></div>

                    <div class="d-flex gap-2 mt-4">
                        <button type="button" id="submitAnswerBtn" class="btn btn-success flex-grow-1">
                            Check Answer
                        </button>
                        <button type="button" id="nextQuestionBtn" class="btn btn-secondary flex-grow-1" style="display:none;">
                            Next Question
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Event listeners
        document.getElementById('submitAnswerBtn').addEventListener('click', () => {
            this.submitAnswer(userId);
        });

        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('change', (e) => {
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                e.target.closest('.option').classList.add('selected');
            });
        });

        // Keyboard support: Enter/Space on label activates the radio
        document.querySelectorAll('.option').forEach(label => {
            label.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const idx = label.dataset.index;
                    const radio = label.querySelector('input[type="radio"]');
                    if (radio) {
                        radio.checked = true;
                        radio.dispatchEvent(new Event('change'));
                    }
                }
            });
        });
    },

    /**
     * Submit answer
     */
    submitAnswer(userId) {
        const selectedOption = document.querySelector('input[name="answer"]:checked');

        if (!selectedOption) {
            const feedbackContainer = document.getElementById('feedbackContainer');
            feedbackContainer.innerHTML = `<div class="feedback incorrect"><strong>Please select an answer.</strong></div>`;
            feedbackContainer.focus?.();
            return;
        }

        const selectedIndex = parseInt(selectedOption.value);
        const isCorrect = QuizEngine.submitAnswer(selectedIndex);
        const question = QuizEngine.getCurrentQuestion();
        const explanation = QuizEngine.getExplanation(question.id);

        // Show feedback (announce via aria-live)
        const feedbackContainer = document.getElementById('feedbackContainer');
        feedbackContainer.innerHTML = `
            <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
                <strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong>
                <p class="mb-0 mt-2">${explanation}</p>
            </div>
        `;
        feedbackContainer.querySelector && feedbackContainer.querySelector('div')?.setAttribute('tabindex', '-1');
        feedbackContainer.querySelector('div')?.focus?.();

        // Update UI
        document.getElementById('submitAnswerBtn').style.display = 'none';
        document.getElementById('nextQuestionBtn').style.display = 'block';

        // Disable options to prevent accidental change
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.disabled = true;
        });

        // Highlight correct/incorrect
        document.querySelectorAll('.option').forEach((option, index) => {
            option.classList.remove('correct', 'incorrect');
            if (index === question.correctAnswer) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });

        // Add points if correct
        if (isCorrect) {
            StorageManager.addPoints(userId, 10, 'Quiz Question Answered Correctly');
        }

        // If incorrect, offer a retry button (one retry for learning)
        if (!isCorrect) {
            const retryBtn = document.createElement('button');
            retryBtn.className = 'btn btn-outline-warning mt-3';
            retryBtn.textContent = 'Retry Question';
            retryBtn.setAttribute('type', 'button');
            retryBtn.addEventListener('click', () => {
                // Remove last answer, re-enable options, hide next button
                QuizEngine.userAnswers.pop();
                document.getElementById('submitAnswerBtn').style.display = 'block';
                document.getElementById('nextQuestionBtn').style.display = 'none';
                document.querySelectorAll('.quiz-option').forEach(opt => { opt.disabled = false; opt.checked = false; });
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('correct', 'incorrect', 'selected'));
                feedbackContainer.innerHTML = '';
                // focus first option
                const firstOption = document.querySelector('.option');
                firstOption?.focus();
            });

            feedbackContainer.appendChild(retryBtn);
            retryBtn.focus();
        }

        // Next button handler
        document.getElementById('nextQuestionBtn').onclick = () => {
            if (QuizEngine.nextQuestion()) {
                this.renderQuestion(document.getElementById('quizContainer'), userId);
            } else {
                this.showQuizResults(userId);
            }
        };
    },

    /**
     * Show quiz results
     */
    showQuizResults(userId) {
        QuizEngine.stopTimer();
        const results = QuizEngine.getQuizResults();
        const container = document.getElementById('quizContainer');

        const resultIcon = results.passed ? '✓' : '✗';
        const resultClass = results.passed ? 'pass' : 'fail';
        const resultMessage = results.passed
            ? `Excellent! You passed with ${results.percentage}%`
            : `You scored ${results.percentage}%. You need ${QuizEngine.currentQuiz.passingScore}% to pass.`;

        let html = `
            <div class="quiz-result">
                <div class="result-icon ${resultClass}">${resultIcon}</div>
                <h4>${results.passed ? 'Quiz Passed!' : 'Quiz Not Passed'}</h4>
                <div class="result-score">${results.score}/${results.totalQuestions}</div>
                <p class="result-message">${resultMessage}</p>
                <p class="text-muted small">Time taken: ${results.timeTaken} minute(s)</p>
                
                <div class="d-grid gap-2 mt-4">
                    <button type="button" id="reviewBtn" class="btn btn-outline-primary">Review Answers</button>
                    <button type="button" id="backBtn" class="btn btn-secondary">Back to Quizzes</button>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Save results
        StorageManager.saveQuizResult(userId, QuizEngine.currentQuiz.id, results);

        // Award bonus points for passing
        if (results.passed) {
            StorageManager.addPoints(userId, 50, 'Quiz Passed');

            // Check for badges
            GameificationEngine.checkQuizBadges(userId);
        }

        // Event listeners
        document.getElementById('backBtn').addEventListener('click', () => {
            document.getElementById('quizList').style.display = 'block';
            container.style.display = 'none';
            QuizEngine.resetQuiz();
            QuizRenderer.renderQuizList('quizList', userId);
        });

        document.getElementById('reviewBtn').addEventListener('click', () => {
            this.showReview();
        });

        // Update UI
        AppState.updateDashboard(userId);
    },

    /**
     * Update timer display
     */
    updateTimerUI(seconds) {
        const timerEl = document.getElementById('quizTimer');
        if (!timerEl) return;

        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        timerEl.textContent = `Time Left: ${timeStr}`;

        // Add warning color when time is low
        if (seconds <= 30) {
            timerEl.classList.remove('text-primary');
            timerEl.classList.add('text-danger', 'animate-pulse');
        } else {
            timerEl.classList.add('text-primary');
            timerEl.classList.remove('text-danger');
        }
    },

    /**
     * Show answer review
     */
    showReview() {
        const container = document.getElementById('quizContainer');
        const results = QuizEngine.getQuizResults();
        const quiz = QuizEngine.currentQuiz;

        let reviewHtml = '<div class="quiz-result"><h5 class="mb-4">Answer Review</h5><div id="reviewContainer"></div>';
        reviewHtml += '<button type="button" id="backResultsBtn" class="btn btn-secondary mt-3 w-100">Back to Results</button></div>';

        container.innerHTML = reviewHtml;

        let reviewContent = '';
        results.answers.forEach((answer, index) => {
            const question = quiz.questions[index];
            reviewContent += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="mb-2">Question ${index + 1}</h6>
                        <p class="card-text mb-3">${question.question}</p>
                        <p class="small mb-2">
                            <strong>Your Answer:</strong> ${question.options[answer.selectedAnswer]}
                            ${answer.isCorrect ? '<span class="badge bg-success ms-2">Correct</span>' : '<span class="badge bg-danger ms-2">Incorrect</span>'}
                        </p>
                        <p class="small text-muted">${question.explanation}</p>
                    </div>
                </div>
            `;
        });

        document.getElementById('reviewContainer').innerHTML = reviewContent;
        document.getElementById('backResultsBtn').addEventListener('click', () => {
            QuizEngine.resetQuiz();
            renderSection('quiz', StorageManager.getCurrentUser().id);
        });
    }
};
