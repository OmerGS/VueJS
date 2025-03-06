<template>
  <div class="container">
    <h1>Recettes</h1>

    <div class="filters">
      <label for="sortTime">Trier par temps :</label>
      <select id="sortTime" v-model="selectedSortTime" @change="sortRecipes">
        <option value="default">Par défaut</option>
        <option value="asc">Temps croissant</option>
        <option value="desc">Temps décroissant</option>
      </select>

      <label for="sortCategory">Filtrer par catégorie :</label>
      <select id="sortCategory" v-model="selectedCategory" @change="filterRecipes">
        <option value="all">Toutes les catégories</option>
        <option v-for="(name, id) in categories" :key="id" :value="id">{{ name }}</option>
      </select>

      <label for="sortDifficulty">Filtrer par difficulté :</label>
      <select id="sortDifficulty" v-model="selectedDifficulty" @change="filterRecipes">
        <option value="all">Toutes les difficultés</option>
        <option v-for="(name, id) in difficulte" :key="id" :value="id">{{ name }}</option>
      </select>
    </div>

    <div v-if="loading" class="loading">
      <p>Chargement des recettes...</p>
    </div>

    <div v-else class="grid">
      <div v-for="article in filteredArticles" :key="article.id" class="card">
        <div class="image-container">
          <img v-if="article.image" :src="article.image" alt="Image de la recette" />
        </div>

        <div class="content">
          <h2>{{ article.acf.Nom || 'Nom non disponible' }}</h2>
          <p class="description">{{ article.acf.description || 'Aucune description disponible.' }}</p>

          <div class="details">
            <p><strong>Temps :</strong> {{ article.acf.temps || 'Non précisé' }} min</p>
            <p><strong>Difficulté :</strong> {{ difficulte[article.acf.difficulte] || 'Non précisé' }}</p>
            <p><strong>Catégorie :</strong> {{ categories[article.acf.categorie] || 'Non classé' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      filteredArticles: [],
      categories: {},
      difficulte: {},
      loading: true,
      selectedSortTime: "default",
      selectedCategory: "all",
      selectedDifficulty: "all",
    };
  },

  methods: {
    async fetchArticles() {
      try {
        const response = await fetch('https://omer.zagzig.fr/wp-json/wp/v2/recette?_embed');
        const data = await response.json();

        this.articles = await Promise.all(
          data.map(async (article) => {
            const imageUrl = await this.getImageUrl(article.acf.image);
            return {
              id: article.id,
              acf: article.acf || {},
              image: imageUrl,
            };
          })
        );

        this.filteredArticles = [...this.articles];
        this.loading = false;
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes', error);
        this.loading = false;
      }
    },

    async fetchCategories() {
      try {
        const response = await fetch('https://omer.zagzig.fr/wp-json/wp/v2/categorie');
        const data = await response.json();

        this.categories = data.reduce((acc, category) => {
          acc[category.id] = category.name;
          return acc;
        }, {});
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    },

    async fetchDifficultes() {
      try {
        const response = await fetch('https://omer.zagzig.fr/wp-json/wp/v2/difficulte');
        const data = await response.json();

        this.difficulte = data.reduce((acc, diff) => {
          acc[diff.id] = diff.name;
          return acc;
        }, {});
      } catch (error) {
        console.error('Erreur lors de la récupération des niveaux de difficulté', error);
      }
    },

    async getImageUrl(imageId) {
      if (!imageId) return '';

      try {
        const response = await fetch(`https://omer.zagzig.fr/wp-json/wp/v2/media/${imageId}`);
        const data = await response.json();

        return data.source_url || '';
      } catch (error) {
        console.error('Erreur lors de la récupération de l’image', error);
        return '';
      }
    },

    sortRecipes() {
      if (this.selectedSortTime === "asc") {
        this.filteredArticles.sort((a, b) => (a.acf.temps || 0) - (b.acf.temps || 0));
      } else if (this.selectedSortTime === "desc") {
        this.filteredArticles.sort((a, b) => (b.acf.temps || 0) - (a.acf.temps || 0));
      } else {
        this.filterRecipes();
      }
    },

    filterRecipes() {
      this.filteredArticles = this.articles.filter(article => {
        const matchCategory = this.selectedCategory === "all" || article.acf.categorie == this.selectedCategory;
        const matchDifficulty = this.selectedDifficulty === "all" || article.acf.difficulte == this.selectedDifficulty;
        return matchCategory && matchDifficulty;
      });

      this.sortRecipes();
    },
  },

  async mounted() {
    await this.fetchCategories();
    await this.fetchDifficultes();
    await this.fetchArticles();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.filters label {
  font-size: 1rem;
  font-weight: bold;
}

.filters select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  justify-content: center;
}

.card {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  border: 2px solid #f0f0f0;
}

.card:hover {
  transform: scale(1.05);
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.content {
  padding: 15px;
}

.loading {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}
</style>