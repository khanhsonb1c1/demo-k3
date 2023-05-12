import { Route, Routes } from 'react-router-dom';

import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './app.module.css';
import TheHeader from './components/TheHeader';
import { updateUser } from './store/user';
import TicketDetail from './tickets/TicketDetail';
import Tickets from './tickets/tickets';

const App = () => {
  const dispath = useDispatch();

  const fetchUsers = async () => {
    // arrow function
    const data = await fetch('/api/users');
    dispath(updateUser(await data.json()));
  };

  useLayoutEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <TheHeader />
      <div className={styles['container']}>
        <Routes>
          <Route path="/" element={<Tickets />} />
          <Route path="tickets/:id" element={<TicketDetail/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
