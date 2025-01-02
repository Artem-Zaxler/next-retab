import React from 'react';
import Day from '../Day/Day';

export default function Schedule({ schedule }) {
    return (
        <>
            {Object.keys(schedule).map((day) => (
                <Day key={day} day={day} subjects={schedule[day]} />
            ))}
        </>
    );
};
