import { useState } from 'react';
import './CreateTask.css'


const CreateTask: React.FC = ({onCloseModal, onSubmit}) => {

    const [onCreate, setOnCreate] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', expirationDate: '' });
    const [showExpirationDate, setShowExpirationDate] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Aquí puedes llamar a la función onSubmit con los datos del formulario.
      onSubmit(formData);
    };



  return (
    <section className="createTask_container">
    <div>
      <h2 className="createTask_title">New Task</h2>
      <form onSubmit={handleSubmit} className="form_createTask">
        <div className="dv_form_createTask_title">
          <label htmlFor="titleTaskId">Title:</label>
          <input
            type="text"
            name="title"
            className="form_createTask_input"
            onChange={handleChange}
            id="titleTaskId"
            required
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
            />
          </div>
        )}
      </form>

      <div className="btn_cancel_create">
        <button onClick={handleSubmit}>Add</button>
        <button onClick={() => onCloseModal()}>Cancel</button>
      </div>
    </div>
  </section>
    
  )
}

export default CreateTask
