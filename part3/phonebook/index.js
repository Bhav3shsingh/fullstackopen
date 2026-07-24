const express = require('express');
const app = express();

app.use(express.json())

data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

function date(){
  const d = new Date();
  return d;
}

function genid(){
  var i = `${Math.floor(Math.random()*(10000-data.length+1))+data.length+1}`
  var j = data.find(d => d.id===i)
  if(j){
    i = genid();
  }
  return i;
}

app.get('/',(request,response)=>{
  response.send("<h1>joy</h1>")
})

app.get('/api/persons',(request,response)=>{
  response.json(data)
})

app.get('/info',(request,response)=>{
  response.send(`Phonebook has info for ${data.length} people<br>${date()}`)
})

app.get('/api/persons/:id',(request,response)=>{
  const id = request.params.id
  const n = data.find(dat=>dat.id===id)
  if(n){
    response.end(JSON.stringify(n))
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id',(request,response)=>{
  const id = request.params.id
  data = data.filter(d => d.id!=id)
  response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
  const per = request.body
  if(!per.name){
    return response.status(400).json({
      error:"no name"
    })
  }else if(!per.number){
    return response.status(400).json({
      error:"no number"
    })
  }

  var r = data.find(d=>d.name===per.name)
  var l = data.find(d=>d.number===per.number)
  if(r){
    return response.status(401).json({
      error:"duplicate name"
    })
  }else if(l){
    return response.status(401).json({
      error:"duplicate number"
    })
  }
  const d = {
    id:genid(),
    name:per.name,
    number:per.number
  }
  data = data.concat(d)
  response.json(data)
})

const PORT = 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
