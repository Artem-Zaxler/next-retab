'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';

const backgrounds = [
    'url("/stage-backgrounds/groups-1.png")',
    'url("/stage-backgrounds/academic-stuff-1.png")',
    'url("/stage-backgrounds/cabinets-1.png")',
    'url("/stage-backgrounds/subject-1.png")',
];

const stages = [
    { text: 'По группам', content: 'Расписание для групп' },
    { text: 'По преподавателям', content: 'Расписание для преподавателей' },
    { text: 'По кабинетам', content: 'Расписание по кабинетам' },
    { text: 'По предмету', content: 'Расписание по предмету' },
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
