import dayjs from "dayjs";

class Accounting {

    totalAmount(start, end) {
        const startDay = dayjs(start);
        const endDay = dayjs(end);
        const diff = endDay.diff(startDay, 'day') + 1;
        let budgets = this.getAll();
        const startTimeObj = {
            year: startDay.year(),
            month: startDay.month() + 1
        };
        const endTimeObj = {
            year: endDay.year(),
            month: endDay.month() + 1
        }
        const startTimeString = dayjs(`${startTimeObj.year}${startTimeObj.month}`).format('YYYYMM');
        const endTimeString = dayjs(`${endTimeObj.year}${endTimeObj.month}`).format('YYYYMM');
        const result = [];

        budgets.forEach(item => {
            if (item.yearMonth === startTimeString || item.yearMonth === endTimeString) {
                result.push(item);
            }
        });
        console.log('result :>> ', result);
        const startAmount = result.length ? result[0].amount : 0;
        const endAmount = result[1];

        return startAmount / startDay.daysInMonth() * diff;
    }

    getAll() {
        return [];
    }
}

export default Accounting;