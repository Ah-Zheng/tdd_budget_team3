import dayjs from "dayjs";

class Accounting {

    totalAmount(start, end) {
        const startDay = dayjs(start);
        const endDay = dayjs(end);

        if (endDay.isBefore(startDay)) {
            return 0;
        }
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

        let unitStartAmount = 0;
        let unitEndAmount = 0;

        if (startTimeObj.year === endTimeObj.year && startTimeObj.month === endTimeObj.month) {
            const startAmount = result.length ? result[0].amount : 0;
            return startAmount / startDay.daysInMonth() * diff;
        }
        result.forEach(item => {
            if (item.yearMonth === startTimeString) {
                unitStartAmount = item.amount / startDay.daysInMonth() * (startDay.daysInMonth() - startDay.date() + 1);
            }
            if (item.yearMonth === endTimeString) {
                unitEndAmount = item.amount / endDay.daysInMonth() * endDay.date();
            }
        });

        return unitStartAmount + unitEndAmount;
    }

    getAll() {
        return [];
    }
}

export default Accounting;