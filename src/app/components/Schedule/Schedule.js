import React from 'react';
import Day from '../Day/Day';

export default function Schedule({ schedule }) {
    return (
        <div>
            {Object.keys(schedule).map((day) => (
                <Day key={day} day={day} subjects={schedule[day]} />
            ))}
        </div>
    );
};
