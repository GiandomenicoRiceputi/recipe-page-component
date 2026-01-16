import React from 'react';
import type { InstructionStep } from '../types/Recipe';

// TICKET: Instructions List
// USER STORY: As a cook, I need to know the exact steps to prepare the meal.
// CONSTRAINT: Ordered list (`<ol>`). Numbers must be bold and colored `brown-800`.
// OBJECTIVE: Render the instructions using an ordered list.

interface InstructionsListProps {
    instructions: InstructionStep[];
}

export const InstructionsList: React.FC<InstructionsListProps> = ({ instructions }) => {
    return (
        <section className="mb-l animate-pop-center">
            <h2 className="font-serif text-brown-800 text-size-2 mb-m">Instructions</h2>

            {/* 
                🧠 GAP: Render the ordered list <ol>.
                - Iterate over `instructions`.
                - Display the `step` as a bold precursor (e.g., "Beat the eggs:") followed by the `detail`.
                - IMPORTANT: The numbers (1, 2, 3...) need to be styled.
                  Use the utility class `marker:text-brown-800` and `marker:fw-bold` if available,
                  or custom logic.
             */}
            <ol className="text-stone-600 flow marker:text-brown-800 marker:fw-bold stagger-list">
                {instructions.map((instruction, index) => (
                    <li key={index} className="mb-s pl-s">
                        <strong>{instruction.step}</strong>: {instruction.detail}
                    </li>
                ))}
            </ol>
        </section>
    );
};
