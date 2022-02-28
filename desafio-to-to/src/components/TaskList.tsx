import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const placeHolderRequired = ''
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    if (newTaskTitle.trim() == '' || newTaskTitle == undefined) return;

    let newTasks = [...tasks] 
    
    newTasks.push({
      id: createId(),
      isComplete: false,
      title: newTaskTitle
    })

    setTasks(newTasks)
  }

  function handleToggleTaskCompletion(id: number) {
    let tempTask = [...tasks]

    tempTask.forEach(x => {
      if (x.id == id) { 
        x.isComplete = !x.isComplete
      }  
    })

    setTasks(tempTask);
  }

  function handleRemoveTask(id: number) {
    const filterTask = tasks.filter(x => {
      if (x.id !== id) return x;
    })

    setTasks(filterTask)
  }

  function createId() { 
    return parseInt(Math.random().toString().substring(2))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button title='btn_submit' type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    placeholder={placeHolderRequired}
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p data-testid="task" >{task.title}</p>
              </div>

              <button title='btn_remove' type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}