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

      if (posts.length > 0) {
        // Show details of the first post by default
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

    // Send POST request to save new post
    fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then(res => res.json())
      .then(post => {
        const listDiv = document.getElementById("post-list");

        const postDiv = document.createElement("div");
        postDiv.textContent = post.title;
        postDiv.classList.add("post-title");
        postDiv.dataset.id = post.id;

        postDiv.addEventListener("click", () => {
          handlePostClick(post.id);
        });

        listDiv.appendChild(postDiv);

        // Optionally show details immediately
        handlePostClick(post.id);

        form.reset();
      })
      .catch(err => console.error("Failed to save post:", err));
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded", main);


