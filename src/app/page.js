'use client';

import {useEffect, useState} from 'react';
import styles from './page.module.scss';

const backgrounds = [
    'url(/background1.jpg)',
    'url(/background2.jpg)',
    'url(/background3.jpg)',
    'url(/background4.jpg)',
];

const titles = [
    {text: 'Title 1'},
    {text: 'Title 2'},
    {text: 'Title 3'},
    {text: 'Title 4'},
];

const stages = [
    {text: 'Stage 1 Text', content: 'Content for Stage 1'},
    {text: 'Stage 2 Text', content: 'Content for Stage 2'},
    {text: 'Stage 3 Text', content: 'Content for Stage 3'},
    {text: 'Stage 4 Text', content: 'Content for Stage 4'},
];

export default function Home() {
    const [index, setIndex] = useState(0);
    const [activeTitle, setActiveTitle] = useState(0);
    const [activeStage, setActiveStage] = useState(0);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        const newTimer = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
            setActiveTitle((prevTitle) => (prevTitle + 1) % titles.length);
            setActiveStage((prevStage) => (prevStage + 1) % stages.length);
        }, 5000);
        setTimer(newTimer);

        return () => clearTimeout(newTimer);
    }, [index, activeStage, activeTitle]);

    const handleButtonClick = (stageIndex) => {
        if (timer) {
            clearTimeout(timer);
        }
        setActiveStage(stageIndex);
        setActiveTitle(stageIndex);
        const newTimer = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
            setActiveTitle((prevTitle) => (prevTitle + 1) % titles.length);
            setActiveStage((prevStage) => (prevStage + 1) % stages.length);
        }, 5000);
        setTimer(newTimer);
    };

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    return (
        <div
            className={styles.home}
            style={{backgroundImage: backgrounds[index], backgroundSize: 'cover'}}
        >
            <h1>{titles[activeTitle].text}</h1>
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
