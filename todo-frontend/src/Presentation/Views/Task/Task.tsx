import { useState } from 'react';
import Header from '../../components/Header/Header'
import './Task.css'
import ModalView from '../../components/ModalView/ModalView';
import Login from '../Login/Login';
import CreateTask from '../../components/CreateTask/CreateTask';
import Note from '../../components/Note/NoteView';


const Task: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [onCreate, setOnCreate] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleCloseModal = () => {
    setIsVisibleModal(false);
    setOnCreate(false);
    setIsLogin(false);
  }

  const handleOnCreate = () => {
    setOnCreate(true);
    setIsVisibleModal(true);  
  }

  const handleOnLogin = (userLogin: any ) => {
    setIsLogin(true);
    setIsVisibleModal(true);
  }
  return (
    <section>
      <Header onCreate={handleOnCreate} onLogin={handleOnLogin} />

      <div className="notes-container">
        <Note description="Nota 1" time="Hace 2 horas" />
        <Note description="Nota 2" time="Hace 1 día" />
        <Note description="Nota 3" time="Hace 3 días" />
        <Note description="Nota 4" time="Hace 3 días" />
        <Note description="Nota 5" time="Hace 3 días" />
        <Note description="Nota 6" time="Hace 3 días" />
        <Note description="Nota 7" time="Hace 3 días" />
        <Note description="Nota 8" time="Hace 3 días" />
        <Note description="Nota 9" time="Hace 3 días" />
      </div>

        <ModalView isVisible={isVisibleModal} >
        {onCreate &&  <CreateTask onCloseModal={handleCloseModal}/>}

      </ModalView> 
    </section>
  )
}

export default Task
