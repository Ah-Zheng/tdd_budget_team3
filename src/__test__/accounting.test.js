import Budget from '../budget';
import Accounting from '../Accounting';

describe('Name of the group', () => {
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
});