import React from 'react';

// TICKET: Preparation Time Component
// USER STORY: As a busy cook, I want to see the prep/cook times clearly so I can plan.
// CONSTRAINT: Use semantic <ul>. Box must have `bg-rose-50` background.
// OBJECTIVE: Render "Total", "Preparation", and "Cooking" times with specific styling.

interface PreparationTimeProps {
  prepTime: string;
  cookTime: string;
  totalTime: string;
}

export const PreparationTime: React.FC<PreparationTimeProps> = ({ prepTime, cookTime, totalTime }) => {
  return (
    <section className="p-m radius-m bg-rose-50 mb-l animate-fade-left">
      <h2 className="text-size-1 font-sans text-rose-800 fw-semibold mb-s">Preparation time</h2>

      {/* 
               Directly applying styles to ensure visibility. 
               The 'rose-800' class handles the marker color via utilities.css.
            */}
      <ul className="rose-800 flow" style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
        <li className="pl-s"><strong>Total:</strong> {totalTime}</li>
        <li className="pl-s"><strong>Preparation:</strong> {prepTime}</li>
        <li className="pl-s"><strong>Cooking:</strong> {cookTime}</li>
      </ul>
    </section>
  );
};
