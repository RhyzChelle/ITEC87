document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Active link switching
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 60; // Adjust for fixed header
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Quantity buttons functionality
  document.querySelectorAll('.quantity-btn').forEach(button => {
    button.addEventListener('click', function() {
      const action = this.dataset.action;
      const input = this.parentNode.querySelector('.quantity');
      let value = parseInt(input.value);

      if (action === 'increase') {
        input.value = value + 1;
      } else if (action === 'decrease' && value > 0) {
        input.value = value - 1;
      }
    });
  });

  // Calculate total
  document.querySelector('.total').addEventListener('click', function() {
    let total = 0;
    let discount = 0;

    document.querySelectorAll('.dish-checkbox:checked').forEach(checkbox => {
      const quantity = parseInt(checkbox.parentNode.querySelector('.quantity').value);
      const price = parseFloat(checkbox.dataset.price);
      total += quantity * price;
    });

    document.querySelectorAll('input[name="discount"]').forEach(discountOption => {
      if (discountOption.checked) {
        discount = parseFloat(discountOption.value);
      }
    });

    total = total - (total * (discount / 100));
    const amountPaid = parseFloat(document.getElementById('amount-paid').value || 0);
    const change = amountPaid - total;

    document.getElementById('total-amount').textContent = `Total Amount: ₱${total.toFixed(2)}`;
    document.getElementById('change').textContent = `Change: ₱${change.toFixed(2)}`;
  });
});
