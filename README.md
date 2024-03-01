# Code Challenge: Customers Orders Problem

## Introduction

This repo provides a structured approach to a common order fulfillment challenge, focusing on the integration of inventory levels and incoming vendor shipments. It's crafted to test problem-solving capabilities in realistic scenarios.

## Problem Description

The challenge is to allocate customer orders effectively, considering both current stock and anticipated vendor deliveries, ensuring orders are fulfilled on a first-come, first-served basis.

### Acceptance Criteria

- Create an allocate function to process sales and purchase orders.
- Output an array detailing each order's ID and projected delivery date.
- Ensure orders are fulfilled only with complete inventory availability.
- Simplify to a single product type, assuming delivery to customers occurs 7 days post-receipt from vendors.

## Project Structure
**The main function called `allocate` is inside the `src/allocation/index.js` file, which is the entry point.**


```
project-root/
├── src/
│   ├── utils/
│   │   ├── dateUtils.js - Date calculation functions.
│   │   └── sortUtils.js - Order sorting functions.
│   ├── allocation/
│   │   ├── allocateOrder.js - Order allocation logic.
│   │   └── index.js - Allocation process entry point.
└── tests/
    └── allocation.test.js - Allocation logic tests.
```


## Setup and Running Tests

To run the test suite and verify the correctness of the allocation function, follow these steps:

1. **Install Node.js**: Make sure Node.js is installed on your computer.
2. **Clone the Repository**: Download the project onto your local machine.
3. **Open Terminal**: Go to the project's folder using your terminal.
4. **Run Tests**:
   - For a quick summary, run `node test.js`.
   - For a detailed view with inputs and outputs, run `node test.js --verbose`.

The test suite in `test.js` is designed to cover a range of scenarios, including sufficient supply, insufficient supply, and orders exceeding forecasted supply.

## Conclusion

This challenge reflects typical real-world problems, evaluating critical thinking, algorithm design, and code clarity.
