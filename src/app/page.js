'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import Schedule from './components/Schedule/Schedule';

const backgrounds = [
    '/images/stage-backgrounds/groups-2.png',
    '/images/stage-backgrounds/academic-stuff-2.png',
    '/images/stage-backgrounds/cabinets-4.png',
    '/images/stage-backgrounds/subject-1.png',
];

const filters = [
    { text: 'По группам', content: 'Расписание для групп' },
    { text: 'По преподавателям', content: 'Расписание для преподавателей' },
    { text: 'По кабинетам', content: 'Расписание по кабинетам' },
    { text: 'По предмету', content: 'Расписание по предмету' },
];

async function fetchData(filename) {
    const data = await import(`./content/${filename}.json`);
    return data.default;
}

export default function Home() {
    const [index, setIndex] = useState(0);
    const [activeStage, setActiveStage] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const [pagePaddingTop, setPagePaddingTop] = useState(350);

    useEffect(() => {
        const savedFilter = localStorage.getItem('selectedScheduleFilter');
        if (savedFilter !== null) {
            setSelectedFilter(parseInt(savedFilter, 10));
            setActiveStage(parseInt(savedFilter, 10));
            setIndex(parseInt(savedFilter, 10));
            setIsAnimating(false);

            setPagePaddingTop(200);
        } else {
            setPagePaddingTop(350);
        }
    }, []);

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
                setActiveStage((prevStage) => (prevStage + 1) % filters.length);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [index, activeStage, isAnimating]);

    useEffect(() => {
        const loadScheduleData = async () => {
            switch (selectedFilter) {
                case 0:
                    setScheduleData(await fetchData('groups'));
                    break;
                case 1:
                    setScheduleData(await fetchData('teachers'));
                    break;
                case 2:
                    setScheduleData(await fetchData('cabinets'));
                    break;
                case 3:
                    setScheduleData(await fetchData('subjects'));
                    break;
                default:
                    setScheduleData(null);
            }
        };

        loadScheduleData();
    }, [selectedFilter]);

    const handleButtonClick = (stageIndex) => {
        setActiveStage(stageIndex);
        setIndex(stageIndex);
        setSelectedFilter(stageIndex);
        setIsAnimating(false);
        localStorage.setItem('selectedScheduleFilter', stageIndex);
    };

    const getButtonClassName = (i) => {
        if (activeStage === i) {
            return isAnimating ? styles.home__filterButton_active_animated : styles.home__filterButton_active;
        }
        return styles.home__filterButton_inactive;
    };

    return (
        <div className={styles.home} style={{ paddingTop: `${pagePaddingTop}px` }}>
            <img
                src={backgrounds[index]}
                alt={'background-image'}
                className={styles.home__background}
            />

            <h1 className={styles.home__title}>Расписание</h1>

            <div className={styles.home__filterButtons}>
                {filters.map((stage, i) => (
                    <button
                        key={i}
                        className={`${styles.home__filterButton} ${getButtonClassName(i)}`}
                        onClick={() => handleButtonClick(i)}
                    >
                        {stage.text}
                    </button>
                ))}
            </div>

            <div className={`${styles.home__content} ${scheduleData ? styles.home__content_hasSchedule : ""}`}>
                {scheduleData ? (
                    <Schedule schedule={scheduleData} />
                ) : (
                    <span>Пожалуйста, выберите фильтр расписания</span>
                )}
            </div>
        </div>
    );
}
