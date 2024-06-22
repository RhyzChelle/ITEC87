document.addEventListener("DOMContentLoaded", function() {
  const header = document.getElementById('header');
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');

  function setActiveSection() {
    let foundActive = false;
    sections.forEach(section => {
      const bounding = section.getBoundingClientRect();
      if (
        bounding.top >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      ) {
        sections.forEach(s => s.classList.remove('active'));
        section.classList.add('active');
        foundActive = true;
      }
    });

    if (!foundActive) {
      sections.forEach(s => s.classList.remove('active'));
    }
  }

  function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - navbar.offsetHeight, // Adjusted to accommodate fixed navbar
        behavior: 'smooth'
      });
    }
  }

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });

  window.addEventListener('scroll', setActiveSection);
  setActiveSection();

  // Deselect all radio buttons on page load
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.checked = false;
  });
});

document.querySelector('.total').addEventListener('click', function() { 
  let total = 0; 
  let receipt = ''; 
  const selectedDishes = document.querySelectorAll('.dish-checkbox:checked'); 
  selectedDishes.forEach(dish => { 
    const quantity = parseInt(dish.parentElement.querySelector('.quantity').value); 
    const price = parseFloat(dish.getAttribute('data-price')); 
    total += quantity * price; 
    if (quantity > 0) { 
      receipt += `${dish.parentElement.querySelector('h2').textContent} x${quantity} = ₱${(quantity * price).toFixed(2)}\n`; 
    } 
    dish.parentElement.querySelector('.quantity').value = '0'; 
    dish.checked = false; 
  });

  const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value; 
  if (paymentMethod === 'card') { 
    total += 50.00; 
  } 

  const discountElement = document.querySelector('input[name="discount"]:checked');
  const discountPercentage = discountElement ? parseFloat(discountElement.value) : 0; 
  const discountedTotal = total * ((100 - discountPercentage) / 100); 
  const amountPaid = parseFloat(document.getElementById('amount-paid').value); 
  const change = amountPaid - discountedTotal; 

  document.getElementById('total-amount').textContent = `Total Amount: ₱${discountedTotal.toFixed(2)}`; 
  document.getElementById('change').textContent = `Change: ₱${change.toFixed(2)}`; 

  alert(`Receipt:\n${receipt}\nTotal: ₱${discountedTotal.toFixed(2)}\nChange: ₱${change.toFixed(2)}`); 
}); 

document.querySelectorAll('.quantity-btn').forEach(button => { 
  button.addEventListener('click', function() { 
    const action = this.getAttribute('data-action'); 
    const quantityInput = this.parentElement.querySelector('.quantity'); 
    let quantity = parseInt(quantityInput.value); 
    if (action === 'increase') { 
      quantity++; 
    } else if (action === 'decrease' && quantity > 0) { 
      quantity--; 
    } 
    quantityInput.value = quantity; 
  }); 
});
