// client/src/utils/format.js
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') {
    return 'Invalid amount';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
