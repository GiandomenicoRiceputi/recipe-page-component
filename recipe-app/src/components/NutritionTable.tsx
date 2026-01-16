import React from 'react';

// TICKET: Nutrition Table (Refactor)
// USER STORY: "I want to see nutrients as a clean list."
// CONSTRAINT: Single row per nutrient (Label | Value). Bottom border on all rows except the last.
// OBJECTIVE: Render the table using the `nutritionData` array.

interface NutritionProps {
    nutrition: {
        calories: string;
        carbs: string;
        protein: string;
        fat: string;
    };
}

export const NutritionTable: React.FC<NutritionProps> = ({ nutrition }) => {
    const nutritionData = [
        { label: 'Calories', value: nutrition.calories },
        { label: 'Carbs', value: nutrition.carbs },
        { label: 'Protein', value: nutrition.protein },
        { label: 'Fat', value: nutrition.fat }
    ];

    return (
        <section className="animate-pop-center">
            <h2 className="font-serif text-brown-800 text-size-2 mb-m">Nutrition</h2>
            <p className="text-stone-600 mb-m">The table below shows nutritional values per serving without the additional fillings.</p>

            <table className="w-100" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    {nutritionData.map((item, index) => (
                        <tr key={index} className={index === nutritionData.length - 1 ? '' : 'border-b'}>
                            <td className="pl-s text-stone-600">{item.label}</td>
                            <td className="fw-bold text-brown-800">{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};
