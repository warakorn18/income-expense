import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import './App.css'
import { useState,useEffect,ReducerStateWithoutAction} from "react";
import DataContext from './data/DataContext'
import ReportComponent from "./components/ReportCompnent";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


function App() {
  const design = {color:"red",textAlign:"center",fontSize:'1.75rem'}
  //Data B
  // const initData =[
  //   {id:1,title:"ค่าเช่าบ้าน",amount:-30000},
  //   {id:2,title:"เงินเดือน",amount:50000}

  // ]
  
  const [items,setItems] = useState([])

  const [reportIncome,setReportIncome]=useState(0)
  const [reportExpense,setReportExpense]=useState(0)
  const onAddNewItem = (newItem)=>{
      setItems((prevItem)=>{
        return [newItem,...prevItem]
      })
  }
  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    const income =amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0).toFixed(2)
    const expense =((amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1).toFixed(2)
    setReportIncome(income)
    setReportExpense(expense)
  },[items,reportIncome,reportExpense])


  // reducer state
 
  return (
      <DataContext.Provider value={{income : reportIncome,expense : reportExpense}}>
        <div className="container">
          <h1 style={design}>คำนวนบัญชีรายรับ - รายจ่าย</h1>
            <Router>
            <div>
              <ul className="horizontal-menu">
                <li>
                    <Link to="/">ข้อมูลบัญชี</Link>
                </li>
                <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
                </li>
              </ul>
              <Switch>
                <Route path="/" exact>
                    <ReportComponent/>
                  </Route>
                <Route path="/insert">
                    <FormComponent onAddItem={onAddNewItem}/>
                    <Transaction items = {items}/>
                  </Route>
              </Switch>
            </div>
            </Router>
            </div> 
        </DataContext.Provider> 
     
  );
}

export default App;
