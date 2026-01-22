import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  // Get recommendations and generate new ones on component mount
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite);

  useEffect(() => {
    // Generate recommendations when component mounts
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f0f4ff', borderRadius: '8px', margin: '20px 0' }}>
        <h2>🎯 Recommended for You</h2>
        <p style={{ color: '#666' }}>No recommendations available. Add some recipes to get personalized suggestions!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f4ff', borderRadius: '8px', margin: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>🎯 Recommended for You</h2>
        <button
          onClick={generateRecommendations}
          style={{
            padding: '8px 15px',
            backgroundColor: '#4b7bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Refresh Recommendations
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
        {recommendations.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: '2px solid #4b7bff',
              padding: '15px',
              borderRadius: '6px',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(75, 123, 255, 0.1)',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#4b7bff' }}>
              <Link
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: 'none', color: '#4b7bff' }}
              >
                {recipe.title}
              </Link>
            </h3>
            <p style={{ margin: '5px 0 15px 0', color: '#555', fontSize: '14px' }}>
              {recipe.description}
            </p>
            <button
              onClick={() => addFavorite(recipe.id)}
              style={{
                padding: '8px 15px',
                backgroundColor: isFavorite(recipe.id) ? '#ff6b9d' : '#4b7bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {isFavorite(recipe.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;
