const params = new URLSearchParams(window.location.search);
const imageId = params.get('id');
const email = localStorage.getItem('email');

if (!email || !imageId) {
  window.location.href = '/';
}

// ⚠️ Namerno XSS ranjivo
async function loadImageDetails() {
  const res = await fetch(`/api/post/image/${imageId}`);
  const data = await res.json();
  const div = document.getElementById('imageDetails');
  div.innerHTML = `
    <h2>${data.full_name}</h2>
    <img src="${data.url}" width="400" />
    <p>${data.description}</p>
  `;
}

// ⚠️ Namerno XSS ranjivo
async function loadComments() {
  const res = await fetch(`/api/post/images/${imageId}/getComments`);
  console.log(res);
  const comments = await res.json();

  const div = document.getElementById('comments');
  div.innerHTML = '';
  comments.forEach(c => {
    const el = document.createElement('div');
    el.innerHTML = `<strong>${c.full_name}:</strong> ${c.content}`;
    div.appendChild(el);
  });
}

document.getElementById('commentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = document.getElementById('commentInput').value;

  await fetch(`/api/post/images/${imageId}/addComment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, content })
  });

  document.getElementById('commentInput').value = '';
  loadComments();
});

loadImageDetails();
loadComments();