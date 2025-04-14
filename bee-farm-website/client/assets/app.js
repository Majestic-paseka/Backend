// Получение списка пчелосемей
async function loadFamilies() {
    const response = await fetch('http://localhost:3000/bee-families?user_id=1');
    const families = await response.json();
    
    const list = document.getElementById('families-list');
    list.innerHTML = families.map(family => `
      <div class="family-card">
        <h3>Семья №${family.beefamily_number}</h3>
        <p>Маточка: ${family.queen_breed || 'не указана'}</p>
      </div>
    `).join('');
  }
  
  // Добавление новой семьи
  document.getElementById('family-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const number = document.getElementById('family-number').value;
    
    await fetch('http://localhost:3000/bee-families', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1,
        beefamily_number: number
      })
    });
  
    loadFamilies(); // Обновляем список
    e.target.reset();
  });
  
  // Загружаем данные при старте
  loadFamilies();