import { state } from "./state.js";
import { toggleTodo, deleteTodo } from "./app.js";

export function renderTodos() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    let filtered = state.todos;

    if (state.filter === "completed") {
        filtered = filtered.filter(t => t.completed);
    } else if (state.filter === "active") {
        filtered = filtered.filter(t => !t.completed);
    }

    filtered.forEach(todo => {
        const li = document.createElement("li");

        li.textContent = todo.text;
        li.className = todo.completed ? "completed" : "";

        // ✅ DONE BUTTON
        const doneBtn = document.createElement("button");
        doneBtn.textContent = todo.completed ? "Undo" : "Done";
        doneBtn.className = "done-btn";

        doneBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleTodo(todo.id);
        });

        // ❌ DELETE BUTTON
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "delete-btn";

        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        });

        li.appendChild(doneBtn);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}