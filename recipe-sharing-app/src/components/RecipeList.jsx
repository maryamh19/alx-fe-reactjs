import React from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite);

  if (!recipes || recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div>
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: 1 }}>
            <h3>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
          <button
            onClick={() =>
              isFavorite(recipe.id) ? removeFavorite(recipe.id) : addFavorite(recipe.id)
            }
            style={{
              padding: '8px 12px',
              backgroundColor: isFavorite(recipe.id) ? '#ff6b9d' : '#e0e0e0',
              color: isFavorite(recipe.id) ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '10px',
              whiteSpace: 'nowrap',
              fontSize: '14px',
            }}
          >
            {isFavorite(recipe.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
