<script setup>
import { ref, onMounted } from "vue";

const acf = ref({});
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch("https://omer.zagzig.fr/wp-json/wp/v2/recette");
    const articles = await response.json();
    if (Array.isArray(articles) && articles.length > 0) {
      acf.value = articles[0].acf || {};
    }
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des données:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h1>Page Générée pour recette</h1>
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <p><strong>Nom:</strong> {{ acf.Nom }}</p>
    <p><strong>description:</strong> {{ acf.description }}</p>
    <p><strong>categorie:</strong> {{ acf.categorie }}</p>
    <p><strong>image:</strong> {{ acf.image }}</p>
    <p><strong>difficulte:</strong> {{ acf.difficulte }}</p>
    <p><strong>temps:</strong> {{ acf.temps }}</p>
    </div>
  </div>
</template>