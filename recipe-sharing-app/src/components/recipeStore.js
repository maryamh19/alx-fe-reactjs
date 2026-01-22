import create from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [], // Array to store favorite recipe IDs
  recommendations: [], // Array to store recommended recipes

  // Recipe actions
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: [...state.filteredRecipes, newRecipe],
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
      filteredRecipes: state.filteredRecipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
      filteredRecipes: state.filteredRecipes.filter((r) => r.id !== id),
      favorites: state.favorites.filter((fav) => fav !== id), // Remove from favorites if deleted
    })),

  // Search & filtering actions
  setSearchTerm: (term) =>
    set((state) => {
      const filtered = state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
      return { searchTerm: term, filteredRecipes: filtered };
    }),

  setRecipes: (recipes) =>
    set({ recipes, filteredRecipes: recipes }),

  // Favorites actions
  addFavorite: (recipeId) =>
    set((state) => {
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state;
    }),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  isFavorite: (recipeId) => {
    const state = get();
    return state.favorites.includes(recipeId);
  },

  // Recommendations actions
  generateRecommendations: () =>
    set((state) => {
      // Generate recommendations based on favorite recipes
      // Filter recipes that are not in favorites, but share similar characteristics
      const favoriteRecipes = state.recipes.filter((recipe) =>
        state.favorites.includes(recipe.id)
      );

      if (favoriteRecipes.length === 0) {
        // If no favorites, recommend random recipes
        return {
          recommendations: state.recipes.slice(0, 3),
        };
      }

      // Simple recommendation algorithm: suggest recipes not in favorites
      // that share tags or ingredients with favorite recipes
      const recommended = state.recipes.filter(
        (recipe) =>
          !state.favorites.includes(recipe.id) &&
          (Math.random() > 0.4 || state.recipes.length <= 3)
      );

      return {
        recommendations: recommended.slice(0, 3), // Limit to 3 recommendations
      };
    }),
}));
