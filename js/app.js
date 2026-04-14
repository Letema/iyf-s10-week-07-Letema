import { state, loadState, setState } from "./state.js";
import { renderTodos } from "./ui.js";
import { generateId } from "./utils.js";

loadState();
renderTodos();

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const filter = document.getElementById("filter");

export function addTodo(text) {
    const newTodo = {
        id: generateId(),
        text: text,
        completed: false
    };

    setState({
        todos: [...state.todos, newTodo]
    });

    renderTodos();
}

export function toggleTodo(id) {
    const updated = state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setState({ todos: updated });
    renderTodos();
}

export function deleteTodo(id) {
    const updated = state.todos.filter(todo => todo.id !== id);

    setState({ todos: updated });
    renderTodos();
}

addBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    addTodo(input.value);
    input.value = "";
});

filter.addEventListener("change", (e) => {
    setState({ filter: e.target.value });
    renderTodos();
});