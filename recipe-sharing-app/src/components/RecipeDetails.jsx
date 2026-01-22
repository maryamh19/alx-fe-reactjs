import React from 'react';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useParams, Link } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams(); // get ID from URL
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(id))
  );
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite);

  if (!recipe) return <p>Recipe not found!</p>;

  const handleFavoriteToggle = () => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{recipe.title}</h1>
        <button
          onClick={handleFavoriteToggle}
          style={{
            padding: '12px 20px',
            backgroundColor: isFavorite(recipe.id) ? '#ff6b9d' : '#e0e0e0',
            color: isFavorite(recipe.id) ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {isFavorite(recipe.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>
      <p>{recipe.description}</p>

      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />

      <br />
      <Link to="/">Back to Recipes</Link>
    </div>
  );
};

export default RecipeDetails;
