import React, { useState } from 'react';
import Subject from '../Subject/Subject';

export default function Day ({ day, subjects }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <h2 onClick={toggleOpen} style={{ cursor: 'pointer' }}>
                {day} {isOpen ? '▼' : '▶'}
            </h2>
            {isOpen && (
                <ul>
                    {subjects.map((item, idx) => (
                        <Subject key={idx} subject={item.subject} cabinet={item.cabinet} teacher={item.teacher} />
                    ))}
                </ul>
            )}
        </div>
    );
};
