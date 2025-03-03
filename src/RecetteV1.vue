<!-- recettes.html -->
<template>
  <div class="container">
    <input v-model="searchQuery" placeholder="Rechercher une recette..." class="search-bar" />

    <div class="grid">
      <div v-for="recipe in paginatedRecipes" :key="recipe.id" class="grid-item" @click="selectRecipe(recipe)">
        <h3>{{ recipe.title }}</h3>
        <p>{{ recipe.description }}</p>
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">⬅ Précédent</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant ➡</button>
    </div>

    <div v-if="selectedRecipe" class="details">
      <h2>{{ selectedRecipe.title }}</h2>
      <p>{{ selectedRecipe.description }}</p>
      <button @click="selectedRecipe = null">Fermer</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      recipes: [
        { id: 1, title: "Pâtes Carbonara", description: "Délicieuse recette italienne." },
        { id: 2, title: "Tarte aux pommes", description: "Un classique sucré et savoureux." },
        { id: 3, title: "Poulet Curry", description: "Recette épicée et exotique." },
        { id: 4, title: "Salade César", description: "Parfait pour un repas léger." },
        { id: 5, title: "Soupe à l'oignon", description: "Idéale pour l'hiver." },
        { id: 6, title: "Ratatouille", description: "Un plat coloré et végétarien." },
        { id: 7, title: "Gratin dauphinois", description: "Pommes de terre et crème, un régal." },
        { id: 8, title: "Lasagnes", description: "Recette italienne avec viande et fromage." },
      ],
      perPage: 4,
      currentPage: 1,
      selectedRecipe: null,
    };
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalPages() {
      return Math.ceil(this.filteredRecipes.length / this.perPage);
    },
    paginatedRecipes() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredRecipes.slice(start, start + this.perPage);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    selectRecipe(recipe) {
      this.selectedRecipe = recipe;
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

.search-bar {
  width: 80%;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.grid-item {
  background: rgb(32, 131, 94);
  color: white;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.grid-item:hover {
  background: #007442;
}

.pagination {
  margin: 20px 0;
}

button {
  padding: 8px 12px;
  margin: 5px;
  background: #154e17;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.details {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 5px;
}
</style>
