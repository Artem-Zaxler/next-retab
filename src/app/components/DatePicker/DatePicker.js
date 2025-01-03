import React, { useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePicker.module.scss';
import { ru } from 'date-fns/locale';

const CustomDatePicker = ({ selectedDate, onChange }) => {
    const datePickerRef = useRef(null);

    useEffect(() => {
        if (datePickerRef.current) {
            datePickerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
                window.scrollBy(0, -80);
            }, 1);
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
