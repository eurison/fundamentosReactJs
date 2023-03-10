import "./styles.css"

import { Card } from "../../components/cards"
import React, { useState, useEffect} from "react"


export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: "", avatar: ""})

  function handleAddStudents() {
    const newStudent = {
      name : studentName,
      time : new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    fetch('https://api.github.com/users/eurison')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, [])

  return (
    <div className="container">
     <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="" />
        </div>
     </header>
      <input 
        type="text" 
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)} />
      <button 
        type="button"
        onClick={handleAddStudents}
      >
          adicionar
      </button>

      {
        students.map(student => (
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time}
          />
          
          ))
      }
      
    </div>
  )
}

