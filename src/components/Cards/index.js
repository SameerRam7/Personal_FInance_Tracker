import React from 'react'
import "./style.css"
import { Card, Row } from 'antd'
import Button from '../Button'

function Cards({ showExpenseModal, showIncomeModal}) {
  return (
    <div>
      <Row className='my-row'>
        <Card className='my-card'>
            <h2>Current Balance</h2>
            <p>₹0</p>
            <Button text="Reset Balance" green={true}/>
        </Card>
        
        <Card title="Total Income" className='my-card'>
            <p>₹0</p>
            <Button text="Add Income" green={true} onClick={showIncomeModal}/>
        </Card>
        
        <Card title="Total Expenses" className='my-card'>
            <p>₹0</p>
            <Button text="Add Expense" green={true} onClick={showExpenseModal}/>
        </Card>
        
      </Row>
    </div>
  )
}

export default Cards
