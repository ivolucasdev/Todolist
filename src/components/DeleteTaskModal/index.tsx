import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Task, List } from '../../store/types';
import { unsetTaskToDelete, deleteTask, setNotification } from '../../store/actions';

interface DeleteTaskModalProps {
  taskToDelete: {
    task: Task;
    list: List;
  }
}

const DeleteTaskModal: FC<DeleteTaskModalProps> = ({ taskToDelete: { task, list }}) => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(unsetTaskToDelete());
  }

  const deleteHandler = () => {
    dispatch(deleteTask(task, list));
    dispatch(setNotification(`Tarefa "${task.name}" deletada!`, 'perigo'));
  }

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModalHandler}></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">Você tem certeza que quer deletar ?</p>
        </header>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-danger" onClick={deleteHandler}>Deletar</button>
          <button type="button" className="button" onClick={closeModalHandler}>Cancelar</button>
        </footer>
      </div>
    </div>
  );
}

export default DeleteTaskModal;