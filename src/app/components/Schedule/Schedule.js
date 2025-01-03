import React from 'react';
import Day from "../Day/Day";
import styles from './Schedule.module.scss';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Schedule = ({ scheduleData, isMobile, currentDay, getIsCurrentDay, showAllDays, collapseStates, expandStates }) => {
    return (
        <div className={styles.schedule}>
            {!isMobile ? (
                <div className={styles.schedule__columns}>
                    <div className={styles.schedule__column}>
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
                    <div className={styles.schedule__column}>
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
                    <div className={styles.schedule__column}>
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
                <div className={styles.schedule__scheduleColumn}>
                    {daysOfWeek.map((day, index) => (
                        <Day
                            key={index}
                            day={day}
                            subjects={scheduleData[day]}
                            isCurrentDay={currentDay === day && getIsCurrentDay()}
                            showAllDays={showAllDays}
                            collapse={collapseStates[day]}
                            expand={expandStates[day]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Schedule;
