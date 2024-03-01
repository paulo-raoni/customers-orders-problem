/**
 * Calculates the delivery date, 7 days after receiving.
 * @param {string} receivingDate - The receiving date in ISO format.
 * @returns {string} The delivery date in ISO format (YYYY-MM-DD).
 */
function calculateDeliveryDate(receivingDate) {
  const deliveryDate = new Date(receivingDate);
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  return deliveryDate.toISOString().split("T")[0];
}

module.exports = {
  calculateDeliveryDate,
};
