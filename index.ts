const fs = require("fs");
const csv = require("csv-parser");

type CustomerOrder = {
  customer_id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  order_date: string;
};

const orders = new Map<string, CustomerOrder[]>();
// const orders = [];

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
    console.log(orders);
  });

// ## Additional Requirements

// 1. **I want to see your commits.** Please ensure that your commits are broken up and clearly labeled for each of the requirements.

// 2. Provide a short summary of your approach, including **time and space complexity considerations**.

// ## Part 1: Total Expenditure per Customer

// 1. **Calculate the total expenditure for each customer** across all their orders.
// Output the result as a list of dictionaries or a DataFrame containing `customer_id` and `total_spent`.

// 2. **Find the top 5 customers who spent the most** and display their `customer_id` along with their `total_spent`.

// ## Part 2: Order Frequency and Product Popularity

// 1. **Determine the customer who placed the highest number of orders**. If there is a tie, list all tied customers.

// 2. **Calculate the most popular product** (by number of units sold). Output the `product_id` and the total units sold.

// ## Part 3: Revenue Insights

// 1. **Calculate the total revenue generated for each month**. Your output should display the `year-month` (e.g., `2023-07`) and the corresponding `total_revenue`.

// 2. **Identify any customers who haven't placed an order in the last 6 months** (based on the most recent order date in the dataset). List their `customer_id` and the date of their last order.

// ## Part 4: Advanced Filtering and Querying (Bonus)

// 1. **Implement a function that allows filtering orders by multiple criteria**. The function should take the following parameters:
//    - `start_date`: Only include orders placed after this date (inclusive).
//    - `end_date`: Only include orders placed before this date (inclusive).
//    - `min_spent`: Only include customers who have spent at least this amount across all their orders.
//    - `product_id`: Only include orders for this specific product.

//    The function should return a filtered list of orders or customers based on these criteria.

// 2. **Allow filtering by customers who placed orders in consecutive months**. For example, if a customer placed orders in January, February, and March, they should appear in the results.
