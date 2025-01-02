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
        { subject: 'Математика', cabinet: 'А-101', teacher: 'Иванов И. И.' },
        { subject: 'Физика', cabinet: 'Б-202', teacher: 'Петров П. П.' }
    ],
    Tuesday: [
        { subject: 'Химия', cabinet: 'В-303', teacher: 'Сидоров С. С.' }
    ],
    Wednesday: [],
    Thursday: [
        { subject: 'Биология', cabinet: 'Г-404', teacher: 'Кузнецов К. К.' }
    ],
    Friday: [
        { subject: 'История', cabinet: 'Д-505', teacher: 'Смирнов С. С.' }
    ],
    Saturday: [
        { subject: 'Искусство', cabinet: 'А-606', teacher: 'Попов П. П.' }
    ],
};

const teachersData = {
    Monday: [
        { subject: 'Английский', cabinet: 'Б-107', teacher: 'Иванов И. И.' },
        { subject: 'География', cabinet: 'В-208', teacher: 'Петров П. П.' }
    ],
    Tuesday: [],
    Wednesday: [
        { subject: 'Литература', cabinet: 'Г-309', teacher: 'Сидоров С. С.' }
    ],
    Thursday: [
        { subject: 'Музыка', cabinet: 'Д-410', teacher: 'Кузнецов К. К.' }
    ],
    Friday: [
        { subject: 'Физкультура', cabinet: 'А-511', teacher: 'Смирнов С. С.' }
    ],
    Saturday: [
        { subject: 'Информатика', cabinet: 'Б-612', teacher: 'Попов П. П.' }
    ],
};

const cabinetsData = {
    Monday: [
        { subject: 'Математика', cabinet: 'В-113', teacher: 'Иванов И. И.' },
        { subject: 'Физика', cabinet: 'Г-214', teacher: 'Петров П. П.' }
    ],
    Tuesday: [
        { subject: 'Химия', cabinet: 'Д-315', teacher: 'Сидоров С. С.' }
    ],
    Wednesday: [
        { subject: 'Биология', cabinet: 'А-416', teacher: 'Кузнецов К. К.' }
    ],
    Thursday: [],
    Friday: [
        { subject: 'История', cabinet: 'Б-517', teacher: 'Смирнов С. С.' }
    ],
    Saturday: [
        { subject: 'Искусство', cabinet: 'В-618', teacher: 'Попов П. П.' }
    ],
};

const subjectsData = {
    Monday: [
        { subject: 'Алгебра', cabinet: 'Г-119', teacher: 'Иванов И. И.' },
        { subject: 'Геометрия', cabinet: 'Д-220', teacher: 'Петров П. П.' }
    ],
    Tuesday: [
        { subject: 'Экономика', cabinet: 'А-321', teacher: 'Сидоров С. С.' }
    ],
    Wednesday: [
        { subject: 'Психология', cabinet: 'Б-422', teacher: 'Кузнецов К. К.' }
    ],
    Thursday: [
        { subject: 'Социология', cabinet: 'В-523', teacher: 'Смирнов С. С.' }
    ],
    Friday: [],
    Saturday: [
        { subject: 'Философия', cabinet: 'Г-624', teacher: 'Попов П. П.' }
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
                return teachersData;
            case 2:
                return cabinetsData;
            case 3:
                return subjectsData;
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
