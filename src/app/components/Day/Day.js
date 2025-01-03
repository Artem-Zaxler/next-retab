'use client';

import React, { useEffect, useState, useRef } from 'react';
import Subject from '../Subject/Subject';
import styles from "./day.module.scss";

export default function Day({ day, subjects, isCurrentDay, showAllDays }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const contentLineRef = useRef(null);

    useEffect(() => {
        if (showAllDays || isCurrentDay) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [showAllDays, isCurrentDay]);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
            contentRef.current.style.padding = '10px 20px 20px';
            if (contentLineRef.current) {
                contentLineRef.current.style.opacity = '1';
            }
        } else if (contentRef.current) {
            contentRef.current.style.maxHeight = '0';
            contentRef.current.style.padding = '0';
            if (contentLineRef.current) {
                contentLineRef.current.style.opacity = '0';
            }
        }
    }, [isOpen]);

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

    return (
        <div className={`${styles.day} ${isCurrentDay ? styles.day_current : ''}`}>
            <div className={styles.day__panel} onClick={toggleOpen}>
                <span className={styles.day__title}>{dayName}</span>
                <img
                    src={'/svg/arrow.svg'}
                    alt={'arrow'}
                    className={styles.day__arrow}
                    style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                />
            </div>
            <div className={styles.day__contentLine} ref={contentLineRef}></div>
            <div className={styles.day__content} ref={contentRef}>
                {subjects.length > 0 ? (
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
