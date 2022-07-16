import React,{useContext} from 'react';
import {Container, Button,Form,Modal} from 'react-bootstrap'
import axios from 'axios';
import { Homecontext } from '../Context';
function Modals(props){
    
    const {id,subject,setSubject,work,setWork,date,setDate,check,setCheck,value,setValue,modalshow,setModalshow,edit,setEdit,Add_title,Edit_title}=useContext(Homecontext);
    const handleClose = () =>setModalshow(false);//modal close
    //What happen when submit button click
    const handSubmit=e=>{
        e.preventDefault()
        const data={id:Date.now(),subject:subject,work:work,due:date,complete:check}
        axios.post("homeworks/",data,{       //post data into api using axios
          headers:{
            'content-type':'application/json',
            
        }
        }
        )
        .then((res)=>setValue(!value))
        .catch((err)=>console.log(err.message))
        
        setSubject("")
        setDate("")
        setWork("")
       
        setModalshow(false)
      }
      const handEdit=async (e)=>{
        e.preventDefault()
        const data={id:id,subject:subject,work:work,due:date,complete:check}
       await axios.put(`homeworks/${id}/`,data)      //post data into api using axios
        .then((res)=>setValue(!value))
        .catch((err)=>console.log(err.message))
        setEdit(false)
        setSubject("")
        setDate("")
        setWork("")
        setModalshow(false)
        
      }
    return (
        <Modal show={modalshow} onHide={handleClose} animation={false} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton onClick={()=>setEdit(false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit? Edit_title:Add_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Form onSubmit={edit?handEdit:handSubmit} autoComplete='off'>
              <Form.Group className="mb-3" controlId="formBasicSubject">
                <Form.Label>Name of Subject</Form.Label>
                <Form.Control value={subject} onChange={(e)=>setSubject(e.target.value)} type="text" placeholder="Enter subject" required/>
                
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicwork">
                <Form.Label>Work Description</Form.Label>
                <Form.Control value={work} onChange={(e)=>setWork(e.target.value)} as="textarea" rows={3} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Due date</Form.Label>
                <Form.Control value={date} onChange={(e)=>setDate(e.target.value)} type="date" placeholder="Due date" required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check onChange={(e)=>setCheck(e.target.checked)} defaultChecked={check} type="checkbox" label="Completed" />
              </Form.Group>
              { !edit?
              <Button  variant="primary" type="submit">
                Submit
              </Button>:
              <Button  variant="danger" type="submit">
                Edit
              </Button>
              }
            </Form>
          </Container>
        </Modal.Body>
        
      </Modal>
    );
}

export default Modals;
