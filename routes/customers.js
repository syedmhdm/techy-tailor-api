import express from "express";
import connection from "../database.js";

const router = express.Router();

// all routes here are starting from /customers
router.get("/active", (req, res) => {
  const sql_query = `SELECT * FROM customers c where c.inactive_customer_flag = 'N'`;
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
router.get("/inactive", (req, res) => {
  const sql_query = `SELECT * FROM customers c where c.inactive_customer_flag = 'Y'`;
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/add", (req, res) => {
  const sql_insert_query = `INSERT INTO customers (first_name, last_name, email, phone, address, no_of_shirts, no_of_pants, shirt_material, pant_material, total_amount, advance_amount, advance_paid_on, delivery_date) 
  VALUES(
    "${req.body.firstName}" , "${req.body.lastName}" , "${req.body.email}" , "${req.body.phone}" , "${req.body.address}" , "${req.body.no_of_shirts}" , "${req.body.no_of_pants}" , "${req.body.shirtMaterial}" , "${req.body.pantMaterial}" , "${req.body.totalAmount}" , "${req.body.advanceAmount}" , "${req.body.advancePaidOn}" , "${req.body.deliveryDate}");`;

  connection.query(sql_insert_query, (err, result) => {
    if (err?.code === "ER_DUP_ENTRY") {
      res.send(
        JSON.stringify({
          status: "failure",
          message: "customer with this phone number already exist",
        })
      );
      return;
    }
    if (result) {
      res.send(
        JSON.stringify({
          status: "success",
          message: "customer added sussessfully",
        })
      );
      return;
    }
    // res.send(`${result.affectedRows}`);
  });
});

export default router;
