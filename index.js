const baseURL = "http://localhost:3000/posts";

function displayPosts() {
  fetch(baseURL)
    .then(res => res.json())
    .then(posts => {
      const listDiv = document.getElementById("post-list");
      listDiv.innerHTML = ""; // Clear existing list

      posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.textContent = post.title;
        postDiv.classList.add("post-title");
        postDiv.dataset.id = post.id;

        postDiv.addEventListener("click", () => {
          handlePostClick(post.id);
        });

        listDiv.appendChild(postDiv);
      });

      if(posts.length > 0) {
        // Show details of first post by default
        handlePostClick(posts[0].id);
      }
    })
    .catch(err => console.error("Error fetching posts:", err));
}

function handlePostClick(id) {
  fetch(`${baseURL}/${id}`)
    .then(res => res.json())
    .then(post => {
      const detailDiv = document.getElementById("post-detail");
      detailDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><em>Author: ${post.author}</em></p>
      `;
    })
    .catch(err => console.error("Error fetching post detail:", err));
}

function addNewPostListener() {
  const form = document.getElementById("new-post-form");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const newPost = {
      title: document.getElementById("title-input").value,
      content: document.getElementById("content-input").value,
      author: document.getElementById("author-input").value,
    };

    // For now, add to UI only (not persisted)
    // Later, we can POST to backend

    // Add new post title to list:
    const listDiv = document.getElementById("post-list");

    const postDiv = document.createElement("div");
    postDiv.textContent = newPost.title;
    postDiv.classList.add("post-title");
    // No ID because not saved to backend yet
    postDiv.addEventListener("click", () => {
      const detailDiv = document.getElementById("post-detail");
      detailDiv.innerHTML = `
        <h2>${newPost.title}</h2>
        <p>${newPost.content}</p>
        <p><em>Author: ${newPost.author}</em></p>
      `;
    });

    listDiv.appendChild(postDiv);

    form.reset();
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded", main);

