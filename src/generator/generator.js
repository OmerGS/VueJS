import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const endpoint = process.argv[2];

if (!endpoint) {
  console.error("❌ Veuillez fournir un endpoint API !");
  process.exit(1);
}

const apiUrl = `https://omer.zagzig.fr/wp-json/wp/v2/${endpoint}`;

async function fetchACFData() {
  try {
    console.log(`🔍 Récupération des données ACF depuis ${apiUrl}...`);
    const response = await fetch(apiUrl);
    const articles = await response.json();

    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error("Aucun article trouvé !");
    }

    const acfData = articles[0].acf;
    if (!acfData) {
      throw new Error("Pas de champs ACF trouvés !");
    }

    return acfData;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des données ACF:", error);
    process.exit(1);
  }
}

async function generateVueComponent() {
  const acfData = await fetchACFData();
  
  const fields = Object.keys(acfData).map(key => {
    return `<p><strong>${key}:</strong> {{ acf.${key} }}</p>`;
  }).join('\n    ');

  const componentTemplate = `
<script setup>
import { ref, onMounted } from "vue";

const acf = ref({});
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch("${apiUrl}");
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
    <h1>Page Générée pour ${endpoint}</h1>
    <div v-if="loading">Chargement...</div>
    <div v-else>
      ${fields}
    </div>
  </div>
</template>
  `;

  const dirPath = path.join(process.cwd(), 'pages');
  const filePath = path.join(dirPath, `${endpoint}.vue`);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, componentTemplate.trim());
  console.log(`✅ Fichier Vue.js généré: ${filePath}`);
}

generateVueComponent();