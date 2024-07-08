// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();

    document.getElementById('postForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;
        
        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, author }),
        });

        if (response.ok) {
            fetchPosts();
            document.getElementById('postForm').reset();
        } else {
            alert('게시물 작성에 실패했습니다.');
        }
    });
});

async function fetchPosts() {
    const response = await fetch('/posts');
    const posts = await response.json();
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <small>작성자: ${post.author} | 작성일: ${new Date(post.createdAt).toLocaleString()}</small>
        `;
        postsContainer.appendChild(postElement);
    });
}
