let fullData = [];

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/beefamilies', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const families = await response.json();
    fullData = families;

    const tableBody = document.querySelector('#beeFamilyTable tbody');
    tableBody.innerHTML = '';

    families.forEach((family, index) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${family.beefamily_number || '-'}</td>
        <td>${family.queen_birth_year || '-'}</td>

        <td>${family.queen_breed || '-'}</td>
        <td>${family.queen_line || '-'}</td>
        <td class="action-buttons">
          <button class="details-button" data-id="${family.beefamily_id}">Подробнее</button>
          <button class="edit-button" data-id="${family.beefamily_id}">Редактировать</button>
          <button class="delete-button" data-id="${family.beefamily_id}">Удалить</button>
        </td>
      `;

      // Обработчики
      row.querySelector('.details-button').addEventListener('click', () => {
        showDetailsModal(family);
      });

      row.querySelector('.edit-button').addEventListener('click', () => {
        showEditModal(family);
      });

      row.querySelector('.delete-button').addEventListener('click', () => {
        deleteFamily(family.beefamily_id);
      });

      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Ошибка при загрузке пчелиных семей:', error);
  }

  // Закрытие модальных окон по крестику
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  // Закрытие по клику вне модального окна
  window.addEventListener('click', event => {
    document.querySelectorAll('.modal').forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

// Подтверждение удаления
document.getElementById('confirm-delete').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  try {
    await fetch(`http://localhost:3000/beefamilies/${familyToDelete}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    document.getElementById('deleteModal').style.display = 'none';
    location.reload();
    // setTimeout(() => {location.reload();}, 5000); // для проверки консоли

  } catch (error) {
    console.error('Ошибка при удалении семьи:', error);
  }
});


// Модальное окно "Подробнее"
function showDetailsModal(family) {
  const modal = document.getElementById('detailsModal');
  modal.querySelector('.modal-content').innerHTML = `
    <span class="close-modal">&times;</span>
    <h3>Информация о семье</h3>
    <p><strong>Номер:</strong> ${family.beefamily_number}</p>
    <p><strong>Год рождения матки:</strong> ${family.queen_birth_year}</p>
    <p><strong>Порода:</strong> ${family.queen_breed}</p>
    <p><strong>Вид:</strong> ${family.queen_line}</p>
  `;
  modal.style.display = 'block';

  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
  });
}


// Модальное окно "Редактировать"
function showEditModal(family) {
  const modal = document.getElementById('editModal');
  modal.querySelector('#edit-beefamily-id').value = family.beefamily_id;
  modal.querySelector('#edit-beefamily-number').value = family.beefamily_number || '';
  modal.querySelector('#edit-queen-birth-year').value = family.queen_birth_year || '';
  modal.querySelector('#edit-mother-family').value = family.mother_family || '';
  modal.querySelector('#edit-queen-breed').value = family.queen_breed || '';
  modal.querySelector('#edit-queen-line').value = family.queen_line || '';
  modal.style.display = 'block';
}

// Модальное окно "Удалить"
let familyToDelete = null;

function deleteFamily(id) {
  familyToDelete = id;
  console.log('Удаление ID:', familyToDelete);
  document.getElementById('deleteModal').style.display = 'block';
}

document.getElementById('save-edit').addEventListener('click', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  const id = document.getElementById('edit-beefamily-id').value;

  const updatedData = {
    beefamily_number: document.getElementById('edit-beefamily-number').value,
    queen_birth_year: Number(document.getElementById('edit-queen-birth-year').value),
    mother_family: document.getElementById('edit-mother-family').value,
    queen_breed: document.getElementById('edit-queen-breed').value,
    queen_line: document.getElementById('edit-queen-line').value
  };

  try {
    await fetch(`http://localhost:3000/beefamilies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    });

    document.getElementById('editModal').style.display = 'none';
    location.reload(); // Перезагрузка таблицы
  } catch (error) {
    console.error('Ошибка при обновлении семьи:', error);
  }
})
// Открытие модалки
document.getElementById('addBeeFamilyBtn').addEventListener('click', () => {
  document.getElementById('addModal').style.display = 'block';
});

// Закрытие модалки
document.getElementById('add-close').addEventListener('click', () => {
  document.getElementById('addModal').style.display = 'none';
});

document.getElementById('add-bee-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');

  const newFamily = {
    beefamily_number: document.getElementById('add-beefamily-number').value,
    queen_birth_year: Number(document.getElementById('add-queen-birth-year').value),
    mother_family: document.getElementById('add-mother-family').value,
    queen_breed: document.getElementById('add-queen-breed').value,
    queen_line: document.getElementById('add-queen-line').value,
  };

  try {
    await fetch('http://localhost:3000/beefamilies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newFamily)
    });

    document.getElementById('addModal').style.display = 'none';
    location.reload();
  } catch (error) {
    console.error('Ошибка при добавлении семьи:', error);
  }
});



const filterKeySelect = document.getElementById('filter-key');
const filterValueSelect = document.getElementById('filter-value');

filterKeySelect.addEventListener('change', () => {
  const key = filterKeySelect.value;

  // Если выбран пункт "— Выберите параметр —"
  if (!key) {
    filterValueSelect.innerHTML = '<option value="">— Сначала выберите параметр —</option>';
    filterValueSelect.disabled = true;
    renderTable(fullData); // вернуть полную таблицу
    return;
  }

  // Получаем уникальные значения по выбранному полю
  const uniqueValues = [...new Set(fullData.map(f => f[key]).filter(Boolean))];

  filterValueSelect.disabled = false;
  filterValueSelect.innerHTML = '<option value="">— Выберите значение —</option>' +
    uniqueValues.map(v => `<option value="${v}">${v}</option>`).join('');
});

// Обработка второго фильтра
filterValueSelect.addEventListener('change', () => {
  const key = filterKeySelect.value;
  const value = filterValueSelect.value;

  const filteredData = value
    ? fullData.filter(f => `${f[key]}` === value)
    : fullData;

  renderTable(filteredData);
});

filterValueSelect.addEventListener('change', () => {
  const key = filterKeySelect.value;
  const value = filterValueSelect.value;

  const filtered = !value ? fullData : fullData.filter(f => `${f[key]}` === value);
  renderTable(filtered);
});

function renderTable(families) {
  const tableBody = document.querySelector('#beeFamilyTable tbody');
  tableBody.innerHTML = '';

  families.forEach((family, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${family.beefamily_number || '-'}</td>
      <td>${family.queen_birth_year || '-'}</td>

      <td>${family.queen_breed || '-'}</td>
      <td>${family.queen_line || '-'}</td>
      <td class="action-buttons">
        <button class="details-button" data-id="${family.beefamily_id}">Подробнее</button>
        <button class="edit-button" data-id="${family.beefamily_id}">Редактировать</button>
        <button class="delete-button" data-id="${family.beefamily_id}">Удалить</button>
      </td>
    `;

    // Повторно навесить обработчики:
    row.querySelector('.details-button').addEventListener('click', () => showDetailsModal(family));
    row.querySelector('.edit-button').addEventListener('click', () => showEditModal(family));
    row.querySelector('.delete-button').addEventListener('click', () => deleteFamily(family.beefamily_id));

    tableBody.appendChild(row);
  });
}

})
