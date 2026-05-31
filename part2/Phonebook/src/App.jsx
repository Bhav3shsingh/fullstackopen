import { useEffect, useState } from 'react'
import sc from './serverCall'
import Notification from './Notification'

const Filter = (props) => {
  return(<div>filter shown with <input value={props.fil} onChange={(e)=>{
        props.setFil(e.target.value);
      }}/></div>)
} 

const PersonForm = ({newName,setNewName,persons,setPersons,newNum,setNewNum,setMsg}) =>{
  return(<form>
        <h3>add a new number</h3>
        <div>
          na
          me: <input value={newName} onChange={(e)=>setNewName(e.target.value)} />
        </div>
          <div>number: <input value={newNum} onChange={(e)=>setNewNum(e.target.value)} /></div>
        <div>
          <button type="submit" onClick={(e)=>{ e.preventDefault()
              if (newNum==null||(persons.some(person=>person.number===newNum))){setMsg("number cannot be empty or already exists");setTimeout(()=>{setMsg(null)},2300);}
              else if(persons.some(person=>person.name===newName)){ 
                if(window.confirm(`${newName} already exists. Do you want to update number?`)) {
                  let n = persons.find(p=>p.name===newName)
                  n = {...n,"number":newNum}
                  sc.neunum(n.id,n)
                  setPersons(persons.filter(p=>p.name!==newName).concat(n))
                }
              }
              else{
                sc.update({name:newName,number:newNum}).then(r=>{
                  setPersons(persons.concat(r));
                  setNewNum(0);
                  setNewName("");
                              setMsg("updated")
            setTimeout(()=>{setMsg(null)},2300)
                }
              );
              }

            }}>add</button>
        </div>
      </form>
      )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState(0)
  const [fil,setFil] = useState("")
  const [msg,setMsg] = useState("")

  useEffect(()=>{
    sc.getData().then((response)=>{
      setPersons(response.data)
    })
  },[])

        const filteredPersons = (fil === ""||fil===null)
        ? persons 
        : persons.filter(p => p.name.toLowerCase().includes(fil.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg}/>
      <Filter fil={fil} setFil={setFil}/>
      <PersonForm setMsg={setMsg} newName={newName} newNum={newNum} setNewName={setNewName} setNewNum={setNewNum} persons={persons} setPersons={setPersons}/>

      <h2>Numbers</h2>
          <Persons persons={filteredPersons} setPersons={setPersons}/>
    </div>
  )
}


const Persons = ({persons,setPersons}) =>{
  return persons.map(person=><div key={person.id}>{person.name} {person.number} <button onClick={()=>{
    if (window.confirm(`say babye to ${person.name}?`)) {
      sc.del(person.id);
      setPersons(persons.filter(p=>p.id!==person.id));
    }
  }}>DELETE</button></div>)
}

export default App
