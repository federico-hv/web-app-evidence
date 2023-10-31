import { DateUtility } from './date';

describe('[DateUtility]', () => {
  describe('[allMonths]', () => {
    it('should return correct months', () => {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      expect(DateUtility.allMonths()).to.deep.equal(months);
    });
  });

  describe('[fromBreakdown]', () => {
    it('should correctly return January 1 2023 as 2023-01-01', () => {
      expect(
        DateUtility.fromBreakdown({ month: '1', day: '1', year: '2023' }),
      ).to.equal('2023-01-01');
    });

    it('should correctly return January 31 2023 as 2023-01-31', () => {
      expect(
        DateUtility.fromBreakdown({ month: '1', day: '31', year: '2023' }),
      ).to.equal('2023-01-31');
    });

    it('should correctly return February 30 2023 as 2023-03-02', () => {
      expect(
        DateUtility.fromBreakdown({ month: '2', day: '30', year: '2023' }),
      ).to.equal('2023-03-02');
    });

    it('should return Invalid Date on January -1 2023', () => {
      expect(
        DateUtility.fromBreakdown({ month: '1', day: '-1', year: '2023' }),
      ).to.equal('Invalid Date');
    });

    it('should return Invalid Date on 13 as the month', () => {
      expect(
        DateUtility.fromBreakdown({ month: '13', day: '1', year: '2023' }),
      ).to.equal('Invalid Date');
    });
  });

  describe('[parseToIntMonth]', () => {
    it('should correctly parse January as 0', () => {
      expect(DateUtility.parseToIntMonth('January')).to.equal(0);
    });

    it('should correctly parse December as 11', () => {
      expect(DateUtility.parseToIntMonth('December')).to.equal(11);
    });

    it('should correctly parse September as 8', () => {
      expect(DateUtility.parseToIntMonth('September')).to.equal(8);
    });

    it('should correctly parse an incorrect month as -1', () => {
      expect(DateUtility.parseToIntMonth('Sept')).to.equal(-1);
    });
  });

  describe('[daysInMonth]', () => {
    it('should return 31 for January 2023', () => {
      expect(DateUtility.daysInMonth('1', '2023')).to.equal(31);
    });

    it('should return 28 for February 2024', () => {
      expect(DateUtility.daysInMonth('2', '2024')).to.equal(29);
    });

    it('should return 31 for October 2024', () => {
      expect(DateUtility.daysInMonth('10', '2024')).to.equal(31);
    });

    it('should return NaN for an invalid date', () => {
      expect(DateUtility.daysInMonth('1', 'a')).to.be.NaN;
    });
  });

  describe('[breakdown]', () => {
    it('should correctly breakdown January 1st 2023', () => {
      expect(DateUtility.breakdown('2023-01-01')).to.deep.equal({
        day: '1',
        month: 'January',
        year: '2023',
      });
    });

    it('should correctly breakdown October 31st 2023', () => {
      expect(DateUtility.breakdown('2023-10-31')).to.deep.equal({
        day: '31',
        month: 'October',
        year: '2023',
      });
    });

    it('should correctly breakdown an invalid date', () => {
      expect(DateUtility.breakdown('abc')).to.deep.equal({
        day: 'NaN',
        month: undefined,
        year: 'NaN',
      });
    });
  });
});
