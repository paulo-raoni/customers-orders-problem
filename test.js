const allocate = require("./src/allocation/index");

const testCases = [
  {
    case: 1,
    input: [
      // Original test
      [
        { id: "S1", created: "2020-01-02", quantity: 6 },
        { id: "S2", created: "2020-11-05", quantity: 2 },
        { id: "S3", created: "2019-12-04", quantity: 3 },
        { id: "S4", created: "2020-01-20", quantity: 2 },
        { id: "S5", created: "2019-12-15", quantity: 9 },
      ],
      [
        { id: "P1", receiving: "2020-01-04", quantity: 4 },
        { id: "P2", receiving: "2020-01-05", quantity: 3 },
        { id: "P3", receiving: "2020-02-01", quantity: 5 },
        { id: "P4", receiving: "2020-03-05", quantity: 1 },
        { id: "P5", receiving: "2020-02-20", quantity: 7 },
      ],
    ],
    output: [
      { id: "S3", deliveryDate: "2020-01-11" },
      { id: "S5", deliveryDate: "2020-02-08" },
      { id: "S1", deliveryDate: "2020-02-27" },
      { id: "S4", deliveryDate: "2020-03-12" },
    ],
  },
  {
    case: 2,
    input: [
      // Basic functionality with sufficient supply
      [{ id: "S1", created: "2020-01-02", quantity: 6 }],
      [{ id: "P1", receiving: "2020-01-04", quantity: 10 }],
    ],
    output: [{ id: "S1", deliveryDate: "2020-01-11" }],
  },
  {
    case: 3,
    input: [
      // Insufficient supply
      [{ id: "S1", created: "2020-01-02", quantity: 15 }],
      [{ id: "P1", receiving: "2020-01-04", quantity: 10 }],
    ],
    output: [],
  },
  {
    case: 4,
    input: [
      // Excess supply
      [{ id: "S1", created: "2020-01-01", quantity: 2 }],
      [{ id: "P1", receiving: "2020-01-03", quantity: 10 }],
    ],
    output: [{ id: "S1", deliveryDate: "2020-01-10" }],
  },
  {
    case: 5,
    input: [
      // Orders on the same day, testing order within a day
      [
        { id: "S1", created: "2020-01-01", quantity: 1 },
        { id: "S2", created: "2020-01-01", quantity: 1 },
        { id: "S3", created: "2020-01-01", quantity: 1 },
      ],
      [{ id: "P1", receiving: "2020-01-02", quantity: 3 }],
    ],
    output: [
      { id: "S1", deliveryDate: "2020-01-09" },
      { id: "S2", deliveryDate: "2020-01-09" },
      { id: "S3", deliveryDate: "2020-01-09" },
    ],
  },
  {
    case: 6,
    input: [
      // No sales orders
      [],
      [{ id: "P1", receiving: "2020-01-04", quantity: 10 }],
    ],
    output: [
      // No output expected
    ],
  },
  {
    case: 7,
    input: [
      // No purchase orders
      [{ id: "S1", created: "2020-01-02", quantity: 6 }],
      [],
    ],
    output: [
      // Assuming the function should handle and indicate unfulfillable orders in some way
    ],
  },
  {
    case: 8,
    input: [
      // Multiple sales and purchase orders, mixed scenarios
      [
        { id: "S1", created: "2020-01-01", quantity: 3 },
        { id: "S2", created: "2020-01-02", quantity: 2 },
        { id: "S3", created: "2020-01-03", quantity: 4 },
      ],
      [
        { id: "P1", receiving: "2020-01-04", quantity: 4 },
        { id: "P2", receiving: "2020-01-05", quantity: 5 },
      ],
    ],
    output: [
      { id: "S1", deliveryDate: "2020-01-11" },
      { id: "S2", deliveryDate: "2020-01-12" },
      { id: "S3", deliveryDate: "2020-01-12" },
    ],
  },
  {
    case: 9,
    input: [
      // Edge case: Large quantities
      [{ id: "S1", created: "2020-01-01", quantity: 100 }],
      [{ id: "P1", receiving: "2020-01-02", quantity: 100 }],
    ],
    output: [{ id: "S1", deliveryDate: "2020-01-09" }],
  },
  {
    case: 10,
    input: [
      // Edge case: Same day sales and purchase orders
      [{ id: "S1", created: "2020-01-01", quantity: 1 }],
      [{ id: "P1", receiving: "2020-01-01", quantity: 1 }],
    ],
    output: [{ id: "S1", deliveryDate: "2020-01-08" }],
  },
  {
    case: 11,
    input: [
      // Overlapping sales orders and purchase orders
      [
        { id: "S1", created: "2020-01-01", quantity: 2 },
        { id: "S2", created: "2020-01-02", quantity: 3 },
        { id: "S3", created: "2020-01-02", quantity: 4 },
      ],
      [
        { id: "P1", receiving: "2020-01-03", quantity: 4 },
        { id: "P2", receiving: "2020-01-04", quantity: 5 },
      ],
    ],
    output: [
      { id: "S1", deliveryDate: "2020-01-10" },
      { id: "S2", deliveryDate: "2020-01-11" },
      { id: "S3", deliveryDate: "2020-01-11" },
    ],
  },
  {
    case: 12,
    input: [
      // All sales orders on the same day, testing supply distribution
      [
        { id: "S1", created: "2020-01-01", quantity: 1 },
        { id: "S2", created: "2020-01-01", quantity: 2 },
        { id: "S3", created: "2020-01-01", quantity: 3 },
      ],
      [
        { id: "P1", receiving: "2020-01-02", quantity: 3 },
        { id: "P2", receiving: "2020-01-03", quantity: 3 },
      ],
    ],
    output: [
      { id: "S1", deliveryDate: "2020-01-09" },
      { id: "S2", deliveryDate: "2020-01-09" },
      // S3 cannot be fully supplied by the first purchase order and gets partially supplied by the second
      { id: "S3", deliveryDate: "2020-01-10" },
    ],
  },
  {
    case: 13,
    input: [
      // Edge case: Sales orders exceeding the forecasted supply
      [
        { id: "S1", created: "2020-01-01", quantity: 50 },
        { id: "S2", created: "2020-01-02", quantity: 75 },
      ],
      [
        { id: "P1", receiving: "2020-01-03", quantity: 60 },
        { id: "P2", receiving: "2020-01-04", quantity: 60 },
      ],
    ],
    output: [
      { id: "S1", deliveryDate: "2020-01-10" },
      // S2 cannot be fully fulfilled by the given purchase orders
    ],
  },
];

// Check for command line arguments for verbosity
const isVerbose = process.argv.includes('--verbose');

function runTests(testCases, allocateFunction) {
  let counter = {
    success: 0,
    failure: 0,
  };

  testCases.forEach((test) => {
    if (isVerbose) {
      console.log(`\n\nRunning Case ${test.case}:`);
      console.log('Input:', test.input);
    }
    try {
      const result = allocateFunction(test.input[0], test.input[1]);
      if (JSON.stringify(result) === JSON.stringify(test.output)) {
        console.log(`Successful case ${test.case}`);
        if (isVerbose) console.log('Expected Output:', test.output, '\nActual Output:', result);
        counter.success++;
      } else {
        console.log(`Failed case ${test.case}`);
        if (isVerbose) console.log('Expected Output:', test.output, '\nActual Output:', result);
        counter.failure++;
      }
    } catch (error) {
      console.log("Wrong data input in case", test.case);
      if (isVerbose) console.log('Error:', error.message);
      counter.failure++;
    }
  });

  console.log("\n\nResults Summary:");
  console.log(`Successful: ${counter.success}`);
  console.log(`Failed: ${counter.failure}`);
  console.log(`Total: ${counter.success + counter.failure}`);
}

runTests(testCases, allocate); // Run the tests with the allocate function