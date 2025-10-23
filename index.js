const toDoList = document.querySelector(".to-do-list");
const completedList = document.querySelector(".completed-list");
const input = document.getElementById("input");

let tasks = JSON.parse(localStorage.getItem("tasks-list") || "[]");
let completed = JSON.parse(localStorage.getItem("completed-list") || "[]");

function setItems() {
  localStorage.setItem("tasks-list", JSON.stringify(tasks));
  localStorage.setItem("completed-list", JSON.stringify(completed));
}

function render() {
  toDoList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.map((task) => {
    toDoList.innerHTML += `
          <li>- ${task}
                    <div class="btns">
                    <button onclick="completedTask('${task}')">Mark Complete</button>
                    <button onclick="deleteTask('${task}')">Delete</button>
                    </div>
                  </li>`;
  });

  completed.map((task) => {
    completedList.innerHTML += 
    `<li>- ${task}
              <div class="btns">
                <button onclick="markIncomplete('${task}')">Mark Incomplete</button>
                <button onclick="deleteCompleted('${task}')">Delete</button>
              </div>
            </li>`;
  });
}

function inputEnter(event) {
  tasks.push(event.target.value);
  input.value = "";
  setItems();
  render();
}

function deleteTask(task) {
  tasks = tasks.filter(taskname => taskname !==`${task}`);
  setItems();
  render();
}

function deleteCompleted(task) {
  completed = completed.filter(taskname => taskname !==`${task}`);
  setItems();
  render();
}

function completedTask(task) {
  deleteTask(task);
  completed.push(task);
  setItems();
  render();
}

function markIncomplete(task) {
  deleteCompleted(task);
  tasks.push(task);
  setItems();
  render();
}

render();
