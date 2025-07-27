'use client';
import { useState } from 'react';

export default function ProductInfoTabs({ description, ingredients, howToUse }) {
    const [active, setActive] = useState('description');

    return (
        <div>
            <div className="flex gap-4 border-b pb-2 mb-4">
                {['description', 'ingredients', 'howToUse'].map((tab) => (
                    <button key={tab} className={`px-4 py-2 ${active === tab ? 'border-b-2 border-pink-600 text-pink-600' : ''}`} onClick={() => setActive(tab)}>
                        {tab.replace(/([A-Z])/g, ' $1')}
                    </button>
                ))}
            </div>
            <div>
                {active === 'description' && (
                    <div
                        className="text-base text-gray-700"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                )}
                {active === 'ingredients' && <p>{ingredients}</p>}
                {active === 'howToUse' && <p>{howToUse}</p>}
            </div>
        </div>
    );
}
