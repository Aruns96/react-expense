import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const categories = ["Food", "Petrol", "Salary", "Other"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://react-http-b0681-default-rtdb.firebaseio.com/expense.json"
        );

        if (response.ok) {
          const fetchedData = await response.json();
          console.log("geting from firebase", Object.values(fetchedData));
          setExpenses(Object.values(fetchedData));
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log('Expense submitted:', { amount, description, category });
    let expense = {
      id: Math.random(),
      amount: Number(amount),
      description: description,
      category: category,
    };
   // setExpenses((prevState) => [...prevState, expense]);
    setAmount("");
    setDescription("");
    setCategory("");
    try {
      const response = await fetch(
        "https://react-http-b0681-default-rtdb.firebaseio.com/expense.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
        }
      );

      if (response.ok) {
        console.log("Data submitted successfully!");
        setExpenses((prevState) => [...prevState, expense]);
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Container className="mt-0">
      <h2 className="mb-4">Add New Expense</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount Spent</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Add Expense
        </Button>
      </Form>

      <h3 className="mt-5 mb-3">Expense List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ExpenseForm;
