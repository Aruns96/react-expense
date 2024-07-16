import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import ExpenseForm from "./ExpenseForm";



test("render expenses",async()=>{
     window.fetch = jest.fn()
     window.fetch.mockResolvedValueOnce({
        json: async()=>[{
            id: "1",
            description: "test",
            amount: 10,
            category: "test category",
        }]
     })


    render(<ExpenseForm />)

    

    const element = await screen.findAllByTestId(id="1")
    expect(element).not.toHaveLength(0)
})