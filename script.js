const blogListEl = document.getElementById('blog-list');
const singlePostEl = document.getElementById('single-post');
let allPosts = [];

// Fetch the posts from the JSON file
async function fetchPosts() {
    try {
        const response = await fetch('posts.json');
        allPosts = await response.json();
        handleRoute(); // Check the URL to see what to show
    } catch (error) {
        blogListEl.innerHTML = '<p>Error loading posts.</p>';
    }
}

// Render the homepage list
function renderList() {
    blogListEl.classList.remove('hidden');
    singlePostEl.classList.add('hidden');
    window.scrollTo(0, 0);
    
    blogListEl.innerHTML = allPosts.map(post => `
        <div class="post-card">
            <h2 onclick="window.location.hash='${post.id}'">${post.title}</h2>
            <div class="post-date">${post.date}</div>
            <p>${post.excerpt}</p>
            <a class="read-more" onclick="window.location.hash='${post.id}'">Read full article →</a>
        </div>
    `).join('');
}

// Render a single full article
function renderPost(id) {
    const post = allPosts.find(p => p.id === id);
    if (!post) return renderList();

    blogListEl.classList.add('hidden');
    singlePostEl.classList.remove('hidden');
    window.scrollTo(0, 0);

    singlePostEl.innerHTML = `
        <div class="back-btn" onclick="window.location.hash=''">← Back to Articles</div>
        <h1>${post.title}</h1>
        <div class="post-date">${post.date}</div>
        <div class="content">${post.content}</div>
    `;
}

// Handle browser navigation (the back/forward buttons)
function handleRoute() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        renderPost(hash);
    } else {
        renderList();
    }
}

// Listen for URL changes
window.addEventListener('hashchange', handleRoute);

// Start the app
fetchPosts();
