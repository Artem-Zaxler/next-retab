'use client';

import React, { useEffect, useState } from 'react';
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
    const [pagePaddingTop, setPagePaddingTop] = useState(150);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(null);
    const [showAllDays, setShowAllDays] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        const savedFilter = localStorage.getItem('selectedScheduleFilter');
        const savedShowAllDays = localStorage.getItem('showAllDays') === 'true';
        if (savedFilter !== null) {
            setSelectedFilter(parseInt(savedFilter, 10));
            setActiveStage(parseInt(savedFilter, 10));
            setIndex(parseInt(savedFilter, 10));
            setIsAnimating(false);
            setPagePaddingTop(150);
        } else {
            setPagePaddingTop(300);
        }
        setShowAllDays(savedShowAllDays);
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
    }, [selectedFilter]);

    useEffect(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        setCurrentDay(days[dayOfWeek]);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        setCurrentWeek({ start: startOfWeek, end: endOfWeek });
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

    const handleDateChange = (date) => {
        setSelectedDate(date);

        const newStartOfWeek = new Date(date);
        const dayOfWeek = date.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        newStartOfWeek.setDate(date.getDate() + diff);

        const newEndOfWeek = new Date(newStartOfWeek);
        newEndOfWeek.setDate(newStartOfWeek.getDate() + 6);

        if (currentWeek && (date < currentWeek.start || date > currentWeek.end)) {
            setCollapse(true);

            setTimeout(() => {
                setCurrentWeek({ start: newStartOfWeek, end: newEndOfWeek });
                const newScheduleData = generateSchedule(date);
                setScheduleData(newScheduleData);

                setTimeout(() => {
                    setCollapse(false);
                    setExpand(true);

                    setTimeout(() => {
                        setExpand(false);
                    }, 500);
                }, 1);
            }, 500);
        }


        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        setCurrentDay(days[dayOfWeek]);
    };


    const handleShowAllDaysChange = () => {
        const newShowAllDays = !showAllDays;
        setShowAllDays(newShowAllDays);
        localStorage.setItem('showAllDays', String(newShowAllDays));
    };

    function getIsCurrentDay() {
        return selectedDate >= currentWeek.start && selectedDate <= currentWeek.end;
    }

    return (
        <div className={styles.home} style={{ paddingTop: `${pagePaddingTop}px` }}>
            <img
                src={backgrounds[index]}
                alt={'background-image'}
                className={styles.home__background}
            />

            <h1 className={styles.home__title}>Расписание</h1>

            <div className={styles.home__filterButtons}>
                {filters.map((filter, i) => (
                    <button
                        key={i}
                        className={`${styles.home__filterButton} ${getButtonClassName(i)}`}
                        onClick={() => handleButtonClick(i)}
                    >
                        {filter.text}
                    </button>
                ))}
            </div>
            {scheduleData &&
                <>
                    <CustomDatePicker selectedDate={selectedDate} onChange={handleDateChange} />

                    <div className={styles.home__showAllDays} onClick={handleShowAllDaysChange}>
                        <input
                            type="checkbox"
                            checked={showAllDays}
                            onChange={handleShowAllDaysChange}
                            className={styles.home__showAllDaysInput}
                        />

                        {showAllDays ? (
                            <img
                                src={'/svg/checkmark.svg'}
                                alt={'arrow'}
                                className={styles.home__showAllDaysIcon}
                            />
                        ) : (
                            <img
                                src={'/svg/cross.svg'}
                                alt={'arrow'}
                                className={styles.home__showAllDaysIcon}
                            />
                        )}

                        <span>
                            Показывать всю неделю
                        </span>
                    </div>
                </>
            }

            <div className={styles.home__content}>
                {scheduleData ? (
                    <div className={styles.home__columns}>
                        <div className={styles.home__column}>
                            <Day
                                day="Monday"
                                subjects={scheduleData.Monday}
                                isCurrentDay={currentDay === 'Monday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapse}
                                expand={expand}
                            />
                            <Day
                                day="Thursday"
                                subjects={scheduleData.Thursday}
                                isCurrentDay={currentDay === 'Thursday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapse}
                                expand={expand}
                            />
                        </div>
                        <div className={styles.home__column}>
                            <Day
                                day="Tuesday"
                                subjects={scheduleData.Tuesday}
                                isCurrentDay={currentDay === 'Tuesday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapse}
                                expand={expand}
                            />
                            <Day
                                day="Friday"
                                subjects={scheduleData.Friday}
                                isCurrentDay={currentDay === 'Friday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapse}
                                expand={expand}
                            />
                        </div>
                        <div className={styles.home__column}>
                            <Day
                                day="Wednesday"
                                subjects={scheduleData.Wednesday}
                                isCurrentDay={currentDay === 'Wednesday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapse}
                                expand={expand}
                            />
                            <Day
                                day="Saturday"
                                subjects={scheduleData.Saturday}
                                isCurrentDay={currentDay === 'Saturday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapse}
                                expand={expand}
                            />
                        </div>
                    </div>
                ) : (
                    <span>Пожалуйста, выберите фильтр расписания</span>
                )}
            </div>
        </div>
    );
}
