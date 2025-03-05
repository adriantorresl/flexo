// Función para abrir el modal
function openModal(title, description, price) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
  
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalPrice.textContent = `Price: ${price}`;
    modal.style.display = 'flex';
  }
  
  // Función para cerrar el modal
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
  
  // Cerrar el modal si se hace clic fuera del contenido
  window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };