const email = localStorage.getItem('email');
if (!email) {
  window.location.href = '/';
}

async function loadFeed() {
  try {
    const res = await fetch(`/api/feed/${email}`);
    const data = await res.json();
    const container = document.getElementById('feed');
    container.innerHTML = '';

    if (data.length === 0) {
      container.innerHTML = '<p>No posts from followed users.</p>';
      return;
    }

    data.forEach(post => {
      const card = document.createElement('div');
      card.style.border = '1px solid #ccc';
      card.style.padding = '10px';
      card.style.margin = '15px 0';

      // ⚠️ Namerno XSS ranjivo
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${post.avatar_url}" width="40" style="border-radius: 50%;" />
          <strong>${post.full_name}</strong>
        </div>
        <p>${post.description}</p>
        <img class="post-image" data-id="${post.id}" src="${post.url}" width="300" style="margin-top: 10px; cursor: pointer;" />
      `;

      container.appendChild(card);
    });

    // Dodavanje click eventa na slike nakon što su ubačene
    document.querySelectorAll('.post-image').forEach(img => {
      img.addEventListener('click', (e) => {
        const imageId = e.target.dataset.id;
        window.location.href = `/post/post.html?id=${imageId}`;
      });
    });

  } catch (err) {
    console.error('Feed error:', err);
    document.getElementById('feed').innerHTML = '<p>Error loading feed.</p>';
  }
}

loadFeed();