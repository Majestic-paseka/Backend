let selectedProductivityId = null;
let currentDeleteId = null;
let fullProductivityData = [];

// 🧲 Получение данных
function fetchProductivity() {
  const token = localStorage.getItem('token');
  return fetch('http://localhost:3000/productivity', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }
    return response.json();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  try {
    const data = await fetchProductivity();
    fullProductivityData = data;
    renderHoneyTable(data);

    // Привязка фильтров
    ['yearFilter', 'familyFilter', 'honeyFilter', 'waxFilter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', applyFilters);
    });
  } catch (error) {
    console.error('Ошибка загрузки данных о мёде:', error);
  }
});

function applyFilters() {
  const year = document.getElementById('yearFilter').value;
  const family = document.getElementById('familyFilter').value;
  const honey = document.getElementById('honeyFilter').value;
  const wax = document.getElementById('waxFilter').value;

  const filtered = fullProductivityData.filter(entry => {
    const matchesYear = !year || entry.productivity_year === Number(year);
    const matchesFamily = !family || entry.beefamily?.beefamily_number?.toString() === family;
    const matchesHoney = !honey || entry.honey_kg >= Number(honey);
    const matchesWax = !wax || entry.wax_kg >= Number(wax);
    return matchesYear && matchesFamily && matchesHoney && matchesWax;
  });

  renderHoneyTable(filtered);
}


function renderHoneyTable(data) {
  const tableBody = document.querySelector('#honeyTable tbody');
  tableBody.innerHTML = '';

  data.forEach(entry => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${entry.productivity_id}</td>
      <td>${entry.productivity_year}</td>
      <td>${entry.beefamily?.beefamily_number || '-'}</td>
      <td>${entry.honey_kg}</td>
      <td>${entry.wax_kg}</td>
      <td class="action-buttons">
        <button class="details-button" data-id="${entry.productivity_id}">Подробнее</button>
        <button class="edit-button" data-id="${entry.productivity_id}">Редактировать</button>
        <button class="delete-button" data-id="${entry.productivity_id}">Удалить</button>
      </td>
    `;

    row.querySelector('.details-button').addEventListener('click', () => {
      showDetailsModal(entry);
    });
    row.querySelector('.edit-button').addEventListener('click', () => {
      showEditModal(entry);
    });
    row.querySelector('.delete-button').addEventListener('click', () => {
      showDeleteModal(entry.productivity_id);
    });

    tableBody.appendChild(row);
  });
}

// 🔍 Модалка "Подробнее"
function showDetailsModal(entry) {
  document.getElementById('detail-id').textContent = entry.productivity_id;
  document.getElementById('detail-year').textContent = entry.productivity_year;
  document.getElementById('detail-family').textContent = entry.beefamily?.beefamily_number || '-';
  document.getElementById('detail-honey').textContent = `${entry.honey_kg} кг`;
  document.getElementById('detail-wax').textContent = `${entry.wax_kg} кг`;
  document.getElementById('detailsModal').style.display = 'block';
}

// ✏️ Модалка редактирования
function showEditModal(entry) {
  selectedProductivityId = entry.productivity_id;
  document.getElementById('edit-id').value = entry.productivity_id;
  document.getElementById('edit-year').value = entry.productivity_year;
  document.getElementById('edit-honey').value = entry.honey_kg;
  document.getElementById('edit-wax').value = entry.wax_kg;
  document.getElementById('editModal').style.display = 'block';
}

// ❌ Модалка удаления
function showDeleteModal(id) {
  currentDeleteId = id;
  console.log('Запомнен ID для удаления:', currentDeleteId);
  document.getElementById('deleteModal').style.display = 'block';
}

// ✅ Подтверждение удаления
document.getElementById('confirm-delete').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  console.log('Удаляем ID:', currentDeleteId);
  if (!currentDeleteId) return;

  try {
    const response = await fetch(`http://localhost:3000/productivity/${currentDeleteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Ошибка при удалении');

    document.getElementById('deleteModal').style.display = 'none';
    currentDeleteId = null;

    const data = await fetchProductivity();
    renderHoneyTable(data);
  } catch (error) {
    console.error('Ошибка при удалении:', error);
    alert('Ошибка при удалении записи');
  }
});

// ❌ Отмена удаления
document.getElementById('cancel-delete').addEventListener('click', () => {
  document.getElementById('deleteModal').style.display = 'none';
});

// 💾 Обработка сохранения редактирования
document.getElementById('edit-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('edit-id').value;
  const year = Number(document.getElementById('edit-year').value);
  const honey = Number(document.getElementById('edit-honey').value);
  const wax = Number(document.getElementById('edit-wax').value);
  const token = localStorage.getItem('token');

  try {
    await fetch(`http://localhost:3000/productivity/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productivity_year: year,
        honey_kg: honey,
        wax_kg: wax
      })
    });

    document.getElementById('editModal').style.display = 'none';
    location.reload();
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
  }
});

// ➕ Модалка добавления
document.getElementById('addButton').addEventListener('click', () => {
  document.getElementById('addYear').value = '';
  document.getElementById('addBeefamily').value = '';
  document.getElementById('addHoney').value = '';
  document.getElementById('addWax').value = '';
  document.getElementById('addModal').style.display = 'block';
});

document.getElementById('addClose').addEventListener('click', () => {
  document.getElementById('addModal').style.display = 'none';
});

// 📥 Загрузка пчелиных семей в выпадающий список
async function populateBeefamilySelect() {
  const token = localStorage.getItem('token');
  const select = document.getElementById('addBeefamily');
  select.innerHTML = '<option value="" disabled selected>— Выберите семью —</option>';

  try {
    const response = await fetch('http://localhost:3000/beefamilies', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Ошибка при загрузке семей');

    const families = await response.json();

    families.forEach(family => {
      const option = document.createElement('option');
      option.value = family.beefamily_id;
      option.textContent = `Семья №${family.beefamily_number}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Ошибка при загрузке пчелиных семей:', error);
  }
}

// Открытие модального окна "Добавить"
document.getElementById('addButton').addEventListener('click', () => {
  document.getElementById('addForm').reset();
  populateBeefamilySelect();
  document.getElementById('addModal').style.display = 'block';
});

// Закрытие модалки
document.getElementById('addClose').addEventListener('click', () => {
  document.getElementById('addModal').style.display = 'none';
});

// 🚀 Обработка отправки формы
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const year = Number(document.getElementById('addYear').value);
  const beefamilyId = Number(document.getElementById('addBeefamily').value);
  const honey = Number(document.getElementById('addHoney').value);
  const wax = Number(document.getElementById('addWax').value);
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:3000/productivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productivity_year: year,
        beefamily_id: beefamilyId,
        honey_kg: honey,
        wax_kg: wax
      })
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении записи');
    }

    document.getElementById('addModal').style.display = 'none';
    document.getElementById('addForm').reset();

    const data = await fetchProductivity();
    renderHoneyTable(data);
  } catch (error) {
    console.error('Ошибка при добавлении продукции:', error);
    alert('Ошибка при добавлении записи');
  }
});

// ❌ Закрытие всех модалок по крестику
document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').style.display = 'none';
  });
});

// ✖ Клик вне модалки
window.addEventListener('click', e => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (e.target === modal) modal.style.display = 'none';
  });
});

const addFormElement = document.getElementById('add-form');
if (addFormElement) {
  addFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const year = Number(document.getElementById('addYear').value);
  const beefamilyId = Number(document.getElementById('addBeefamily').value);
  const honey = Number(document.getElementById('addHoney').value);
  const wax = Number(document.getElementById('addWax').value);
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:3000/productivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productivity_year: year,
        beefamily_id: beefamilyId,
        honey_kg: honey,
        wax_kg: wax
      })
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении записи');
    }

    // Закрыть модалку
    document.getElementById('addModal').style.display = 'none';

    // Очистить поля
    e.target.reset();

    // Обновить таблицу
    const data = await fetchProductivity();
    renderHoneyTable(data);
  } catch (error) {
    console.error('Ошибка при добавлении продукции:', error);
    alert('Ошибка при добавлении записи');
  }
});


}})
