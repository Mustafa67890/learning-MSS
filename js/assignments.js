/**
 * ============================================
 * ASSIGNMENTS MODULE
 * ============================================
 * Handles assignment distribution, submission, and tracking
 */

const AssignmentEngine = {
    /**
     * Get all assignments
     */
    getAllAssignments() {
        return [
            {
                id: 'assignment1_day1',
                dayNumber: 1,
                title: 'Environmental Audit of Your Home',
                description: `Conduct a simple audit of your home to identify areas of environmental waste or inefficiency.
                
                Your task:
                1. Walk through your home and note areas where water, energy, or materials are being wasted
                2. Take mental or actual notes on issues like:
                   - Leaking taps
                   - Lights left on unnecessarily
                   - Excessive plastic use
                   - Non-recyclable waste
                3. Write a short report (5-10 sentences) describing what you found
                4. Suggest at least 3 improvements your family could make
                
                Due Date: End of Day 1`,
                dueDate: '2026-02-03',
                points: 50,
                rubric: [
                    'Identification of at least 3 environmental issues',
                    'Practical suggestions for improvement',
                    'Clear and organized writing',
                    'Effort and thoughtfulness demonstrated'
                ]
            },
            {
                id: 'assignment2_day2',
                dayNumber: 2,
                title: 'Research & Present: Local Environmental Issues',
                description: `Research one environmental issue affecting the Soweto area or South Africa broadly.
                
                Your task:
                1. Choose one environmental issue (e.g., air pollution, waste management, water scarcity)
                2. Research the issue using available resources
                3. Write a 1-2 page report including:
                   - What is the problem?
                   - What causes it?
                   - Who is affected?
                   - What solutions exist?
                   - What can YOU do about it?
                
                You may include images or sketches.
                Due Date: End of Day 2`,
                dueDate: '2026-02-04',
                points: 75,
                rubric: [
                    'Clear understanding of the environmental issue',
                    'Research quality and sources',
                    'Analysis of causes and effects',
                    'Realistic personal action plans'
                ]
            },
            {
                id: 'assignment3_day3',
                dayNumber: 3,
                title: 'Carbon Footprint Calculator & Action Plan',
                description: `Calculate your personal carbon footprint and create an action plan to reduce it.
                
                Your task:
                1. Estimate your carbon footprint by considering:
                   - Transportation methods you use
                   - Energy consumption at home
                   - Food choices
                   - Waste generation
                2. Calculate approximate emissions (we'll provide a simple chart)
                3. Create a 30-day plan to reduce your carbon footprint with specific, measurable actions
                4. Include how much you expect to reduce your footprint
                
                Due Date: End of Day 3`,
                dueDate: '2026-02-05',
                points: 100,
                rubric: [
                    'Accurate carbon footprint estimation',
                    'Realistic and specific action items',
                    'Clear timeline with milestones',
                    'Evidence of commitment to sustainability'
                ]
            },
            {
                id: 'assignment4_day4',
                dayNumber: 4,
                title: 'Sustainable Living Product Review',
                description: `Review a sustainable or eco-friendly product you use or could use.
                
                Your task:
                1. Choose a sustainable product (e.g., reusable water bottle, bamboo toothbrush, cloth bags)
                2. Research the product and its environmental impact
                3. Write a review including:
                   - Product description and purpose
                   - Environmental benefits vs. regular alternatives
                   - Cost comparison
                   - Personal recommendation (would you use/recommend it?)
                   - Rating (1-5 stars)
                4. Include any concerns or drawbacks
                
                Due Date: End of Day 4`,
                dueDate: '2026-02-06',
                points: 75,
                rubric: [
                    'Well-researched product information',
                    'Clear environmental impact analysis',
                    'Fair and balanced review',
                    'Practical and helpful conclusion'
                ]
            },
            {
                id: 'assignment5_day5',
                dayNumber: 5,
                title: 'Personal Environmental Action Project',
                description: `Design and execute a small environmental action project in your community.
                
                Your task:
                1. Choose a project that makes a real environmental difference:
                   - Organize a litter cleanup in your neighborhood
                   - Plant trees or start a garden
                   - Create an awareness poster campaign
                   - Teach others about recycling
                   - Reduce waste in a specific area
                   - Any other creative environmental action
                
                2. Document your project with:
                   - Planning details (what, when, where, why)
                   - Photos or evidence of completion
                   - Description of impact and what you learned
                   - Reflection on how this changed your view of environmental responsibility
                
                3. Submit a project report (500+ words)
                
                Due Date: End of Day 5`,
                dueDate: '2026-02-07',
                points: 150,
                rubric: [
                    'Project is realistic and impactful',
                    'Clear documentation with evidence',
                    'Thoughtful reflection on learning',
                    'Demonstration of environmental commitment'
                ]
            }
        ];
    },

    /**
     * Get assignment by ID
     */
    getAssignment(assignmentId) {
        return this.getAllAssignments().find(a => a.id === assignmentId);
    },

    /**
     * Get assignments for a specific day
     */
    getAssignmentsByDay(dayNumber) {
        return this.getAllAssignments().filter(a => a.dayNumber === dayNumber);
    },

    /**
     * Check if assignment is due
     */
    isAssignmentDue(assignmentId) {
        const assignment = this.getAssignment(assignmentId);
        return new Date() <= new Date(assignment.dueDate);
    },

    /**
     * Get days until due
     */
    getDaysUntilDue(assignmentId) {
        const assignment = this.getAssignment(assignmentId);
        const today = new Date();
        const due = new Date(assignment.dueDate);
        const msPerDay = 24 * 60 * 60 * 1000;
        return Math.ceil((due - today) / msPerDay);
    }
};

// ============================================
// ASSIGNMENT RENDERING
// ============================================

const AssignmentRenderer = {
    /**
     * Render assignment list
     */
    renderAssignmentList(containerId, userId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const assignments = AssignmentEngine.getAllAssignments();
        let html = '';

        assignments.forEach(assignment => {
            const submitted = StorageManager.isAssignmentSubmitted(userId, assignment.id);
            const daysUntilDue = AssignmentEngine.getDaysUntilDue(assignment.id);
            const isDue = AssignmentEngine.isAssignmentDue(assignment.id);

            let statusBadge = '';
            if (submitted) {
                statusBadge = '<span class="badge bg-success">Submitted</span>';
            } else if (!isDue) {
                statusBadge = '<span class="badge bg-danger">Overdue</span>';
            } else if (daysUntilDue <= 1) {
                statusBadge = '<span class="badge bg-warning text-dark">Due Soon</span>';
            } else {
                statusBadge = '<span class="badge bg-info">Pending</span>';
            }

            html += `
                <div class="card assignment-card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 class="card-title">
                                    <i class="fas fa-tasks text-warning"></i> ${assignment.title}
                                </h5>
                                <p class="card-text text-muted small mb-2">${assignment.description.split('\n')[0]}</p>
                                <p class="small mb-2">
                                    <strong>Due:</strong> ${assignment.dueDate} 
                                    ${isDue && !submitted ? `<span class="text-warning">(${daysUntilDue} day(s) left)</span>` : ''}
                                </p>
                                <p class="small text-muted mb-0">
                                    <strong>Points:</strong> ${assignment.points}
                                </p>
                            </div>
                            <div class="text-end">
                                ${statusBadge}
                            </div>
                        </div>
                        <button type="button" class="btn btn-sm btn-primary mt-3 view-assignment-btn" data-assignment-id="${assignment.id}">
                            ${submitted ? 'View Submission' : 'View & Submit'}
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Add event listeners
        document.querySelectorAll('.view-assignment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const assignmentId = e.target.dataset.assignmentId;
                this.showAssignmentDetail(assignmentId, userId);
            });
        });
    },

    /**
     * Show assignment detail
     */
    showAssignmentDetail(assignmentId, userId) {
        const assignment = AssignmentEngine.getAssignment(assignmentId);
        const submission = StorageManager.getAssignment(userId, assignmentId);
        const container = document.getElementById('assignmentDetail');

        let html = `
            <button type="button" class="btn btn-outline-secondary btn-sm mb-3" id="backBtn">
                <i class="fas fa-arrow-left"></i> Back
            </button>

            <div class="card">
                <div class="card-body">
                    <h4 class="card-title mb-3">${assignment.title}</h4>
                    
                    <div class="mb-4">
                        <h6 class="text-muted">Description</h6>
                        <p style="white-space: pre-wrap;">${assignment.description}</p>
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-6">
                            <p><strong>Due Date:</strong> ${assignment.dueDate}</p>
                            <p><strong>Points:</strong> ${assignment.points}</p>
                        </div>
                        <div class="col-md-6">
                            <p><strong>Status:</strong> 
                                ${submission ? 
                                    '<span class="badge bg-success">Submitted</span>' : 
                                    '<span class="badge bg-warning">Not Submitted</span>'
                                }
                            </p>
                        </div>
                    </div>

                    ${assignment.rubric ? `
                        <div class="mb-4">
                            <h6>Grading Rubric</h6>
                            <ul class="small">
                                ${assignment.rubric.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}

                    ${submission ? `
                        <div class="alert alert-success">
                                <strong>Submitted on:</strong> ${submission.submittedDate ? new Date(submission.submittedDate).toLocaleDateString() : 'Unknown'}
                            </div>
                        <div class="card bg-light mb-3">
                            <div class="card-body">
                                <h6>Your Submission:</h6>
                                <p style="white-space: pre-wrap;" class="mb-0">${submission.content}</p>
                            </div>
                        </div>
                            <div class="d-flex gap-2">
                                <button type="button" class="btn btn-warning" id="editSubmissionBtn">Edit Submission</button>
                                <button type="button" class="btn btn-outline-primary" id="downloadSubmissionBtn">Download Submission</button>
                            </div>
                    ` : `
                        <div class="assignment-form">
                            <form id="assignmentForm">
                                <div class="mb-3">
                                    <label for="submissionText" class="form-label">Your Submission</label>
                                    <textarea class="form-control" id="submissionText" rows="8" 
                                              placeholder="Type or paste your assignment submission here..." required></textarea>
                                    <small class="form-text text-muted mt-2">
                                        You can copy and paste from a document or type directly.
                                    </small>
                                </div>
                                <button type="submit" class="btn btn-success btn-lg w-100">
                                    <i class="fas fa-paper-plane"></i> Submit Assignment
                                </button>
                            </form>
                        </div>
                    `}
                </div>
            </div>
        `;

        document.getElementById('assignmentsList').style.display = 'none';
        container.style.display = 'block';
        container.innerHTML = html;

        // Event listeners
        document.getElementById('backBtn').addEventListener('click', () => {
            container.style.display = 'none';
            document.getElementById('assignmentsList').style.display = 'block';
        });

        if (submission) {
            document.getElementById('editSubmissionBtn').addEventListener('click', () => {
                this.editSubmission(assignmentId, submission, userId);
            });
        } else {
            document.getElementById('assignmentForm').addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitAssignment(assignmentId, userId);
            });
        }

        // Download submission handler
        const downloadBtn = document.getElementById('downloadSubmissionBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                const text = submission.content || '';
                const filename = `${assignment.id}_${StorageManager.getUser(userId).studentID || 'submission'}.txt`;
                const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            });
        }
    },

    /**
     * Submit assignment
     */
    submitAssignment(assignmentId, userId) {
        const submissionText = document.getElementById('submissionText').value.trim();

        if (!submissionText) {
            alert('Please enter your assignment submission');
            return;
        }

        const submission = {
            content: submissionText,
            submittedDate: new Date().toISOString()
        };

        StorageManager.saveAssignmentSubmission(userId, assignmentId, submission);

        // Award points
        const assignment = AssignmentEngine.getAssignment(assignmentId);
        StorageManager.addPoints(userId, Math.floor(assignment.points / 2), 'Assignment Submitted');

        // Show success message
        showNotification('success', 'Assignment submitted successfully!');

        // Reload assignment list
        setTimeout(() => {
            this.renderAssignmentList('assignmentsList', userId);
            document.getElementById('assignmentDetail').style.display = 'none';
            AppState.updateDashboard(userId);
        }, 1000);
    },

    /**
     * Edit submission
     */
    editSubmission(assignmentId, submission, userId) {
        const container = document.getElementById('assignmentDetail');
        const assignment = AssignmentEngine.getAssignment(assignmentId);

        let html = `
            <button type="button" class="btn btn-outline-secondary btn-sm mb-3" id="backBtn">
                <i class="fas fa-arrow-left"></i> Back
            </button>

            <div class="card">
                <div class="card-body">
                    <h4 class="card-title mb-3">Edit: ${assignment.title}</h4>

                    <form id="editForm">
                        <div class="mb-3">
                            <label for="editSubmissionText" class="form-label">Your Submission</label>
                            <textarea class="form-control" id="editSubmissionText" rows="8" required>${submission.content}</textarea>
                        </div>
                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-success flex-grow-1">
                                <i class="fas fa-save"></i> Update Submission
                            </button>
                            <button type="button" class="btn btn-secondary flex-grow-1" id="cancelBtn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        container.innerHTML = html;

        document.getElementById('backBtn').addEventListener('click', () => {
            this.showAssignmentDetail(assignmentId, userId);
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.showAssignmentDetail(assignmentId, userId);
        });

        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedContent = document.getElementById('editSubmissionText').value.trim();
            
            StorageManager.saveAssignmentSubmission(userId, assignmentId, { content: updatedContent, submittedDate: new Date().toISOString() });
            showNotification('success', 'Assignment updated successfully!');
            
            setTimeout(() => {
                this.showAssignmentDetail(assignmentId, userId);
            }, 1000);
        });
    }
};
