export interface Ingredient {
    item: string;
    measure: string;
}

export interface InstructionStep {
    step: string; // "Step 1"
    detail: string; // The instruction text
}

export interface Recipe {
    id: string;
    name: string;
    category: string;
    area: string; // e.g., "French"
    image: string;
    ingredients: string[]; // Formatted as "item - measure" or just strings
    instructions: InstructionStep[];
    
    // Mocks
    prepTime: string;
    cookTime: string;
    totalTime: string;
    nutrition: {
        calories: string;
        carbs: string;
        protein: string;
        fat: string;
    };
}
