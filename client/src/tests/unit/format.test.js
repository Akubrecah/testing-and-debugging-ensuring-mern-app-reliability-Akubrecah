import { formatCurrency } from '../../utils/format';

describe('Format Utils', () => {
  describe('formatCurrency', () => {
    it('should format number to currency string', () => {
      // Note: exact output depends on locale, but we check for $ and value
      const result = formatCurrency(1000);
      expect(result).toContain('$');
      expect(result).toContain('1,000.00');
    });

    it('should handle zero', () => {
      const result = formatCurrency(0);
      expect(result).toContain('$0.00');
    });

    it('should return error message for invalid input', () => {
      expect(formatCurrency('invalid')).toBe('Invalid amount');
    });
  });
});
