'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import Day from "./components/Day/Day";
import CustomDatePicker from './components/DatePicker/DatePicker';
import { generateSchedule } from '../utils/scheduleGenerator';

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

export default function Home() {
    const [index, setIndex] = useState(0);
    const [activeStage, setActiveStage] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const [pagePaddingTop, setPagePaddingTop] = useState(50);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(null);

    useEffect(() => {
        const savedFilter = localStorage.getItem('selectedScheduleFilter');
        if (savedFilter !== null) {
            setSelectedFilter(parseInt(savedFilter, 10));
            setActiveStage(parseInt(savedFilter, 10));
            setIndex(parseInt(savedFilter, 10));
            setIsAnimating(false);
            setPagePaddingTop(50);
        } else {
            setPagePaddingTop(200);
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
                    setScheduleData(generateSchedule(selectedDate));
                    break;
                case 1:
                    setScheduleData(generateSchedule(selectedDate));
                    break;
                case 2:
                    setScheduleData(generateSchedule(selectedDate));
                    break;
                case 3:
                    setScheduleData(generateSchedule(selectedDate));
                    break;
                default:
                    setScheduleData(null);
            }
        };

        loadScheduleData();
    }, [selectedFilter, selectedDate]);

    useEffect(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        setCurrentDay(days[dayOfWeek]);
    }, []);

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

            <CustomDatePicker selectedDate={selectedDate} onChange={(date) => setSelectedDate(date)} />

            <div className={`${styles.home__content} ${scheduleData ? styles.home__content_hasSchedule : ""}`}>
                {scheduleData ? (
                    <div className={styles.home__columns}>
                        <div className={styles.home__column}>
                            <Day day="Monday" subjects={scheduleData.Monday} isCurrentDay={currentDay === 'Monday'} />
                            <Day day="Thursday" subjects={scheduleData.Thursday} isCurrentDay={currentDay === 'Thursday'} />
                        </div>
                        <div className={styles.home__column}>
                            <Day day="Tuesday" subjects={scheduleData.Tuesday} isCurrentDay={currentDay === 'Tuesday'} />
                            <Day day="Friday" subjects={scheduleData.Friday} isCurrentDay={currentDay === 'Friday'} />
                        </div>
                        <div className={styles.home__column}>
                            <Day day="Wednesday" subjects={scheduleData.Wednesday} isCurrentDay={currentDay === 'Wednesday'} />
                            <Day day="Saturday" subjects={scheduleData.Saturday} isCurrentDay={currentDay === 'Saturday'} />
                        </div>
                    </div>
                ) : (
                    <span>Пожалуйста, выберите фильтр расписания</span>
                )}
            </div>
        </div>
    );
}
