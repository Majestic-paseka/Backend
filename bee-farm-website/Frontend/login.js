document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при входе');
    }

    const data = await response.json();
    console.log('Ответ от сервера:', data);

    // Удалить старый токен и сохранить новый
    localStorage.removeItem('token');
    localStorage.setItem('token', data.access_token);

    // Переход на профиль
    window.location.href = 'profile.html';
  } catch (error) {
    alert('Ошибка: ' + error.message);
  }
});
