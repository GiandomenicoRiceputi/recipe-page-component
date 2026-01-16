import React, { useState } from 'react';

// TICKET: Accessible Search Bar (Polished)
// USER STORY: "I want a search bar that feels modern and inviting."
// OBJECTIVE: Apply "Hero" styling, hover effects, and focus rings.

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-l flex gap-s transition-all"
            style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
            }}
        >
            <div style={{ flexGrow: 1, position: 'relative' }}>
                <label htmlFor="recipe-search" className="sr-only">Search for a recipe</label>
                <input
                    id="recipe-search"
                    type="search"
                    className="w-100 p-m radius-m bg-stone-100 transition-all text-stone-900"
                    style={{
                        width: '100%',
                        border: isFocused ? '2px solid var(--color-brown-800)' : '2px solid transparent',
                        outline: 'none',
                        fontSize: '1rem',
                        boxShadow: isFocused ? '0 0 0 4px var(--color-rose-50)' : 'none'
                    }}
                    placeholder="Search for a recipe (e.g. Pancake)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
            <button
                type="submit"
                className="bg-brown-800 text-white fw-bold p-m radius-m transition-all hover-lift"
                style={{
                    backgroundColor: 'var(--color-brown-800)',
                    color: 'var(--color-white)',
                    border: 'none',
                    cursor: 'pointer',
                    minWidth: '100px'
                }}
            >
                Search
            </button>
        </form>
    );
};
