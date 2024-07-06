import React, { useState, useEffect,useRef } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  
  const [editingId, setEditingId] = useState(null);

  const newDescRef = useRef();
  const newAmountRef = useRef();
  const newCategoryRef =  useRef();

  const categories = ["Food", "Petrol", "Salary", "Other"];
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://react-http-b0681-default-rtdb.firebaseio.com/expense.json"
      );

      if (response.ok) {
        const fetchedData = await response.json();
        //console.log('data',Object.values(fetchedData))
        console.log("geting from firebase", Object.entries(fetchedData).map(([key, value]) => ({ id: key, ...value })));
      
        setExpenses(Object.entries(fetchedData).map(([key, value]) => ({ id: key, ...value })));
        //setExpenses(fetchedData);
        
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    

    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log('Expense submitted:', { amount, description, category });
    let expense = {
     
      amount: Number(amount),
      description: description,
      category: category,
    };
   // setExpenses((prevState) => [...prevState, expense]);
   
    try {
      const response = await fetch(
        "https://react-http-b0681-default-rtdb.firebaseio.com/expense.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
        }
      );

      if (response.ok) {
        setExpenses((prevState) => [...prevState, expense]);
        setAmount("");
        setDescription("");
        setCategory("");
        console.log("Data submitted successfully!");
        
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (id) => {
    //console.log("id",id)
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    try {
      
     console.log(id)
      const response = await fetch(`https://react-http-b0681-default-rtdb.firebaseio.com/expense/${id}.json`, {
        method: 'DELETE',
        
      });
     console.log(response.ok)
      if (response.ok) {

       //setExpenses(ex)
       async function getData(){
        try {
            const response = await fetch(
              "https://react-http-b0681-default-rtdb.firebaseio.com/expense.json"
            );
    
            if (response.ok) {
              const fetchedData = await response.json();
             
            
              setExpenses(Object.entries(fetchedData).map(([key, value]) => ({ id: key, ...value })));
              
              
            } else {
              console.error("Error fetching data:", response.statusText);
            }
          } catch (error) {
            console.error("Error:", error);
          }
      }
      getData();

        console.log('Item deleted successfully!');
      } else {
        console.error('Error deleting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSaveEdit = async (id, newdescription, newAmount,newCategory) => {
    try {
      //const updatedData = { ...expenses };
      //console.log("upadated data",updatedData,id)

      let updatedData= {id:id, description: newdescription, amount: newAmount,category: newCategory}; // Update item by ID

     

      const response = await fetch(`https://react-http-b0681-default-rtdb.firebaseio.com/expense/${id}.json`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
         async function getData(){
            try {
                const response = await fetch(
                  "https://react-http-b0681-default-rtdb.firebaseio.com/expense.json"
                );
        
                if (response.ok) {
                  const fetchedData = await response.json();
                 
                
                  setExpenses(Object.entries(fetchedData).map(([key, value]) => ({ id: key, ...value })));
                  
                  
                } else {
                  console.error("Error fetching data:", response.statusText);
                }
              } catch (error) {
                console.error("Error:", error);
              }
          }
          getData();
       // setExpenses();
        setEditingId(null); // Clear editing state
        console.log('Item edited successfully!');
      } else {
        console.error('Error editing data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
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
      <Container className="mt-3">
        <Row>
          
            <Col ><h5>Description</h5></Col>
            <Col><h5>Amount</h5></Col>
            <Col><h5>Category</h5></Col>
          
        </Row>
          {console.log(expenses)}
           {expenses.length >0 ? <>
          {expenses.map((expense) => (
            <Row key={expense.id}>
                {editingId === expense.id ? (
                    <>
                  <input type="text" defaultValue={expense.description} ref={newDescRef} />
                  <input type="number" defaultValue={expense.amount} ref={newAmountRef}/>
                  <input type="text" defaultValue={expense.category} ref={newCategoryRef}/>
                  <button onClick={(e) => handleSaveEdit(expense.id,newDescRef.current.value,Number(newAmountRef.current.value),newCategoryRef.current.value)}>Save</button>

                    </>
                ): (
                    <>
              <Col>{expense.description}</Col>
              <Col>{expense.amount.toFixed(2)}</Col>
              <Col>{expense.category} <span> <button onClick={() => handleEdit(expense.id)}>Edit</button></span> <span><button onClick={() => handleDelete(expense.id)}>Delete</button></span></Col>
             
              </>
                )}
            </Row>
          ))}
          </>
         :(<p>no data available</p>)
        }

       
     </Container>
    </Container>
  );
};

export default ExpenseForm;
