const { calculateDeliveryDate } = require("../utils/dateUtils");

/**
 * Allocates quantities from purchase orders to fulfill a single sales order.
 * @param {Object} salesOrder - The sales order to fulfill.
 * @param {Array} purchaseOrders - The available purchase orders.
 * @returns {Object|undefined} The allocation result with the sales order ID and delivery date, or undefined if allocation is not possible.
 */
function allocateSingleOrder(salesOrder, purchaseOrders) {
  let quantityNeeded = salesOrder.quantity;

  // Pre-filter purchase orders with available quantity
  const availablePurchaseOrders = purchaseOrders.filter(po => po.quantity > 0);

  for (const purchaseOrder of availablePurchaseOrders) {
    if (quantityNeeded <= 0) break; // Exit early if no quantity is needed

    const allocateQuantity = Math.min(quantityNeeded, purchaseOrder.quantity);
    purchaseOrder.quantity -= allocateQuantity; // Update the purchase order quantity
    quantityNeeded -= allocateQuantity; // Update the sales order quantity needed

    // Check if allocation is complete
    if (quantityNeeded <= 0) {
      return {
        id: salesOrder.id,
        deliveryDate: calculateDeliveryDate(purchaseOrder.receiving)
      };
    }
  }

  // Return undefined if the sales order cannot be fully allocated
}

module.exports = allocateSingleOrder;
