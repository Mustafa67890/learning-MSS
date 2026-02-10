/**
 * ============================================
 * DISCUSSION FORUM MODULE
 * ============================================
 * Handles community discussions and peer interactions
 */

const ForumRenderer = {
    /**
     * Render forum posts
     */
    renderForum(containerId, userId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const posts = StorageManager.getForumPosts();
        const sortedPosts = posts.sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        if (sortedPosts.length === 0) {
            container.innerHTML = `
                <div class="alert alert-info text-center">
                    <i class="fas fa-comments"></i>
                    <p class="mb-0">No discussions yet. Be the first to start a conversation!</p>
                </div>
            `;
            return;
        }

        let html = '';
        sortedPosts.forEach(post => {
            const postDate = new Date(post.timestamp);
            const now = new Date();
            const diffMs = now - postDate;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            let timeStr = '';
            if (diffMins < 1) {
                timeStr = 'Just now';
            } else if (diffMins < 60) {
                timeStr = `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
            } else if (diffHours < 24) {
                timeStr = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            } else {
                timeStr = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
            }

            const authorInitial = post.author.charAt(0).toUpperCase();

            html += `
                <div class="forum-post" data-post-id="${post.id}">
                    <div class="post-author">
                        <div class="author-avatar ${post.isAI ? 'ai-avatar' : ''}">${authorInitial}</div>
                        <div>
                            <strong>${post.author} ${post.isAI ? '<span class="badge bg-info text-dark ms-1"><i class="fas fa-robot"></i> AI Member</span>' : ''}</strong>
                            <div class="post-meta">${timeStr}</div>
                        </div>
                    </div>

                    <div class="post-text">${this.sanitizeText(post.content)}</div>

                    <div class="post-actions">
                        ${post.userId === userId ? `
                            <button type="button" class="delete-post-btn" data-post-id="${post.id}">
                                <i class="fas fa-trash-alt"></i> Delete
                            </button>
                        ` : ''}
                        <button type="button" class="btn-flag ${post.flagged ? 'flagged' : ''}" data-post-id="${post.id}" aria-pressed="${post.flagged ? 'true' : 'false'}">
                            <i class="fas fa-flag"></i> ${post.flagged ? 'Flagged' : 'Flag'}
                        </button>
                        <button type="button" class="reply-btn" data-post-id="${post.id}">
                            <i class="fas fa-reply"></i> Reply (${post.replies ? post.replies.length : 0})
                        </button>
                    </div>

                    ${post.replies && post.replies.length > 0 ? `
                        <div class="reply-section">
                            ${post.replies.map(reply => {
                const replyDate = new Date(reply.timestamp);
                const replyDiffMs = now - replyDate;
                const replyDiffMins = Math.floor(replyDiffMs / 60000);
                const replyDiffHours = Math.floor(replyDiffMs / 3600000);

                let replyTimeStr = '';
                if (replyDiffMins < 1) {
                    replyTimeStr = 'Just now';
                } else if (replyDiffMins < 60) {
                    replyTimeStr = `${replyDiffMins}m ago`;
                } else {
                    replyTimeStr = `${replyDiffHours}h ago`;
                }

                const replyAuthorInitial = reply.author.charAt(0).toUpperCase();

                return `
                                    <div class="reply">
                                        <div class="post-author" style="margin-bottom: 8px;">
                                            <div class="author-avatar ${reply.isAI ? 'ai-avatar' : ''}" style="width: 30px; height: 30px; font-size: 12px;">
                                                ${replyAuthorInitial}
                                            </div>
                                            <div>
                                                <small><strong>${reply.author} ${reply.isAI ? '<span class="badge bg-info text-dark ms-1" style="font-size: 8px;">AI</span>' : ''}</strong> • ${replyTimeStr}</small>
                                            </div>
                                        </div>
                                        <small class="post-text" style="display: block; margin-left: 40px;">
                                            ${this.sanitizeText(reply.content)}
                                        </small>
                                        ${reply.userId === userId ? `
                                            <button type="button" class="delete-reply-btn btn btn-link btn-sm p-0" data-post-id="${post.id}" data-reply-id="${reply.id}">
                                                Delete
                                            </button>
                                        ` : ''}
                                    </div>
                                `;
            }).join('')}
                        </div>
                    ` : ''}

                    <div class="reply-form-section" id="replyForm_${post.id}" style="display:none; margin-top: 15px;">
                        <textarea class="form-control form-control-sm reply-textarea" placeholder="Write a reply..." rows="3"></textarea>
                        <div class="mt-2">
                            <button type="button" class="btn btn-sm btn-primary submit-reply-btn" data-post-id="${post.id}">Reply</button>
                            <button type="button" class="btn btn-sm btn-secondary cancel-reply-btn" data-post-id="${post.id}">Cancel</button>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Add event listeners
        document.querySelectorAll('.reply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = e.currentTarget.dataset.postId;
                document.getElementById(`replyForm_${postId}`).style.display =
                    document.getElementById(`replyForm_${postId}`).style.display === 'none' ? 'block' : 'none';
            });
        });

        document.querySelectorAll('.submit-reply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = e.currentTarget.dataset.postId;
                const textarea = document.querySelector(`#replyForm_${postId} .reply-textarea`);
                const replyContent = textarea.value.trim();

                if (!replyContent) {
                    alert('Please enter a reply');
                    return;
                }

                StorageManager.addReply(parseInt(postId), userId, replyContent);
                StorageManager.addPoints(userId, 5, 'Forum Reply Posted');

                this.renderForum(containerId, userId);
                showNotification('success', 'Reply posted successfully!');

                // Trigger AI Response
                this.triggerAIResponse(parseInt(postId), userId, replyContent, containerId);
            });
        });

        document.querySelectorAll('.cancel-reply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = e.currentTarget.dataset.postId;
                document.getElementById(`replyForm_${postId}`).style.display = 'none';
            });
        });

        document.querySelectorAll('.delete-post-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (confirm('Are you sure you want to delete this post?')) {
                    const postId = parseInt(e.currentTarget.dataset.postId);
                    let posts = StorageManager.getForumPosts();
                    posts = posts.filter(p => p.id !== postId);
                    localStorage.setItem(StorageManager.KEYS.FORUM_POSTS, JSON.stringify(posts));
                    this.renderForum(containerId, userId);
                    showNotification('success', 'Post deleted');
                }
            });
        });

        document.querySelectorAll('.delete-reply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (confirm('Delete this reply?')) {
                    const postId = parseInt(e.currentTarget.dataset.postId);
                    const replyId = parseInt(e.currentTarget.dataset.replyId);

                    let posts = StorageManager.getForumPosts();
                    const post = posts.find(p => p.id === postId);
                    if (post) {
                        post.replies = post.replies.filter(r => r.id !== replyId);
                        localStorage.setItem(StorageManager.KEYS.FORUM_POSTS, JSON.stringify(posts));
                        this.renderForum(containerId, userId);
                    }
                }
            });
        });

        // Flagging posts for moderation
        document.querySelectorAll('.btn-flag').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.currentTarget.dataset.postId);
                const posts = StorageManager.getForumPosts();
                const post = posts.find(p => p.id === postId);
                if (post) {
                    post.flagged = !post.flagged;
                    localStorage.setItem(StorageManager.KEYS.FORUM_POSTS, JSON.stringify(posts));
                    this.renderForum(containerId, userId);
                    showNotification('info', post.flagged ? 'Post flagged for review' : 'Post unflagged');
                }
            });
        });
    },

    /**
     * Handle forum post submission
     */
    setupForumForm(userId) {
        const form = document.getElementById('forumForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const forumText = document.getElementById('forumText').value.trim();

            if (!forumText) {
                alert('Please enter a message');
                return;
            }

            // Create post
            const post = StorageManager.addForumPost(userId, { content: forumText });

            // Award points
            StorageManager.addPoints(userId, 10, 'Forum Post Created');

            // Clear form
            form.reset();

            // Re-render forum
            this.renderForum('forumPosts', userId);
            showNotification('success', 'Your post was added to the discussion!');

            // Trigger AI Response
            this.triggerAIResponse(post.id, userId, forumText, 'forumPosts');
        });
    },

    /**
     * Trigger AI response if applicable
     */
    async triggerAIResponse(postId, userId, content, containerId) {
        if (userId === 0) return; // Don't trigger AI for AI posts

        // Check if content looks like a question or mentions AI
        const mentionsAI = content.toLowerCase().includes('namkanda') || content.includes('?');

        if (mentionsAI) {
            console.log('Triggering AI response for post:', postId);

            // Show typing indicator in the forum
            const posts = StorageManager.getForumPosts();
            const post = posts.find(p => p.id === postId);

            // Add a temporary "typing" message or notification
            showNotification('info', 'Namkanda anafikiria...');

            const aiResponse = await GeminiService.generateResponse(content, post.replies || []);

            if (aiResponse) {
                StorageManager.addReply(postId, 0, aiResponse);
                this.renderForum(containerId, userId);
                showNotification('success', 'Namkanda ameshiriki katika mjadala!');
            }
        }
    },

    /**
     * Sanitize text to prevent XSS
     */
    sanitizeText(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML
            .replace(/\n/g, '<br>')
            .replace(/  /g, '&nbsp;&nbsp;');
    }
};
