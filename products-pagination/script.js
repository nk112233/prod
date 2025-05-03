const products = [
    {
      image: "https://via.placeholder.com/80",
      name: "Wireless Headphones",
      price: "₹7,999",
      description: "Noise-cancelling over-ear headphones."
    },
    {
      image: "https://via.placeholder.com/80",
      name: "Smartwatch",
      price: "₹12,999",
      description: "Fitness tracking smartwatch."
    },
    {
      image: "https://via.placeholder.com/80",
      name: "Gaming Mouse",
      price: "₹2,499",
      description: "Ergonomic gaming mouse."
    },
    {
      image: "https://via.placeholder.com/80",
      name: "Laptop Stand",
      price: "₹1,999",
      description: "Adjustable aluminium stand."
    },
    // Adding extra dummy products to show pagination working
    {
      image: "https://via.placeholder.com/80",
      name: "Bluetooth Speaker",
      price: "₹3,499",
      description: "Portable wireless speaker."
    },
    {
      image: "https://via.placeholder.com/80",
      name: "USB-C Hub",
      price: "₹2,199",
      description: "Multiport adapter for laptops."
    },
    {
      image: "https://via.placeholder.com/80",
      name: "Webcam",
      price: "₹4,499",
      description: "HD webcam for video calls."
    },
    {
      image: "https://via.placeholder.com/80",
      name: "Mechanical Keyboard",
      price: "₹6,499",
      description: "RGB backlit mechanical keyboard."
    },
    {
      image: "https://via.placeholder.com/80",
      name: "External Hard Drive",
      price: "₹5,999",
      description: "1TB portable external hard drive."
    },
    {
      image: "https://via.placeholder.com/80",
      name: "Wireless Charger",
      price: "₹1,499",
      description: "Fast charging wireless pad."
    },
    {
      image: "https://via.placeholder.com/80",
      name: "Noise Cancelling Earbuds",
      price: "₹8,999",
      description: "Compact noise-cancelling earbuds."
    },
  ];
  
  const productsPerPage = 10;
  let currentPage = 1;
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  function renderProducts() {
    const productBody = document.getElementById('productBody');
    productBody.innerHTML = '';
  
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = products.slice(start, end);
  
    productsToShow.forEach(product => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td data-label="Product Image"><img src="${product.image}" alt="${product.name}"></td>
        <td data-label="Product">${product.name}</td>
        <td data-label="Price (INR ₹)">${product.price}</td>
        <td data-label="Description">${product.description}</td>
      `;
  
      productBody.appendChild(row);
    });
  
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
  
    document.querySelector('.pagination button:first-child').disabled = currentPage === 1;
    document.querySelector('.pagination button:last-child').disabled = currentPage === totalPages;
  }
  
  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
    }
  }
  
  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
    }
  }
  
  window.onload = renderProducts;
  