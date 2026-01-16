import { useEffect, useState } from 'react';
import { IngredientsList } from './components/IngredientsList';
import { InstructionsList } from './components/InstructionsList';
import { NutritionTable } from './components/NutritionTable';
import { PreparationTime } from './components/PreparationTime';
import { RecipeImage } from './components/RecipeImage';
import { SearchBar } from './components/SearchBar';
import { fetchRandomRecipe, searchRecipes } from './services/api';
import type { Recipe } from './types/Recipe';

function App() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extended Document interface for View Transitions
  interface DocumentWithTransition extends Document {
    startViewTransition?: (callback: () => void) => void;
  }

  const loadRecipe = async (fetcher: () => Promise<Recipe | null>) => {
    const doc = document as DocumentWithTransition;

    const updateState = (fn: () => void) => {
      if (doc.startViewTransition) {
        doc.startViewTransition(fn);
      } else {
        fn();
      }
    };

    try {
      updateState(() => {
        setLoading(true);
        setError(null);
      });

      const data = await fetcher();

      updateState(() => {
        if (data) {
          setRecipe(data);
        } else {
          setError("No recipe found. Please try another search.");
          setRecipe(null);
        }
        setLoading(false);
      });

    } catch (err) {
      updateState(() => {
        setError("Failed to load recipe. Please try again.");
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    // Initial random load
    loadRecipe(fetchRandomRecipe);
  }, []);

  const handleSearch = (query: string) => {
    loadRecipe(() => searchRecipes(query));
  };

  return (
    <div className="bg-stone-100 flex justify-center align-center min-h-screen p-l">
      <main className="bg-white p-l radius-l shadow-hero container my-xl animate-entry">

        {/* Search Bar Section */}
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="p-xl text-center" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="spinner"></div>
          </div>
        )}

        {error && !loading && (
          <div className="p-xl text-center">
            <p className="text-size-2 font-serif text-brown-800 text-balance">{error}</p>
            {/* Optional: Button to reset/random */}
            <button
              onClick={() => loadRecipe(fetchRandomRecipe)}
              className="mt-m text-stone-600 transition-all hover-lift"
              style={{ textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Or try a random recipe?
            </button>
          </div>
        )}

        {!loading && !error && recipe && (
          <>
            <RecipeImage src={recipe.image} alt={recipe.name} />
            <section className="flow">
              <h1 className="font-serif text-stone-900 text-size-3 fw-regular mb-l text-balance">{recipe.name}</h1>
              <p className="text-stone-600 mb-l text-pretty">
                A classic <strong>{recipe.area}</strong> dish from the <strong>{recipe.category}</strong> category.
                Perfect for any meal!
              </p>

              <PreparationTime
                prepTime={recipe.prepTime}
                cookTime={recipe.cookTime}
                totalTime={recipe.totalTime}
              />
              <div className="border-b mb-l"></div>

              <IngredientsList ingredients={recipe.ingredients} />

              <div className="border-b mb-l"></div>

              <InstructionsList instructions={recipe.instructions} />

              <div className="border-b mb-l"></div>

              <NutritionTable nutrition={recipe.nutrition} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
