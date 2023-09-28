import React, { useState, useEffect } from 'react';
import './CreateTask.css';
import { useAppContext } from '../../../Domain/context/appContext';
import { useAuth } from '../../../Domain/context/authContext';

interface CreateTaskProps {
  onCloseModal: () => void;
  mode?: 'create' | 'edit';
  taskToEdit?: any;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  onCloseModal,
  mode = 'create',
  taskToEdit,
}: any) => {
  const {
    state: {},
    actions: { createTask, updateDataCollection, deleteTask, updateTask },
  } = useAppContext();

  const {
    state: { user },
  } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    expirationDate: '',
  });
  const [showExpirationDate, setShowExpirationDate] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && taskToEdit) {
      setFormData({
        title: taskToEdit.name,
        description: taskToEdit.description,
        expirationDate: taskToEdit.expirationDate,
      });
    }
  }, [mode, taskToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {

    const req = await createTask(formData.title, formData.description, formData.expirationDate, user!.id);
    if (req) {
      updateDataCollection(1, 12, '');
      onCloseModal();
    }
  };

  const handleDeleteTask = async () => {
    const req = await deleteTask(taskToEdit._id);
    if (req) {
      updateDataCollection(1, 20, '');
      onCloseModal();
    }
  };

  const handleUpdateTask = async () => {
    const { _id, status, statusProcess, userId} = taskToEdit

    const updateTaskobj = {
        _id: _id,
        name: formData.title,
        description: formData.description,
        expirationDate: formData.expirationDate,
        status: status,
        statusProcess: statusProcess,
        userId: userId
    }
    const req = await updateTask(updateTaskobj);
    if (req) {
      updateDataCollection(1, 20, '');
      onCloseModal();
    }
  };

  const title = mode === 'create' ? 'New Task' : 'Edit Task';

  return (
    <section className="createTask_container">
      <div>
        <h2 className="createTask_title">{title}</h2>
        <form  className="form_createTask">
          <div className="dv_form_createTask_title">
            <label htmlFor="titleTaskId">Title:</label>
            <input
              type="text"
              name="title"
              className="form_createTask_input"
              onChange={handleChange}
              id="titleTaskId"
              required
              value={formData.title}
            />
          </div>

          <div className="dv_form_createTask_textarea">
            <label htmlFor="descriptionTaskId">Description:</label>
            <textarea
              type="text"
              className="form_createTask_textarea"
              name="description"
              onChange={handleChange}
              id="descriptionTaskId"
              required
              value={formData.description}
            ></textarea>
          </div>

          <div className="dv_form_createTask_checkbox">
            <label>
              <input
                type="checkbox"
                name="enableExpirationDate"
                onChange={() => setShowExpirationDate(!showExpirationDate)}
              />
              add expiration date
            </label>
          </div>

          {showExpirationDate && (
            <div className="dv_form_createTask_datepicker">
              <label htmlFor="expirationDateId">Expiration date:</label>
              <input
                type="date"
                name="expirationDate"
                onChange={handleExpirationDateChange}
                id="expirationDateId"
                required
                value={formData.expirationDate}
              />
            </div>
          )}

        <div className="btn_cancel_create">
        {mode === 'create' && (
            <button onClick={handleSubmit} type="button" className="add-button">
            Add
            </button>
        )}
        {mode === 'edit' && (
            <button onClick={handleDeleteTask} type="button" className="delete-button">
            Delete
            </button>
        )}
        {mode === 'edit' && (
            <button onClick={handleUpdateTask} type="button" className="update-button">
            Update
            </button>
        )}

        <button onClick={() => onCloseModal()}>Cancel</button>
        </div>
        </form>
      </div>
    </section>
  );
};

export default CreateTask;
