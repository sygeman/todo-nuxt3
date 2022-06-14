import { defineStore } from "pinia";
import { nanoid } from "nanoid";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    todos: [
      { id: nanoid(), text: "First Todo", done: false },
      { id: nanoid(), text: "Second Todo", done: true },
    ],
  }),
  getters: {
    allTodos: (state) => state.todos,
  },
  actions: {
    addTodo(text: string) {
      this.todos = [...this.todos, { id: nanoid(), text, done: false }];
    },
    removeTodo(id: string) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    toggleTodoDone(id: string) {
      this.todos = this.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
    },
  },
});
