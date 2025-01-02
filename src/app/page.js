'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import Schedule from './components/Schedule/Schedule';

const backgrounds = [
    '/stage-backgrounds/groups-2.png',
    '/stage-backgrounds/academic-stuff-2.png',
    '/stage-backgrounds/cabinets-4.png',
    '/stage-backgrounds/subject-1.png',
];

const stages = [
    { text: 'По группам', content: 'Расписание для групп' },
    { text: 'По преподавателям', content: 'Расписание для преподавателей' },
    { text: 'По кабинетам', content: 'Расписание по кабинетам' },
    { text: 'По предмету', content: 'Расписание по предмету' },
];

const groupsData = {
    Monday: [
        { subject: 'Math', cabinet: 'A-101', teacher: 'Иванов И. И.' },
        { subject: 'Physics', cabinet: 'B-202', teacher: 'Петров П. П.' }
    ],
    Tuesday: [
        { subject: 'Chemistry', cabinet: 'C-303', teacher: 'Сидоров С. С.' }
    ],
    Wednesday: [],
    Thursday: [
        { subject: 'Biology', cabinet: 'D-404', teacher: 'Кузнецов К. К.' }
    ],
    Friday: [
        { subject: 'History', cabinet: 'E-505', teacher: 'Смирнов С. С.' }
    ],
    Saturday: [
        { subject: 'Art', cabinet: 'F-606', teacher: 'Попов П. П.' }
    ],
};

const teachers = {
    Monday: [
        { subject: 'Math', cabinet: 'A-101', teacher: 'Иванов И. И.' },
        { subject: 'Physics', cabinet: 'B-202', teacher: 'Петров П. П.' }
    ],
    Tuesday: [
        { subject: 'Chemistry', cabinet: 'C-303', teacher: 'Сидоров С. С.' }
    ],
    Wednesday: [],
    Thursday: [
        { subject: 'Biology', cabinet: 'D-404', teacher: 'Кузнецов К. К.' }
    ],
    Friday: [
        { subject: 'History', cabinet: 'E-505', teacher: 'Смирнов С. С.' }
    ],
    Saturday: [
        { subject: 'Art', cabinet: 'F-606', teacher: 'Попов П. П.' }
    ],
};

const cabinets = {
    Monday: [
        { subject: 'Math', cabinet: 'A-101', teacher: 'Иванов И. И.' },
        { subject: 'Physics', cabinet: 'B-202', teacher: 'Петров П. П.' }
    ],
    Tuesday: [
        { subject: 'Chemistry', cabinet: 'C-303', teacher: 'Сидоров С. С.' }
    ],
    Wednesday: [],
    Thursday: [
        { subject: 'Biology', cabinet: 'D-404', teacher: 'Кузнецов К. К.' }
    ],
    Friday: [
        { subject: 'History', cabinet: 'E-505', teacher: 'Смирнов С. С.' }
    ],
    Saturday: [
        { subject: 'Art', cabinet: 'F-606', teacher: 'Попов П. П.' }
    ],
};

const subjects = {
    Monday: [
        { subject: 'Math', cabinet: 'A-101', teacher: 'Иванов И. И.' },
        { subject: 'Physics', cabinet: 'B-202', teacher: 'Петров П. П.' }
    ],
    Tuesday: [
        { subject: 'Chemistry', cabinet: 'C-303', teacher: 'Сидоров С. С.' }
    ],
    Wednesday: [],
    Thursday: [
        { subject: 'Biology', cabinet: 'D-404', teacher: 'Кузнецов К. К.' }
    ],
    Friday: [
        { subject: 'History', cabinet: 'E-505', teacher: 'Смирнов С. С.' }
    ],
    Saturday: [
        { subject: 'Art', cabinet: 'F-606', teacher: 'Попов П. П.' }
    ],
};

export default function Home() {
    const [index, setIndex] = useState(0);
    const [activeStage, setActiveStage] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState(null);

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
        setSelectedFilter(stageIndex);
    };

    const getSchedule = () => {
        switch (selectedFilter) {
            case 0:
                return groupsData;
            case 1:
                return teachers;
            case 2:
                return cabinets;
            case 3:
                return subjects;
            default:
                return null;
        }
    };

    return (
        <div className={styles.home}>
            <img
                src={backgrounds[index]}
                alt={'background-image'}
                className={styles.home__background}
            />

            <h1 className={styles.home__title}>Расписание</h1>

            <div className={styles.home__filterButtons}>
                {stages.map((stage, i) => (
                    <button
                        key={i}
                        className={`
                            ${styles.home__filterButton}
                            ${activeStage === i ?
                            styles.home__filterButton_active :
                            styles.home__filterButton_inactive}
                        `}
                        onClick={() => handleButtonClick(i)}
                    >
                        {stage.text}
                    </button>
                ))}
            </div>

            <div className={styles.home__content}>
                {selectedFilter !== null ? (
                    <Schedule schedule={getSchedule()} />
                ) : (
                    <span>Пожалуйста, выберите фильтр расписания</span>
                )}
            </div>
        </div>
    );
}
