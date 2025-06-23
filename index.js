document.addEventListener('DOMContentLoaded', () => {
  const postList = document.getElementById('post-list');
  const postDetail = document.getElementById('post-detail');
  const newPostForm = document.getElementById('new-post-form');

  function displayPosts() {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(posts => {
        postList.innerHTML = ''; // Clear list
        posts.forEach(post => {
          const postItem = document.createElement('div');
          postItem.textContent = post.title;
          postItem.dataset.id = post.id;
          postItem.style.cursor = 'pointer';
          postList.appendChild(postItem);
        });
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author })
      })
        .then(res => res.json())
        .then(() => {
          displayPosts();
          newPostForm.reset();
        });
    });
  }

  // Delegated click listener
  postList.addEventListener('click', e => {
    if (e.target.dataset.id) {
      handlePostClick(e.target.dataset.id);
    }
  });

  // Kick things off
  displayPosts();
  addNewPostListener();
});


