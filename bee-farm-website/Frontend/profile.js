window.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Вы не авторизованы');
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Ошибка авторизации');
    }

    const user = await response.json();
    // console.log('Профиль:', user);
    // console.log("error")
    document.getElementById('name').textContent = user.full_name || 'Без имени';
    // console.log("error1")
    document.getElementById('email').textContent = user.email || 'Без почты';
    // console.log("error2")
    document.getElementById('phone').textContent = user.phone || 'Без номера';
    document.getElementById('role').textContent = user.role;
    document.getElementById('beeNum').textContent = user.beeFamilies?.length || 0;
  
  } catch (error) {
    alert('Ошибка доступа к профилю');
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }

  document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('token'); // удаляем токен
    window.location.href = 'login.html'; // перенаправляем на страницу входа
  });
  
});
