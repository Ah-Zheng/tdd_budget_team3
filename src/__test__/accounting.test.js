import Budget from '../budget';
import Accounting from '../Accounting';

describe('Accounting', () => {
    let accounting = new Accounting();
    beforeEach(() => {
        accounting = new Accounting();
    });

    it('whole month', () => {
        accounting.getAll = () => [new Budget('202010', 310)];
        expect(accounting.totalAmount('20201001', '20201031')).toBe(310);
    });

    it('one day', () => {
        accounting.getAll = () => [new Budget('202010', 310)];
        expect(accounting.totalAmount('20201001', '20201001')).toBe(10);
    });

    it('no data', () => {
        accounting.getAll = () => [new Budget('202010', 310)];
        expect(accounting.totalAmount('20200901', '20200901')).toBe(0);
    });

    it('invalid', () => {
        accounting.getAll = () => [new Budget('202010', 310)];
        expect(accounting.totalAmount('20200901', '20200831')).toBe(0);
    });

    it('cross one month', () => {
        accounting.getAll = () => [new Budget('202010', 310), new Budget('202011', 300)];
        expect(accounting.totalAmount('20201031', '20201102')).toBe(30);
    });
});