import React from 'react';

// TICKET: Recipe Image Component
// USER STORY: As a user, I want to see a delicious image of the recipe.
// CONSTRAINT: Use an `<img>` tag with `radius-m` utility class for border radius.
// OBJECTIVE: Render the recipe image from the provided source.

interface RecipeImageProps {
    src: string;
    alt: string;
}

export const RecipeImage: React.FC<RecipeImageProps> = ({ src, alt }) => {
    return (
        <div className="mb-l">
            <img src={src} alt={alt} className="radius-m w-100" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        </div>
    );
};
