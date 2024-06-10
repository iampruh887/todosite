import React,{useState} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const handleAddTodo = () =>{
    let newTodoItems = {
      title: newTitle,
      description: newDescription
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItems);
    setTodos(updatedTodoArr);
  }
  return (
    <div className="App">
      <h1>Task Slayer!</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Target"></input>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Target's Description"></input>
          </div>
          <div className='todo-input-item'>
            <label>Title</label>
            <button type="button" onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secBtn isCompleteScreen ${isCompleteScreen === false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Pending</button>
          <button className={`secBtn isCompleteScreen ${isCompleteScreen === true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Accomplished</button>
        </div>
        <div className='todo-list'>
          {allTodos.map((item, index)=>{
            return(
              <div className="todo-list-item" key = {index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <AiOutlineDelete className='icon'></AiOutlineDelete>
              <BsCheckLg className='check-icon'></BsCheckLg>
            </div>            
          </div>
            )
          })}
          
        </div>
      </div>
    </div>
    
  );
}

export default App;
