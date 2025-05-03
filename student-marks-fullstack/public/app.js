function loadStudents() {
  fetch('/api/students')
    .then(res => res.json())
    .then(data => {
      document.getElementById('title').textContent = `Total Students: ${data.count}`;
      displayStudents(data.students);
    });
}

function loadDSBDAStudents() {
  fetch('/api/students/dsbda')
    .then(res => res.json())
    .then(data => {
      document.getElementById('title').textContent = 'Students with DSBDA > 20';
      displayStudents(data);
    });
}

function loadTopperStudents() {
  fetch('/api/students/topper')
    .then(res => res.json())
    .then(data => {
      document.getElementById('title').textContent = 'Students with >25 in All Subjects';
      displayStudents(data);
    });
}

function loadWeakStudents() {
  fetch('/api/students/weak')
    .then(res => res.json())
    .then(data => {
      document.getElementById('title').textContent = 'Weak Students (Maths & Science < 40)';
      displayStudents(data);
    });
}

function displayStudents(students) {
  const tableBody = document.getElementById('student-table-body');
  tableBody.innerHTML = '';

  students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.roll_no}</td>
      <td>${student.WAD_Marks}</td>
      <td>${student.CC_Marks}</td>
      <td>${student.DSBDA_Marks}</td>
      <td>${student.CNS_Marks}</td>
      <td>${student.AI_Marks}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="updateMarks('${student.name}')">Update Marks</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.name}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function updateMarks(name) {
  if (confirm(`Add +10 marks to ${name}?`)) {
    fetch(`/api/students/update/${encodeURIComponent(name)}`, {
      method: 'PUT'
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      loadStudents();
    });
  }
}

function deleteStudent(name) {
  if (confirm(`Delete ${name}?`)) {
    fetch(`/api/students/${encodeURIComponent(name)}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      loadStudents();
    });
  }
}

// Initially load students
loadStudents();
