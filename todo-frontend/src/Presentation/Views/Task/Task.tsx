
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header'
import './Task.css'
import ModalView from '../../components/ModalView/ModalView';
import Login from '../Login/Login';
import CreateTask from '../../components/CreateTask/CreateTask';
import Note from '../../components/Note/NoteView';
import { useAuth } from '../../../Domain/context/authContext';
import { useAppContext } from '../../../Domain/context/appContext';

const Task: React.FC = () => {

  const {
    state,
    actions: {signOut},
  } = useAuth();

  const {
    state: {DataCollection, TotalRow},
    actions: {updateDataCollection},
  } = useAppContext();

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [onMode, setMode] = useState<"create" | "edit" | undefined>('create');

  const [selectedTask, setSelectedTask] = useState(null);


  

  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(16);

  const handleCloseModal = () => {
    setIsVisibleModal(false);
    setMode('create');
  }

  const handleOnCreate = () => {
    setMode('create');
    setIsVisibleModal(true);
  }

  const logOut = () => {
    signOut();
  }


 useEffect(() => {
    updateDataCollection(page, limit, '')
 }, [])


 const handleNoteClick = (task) => {
  setMode('edit');
  setSelectedTask(task); 
  setIsVisibleModal(true); 
};


const completedTasks = [
  'Tarea 1 completada',
  'Tarea 2 completada',
  'Tarea 3 completada',
];

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};



  return (
    <section>
      <Header onCreate={handleOnCreate} name={state.user?.name} onLogOut={logOut}/>
      
      <button onClick={toggleMenu} className="green-button">Task Completed</button>


      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <button onClick={toggleMenu} className="close-button">
          Cerrar
        </button>
        <h2>Task Completed</h2>
        <ul>
          {DataCollection.filter(x => x.statusProcess == 'Completada').map((task) => (
            <li>{task.name}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        placeholder="Buscar tarea..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="notes-container">
        {DataCollection.filter(x => x.statusProcess == 'Pendiente').map((task) => (

        <Note
          title={task.name}
          description={task.description}
          time={task.expirationDate}
          onClick={() =>handleNoteClick(task)}
        />
))}
      </div>

      <ModalView isVisible={isVisibleModal}>
        {<CreateTask mode={onMode}  onCloseModal={handleCloseModal} taskToEdit={selectedTask} />}
      </ModalView>
    </section>
  );
}

export default Task;
