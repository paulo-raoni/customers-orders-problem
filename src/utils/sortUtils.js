/**
 * Sorts an array of orders by a specified date key.
 * @param {Array} orders - The orders to sort.
 * @param {string} dateKey - The key in each order object that holds the date value.
 * @returns {Array} The sorted array of orders.
 */
function sortOrdersByDate(orders, dateKey) {
  return orders.sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]));
}

module.exports = {
  sortOrdersByDate,
};
