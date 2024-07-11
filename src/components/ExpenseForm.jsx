import React, { useState, useEffect, useCallback } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/expense";
import { themeActions } from "../store/theme";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

const ExpenseForm = () => {
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
 

  const userID = localStorage.getItem("userID");

  //console.log("totol",totalAmount)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://react-http-b0681-default-rtdb.firebaseio.com/${userID}.json`
      );

      if (response.ok) {
        const fetchedData = await response.json();
        //console.log('response',fetchedData)

        let arr = [];
        for (let key in fetchedData) {
          arr.push({
            id: key,
            description: fetchedData[key].description,
            amount: fetchedData[key].amount,
            category: fetchedData[key].category,
          });
        }
       
        setExpenses(arr);
       
       
        localStorage.setItem("allExpense", JSON.stringify(arr));
        dispatch(expenseActions.addExpenses(arr));
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [userID, dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("isedit",isEdit)
    if (isEdit === true) {
      const data = {
        amount: Number(amount),
        description: description,
        category: category,
      };

      dispatch(expenseActions.addAmount(Number(amount)));
      dispatch(expenseActions.addDesc(description));
      dispatch(expenseActions.addCategory(category));

      try {
        const response = await fetch(
          `https://react-http-b0681-default-rtdb.firebaseio.com/${userID}/${expenseId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          setAmount("");
          setDescription("");
          setCategory(category);
          fetchData();
          //getExpenses    implement function
          //console.log("Data submitted successfully!");
        } else {
          console.error("Error submitting data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      //console.log('Expense submitted:', { amount, description, category });
      let expense = {
        amount: Number(amount),
        description: description,
        category: category,
      };

      dispatch(expenseActions.addAmount(Number(amount)));
      dispatch(expenseActions.addDesc(description));
      dispatch(expenseActions.addCategory(category));

      // setExpenses((prevState) => [...prevState, expense]);

      try {
        const response = await fetch(
          `https://react-http-b0681-default-rtdb.firebaseio.com/${userID}.json`,
          {
            method: "POST",
            body: JSON.stringify(expense),
          }
        );

        if (response.ok) {
          setExpenses((prevState) => [...prevState, expense]);

          setAmount("");
          setDescription("");
          setCategory(category);
          fetchData();

          // const exps = localStorage.getItem("allExpense");
          // console.log("exps",exps)

          //getExpenses    implement function
          console.log("Data submitted successfully!");
        } else {
          console.error("Error submitting data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const editHandler = (id) => {
    let editExpense = expenses.filter((expense) => expense.id === id);
    setEdit(true);
    setExpenseId(id);
    setAmount(editExpense[0].amount);
    setDescription(editExpense[0].description);
    setCategory(editExpense[0].category);
    dispatch(expenseActions.editExpense({ id, editExpense }));
    console.log(editExpense);
  };
  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `https://react-http-b0681-default-rtdb.firebaseio.com/${userID}/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      dispatch(expenseActions.removeExpense(id));
      fetchData();
    } catch (err) {
      alert(err);
    }
  };
  const premiumButtonHandler = () => {
    // console.log("click premium")
    dispatch(themeActions.toogle());
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
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Add Expense
        </Button>
      </Form>

      <br />
      {totalAmount > 10000 && (
        <button
          onClick={premiumButtonHandler}
          className="btn btn-outline-secondary btn-sm"
        >
          premium
        </button>
      )}
      <br />
      <button className="mt-3 btn btn-outline-success">
      <CSVLink
        data={localStorage.getItem("allExpense")}
        filename="expense.csv"
        
        
      >
        Download Expenses
      </CSVLink>
      </button>
      <h3 className="mt-5 mb-3">Expense List</h3>
      <Container className="mt-3">
        <Row>
          <Col>
            <h5>Description</h5>
          </Col>
          <Col>
            <h5>Amount</h5>
          </Col>
          <Col>
            <h5>Category</h5>
          </Col>
        </Row>

        {expenses.length > 0 ? (
          <>
            {expenses.map((expense, index) => (
              <Row key={index}>
                <Col>{expense.description} </Col>
                <Col> {expense.amount}</Col>
                <Col>
                  {" "}
                  {expense.category}{" "}
                  <span>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => editHandler(expense.id)}
                    >
                      edit
                    </button>
                  </span>{" "}
                  <span>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteHandler(expense.id)}
                    >
                      delete
                    </button>
                  </span>
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <p>no data available</p>
        )}
      </Container>
    </Container>
  );
};

export default ExpenseForm;
