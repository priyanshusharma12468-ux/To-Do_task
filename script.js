
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


let todos = JSON.parse(localStorage.getItem("todos")) || [];


renderTodos();


addBtn.addEventListener("click", addTodo);


taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});


function addTodo() {
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    todos.push({
        text: task,
        completed: false
    });

    saveTodos();
    renderTodos();

    taskInput.value = "";
    taskInput.focus();
}


function renderTodos() {
    taskList.innerHTML = "";

    todos.forEach((todo, index) => {

        const li = document.createElement("li");
        li.className = "task";

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="left">
                <input type="checkbox" ${todo.completed ? "checked" : ""}>
                <span>${todo.text}</span>
            </div>

            <div class="right">
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </div>
        `;

        
        const checkbox = li.querySelector("input");
        checkbox.addEventListener("change", function () {
            todos[index].completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        
        const editBtn = li.querySelector(".editBtn");
        editBtn.addEventListener("click", function () {

            const updatedTask = prompt("Edit your task:", todo.text);

            if (updatedTask !== null && updatedTask.trim() !== "") {
                todos[index].text = updatedTask.trim();
                saveTodos();
                renderTodos();
            }

        });

        
        const deleteBtn = li.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", function () {

            if (confirm("Delete this task?")) {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            }

        });

        taskList.appendChild(li);

    });
}


function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}