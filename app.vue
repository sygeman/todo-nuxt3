<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useTodoStore } from "~/todo.store";
import { CalendarIcon, XIcon } from "@heroicons/vue/outline";

const store = useTodoStore();
const { todos } = storeToRefs(store);
const { addTodo, removeTodo, toggleTodoDone } = store;

const description = ref("");

function createTodo() {
  if (description.value.length > 0) {
    addTodo(description.value);
    description.value = "";
  }
}
</script>

<template>
  <div
    class="bg-slate-900 text-white absolute w-full h-full flex items-center justify-center"
  >
    <div class="bg-slate-800 w-80 rounded-lg overflow-hidden">
      <div class="bg-slate-700 px-4 py-2 flex items-center">
        <CalendarIcon class="h-4 text-slate-400" />
        <div class="ml-2">Today</div>
      </div>
      <div class="p-2">
        <div
          :key="todo.id"
          v-for="todo in todos"
          @click="toggleTodoDone(todo.id)"
          class="flex group items-start justify-between cursor-pointer px-2 py-1 hover:bg-slate-900/50 rounded"
        >
          <div :class="{ 'line-through text-white/50': todo.done }">
            {{ todo.text }}
          </div>
          <button
            class="hidden group-hover:flex hover:bg-slate-900 h-6 w-6 items-center justify-center rounded"
            @click="removeTodo(todo.id)"
          >
            <XIcon class="h-4" />
          </button>
        </div>
      </div>
      <div class="px-2 pb-2">
        <input
          class="bg-slate-900 px-2 py-1 ring-0 outline-none rounded w-full"
          placeholder="Type description"
          autofocus
          v-model="description"
          @keyup.enter="createTodo"
        />
      </div>
    </div>
  </div>
</template>
