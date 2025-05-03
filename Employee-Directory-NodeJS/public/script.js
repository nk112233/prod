// Fetch employees from API
fetch('/api/employees')
  .then(response => response.json())
  .then(employees => {
    const container = document.getElementById('employee-list');

    employees.forEach(emp => {
      const card = document.createElement('div');
      card.className = 'employee-card';
      card.innerHTML = `
        <img src="${emp.profileImage}" alt="${emp.name}">
        <h3>${emp.name}</h3>
        <p><strong>${emp.designation}</strong></p>
        <p>Department: ${emp.department}</p>
        <p>Salary: ₹${emp.salary.toLocaleString()}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Error loading employees:', err);
  });
