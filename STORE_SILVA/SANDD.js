// Sample stocks data (you can replace this with your actual data)
let stocks = {
  "skinny-jeans-women": 50,
  "slim-fit-jeans-women": 30
};

// Function to update stocks and go to store
function updateStockAndGoToStore(item, newStock) {
  if (stocks[item] !== undefined) {
    stocks[item] = newStock;
    alert(`Stock for ${item} updated to ${newStock}`);
    // Redirect to store after updating
    window.location.href = "STORE3_SILVA.html"; // Change the URL to your store's page
  } else {
    alert("Item not found");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const updateBtn = document.getElementById("update-btn");
  const goToStoreBtn = document.getElementById("go-to-store-btn");
  const exitBtn = document.getElementById("exit-btn");
  const itemSelect = document.getElementById("item");
  const newStockInput = document.getElementById("new-stock");

  // Update button click event
  updateBtn.addEventListener("click", function() {
    const selectedItem = itemSelect.value;
    const newStock = parseInt(newStockInput.value);
    updateStockAndGoToStore(selectedItem, newStock);
  });

  // Go to Store button click event
  goToStoreBtn.addEventListener("click", function() {
    window.location.href = "STORE3_SILVA.html"; // Change the URL to your store's page
  });

  // Exit button click event
  exitBtn.addEventListener("click", function() {
    window.location.href = "STORE3_SILVA.html"; // Change the URL to your homepage or another appropriate page
  });
});
