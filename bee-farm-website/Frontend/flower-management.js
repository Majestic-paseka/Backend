document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'http://localhost:3000/flowers';
  let currentFlowerId = null;

  const toISODate = (dateStr) => new Date(dateStr).toISOString();

  const tbody = document.querySelector('table tbody');
  const addModal = document.getElementById('modal-flower');
  const editModal = document.getElementById('edit-flower-modal');
  const deleteModal = document.getElementById('delete-modal');
  const detailsModal = document.getElementById('details-flower-modal');

  const addForm = document.getElementById('add-flower-form');
  const editForm = document.getElementById('edit-flower-form');

  // ================= ЗАГРУЗКА ДАННЫХ =================
  async function loadFlowers() {
    const formatDate = isoStr => {
        return new Date(isoStr).toISOString().split('T')[0];
    };

    const res = await fetch(API_URL);
    const data = await res.json();
    tbody.innerHTML = '';
    data.forEach(flower => {
      const row = document.createElement('tr');
      row.dataset.plantId = flower.plant_id;
      row.dataset.plantName = flower.plant_name;
      row.dataset.plantSpecies = flower.plant_species;
      row.dataset.honeyPrice = flower.honey_price;
      row.dataset.startBlooming = flower.start_blooming;
      row.dataset.endBlooming = flower.end_blooming;
      row.dataset.purposeOfSowing = flower.purpose_of_sowing;
      row.dataset.honeyProductivity = flower.honey_productivity;

      row.innerHTML = `
        <td>${flower.plant_name}</td>
        <td>${flower.plant_species}</td>
        <td>${flower.honey_price}</td>
        <td>${formatDate(flower.start_blooming)}</td>
        <td>${formatDate(flower.end_blooming)}</td>
        <td>${flower.purpose_of_sowing}</td>
        <td>${flower.honey_productivity}</td>
        <td>
          <button class="details-button">Подробнее</button>
          <button class="edit-button">Редактировать</button>
          <button class="delete-button">Удалить</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
    // ✖ Клик вне модалки
    window.addEventListener('click', e => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) modal.style.display = 'none';
    });
    });
  // ================= ДОБАВЛЕНИЕ =================
  document.querySelector('.add-button').addEventListener('click', () => {
    addModal.style.display = 'block';
  });

  document.getElementById('close-flower-modal').addEventListener('click', () => {
    addModal.style.display = 'none';
  });

    addForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(addForm);

    const newFlower = {
    plant_name: formData.get('flowerType'),
    plant_species: formData.get('plantSpecies'),
    honey_price: parseFloat(formData.get('honeyPrice')),
    start_blooming: toISODate(formData.get('sowingDate')),
    end_blooming: toISODate(formData.get('bloomDate')),
    purpose_of_sowing: formData.get('purposeOfSowing'),
    honey_productivity: parseFloat(formData.get('honeyProductivity'))
    };


    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFlower)
    });

    addModal.style.display = 'none';
    addForm.reset();
    loadFlowers();
    });

  // ================= РЕДАКТИРОВАНИЕ =================
  tbody.addEventListener('click', e => {
    if (e.target.classList.contains('edit-button')) {
      const row = e.target.closest('tr');
      document.getElementById('edit-plant-id').value = row.dataset.plantId;
      document.getElementById('edit-plant-name').value = row.dataset.plantName;
      document.getElementById('edit-plant-species').value = row.dataset.plantSpecies;
      document.getElementById('edit-honey-price').value = row.dataset.honeyPrice;
      document.getElementById('edit-start-blooming').value = row.dataset.startBlooming.split('T')[0];
      document.getElementById('edit-end-blooming').value = row.dataset.endBlooming.split('T')[0];
      document.getElementById('edit-purpose-of-sowing').value = row.dataset.purposeOfSowing;
      document.getElementById('edit-honey-productivity').value = row.dataset.honeyProductivity;

      currentFlowerId = row.dataset.plantId;
      editModal.style.display = 'block';
    }
  });

  document.getElementById('edit-flower-close-button').addEventListener('click', () => {
    editModal.style.display = 'none';
  });

  editForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(editForm);
    const updatedFlower = {
    plant_name: formData.get('plant_name'),
    plant_species: formData.get('plant_species'),
    honey_price: parseFloat(formData.get('honey_price')),
    start_blooming: new Date(formData.get('start_blooming')).toISOString(),
    end_blooming: new Date(formData.get('end_blooming')).toISOString(),
    purpose_of_sowing: formData.get('purpose_of_sowing'),
    honey_productivity: parseFloat(formData.get('honey_productivity'))
    };
    if (!formData.get('start_blooming') || !formData.get('end_blooming')) {
        alert('Пожалуйста, укажите даты цветения');
        return;
    }


    await fetch(`${API_URL}/${currentFlowerId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFlower)
    });

    editModal.style.display = 'none';
    loadFlowers();
  });

  // ================= УДАЛЕНИЕ =================
  let flowerIdToDelete = null;

  tbody.addEventListener('click', e => {
    if (e.target.classList.contains('delete-button')) {
      const row = e.target.closest('tr');
      flowerIdToDelete = parseInt(row.dataset.plantId);
      console.log('ID к удалению:', flowerIdToDelete);
      deleteModal.style.display = 'block';
    }
  });

  document.getElementById('delete-close-button').addEventListener('click', () => {
    deleteModal.style.display = 'none';
  });

  document.getElementById('cancel-delete').addEventListener('click', () => {
    deleteModal.style.display = 'none';
  });

  document.getElementById('confirm-delete').addEventListener('click', async () => {
    await fetch(`${API_URL}/${flowerIdToDelete}`, { method: 'DELETE' });
    deleteModal.style.display = 'none';
    loadFlowers();
  });

  // ================= ПОДРОБНОСТИ =================
  tbody.addEventListener('click', e => {
    if (e.target.classList.contains('details-button')) {
      const row = e.target.closest('tr');
      document.getElementById('detail-plant-id').textContent = row.dataset.plantId;
      document.getElementById('detail-plant-name').textContent = row.dataset.plantName;
      document.getElementById('detail-plant-species').textContent = row.dataset.plantSpecies;
      document.getElementById('detail-honey-price').textContent = row.dataset.honeyPrice;
      document.getElementById('detail-start-blooming').textContent = row.dataset.startBlooming.split('T')[0];;
      document.getElementById('detail-end-blooming').textContent = row.dataset.endBlooming.split('T')[0];;
      document.getElementById('detail-purpose-of-sowing').textContent = row.dataset.purposeOfSowing;
      document.getElementById('detail-honey-productivity').textContent = row.dataset.honeyProductivity;
      detailsModal.style.display = 'block';
    }
  });

  document.getElementById('details-flower-close-button').addEventListener('click', () => {
    detailsModal.style.display = 'none';
  });

  // ================= ФИЛЬТРЫ =================
document.getElementById('universal-filter').addEventListener('input', function () {
  const filterValue = this.value.toLowerCase();
  Array.from(tbody.rows).forEach(row => {
    const rowText = row.innerText.toLowerCase();
    row.style.display = rowText.includes(filterValue) ? '' : 'none';
  });
});

  loadFlowers();
});
