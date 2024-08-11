import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'

import AddExpense from '../components/Modals/addExpense';
import AddIncome from '../components/Modals/addIncome';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import moment from "moment"


const Dashboard = () => {
  const [transaction,setTransaction] = useState([]);
  const [loading,setLoading] = useState(false);
  const [user]=useAuthState(auth)
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () =>{
    setIsExpenseModalVisible(true);
  }
  
  const showIncomeModal = () =>{
    setIsIncomeModalVisible(true);
  }

  const handleExpenseCancel = () =>{
    setIsExpenseModalVisible(false);
  }
  
  const handleIncomeCancel = () =>{
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values,type)=>{
    const newTransaction = {
      type: type,
      date: moment(values.data).format("YYYY-MM-DD"),
      amount:parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    };
    addTransaction(newTransaction);
  }

  async function addTransaction(transaction){
    //Add the doc
try {
  const docRef = await addDoc(
    collection(db,`users/${user.uid}/transactions`),
    transaction
  );
  console.log("Document written with ID: ",docRef.id)
  toast.success("Transaction Added!")
  
} catch(e) {
  console.error("Error adding document:",e);
    toast.error("Couldn't add transaction");
  
}
  }

  useEffect(() => {
    //Get all the docs from a collection
    fetchTransactions();
  },[])
  
async function fetchTransactions() {
  setLoading(true);
  if(user){
    const q = query(collection(db,`users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);
    let transactionsArray = [];
    querySnapshot.forEach((doc) => {
      //doc.data() is never undefined for query doc snapshots
      transactionsArray.push(doc.data());
    });
    setTransaction(transactionsArray);
    console.log("Transaction Array",transactionsArray)
    toast.success("Transactions Fetched!");

  }
  setLoading(false);
}

  return (
    <div /* className='background' style={{height:"100%"} }*/> 
      <Header/>
      {loading?<>
      <p>Loading....</p>
      </> :<>
      <Cards
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
      />
      
      <AddExpense
      isExpenseModalVisible={isExpenseModalVisible}
      handleExpenseCancel={handleExpenseCancel}
      onFinish={onFinish}
      />
      <AddIncome
      isIncomeModalVisible={isIncomeModalVisible}
      handleIncomeCancel={handleIncomeCancel}
      onFinish={onFinish}
      />
      </>
}
      </div>
  )
}

export default Dashboard