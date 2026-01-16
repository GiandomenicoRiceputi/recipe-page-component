import React from 'react';

// TICKET: Ingredients List
// USER STORY: As a cook, I need the list of ingredients so I can gather them.
// CONSTRAINT: Unordered list (`<ul>`). Bullets/text must be `brown-800` (Title) and `stone-600` (Text).
// OBJECTIVE: Render the list of ingredients.

interface IngredientsListProps {
    ingredients: string[];
}

export const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
    return (
        <section className="mb-l animate-fade-right">
            <h2 className="font-serif text-brown-800 text-size-2 mb-m">Ingredients</h2>
            <ul className="text-stone-600 flow stagger-list">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="mb-s pl-s">
                        {ingredient}
                    </li>
                ))}
            </ul>
        </section>
    );
};
