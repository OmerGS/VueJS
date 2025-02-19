<template>
  <div class="container">
    <!-- Formulaire pour ajouter une tâche -->
    <form @submit="addTask" class="task-form">
      <input type="text" v-model="newTaskTitle" placeholder="Title of the task" class="task-input" />
      <textarea v-model="newTaskDescription" placeholder="Add a description (optional)" class="task-description"></textarea>
      <button type="submit" class="add-button">Add Task</button>
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <p v-if="taskList.length === 0" class="empty-message">You don't have any tasks!</p>

    <ul v-else class="task-list">
      <li v-for="(task, index) in taskList" :key="index" class="task-item">
        <label class="task-label">
          <input type="checkbox" v-model="task.completed" class="task-checkbox" />
          <div class="task-content">
            <span :class="{ completed: task.completed }" class="task-text">
              {{ task.title }}
            </span>
            <p v-if="task.description" class="task-description-text">
              {{ task.description }}
            </p>
          </div>
        </label>
        <button @click="removeTask(index)" class="remove-button">❌</button>
      </li>
    </ul>

    <!-- Grille d'éléments supplémentaires -->
    <div class="grid-container">
      <div v-for="(item, index) in items" :key="index" class="grid-item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Variables réactives
const taskList = ref([]);
const newTaskTitle = ref('');
const newTaskDescription = ref('');
const errorMessage = ref('');
const items = ref(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8"]);

// Fonction pour ajouter une tâche
const addTask = (event) => {
  event.preventDefault();

  if (newTaskTitle.value.trim() === '') {
    errorMessage.value = "Veuillez entrer une tâche valide !";
    return;
  }

  taskList.value.push({
    title: newTaskTitle.value,
    description: newTaskDescription.value.trim() || 'Aucune description',
    completed: false,
  });

  newTaskTitle.value = '';
  newTaskDescription.value = '';
  errorMessage.value = '';
};

const removeTask = (index) => {
  taskList.value.splice(index, 1);
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.task-form {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.task-input, .task-description {
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.add-button {
  background-color: #3a8e6f;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
  margin-top: 20px;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
}

.task-checkbox {
  margin-right: 10px;
}

.task-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.task-description-text {
  font-size: 14px;
  color: #888;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.remove-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  padding: 20px;
}

.grid-item {
  background: #3498db;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  font-weight: bold;
}
</style>
