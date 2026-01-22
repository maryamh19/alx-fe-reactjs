import React from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  // Get favorite recipe IDs and all recipes from the store
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  // Map favorite IDs to actual recipe objects
  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean); // Filter out any undefined recipes

  if (favoriteRecipes.length === 0) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', margin: '20px 0' }}>
        <h2>❤️ My Favorites</h2>
        <p style={{ color: '#666' }}>No favorite recipes yet. Add some recipes to your favorites!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', margin: '20px 0' }}>
      <h2>❤️ My Favorites ({favoriteRecipes.length})</h2>
      <div>
        {favoriteRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: '2px solid #ff6b9d',
              padding: '15px',
              margin: '10px 0',
              borderRadius: '6px',
              backgroundColor: '#fff5f7',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0' }}>
              <Link
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: 'none', color: '#ff6b9d' }}
              >
                {recipe.title}
              </Link>
            </h3>
            <p style={{ margin: '5px 0', color: '#555' }}>{recipe.description}</p>
            <button
              onClick={() => removeFavorite(recipe.id)}
              style={{
                padding: '8px 15px',
                backgroundColor: '#ff6b9d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
