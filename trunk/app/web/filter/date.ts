import moment from 'moment';
import Vue from 'vue';

Vue.filter('format', (date: number|string, format: string = 'YYYY.MM.DD') => {
    if (!date) {
        return '';
    }
    if (typeof date === 'string') {
        if (/至今/.test(date)) {
            return date;
        }
        date = date.replace(/\./g, '-');
    }
    return moment(date).format(format);
});