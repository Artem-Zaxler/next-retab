'use client';

import React, {useEffect, useState, useRef} from 'react';
import Subject from '../Subject/Subject';
import styles from "./day.module.scss";
import useMedia from "../../../hooks/useMedia";

const Day = ({day, date, subjects, isCurrentDay, showAllDays, collapse, expand}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const contentRef = useRef(null);
    const contentLineRef = useRef(null);
    const currentDayRef = useRef(null);
    const {isMobile} = useMedia();

    useEffect(() => {
        if (showAllDays || isCurrentDay) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [showAllDays, isCurrentDay]);

    useEffect(() => {
        if (collapse) {
            setIsOpen(false);
        }
    }, [collapse]);

    useEffect(() => {
        if (expand) {
            setIsOpen(true);
        }
    }, [expand]);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            const padding = 30;
            const gap = 20 * (Array.isArray(subjects) ? subjects.length : 0);
            contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight + padding + gap}px`;
            contentRef.current.style.padding = '10px 20px 20px';
            if (contentLineRef.current) {
                contentLineRef.current.style.opacity = '1';
            }
        } else if (contentRef.current) {
            contentRef.current.style.maxHeight = '0';
            contentRef.current.style.padding = '0 20px';
            if (contentLineRef.current) {
                contentLineRef.current.style.opacity = '0';
            }
        }
    }, [isOpen, subjects]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    let dayName;
    switch (day) {
        case "Monday":
            dayName = 'Понедельник';
            break;
        case "Tuesday":
            dayName = 'Вторник';
            break;
        case "Wednesday":
            dayName = 'Среда';
            break;
        case "Thursday":
            dayName = 'Четверг';
            break;
        case "Friday":
            dayName = 'Пятница';
            break;
        case "Saturday":
            dayName = 'Суббота';
            break;
        default:
            dayName = day;
            break;
    }

    const formattedDate = date.toLocaleDateString();

    if (dayName === 'Sunday')
        return null;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isMobile && isCurrentDay && isContentLoaded && currentDayRef.current) {
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const targetScrollY = currentDayRef.current.getBoundingClientRect().top + window.scrollY;
                currentDayRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
            });
        }
    }, [isMobile, isCurrentDay, isContentLoaded]);

    return (
        <div className={`${styles.day} ${isCurrentDay ? styles.day_current : ''}`} ref={currentDayRef}>
            <div className={styles.day__panel} onClick={toggleOpen}>
                <span className={styles.day__title}>{dayName}</span>
                <span className={styles.day__date}>{formattedDate}</span>
                <img
                    src={'/svg/arrow.svg'}
                    alt={'arrow'}
                    className={styles.day__arrow}
                    style={{transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'}}
                />
            </div>
            <div className={styles.day__contentLine} ref={contentLineRef}></div>
            <div className={styles.day__content} ref={contentRef}>
                {Array.isArray(subjects) && subjects.length > 0 ? (
                    subjects.map((item, idx) => (
                        <Subject
                            key={idx}
                            subject={item.subject}
                            cabinet={item.cabinet}
                            teacher={item.teacher}
                            isToday={isCurrentDay}
                        />
                    ))
                ) : (
                    <span>Отдыхаем сегодня</span>
                )}
            </div>
        </div>
    );
};

export default Day;
