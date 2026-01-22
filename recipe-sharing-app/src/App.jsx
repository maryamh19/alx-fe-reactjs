import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Recipe Sharing App</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar /> {/* ✅ search bar */}
                <AddRecipeForm />
                {/* ✅ Recommendations section */}
                <RecommendationsList />
                {/* ✅ Favorites section */}
                <FavoritesList />
                {/* ✅ All recipes section */}
                <div style={{ marginTop: '30px' }}>
                  <h2>All Recipes</h2>
                  <RecipeList />
                </div>
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
