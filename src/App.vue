<template>
  <form @submit="addTask">
    <input type="text" placeholder="Ajouter une tâche" v-model="newTask"/>
    <button>Add Task</button>
  </form>

  <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

  <p v-if="taskList.task.length === 0">Vous n'avez aucune tâche !</p>
  <div v-else>
    <ul>
      <li v-for="(task, index) in taskList.task" :key="index">
        <label>
          <input type="checkbox" v-model="selectedTasks" :value="index" />
          <span :class="{ completed: selectedTasks.includes(index) }">
            {{ task }}
          </span>
        </label>
      </li>
    </ul>
  </div>  
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>

<script setup>
import { ref } from 'vue';

// Variables
const taskList = ref({ task: [] });
const newTask = ref('');
const selectedTasks = ref([]);
const errorMessage = ref('');

// Fonction pour ajouter une tâche
const addTask = (event) => {
  event.preventDefault();
  
  if (newTask.value.trim() === '') {
    errorMessage.value = "Veuillez entrer une tâche valide !";
    return;
  }

  taskList.value.task.push(newTask.value);
  newTask.value = '';
  errorMessage.value = '';
};
</script>