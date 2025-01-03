'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import CustomDatePicker from './components/DatePicker/DatePicker';
import { generateSchedule } from '../utils/scheduleGenerator';
import useMedia from "../hooks/useMedia";
import FilterButtons from './components/FilterButtons/FilterButtons';
import SubFilters from './components/SubFilters/SubFilters';
import Schedule from './components/Schedule/Schedule';
import { generateSubFilters } from '../utils/subFilterGenerator'; // Import the new module

const backgrounds = [
    '/images/stage-backgrounds/groups-2.png',
    '/images/stage-backgrounds/academic-stuff-2.png',
    '/images/stage-backgrounds/cabinets-4.png',
    '/images/stage-backgrounds/subject-1.png',
];

const filters = [
    { text: 'По группам', content: 'Расписание для групп', category: 'groups' },
    { text: 'По преподавателям', content: 'Расписание для преподавателей', category: 'teachers' },
    { text: 'По кабинетам', content: 'Расписание по кабинетам', category: 'rooms' },
    { text: 'По предмету', content: 'Расписание по предмету', category: 'subjects' },
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
    const [subFilters, setSubFilters] = useState([]); // State to hold dynamically generated sub-filters

    const { isMobile } = useMedia();

    const [pagePaddingTop, setPagePaddingTop] = useState(isMobile ? 15 : 150);

    useEffect(() => {
        const savedFilter = localStorage.getItem('selectedScheduleFilter');
        const savedSubFilter = localStorage.getItem('selectedScheduleSubFilter');
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
        if (savedSubFilter !== null) {
            setSelectedSubFilter(savedSubFilter);
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
    }, [selectedFilter, selectedSubFilter]);

    useEffect(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        setCurrentDay(daysOfWeek[dayOfWeek]);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        setCurrentWeek({ start: startOfWeek, end: endOfWeek });
    }, []);

    useEffect(() => {
        if (selectedFilter !== null) {
            const category = filters[selectedFilter].category;
            const generatedSubFilters = generateSubFilters(category);
            setSubFilters(generatedSubFilters);
        }
    }, [selectedFilter]);

    const handleButtonClick = (stageIndex) => {
        setActiveStage(stageIndex);
        setIndex(stageIndex);
        setSelectedFilter(stageIndex);
        setSelectedSubFilter(null);
        setIsAnimating(false);
        localStorage.setItem('selectedScheduleFilter', stageIndex);
        localStorage.removeItem('selectedScheduleSubFilter');
    };

    const handleSubFilterClick = (subFilter) => {
        setSelectedSubFilter(subFilter);
        localStorage.setItem('selectedScheduleSubFilter', subFilter);
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
                setCurrentWeek({ start: newStartOfWeek, end: newEndOfWeek });
                const newScheduleData = generateSchedule(date, selectedFilter, selectedSubFilter);
                setScheduleData(newScheduleData);

                setTimeout(() => {
                    setCollapseStates({});
                    setExpandStates({});
                }, 500);
            }, 500);
        } else {
            setCurrentDay(daysOfWeek[dayOfWeek]);
        }
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
                            <FilterButtons
                                filters={filters}
                                activeStage={activeStage}
                                handleButtonClick={handleButtonClick}
                                isAnimating={isAnimating}
                            />
                            {selectedFilter !== null && (
                                <SubFilters
                                    filters={filters}
                                    selectedFilter={selectedFilter}
                                    selectedSubFilter={selectedSubFilter}
                                    handleSubFilterClick={handleSubFilterClick}
                                    subFilters={subFilters} // Pass the dynamically generated sub-filters
                                />
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
                    <CustomDatePicker selectedDate={selectedDate} onChange={handleDateChange} />
                </div>
            ) : (
                <>
                    <FilterButtons
                        filters={filters}
                        activeStage={activeStage}
                        handleButtonClick={handleButtonClick}
                        isAnimating={isAnimating}
                    />
                    {selectedFilter !== null && (
                        <SubFilters
                            filters={filters}
                            selectedFilter={selectedFilter}
                            selectedSubFilter={selectedSubFilter}
                            handleSubFilterClick={handleSubFilterClick}
                            subFilters={subFilters} // Pass the dynamically generated sub-filters
                        />
                    )}
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
                    <Schedule
                        scheduleData={scheduleData}
                        isMobile={isMobile}
                        currentDay={currentDay}
                        currentDate={selectedDate}
                        getIsCurrentDay={getIsCurrentDay}
                        showAllDays={showAllDays}
                        collapseStates={collapseStates}
                        expandStates={expandStates}
                    />
                ) : (
                    <span>Пожалуйста, выберите фильтр расписания</span>
                )}
            </div>
        </div>
    );
}

export default Home;
