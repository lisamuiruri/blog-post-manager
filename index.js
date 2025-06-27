document.addEventListener('DOMContentLoaded', () => {
  const postList = document.getElementById('post-list');
  const postDetail = document.getElementById('post-detail');
  const newPostForm = document.getElementById('new-post-form');

  function displayPosts() {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(posts => {
        postList.innerHTML = '';
        posts.forEach(post => {
          const item = document.createElement('div');
          item.textContent = post.title;
          item.dataset.id = post.id;
          item.style.cursor = 'pointer';
          item.addEventListener('click', () => handlePostClick(post.id));
          postList.appendChild(item);
        });

        // Show first post by default
        if (posts.length > 0) {
          handlePostClick(posts[0].id);
        }
      });
  }

  function handlePostClick(id) {
    fetch(`http://localhost:3000/posts/${id}`)
      .then(res => res.json())
      .then(post => {
        postDetail.innerHTML = `
          <h2>${post.title}</h2>
          <p><strong>Author:</strong> ${post.author}</p>
          <p>${post.content}</p>
        `;
      });
  }

  function addNewPostListener() {
    newPostForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = newPostForm.title.value;
      const content = newPostForm.content.value;
      const author = newPostForm.author.value;

      fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, author })
      })
      .then(res => res.json())
      .then(() => {
        newPostForm.reset();
        displayPosts();
      });
    });
  }

  displayPosts();
  addNewPostListener();
});
