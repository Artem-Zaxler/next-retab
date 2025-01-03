import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePicker.module.scss';

const CustomDatePicker = ({ selectedDate, onChange }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            className={styles.datePicker}
        />
    );
};

export default CustomDatePicker;
