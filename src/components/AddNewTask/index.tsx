import React, { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { List, Task } from '../../store/types';
import { addTask, setNotification } from '../../store/actions';

interface AddNewTaskProps {
  list: List;
}

const AddNewTask: FC<AddNewTaskProps> = ({ list }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(taskName.trim() === '') {
      return alert('Coloque o nome da lista!');
    }

    const newTask: Task = {
      name: taskName,
      id: `task-${new Date().getTime()}`,
      completed: false
    }

    dispatch(addTask(newTask, list));
    dispatch(setNotification(`Nova Tarefa Criada("${newTask.name}")!`));
    setTaskName('');
  }

  return(
    <section className="section">
      <h2 className="is-size-4 has-text-centered">Adicione nova tarefa</h2>
      <form onSubmit={submitHandler}>
        <div className="field">
          <label className="label">Tarefa</label>
          <div className="control">
            <input type="text" className="input" placeholder="Adicionar" value={taskName} onChange={changeHandler} />
          </div>
          <div className="control mt-4">
            <input type="submit" value="Adicionar" className="button is-primary" />
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddNewTask;