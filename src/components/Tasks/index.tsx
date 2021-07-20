import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Task } from '../../store/types';
import { setTaskToDelete, setTaskToEdit } from '../../store/actions';
import { RootState } from '../../store/store';

interface TasksProps {
  tasks: Task[];
}

const Tasks: FC<TasksProps> = ({ tasks }) => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.list.selectedList!);

  const setTaskToEditHandler = (task: Task) => {
    dispatch(setTaskToEdit(task, list));
  }

  const setTaskToDeleteHandler = (task: Task) => {
    dispatch(setTaskToDelete(task, list));
  }

  const tasksTable = (
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Task</th>
          <th className="has-text-centered">Editar</th>
          <th className="has-text-centered">Deletar</th>
        </tr>
      </thead>
      <tbody>
        {
          tasks.map((task: Task) => (
            <tr key={task.id} className={task.completed ? 'completed' : ''}>
              <td>{task.name}</td>
              <td className="has-text-centered">
                <button className="button is-primary is-small" onClick={() => setTaskToEditHandler(task)}>
                  <span className="icon">
                    <i className="fas fa-edit"></i>
                  </span>
                </button>
              </td>
              <td className="has-text-centered">
                <button className="button is-danger is-small" onClick={() => setTaskToDeleteHandler(task)}>
                  <span className="icon">
                    <i className="fas fa-times"></i>
                  </span>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );

  return(
    <section className="section">
      <h2 className="is-size-4 has-text-centered">Lista de tarefas selecionadas</h2>
      {tasks.length === 0 ? <p className="py-4 has-text-centered">Sem tarefas</p> : tasksTable}
    </section>
  );
}

export default Tasks;