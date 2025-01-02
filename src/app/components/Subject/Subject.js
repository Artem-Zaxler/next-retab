import React from 'react';

export default function Subject ({ subject, cabinet, teacher }) {
    return (
        <li>
            {subject} - {cabinet} - {teacher}
        </li>
    );
};
