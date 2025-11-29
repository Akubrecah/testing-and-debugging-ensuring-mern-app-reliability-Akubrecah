const { calculateTotal } = require('../../src/utils/math');

describe('Math Utils', () => {
  describe('calculateTotal', () => {
    it('should calculate total correctly', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 }
      ];
      expect(calculateTotal(items)).toBe(35);
    });

    it('should return 0 for empty array', () => {
      expect(calculateTotal([])).toBe(0);
    });

    it('should throw error if input is not an array', () => {
      expect(() => calculateTotal('invalid')).toThrow('Input must be an array');
    });
  });
});
