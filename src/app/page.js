'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';

// export const metadata = {
//     title: "Retab | Главная",
//     description: "Главная страница Retab",
// };

const backgrounds = [
    'url(/background1.jpg)',
    'url(/background2.jpg)',
    'url(/background3.jpg)',
    'url(/background4.jpg)',
];

const titles = [
    'Title 1',
    'Title 2',
    'Title 3',
    'Title 4',
];

const stages = [
    { text: 'Stage 1 Text', content: 'Content for Stage 1' },
    { text: 'Stage 2 Text', content: 'Content for Stage 2' },
    { text: 'Stage 3 Text', content: 'Content for Stage 3' },
    { text: 'Stage 4 Text', content: 'Content for Stage 4' },
];

export default function Home() {
    const [index, setIndex] = useState(0);
    const [activeStage, setActiveStage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={styles.home}
            style={{ backgroundImage: backgrounds[index], backgroundSize: 'cover' }}
        >
            <h1>{titles[index]}</h1>
            <div className={styles.buttons}>
                {stages.map((stage, i) => (
                    <button
                        key={i}
                        className={`${styles.button} ${activeStage === i ? styles.active : styles.inactive}`}
                        onClick={() => setActiveStage(i)}
                    >
                        {stage.text}
                    </button>
                ))}
            </div>
            <div className={styles.content}>
                {stages[activeStage].content}
            </div>
        </div>
    );
}
