import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Find the recipe that matches the ID from the URL
    const foundRecipe = recipeData.find((r) => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-gray-600">Recipe not found.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-blue-500 hover:underline"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 md:p-10">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          &larr; Back to Home
        </button>

        {/* Recipe Title & Image */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
          {recipe.title}
        </h1>
        
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-64 md:h-96 object-cover rounded-xl shadow-md mb-8"
        />

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Ingredients Section */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {/* Ensure your data.json has an ingredients array */}
              {recipe.ingredients ? (
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-lg">{ingredient}</li>
                ))
              ) : (
                <li className="italic text-gray-500">No ingredients listed.</li>
              )}
            </ul>
          </div>

          {/* Instructions Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
              Cooking Instructions
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed shadow-sm p-4 bg-white rounded-lg">
              {recipe.instructions || "No instructions provided."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;