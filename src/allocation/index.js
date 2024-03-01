const { sortOrdersByDate } = require("../utils/sortUtils");
const allocateSingleOrder = require("./allocateOrder");

/**
 * Main function to allocate sales orders against purchase orders.
 * @param {Array} salesOrders - The sales orders to allocate.
 * @param {Array} purchaseOrders - The available purchase orders.
 * @returns {Array} An array of allocation results for sales orders.
 */
function allocate(salesOrders, purchaseOrders) {
  // Sort both sales and purchase orders by their respective date keys
  sortOrdersByDate(salesOrders, "created");
  sortOrdersByDate(purchaseOrders, "receiving");

  // Map and filter to ensure only successfully allocated orders are returned
  const allocationResults = salesOrders
    .map(salesOrder => allocateSingleOrder(salesOrder, purchaseOrders))
    .filter(result => result !== undefined); // Remove undefined results (unallocated orders)

  return allocationResults;
}

module.exports = allocate;
