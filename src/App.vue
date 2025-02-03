<template>
  <form @submit="addTask" class="task-form">
    <input type="text" placeholder="Ajouter une tâche" v-model="newTaskTitle" class="task-input"/>
    <textarea v-model="newTaskDescription" placeholder="Ajouter une description (facultatif)" class="task-description"></textarea>
    <button class="add-button">Add Task</button>
  </form>

  <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

  <p v-if="taskList.task.length === 0" class="empty-message">Vous n'avez aucune tâche !</p>
  
  <div v-else>
    <ul class="task-list">
      <li v-for="(task, index) in taskList.task" :key="index" class="task-item">
        <label class="task-label">
          <input type="checkbox" v-model="selectedTasks" :value="index" class="task-checkbox" />
          <div class="task-content">
            <span :class="{ completed: selectedTasks.includes(index) }" class="task-text">
              {{ task.title }}
            </span>
            <p v-if="task.description" class="task-description-text">
              {{ task.description }}
            </p>
          </div>
        </label>
      </li>
    </ul>
  </div>  
</template>

<style scoped>
/* Style général */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f7f6;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.task-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-input, .task-description {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.task-input:focus, .task-description:focus {
  border-color: #3a8e6f;
  box-shadow: 0 0 5px rgba(58, 142, 111, 0.3);
}

.add-button {
  background-color: #3a8e6f;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #337f60;
}

.error-message {
  color: red;
  font-size: 14px;
}

.empty-message {
  color: #666;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 12px;
  margin: 5px 0;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.task-item:hover {
  background-color: #f1f1f1;
}

.task-label {
  display: flex;
  align-items: center;
  width: 100%;
}

.task-checkbox {
  margin-right: 15px;
  transform: scale(1.2);
}

.task-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.task-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.task-description-text {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}
</style>

<script setup>
import { ref } from 'vue';

// Variables
const taskList = ref({ task: [] });
const newTaskTitle = ref('');
const newTaskDescription = ref('');
const selectedTasks = ref([]);
const errorMessage = ref('');


// Fonction
const addTask = (event) => {
  event.preventDefault();
  
  if (newTaskTitle.value.trim() === '') {
    errorMessage.value = "Veuillez entrer une tâche valide !";
    return;
  }

  taskList.value.task.push({
    title: newTaskTitle.value,
    description: newTaskDescription.value.trim() || 'Aucune description',
  });

  newTaskTitle.value = '';
  newTaskDescription.value = '';
  errorMessage.value = '';
};
</script>