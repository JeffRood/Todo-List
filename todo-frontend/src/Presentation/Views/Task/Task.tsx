
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
    actions: {signOut},
  } = useAuth();

  const {
    state: {DataCollection, TotalRow},
    actions: {updateDataCollection},
  } = useAppContext();
  const [tasks, setTasks] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [onCreate, setOnCreate] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const handleCloseModal = () => {
    setIsVisibleModal(false);
    setOnCreate(false);
    setIsLogin(false);
  }

  const handleOnCreate = () => {
    setOnCreate(true);
    setIsVisibleModal(true);
  }


 useEffect(() => {
    updateDataCollection(page, limit, '')
 }, [])


 

  // Filtrar las tareas basadas en el término de búsqueda
  const filteredTasks = tasks.filter((task) =>
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <Header onCreate={handleOnCreate}/>

      {/* Agregar un campo de entrada para la búsqueda */}
      <input
        type="text"
        placeholder="Buscar tarea..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="notes-container">
        {/* Mostrar solo las tareas que coincidan con el término de búsqueda */}
        {DataCollection.map((task) => (
          <Note  title={task.name} description={task.description} time={task.expirationDate} />
         ))} 
      </div>

      <ModalView isVisible={isVisibleModal}>
        {onCreate && <CreateTask onCloseModal={handleCloseModal} />}
      </ModalView>
    </section>
  );
}

export default Task;
