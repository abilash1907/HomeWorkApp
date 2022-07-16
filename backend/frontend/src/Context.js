import { createContext, useState } from "react";

export const Homecontext=createContext(null)

export default function Context({children}){
    const Add_title="Add the HomeWork";
    const Edit_title="Edit the HomeWork";
    const [edit, setEdit] = useState(false);
    const [subject, setSubject] = useState("");
    const [work, setWork] = useState("");
    const [date, setDate] = useState("");
    const [check,setCheck] = useState(false)
    const [value,setValue] = useState(false)
    const [modalshow, setModalshow] = useState(false);
    const [id,setId] =useState(null);
    return(
        
        <Homecontext.Provider value={{id,setId,subject,setSubject,work,setWork,date,setDate,check,setCheck,value,setValue,modalshow,setModalshow,Add_title,Edit_title,edit,setEdit}}>
            {children}
        </Homecontext.Provider>
        
    
    )
}