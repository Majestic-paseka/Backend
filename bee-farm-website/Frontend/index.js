document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://localhost:3000/statistics/summary');
      const data = await response.json();
  
      document.getElementById('beeCount').textContent = data.beeFamilies;
      document.getElementById('flowerCount').textContent = data.flowers;
      document.getElementById('honeyKg').textContent = `${data.honeyKg} кг`;
    } catch (error) {
      console.error('Ошибка при загрузке статистики:', error);
    }
  });
  