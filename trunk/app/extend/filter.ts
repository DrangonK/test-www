// import moment from 'moment';
const moment = require('moment');
exports.format = (date: number, format: string = 'YYYY.MM.DD') => {
    if (!date) {
        return '';
    }
    return moment(date).format(format);
};
exports.dateEnd = (val: string) => {
    if (val) {
        return val;
    }else {
        return '至今';
    }
};

// 转换职位的要求  =>高中 | 不限 | 东莞-长安镇
exports.formatStr = function (arr: Array<string | number>,separator: string=' | '): string {
    let array: Array<string | number> = []

    arr.forEach((item) => {
        if (item) {
            array.push(item)
        }
    })
    return array.join(separator)
}