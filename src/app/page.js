'use client';

import React, {useEffect, useState} from 'react';
import styles from './page.module.scss';
import Day from "./components/Day/Day";
import CustomDatePicker from './components/DatePicker/DatePicker';
import {generateSchedule} from '../utils/scheduleGenerator';
import useMedia from "../hooks/useMedia";

const backgrounds = [
    '/images/stage-backgrounds/groups-2.png',
    '/images/stage-backgrounds/academic-stuff-2.png',
    '/images/stage-backgrounds/cabinets-4.png',
    '/images/stage-backgrounds/subject-1.png',
];

const filters = [
    {text: 'По группам', content: 'Расписание для групп', subFilters: ['ТРП-2-21', 'ПЭ-1-20']},
    {text: 'По преподавателям', content: 'Расписание для преподавателей', subFilters: ['Иванов И. И.', 'Петров П. П.']},
    {text: 'По кабинетам', content: 'Расписание по кабинетам', subFilters: ['В-113', 'Г-214']},
    {text: 'По предмету', content: 'Расписание по предмету', subFilters: ['Java-технологии', 'Программные методы обработки изображений и распознавания образов']},
];

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Home = () => {
    const [index, setIndex] = useState(0);
    const [activeStage, setActiveStage] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [selectedSubFilter, setSelectedSubFilter] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(null);
    const [showAllDays, setShowAllDays] = useState(false);
    const [collapseStates, setCollapseStates] = useState({});
    const [expandStates, setExpandStates] = useState({});
    const [showSettings, setShowSettings] = useState(false);

    const {isMobile} = useMedia();

    const [pagePaddingTop, setPagePaddingTop] = useState(isMobile ? 15 : 150);

    useEffect(() => {
        const savedFilter = localStorage.getItem('selectedScheduleFilter');
        const savedShowAllDays = localStorage.getItem('showAllDays') === 'true';
        if (savedFilter !== null) {
            setSelectedFilter(parseInt(savedFilter, 10));
            setActiveStage(parseInt(savedFilter, 10));
            setIndex(parseInt(savedFilter, 10));
            setIsAnimating(false);
            setPagePaddingTop(isMobile ? 15 : 150);
        } else {
            setPagePaddingTop(isMobile ? 30 : 300);
        }
        setShowAllDays(savedShowAllDays);
    }, [isMobile]);

    useEffect(() => {
        if (!isMobile && isAnimating) {
            const timer = setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
                setActiveStage((prevStage) => (prevStage + 1) % filters.length);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [index, activeStage, isAnimating, isMobile]);

    useEffect(() => {
        const loadScheduleData = async () => {
            if (selectedFilter !== null && selectedSubFilter !== null) {
                setScheduleData(generateSchedule(selectedDate, selectedFilter, selectedSubFilter));
            } else {
                setScheduleData(null);
            }
        };

        loadScheduleData();
    }, [selectedFilter, selectedSubFilter, selectedDate]);

    useEffect(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        setCurrentDay(daysOfWeek[dayOfWeek]);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        setCurrentWeek({start: startOfWeek, end: endOfWeek});
    }, []);

    const handleButtonClick = (stageIndex) => {
        setActiveStage(stageIndex);
        setIndex(stageIndex);
        setSelectedFilter(stageIndex);
        setSelectedSubFilter(null);
        setIsAnimating(false);
        localStorage.setItem('selectedScheduleFilter', stageIndex);
    };

    const handleSubFilterClick = (subFilter) => {
        setSelectedSubFilter(subFilter);
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
            const newCollapseStates = {};
            const newExpandStates = {};

            if (!showAllDays) {
                daysOfWeek.forEach(day => {
                    newCollapseStates[day] = true;
                    newExpandStates[day] = false;
                });

                newCollapseStates[daysOfWeek[dayOfWeek]] = false;
                newExpandStates[daysOfWeek[dayOfWeek]] = true;
            }

            setCollapseStates(newCollapseStates);
            setExpandStates(newExpandStates);

            setTimeout(() => {
                setCurrentWeek({start: newStartOfWeek, end: newEndOfWeek});
                const newScheduleData = generateSchedule(date, selectedFilter, selectedSubFilter);
                setScheduleData(newScheduleData);

                setTimeout(() => {
                    setCollapseStates({});
                    setExpandStates({});
                }, 500);
            }, 500);
        }

        setCurrentDay(daysOfWeek[dayOfWeek]);
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
        <div className={styles.home} style={{paddingTop: `${pagePaddingTop}px`}}>
            <img
                src={backgrounds[index]}
                alt={'background-image'}
                className={styles.home__background}
            />

            <h1 className={styles.home__title}>Расписание</h1>

            {isMobile ? (
                <div className={styles.home__mobileSettings}>
                    <img
                        src={'/svg/settings.svg'}
                        alt={'settings'}
                        className={styles.home__settingsIcon}
                        onClick={() => setShowSettings(!showSettings)}
                    />
                    {showSettings && (
                        <div className={styles.home__settingsDropdown}>
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
                            {selectedFilter !== null && (
                                <div className={styles.home__subFilters}>
                                    {filters[selectedFilter].subFilters.map((subFilter, j) => (
                                        <button
                                            key={j}
                                            className={`${styles.home__subFilterButton} ${selectedSubFilter === subFilter ? styles.home__subFilterButton_active : styles.home__subFilterButton_inactive}`}
                                            onClick={() => handleSubFilterClick(subFilter)}
                                        >
                                            {subFilter}
                                        </button>
                                    ))}
                                </div>
                            )}
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
                                        alt={'checkmark'}
                                        className={styles.home__showAllDaysIcon}
                                    />
                                ) : (
                                    <img
                                        src={'/svg/cross.svg'}
                                        alt={'cross'}
                                        className={styles.home__showAllDaysIcon}
                                    />
                                )}

                                <span>
                                    Показывать всю неделю
                                </span>
                            </div>
                        </div>
                    )}
                    <CustomDatePicker selectedDate={selectedDate} onChange={handleDateChange}/>
                </div>
            ) : (
                <>
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
                    {selectedFilter !== null && (
                        <div className={styles.home__subFilters}>
                            {filters[selectedFilter].subFilters.map((subFilter, j) => (
                                <button
                                    key={j}
                                    className={`${styles.home__subFilterButton} ${selectedSubFilter === subFilter ? styles.home__subFilterButton_active : styles.home__subFilterButton_inactive}`}
                                    onClick={() => handleSubFilterClick(subFilter)}
                                >
                                    {subFilter}
                                </button>
                            ))}
                        </div>
                    )}
                    {scheduleData &&
                        <>
                            <CustomDatePicker selectedDate={selectedDate} onChange={handleDateChange}/>

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
                                        alt={'checkmark'}
                                        className={styles.home__showAllDaysIcon}
                                    />
                                ) : (
                                    <img
                                        src={'/svg/cross.svg'}
                                        alt={'cross'}
                                        className={styles.home__showAllDaysIcon}
                                    />
                                )}

                                <span>
                                    Показывать всю неделю
                                </span>
                            </div>
                        </>
                    }
                </>
            )}

            <div className={styles.home__content}>
                {scheduleData ? (
                    !isMobile ? (
                        <div className={styles.home__columns}>
                            <div className={styles.home__column}>
                                <Day
                                    day="Monday"
                                    subjects={scheduleData.Monday}
                                    isCurrentDay={currentDay === 'Monday' && getIsCurrentDay()}
                                    showAllDays={showAllDays}
                                    collapse={collapseStates.Monday}
                                    expand={expandStates.Monday}
                                />
                                <Day
                                    day="Thursday"
                                    subjects={scheduleData.Thursday}
                                    isCurrentDay={currentDay === 'Thursday' && getIsCurrentDay()}
                                    showAllDays={showAllDays}
                                    collapse={collapseStates.Thursday}
                                    expand={expandStates.Thursday}
                                />
                            </div>
                            <div className={styles.home__column}>
                                <Day
                                    day="Tuesday"
                                    subjects={scheduleData.Tuesday}
                                    isCurrentDay={currentDay === 'Tuesday' && getIsCurrentDay()}
                                    showAllDays={showAllDays}
                                    collapse={collapseStates.Tuesday}
                                    expand={expandStates.Tuesday}
                                />
                                <Day
                                    day="Friday"
                                    subjects={scheduleData.Friday}
                                    isCurrentDay={currentDay === 'Friday' && getIsCurrentDay()}
                                    showAllDays={showAllDays}
                                    collapse={collapseStates.Friday}
                                    expand={expandStates.Friday}
                                />
                            </div>
                            <div className={styles.home__column}>
                                <Day
                                    day="Wednesday"
                                    subjects={scheduleData.Wednesday}
                                    isCurrentDay={currentDay === 'Wednesday' && getIsCurrentDay()}
                                    showAllDays={showAllDays}
                                    collapse={collapseStates.Wednesday}
                                    expand={expandStates.Wednesday}
                                />
                                <Day
                                    day="Saturday"
                                    subjects={scheduleData.Saturday}
                                    isCurrentDay={currentDay === 'Saturday' && getIsCurrentDay()}
                                    showAllDays={showAllDays}
                                    collapse={collapseStates.Saturday}
                                    expand={expandStates.Saturday}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.home__scheduleColumn}>
                            <Day
                                day="Monday"
                                subjects={scheduleData.Monday}
                                isCurrentDay={currentDay === 'Monday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapseStates.Monday}
                                expand={expandStates.Monday}
                            />
                            <Day
                                day="Tuesday"
                                subjects={scheduleData.Tuesday}
                                isCurrentDay={currentDay === 'Tuesday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapseStates.Tuesday}
                                expand={expandStates.Tuesday}
                            />
                            <Day
                                day="Wednesday"
                                subjects={scheduleData.Wednesday}
                                isCurrentDay={currentDay === 'Wednesday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapseStates.Wednesday}
                                expand={expandStates.Wednesday}
                            />
                            <Day
                                day="Thursday"
                                subjects={scheduleData.Thursday}
                                isCurrentDay={currentDay === 'Thursday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapseStates.Thursday}
                                expand={expandStates.Thursday}
                            />
                            <Day
                                day="Friday"
                                subjects={scheduleData.Friday}
                                isCurrentDay={currentDay === 'Friday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapseStates.Friday}
                                expand={expandStates.Friday}
                            />
                            <Day
                                day="Saturday"
                                subjects={scheduleData.Saturday}
                                isCurrentDay={currentDay === 'Saturday' && getIsCurrentDay()}
                                showAllDays={showAllDays}
                                collapse={collapseStates.Saturday}
                                expand={expandStates.Saturday}
                            />
                        </div>
                    )
                ) : (
                    <span>Пожалуйста, выберите фильтр расписания</span>
                )}
            </div>
        </div>
    );
}

export default Home;
