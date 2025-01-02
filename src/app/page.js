'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';

const backgrounds = [
    'url(/background1.jpg)',
    'url(/background2.jpg)',
    'url(/background3.jpg)',
    'url(/background4.jpg)',
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
        const timer = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
            setActiveStage((prevStage) => (prevStage + 1) % stages.length);
        }, 5000);

        return () => clearTimeout(timer);
    }, [index, activeStage]);

    const handleButtonClick = (stageIndex) => {
        setActiveStage(stageIndex);
        setIndex(stageIndex);
    };

    return (
        <div
            className={styles.home}
            style={{ backgroundImage: backgrounds[index], backgroundSize: 'cover' }}
        >
            <h1>Расписание</h1>
            <div className={styles.buttons}>
                {stages.map((stage, i) => (
                    <button
                        key={i}
                        className={`${styles.button} ${activeStage === i ? styles.active : styles.inactive}`}
                        onClick={() => handleButtonClick(i)}
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
