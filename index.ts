const fs = require("fs");
const csv = require("csv-parser");

//   `order_id`
// - `customer_id`
// - `order_date`
// - `product_id`
// - `quantity`
// - `price_per_unit`

type CustomerOrder = {
  order_id: string;
  customer_id: string;
  order_date: string; //(date in YYYY-MM-DD format): Date when the order was placed
  product_id: string; // : Unique identifier for the product ordered
  quantity: number; // : Number of units ordered
  price_per_unit: number; //: Price per single unit of the product
};

const orders = new Map<string, CustomerOrder[]>();

const loadData = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.createReadStream("orders.csv")
      .pipe(csv())
      .on("data", (data: CustomerOrder) => {
        if (!orders.has(data.customer_id)) {
          orders.set(data.customer_id, []);
        }
        orders.get(data.customer_id)!.push(data);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve();
      })
      .on("error", (error: unknown) => {
        reject(error);
      });
  });
};

// ## Part 1: Total Expenditure per Customer
const partOne = () => {
  // 1. **Calculate the total expenditure for each customer** across all their orders.
  // Output the result as a list of dictionaries or a DataFrame containing `customer_id` and `total_spent`.
  const totalSpent = new Map<string, number>();
  for (const [customer_id, customerOrders] of orders) {
    const total = customerOrders.reduce(
      (acc, order) => acc + order.price_per_unit * order.quantity,
      0
    );
    totalSpent.set(customer_id, parseFloat(total.toFixed(2)));
  }

  const result = Array.from(totalSpent, ([customer_id, total_spent]) => ({
    customer_id,
    total_spent,
  }));
  // console.log(result);

  // 2. **Find the top 5 customers who spent the most** and display their `customer_id` along with their `total_spent`.
  const top5 = result.sort((a, b) => b.total_spent - a.total_spent).slice(0, 5);
  // console.log(top5);
};

// ## Part 2: Order Frequency and Product Popularity
const partTwo = () => {
  // 1. **Determine the customer who placed the highest number of orders**. If there is a tie, list all tied customers.
  const highestOrderCount = Array.from(
    orders,
    ([customer_id, customerOrders]) => ({
      customer_id,
      order_count: customerOrders.length,
    })
  );
  // console.log(highestOrderCount);
  const maxOrderCount = Math.max(
    ...highestOrderCount.map((x) => x.order_count)
  );
  console.log(maxOrderCount);
  const highestOrderCustomers = highestOrderCount.filter(
    (x) => x.order_count === maxOrderCount
  );
  console.log(highestOrderCustomers);

  // 2. **Calculate the most popular product** (by number of units sold). Output the `product_id` and the total units sold.
};

// ## Part 3: Revenue Insights
const partThree = () => {
  // 1. **Calculate the total revenue generated for each month**. Your output should display the `year-month` (e.g., `2023-07`) and the corresponding `total_revenue`.
  // 2. **Identify any customers who haven't placed an order in the last 6 months** (based on the most recent order date in the dataset).
  // List their `customer_id` and the date of their last order.
};

// ## Part 4: Advanced Filtering and Querying (Bonus)
const partFour = () => {
  // 1. **Implement a function that allows filtering orders by multiple criteria**. The function should take the following parameters:
  //    - `start_date`: Only include orders placed after this date (inclusive).
  //    - `end_date`: Only include orders placed before this date (inclusive).
  //    - `min_spent`: Only include customers who have spent at least this amount across all their orders.
  //    - `product_id`: Only include orders for this specific product.
  //    The function should return a filtered list of orders or customers based on these criteria.
  // 2. **Allow filtering by customers who placed orders in consecutive months**. For example, if a customer placed orders in January, February, and March, they should appear in the results.
};

const main = async () => {
  await loadData();
  partOne();
  partTwo();
  // partThree();
  // partFour();
};

main();
// ## Additional Requirements

// 1. **I want to see your commits.** Please ensure that your commits are broken up and clearly labeled for each of the requirements.

// 2. Provide a short summary of your approach, including **time and space complexity considerations**.
// I used a map to store the orders for each customer. The time complexity for reading the CSV file is O(n) where n is the number of rows in the file.
// The space complexity is O(n) instead of an array of orders for each customer which would be a higher time complexity for the searches I need to do.
