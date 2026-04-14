import { save, load } from "./storage.js";

const STORAGE_KEY = "state";

export const state = {
    todos: [],
    filter: "all"
};

export function loadState() {
    const saved = load(STORAGE_KEY, null);
    if (saved) {
        state.todos = saved.todos || [];
        state.filter = saved.filter || "all";
    }
}

export function saveState() {
    save(STORAGE_KEY, state);
}

export function setState(newState) {
    Object.assign(state, newState);
    saveState();
}