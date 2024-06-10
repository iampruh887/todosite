import React,{useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () =>{
    let newTodoItems = {
      title: newTitle,
      description: newDescription
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItems);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  }
  const handleComplete = index => {
    let now = new Date ();
    let dd = now.getDate ();
    let mm = now.getMonth () + 1;
    let yyyy = now.getFullYear ();
    let h = now.getHours ();
    let m = now.getMinutes ();
    let s = now.getSeconds ();
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push (filteredItem);
    setCompletedTodos (updatedCompletedArr);
    handleDeleteTodo (index);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedArr)
    );
  };


  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  
    let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos);
    }
  }, []);
  
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
          {isCompleteScreen === false && allTodos.map((item, index)=>{
            return(
              <div className="todo-list-item" key = {index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <AiOutlineDelete className='icon' title='Delete?' onClick = {()=>handleDeleteTodo(index)}></AiOutlineDelete>
              <BsCheckLg className='check-icon' title='Complete?' onClick = {()=>handleComplete(index)}></BsCheckLg>
            </div>            
          </div>
            )
          })}
          
          {isCompleteScreen === true && completedTodos.map((item, index)=>{
            return(
              <div className="todo-list-item" key = {index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Completed on : {item.completedOn} </small></p>
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
