import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const API = "http://localhost:5000"

function App() {
  const [title, setTitle] = useState("");
  const [time , setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);


      const res = await fetch(API + "/todos")
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err))

      setLoading(false)

      setTodos(res)
    };

    loadData()
  },[]);

const handleDelete = async(id) => {
  await fetch(API + "/todos/" + id,{
    method:"DELETE"
  });

  setTodos((prevState) => prevState.filter((todo) => todo.id !== id))

  alert('Item deletado com sucesso!')
}
  
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const todo = {
      id:Math.random(),
      title,
      time,
      done:false
    }
  
    await fetch(API + "/todos", {
      method:"POST",
      body: JSON.stringify(todo),
      headers:{
        "Content-Type":"application/json",
      }
    })
  
    alert(`TODO CADASTRADA COM SUCESSO!`)
    console.log(todo)

    setTodos((prevState) => [...prevState, todo]);
  
    setTitle("");
    setTime("");
  } catch (error) {
    alert(`[ERROR] : ${error}`)
  }
}

  return (
    <div className="App">
      <div>
        <h1>React Todo</h1>
      </div>
      <div>
        <h2>Insira a sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className='labelInput'>
            <label htmlFor="">O que voce vai fazer?</label>
            <input 
              type="text" 
              name='title'
              placeholder='Titulo da tarefa'
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required  
            />
          </div>
          <div className='labelInput'>
            <label htmlFor="">Duração</label>
            <input 
              type="number" 
              name='title'
              placeholder='Tempo estimado'
              min={0}
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required  
            />
          </div>
          <input className='button' type="submit" value="Criar tarefa"/>
        </form>
      </div>
      <div>
        <h2>Lista de tarefas:</h2>
        <div className='listas'>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <p>Durração:: {todo.time}</p>
            <div>
              <span>
                {!todo.done ? <button>EDIT</button> : <button>X</button>}
              </span>
              <button onClick={() => handleDelete(todo.id)}>X</button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default App
