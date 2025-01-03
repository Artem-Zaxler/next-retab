import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePicker.module.scss';
import {ru} from 'date-fns/locale';

const CustomDatePicker = ({selectedDate, onChange}) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            locale={ru}
            weekStartsOn={1}
            className={styles.datePicker}
        />
    );
};

export default CustomDatePicker;
