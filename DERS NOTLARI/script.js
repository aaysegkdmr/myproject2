document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const noteInput = document.getElementById("note");
    const todosInput = document.getElementById("todos");
    const addButton = document.getElementById("add");
    const taskList = document.getElementById("task-list");

    addButton.addEventListener("click", function() {
        const taskText = taskInput.value;
        const noteText = noteInput.value;
        const todosText = todosInput.value;

        if (taskText.trim() !== "" && noteText.trim() !== "" && todosText.trim() !== "") {
            const taskItem = document.createElement("div");
            taskItem.innerHTML = `
                <div>
                    <span>Ders Adı: ${taskText}</span>
                    <span>Not: ${noteText}</span>
                </div>
                <div class="todos">
                    Hedefler:
                    <ul>
                        ${createTodosList(todosText)}
                    </ul>
                </div>
                <button class="update">Güncelle</button>
                <button class="delete">Sil</button>
            `;
            taskList.appendChild(taskItem);
            taskInput.value = "";
            noteInput.value = "";
            todosInput.value = "";
        }
    });

    taskList.addEventListener("click", function(event) {
        const target = event.target;

        if (target.classList.contains("delete")) {
            const taskItem = target.parentElement;
            taskList.removeChild(taskItem);
        } else if (target.classList.contains("update")) {
            const taskItem = target.parentElement;
            const spans = taskItem.getElementsByTagName("span");
            taskInput.value = spans[0].textContent.slice(10);
            noteInput.value = spans[1].textContent.slice(5);
            const todosList = taskItem.querySelector("ul").children;
            todosInput.value = getTodosFromList(todosList);
            taskList.removeChild(taskItem);
        }
    });
});

function createTodosList(todosText) {
    const todosList = todosText.split(",");
    let listHTML = "";
    for (const todo of todosList) {
        listHTML += `
            <li>
                <input type="checkbox">
                <span>${todo.trim()}</span>
            </li>
        `;
    }
    return listHTML;
}

function getTodosFromList(todosList) {
    const todosArray = [];
    for (const todo of todosList) {
        todosArray.push(todo.querySelector("span").textContent);
    }
    return todosArray.join(", ");
}
