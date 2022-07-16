import React,{useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Container, Button} from 'react-bootstrap'
import './App.css';
import Anchor from './components/Anchor';
import axios from 'axios';
import Modals from './Pages/Modals';
import { Homecontext } from './Context';

function App() {
  
  const [datas,setDatas] = useState([])
  const {setSubject,setWork,setDate,setCheck,value,modalshow,setModalshow}=useContext(Homecontext)
  const handleShow = () => {

    setSubject("")
    setDate("")
    setWork("")
    setCheck(false)
    setModalshow(true)
  }//modal open
  //fetch data from Rest api using axios
  useEffect(() => {
    const getDatas=async()=>{
      await axios.get("homeworks/").then((res)=>{
        setDatas(res.data)
      })
      .catch((err)=>console.log(err.message))
    }
    getDatas();
  }, [value]);
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{float:'left'}}>HomeWork APP</Navbar.Brand>
        </Container>
      </Navbar>
      <div className='button'>
      <Button onClick={handleShow} >Add Task</Button>
      
      </div>
      
      <Anchor datas={datas} setDatas={setDatas}/>
      {modalshow ? <Modals />:null}
    </div>
  );
}

export default App;
