let fakeServerDB = JSON.parse(localStorage.getItem("tasks")) || [];

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(fakeServerDB));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  fakeServerDB.forEach((task, index) => {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.className = "task-text" + (task.done ? " done" : "");
    taskText.textContent = task.text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onchange = () => toggleTaskDone(index, checkbox.checked);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";
    actionsDiv.appendChild(checkbox);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actionsDiv);

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return alert("Task cannot be empty.");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "fake-add-url", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const task = { text: taskText, done: false };
      fakeServerDB.push(task);
      saveToLocalStorage();
      renderTasks();
      input.value = "";
    }
  };

  xhr.send(JSON.stringify({ text: taskText }));
}

function toggleTaskDone(index, isDone) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "fake-update-status-url", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      fakeServerDB[index].done = isDone;
      saveToLocalStorage();
      renderTasks();
    }
  };

  xhr.send(JSON.stringify({ index, done: isDone }));
}

function deleteTask(index) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", "fake-delete-url", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      fakeServerDB.splice(index,1);
      saveToLocalStorage();
      renderTasks();
    }
  };

  xhr.send(JSON.stringify({ index }));
}

// Initial render
renderTasks();
