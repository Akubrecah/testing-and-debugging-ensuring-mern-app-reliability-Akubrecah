// server/src/utils/math.js
const calculateTotal = (items) => {
  if (!Array.isArray(items)) {
    throw new Error('Input must be an array');
  }
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

module.exports = { calculateTotal };
