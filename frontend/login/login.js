document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    document.cookie = "session=abc123; path=/";
  
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('email', data.user.email);
      window.location.href = '../feed/feed.html';
    } else {
      document.getElementById('error').textContent = data.message;
    }
  });