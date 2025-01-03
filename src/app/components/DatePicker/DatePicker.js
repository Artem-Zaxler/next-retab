import React, { useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePicker.module.scss';
import { ru } from 'date-fns/locale';

const CustomDatePicker = ({ selectedDate, onChange }) => {
    const datePickerRef = useRef(null);

    useEffect(() => {
        const element = datePickerRef.current;
        if (element) {
            const rect = element.getBoundingClientRect();
            const isInView = (rect.top >= 0 && rect.bottom <= window.innerHeight);

            if (!isInView) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                    window.scrollBy(0, -80);
                }, 0);
            }
        }
    }, [selectedDate]);

    return (
        <div ref={datePickerRef}>
            <DatePicker
                selected={selectedDate}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                locale={ru}
                weekStartsOn={1}
                className={styles.datePicker}
            />
        </div>
    );
};

export default CustomDatePicker;
