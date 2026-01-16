import type { Recipe, InstructionStep } from '../types/Recipe';

// 🧠 Random mocks generator
const getRandomNutrition = () => ({
    calories: `${Math.floor(Math.random() * 300) + 150}kcal`,
    carbs: `${Math.floor(Math.random() * 30)}g`,
    protein: `${Math.floor(Math.random() * 25) + 5}g`,
    fat: `${Math.floor(Math.random() * 20)}g`,
});

const getRandomTime = () => {
    const prep = Math.floor(Math.random() * 15) + 5;
    const cook = Math.floor(Math.random() * 30) + 10;
    return {
        prepTime: `${prep} minutes`,
        cookTime: `${cook} minutes`,
        totalTime: `Approximately ${prep + cook} minutes`
    };
};

export const fetchRandomRecipe = async (): Promise<Recipe> => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];

        // 1. Transform Ingredients
        const ingredients: string[] = [];
        for (let i = 1; i <= 20; i++) {
            const item = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (item && item.trim() !== '') {
                const fullText = measure && measure.trim() !== '' ? `${measure} ${item}` : item;
                ingredients.push(fullText);
            }
        }

        // 2. Transform Instructions
        // The API returns a giant block of text. We'll split by newlines or periods.
        const rawInstructions = meal.strInstructions;
        const instructionSteps: InstructionStep[] = rawInstructions
            .split(/\r\n|\n|\r/) // Split by newlines
            .filter((line: string) => line.trim().length > 10) // Filter out short/empty lines
            .map((line: string, index: number) => ({
                step: `Step ${index + 1}`,
                detail: line.trim()
            }));

        // 3. Mocks
        const times = getRandomTime();
        const nutrition = getRandomNutrition();

        return {
            id: meal.idMeal,
            name: meal.strMeal,
            category: meal.strCategory,
            area: meal.strArea,
            image: meal.strMealThumb,
            ingredients,
            instructions: instructionSteps.length > 0 ? instructionSteps : [{ step: 'Instructions', detail: rawInstructions }],
            ...times,
            nutrition
        };

    } catch (error) {
        console.error("Failed to fetch recipe:", error);
        throw error;
    }
};

export const searchRecipes = async (query: string): Promise<Recipe | null> => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (!data.meals || data.meals.length === 0) {
            return null;
        }

        const meal = data.meals[0]; // Take the first result
        
        // Reuse the transformation logic (duplicated for now, could be refactored into a helper)
        // 1. Transform Ingredients
        const ingredients: string[] = [];
        for (let i = 1; i <= 20; i++) {
            const item = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (item && item.trim() !== '') {
                const fullText = measure && measure.trim() !== '' ? `${measure} ${item}` : item;
                ingredients.push(fullText);
            }
        }

        // 2. Transform Instructions
        const rawInstructions = meal.strInstructions;
        const instructionSteps: InstructionStep[] = rawInstructions
            .split(/\r\n|\n|\r/)
            .filter((line: string) => line.trim().length > 10)
            .map((line: string, index: number) => ({
                step: `Step ${index + 1}`,
                detail: line.trim()
            }));

        // 3. Mocks (Random for consistency)
        const times = getRandomTime();
        const nutrition = getRandomNutrition();

        return {
            id: meal.idMeal,
            name: meal.strMeal,
            category: meal.strCategory,
            area: meal.strArea,
            image: meal.strMealThumb,
            ingredients,
            instructions: instructionSteps.length > 0 ? instructionSteps : [{ step: 'Instructions', detail: rawInstructions }],
            ...times,
            nutrition
        };

    } catch (error) {
        console.error("Failed to search recipe:", error);
        throw error;
    }
};
