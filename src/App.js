import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './TodoList';
import './App.css';

function App() {
  const [ todos, setTodos ] = useState([]);
        // {name: 'eat breakfast', id: 0, isComplete: false}
  const addRef = useRef()
  // https://legacy.reactjs.org/docs/hooks-intro.html
  // we're going to destructure
  //we're indexing the values returned from useState() and saving the returned values as todos and then running a function we'll make called setTodos on the state that we're returning.

  function addToDo(event) {
    const taskName = addRef.current.value

    if (taskName){
      setTodos(oldTodos => {
        return [...oldTodos, { id: uuidv4(), name: taskName, isComplete: false}]
      })
      // console.log(taskName);
      addRef.current.value = null
    } else {
      return null
    }
  }


  function checkBox(id){
    const newStuff = [...todos]
    const todo = newStuff.find(specificItem => specificItem.id === id);
    todo.isComplete = !todo.isComplete;
    setTodos(newStuff)
  }


  function clearTodos(){
    const newTodos = todos.filter(todo => !todo.isComplete)
    setTodos(newTodos);
  }


  return (
    <>
    <div className="flex-column margin-top">
      
    <TodoList todos={todos} checkBox={checkBox}/>
    <input ref={addRef} type="text" />

    <div className='flex-row'>
      <button className='padding-5 margin-5' onClick={addToDo}>Add Item</button>
      <button className='padding-5 margin-5' onClick={clearTodos} >Clear Finished</button>
    </div>

    <div>Left to do: {todos.length}</div> 
    {/* .length is part of JS */}


    </div>
    
    </>
// What are the empty tags for?! Well, JSX will only take one item... javascript can't return multiple things. So instead of stashing them all in a div, we're just gonna leave some empty braces here. They are called fragments
  );
}

export default App;
