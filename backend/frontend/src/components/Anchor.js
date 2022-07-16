import axios from 'axios';
import React ,{useContext, useState} from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import {Row,Col,Form, Button} from 'react-bootstrap'
import { RiDeleteBin6Line } from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti'
import { Homecontext } from '../Context';
import Modals from '../Pages/Modals';
import './Anchor.css'
const Anchor = (props) => {
  
  const {setId,setSubject,setWork,setDate,setCheck,value,setValue,modalshow,setModalshow,setEdit}=useContext(Homecontext)
  const deleteItem=(id)=>{            //Delete item from api
    axios.delete(`homeworks/${id}/`)
    .then((res)=>setValue(!value))
    .catch((err)=>console.log(err.message))
  }
  const editItem=(p)=>{
    setId(p.id)
    setSubject(p.subject)
    setWork(p.work)
    setDate(p.due)
    setCheck(p.complete)
    setEdit(true)
    setModalshow(true)
  }
  const handChecked=async (data,index)=>{

   await axios.put(`homeworks/${data[index]['id']}/`,data[index])      
    .then((res)=>setValue(!value))
    .catch((err)=>console.log(err.message))
  }
  return (
    <div >
      {
        props.datas.map((post,index)=>{
        return <Accordion allowZeroExpanded="true" style={styles.accordion}>
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton style={post.complete?{ backgroundColor:'#5F6A6A',display:'flex'}:{display:'flex'}}>
                <Row style={{display:'flex',width:'100%',marginTop:'.8rem',marginLeft:'1px'}}>
                <Col  style={{display:'flex'}}>
                <Form.Check type="checkbox" onChange={(e)=>{
                 props.setDatas(props.datas.filter(post2=>{
                    if(post2.id===post.id){
                      post2.complete=e.target.checked;
                    }
                    return post2
                  }))
                  handChecked(props.datas,index)
                }} defaultChecked={post.complete}/>
                <b style={{marginLeft:'2rem',msWordBreak:'normal'}}>{post.subject}</b>
              
            </Col>
            <Col style={{float:'right'}}>
              <TiEdit size={20} onClick={(e)=>editItem(post)} style={{float:'right'}}/>
              <RiDeleteBin6Line onClick={(e)=>deleteItem(post.id)} size={20}  style={{float:'right'}}/>
              <Button variant="light" style={{ float:'right',marginTop:'-2px',marginRight:'2rem'}} size="sm" disabled>{post.due}</Button>
            </Col>
            
          </Row>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <p>
                    {post.work}
                </p>
            </AccordionItemPanel>
        </AccordionItem>
        </Accordion>
        })
      }
      {modalshow && <Modals/>}
    </div>
  );
}
const styles={
  accordion:{
    width:'80%',
    marginLeft:'3rem', 
    marginTop:'2rem'
  },
  
}
export default Anchor;
